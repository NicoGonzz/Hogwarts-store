import { Component } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private fb: FormBuilder){}
  formulario!: FormGroup;
  passwordVisible = false;

  ngOnInit(): void {
    this.formulario = this.fb.group({
      name: ["",[Validators.required]],
      lastname: ["",[Validators.required]],
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
