import prisma from "../models";


(async function insertAllowedEmailDomains() {
  await prisma.allowedEmailDomain.createMany({
    data: [
      {
        domain: 'student.edu.vn',
      },
      {
        domain: 'hcmus.edu.vn',
      },
    ]
  });
})();

(async function insertStudyStatus() {
  await prisma.studyStatus.createMany({
    data: [
      {
        id: 'DH',
        name: 'Đang học',
      },
      {
        id: 'TN',
        name: 'Đã tốt nghiệp',
      },
      {
        id: 'TH',
        name: 'Đã thôi học',
      },
      {
        id: 'TD',
        name: 'Tạm dừng học',
      }
    ]
  });

  await prisma.validStudyStatusTransition.createMany({
    data: [
      {
        from: 'DH',
        to: 'TN',
      },
      {
        from: 'DH',
        to: 'TH',
      },
      {
        from: 'DH',
        to: 'TD',
      },
      {
        from: 'TD',
        to: 'DH',
      },
    ]
  })
})();


(async function insertFaculties() {
  await prisma.faculty.createMany({
    data: [
      {
        id: 'L',
        name: 'Khoa luật',
      },
      {
        id: 'TA',
        name: 'Khoa tiếng Anh thương mại',
      },
      {
        id: 'TN',
        name: 'Khoa tiếng Nhật',
      },
      {
        id: 'TP',
        name: 'Khoa tiếng Pháp',
      }
    ]
  });
})();

(async function insertCoursesAndClasses() {
  await prisma.course.createMany({
    data: [
      {
        id: 'NL',
        courseName: 'Nhập môn Luật',
        nCredits: 3,
        facultyId: 'L',
        description: 'Luật cơ bản',
        prerequisiteId: null,
        activated: true,
      },
      {
        id: 'TA2',
        courseName: 'Tiếng Anh nâng cao',
        nCredits: 4,
        facultyId: 'TA',
        description: 'Nâng cao kỹ năng tiếng Anh',
        prerequisiteId: null,
        activated: true,
      },
      {
        id: 'TN1',
        courseName: 'Tiếng Nhật cơ bản',
        nCredits: 3,
        facultyId: 'TN',
        description: 'Tiếng Nhật cơ bản',
        prerequisiteId: null,
        activated: true,
      },
      {
        id: 'TP1',
        courseName: 'Tiếng Pháp cơ bản',
        nCredits: 3,
        facultyId: 'TP',
        description: 'Tiếng Pháp cơ bản',
        prerequisiteId: null,
        activated: true,
      },
    ],
  });

  await prisma.class.createMany({
    data: [
      {
        id: 'GV1',
        courseId: 'NL',
        year: 2023,
        semester: 1,
        professorName: 'Dr. Nguyen Van A',
        capacity: 50,
        schedule: 'Mon-Wed 8:00-9:30',
        room: 'Room 101',
      },
      {
        id: 'GV2',
        courseId: 'TA2',
        year: 2023,
        semester: 1,
        professorName: 'Ms. Tran Thi B',
        capacity: 40,
        schedule: 'Tue-Thu 10:00-11:30',
        room: 'Room 202',
      },
      {
        id: 'GV3',
        courseId: 'TN1',
        year: 2023,
        semester: 1,
        professorName: 'Mr. Le Van C',
        capacity: 30,
        schedule: 'Mon-Wed 14:00-15:30',
        room: 'Room 303',
      },
      {
        id: 'GV4',
        courseId: 'TP1',
        year: 2023,
        semester: 1,
        professorName: 'Mme. Pham Thi D',
        capacity: 25,
        schedule: 'Tue-Thu 8:00-9:30',
        room: 'Room 404',
      },
    ],
  });
})();

