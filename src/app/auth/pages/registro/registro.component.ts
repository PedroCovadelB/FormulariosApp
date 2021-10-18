import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidatorService } from 'src/app/shared/validator/email-validator.service';
import { ValidatorService } from 'src/app/shared/validator/validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    nombre:['', [Validators.required, Validators.pattern(this.validatorService.nombreApellidoPattern)]],
    email:['', [Validators.required, Validators.pattern(this.validatorService.emailPattern)], [this.emailValidator]],
    username:['', [Validators.required, this.validatorService.usernameRepetido]],
    constrasena:['', [Validators.required, Validators.minLength(6)]],
    confirmarContrasena:['', [Validators.required]]
  },
  {
    validators:[ this.validatorService.camposIguales('constrasena','confirmarContrasena') ]
  })

  get emailErrorMsg():string{
    const errors = this.miFormulario.get('email')?.errors
    if(errors?.required){
      return 'Es necesario que ingreses tu correo electrónico'
    } else if (errors?.pattern) {
      return 'El formato del correo electrónico que ingresaste es incorrecto'
    } else if (errors?.emailTomado) {
      return 'El correo electrónico ya se encuentra registrado'
    }
    return ''
  }

  constructor(private fb: FormBuilder,
              private validatorService: ValidatorService,
              private emailValidator: EmailValidatorService) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre:'Pedro Covarrubias',
      email:'test1@test.com',
      username:'PedroCovadelB'
    })
  }

  campoEsValido(campo:string){
    return  this.miFormulario.get(campo)?.invalid
            && this.miFormulario.get(campo)?.touched
  }

  enviarFormulario(){
    this.miFormulario.markAllAsTouched()
  }

}
