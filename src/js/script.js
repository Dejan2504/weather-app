'use strict';


class App{
    latitude;
    longitude;

    constructor(){
        this.getLocation();
    }

    getLocation(){
       navigator.geolocation.getCurrentPosition(this.getLocationData);

    }

    getLocationData(position){
   const {latitude, longitude} = position.coords;
    console.log(latitude, longitude);
}

}

const app = new App();



