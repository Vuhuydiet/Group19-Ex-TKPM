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

