import { Injectable } from '@angular/core';
import {environment} from 'src/environments/environment';
import { HttpClient ,HttpParams} from '@angular/common/http';
import { GeneralV1Request} from 'src/app/model/general/generalV1.requets';
import {  DistritoRequest } from 'src/app/model/distrito/distrito.requets';
import { map, catchError } from 'rxjs/operators';
import { of, Observable, Subject,BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DistritoService {
  API_URL_distrito =  `${environment.api}/api/distrito/`;
  
  API_URL_distrito_CERCANA =  `${environment.api}/api/distrito/distrito_cercano`;

  constructor( private http: HttpClient) { 

  }


  
  getAlldistrito():Observable<DistritoRequest[]>{
    return this.http.get(this.API_URL_distrito).pipe(
      map((res: GeneralV1Request<DistritoRequest[]>) =>{
      let response = [];
      if (res.status_code === 200) {
        response = res.result;
      } else {
        throw new Error('No se ha logrado obtener datos del servidor');
      }
      return response;
    }

    ),

    catchError(err => {
      console.log('err>>>',err);
      if (typeof(err) === 'string') {
       
      } else {
     
      }
      return of(null);
    }),
    
    
    );
  }


  getDistritoCercano(x,y):Observable<DistritoRequest[]>{
    let params = new HttpParams();
    if (x) {
      params = params.set('x', x);
    }
    if (y) {
      params = params.set('y', y);
    }

    return this.http.get(this.API_URL_distrito_CERCANA,{params}).pipe(
      map((res: GeneralV1Request<DistritoRequest[]>) =>{
      let response = [];
      if (res.status_code === 200) {
        response = res.result;
      } else {
        throw new Error('No se ha logrado obtener datos del servidor');
      }
      return response;
    }

    ),

    catchError(err => {
      console.log('err>>>',err);
      if (typeof(err) === 'string') {
       
      } else {
     
      }
      return of(null);
    }),
    
    
    );
  }

  

}
