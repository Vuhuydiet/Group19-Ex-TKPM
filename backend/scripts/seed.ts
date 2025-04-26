import prisma from "../models";

async function seedDatabase() {
  // Clear existing data
  await prisma.validStudyStatusTransition.deleteMany();
  await prisma.student.deleteMany(); 
  await prisma.studyStatus.deleteMany();
  await prisma.allowedEmailDomain.deleteMany();
  await prisma.class.deleteMany();
  await prisma.course.deleteMany();
  await prisma.faculty.deleteMany();
  await prisma.identityDocument.deleteMany();
  await prisma.address.deleteMany(); 

  // Insert data sequentially
  await insertAllowedEmailDomains();
  await insertStudyStatus();
  await insertFaculties();
  await insertCoursesAndClasses();
  await insertAddresses();
  await insertIdentityDocuments();
  await insertStudents();
}

async function insertAllowedEmailDomains() {
  await prisma.allowedEmailDomain.createMany({
    data: [
      { domain: 'student.edu.vn' },
      { domain: 'hcmus.edu.vn' },
    ],
  });
}

async function insertStudyStatus() {
  await prisma.studyStatus.createMany({
    data: [
      { id: 'DH', name: 'Đang học' },
      { id: 'TN', name: 'Đã tốt nghiệp' },
      { id: 'TH', name: 'Đã thôi học' },
      { id: 'TD', name: 'Tạm dừng học' },
    ],
  });

  await prisma.validStudyStatusTransition.createMany({
    data: [
      { from: 'DH', to: 'TN' },
      { from: 'DH', to: 'TH' },
      { from: 'DH', to: 'TD' },
      { from: 'TD', to: 'DH' },
    ],
  });
}

async function insertFaculties() {
  await prisma.faculty.createMany({
    data: [
      { id: 'L', name: 'Khoa luật' },
      { id: 'TA', name: 'Khoa tiếng Anh thương mại' },
      { id: 'TN', name: 'Khoa tiếng Nhật' },
      { id: 'TP', name: 'Khoa tiếng Pháp' },
    ],
  });
}

async function insertCoursesAndClasses() {
  await prisma.course.createMany({
    data: [
      { id: 'NL', courseName: 'Nhập môn Luật', nCredits: 3, facultyId: 'L', description: 'Luật cơ bản', prerequisiteId: null, activated: true },
      { id: 'TA2', courseName: 'Tiếng Anh nâng cao', nCredits: 4, facultyId: 'TA', description: 'Nâng cao kỹ năng tiếng Anh', prerequisiteId: null, activated: true },
      { id: 'TN1', courseName: 'Tiếng Nhật cơ bản', nCredits: 3, facultyId: 'TN', description: 'Tiếng Nhật cơ bản', prerequisiteId: null, activated: true },
      { id: 'TP1', courseName: 'Tiếng Pháp cơ bản', nCredits: 3, facultyId: 'TP', description: 'Tiếng Pháp cơ bản', prerequisiteId: null, activated: true },
    ],
  });

  await prisma.class.createMany({
    data: [
      { id: 'GV1', courseId: 'NL', year: 2023, semester: 1, professorName: 'Dr. Nguyen Van A', capacity: 50, schedule: 'Mon-Wed 8:00-9:30', room: 'Room 101' },
      { id: 'GV2', courseId: 'TA2', year: 2023, semester: 1, professorName: 'Ms. Tran Thi B', capacity: 40, schedule: 'Tue-Thu 10:00-11:30', room: 'Room 202' },
      { id: 'GV3', courseId: 'TN1', year: 2023, semester: 1, professorName: 'Mr. Le Van C', capacity: 30, schedule: 'Mon-Wed 14:00-15:30', room: 'Room 303' },
      { id: 'GV4', courseId: 'TP1', year: 2023, semester: 1, professorName: 'Mme. Pham Thi D', capacity: 25, schedule: 'Tue-Thu 8:00-9:30', room: 'Room 404' },
    ],
  });
}

