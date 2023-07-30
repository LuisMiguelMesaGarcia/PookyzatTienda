import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import {Cliente} from '../../models/cliente';
import iziToast from 'izitoast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm:FormGroup = new FormGroup({}) //inicializacion del formgroup
  
  constructor(public api:ApiService){

  }

  ngOnInit(): void {
    // this.getPersona();
      this.loginForm = new FormGroup({
        email: new FormControl('',[Validators.required, Validators.email]),
        password: new FormControl('',Validators.required)
      })
  }


  // public async getPersona(){
  //   let controller = "getAllClientes"
  //   // let modeloCliente:Cliente={_id: "", nombres:"", apellidos:"", email:"", perfil:"",telefono: "", fnacimiento: "", genero: "", DNI: "" };
  //   this.api.getAll(controller).subscribe((res:object)=>{
  //     console.log(res);
  //   })
    
  // }

  onSubmit(){
    if(this.loginForm.valid){
      const data = this.loginForm.value;
      const controller = "loginClientes";
      this.api.post(controller,data).subscribe((res:any)=>{
        if(res.data == undefined){
          iziToast.show({
            title: 'Error',
            position:'topRight',
            message: res.message,
            titleColor:'rgb(190, 37, 37)'
          })
        }else{
          console.log(res);
          localStorage.setItem('token', res.token)
          localStorage.setItem('_id', res.data._id)
        }
      })
    }
  }


}
