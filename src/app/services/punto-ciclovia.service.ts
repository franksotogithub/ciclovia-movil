import { Injectable } from '@angular/core';
import {environment} from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { GeneralV1Request} from 'src/app/model/general/generalV1.requets';
import { PuntoCicloViaRequest} from 'src/app/model/punto_ciclo_via/puntoCicloVia.requets';
import { map, catchError } from 'rxjs/operators';
import { of, Observable, Subject,BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PuntoCicloviaService {
  API_URL_PUNTOS_CICLOVIA =  `${environment.api}/api/punto_ciclovia/`

  point: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor(private http: HttpClient) {


   }


   setPoint(value){
     this.point.next(value);
   }

   getPoint(){
     return this.point.value;
   }

   getAllPuntosCiclovia():Observable<PuntoCicloViaRequest[]>{


    return this.http.get(this.API_URL_PUNTOS_CICLOVIA).pipe(
      map((res: GeneralV1Request<PuntoCicloViaRequest[]>) =>{
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




  createPuntosCiclovia(puntoCicloVia: PuntoCicloViaRequest ){
    const requestBody =puntoCicloVia;
    return this.http.post(this.API_URL_PUNTOS_CICLOVIA,requestBody).pipe( map((res: GeneralV1Request<PuntoCicloViaRequest>) => {
      let response = null;
      if (res.status_code === 200) {
        const result = res.result;
        if (result ) {
          response = result;
        }
      } else {
        throw new Error('No se ha logrado obtener datos del servidor');
      }
      return response;
    }),
    catchError(err => {
      console.log('err>>>',err);

      if (typeof(err) === 'string') {
        
      } else {
        
      }
      return of(null);
    }),
    );
  }


  getPuntosCiclovia(id:number){
    return this.http.get(`${this.API_URL_PUNTOS_CICLOVIA}${id}` ).pipe(
      map((res: GeneralV1Request<PuntoCicloViaRequest>) =>{
      let response = null;
      if (res.status_code === 200) {
        const result = res.result;
        if (result ) {
          response = result;
        }
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
