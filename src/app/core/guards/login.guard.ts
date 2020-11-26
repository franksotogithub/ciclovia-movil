import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';

import {Storage} from '@ionic/storage';
import {Router} from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private storage:Storage ,  private router: Router){}
  
  canActivate(route: ActivatedRouteSnapshot): Promise<boolean>  | boolean{

    let currentUser =localStorage.getItem("currentUser");

        if(currentUser){
          return true;
    }
    this.router.navigateByUrl('/login');
    return false;
    


    /*return this.storage.get('currentUser').then(res=>{
       
        if(res){
                return true;
        }
        this.router.navigateByUrl('/login');
        return false
    });*/
  }
  
}
