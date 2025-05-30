import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../../../../../core/responses/ErrorResponse";
import { DomainCode } from "../../../../../core/responses/DomainCode";
import StudentManagementService from "../../../domain/services/studentManagement.service";
import { parsePhoneNumberWithError } from "libphonenumber-js";
import StudyStatusService from "../../../domain/services/studyStatus.service";

const NAME_PATTERN = /^[A-Za-z\s]+$/;
const EMAIL_PATTERN = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const PHONE_NUMBER_LENGTH = 10;

export const checkStudentNamePattern = (req: Request, _res: Response, next: NextFunction): void => {
    if (req.method === 'PATCH' && !req.body.name) {
        next();
    }
    
    if (!NAME_PATTERN.test(req.body.name)) {
        throw new BadRequestError(DomainCode.INVALID_INPUT_FIELD, 'Invalid name');
    }
    next();
};

export const checkEmailPattern = async (req: Request, _res: Response, next: NextFunction) => {
    if (req.method === 'PATCH' && !req.body.email) {
        next();
    }

    if (!EMAIL_PATTERN.test(req.body.email)) {
        throw new BadRequestError(DomainCode.INVALID_INPUT_FIELD, 'Invalid email address');
    }

    const emailDomain: string = req.body.email.split('@')[1];
    const allowedDomains = await StudentManagementService.getAllowedEmailDomains();
    if (allowedDomains.filter(domain => domain.domain === emailDomain).length === 0) {
        throw new BadRequestError(DomainCode.INVALID_INPUT_FIELD, 'Invalid email domain');
    }

    next();
}   

export const checkPhoneNumberPattern = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    if (req.method === 'PATCH' && !req.body.phone) {
        next();
    }

    const [nationality, phone] = await (async () => {
        if (req.method === 'PATCH') {
            const id = req.params.id;
            const student = await StudentManagementService.getStudentById(id);
            const nationality = student?.nationality;
            return [nationality, req.body.phone];
        }
        if (req.method === 'POST') {
            return [req.body.nationality, req.body.phone];
        }
        return [];
    })();

    if (phone && phone.length !== PHONE_NUMBER_LENGTH) {
        throw new BadRequestError(DomainCode.INVALID_INPUT_FIELD, 'Invalid phone number');
    }

    const parsedNumber = parsePhoneNumberWithError(phone, nationality);

    if (parsedNumber && parsedNumber.country !== nationality) {
        throw new BadRequestError(DomainCode.INVALID_INPUT_FIELD, 'Invalid phone number: phone number is not from the country the student is living in.');
    }
    
    next();
};


export const checkStatusTransition = async (req: Request, _res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { status } = req.body;

    const student = await StudentManagementService.getStudentById(id);
    const currentStatus = student?.status;

    if (!currentStatus) {
        throw new BadRequestError(DomainCode.INVALID_INPUT_FIELD, 'Current status is undefined');
    }
    const nextStatusesIds = await StudyStatusService.getValidStudyStatusTransitions(currentStatus.id);

    if (!nextStatusesIds.includes(status)) {
        throw new BadRequestError(DomainCode.INVALID_INPUT_FIELD, 'Invalid status transition');
    }

    next();
}