async function insertAddresses() {
  await prisma.address.createMany({
    data: [
      { id: 'ADDR001', city: 'Ho Chi Minh City', district: 'District 1', ward: 'Ward 1', street: '123 Main Street' },
      { id: 'ADDR002', city: 'Ho Chi Minh City', district: 'District 3', ward: 'Ward 5', street: '456 Another Street' },
      { id: 'ADDR003', city: 'Ho Chi Minh City', district: 'District 5', ward: 'Ward 10', street: '789 Temporary Street' },
      { id: 'ADDR004', city: 'Ho Chi Minh City', district: 'District 3', ward: 'Ward 5', street: '456 Another Street' },
      { id: 'ADDR005', city: 'Ho Chi Minh City', district: 'District 5', ward: 'Ward 10', street: '789 Temporary Street' },
    ],
  });
}

async function insertIdentityDocuments() {
  await prisma.identityDocument.createMany({
    data: [
      { id: 'ID001', type: 'ID Card', issuedDate: new Date('2015-01-01'), expiredDate: new Date('2025-01-01'), issuedPlace: 'Ho Chi Minh City', hasChip: false, passportNumber: null, issuedCountry: null, note: null },
      { id: 'ID002', type: 'Passport', issuedDate: new Date('2020-01-01'), expiredDate: new Date('2030-01-01'), issuedPlace: 'Ho Chi Minh City', hasChip: null, passportNumber: 'A1234567', issuedCountry: 'Vietnam', note: null },
      { id: 'ID003', type: 'Passport', issuedDate: new Date('2021-01-01'), expiredDate: new Date('2031-01-01'), issuedPlace: 'Ho Chi Minh City', hasChip: null, passportNumber: 'B1234567', issuedCountry: 'Vietnam', note: null },
      { id: 'ID004', type: 'Passport', issuedDate: new Date('2022-01-01'), expiredDate: new Date('2032-01-01'), issuedPlace: 'Ho Chi Minh City', hasChip: null, passportNumber: 'C1234567', issuedCountry: 'Vietnam', note: null },
    ],
  });
}

async function insertStudents() {
  await prisma.student.createMany({
    data: [
      { id: 'S001', name: 'Nguyen Quoc Tuong', dob: new Date('2004-01-01'), gender: 'Male', facultyId: 'L', academicYear: 2023, program: 'Bachelor of Law', permanentAddressId: 'ADDR001', temporaryAddressId: null, email: 'nguyenquoctuong@student.edu.vn', phone: '0123456789', statusId: 'DH', identityDocumentId: 'ID001', nationality: 'Vietnamese' },
      { id: 'S002', name: 'Tran Bao Tran', dob: new Date('2004-02-15'), gender: 'Female', facultyId: 'TA', academicYear: 2023, program: 'Bachelor of English', permanentAddressId: 'ADDR002', temporaryAddressId: 'ADDR003', email: 'tranthib@student.edu.vn', phone: '0987654321', statusId: 'DH', identityDocumentId: 'ID002', nationality: 'Vietnamese' },
      { id: 'S003', name: 'Nguyen Truong Vu', dob: new Date('2004-03-25'), gender: 'Female', facultyId: 'TA', academicYear: 2023, program: 'Bachelor of English', permanentAddressId: 'ADDR004', temporaryAddressId: 'ADDR005', email: 'nguyentruongvu@student.edu.vn', phone: '0987654322', statusId: 'DH', identityDocumentId: 'ID003', nationality: 'Vietnamese' },
      { id: 'S004', name: 'Tran Quang Tuyen', dob: new Date('2004-05-05'), gender: 'Female', facultyId: 'TA', academicYear: 2023, program: 'Bachelor of English', permanentAddressId: 'ADDR002', temporaryAddressId: 'ADDR003', email: 'tranquangtuyen@student.edu.vn', phone: '0987654323', statusId: 'DH', identityDocumentId: 'ID004', nationality: 'Vietnamese' },
    ],
  });
}

seedDatabase()
  .then(() => {
    console.log('Seeding completed successfully.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error during seeding:', error);
    process.exit(1);
  });