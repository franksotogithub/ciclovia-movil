import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

/*import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationEvents, BackgroundGeolocationResponse} from '@ionic-native/background-geolocation/ngx';*/

declare var window;
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  arr : any[];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,

  ) {

    this.arr =[];
    this.initializeApp();
  }

  initializeApp() {



    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();



/*
     const config: BackgroundGeolocationConfig = {
        desiredAccuracy: 10,
        stationaryRadius: 20,
        distanceFilter: 30,
        debug: true,
        stopOnTerminate: false, 
    
        interval: 6000, 
        fastestInterval: 5000,
        activitiesInterval: 10000, 
    };
    


    this.backgroundGeolocation.configure(config)
    .then(() => {
  
      this.backgroundGeolocation.on(BackgroundGeolocationEvents.location).subscribe((location: BackgroundGeolocationResponse) => {
        var locationstr= localStorage.getItem("location");

        if(locationstr ==null){

            this.arr.push(location);
        }

        else{
          var locationarr = JSON.parse(locationstr);
          this.arr = locationarr.push(location);
        }

        localStorage.setItem("location",JSON.stringify(this.arr));
       
      });
  
    });

    window.app = this;*/

    });

// start recording location
/*    this.backgroundGeolocation.start();*/

  }

  /*destroy(){
    this.backgroundGeolocation.stop();
  }*/
}
