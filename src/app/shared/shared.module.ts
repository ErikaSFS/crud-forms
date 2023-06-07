import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  HttpClientModule } from '@angular/common/http';
import { AuthService} from './services/auth/auth.service';
import { HttpService } from './services/http/http.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { UserStore } from './store/user.store';

const SERVICES = [ AuthService, HttpService];
const COMPONENTS = [NavbarComponent];
@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  
  exports: [
    ...COMPONENTS,
    FormsModule,
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
