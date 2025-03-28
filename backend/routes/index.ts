import express from 'express';

const router = express.Router();

import studentRouter from '../components/student-managing/entry-points/api/student-management/studentManagement.route';
import importExportRouter from '../components/student-managing/entry-points/api/import-export/importExportStudent.router';
import facultyRouter from '../components/student-managing/entry-points/api/faculty/faculty.route';
import studyStatusRouter from '../components/student-managing/entry-points/api/studyStatus/studyStatus.route';


router.use('/students', studentRouter);
router.use('/utils/students', importExportRouter);
router.use('/faculties', facultyRouter);
router.use('/study-status', studyStatusRouter);
router.use('/study-status-transition', studyStatusRouter);

export default router;