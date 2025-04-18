import express from 'express';
import courseController from './course.controller';
import { body, param } from 'express-validator';
import handleValidationErrors from '../../../../../libraries/errorHandler/errorHandler';

const router = express.Router();

router.post(
  '/',
  body('id').isString().notEmpty(),
  body('courseName').isString().notEmpty(),
  body('nCredits').isInt({ min: 2 }),
  body('facultyId').isString().notEmpty(),
  body('description').isString().notEmpty(),
  body('prerequisiteId').optional().isString(),
  handleValidationErrors,
  courseController.create
);

router.get('/', courseController.findAll);

router.get(
  '/:id',
  param('id').isString().notEmpty(),
  handleValidationErrors,
  courseController.findById
);

router.patch(
  '/:id',
  param('id').isString().notEmpty(),
  body('courseName').optional().isString().notEmpty(),
  body('nCredits').optional().isInt({ min: 2 }),
  body('facultyId').optional().isString().notEmpty(),
  body('description').optional().isString().notEmpty(),
  body('prerequisiteId').optional().isString(),
  handleValidationErrors,
  courseController.update
);

router.delete(
  '/:id',
  param('id').isString().notEmpty(),
  handleValidationErrors,
  courseController.delete
);

export default router;
