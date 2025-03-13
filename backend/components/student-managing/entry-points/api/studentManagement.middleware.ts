import { Request, Response, NextFunction } from "express";

const NAME_PATTERN = /^[A-Za-z\s]+$/;
const EMAIL_PATTERN = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const PHONE_NUMBER_LENGTH = 10;

export const checkStudentNamePattern = (req: Request, res: Response, next: NextFunction): void => {
    if (req.method === 'PATCH' && !req.body.name) {
        next();
    }
    
    if (!NAME_PATTERN.test(req.body.name)) {
        res.status(400).json({ message: 'Invalid student name' });
        return;
    }
    next();
};

export const checkEmailPattern = (req: Request, res: Response, next: NextFunction): void => {
    if (req.method === 'PATCH' && !req.body.email) {
        next();
    }

    if (!EMAIL_PATTERN.test(req.body.email)) {
        res.status(400).json({ message: 'Invalid email' });
        return;
    }
    next();
}   

export const checkPhoneNumberPattern = (req: Request, res: Response, next: NextFunction): void => {
    if (req.method === 'PATCH' && !req.body.phone) {
        next();
    }

    if (!req.body.phone || req.body.phone.length !== PHONE_NUMBER_LENGTH) {
        res.status(400).json({ message: 'Phone number should have 10 digits' });
        return;
    }
    next();
};
