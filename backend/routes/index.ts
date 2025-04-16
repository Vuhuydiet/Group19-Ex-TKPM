import express from 'express';

const router = express.Router();

import studentRouter from '../components/student-managing/entry-points/api/student-management/studentManagement.route';
import importExportRouter from '../components/student-managing/entry-points/api/import-export/importExportStudent.router';
import facultyRouter from '../components/student-managing/entry-points/api/faculty/faculty.route';
import studyStatusRouter from '../components/student-managing/entry-points/api/studyStatus/studyStatus.route';
import studyStatusTransitionRouter from '../components/student-managing/entry-points/api/studyStatus/transition.route';
import courseRouter from '../components/course/entry-points/api/course/course.route';
import courseEnrollmentRouter from '../components/course/entry-points/api/course-enrollment/course-enrollment.route';
import academicTranscriptRouter from '../components/course/entry-points/api/academic-transcript/academic-transcript.route';
import classRouter from '../components/course/entry-points/api/class/class.route';

router.use('/students', studentRouter);
router.use('/utils/students', importExportRouter);
router.use('/faculties', facultyRouter);
router.use('/study-status', studyStatusRouter);
router.use('/study-status-transition', studyStatusTransitionRouter);

router.use('/courses', courseRouter);
router.use('/classes', classRouter);
router.use('/course-enrollments', courseEnrollmentRouter);
router.use('/academic-transcript', academicTranscriptRouter); 

export default router;