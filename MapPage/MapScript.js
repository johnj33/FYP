var gauges = new Array();
var markers = new Array();
var map;
function Initialise() {

    try {  

        if (navigator.geolocation) {
            var timeoutVal = 10 * 1000 * 1000;
            navigator.geolocation.getCurrentPosition(
              displayPosition,
              displayError,
              { enableHighAccuracy: true, timeout: timeoutVal, maximumAge: 0 }
            );
        }
        else {
            alert("Geolocation is not supported by this browser");
        }


        function displayPosition(position) {

            alert("Latitude: " + position.coords.latitude + ", Longitude: " + position.coords.longitude);
            try
            {

                map = new google.maps.Map(
                    document.getElementById('map_canvas'), {
                    center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                    zoom: 13,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                    });


                $.getJSON("../Data/environment-agency-river-levels.json", function (data) { jsonparse(data); });

            }
            catch (ex) {
                alert(ex);
            }

        }
        function displayError(error) {
            var errors = {
                1: 'Permission denied',
                2: 'Position unavailable',
                3: 'Request timeout'
            };
            alert("Error: " + errors[error.code]);
        }

    }
    catch (ex) {
        alert(ex);
    }
}
    
 function jsonparse(data) {
     try {
        
         alert(data);

         gauges = new Array();
       
         
         for (var i = 0; i < data["gauges"].length; i++) {
             var currentGauge = data["gauges"][i];

             gauges[i] = new Gauge(currentGauge["url"], currentGauge["River"], currentGauge["station"], currentGauge["Town"], currentGauge["GraphCode"], currentGauge["loc"]);
             var latlong = gauges[i].loc.split("-");
        
             var marker = new google.maps.Marker({
                 position: new google.maps.LatLng(latlong[0], -latlong[1]),
                 map: map,
                 title: gauges[i].station,
                 data:gauges[i]
             });
             //'<script> function ViewGauge(){alert("test");} </script>' +
             
             google.maps.event.addListener(marker, 'click', (function (marker, i) {
                 return function () {

                     function ViewGauge() {
                         alert("test");
                     }
                     var contentString = 
                            '<div id="content">' + 
                            '<div id="siteNotice">' +
                            '</div>' +
                            '<h2 id="firstHeading" class="firstHeading">'+gauges[i].station+'</h2>' +
                            '<div id="bodyContent">' +
                            '<p><b>'+ gauges[i].river +'</b></p>' +
                            '<button id="ViewGaugeBtn" onclick="ViewGauge()" > View Gauge</button>' +
                            '</div>' +
                            '</div>';
                     infowindow.setContent(contentString);
                     var data = "";
                     data += gauges[i].town;
                     data += "," + gauges[i].url;
                     data += "," + gauges[i].river;
                     data += "," + gauges[i].station;
                     data += "," + gauges[i].graphcode;
                     data += "," + gauges[i].loc;
                     infowindow.open(map, marker);
                 }
             })(marker, i));
             //google.maps.event.addListener(marker, 'click', function () {
             //    map.setCenter(new google.maps.LatLng(pinMarker.position.lat(), pinMarker.position.lng())); 
             //    map.setZoom(18); 
             //    onItemClick(event, pinMarker); 
             //});

         }
         var infowindow = new google.maps.InfoWindow();
         // Info window trigger function 
        
     }
     catch (ex2) {
         alert(ex2);
     }
 }

 function addMarker(gauge) {
     try {
         
         try{

             
         }
         catch (ex) {
             alert(ex);
         }
         
     }
     catch (ex3) {
         alert(ex3);
     }

 }

 function Gauge(url, river, station, town, graphcode, loc) {

     this.url = url;
     this.river = river;
     this.town = town;
     this.station = station;
     this.graphcode = graphcode;
     this.loc = loc;
 }