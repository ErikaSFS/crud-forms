import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from '../app/shared/shared.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from '../app/shared/services/auth/auth.service';
import { RouterModule, Routes } from '@angular/router';
import { UserStore } from './shared/store/user.store';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    AppRoutingModule
   
                                                                                                                                      
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    NgModule,
    HttpClientModule,
    RouterModule,
    NgbModule
    
  ],
  providers: [
    AuthService,
    HttpClient,
    UserStore
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
