import { OldIdentityCard, NewIdentityCard, Passport } from "./IdentityDocument";

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
    public faculty: string,
    public academicYear: number,
    public program: string,
    public permanentAddress: Address,
    public temporaryAddress: Address,
    public nationality: string,
    public email: string,
    public identityDocument: OldIdentityCard | NewIdentityCard | Passport | null,
    public phone: string,
    public status: string
  ) {}

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      dob: this.dob,
      gender: this.gender,
      faculty: this.faculty,
      academicYear: this.academicYear,
      program: this.program,
      permanentAddress: this.permanentAddress,
      temporaryAddress: this.temporaryAddress,
      nationality: this.nationality,
      email: this.email,
      identityDocument: this.identityDocument ? this.identityDocument.toJSON() : null,
      phone: this.phone,
      status: this.status,
    };
  }

  withUpdated(updates: Partial<Student>): Student {
    return new Student(
      updates.id ?? this.id,
      updates.name ?? this.name,
      updates.dob ?? this.dob,
      updates.gender ?? this.gender,
      updates.faculty ?? this.faculty,
      updates.academicYear ?? this.academicYear,
      updates.program ?? this.program,
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
