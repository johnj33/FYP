var map;
var gauges = new Array();
var searchResult;
var results;

var GetCurrentLocation = function () {
    var suc = function (p) {
        try {
            var mapOptions = {
                zoom: 14,
                center: new google.maps.LatLng(p.coords.latitude, p.coords.longitude),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);            
        }

        catch (ex) {
            alert(ex);
        }
    };
    var locFail = function () {
        alert("fail");
    };
    try
    {
    
        if (gauges != null) {
            var currentGauge;

            var search = new Search("Colwick");
            gauges.forEach(search.FindGaugeByStation);
            if (searchResult != null) {
                alert(searchResult.town);
                var data = "";
                data += searchResult.town;
                data += "," + searchResult.url;
                data += "," + searchResult.river;
                data += "," + searchResult.station;
                data += "," + searchResult.graphcode;
                data += "," + searchResult.loc;
                localStorage["Gauge"] = data;
                window.location = "Gauge.html";
                
            }
            else
                alert("location not found");

            //search = new Search("River Trent");
            //gauges.forEach(search.FindGaugeByRiver);
            //if (results.length > 0) {

            //    var theTable = document.getElementById('table');
            //    for (var i = 0, tr, td; i < results.length; i++) {
            //        tr = document.createElement('tr');
            //        td = document.createElement('td');
            //        td.appendChild(document.createTextNode(results[i].station));
            //        tr.appendChild(td);
            //        theTable.appendChild(tr);
            //    }

            //    //document.getElementById('table').appendChild(theTable);
            //    alert(results.length);
            //}
        }
    }
    catch(ex3){
        alert(ex3);
    }

    navigator.geolocation.getCurrentPosition(suc, locFail);
};



function initialize() {

    var xmlhttp = new XMLHttpRequest();

    xmlhttp.open("GET", "environment-agency-river-levels.json", true);

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            try {
                var text = JSON.parse(xmlhttp.responseText);
                gauges = new Array();

                for (var i = 0 ; i < text["gauges"].length; i++) {
                    var currentGauge = text["gauges"][i];
                    gauges[i] = new Gauge(currentGauge["url"], currentGauge["River"], currentGauge["station"], currentGauge["Town"], currentGauge["GraphCode"],currentGauge["loc"]);
                }

            }
            catch (ex2) {
                alert(ex2);
            }
        }
    }
    xmlhttp.send();
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
            
    }

    this.FindGaugeByStation = function (gauge) {
        if (gauge.station == value) {
            searchResult = gauge;
            return;
        }
            
    }

    this.FindGaugeByRiver = function (gauge) {
        if (gauge.river == value) {
            results[results.length] = gauge;
        }
    }

    this.GetAllRivers = function (gauge) {
        results[results.length] = gauge.river;
    }

}
