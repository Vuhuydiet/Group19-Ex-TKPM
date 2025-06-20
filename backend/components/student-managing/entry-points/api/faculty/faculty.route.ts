import express from 'express';
const router = express.Router();

import facultyController from './faculty.controller';
import { body, param } from 'express-validator';
import { handleValidationErrors } from '../../../../../libraries/validator/validator';

router.get('/', facultyController.getAllFaculties);

router.get(
  '/:id', 
  param('id').isString().isLength({ min: 1, max: 255 }),
  handleValidationErrors,
  facultyController.getFacultyById
);

router.post(
  '/',
  body('id').isString().isLength({ min: 1, max: 255 }),
  body('name').isString().isLength({ min: 1, max: 255 }),
  body('description').optional().isString().isLength({ min: 1, max: 255 }),
  handleValidationErrors,
  facultyController.createFaculty
);

router.patch(
  '/:id', 
  body('name').optional().isString().isLength({ min: 1, max: 255 }),
  body('description').optional().isString().isLength({ min: 1, max: 255 }),
  handleValidationErrors,
  facultyController.updateFaculty
);

router.delete(
  '/:id',
  param('id').isString().isLength({ min: 1, max: 255 }),
  handleValidationErrors,
  facultyController.deleteFaculty
);


export default router;