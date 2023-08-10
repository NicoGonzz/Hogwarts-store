import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  constructor(private fb: FormBuilder){}
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
    console.log(_datos.value);
}
}
