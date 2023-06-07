import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InitialComponent } from './initial.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { InitialRoutingModule } from './initial-routing.module';
import { LoginComponent } from '../login/login.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  
  imports: [
    CommonModule,
    SharedModule,
    InitialRoutingModule
  ],
  declarations: [InitialComponent, LoginComponent, HomeComponent]
})
export class InitialModule { }
