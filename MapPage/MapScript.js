var gauges = new Array();
var markers = new Array();

function Initialise() {
    try {
        var xmlhttp = new XMLHttpRequest();
        try {

            $.getJSON("../Data/environment-agency-river-levels.json", function (data) {
                jsonparse(data);
            });
            
        }
        catch (ex1) {
            alert(ex1);
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

            if (i == 0) {

                //alert(loc.results.address_components.geometry.location.lat);
            }
            gauges[i] = new Gauge(currentGauge["url"], currentGauge["River"], currentGauge["station"], currentGauge["Town"], currentGauge["GraphCode"], currentGauge["loc"]);

        }
        addmap();

    }


    catch (ex2) {
        alert(ex2);

    }
}

function addmap() {
    var suc = function(p) {
        try {
            var mapOptions = {
                zoom: 14,
                center: new google.maps.LatLng(p.coords.latitude, p.coords.longitude),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
            gauges.forEach(addMarker);
        } catch (ex) {
            alert(ex);
        }
    }
    locFail = function() {
    }
    navigator.geolocation.getCurrentPosition(suc, locFail);
}

function addMarker(gauge) {
    try
    {
        var latlong = gauge.loc.split(",");
        markers[markers.length] = new google.maps.Marker({
            position: new google.maps.LatLng(latlong[0], latlong[1]),
            map: map
        });
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