import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  constructor(
    private fb: FormBuilder,
    private cookieService: CookieService){}
  formulario!: FormGroup;
  passwordVisible = false;

  ngOnInit(): void {
      this.formulario = this.fb.group({
        email: ["",[Validators.email,Validators.required]],
        password: ["",[Validators.required]]
      })
  }
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
  onSubmit(_datos: any){
    const { email, password } = _datos.value;
    this.cookieService.set('user_data', JSON.stringify({ email, password }), 86400);
    localStorage.setItem('user_data', JSON.stringify({ email, password }));
    console.log(_datos.value);
}
}
