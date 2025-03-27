import g_StudentMangerController from "./studentManagement.controller";
import express from "express";
import { checkEmailPattern, checkPhoneNumberPattern, checkStatusTransition } from "./studentManagement.middleware";
import { body } from "express-validator";
import { handleValidationErrors } from "../../../../../libraries/validator/validator";
const router = express.Router();

router.post('/',
    body('id').isString().isLength({ min: 1, max: 255 }),
    body('name').isString().isLength({ min: 1, max: 255 }),
    body('dob').isISO8601(),
    body('gender').isIn(['Nam', 'Nữ']),
    body('faculty').isIn(['Khoa Luật', 'Khoa Tiếng Anh thương mại', 'Khoa Tiếng Nhật', 'Khoa Tiếng Pháp']),
    body('academicYear').isInt(),
    body('program').isString().isLength({ min: 1, max: 255 }),
    body('email').isEmail(),
    body('phone').isString().isLength({ min: 1, max: 255 }),
    body('status').isIn(['Đang học', 'Đã tốt nghiệp', 'Đã thôi học', 'Tạm dừng học']),
    body('identityDocument').isObject(),
    body('nationality').isString(),
    handleValidationErrors,
    checkEmailPattern,
    checkPhoneNumberPattern,
    g_StudentMangerController.addStudent
);

router.delete(
    '/:id', 
    g_StudentMangerController.removeStudent
);

router.get(
    '/', 
    g_StudentMangerController.getStudents
);

router.get(
    '/id/:id', 
    g_StudentMangerController.getStudentById
);

router.get(
    '/name', 
    g_StudentMangerController.getStudentsByName
);

router.patch(
    '/:id', 
    body('id').optional().isString().isLength({ min: 1, max: 255 }),
    body('name').optional().isString().isLength({ min: 1, max: 255 }),
    body('dob').optional().isISO8601(),
    body('gender').optional().isIn(['Nam', 'Nữ']),
    body('faculty').optional().isIn(['Khoa Luật', 'Khoa Tiếng Anh thương mại', 'Khoa Tiếng Nhật', 'Khoa Tiếng Pháp']),
    body('academicYear').isInt(),
    body('program').optional().isString().isLength({ min: 1, max: 255 }),
    body('email').optional().isEmail(),
    body('phone').optional().isString().isLength({ min: 1, max: 255 }),
    body('status').optional().isIn(['Đang học', 'Đã tốt nghiệp', 'Đã thôi học', 'Tạm dừng học']),
    body('identityDocument').optional().isObject(),
    body('nationality').optional().isString(),
    handleValidationErrors,
    checkEmailPattern,
    checkPhoneNumberPattern, 
    checkStatusTransition,
    g_StudentMangerController.updateStudent
);


export default router;