import { Component, OnInit } from '@angular/core';
import {  FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public formAutentificacao: FormGroup = new FormGroup ('');


  public ngOnInit(): void {
    //this.createForm();
  }

}
