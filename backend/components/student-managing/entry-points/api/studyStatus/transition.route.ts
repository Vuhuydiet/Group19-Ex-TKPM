import express from 'express';
const router = express.Router();

import studyStatusController from './studyStatus.controller';
import { body } from 'express-validator';
import { handleValidationErrors } from '../../../../../libraries/validator/validator';

router.post(
  '/',
  body('from').isString().isLength({ min: 1, max: 255 }),
  body('to').isString().isLength({ min: 1, max: 255 }),
  handleValidationErrors,
  studyStatusController.addValidStudyStatusTransition
);

router.delete(
  '/',
  body('from').isString().isLength({ min: 1, max: 255 }),
  body('to').isString().isLength({ min: 1, max: 255 }),
  handleValidationErrors,
  studyStatusController.removeValidStudyStatusTransition
)

export default router;