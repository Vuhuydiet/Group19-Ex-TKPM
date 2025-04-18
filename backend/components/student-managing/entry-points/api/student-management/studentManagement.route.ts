import studentManagerController from "./studentManagement.controller";
import express from "express";
import { checkEmailPattern, checkPhoneNumberPattern, checkStatusTransition } from "./studentManagement.middleware";
import { body } from "express-validator";
import { handleValidationErrors } from "../../../../../libraries/validator/validator";
const router = express.Router();

router.post('/',
    body('id').isString().isLength({ min: 1, max: 255 }),
    body('name').isString().isLength({ min: 1, max: 255 }),
    body('dob').isISO8601().toDate(),
    body('gender').isIn(['Nam', 'Nữ']),
    body('faculty').isString(),
    body('academicYear').isInt().toInt(),
    body('program').isString().isLength({ min: 1, max: 255 }),
    body('permanentAddress').isObject(),
    body('permanentAddress.city').isString(),
    body('permanentAddress.district').isString(),
    body('permanentAddress.ward').isString(),
    body('permanentAddress.street').isString(),
    body('temporaryAddress').optional().isObject(),
    body('temporaryAddress.city').optional().isString(),
    body('temporaryAddress.district').optional().isString(),
    body('temporaryAddress.ward').optional().isString(),
    body('temporaryAddress.street').optional().isString(),
    body('email').isEmail(),
    body('phone').isString().isLength({ min: 1, max: 255 }),
    body('status').isString(),
    body('identityDocument').isObject(),
    body('nationality').isString(),
    handleValidationErrors,
    checkEmailPattern,
    checkPhoneNumberPattern,
    studentManagerController.addStudent
);

router.delete(
    '/:id', 
    studentManagerController.removeStudent
);

router.get(
    '/', 
    studentManagerController.getStudents
);

router.get(
    '/id/:id', 
    studentManagerController.getStudentById
);

router.get(
    '/name', 
    studentManagerController.getStudentsByName
);

router.patch(
    '/:id',
    body('name').optional().isString().isLength({ min: 1, max: 255 }),
    body('dob').optional().isISO8601().toDate(),
    body('gender').optional().isIn(['Nam', 'Nữ']),
    body('faculty').optional().isString(),
    body('academicYear').optional().isInt().toInt(),
    body('program').optional().isString().isLength({ min: 1, max: 255 }),
    body('permanentAddress').optional().isObject(),
    body('permanentAddress.city').optional().isString(),
    body('permanentAddress.district').optional().isString(),
    body('permanentAddress.ward').optional().isString(),
    body('permanentAddress.street').optional().isString(),
    body('temporaryAddress').optional().isObject(),
    body('temporaryAddress.city').optional().isString(),
    body('temporaryAddress.district').optional().isString(),
    body('temporaryAddress.ward').optional().isString(),
    body('temporaryAddress.street').optional().isString(),
    body('email').optional().isEmail(),
    body('phone').optional().isString().isLength({ min: 1, max: 255 }),
    body('status').optional().isString(),
    body('identityDocument').optional().isObject(),
    body('nationality').optional().isString(),
    handleValidationErrors,
    checkEmailPattern,
    checkPhoneNumberPattern, 
    checkStatusTransition,
    studentManagerController.updateStudent
);


export default router;