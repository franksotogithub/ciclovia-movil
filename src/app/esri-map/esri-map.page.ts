import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from "@angular/core";
import { loadModules } from "esri-loader";
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationEvents, BackgroundGeolocationResponse} from '@ionic-native/background-geolocation/ngx';
import { PuntoCicloviaService } from '../services/punto-ciclovia.service';
import { PuntoCicloViaModel } from '../model/punto_ciclo_via/puntoCicloVia.model';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-esri-map',
  templateUrl: './esri-map.page.html',
  styleUrls: ['./esri-map.page.scss'],
})
export class EsriMapPage implements OnInit {

  @ViewChild("mapViewNode", { static: true }) private mapViewEl: ElementRef;

  @ViewChild("addPoint", { static: true }) private addPointEl: ElementRef;

  view: any;
  listPuntoCiclovia :  PuntoCicloViaModel[];
  isHide=true;
  map:  any;
  currentPoint :any;
  track:any;
  myInterval:any;

  graphicsLayer:any;


   config: BackgroundGeolocationConfig = {
    desiredAccuracy: 10,
    stationaryRadius: 20,
    distanceFilter: 30,
    debug: false, //  Esto hace que el dispositivo emita sonidos cuando lanza un evento de localización
    stopOnTerminate: false, // Si pones este en verdadero, la aplicación dejará de trackear la localización cuando la app se haya cerrado.
    //Estas solo están disponibles para Android
    locationProvider: 1, //Será el proveedor de localización. Gps, Wifi, Gms, etc...
    startForeground: true, 
    interval: 6000, //El intervalo en el que se comprueba la localización.
    fastestInterval: 5000, //Este para cuando está en movimiento.
    activitiesInterval: 10000, //Este es para cuando está realizando alguna actividad con el dispositivo.
};



  constructor(private geolocation: Geolocation,  
    private puntoCicloviaService: PuntoCicloviaService,
    private navCtrl : NavController,
    private backgroundGeolocation: BackgroundGeolocation,
    ) {}


 initBackgroundGeolocation(){

  this.backgroundGeolocation.configure(this.config)
  .then(() => {

    this.backgroundGeolocation.on(BackgroundGeolocationEvents.location).subscribe((location: BackgroundGeolocationResponse) => {
      console.log(location);

      // IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
      // and the background-task may be completed.  You must do this regardless if your operations are successful or not.
      // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
      this.backgroundGeolocation.finish(); // FOR IOS ONLY
    });

  });

 }
 
 

  async initializeMap() {
    try {
      // Load the modules for the ArcGIS API for JavaScript
      const [Map, MapView,BasemapGallery,Track,GraphicsLayer ] = await loadModules(["esri/Map", "esri/views/MapView","esri/widgets/BasemapGallery","esri/widgets/Track","esri/layers/GraphicsLayer"]);

      // Configure the Map
      const mapProperties = {
        basemap: "streets-vector"
      };

      this.map = new Map(mapProperties);

      // Initialize the MapView

      const mapViewProperties = {
        container: this.mapViewEl.nativeElement,
        center: [-75, -9.305],
        zoom: 5,
        map: this.map
      };

      

      this.view = new MapView(mapViewProperties);

      this.graphicsLayer = new GraphicsLayer();
      this.map.add(this.graphicsLayer);
      

      var element =  document.getElementById("addPoint");
      var basemapGalleryDiv =  document.getElementById("basemapGalleryDiv");
      var hideButtonDiv =document.getElementById("hideButtonDiv");

/*
      this.track = new Track({
        view: this.view
      });
      
      
      this.view.ui.add(this.track, "top-left");
*/
      this.view.ui.add(element,"top-right");

      this.view.ui.add(hideButtonDiv,"top-right");



      /*
      this.getCurrentPoint();

     */

      const basemapGallery = new BasemapGallery({
        view: this.view,
        container:basemapGalleryDiv,
      });
      // Add widget to the top right corner of the view

      this.view.ui.add(basemapGallery, {
        position: "top-right"
      });
      
      this.view.when( ()=>{
        
        this.addPoints();
        
      }); 

      this.initCurrentLocation();
      /*
      setInterval(()=>{ 
        this.getCurrentPoint();  
      
      }, 1000);
     */

      return this.view;

    } catch (error) {
      console.error("EsriLoader: ", error);
    }
  }

