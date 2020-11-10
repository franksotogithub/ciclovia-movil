import { Component, OnInit } from '@angular/core';
import { PuntoCicloViaModel } from '../model/punto_ciclo_via/puntoCicloVia.model';
import { PuntoCicloviaService } from '../services/punto-ciclovia.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-list-ciclovia',
  templateUrl: './list-ciclovia.page.html',
  styleUrls: ['./list-ciclovia.page.scss'],
})
export class ListCicloviaPage implements OnInit {
  listPuntoCiclovia :  PuntoCicloViaModel[]
  constructor(
    
    private puntoCicloviaService: PuntoCicloviaService,
    private navCtrl : NavController,
    ) { }

  ngOnInit() {
    
  }

  ionViewDidEnter() {
    this.getItems();
  }
  
   getItems(){

    this.puntoCicloviaService.getAllPuntosCiclovia().subscribe(res=>{
      this.listPuntoCiclovia=res.map(r=> {return new PuntoCicloViaModel(r)})  
      
    });


  }
  add(){
    this.navCtrl.navigateForward("/ciclovia");
  }

}
