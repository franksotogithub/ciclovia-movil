import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable,throwError  } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

import {Storage} from '@ionic/storage';
import {Router} from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private AUTH_HEADER = 'Authorization';
  
  constructor(
   
      private storage:Storage ,
      private authService: AuthService,
      ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {



let token =localStorage.getItem("token");


    if (token) {
        request = request.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`
        }
        });

        
    }


    /*return next.handle(request).pipe(catchError(err=>{
        if (err.status === 401) {

          
            this.authService.logout();
            location.reload();
        }

        const error = err.message || err.errors;
        return throwError(error);

    }));*/

    return next.handle(request);
  }
}