  ngOnInit() {
    this.initializeMap();
    this.initBackgroundGeolocation();
   
  }


 initCurrentLocation(){
     
  this.geolocation.getCurrentPosition().then((resp) => {

    
    this.view.center=[resp.coords.longitude,resp.coords.latitude];
    this.view.zoom =18;

  

   }).catch((error) => {
     console.log('Error getting location', error);
   });
 } 



 getCurrentPoint(){
  
    this.geolocation.getCurrentPosition().then((resp) => {


      if(resp){
          this.addCurrentPoint(resp);
      }
    
      return resp;

     }).catch((error) => {
       console.log('Error getting location', error);
     });
  
  }

  async addCurrentPoint(resp){

    try {
      const [Graphic] = await loadModules(["esri/Graphic"]);
      if(this.currentPoint){
        this.view.graphics.remove(this.currentPoint);
      }
  
  
      const simpleMarkerSymbol = {
        type: "simple-marker",
        color: [14, 75, 239],  
        outline: {
          color: [255, 255, 255], // white
          width: 1
        }
      };
  
      
      const point = {
        type: "point",
        longitude:resp.coords.longitude,
        latitude: resp.coords.latitude,
      };
  
  
  
  
      this.currentPoint = new Graphic({
        geometry: point,
        symbol: simpleMarkerSymbol
      });
  
      this.view.graphics.add(this.currentPoint);
    }


    catch (error) {
     console.error("EsriLoader: ", error);
   }




  }


  
  ionViewDidEnter() {
  
      this.addPoints();
      this.backgroundGeolocation.start();
     /*this.myInterval= setInterval(()=>{ 
        this.getCurrentPoint();  
      
      }, 5000);*/
   
  }


  ionViewDidLeave() {  
    this.backgroundGeolocation.stop();
    /*clearInterval(  this.myInterval);*/
 
}

  async addPoints(){

    try {
      // Load the modules for the ArcGIS API for JavaScript
      const [Graphic] = await loadModules(["esri/Graphic","esri/layers/GraphicsLayer","esri/symbols/WebStyleSymbol"]);
      
     
     const symbol = {
      type: "web-style",  // autocasts as new WebStyleSymbol()
      name: "tear-pin-2",
      styleName: "Esri2DPointSymbolsStyle"
    };

     const simpleMarkerSymbol = {
      type: "picture-marker",
      url: "assets/img/point.png",
      width: "20px",
      height: "20px"
    };


    if(this.graphicsLayer){

      this.graphicsLayer.removeAll();


      this.puntoCicloviaService.getAllPuntosCiclovia().subscribe(res=>{
        this.listPuntoCiclovia=res.map(r=> {return new PuntoCicloViaModel(r)});
        
        this.listPuntoCiclovia.map(p=>{

        if(p.latitud && p.longitud){
          const point = {
            type: "point",
            longitude:p.longitud,
            latitude: p.latitud,
          };




          const pointGraphic = new Graphic({
            geometry: point,
            symbol: symbol
          });

          pointGraphic.attributes = {
            "distrito": p.distrito,
            "ciclovia": p.ciclovia,
            
          };
          pointGraphic.popupTemplate ={
        
          
            outFields: ["*"],
            content: [{
              type: "fields", 
            
              fieldInfos: [
                {
                fieldName: "distrito",
                label: "Distrito",
             
               
              },

              {
                fieldName: "ciclovia",
                label: "Ciclovia",
         
              },
            
            ]
            }]

          }

     

          this.graphicsLayer.add(pointGraphic);
        }

  
        });
        
      });



    }

    } catch (error) {
      console.error("EsriLoader: ", error);
    }
  }



  add(){
    this.navCtrl.navigateForward("/ciclovia");
  }

  hide(){
    this.isHide=!this.isHide
    
  }

}
