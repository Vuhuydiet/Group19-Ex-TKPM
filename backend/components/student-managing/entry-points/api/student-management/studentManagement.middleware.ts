// studentManagement.middleware.ts

import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../../../../../core/responses/ErrorResponse";
import { DomainCode } from "../../../../../core/responses/DomainCode";
import StudentManagementService from "../../../domain/services/studentManagement.service";
import { CountryCode, parsePhoneNumberWithError } from "libphonenumber-js";
import StudyStatusService from "../../../domain/services/studyStatus.service";

const NAME_PATTERN = /^[A-Za-z\s\u00C0-\u1EF9]+$/; // Thêm hỗ trợ Unicode cho tên tiếng Việt
const EMAIL_PATTERN = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const studentService = new StudentManagementService()
const studyStatusService = new StudyStatusService()

export const checkStudentNamePattern = (req: Request, _res: Response, next: NextFunction): void => {
	try {
		// Nếu không có trường 'name' trong request body, bỏ qua
		if (req.body.name === undefined) {
			return next();
		}

		if (!NAME_PATTERN.test(req.body.name)) {
			throw new BadRequestError(DomainCode.INVALID_INPUT_FIELD, 'Invalid name format');
		}
		return next();
	} catch (error) {
		return next(error);
	}
};

export const checkEmailPattern = async (req: Request, _res: Response, next: NextFunction) => {
	try {
		// Nếu không có trường 'email' trong request body, bỏ qua
		if (req.body.email === undefined) {
			return next();
		}

		if (!EMAIL_PATTERN.test(req.body.email)) {
			throw new BadRequestError(DomainCode.INVALID_INPUT_FIELD, 'Invalid email address format');
		}

		const emailDomain: string = req.body.email.split('@')[1];
		const allowedDomains = await studentService.getAllowedEmailDomains();
		if (allowedDomains.filter(domain => domain.domain === emailDomain).length === 0) {
			throw new BadRequestError(DomainCode.INVALID_INPUT_FIELD, 'Invalid email domain');
		}

		return next();
	} catch (error) {
		return next(error);
	}
}

export const checkPhoneNumberPattern = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
	if (req.body.phone === undefined) {
		return next();
	}

	try {
		const phone: string = req.body.phone;
		let nationality: string = req.body.nationality;

		if (req.method === 'PATCH' && !nationality) {
			const student = await studentService.getStudentById(req.params.id);
			if (!student) {
				return next(new BadRequestError(DomainCode.NOT_FOUND, 'Student not found'));
			}
			nationality = student.nationality;
		}

		if (!phone || typeof phone !== 'string') {
			throw new Error('Phone number must be a non-empty string.');
		}
		if (!nationality) {
			throw new Error('Nationality is required to validate the phone number.');
		}

		const parsedNumber = parsePhoneNumberWithError(phone, nationality as CountryCode);

		if (!parsedNumber || !parsedNumber.isValid()) {
			throw new Error('Invalid phone number format for the specified nationality.');
		}

		return next();

	} catch (error: any) {
		return next(new BadRequestError(DomainCode.INVALID_INPUT_FIELD, error.message));
	}
};

export const checkStatusTransition = async (req: Request, _res: Response, next: NextFunction) => {
	try {
		const { id } = req.params;
		const { status: newStatusId } = req.body;

		if (!newStatusId) {
			return next();
		}

		const student = await studentService.getStudentById(id);
		const currentStatus = student?.status;

		if (!currentStatus) {
			throw new BadRequestError(DomainCode.INVALID_INPUT_FIELD, 'Current status is undefined');
		}

		// Không cho phép chuyển sang trạng thái giống hệt trạng thái hiện tại
		if (currentStatus.id === newStatusId) {
			throw new BadRequestError(DomainCode.INVALID_INPUT_FIELD, 'New status cannot be the same as the current status');
		}

		const validTransitions = await studyStatusService.getValidStudyStatusTransitions(currentStatus.id);
		const nextValidStatusIds = validTransitions.map(transition => transition.to);

		if (!nextValidStatusIds.includes(newStatusId)) {
			throw new BadRequestError(DomainCode.INVALID_INPUT_FIELD, 'Invalid status transition');
		}

		return next();
	} catch (error) {
		return next(error);
	}
}