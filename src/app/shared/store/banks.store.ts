import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BanksModel, BanksReturnModel } from '../models/banks.model';

@Injectable()
export class BanksStore {
  private bankList: BehaviorSubject<BanksReturnModel> =
    new BehaviorSubject<BanksReturnModel>(new BanksReturnModel());
  public banksList: Observable<BanksReturnModel> = this.bankList.asObservable();

  constructor() {}

  public setBankList(value: BanksReturnModel): void {
    this.bankList.next(value);
  }
}