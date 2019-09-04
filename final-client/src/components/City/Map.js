import React, {useEffect} from 'react';
import GoogleMapLoader from 'google-maps'

export default function Map() {

  let map = React.createRef();
  let mode = React.createRef();

  useEffect(() => {
    GoogleMapLoader.KEY = 'AIzaSyDtGZmEeW3QEK20irH8SpIpdKQjPoKuW5U';
    GoogleMapLoader.load(function(google){

      const targetMap = new google.maps.Map(map.current, {
        center: {lat: 49.246292, lng: -123.116226},
        zoom: 8
      });


      const markerPositions= [
        {lat: 49.246292, lng: -123.116226},
        {lat: 49.267132, lng: -122.968941},
        {lat: 49.166592, lng: -123.133568},
        {lat:49.2384, lng:-123.0318},
        {lat:49.2483,lng:-123.0559}
        ]
      //code from here
      //maker
      markerPositions.map(loc => {
        new google.maps.Marker({
          position: loc,
          map: targetMap,
          title: 'Hello World!'
        });
      })
      // const marker = new google.maps.Marker({
      //   position: myLatLng,
      //   map: targetMap,
      //   title: 'Hello World!'
      // });
      //route
      
      var trafficLayer = new google.maps.TrafficLayer();
      trafficLayer.setMap(targetMap);
      var waypoints = [
        {
          location: {lat: 49.166592, lng: -123.133568},
          stopover: true
      },
      {
        location: {lat:49.2384, lng:-123.0318},
        stopover: true
    },
      {
        location: {lat:49.2483,lng:-123.0559},
        stopover: true
  }
      
        
      ];
      var directionsDisplay = new google.maps.DirectionsRenderer;
      var directionsService = new google.maps.DirectionsService;
      directionsDisplay.setMap(targetMap);
     
      calculateAndDisplayRoute(directionsService, directionsDisplay);
      // document.getElementById('mode').addEventListener('change', function() {
      //     calculateAndDisplayRoute(directionsService, directionsDisplay);
      //   });

        function calculateAndDisplayRoute(directionsService, directionsDisplay) {
          // var selectedMode = mode.current.value;
          
          directionsService.route({
            origin: markerPositions[0], 
            destination: markerPositions[1], 
            // waypoints: waypoints, //an array of waypoints
            // optimizeWaypoints: true,
            travelMode: "TRANSIT",
            transitOptions: {
              departureTime: new Date(Date.now() + 100000),
              modes: ['BUS'],
              routingPreference: 'FEWER_TRANSFERS'
            }
            
          }, function(response, status) {
            console.log('here is the response ----------')
            console.log(response)
            if (status == 'OK') {
              directionsDisplay.setDirections(response);
              console.log("-----response",response)
              
              var infowindow2 = new google.maps.InfoWindow();
              infowindow2.setContent(response.routes[0].legs[0].distance.text + "<br>" + response.routes[0].legs[0].duration.text + " ");
              infowindow2.setPosition({lat: 49.166592, lng: -123.133568});
              infowindow2.open(targetMap);
            } else {
              window.alert('Directions request failed due to ' + status);
            }
          });
        }


    })

  })

  //<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDtGZmEeW3QEK20irH8SpIpdKQjPoKuW5U"></script>
  return (
    <>
    <div
      style={{
        height: '500px',
        width: '500px',
      }}
      className='bg-dark'
      ref={map}
      // ref={mode}

    ></div>
    </>
  )
}

