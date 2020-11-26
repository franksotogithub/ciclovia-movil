import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './core/guards/login.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'esri-map',
    pathMatch: 'full'
  },
  {
    path: 'ciclovia',
    loadChildren: () => import('./ciclovia/ciclovia.module').then( m => m.CicloviaPageModule)
  },
  {
    path: 'list-ciclovia',
    loadChildren: () => import('./list-ciclovia/list-ciclovia.module').then( m => m.ListCicloviaPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'esri-map',
    loadChildren: () => import('./esri-map/esri-map.module').then( m => m.EsriMapPageModule),
    canActivate:[LoginGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
