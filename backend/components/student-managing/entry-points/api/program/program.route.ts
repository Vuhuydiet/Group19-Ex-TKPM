import express from 'express';
import programController from './program.controller';
import { body, param } from 'express-validator';
import { handleValidationErrors } from '../../../../../libraries/validator/validator';

const router = express.Router();

router.get('/', programController.getAllPrograms);

router.get('/:id',
  param('id').isString(),
  handleValidationErrors,
  programController.getProgramById
);

router.post('/',
  body('id').isString(),
  body('name').isString(),
  body('description').isString(),
  handleValidationErrors,
  programController.createProgram
);

router.put('/:id', 
  param('id').isString(),
  body('name').optional().isString(),
  body('description').optional().isString(),
  handleValidationErrors,
  programController.updateProgram
);

router.delete('/:id',
  param('id').isString(),
  handleValidationErrors,
  programController.deleteProgram
);

export default router;
