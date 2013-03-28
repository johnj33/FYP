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
        showGauge(gauge);
        
    }
    catch(ex)
    {
        alert(ex);
    }
};
function showGauge(gauge) {
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
        window.location = "../Gauge/Gauge.html";
    }
}
var GetCurrentLocation = function () {
    window.location = "../MapPage/MapPage.html";
};

function ViewFavGauge() {
    var gaugeeditbox = document.getElementById("FavsSelection");

    var gauge = gaugeeditbox.options[gaugeeditbox.selectedIndex].text;
    showGauge(gauge);

}

function initialize() {

    var xmlhttp = new XMLHttpRequest();
    try {
        addFavs();
        $.getJSON("../Data/environment-agency-river-levels.json", function(data) {
            jsonparse(data);
        });
    }
    catch(ex1) {
        alert(ex1);
    }
    
}

function addFavs() {
    var favsEditBox = document.getElementById("FavsSelection");
    var fav = localStorage["favs"];
    if (typeof fav === "undefined") {
        alert("no favs");
    }
    else {
        


        var favs = fav.split(',');
        for (var i = 0; i < favs.length; i++) {
            favsEditBox.options.add(new Option(favs[i], favs[i]));
        }
    }
    
}


function jsonparse(data) {
    try {
        alert(data);
        
        gauges = new Array();
        for (var i = 0; i < data["gauges"].length; i++) {
            var currentGauge = data["gauges"][i];
            
            gauges[i] = new Gauge(currentGauge["url"], currentGauge["River"], currentGauge["station"], currentGauge["Town"], currentGauge["GraphCode"], currentGauge["loc"]);
            if (!RiverAdded(currentGauge["River"])) {
                rivers[rivers.length] = currentGauge["River"];
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
