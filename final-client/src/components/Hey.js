
import React from 'react';
import { GoogleMap, withScriptjs, withGoogleMap} from "react-google-maps";


function Map() {
 return (
   <GoogleMap
     defaultZoom={10}
     defaultCenter= {{lat:49.2274622, lng: -122.9999852 }}
   />
 )
}
const WrappedMap = withScriptjs(withGoogleMap(Map))


	

export default function Hey(){
	return(
		<div style= {{width: '50vw', height: '100vh'}}>
       <WrappedMap
         googleMapURL={'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDtGZmEeW3QEK20irH8SpIpdKQjPoKuW5U'}
         loadingElement= {<div style= {{height: "70%"}}/>}
         containerElement= {<div style= {{height: "70%"}}/>}
         mapElement= {<div style= {{height: "70%"}}/>}
       />
     </div>
	)
}