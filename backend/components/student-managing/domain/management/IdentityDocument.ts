
export default abstract class IdentityDocument {
  private _type: string;

  constructor(type: string) {
    this._type = type;
  }

  get type(): string {
    return this._type;
  }

  abstract toJSON(): object;
}



export class OldIdentityCard extends IdentityDocument {
  private _id: string;
  private _issuedDate: Date;
  private _issuedPlace: string;
  private _expiredDate: Date;

  constructor(id: string, issuedDate: Date, issuedPlace: string, expiredDate: Date) {
    super("OldIdentityCard");
    this._id = id;
    this._issuedDate = issuedDate;
    this._issuedPlace = issuedPlace;
    this._expiredDate = expiredDate;
  }

  toJSON() {
    return {
      type: this.type,
      data: {
        id: this._id,
        issuedDate: this._issuedDate,
        issuedPlace: this._issuedPlace,
        expiredDate: this._expiredDate
      }
    };
  }
}


export class NewIdentityCard extends IdentityDocument {
  private _id: string;
  private _issuedDate: Date;
  private _issuedPlace: string;
  private _expiredDate: Date;
  private _hasChip: boolean;

  constructor(id: string, issueDate: Date, issuedPlace: string, expiredDate: Date, hasChip: boolean) {
    super("NewIdentityCard");
    this._id = id;
    this._issuedDate = issueDate;
    this._issuedPlace = issuedPlace;
    this._expiredDate = expiredDate;
    this._hasChip = hasChip;
  }

  toJSON() {
    return {
      type: this.type,
      data: {
        id: this._id,
        issuedDate: this._issuedDate,
        issuedPlace: this._issuedPlace,
        expiredDate: this._expiredDate,
        hasChip: this._hasChip
      }
    };
  }
}


export class Passport extends IdentityDocument {
  private _passportNumber: string;
  private _issuedDate: Date;
  private _expiredDate: Date;
  private _issuedPlace: string;
  private _issuedCountry: string;
  private _note?: string;

  constructor(passportNumber: string, issuedDate: Date, expiredDate: Date, issuedPlace: string, issuedCountry: string, note?: string) {
    super("Passport");
    this._passportNumber = passportNumber;
    this._issuedDate = issuedDate;
    this._expiredDate = expiredDate;
    this._issuedPlace = issuedPlace;
    this._issuedCountry = issuedCountry;
    this._note = note;
  }

  toJSON() {
    return {
      type: this.type,
      data: {
        passportNumber: this._passportNumber,
        issuedDate: this._issuedDate,
        expiredDate: this._expiredDate,
        issuedPlace: this._issuedPlace,
        issuedCountry: this._issuedCountry,
        note: this._note
      }
    };
  }
}

