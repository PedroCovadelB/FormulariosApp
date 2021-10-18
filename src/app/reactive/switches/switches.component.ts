import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styles: [
  ]
})
export class SwitchesComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    genero:['M', Validators.required],
    notificaciones:[true, Validators.required],
    condiciones:[false, Validators.requiredTrue]
  })

  persona = {
    genero:'F',
    notificaciones:false
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(){
    this.miFormulario.reset({
      ...this.persona,
      condiciones:false
    })

    this.miFormulario.valueChanges.subscribe(({condiciones, ...rest}) => {
      // delete form.condiciones
      this.persona = rest
    })
  }

  guardar(){
    const fromValue = {...this.miFormulario.value}
    delete fromValue.notificaciones

    this.persona = fromValue
  }

}
