import express from 'express';
import classController from './class.controller';
import { body, param } from 'express-validator';
import handleValidationErrors from '../../../../../libraries/errorHandler/errorHandler';

const router = express.Router();

router.post(
  '/',
  body('id').isString().notEmpty(),
  body('courseId').isString().notEmpty(),
  body('year').isInt(),
  body('semester').isInt(),
  body('professorName').isString().notEmpty(),
  body('capacity').isInt({ min: 1 }),
  body('schedule').isString().notEmpty(),
  body('room').isString().notEmpty(),
  handleValidationErrors,
  classController.create
);

router.get('/', classController.findAll);

router.get(
  '/:id',
  param('id').isString().notEmpty(),
  handleValidationErrors,
  classController.findById
);

router.patch(
  '/:id',
  param('id').isString().notEmpty(),
  handleValidationErrors,
  classController.update
);

router.delete(
  '/:id',
  param('id').isString().notEmpty(),
  handleValidationErrors,
  classController.delete
);

export default router;
