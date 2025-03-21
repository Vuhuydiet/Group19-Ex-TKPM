import IdentityDocument from "./IdentityDocument";

export type Gender = 'Nam' | 'Nữ';

export type Faculty = 'Khoa Luật' | 'Khoa Tiếng Anh thương mại' | 'Khoa Tiếng Nhật' | 'Khoa Tiếng Pháp' | '';

export type StudyStatus = 'Đang học' | 'Đã tốt nghiệp' | 'Đã thôi học' | 'Tạm dừng học';

export type Address = {
  city: string;
  district: string;
  ward: string;
  street: string;
};

export class Student {
  private _id: string;
  private _name: string;
  private _dob: Date;
  private _gender: Gender;
  private _faculty: Faculty;
  private _academicYear: number;
  private _program: string;
  private _permanentAddress: Address;
  private _temporaryAddress?: Address;
  private _email: string;
  private _phone: string;
  private _status: StudyStatus;
  private _identityDocument?: IdentityDocument;
  private _nationality: string;

  constructor(
    id: string,
    name: string,
    dob: Date,
    gender: Gender,
    faculty: Faculty,
    academicYear: number,
    program: string,
    permanentAddress: Address,
    temporaryAddress: Address | undefined,
    email: string,
    phone: string,
    status: StudyStatus,
    identityDocument: IdentityDocument,
    nationality: string
  ) {
    this._id = id;
    this._name = name;
    this._dob = dob;
    this._gender = gender;
    this._faculty = faculty;
    this._academicYear = academicYear;
    this._program = program;
    this._permanentAddress = permanentAddress;
    this._temporaryAddress = temporaryAddress;
    this._email = email;
    this._phone = phone;
    this._status = status;
    this._identityDocument = identityDocument;
    this._nationality = nationality;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get dob(): Date {
    return this._dob;
  }

  get gender(): Gender {
    return this._gender;
  }

  get faculty(): Faculty {
    return this._faculty;
  }

  get academicYear(): number {
    return this._academicYear;
  }

  get program(): string {
    return this._program;
  }

  get permanentAddress(): Address {
    return this._permanentAddress;
  }

  get temporaryAddress(): Address | undefined {
    return this._temporaryAddress;
  }

  get email(): string {
    return this._email;
  }

  get phone(): string {
    return this._phone;
  }

  get status(): StudyStatus {
    return this._status;
  }

  get identityDocument(): IdentityDocument | undefined {
    return this._identityDocument;
  }

  get nationality(): string {
    return this._nationality;
  }

  set name(name: string) {
    this._name = name;
  }

  set dob(dob: Date) {
    this._dob = dob;
  }

  set gender(gender: Gender) {
    this._gender = gender;
  }

  set faculty(faculty: Faculty) {
    this._faculty = faculty;
  }

  set academicYear(accademicYear: number) {
    this._academicYear = accademicYear;
  }

  set program(program: string) {
    this._program = program;
  }

  set permanentAddress(permanentAddress: Address) {
    this._permanentAddress = permanentAddress;
  }

  set temporaryAddress(temporaryAddress: Address) {
    this._temporaryAddress = temporaryAddress;
  }

  set email(email: string) {
    this._email = email;
  }

  set phone(phone: string) {
    this._phone = phone;
  }

  set status(status: StudyStatus) {
    this._status = status;
  }

  set identityDocument(identityDocument: IdentityDocument) {
    this._identityDocument = identityDocument;
  }
  
  set nationality(nationality: string) {
    this._nationality = nationality;
  }

  toJSON() { // need modify
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
      email: this.email,
      phone: this.phone,
      status: this.status,
      identityDocument: this.identityDocument,
      nationality: this._nationality
    };
  }
  
}