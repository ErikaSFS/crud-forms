import { Component, OnInit } from '@angular/core';
import {  FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public formAutentificacao: FormGroup = new FormGroup ('');

constructor(private fb: FormBuilder, private authService: AuthService) {}
  

public ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.formAutentificacao = this.fb.group({
      user:['', Validators.required],
      password: ['', Validators.required],
    });
  }

  public login(): void {
    const data = Object.assign({}, this.formAutentificacao.value);
    this.authService.login(data.user, data.password);
  }

}
