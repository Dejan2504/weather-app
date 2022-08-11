import { API_KEY } from "./config";

class App{

      constructor(){
            this.setLocation();
      }

setLocation(){
   navigator.geolocation.getCurrentPosition(this.getLocation);
 }

getLocation = async function(position){
      const {latitude, longitude} = position.coords;   

      const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude},${longitude}?key=${API_KEY}`);

      const data = await response.json();

     console.log(data);
}

}

export default new App;






