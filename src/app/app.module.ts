import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from '../app/shared/shared.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from '../app/shared/services/auth/auth.service';
import { RouterModule, Routes } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
   
                                                                                                                                      
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    NgModule,
    HttpClientModule,
    RouterModule
    
  ],
  providers: [
    AuthService,
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
