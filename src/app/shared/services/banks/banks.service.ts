import { AuthService } from '../auth/auth.service';
import { BanksModel, BanksReturnModel } from '../../models/banks.model';
import { BanksStore } from '../../store/banks.store';
import { finalize, Observable, shareReplay, tap } from 'rxjs';
import { GetBanksParamsModel } from '../../models/get-banks-params.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingService } from '../loading/loading.service';
import { Router } from '@angular/router';
import { ToasterService } from '../toaster/toaster.service';

@Injectable()
export class BanksService {
  constructor(
    private http: HttpClient,
    private $banks: BanksStore,
    private router: Router,
    private loading: LoadingService,
    private toaster: ToasterService,
    private auth: AuthService
  ) {}

  public getBanks(params?: Partial<GetBanksParamsModel>): void {
    const token = sessionStorage.getItem('access_token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    });

    const options = {
      headers: headers,
      params,
    };

    this.loading.loadingOn();

    this.http
      .get<BanksReturnModel>(
        process.env['CRUD_API_BASE_URL'] as string + '/v1/bancos',
        options
      )
      .pipe(
        shareReplay(),
        tap((item: BanksReturnModel) => this.$banks.setBankList(item)),
        finalize(() => this.loading.loadingOff())
      )
      .subscribe({
        error: (error: any) => {
          if (error.status === 404 || error.status === 400) {
            this.toaster.showDanger(
              'Ih algo deu errado. Tente novamente mais tarde.'
            );
          }

          if (error.status === 401 || error.status === 403) {
            this.toaster.showDanger(
              'Você não possui autorização para visualizar a lista.'
            );
          }
        },
      });
  }

  public deleteBank(id: string): void {
    const token = sessionStorage.getItem('access_token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    });

    const options = {
      headers: headers,
    };

    this.loading.loadingOn();

    this.http
      .delete<BanksModel>(
        process.env['CRUD_API_BASE_URL'] as string + '/v1/bancos/' + id,
        options
      )
      .pipe(
        shareReplay(),
        finalize(() => {
          this.router.navigate(['/initial/banks']);
          this.loading.loadingOff();
        })
      )
      .subscribe({
        next: () => {
          this.toaster.showSuccess('Banco deletado com sucesso.');
        },
        error: (error: any) => {
          if (error.status === 404 || error.status === 400) {
            this.toaster.showDanger(
              'Tente novamente mais tarde.'
            );
          }

          if (error.status === 401 || error.status === 403) {
            this.toaster.showDanger(
              'Você não possui autorização para deletar o(s) banco(s).'
            );
            this.auth.renewToken();
          }
        },
      });
  }

  public getBank(id: string): Observable<BanksModel> {
    const token = sessionStorage.getItem('access_token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    });

    const options = {
      headers: headers,
    };

    this.loading.loadingOn();

    return this.http
      .get<BanksModel>(
        process.env['CRUD_API_BASE_URL'] as string + '/v1/bancos/' + id,
        options
      )
      .pipe(
        shareReplay(),
        finalize(() => this.loading.loadingOff())
      );
  }

  public createBank(bank: Partial<BanksModel>): void {
    const token = sessionStorage.getItem('access_token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    });

    const options = {
      headers: headers,
    };

    this.loading.loadingOn();

    this.http
      .post<BanksModel>(
        process.env['CRUD_API_BASE_URL'] as string + '/v1/bancos',
        JSON.stringify(bank),
        options
      )
      .pipe(
        shareReplay(),
        finalize(() => this.loading.loadingOff())
      )
      .subscribe({
        next: () => {
          this.toaster.showSuccess('Banco criado com sucesso.');
        },
        error: (error: any) => {
          if (error.status === 404 || error.status === 400) {
            this.toaster.showDanger(
              'Ops, algo de errado aconteceu. Tente novamente mais tarde.'
            );
          }

          if (error.status === 401 || error.status === 403) {
            this.toaster.showDanger(
              'Você não possui autorização para criar um banco.'
            );
            this.auth.renewToken();
          }
        },
      });
  }

  public editBank(bank: Partial<BanksModel>, id: string): void {
    const token = sessionStorage.getItem('access_token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    });

    const options = {
      headers: headers,
    };

    this.loading.loadingOn();

    this.http
      .put<BanksModel>(
        process.env['CRUD_API_BASE_URL'] as string + '/v1/bancos/' + id,
        JSON.stringify(bank),
        options
      )
      .pipe(
        shareReplay(),
        finalize(() => this.loading.loadingOff())
      )
      .subscribe({
        next: () => {
          this.toaster.showSuccess('Banco editado com sucesso.');
        },
        error: (error: any) => {
          if (error.status === 404 || error.status === 400) {
            this.toaster.showDanger(
              'Ops, algo de errado aconteceu. Tente novamente mais tarde.'
            );
          }

          if (error.status === 401 || error.status === 403) {
            this.toaster.showDanger(
              'Você não possui autorização para editar o banco.'
            );
            this.auth.renewToken();
          }
        },
      });
  }
}