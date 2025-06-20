import studentManagerController from "./studentManagement.controller";
import express from "express";
import { checkEmailPattern, checkPhoneNumberPattern, checkStatusTransition } from "./studentManagement.middleware";
import { body, param, query } from "express-validator";
import { handleValidationErrors } from "../../../../../libraries/validator/validator";
const router = express.Router();

router.post('/',
    body('id').isString().isLength({ min: 1, max: 255 }),
    body('name').isString().isLength({ min: 1, max: 255 }),
    body('dob').isISO8601().toDate(),
    body('gender').isIn(['Male', 'Female']),
    body('faculty').isString(),
    body('academicYear').isInt().toInt(),
    body('programId').isString().isLength({ min: 1, max: 255 }),
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
    param('id').isString(),
    handleValidationErrors,
    studentManagerController.removeStudent
);

router.get(
    '/', 
    query('name').optional().isString(),
    query('faculty').optional().isString(),
    handleValidationErrors,
    studentManagerController.getStudents
);

router.get(
    '/id/:id', 
    param('id').isString(),
    handleValidationErrors,
    studentManagerController.getStudentById
);

router.get(
    '/name', 
    query('name').isString(),
    handleValidationErrors,
    studentManagerController.getStudentsByName
);

router.patch(
    '/:id',
    body('name').optional().isString().isLength({ min: 1, max: 255 }),
    body('dob').optional().isISO8601().toDate(),
    body('gender').optional().isIn(['Male', 'Female']),
    body('faculty').optional().isString(),
    body('academicYear').optional().isInt().toInt(),
    body('program').optional().isObject(),
    body('program.id').optional().isString().isLength({ min: 1, max: 255 }),
    body('program.name').optional().isString().isLength({ min: 1, max: 255 }),
    body('program.description').optional().isString().isLength({ min: 1, max: 255 }),
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