
export class Student {
  private _id: string;
  private _name: string;
  private _dob: Date;
  private _gender: 'Nam' | 'Nữ';
  private _faculty: 'Khoa Luật' | 'Khoa Tiếng Anh thương mại' | 'Khoa Tiếng Nhật' | 'Khoa Tiếng Pháp';
  private _academicYear: number;
  private _program: string;
  private _address: string;
  private _email: string;
  private _phone: string;
  private _status: 'Đang học' | 'Đã tốt nghiệp' | 'Đã thôi học' | 'Tạm dừng học';
  

  constructor(
    id: string,
    name: string,
    dob: Date,
    gender: 'Nam' | 'Nữ',
    faculty: 'Khoa Luật' | 'Khoa Tiếng Anh thương mại' | 'Khoa Tiếng Nhật' | 'Khoa Tiếng Pháp',
    academicYear: number,
    program: string,
    address: string,
    email: string,
    phone: string,
    status: 'Đang học' | 'Đã tốt nghiệp' | 'Đã thôi học' | 'Tạm dừng học'
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

  get gender(): 'Nam' | 'Nữ' {
    return this._gender;
  }

  get faculty(): 'Khoa Luật' | 'Khoa Tiếng Anh thương mại' | 'Khoa Tiếng Nhật' | 'Khoa Tiếng Pháp' {
    return this._faculty;
  }

  get accademicYear(): number {
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

  get status(): 'Đang học' | 'Đã tốt nghiệp' | 'Đã thôi học' | 'Tạm dừng học' {
    return this._status;
  }

  set name(name: string) {
    this._name = name;
  }

  set dob(dob: Date) {
    this._dob = dob;
  }

  set gender(gender: 'Nam' | 'Nữ') {
    this._gender = gender;
  }

  set faculty(faculty: 'Khoa Luật' | 'Khoa Tiếng Anh thương mại' | 'Khoa Tiếng Nhật' | 'Khoa Tiếng Pháp') {
    this._faculty = faculty;
  }

  set accademicYear(accademicYear: number) {
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

  set status(status: 'Đang học' | 'Đã tốt nghiệp' | 'Đã thôi học' | 'Tạm dừng học') {
    this._status = status;
  }

}