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
  
  set id(id: string) {
    this._id = id;
  }

  abstract toJSON(): object;
  
  abstract clone(): IdentityDocument; // Thêm abstract method

  getDisplayInfo(): string {
    return `${this.type} - ${this.id}`;
  }
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

    clone(): OldIdentityCard { // Implement clone
      return new OldIdentityCard(this.id, this._issuedDate, this._issuedPlace, this._expiredDate);
    }

    toJSON() {
      return {
        type: this.type,
        id: this.id,
        issuedDate: this._issuedDate,
        issuedPlace: this._issuedPlace,
        expiredDate: this._expiredDate
      };
    }
  
    getDisplayInfo(): string {
      return `${this.type} - ${this.id}`;
    }
  
    setIssuedDate(date: Date): void {
      this._issuedDate = date;
    }
    
    getIssuedDate(): Date {
      return this._issuedDate;
    }
    
    getIssuedDateAsString(): string {
      return isNaN(this._issuedDate.getTime()) ? "" : this._issuedDate.toISOString().slice(0, 10);
    }
  
    getIssuedPlace(): string {
      return this._issuedPlace;
    } 
  
    setIssuedPlace(place: string): void {
      this._issuedPlace = place;
    }
  
    getExpiredDate(): Date {
      return this._expiredDate;
    }
    
    setExpiredDate(date: Date): void {
      this._expiredDate = date;
    }
  
    
    getExpiredDateAsString(): string {
      return isNaN(this._expiredDate.getTime()) ? "" : this._expiredDate.toISOString().slice(0, 10);
    }

  }
  
  export class NewIdentityCard extends IdentityDocument {
    private _issuedDate: Date;
    private _issuedPlace: string;
    private _expiredDate: Date;
    private _hasChip: boolean;
  
    constructor(id: string, issuedDate: Date, issuedPlace: string, expiredDate: Date, hasChip: boolean) {
      super("NewIdentityCard", id);
      this._issuedDate = issuedDate;
      this._issuedPlace = issuedPlace;
      this._expiredDate = expiredDate;
      this._hasChip = hasChip;
    }

    clone(): NewIdentityCard { // Implement clone
      return new NewIdentityCard(this.id, this._issuedDate, this._issuedPlace, this._expiredDate, this._hasChip);
    }
  
    toJSON() {
      return {
        type: this.type,
        id: this.id,
        issuedDate: this._issuedDate,
        issuedPlace: this._issuedPlace,
        expiredDate: this._expiredDate,
        hasChip: this._hasChip
      };
    }
  
    getDisplayInfo(): string {
      return `${this.type} - ${this.id} ${this._hasChip ? "(with chip)" : "(without chip)"}`;
    }
  
    setIssuedDate(date: Date): void {
      this._issuedDate = date;
    }
    
    getIssuedDate(): Date {
      return this._issuedDate;
    }
    
    getIssuedDateAsString(): string {
      return isNaN(this._issuedDate.getTime()) ? "" : this._issuedDate.toISOString().slice(0, 10);
    }
  
    getIssuedPlace(): string {
      return this._issuedPlace;
    }
  
    setIssuedPlace(place: string): void {
      this._issuedPlace = place;
    }
  
    getExpiredDate(): Date {
      return this._expiredDate;
    }
  
    setExpiredDate(date: Date): void {
      this._expiredDate = date;
    }
  
    getHasChip(): boolean {
      return this._hasChip;
    }
    
    setHasChip(hasChip: boolean): void {
      this._hasChip = hasChip;
    }

    getExpiredDateAsString(): string {
      return isNaN(this._expiredDate.getTime()) ? "" : this._expiredDate.toISOString().slice(0, 10); // cho input type="date"
    }
    

  }
  
  export class Passport extends IdentityDocument {
    public _passportNumber: string;
    private _issuedDate: Date;
    private _expiredDate: Date;
    private _issuedPlace: string;
    private _issuedCountry: string;
    private _note?: string;
  
    constructor(id: string, passportNumber: string, issuedDate: Date, expiredDate: Date, issuedPlace: string, issuedCountry: string, note?: string) {
      super("Passport", id || passportNumber); // Dùng passportNumber làm ID nếu id rỗng
      this._passportNumber = passportNumber;
      this._issuedDate = issuedDate;
      this._expiredDate = expiredDate;
      this._issuedPlace = issuedPlace;
      this._issuedCountry = issuedCountry;
      this._note = note;
    }

    clone(): Passport { // Implement clone
      return new Passport(this.id, this._passportNumber, this._issuedDate, this._expiredDate, this._issuedPlace, this._issuedCountry, this._note);
    }
  
    getDisplayInfo(): string {
      return `${this.type} - ${this._passportNumber}`;
    }
  
    // Ghi đè id getter/setter để nó đồng bộ với passportNumber
    get id(): string {
      return this._passportNumber;
    }
  
    set id(value: string) {
      this._passportNumber = value;
    }


    toJSON() {
      return {
        type: this.type,
        passportNumber: this._passportNumber,
        issuedDate: this._issuedDate,
        expiredDate: this._expiredDate,
        issuedPlace: this._issuedPlace,
        issuedCountry: this._issuedCountry,
        note: this._note
      };
    }

    setIssuedDate(date: Date): void {
      this._issuedDate = date;
    }
    
    getIssuedDate(): Date {
      return this._issuedDate;
    }
    
    getIssuedDateAsString(): string {
      return isNaN(this._issuedDate.getTime()) ? "" : this._issuedDate.toISOString().slice(0, 10);
    }

    getIssuedPlace(): string {
      return this._issuedPlace;
    }

    setIssuedPlace(place: string): void {
      this._issuedPlace = place;
    }

    getExpiredDate(): Date {
      return this._expiredDate;
    }

    setExpiredDate(date: Date): void {
      this._expiredDate = date;
    }

    getIssuedCountry(): string {
      return this._issuedCountry;
    }
    
    setIssuedCountry(country: string): void {
      this._issuedCountry = country;
    }
    
    getNote(): string | undefined {
      return this._note;
    }
    
    setNote(note: string): void {
      this._note = note;
    }



    // getExpiredDateAsString(): string {
    //   return isNaN(this._expiredDate.getTime()) ? "" : this._expiredDate.toISOString().slice(0, 10); 
    // }

    // getId(): string {
    //   return this.id; // Trả về passportNumber như là ID
    // }
  }
  