import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { of, Observable, Subject,BehaviorSubject } from 'rxjs';
import { GeneralV1Request} from 'src/app/model/general/generalV1.requets';
import {Storage} from '@ionic/storage';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /*API_URL_AUTH =  `${environment.api}/api/usuario`;*/
  API_URL_AUTH =  `${environment.api}/api/auth`;
  API_URL_LOGIN = `${this.API_URL_AUTH}/login`;
  API_URL_REGISTER = `${this.API_URL_AUTH}/register`;



  constructor(
    private http: HttpClient,
    private storage:Storage,
    private navCtrl : NavController,
    ) { 

  }
  
  loginUser(body){
    const requestBody = body;

    return this.http.post(this.API_URL_LOGIN,requestBody).pipe( map((res: GeneralV1Request<any>) => {
      let response = null;
      if (res.status_code === 200) {

        const result = res.result;
        console.log('result>>>',result);
        if (result) {
          
          localStorage.setItem("currentUser",JSON.stringify( result.user));
          localStorage.setItem("token",result.token);

          this.storage.set("currentUser",JSON.stringify( result.user));
          this.storage.set('isAuth',true);
          this.storage.set('token',result.token);
          response = result;
        }

      } else {
        throw new Error('No se ha logrado obtener datos del servidor');
      }
      return response;
    }),

/*
    catchError(err => {

 

      if (typeof(err) === 'string') {
        
      } else {
        
      }
      return of(null);
  
    }),
*/

    );  

    }


    logout()
    {
      this.storage.remove("currentUser");
      this.storage.set('isAuth',false);
      this.storage.remove('token');
      this.navCtrl.navigateForward('/login');
    }

    registerUser(body){
      const requestBody = body;
      return this.http.post(this.API_URL_REGISTER,requestBody).pipe( map((res: GeneralV1Request<any>) => {
        let response = null;
        if (res.status_code === 200) {  
          const result = res.result;          
          if (result) {                
            response = result;
          }
  
        } else {
          throw new Error('No se ha logrado obtener datos del servidor');
        }
        return response;
      }),
      );  
    }
}
