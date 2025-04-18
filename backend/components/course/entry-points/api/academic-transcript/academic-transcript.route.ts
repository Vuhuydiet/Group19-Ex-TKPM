import express from 'express';
import { param } from 'express-validator';
import handleValidationErrors from '../../../../../libraries/errorHandler/errorHandler';

import academicTranscriptController from './academic-transcript.controller';

const router = express.Router();

router.get(
  '/:studentId',
  param('studentId').isString().notEmpty(),
  handleValidationErrors,
  academicTranscriptController.getTranscript
);

export default router;
