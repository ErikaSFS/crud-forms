import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './shared/guards/auth.guard';
import { AuthService } from './shared/services/auth/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { LoadingService } from './shared/services/loading/loading.service';
import { NgbModule, NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { TokenService } from './shared/services/token/token.service';
import { UserStore } from './shared/store/user.store';
import { OnlyNumbersDirective } from './shared/directives/onlyNumbers.directive';
import { NoAuthGuard } from './shared/guards/no-auth.guard';

@NgModule({
  declarations: [AppComponent, LoadingComponent, OnlyNumbersDirective],
  imports: [
    BrowserModule, AppRoutingModule, NgbModule, HttpClientModule],
    providers: [
      UserStore,
      AuthGuard,
      AuthService,
      TokenService,
      NoAuthGuard,
      HttpClient,
      LoadingService,
      NgbToast
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
