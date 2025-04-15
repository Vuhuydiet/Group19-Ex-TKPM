import express from 'express';
import enrollmentRecordController from './enrollment-record.controller';
import { body, param } from 'express-validator';
import handleValidationErrors from '../../../../../libraries/errorHandler/errorHandler';

const router = express.Router();

router.post(
  '/',
  body('studentId').isString().notEmpty(),
  body('classId').isString().notEmpty(),
  body('grade').optional().isNumeric(),
  handleValidationErrors,
  enrollmentRecordController.create
);

router.get('/', enrollmentRecordController.findAll);

router.get(
  '/:studentId/:classId',
  param('studentId').isString().notEmpty(),
  param('classId').isString().notEmpty(),
  handleValidationErrors,
  enrollmentRecordController.findById
);

router.patch(
  '/:studentId/:classId',
  param('studentId').isString().notEmpty(),
  param('classId').isString().notEmpty(),
  handleValidationErrors,
  enrollmentRecordController.update
);

router.delete(
  '/:studentId/:classId',
  param('studentId').isString().notEmpty(),
  param('classId').isString().notEmpty(),
  handleValidationErrors,
  enrollmentRecordController.delete
);

export default router;
