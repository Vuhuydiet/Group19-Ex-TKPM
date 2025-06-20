import prisma from "../../../../models";
import { Student } from "./Student";

export class StudentManager {
  async add(student: Student): Promise<void> {

    const permanentAddress = await prisma.address.create({
        data: {
          ...student.permanentAddress,
        },
    });

    let temporaryAddress;
    if (student.temporaryAddress) {
      temporaryAddress = await prisma.address.create({
        data: {
          ...student.temporaryAddress,
        },
      });
    }

    let identityDocument;
    if (student.identityDocument) {
      identityDocument = await prisma.identityDocument.create({
        data: {
          ...(student.identityDocument as any),
        },
      });
    }
    
    await prisma.student.create({
      data: {
        id: student.id,
        name: student.name,
        dob: student.dob,
        gender: student.gender,
        academicYear: student.academicYear,
        email: student.email,
        phone: student.phone,
        permanentAddress: { connect: { id: permanentAddress.id } },
        temporaryAddress: temporaryAddress 
          ? { connect: { id: temporaryAddress.id } }
          : undefined,
        faculty: { connect: { id: student.faculty.id } },
        status: { connect: { id: student.status.id } },
        identityDocument: identityDocument
        ? { connect: { id: identityDocument.id } }
        : undefined,
        nationality: student.nationality,
        program: typeof student.program === 'string'
          ? { connect: { id: student.program } }
          : { connect: { id: student.program.id } },
      },
    });
  }

  async getStudentById(id: string): Promise<Student | null> {
    const result = await prisma.student.findUnique({
      where: { id },
      include: {
        permanentAddress: true,
        temporaryAddress: true,
        faculty: true,
        status: true,
        identityDocument: true,
        program: true, 
      },
    });

    if (!result) return null;

    return {
      id: result.id,
      name: result.name,
      dob: result.dob,
      gender: result.gender,
      academicYear: result.academicYear,
      email: result.email,
      phone: result.phone,
      permanentAddress: result.permanentAddressId
        ? await prisma.address.findUnique({ where: { id: result.permanentAddressId } })
        : null,
      temporaryAddress: result.temporaryAddressId
      ? await prisma.address.findUnique({ where: { id: result.temporaryAddressId } })
      : null,
      faculty: result.faculty ?? (result.facultyId ? await prisma.faculty.findUnique({ where: { id: result.facultyId } }) : null),
      status: result.status ?? (result.statusId ? await prisma.studyStatus.findUnique({ where: { id: result.statusId } }) : null),
      identityDocument: result.identityDocument ?? (result.identityDocumentId ? await prisma.identityDocument.findUnique({ where: { id: result.identityDocumentId } }) : null),
      nationality: result.nationality,
      program: result.program ?? null,
    } as unknown as Student;
  }

  async getStudents(query: { name?: string; faculty?: string }): Promise<Student[]> {
    const results = await prisma.student.findMany({
      where: {
        AND: [
          query.name
            ? { name: { contains: query.name.toLowerCase(), mode: 'default' } }
            : {},
          query.faculty ? { faculty: { id: query.faculty } } : {},
        ],
      },
      include: {
        permanentAddress: true,
        temporaryAddress: true,
        faculty: true,
        status: true,
        identityDocument: true,
        program: true, 
      },
    });

    return await Promise.all(results.map(async result => ({
      id: result.id,
      name: result.name,
      dob: result.dob,
      gender: result.gender,
      academicYear: result.academicYear,
      email: result.email,
      phone: result.phone,
      permanentAddress: result.permanentAddressId
        ? await prisma.address.findUnique({ where: { id: result.permanentAddressId } })
        : null,
      temporaryAddress: result.temporaryAddressId
        ? await prisma.address.findUnique({ where: { id: result.temporaryAddressId } })
        : null,
      faculty: result.faculty ?? (result.facultyId ? await prisma.faculty.findUnique({ where: { id: result.facultyId } }) : null),
      status: result.status ?? (result.statusId ? await prisma.studyStatus.findUnique({ where: { id: result.statusId } }) : null),
      identityDocument: result.identityDocument ?? (result.identityDocumentId ? await prisma.identityDocument.findUnique({ where: { id: result.identityDocumentId } }) : null),
      nationality: result.nationality,
      program: result.program ?? null,
    } as unknown as Student)));
  }

  // async update(id: string, studentInfo: Partial<Student>): Promise<void> {
  //   const updateData: any = { ...studentInfo };

  //   if (studentInfo.permanentAddress) {
  //     updateData.permanentAddress = {
  //       connect: { id: studentInfo.permanentAddress.id },
  //     };
  //   }

  //   if (studentInfo.temporaryAddress) {
  //     updateData.temporaryAddress = {
  //       connect: { id: studentInfo.temporaryAddress.id },
  //     };
  //   }

  //   if (studentInfo.faculty) {
  //     updateData.faculty = {
  //       connect: { id: studentInfo.faculty.id },
  //     };
  //   }

  //   if (studentInfo.status) {
  //     updateData.status = {
  //       connect: { id: studentInfo.status.id },
  //     };
  //   }

  //   if (studentInfo.identityDocument) {
  //     updateData.identityDocument = {
  //       connect: { id: studentInfo.identityDocument.id },
  //     };
  //   }

  //   await prisma.student.update({
  //     where: { id },
  //     data: updateData,
  //   });
  // }



  async update(id: string, studentInfo: Partial<Student> & { programId?: string }): Promise<void> {
    // Tách các trường ra khỏi payload 'studentInfo'
    const {
        faculty,
        status,
        programId, // <-- Bây giờ TypeScript sẽ không báo lỗi nữa
        permanentAddress,
        temporaryAddress,
        identityDocument,
        ...scalarData // Gồm các trường còn lại như name, dob, gender...
    } = studentInfo;

    // Bắt đầu xây dựng object data cho Prisma với các trường đơn giản
    const dataForPrisma: any = {
        ...scalarData
    };

    // --- XỬ LÝ CÁC TRƯỜNG QUAN HỆ ---

    // Chuyển đổi ID string từ payload sang object connect
    if (faculty) {
        dataForPrisma.faculty = { connect: { id: String(faculty) } };
    }
    if (status) {
        dataForPrisma.status = { connect: { id: String(status) } };
    }
    if (programId) {
        // Quan hệ trong Prisma tên là 'program'
        dataForPrisma.program = { connect: { id: programId } };
    }
    
    // Xử lý các object phức tạp
    if (identityDocument) {
        dataForPrisma.identityDocument = {
            // Upsert: update nếu đã tồn tại, create nếu chưa
            upsert: {
                where: { id: String(identityDocument.id) },
                update: { ...identityDocument, id: String(identityDocument.id) },
                create: { ...identityDocument, id: String(identityDocument.id) }
            }
        };
    }
    if (permanentAddress) {
        const { id: _addressId, ...addressData } = permanentAddress;
        dataForPrisma.permanentAddress = { update: addressData };
    }
    if (temporaryAddress) {
        const { id: _addressId, ...addressData } = temporaryAddress;
        dataForPrisma.temporaryAddress = { update: addressData };
    }

    // Chỉ gọi update nếu có ít nhất một trường cần thay đổi
    if (Object.keys(dataForPrisma).length > 0) {
        await prisma.student.update({
            where: { id },
            data: dataForPrisma,
        });
    }
  }
  
  
 
  async remove(id: string): Promise<void> {
    await prisma.student.delete({
      where: { id },
    });
  }
}