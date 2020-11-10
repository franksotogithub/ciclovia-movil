import { THIS_EXPR, ThrowStmt } from '@angular/compiler/src/output/output_ast';
import { Component ,OnInit, ViewChild} from '@angular/core';
import { PuntoCicloViaModel } from '../model/punto_ciclo_via/puntoCicloVia.model';
import { PuntoCicloviaService } from '../services/punto-ciclovia.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AlertController }  from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { IonContent  } from '@ionic/angular';

@Component({
  selector: 'app-ciclovia',
  templateUrl: './ciclovia.page.html',
  styleUrls: ['./ciclovia.page.scss'],
})
export class CicloviaPage implements OnInit {
  @ViewChild(IonContent ) content: IonContent ;

  dateNow = new Date();

  sentido =[
    {value:'UNIDIRECCIONAL',text:'UNIDIRECCIONAL'},
    {value:'BIDIRECCIONAL',text:'BIDIRECCIONAL'},
    
  ];
  tiposVia =[
    {value:'CICLOVIA',text:'CICLOVIA',},
    {value:'CICLOCARRIL',text:'CICLOCARRIL',},
    {value:'CICLOSENDA',text:'CICLOSENDA',},
    {value:'CICLOACERA',text:'CICLOACERA',},
    {value:'CARRIL COMPARTIDO',text:'CARRIL COMPARTIDO',},
    {value:'VIA COMPARTIDA',text:'VIA COMPARTIDA',},
  ]

  
  tiposSegregador =[
    {value:'Bolardos',text:'Bolardos',},
    {value:'Topellantas',text:'Topellantas',},
    {value:'Tachones',text:'Tachones',},
    {value:'Sardines peraltado',text:'Sardines peraltado',},
    
  ]


  estadoSegregador =[
    {value:'MALO',text:'MALO',},
    {value:'REGULAR',text:'REGULAR',},
    {value:'BUENO',text:'BUENO',},
    {value:'REINSTALACION',text:'REINSTALACION',},
    
  ]


  tiposSeVer =[
    {value:'R-42',text:'R-42',},
    {value:'P-46',text:'P-46',},
    {value:'P-46A',text:'P-46A',},
    {value:'P-46B',text:'P-46B',},
    {value:'I-22',text:'I-22',},
  ]


  estadoSeVer =[
    {value:'LIMPIEZA',text:'LIMPIEZA',},
    {value:'CAMBIO DE PANEL',text:'CAMBIO DE PANEL',},
    {value:'PINTURA POSTE',text:'PINTURA POSTE',},
    {value:'REINSTALACION',text:'REINSTALACION',},
    
  ]

  tiposSeHor =[
    {value:'Linea continua ',text:'Linea continua ',},
    {value:'Linea discontinua',text:'Linea discontinua',},
    {value:'Cruce',text:'Cruce',},
    {value:'Pictogramas',text:'Pictogramas',},
    {value:'Patas de elefante',text:'Patas de elefante',},
  ]


  tiposSuRod =[
    {value:'Bacheo',text:'Bacheo',},
    {value:'Recapeo',text:'Recapeo',},
    {value:'Carpeta nueva',text:'Carpeta nueva',},
    {value:'Slurry',text:'Slurry',},
    
  ]


  puntoCicloVia: PuntoCicloViaModel;
  constructor( 
    public alertController: AlertController,
    private puntoCicloviaService: PuntoCicloviaService,
    private geolocation: Geolocation,
    private navCtrl : NavController,
    ) {}


  ngOnInit() {
    this.puntoCicloVia = new PuntoCicloViaModel();
  }


  async alertaGeolocalizacion(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Punto',
      subHeader: '',
      message: 'Se tomo el punto correctamente',
      buttons: ['OK']
    });

    await alert.present();
  }

    geolocalizar(){


    this.geolocation.getCurrentPosition().then((resp) => {
      this.puntoCicloVia.latitud=resp.coords.latitude;
      this.puntoCicloVia.longitud=resp.coords.longitude;
      this.alertaGeolocalizacion();
      
     }).catch((error) => {
       console.log('Error getting location', error);
     });

  }
  guardar(){
    this.puntoCicloviaService.createPuntosCiclovia(this.puntoCicloVia).subscribe(res=>{
      
      if(res){
        this.navCtrl.navigateForward("/esri-map");
      }
    });
  }

  regresar(){
    
        this.navCtrl.navigateForward("/esri-map");
      screen
   
  }
  public pageScroller(){
    this.content.scrollToTop();
  }
}
