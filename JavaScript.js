var GetCurrentLocation = function () {
    var suc = function (p) {
        try
        {
            var mapOptions = {
                zoom: 14,
                center: new google.maps.LatLng(p.coords.latitude, p.coords.longitude),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
        

            if (gauges != null)
            {
                alert(gauges.length);
                for (var i = 0; i < gauges.length ; i++)
                {
                    if (gauges[i]["station"] == "Colwick")
                        alert(gauges[i]["url"]);
                }
            }
        }
        catch(ex)
        {
            alert(ex);
        }
    };
    var locFail = function () {
        alert("fail");
    };
    navigator.geolocation.getCurrentPosition(suc, locFail)
    
};
var map;
var gauges;
function initialize() {
    var mapOptions = {
        zoom: 8,
        center: new google.maps.LatLng(-34.397, 150.644),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

    var xmlhttp = new XMLHttpRequest();

    xmlhttp.open("GET", "environment-agency-river-levels.json", true);

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            try {
                var text = JSON.parse(xmlhttp.responseText);
                gauges = text["gauges"];
            }
            catch (ex2) {
                alert(ex2);
            }
        }
    }
    xmlhttp.send();
}

function GetGauge(name) {
    //var xmlDoc = new window.XMLHttpRequest()
    //xmlDoc.open("GET", name, false)
    //xmlDoc.send("")
   // JSON.parse("enviroment-agency-river-levels.json")
    //var gauges = xmlDoc.responseXML.getElementsByTagName("Gauge")
    //alert(gauges.toString())
   // alert(name)
}
