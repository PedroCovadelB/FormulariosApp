import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

interface Persona {
  nombre:string
  favoritos:Favorito[]
}

interface Favorito {
  id:number
  nombre:string
}

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
    `
    li {
      cursor:pointer
    }
    `
  ]
})

export class DinamicosComponent {

  @ViewChild('miFormulario') miFormulario!: NgForm

  nuevoJuego:string = ''

  persona: Persona = {
  nombre: 'Pedro',
  favoritos: [
    { id: 1, nombre:'Metal Gear'},
    { id: 2, nombre:'Sonic'}
  ]
  }

  nombreValido():boolean{
    return  this.miFormulario?.controls.nombre?.invalid &&
            this.miFormulario?.controls.nombre?.touched
  }

  eliminar(index:number){
    this.persona.favoritos.splice(index,1)
  }

  agregarJuego(){
    const nuevoFavorito: Favorito = {
      id: this.persona.favoritos.length + 1,
      nombre: this.nuevoJuego
    }
    this.persona.favoritos.push({...nuevoFavorito})
    this.nuevoJuego=''
  }

  guardar(){
  }



}