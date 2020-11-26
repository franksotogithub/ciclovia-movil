import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';
import { UsuarioModel } from '../model/usuario/usuario.model';
import { FormGroup } from '@angular/forms';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import {Storage} from '@ionic/storage';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  error_usuario:boolean;
  error_message:string;
  usuario: UsuarioModel;
  public usuarioFormGroup: FormGroup;
  constructor(    private authService:AuthService,
    private navCtrl : NavController,
    private formBuilder: RxFormBuilder,) {



     }

  ngOnInit() {

    this.usuario = new UsuarioModel();
    this.settingForm();
  }

  settingForm():void{
    this.usuarioFormGroup = this.formBuilder.formGroup(this.usuario);
    
    this.usuarioFormGroup.valueChanges.subscribe(change=>{  
      
      console.log(this.usuarioFormGroup);
      this.usuario.is_valid = this.usuarioFormGroup.valid;
    }); 
   }


  registerUser(event){
    event.preventDefault();
    this.error_message="";
    console.log('this.usuario>>>',this.usuario);
    this.authService.registerUser(this.usuario).toPromise().then(res=>{
      this.error_usuario = false;
      if(res){

        this.navCtrl.navigateForward('/login');
      }
      /*else{
        
        this.error_usuario = true;
        this.error_message=" El usuario o el password no son correctos";
      }*/
      
    },error=>{
      console.log('error>>>',error);
      this.error_message='';
      if(error.status==400){
        this.error_usuario = true;
        this.error_message=error.error.message||'';
      }
    });


    /*this.authService.registerUser(this.usuario).toPromise().then(res=>{        

      this.error_usuario = false;
      if(res){

        this.navCtrl.navigateForward('/login');
      }
      else{
        
        this.error_usuario = true;
        this.error_message=" El usuario o el password no son correctos";
      }
      
    },error=>{
      this.error_message='';
      if(error.status==400){
        this.error_usuario = true;
        this.error_message=error.error.message||'';
      }
    });*/    
    
  }


  regresar(event)
  {
    this.navCtrl.navigateForward('/login');
  }



}
