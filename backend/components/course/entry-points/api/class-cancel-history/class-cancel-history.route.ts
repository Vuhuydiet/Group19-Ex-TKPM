import express from 'express';
import classCancelHistoryController from './class-cancel-history.controller';
import { body, param } from 'express-validator';
import handleValidationErrors from '../../../../../libraries/errorHandler/errorHandler';

const router = express.Router();

router.post(
  '/',
  body('studentId').isString().notEmpty(),
  body('classId').isString().notEmpty(),
  body('canceledAt').isISO8601(),
  handleValidationErrors,
  classCancelHistoryController.create
);

router.get('/', classCancelHistoryController.findAll);

router.get(
  '/:studentId/:classId/:canceledAt',
  param('studentId').isString().notEmpty(),
  param('classId').isString().notEmpty(),
  param('canceledAt').isISO8601(),
  handleValidationErrors,
  classCancelHistoryController.findById
);

router.patch(
  '/:studentId/:classId/:canceledAt',
  param('studentId').isString().notEmpty(),
  param('classId').isString().notEmpty(),
  param('canceledAt').isISO8601(),
  handleValidationErrors,
  classCancelHistoryController.update
);

router.delete(
  '/:studentId/:classId/:canceledAt',
  param('studentId').isString().notEmpty(),
  param('classId').isString().notEmpty(),
  param('canceledAt').isISO8601(),
  handleValidationErrors,
  classCancelHistoryController.delete
);

export default router;
