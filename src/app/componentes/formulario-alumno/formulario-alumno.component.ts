import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Genero } from 'src/app/modelos/genero';

@Component({
  selector: 'app-formulario-alumno',
  templateUrl: './formulario-alumno.component.html',
  styleUrls: ['./formulario-alumno.component.css']
})
export class FormularioAlumnoComponent implements OnInit {

  formularioAlumno: FormGroup;
  generos: Genero[] = [
    {
      id: 1,
      descripcion:'Masculino'
    },
    {
      id: 2,
      descripcion:'Femenino'
    }
  ];
  
  constructor(private fb: FormBuilder,
              private toastr: ToastrService) {
    this.formularioAlumno = fb.group({
      nombres: new FormControl('', [Validators.required]),
      apellidos: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      contrasena: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern('^.*[A-Z]+.*$')]),
      contrasena2: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern('^.*[A-Z]+.*$')]),
      genero: new FormControl('', [Validators.required]),
      admin: new FormControl(false, []),
    });
   }

  ngOnInit(): void {
    
  }

  agregarAlumno(){
    if(this.formularioAlumno.get('nombres')?.errors?.['required']){
      this.toastr.error('Es necesario ingresar nombres', 'Validaciones');
    }
    if(this.formularioAlumno.get('apellidos')?.errors?.['required']){
      this.toastr.error('Es necesario ingresar apellidos', 'Validaciones');
    }
    if(this.formularioAlumno.get('email')?.errors?.['required']){
      this.toastr.error('Es necesario ingresar email', 'Validaciones');
    }else if(this.formularioAlumno.get('email')?.errors?.['email']){
      this.toastr.error('Es necesario ingresar un correo valido', 'Validaciones');
    }
    if(this.formularioAlumno.get('contrasena')?.errors?.['pattern']){
      this.toastr.error('La contraseña debe tener mínimo ocho y máximo 10 caracteres, al menos una letra mayúscula, una letra minúscula, un número y un carácter especial', 'Validaciones');
    }else if(this.formularioAlumno.get('contrasena2')?.value !== this.formularioAlumno.get('contrasena')?.value){
      this.toastr.error('Las contraseñas no coinciden', 'Validaciones');
    }
    if(this.formularioAlumno.get('genero')?.errors?.['required']){
      this.toastr.error('Es necesario seleccionar genero', 'Validaciones');
    }

    if(this.formularioAlumno.valid){
      this.toastr.success('Campos correctos', 'Validaciones');
    }

    
  }

}
