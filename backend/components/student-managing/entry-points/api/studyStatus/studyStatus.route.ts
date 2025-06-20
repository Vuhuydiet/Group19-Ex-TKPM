import express from 'express';
const router = express.Router();

import studyStatusController from './studyStatus.controller';
import { body, param } from 'express-validator';
import { handleValidationErrors } from '../../../../../libraries/validator/validator';

router.get('/', studyStatusController.getStudyStatuses);

router.post(
  '/',
  body('id').isString().isLength({ min: 1, max: 255 }),
  body('name').isString().isLength({ min: 1, max: 255 }),
  body('description').optional().isString().isLength({ min: 1, max: 255 }),
  handleValidationErrors,
  studyStatusController.addStudyStatus
);

router.patch(
  '/:id',
  param('id').isString().isLength({ min: 1, max: 255 }),
  body('name').optional().isString().isLength({ min: 1, max: 255 }),
  body('description').optional().isString().isLength({ min: 1, max: 255 }),
  handleValidationErrors,
  studyStatusController.updateStudyStatus
);

router.delete(
  '/:id',
  param('id').isString().isLength({ min: 1, max: 255 }),
  handleValidationErrors,
  studyStatusController.removeStudyStatus
);

export default router;