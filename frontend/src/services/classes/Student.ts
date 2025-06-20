// import { OldIdentityCard, NewIdentityCard, Passport } from "./IdentityDocument";

// export class Address {
//   constructor(
//     public city: string,
//     public district: string,
//     public ward: string,
//     public street: string
//   ) {}
// }

// export class Student {
//   constructor(
//     public id: string,
//     public name: string,
//     public dob: string,
//     public gender: string,
//     public faculty: string,
//     public academicYear: number,
//     public program: string,
//     public permanentAddress: Address,
//     public temporaryAddress: Address,
//     public nationality: string,
//     public email: string,
//     public identityDocument: OldIdentityCard | NewIdentityCard | Passport | null,
//     public phone: string,
//     public status: string
//   ) {}

//   toJSON() {
//     return {
//       id: this.id,
//       name: this.name,
//       dob: this.dob,
//       gender: this.gender,
//       faculty: this.faculty,
//       academicYear: this.academicYear,
//       program: this.program,
//       permanentAddress: this.permanentAddress,
//       temporaryAddress: this.temporaryAddress,
//       nationality: this.nationality,
//       email: this.email,
//       identityDocument: this.identityDocument ? this.identityDocument.toJSON() : null,
//       phone: this.phone,
//       status: this.status,
//     };
//   }

//   withUpdated(updates: Partial<Student>): Student {
//     return new Student(
//       updates.id ?? this.id,
//       updates.name ?? this.name,
//       updates.dob ?? this.dob,
//       updates.gender ?? this.gender,
//       updates.faculty ?? this.faculty,
//       updates.academicYear ?? this.academicYear,
//       updates.program ?? this.program,
//       updates.permanentAddress ?? this.permanentAddress,
//       updates.temporaryAddress ?? this.temporaryAddress,
//       updates.nationality ?? this.nationality,
//       updates.email ?? this.email,
//       updates.identityDocument ?? this.identityDocument,
//       updates.phone ?? this.phone,
//       updates.status ?? this.status
//     );
//   }
// }


// // Student.ts
// import { OldIdentityCard, NewIdentityCard, Passport } from "./IdentityDocument";

// export class Address {
//   constructor(
//     public city: string,
//     public district: string,
//     public ward: string,
//     public street: string
//   ) {}
// }

// export class Student {
//   constructor(
//     public id: string,
//     public name: string,
//     public dob: string,
//     public gender: string,
//     public faculty: string,
//     public academicYear: number,
//     public programId: string, // <-- THAY ĐỔI TỪ 'program' SANG 'programId'
//     public permanentAddress: Address,
//     public temporaryAddress: Address,
//     public nationality: string,
//     public email: string,
//     public identityDocument: OldIdentityCard | NewIdentityCard | Passport | null,
//     public phone: string,
//     public status: string
//   ) {}

//   toJSON() {
//     return {
//       id: this.id,
//       name: this.name,
//       dob: this.dob,
//       gender: this.gender,
//       faculty: this.faculty,
//       academicYear: this.academicYear,
//       programId: this.programId, // <-- THAY ĐỔI Ở ĐÂY
//       permanentAddress: this.permanentAddress,
//       temporaryAddress: this.temporaryAddress,
//       nationality: this.nationality,
//       email: this.email,
//       identityDocument: this.identityDocument ? this.identityDocument.toJSON() : null,
//       phone: this.phone,
//       status: this.status,
//     };
//   }

//   withUpdated(updates: Partial<Student>): Student {
//     return new Student(
//       updates.id ?? this.id,
//       updates.name ?? this.name,
//       updates.dob ?? this.dob,
//       updates.gender ?? this.gender,
//       updates.faculty ?? this.faculty,
//       updates.academicYear ?? this.academicYear,
//       updates.programId ?? this.programId, // <-- THAY ĐỔI Ở ĐÂY
//       updates.permanentAddress ?? this.permanentAddress,
//       updates.temporaryAddress ?? this.temporaryAddress,
//       updates.nationality ?? this.nationality,
//       updates.email ?? this.email,
//       updates.identityDocument ?? this.identityDocument,
//       updates.phone ?? this.phone,
//       updates.status ?? this.status
//     );
//   }
// }


// Student.ts

import { OldIdentityCard, NewIdentityCard, Passport } from "./IdentityDocument";
// Giả định bạn có các interface này được export từ các file services tương ứng
// Hãy đảm bảo đường dẫn import là chính xác
import { Faculty } from "../../services/facultyAPIServices";
import { StudyStatus } from "../../services/studentStatusAPIServices";


export class Address {
  constructor(
    public city: string,
    public district: string,
    public ward: string,
    public street: string
  ) {}
}

export class Student {
  constructor(
    public id: string,
    public name: string,
    public dob: string,
    public gender: string,
    // THAY ĐỔI Ở ĐÂY: Cho phép kiểu dữ liệu là string hoặc object Faculty
    public faculty: string | Faculty,
    public academicYear: number,
    public programId: string,
    public permanentAddress: Address,
    public temporaryAddress: Address,
    public nationality: string,
    public email: string,
    public identityDocument: OldIdentityCard | NewIdentityCard | Passport | null,
    public phone: string,
    // THAY ĐỔI Ở ĐÂY: Cho phép kiểu dữ liệu là string hoặc object StudyStatus
    public status: string | StudyStatus
  ) {}

  toJSON() {
    // Hàm toJSON cần "làm phẳng" lại các object quan hệ thành ID trước khi gửi đi
    return {
      id: this.id,
      name: this.name,
      dob: this.dob,
      gender: this.gender,
      // Nếu faculty là object thì lấy id, ngược lại thì giữ nguyên (vì nó đã là id)
      faculty: typeof this.faculty === 'object' ? this.faculty.id : this.faculty,
      academicYear: this.academicYear,
      programId: this.programId,
      permanentAddress: this.permanentAddress,
      temporaryAddress: this.temporaryAddress,
      nationality: this.nationality,
      email: this.email,
      identityDocument: this.identityDocument ? this.identityDocument.toJSON() : null,
      phone: this.phone,
      // Nếu status là object thì lấy id, ngược lại thì giữ nguyên
      status: typeof this.status === 'object' ? this.status.id : this.status,
    };
  }

  // Hàm withUpdated không cần thay đổi nhiều nhờ có Partial<T>
  withUpdated(updates: Partial<Student>): Student {
    return new Student(
      updates.id ?? this.id,
      updates.name ?? this.name,
      updates.dob ?? this.dob,
      updates.gender ?? this.gender,
      updates.faculty ?? this.faculty,
      updates.academicYear ?? this.academicYear,
      updates.programId ?? this.programId,
      updates.permanentAddress ?? this.permanentAddress,
      updates.temporaryAddress ?? this.temporaryAddress,
      updates.nationality ?? this.nationality,
      updates.email ?? this.email,
      updates.identityDocument ?? this.identityDocument,
      updates.phone ?? this.phone,
      updates.status ?? this.status
    );
  }
}