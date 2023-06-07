import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  HttpClientModule } from '@angular/common/http';
import { AuthService} from './services/auth/auth.service';
import { HttpService } from './services/http/http.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const SERVICES = [ AuthService, HttpService];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  
  exports: [FormsModule,
  ReactiveFormsModule
],

  providers: [...SERVICES],
})
export class SharedModule { 
  static forRoot(): ModuleWithProviders<SharedModule> {
    return{
      ngModule: SharedModule,
    };
  }
}
