import g_StudentManagerController from "./studentManagement.controller";
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
    body('email').isEmail(),
    body('phone').isString().isLength({ min: 1, max: 255 }),
    body('status').isString(),
    body('identityDocument').isObject(),
    body('nationality').isString(),
    handleValidationErrors,
    checkEmailPattern,
    checkPhoneNumberPattern,
    g_StudentManagerController.addStudent
);

router.delete(
    '/:id', 
    g_StudentManagerController.removeStudent
);

router.get(
    '/', 
    g_StudentManagerController.getStudents
);

router.get(
    '/id/:id', 
    g_StudentManagerController.getStudentById
);

router.get(
    '/name', 
    g_StudentManagerController.getStudentsByName
);

router.patch(
    '/:id', 
    body('id').optional().isString().isLength({ min: 1, max: 255 }),
    body('name').optional().isString().isLength({ min: 1, max: 255 }),
    body('dob').optional().isISO8601().toDate(),
    body('gender').optional().isIn(['Nam', 'Nữ']),
    body('faculty').optional().isString(),
    body('academicYear').isInt().toInt(),
    body('program').optional().isString().isLength({ min: 1, max: 255 }),
    body('email').optional().isEmail(),
    body('phone').optional().isString().isLength({ min: 1, max: 255 }),
    body('status').optional().isString(),
    body('identityDocument').optional().isObject(),
    body('nationality').optional().isString(),
    handleValidationErrors,
    checkEmailPattern,
    checkPhoneNumberPattern, 
    checkStatusTransition,
    g_StudentManagerController.updateStudent
);


export default router;