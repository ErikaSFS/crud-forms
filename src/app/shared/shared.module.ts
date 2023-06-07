import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  HttpClientModule } from '@angular/common/http';
import { AuthService} from './services/auth/auth.service';
import { HttpService } from './services/http/http.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserStore } from './store/user.store';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ToasterComponent } from './components/toaster/toaster.component';


const SERVICES = [ AuthService, HttpService];
const COMPONENTS = [NavbarComponent,
SidebarComponent];
@NgModule({
  declarations: [
    ...COMPONENTS,
    SidebarComponent,
    ConfirmationModalComponent,
    LoadingComponent,
    ToasterComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
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
