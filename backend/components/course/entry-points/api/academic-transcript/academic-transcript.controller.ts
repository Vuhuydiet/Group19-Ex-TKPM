import { Request, Response } from 'express';
import { OKResponse } from '../../../../../core/responses/SuccessResponse';
import AcademicTranscript from '../../../domain/transcript/AcademicTranscipt';
import { Student } from '../../../../student-managing/domain/management/Student';
// You may need to adjust the import below to your actual student storage/service
import StudentManagementService from '../../../../student-managing/domain/services/studentManagement.service';
import { CourseEnrollmentService } from '../../../domain/services/course-enrollment.service';
import { matchedData } from 'express-validator';

class AcademicTranscriptController {
  constructor(
    private readonly studentManagementService = new StudentManagementService(),
    private readonly courseEntrollmentService = new CourseEnrollmentService()
) {}

  async getTranscript(req: Request, res: Response) {
    const { studentId } = matchedData(req);
    // Fetch student info (adjust as needed for your actual service)
    const student: Student = await this.studentManagementService.getStudentById(studentId);

    // Fetch all courses and grades for the student
    const enrollments = await this.courseEntrollmentService.findAll({ studentId });
    const courses = enrollments.map(e => ({
      courseId: e.class.course.id,
      courseName: e.class.course.courseName,
      credits: e.class.course.nCredits,
      grade: e.grade ?? 0
    }));
    const transcript = new AcademicTranscript(student, courses);
    new OKResponse({ message: 'Academic transcript found', metadata: transcript }).send(res);
  }
}

export default new AcademicTranscriptController();
