import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  public nombreApellidoPattern: string = '([a-zA-Z]+) ([a-zA-Z]+)'
  public emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'

  constructor() { }

    usernameRepetido(user:FormControl):ValidationErrors | null{
    const nickname:string = user.value?.trim().toLowerCase()
    if (nickname === 'strider'){
      return {
        noStrider:true
      }
    }
    return null
  }

  camposIguales(campo1:string, campo2:string){
    return (formGroup:AbstractControl): ValidationErrors | null => {

      const argumento1 = formGroup.get(campo1)?.value
      const argumento2 = formGroup.get(campo2)?.value

      if(argumento1 !== argumento2){
        formGroup.get(campo2)?.setErrors({noIguales:true})
        return {noIguales:true}
      }
      formGroup.get(campo2)?.setErrors(null)
      return null
    }
  }


}
