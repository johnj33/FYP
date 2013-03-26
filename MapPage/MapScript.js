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

                map = new GMap2(document.getElementById("map_canvas"));

                map.setCenter(new GLatLng(position.coords.latitude, position.coords.longitude), 10);
                map.setUIToDefault();

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
                var marker = new GMarker(new GLatLng(latlong[0], -latlong[1]));
                marker.title = gauges[i].station +","+gauges[i].river;
                map.addOverlay(marker);
         

            }


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
    

