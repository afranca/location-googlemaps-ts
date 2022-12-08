import { GOOGLE_API_KEY } from "./constants";
import axios from "axios";

const form = document.querySelector("form")!;
const addressInput = document.getElementById("address")! as HTMLInputElement;

//declare var google: any;

type GoogleGeocodingResponse = {
    results: { geometry: { location: {lat: number; lng: number } } }[];
    status: 'OK' | 'ZERO_RESULTS';
}

function searchAddressHandler(event: Event) {
  event.preventDefault();
  const enteredAddress = addressInput.value;

  //Send Address to Google API
  axios.get<GoogleGeocodingResponse>(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
      enteredAddress
    )}&key=${GOOGLE_API_KEY}`
  ).then(res => {
      if (res.data.status !== 'OK'){
        throw new Error('Zero Results, try again!');
      }    
      const coordinates = res.data.results[0].geometry.location;
      
      const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
        center: coordinates,
        zoom: 13,
      });

      new google.maps.Marker({position: coordinates, map: map});

  }).catch(err => {
    alert(err.message);
    console.log(err);
  });
}

form.addEventListener("submit", searchAddressHandler);
