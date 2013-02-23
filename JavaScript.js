var map;
var gauges = new Array();
var rivers = new Array();
var searchResult;
var results;

var SearchRivers = function () {
    try {
        
    
    var rivereditbox = document.getElementById("RiversSelction");
    var gaugeeditbox = document.getElementById("GaugesSelection");
    var search = new Search(rivers[rivereditbox.selectedIndex]);
    gauges.forEach(search.FindGaugeByRiver);

    for (var i = 0; i < results.length; i++) {
        gaugeeditbox.options[i] = new Option(results[i].station,results[i]);
    }
    } catch (e) {
        alert(e);
    }
};

var ViewGauge = function() {
    try {
        var gaugeeditbox = document.getElementById("GaugesSelection");
        
        var gauge = gaugeeditbox.options[gaugeeditbox.selectedIndex].text;
        var search = new Search(gauge);
        gauges.forEach(search.FindGaugeByStation);
        alert(gauges.length);
        
        if (searchResult != null) {

            var data = "";
            data += searchResult.town;
            data += "," + searchResult.url;
            data += "," + searchResult.river;
            data += "," + searchResult.station;
            data += "," + searchResult.graphcode;
            data += "," + searchResult.loc;

            localStorage["Gauge"] = data;
            window.location = "Gauge/Gauge.html";
        }
    }
    catch(ex)
    {
        alert(ex);
    }
};

var GetCurrentLocation = function() {
    var suc = function(p) {
        try {
            var mapOptions = {
                zoom: 14,
                center: new google.maps.LatLng(p.coords.latitude, p.coords.longitude),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
        } catch(ex) {
            alert(ex);
        }
    };

    var locFail = function() {
        alert("fail");
    };
    try {

        if (gauges != null) {
            var search = new Search("Colwick");
            gauges.forEach(search.FindGaugeByStation);
            alert(gauges.length);
            if (searchResult != null) {
                alert(searchResult.town);
                
                localStorage["Gauge"] = data;
                window.location = "Gauge/Gauge.html";

            } else
                alert("location not found");
        }
    } catch(ex3) {
        alert(ex3);
    }

    navigator.geolocation.getCurrentPosition(suc, locFail);
};


function initialize() {

    var xmlhttp = new XMLHttpRequest();
    try {
        xmlhttp.open("GET", "Data/environment-agency-river-levels.json", true);
        xmlhttp.send();
    }
    catch(ex1) {
        alert(ex1);
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            try {
                
                var text = JSON.parse(xmlhttp.responseText);
                gauges = new Array();
                for (var i = 0; i < text["gauges"].length; i++) {
                    var currentGauge = text["gauges"][i];
                    gauges[i] = new Gauge(currentGauge["url"], currentGauge["River"], currentGauge["station"], currentGauge["Town"], currentGauge["GraphCode"], currentGauge["loc"]);
                    if (!RiverAdded(currentGauge["River"])) {
                        rivers[rivers.length] = currentGauge["River"];
                        
                        //alert(i);
                        //var geocoder = new google.maps.Geocoder();
                        
                        //geocoder.geocode( { 'address': currentGauge["Town"]}, function(results, status) {
                        //    if (status == google.maps.GeocoderStatus.OK) {
                        //        alert(results[0].geometry.location);
                                
                               
                        //    } else {
                        //        alert("Geocode was not successful for the following reason: " + status);
                        //    }
                        //});
                        //alert(loc.results.address_components.geometry.location.lat);
                    }
                }
                rivers.sort();
                rivers.forEach(addRiver);                


            } catch (ex2) {
                alert(ex2);
                for (var prop in ex2) {
                    alert("property: " + prop + " value: [" + err[prop] + "]");
                }
                alert("toString(): " + " value: [" + err.toString() + "]");
                
            }


        }
        
    };
}

function addRiver(river) {
   
    var rivereditbox = document.getElementById("RiversSelction");
    rivereditbox.options.add(new Option(river, river));

}
function RiverAdded(river) {
    for (var i = 0; i < rivers.length; i++) {
        if (rivers[i] == river)
            return true;
    }
    return false;
}

function Gauge(url, river, station, town, graphcode, loc) {

    this.url = url;
    this.river = river;
    this.town = town;
    this.station = station;
    this.graphcode = graphcode;
    this.loc = loc;
}

//functions for searching gauge array
function Search(value) {
    searchResult = null;
    results = new Array();
    this.value = value;

    this.FindGaugeByTown = function (gauge) {
        if (gauge.Town == value) {
            searchResult = gauge;
            alert(this.result);
            return;
        }

    };

    this.FindGaugeByStation = function(gauge) {
        if (gauge.station == value) {
            searchResult = gauge;
            return;
        }

    };

    this.FindGaugeByRiver = function(gauge) {
        if (gauge.river == value) {
            results[results.length] = gauge;
        }
    };

    this.GetAllRivers = function(gauge) {
        results[results.length] = gauge.river;
    };

}
