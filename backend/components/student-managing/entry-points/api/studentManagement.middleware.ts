import { Request, Response, NextFunction } from "express";
import { DomainError } from "../../../../core/responses/ErrorResponse";
import { DomainCode } from "../../../../core/responses/DomainCode";

const NAME_PATTERN = /^[A-Za-z\s]+$/;
const EMAIL_PATTERN = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const PHONE_NUMBER_LENGTH = 10;

export const checkStudentNamePattern = (req: Request, res: Response, next: NextFunction): void => {
    if (req.method === 'PATCH' && !req.body.name) {
        next();
    }
    
    if (!NAME_PATTERN.test(req.body.name)) {
        throw new DomainError(DomainCode.INVALID_INPUT_FIELD, 'Invalid student name');
    }
    next();
};

export const checkEmailPattern = (req: Request, res: Response, next: NextFunction): void => {
    if (req.method === 'PATCH' && !req.body.email) {
        next();
    }

    if (!EMAIL_PATTERN.test(req.body.email)) {
        throw new DomainError(DomainCode.INVALID_INPUT_FIELD, 'Invalid email address');
    }
    next();
}   

export const checkPhoneNumberPattern = (req: Request, res: Response, next: NextFunction): void => {
    if (req.method === 'PATCH' && !req.body.phone) {
        next();
    }

    if (!req.body.phone || req.body.phone.length !== PHONE_NUMBER_LENGTH) {
        throw new DomainError(DomainCode.INVALID_INPUT_FIELD, 'Invalid phone number');
    }
    next();
};
