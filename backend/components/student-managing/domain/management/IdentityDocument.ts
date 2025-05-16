
  export default abstract class IdentityDocument {
    private _id: string;
    private _type: string;

    constructor(type: string, id: string) {
      this._type = type;
      this._id = id;
    }

    get type(): string {
      return this._type;
    }

    get id(): string {
      return this._id;
    }

    abstract toJSON(): object;
  }



  export class OldIdentityCard extends IdentityDocument {
    private _issuedDate: Date;
    private _issuedPlace: string;
    private _expiredDate: Date;

    constructor(id: string, issuedDate: Date, issuedPlace: string, expiredDate: Date) {
      super("OldIdentityCard", id);
      this._issuedDate = issuedDate;
      this._issuedPlace = issuedPlace;
      this._expiredDate = expiredDate;
    }

    toJSON() {
      return {
        type: this.type,
        data: {
          issuedDate: this._issuedDate,
          issuedPlace: this._issuedPlace,
          expiredDate: this._expiredDate
        }
      };
    }
  }


  export class NewIdentityCard extends IdentityDocument {
    private _issuedDate: Date;
    private _issuedPlace: string;
    private _expiredDate: Date;
    private _hasChip: boolean;

    constructor(id: string, issueDate: Date, issuedPlace: string, expiredDate: Date, hasChip: boolean) {
      super("NewIdentityCard", id);
      this._issuedDate = issueDate;
      this._issuedPlace = issuedPlace;
      this._expiredDate = expiredDate;
      this._hasChip = hasChip;
    }

    toJSON() {
      return {
        type: this.type,
        data: {
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

    constructor(id: string, passportNumber: string, issuedDate: Date, expiredDate: Date, issuedPlace: string, issuedCountry: string, note?: string) {
      super("Passport", id);
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

