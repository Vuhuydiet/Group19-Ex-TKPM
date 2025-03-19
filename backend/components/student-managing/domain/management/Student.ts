
export type Gender = 'Nam' | 'Nữ';

export type Faculty = 'Khoa Luật' | 'Khoa Tiếng Anh thương mại' | 'Khoa Tiếng Nhật' | 'Khoa Tiếng Pháp';

export type StudyStatus = 'Đang học' | 'Đã tốt nghiệp' | 'Đã thôi học' | 'Tạm dừng học';

export class Student {
  private _id: string;
  private _name: string;
  private _dob: Date;
  private _gender: Gender;
  private _faculty: Faculty;
  private _academicYear: number;
  private _program: string;
  private _address: string;
  private _email: string;
  private _phone: string;
  private _status: StudyStatus;
  

  constructor(
    id: string,
    name: string,
    dob: Date,
    gender: Gender,
    faculty: Faculty,
    academicYear: number,
    program: string,
    address: string,
    email: string,
    phone: string,
    status: StudyStatus
  ) {
    this._id = id;
    this._name = name;
    this._dob = dob;
    this._gender = gender;
    this._faculty = faculty;
    this._academicYear = academicYear;
    this._program = program;
    this._address = address;
    this._email = email;
    this._phone = phone;
    this._status = status;
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

  get address(): string {
    return this._address;
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

  set address(address: string) {
    this._address = address;
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

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      dob: this.dob,
      gender: this.gender,
      faculty: this.faculty,
      academicYear: this.academicYear,
      program: this.program,
      address: this.address,
      email: this.email,
      phone: this.phone,
      status: this.status
    };
  }
  
}