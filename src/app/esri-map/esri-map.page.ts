import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from "@angular/core";
import { loadModules } from "esri-loader";
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { PuntoCicloviaService } from '../services/punto-ciclovia.service';
import { PuntoCicloViaModel } from '../model/punto_ciclo_via/puntoCicloVia.model';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { ViaService } from '../services/via.service';
import { ViaModel } from '../model/via/via.model';
import { GeomModel } from '../model/geom/geom.model';
import { ViaRequets } from '../model/via/via.requets';
import {Storage} from '@ionic/storage';
import { DistritoService } from '../services/distrito.service';
import { DistritoModel } from '../model/distrito/distrito.model';
import { UsuarioModel } from '../model/usuario/usuario.model';
declare var window;

declare var navigator: any;
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
  latitude :any;

  locations:any;

  watch:any;
  subscription  :any;
  dataLocation:any;

  listVia : ViaModel[]; 
  graphicsLayerVias:any;

  constructor(
    private geolocation: Geolocation,

    private puntoCicloviaService: PuntoCicloviaService,
    private navCtrl : NavController,
    private authService: AuthService,
    private viaService : ViaService,
    private storage:Storage,
    private distritoService: DistritoService,
    //private backgroundGeolocation: BackgroundGeolocation,
    ) {}


 

  async initializeMap() {
    try {
      // Load the modules for the ArcGIS API for JavaScript
      const [Map, MapView,BasemapGallery,Track,GraphicsLayer,Locate ] = await loadModules(["esri/Map", "esri/views/MapView",
      "esri/widgets/BasemapGallery","esri/widgets/Track",
      "esri/layers/GraphicsLayer","esri/widgets/Locate"]);

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
      this.graphicsLayerVias = new GraphicsLayer();
      this.map.add(this.graphicsLayerVias);

      var element =  document.getElementById("addPoint");
      var basemapGalleryDiv =  document.getElementById("basemapGalleryDiv");
      var hideButtonDiv =document.getElementById("hideButtonDiv");
      var location =document.getElementById("location");



      this.view.ui.add(element,"top-right");
      this.view.ui.add(location,"top-left");
      this.view.ui.add(hideButtonDiv,"top-right");



      
   

     

      const basemapGallery = new BasemapGallery({
        view: this.view,
        container:basemapGalleryDiv,
      });
      // Add widget to the top right corner of the view


      /*
      var locateWidget = new Locate({
        view: this.view,   // Attaches the Locate button to the view
        graphic:null,
      });*/


      this.view.ui.add(basemapGallery, {
        position: "top-right"
      });

      this.getCurrentPoint();
      this.addVias();
      this.addPoints();
      return this.view;

    } catch (error) {
      console.error("EsriLoader: ", error);
    }
  }

  currentLocation(){  

    this.view.center=[this.dataLocation.coords.longitude,
    this.dataLocation.coords.latitude];
    this.view.zoom =18;    

  }


  ngOnInit() {
    this.initializeMap();
    
    /*this.initCurrentLocation();*/
    
    /*this.initializeMap(resp.coords.longitude,resp.coords.latitude);*/
  }

/*
 initCurrentLocation(){
  console.log('holass')
  this.geolocation.getCurrentPosition().then((resp) => {

    
    this.view.center=[resp.coords.longitude,resp.coords.latitude];
    this.view.zoom =18;  
    

   }).catch((error) => {
     console.log('Error getting location', error);
   });
 } 
*/



 getCurrentPoint(){  


    this.watch = this.geolocation.watchPosition();

    this.subscription=this.watch.subscribe((data) => {
        if(data ){
          this.dataLocation=data;     
          
          
          console.log('data>>>',data);
          /**/
          this.addCurrentPoint(data);
          this.currentLocation();
          
      }
    
    });


  }


  
  async addCurrentPoint(resp){

    try {
      const [Graphic] = await loadModules(["esri/Graphic"]);
      if(this.currentPoint){
        this.view.graphics.remove(this.currentPoint);
      }
  
      if( this.view){
        
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
    /*
      this.addPoints();
    
      this.getCurrentPoint(); */
      this.getCurrentPoint();
      this.addPoints();
  }


  ionViewDidLeave() {  
       this.subscription.unsubscribe();
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

    let user: UsuarioModel=JSON.parse( localStorage.getItem("currentUser"));

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


  async addVias(){
    try {
      // Load the modules for the ArcGIS API for JavaScript
      const [Graphic] = await loadModules(["esri/Graphic","esri/layers/GraphicsLayer","esri/symbols/WebStyleSymbol"]);
      
     
      var polylineSymbol = {
        type: "simple-line",  // autocasts as SimpleLineSymbol()
        color: [255, 0, 0],
        width: 4
      };


    if(this.graphicsLayerVias){

      this.graphicsLayerVias.removeAll();


      this.viaService.getAllVia().subscribe(res=>{
        this.listVia=res.map(r=> {return new ViaModel(r)});
        
        this.listVia.map(v=>{
          
          let geom= new GeomModel(JSON.parse(v.GeoJson));

          var polyline = {
            type: "polyline",  // autocasts as new Polyline()
              paths: geom.coordinates
          };

          var polylineAtt = {
            Name: v.Name,
            
          };
          
       
          var polylineGraphic = new Graphic({
            geometry: polyline,
            symbol: polylineSymbol,
            attributes: polylineAtt
          });


          this.graphicsLayerVias.add(polylineGraphic);
          




/*
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
        }*/

  
        });
        
      });



    }

    } catch (error) {
      console.error("EsriLoader: ", error);
    }

  }
  
  
  display(){

  }


  add(){
    this.puntoCicloviaService.setPoint(this.dataLocation);

    this.viaService.getViaCercana(this.dataLocation.coords.longitude, this.dataLocation.coords.latitude).toPromise().then((resp:ViaRequets[])=>{
      if(resp.length>0){
        let via = new ViaModel(resp[0]);
        localStorage.setItem("via",JSON.stringify(via));
        this.distritoService.getDistritoCercano(this.dataLocation.coords.longitude, this.dataLocation.coords.latitude).toPromise().
        then((resp)=>{
          if(resp.length>0){

            let distrito = new DistritoModel(resp[0]);
            localStorage.setItem("distrito",JSON.stringify(distrito));

          }
          this.navCtrl.navigateForward("/ciclovia");
        });
        
        
        /*this.storage.set("via",JSON.stringify(via));*/
   
      }
      
      
    });
    
  }

  hide(){
    this.isHide=!this.isHide
    
  }

  logout(){
    this.authService.logout();
  }

}
