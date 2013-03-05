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
    //var suc = function(p) {
    //    try {
    //        var mapOptions = {
    //            zoom: 14,
    //            center: new google.maps.LatLng(p.coords.latitude, p.coords.longitude),
    //            mapTypeId: google.maps.MapTypeId.ROADMAP
    //        };

    //        map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    //        alert(text);
    //    } catch(ex) {
    //        alert(ex);
    //    }
//};

//    var locFail = function() {
//        alert("fail");
//    };
//    try {

//        if (gauges != null) {
//            var search = new Search("Colwick");
//            gauges.forEach(search.FindGaugeByStation);
//            alert(gauges.length);
//            if (searchResult != null) {
//                alert(searchResult.town);
                
//                localStorage["Gauge"] = data;
//                window.location = "Gauge/Gauge.html";

//            } else
//                alert("location not found");
//        }
//    } catch(ex3) {
//        alert(ex3);
//    }

//    navigator.geolocation.getCurrentPosition(suc, locFail);
};


function initialize() {

    var xmlhttp = new XMLHttpRequest();
    try {
       
        $.getJSON("Data/environment-agency-river-levels.json", function(data) {
            jsonparse(data);
        });
    }
    catch(ex1) {
        alert(ex1);
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
            if (!RiverAdded(currentGauge["River"])) {
                rivers[rivers.length] = currentGauge["River"];
            }
            
        }

        showdetailstemp();
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
var text = "{\"gauges\":[";

function showdetailstemp() {

    document.getElementById("jsontxt").textContent = text;
    for (var i = 0; i < gauges.length; i++) {

        //if (i == 0) {
        //    var geocoder = new google.maps.Geocoder();
        //    geocoder.geocode({ 'address': gauges[i].town }, function (results, status) {
        //        if (status == google.maps.GeocoderStatus.OK) {
        //            //try {
        //            document.getElementById("jsontxt").textContent += results[0].geometry.location;
        //            //alert(results[0].geometry.location);
        //            //gauges[i].loc = results[0].geometry.location;
        //            //text += gauges[i].toString();
        //            //alert(i);
        //            //if (i == gauges.length) {
        //            //    document.getElementById("jsontxt").textContent = text;
        //            //    alert("true");
        //            //}
        //            //} catch(e) {
        //            //    alert(e);
        //            //} 
        //        } else {
        //            alert("Geocode was not successful for the following reason: " + status);
        //        }
                
        //    });
        //}
    }

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

    this.toString = function() {
        return "{ \"url\":\"" + this.url + "\", \"River\":\"" + this.river + "\",\"station\":\"" + this.station + "\",\"Town\":\"" + this.town + "\",\"GraphCode\":\"" + this.graphcode + "\",\"loc\":\"" + this.loc + "\"}";

    };
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
