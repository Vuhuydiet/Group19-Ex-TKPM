import express from 'express';
import classController from './class.controller';
import { query, body, param } from 'express-validator';
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

router.get('/', 
  query('courseId').optional().isString(),
  query('year').optional().isInt().toInt(),
  query('semester').optional().isInt().toInt(),
  query('room').optional().isString(),
  handleValidationErrors,
  classController.findAll
);

router.get(
  '/:id',
  param('id').isString().notEmpty(),
  handleValidationErrors,
  classController.findById
);

router.patch(
  '/:id',
  param('id').isString().notEmpty(),
  body('courseId').optional().isString(),
  body('year').optional().isInt().toInt(),
  body('semester').optional().isInt().toInt(),
  body('professorName').optional().isString(),
  body('capacity').optional().isInt({ min: 1 }).toInt(),
  body('schedule').optional().isString(),
  body('room').optional().isString(),
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
