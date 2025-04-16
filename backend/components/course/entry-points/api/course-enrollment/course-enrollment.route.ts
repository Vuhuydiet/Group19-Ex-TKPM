import express from 'express';
import courseEnrollmentController from './course-enrollment.controller';
import { body, param, query } from 'express-validator';
import handleValidationErrors from '../../../../../libraries/errorHandler/errorHandler';

const router = express.Router();

router.post(
  '/',
  body('studentId').isString().notEmpty(),
  body('classId').isString().notEmpty(),
  body('grade').optional().isNumeric(),
  handleValidationErrors,
  courseEnrollmentController.create
);

router.get('/', courseEnrollmentController.findAll);

router.get(
  '/:studentId/:classId',
  param('studentId').isString().notEmpty(),
  param('classId').isString().notEmpty(),
  handleValidationErrors,
  courseEnrollmentController.findById
);

router.patch(
  '/:studentId/:classId',
  param('studentId').isString().notEmpty(),
  param('classId').isString().notEmpty(),
  body('grade').optional().isNumeric(),
  handleValidationErrors,
  courseEnrollmentController.update
);

router.delete(
  '/:studentId/:classId',
  param('studentId').isString().notEmpty(),
  param('classId').isString().notEmpty(),
  handleValidationErrors,
  courseEnrollmentController.cancelClass
);

router.get('/cancel-history',
  query('studentId').optional().isString().notEmpty(),
  handleValidationErrors, 
  courseEnrollmentController.findAllCanceledHistory);

export default router;
