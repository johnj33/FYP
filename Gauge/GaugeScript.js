﻿function Initialise() {
    try{

        var text1 = document.getElementById("text1");
        var text2 = document.getElementById("text2");
        var text3 = document.getElementById("text3");
        var text4 = document.getElementById("text4");
        var graph1 = document.getElementById("graph1");
        var graph2 = document.getElementById("graph2");
        
        var values = localStorage["Gauge"].split(",");
        
        if (values[0] == "offline") {
            alert(localStorage[values[1] + "other"]);
            var gaugedata = localStorage[values[1] + "other"].split(",");
            gauge = values[1].split("-")[1];
            river = gaugedata[0];
            town = gaugedata[1];
            currentLevel = gaugedata[2] +" "+ values[1].split("-")[0].replace("_", "/").replace("_", "/").replace("_", ":").replace("_", ":");

            graph1.src = "//sdcard/RiverLevels/" + values[1] + "chart1.jpg";
            graph2.src = "//sdcard/RiverLevels/" + values[1] + "chart2.jpg";
        }
        else {

            var graphurl = "http://www.environment-agency.gov.uk/homeandleisure/floods/riverlevels/Controls/RiverLevels/ChartImage.jpg?Id=";

            image1str = graphurl + values[4] + "&ChartType=Graph";
            image2str = graphurl + values[4] + "&ChartType=Histogram";

            graph1.src = image1str;
            graph2.src = image2str;
            gauge = values[3];
            url = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from html where url="' + values[1] + '"') + ' and xpath="//*[@id=\'station-detail-right\']/div/div/h3\"&format=json&callback=cbFunc';

            var xmlHttp = null;

            xmlHttp = new XMLHttpRequest();
            xmlHttp.open("GET", url, false);
            xmlHttp.send(null);
            currentLevel = xmlHttp.responseText.split("Current level: ")[1].split("\"")[0];
            town = values[0];
            river = values[2];
            longlat = new Array();
            longlat[0] = values[5];
            longlat[1] = values[6];
        }
            text1.textContent = "Gauge: " + gauge;
            text2.textContent = "Town: " + town;
            text3.textContent = " \n River: " + river;
            text4.textContent = "Current Level:" + currentLevel;

            
            
            document.addEventListener("deviceready", onDeviceReady, false);
            
            function onDeviceReady() {
                enabled = true;
            }

            
        
    }
    catch (ex) {
        alert(ex);
    }
    
}
var image1str;
var image2str;
var gauge;
var town;
var river;
var currentLevel;
var enabled = false;
var longlat;

function AddToFavorites() {
    try{
        var favorites = localStorage["favs"];
        if (typeof favorites === "undefined") {
            favorites = "";
        }

        var favs = favorites.split(',');
        var found = false;
        for (var i = 0; i < favs.length; i++) {
            if (favs[i] == gauge) {
                found = true;
            }
        }
        if (!found) {
            if (favs.length != 0) {
                favorites += ","
            }
            favorites += gauge;
            localStorage["favs"] = favorites;
            alert("added");
        }
        else {
            alert("already added");
        }
    }
    catch (ex) {
        alert(ex);
    }
    
}

function zoomImg1() {
    var graph1 = document.getElementById("graph1");
    localStorage["img"] = graph1.src;
    window.location = "../FullscreenImg/FullScrImg.html";
}

function zoomImg2() {
    var graph2 = document.getElementById("graph2");
    localStorage["img"] = graph2.src;
    window.location = "../FullscreenImg/FullScrImg.html";
}

function Save() {
    try {
        if (enabled) {
            var StoredOffline = localStorage["offline"];
            if (typeof StoredOffline === "undefined") {
                StoredOffline = "";
            }

            var DateTime = new Date();
            var uniqueID = DateTime.getDate() + "_"
                        + (DateTime.getMonth() + 1) + "_"
                        + DateTime.getFullYear() + " "
                        + DateTime.getHours() + "_"
                        + DateTime.getMinutes() + "_"
                        + DateTime.getSeconds() + "-"
                        + gauge;
            localStorage["offline"] += uniqueID + ",";

            alert(uniqueID);


            localStorage[uniqueID + "other"] = river + "," + town + "," + currentLevel;

            saveimg(uniqueID, "chart1", image1str);
            saveimg(uniqueID, "chart2", image2str);
        }
        else {
            alert("saving not supported on this device");
        }        
    }
    catch (ex) {
        alert(ex);
    }
}

function saveimg(uniqueID, name, imgStr) {
    
        var fileTransfer = new FileTransfer();
        fileTransfer.download(
                imgStr,
                "file://sdcard/" + "RiverLevels/" + uniqueID + name + ".jpg",
            function (entry) {
                
            },
            function (error) {
                alert("download error source " + error.source);
                alert("download error target " + error.target);
                alert("upload error code" + error.code);
            });
    
}

function ShowChart1() {
    var graph1 = document.getElementById("graph1");
    var graph2 = document.getElementById("graph2");
    var map = document.getElementById("map_canvas");

    graph1.style.display = "block";
    graph2.style.display = "none";
    map.style.display = "none";
}

function ShowChart2() {
    var graph1 = document.getElementById("graph1");
    var graph2 = document.getElementById("graph2");
    var map = document.getElementById("map_canvas");

    graph1.style.display = "none";
    graph2.style.display = "block";
    map.style.display = "none";

}

function ShowMap() {
    var graph1 = document.getElementById("graph1");
    var graph2 = document.getElementById("graph2");
    var map = document.getElementById("map_canvas");

    graph1.style.display = "none";
    graph2.style.display = "none";
    map.style.display = "block";
    Dispmap = new google.maps.Map(
                        document.getElementById('map_canvas'), {
                            center: new google.maps.LatLng(longlat[0], longlat[1]),
                            zoom: 13,
                            mapTypeId: google.maps.MapTypeId.ROADMAP
                        });

    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(longlat[0], longlat[1]),
        map: Dispmap,
        title: gauge,
        data: gauge
    });
    google.maps.event.trigger(Dispmap, "resize");

}

var Dispmap;