import { Component, OnInit } from '@angular/core';
import {Storage} from '@ionic/storage';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';
import { LoginModel } from '../model/login/login.model';
import { FormGroup } from '@angular/forms';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  error_login:boolean;
  error_message:string;
  login: LoginModel;
  public loginFormGroup: FormGroup;

  constructor(  
    private authService:AuthService,
    private navCtrl : NavController,
    private formBuilder: RxFormBuilder,
    private storage:Storage,
    ) { }

  ngOnInit() {
    this.login = new LoginModel();
    this.settingForm();
     
  }

  
  loginUser(event){
    event.preventDefault();
    this.error_message="";
    this.authService.loginUser(this.login).toPromise().then(res=>{        

      this.error_login = false;
      if(res){

        this.navCtrl.navigateForward("/");
      }
      else{
        
        this.error_login = true;
        this.error_message=" El usuario o el password no son correctos";
      }
      
    },error=>{
      this.error_message='';
      if(error.status==400){
        this.error_login = true;
        this.error_message=error.error.message||'';

      }
    });    
    
  }

  settingForm():void{
    this.loginFormGroup = this.formBuilder.formGroup(this.login);
    
    this.loginFormGroup.valueChanges.subscribe(change=>{  
      
      console.log(this.loginFormGroup);
      this.login.is_valid = this.loginFormGroup.valid;
    }); 
   }

   register(e){
    this.navCtrl.navigateForward("/register");
   }

}
