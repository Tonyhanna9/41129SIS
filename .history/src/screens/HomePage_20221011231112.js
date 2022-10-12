import React from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap
} from "react-google-maps";


function Map(){
  return( 
  
  <GoogleMap 
    defaultZoom={10} 
    defaultCenter = {{lat: 45.421532, lng: -75.697189 }} 
    />

  );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

// Map Function 
export default function App(){
  return (
    <div style = {{width: '50vw', height: '50vh'}}>
      <WrappedMap
        googleMapURL = {'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCRRZScwi8p5-AbpmZty9ajh2s-wde7u3I'}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}