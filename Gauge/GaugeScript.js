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
          
            var gaugedata = localStorage[values[1] + "other"].split(",");
            gauge = values[1].split("-")[1];
            river = gaugedata[0];
            town = gaugedata[1];
            currentLevel = gaugedata[2] + values[1];

            graph1.src = localStorage[values[1] + "img1"];
            graph2.src = localStorage[values[1] + "img2s"];
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
        }
            text1.textContent = "Gauge: " + gauge;
            text2.textContent = "Town: " + town;
            text3.textContent = " \n River: " + river;
            text4.textContent = "Current Level:" + currentLevel;
            document.addEventListener("deviceready", onDeviceReady, false);

            function onDeviceReady() {
                alert("ready");
                // Now safe to use the Cordova API
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
    localStorage["img"] = image1str;
    window.location = "../FullscreenImg/FullScrImg.html";
}

function zoomImg2() {
    localStorage["img"] = image2str;
    window.location = "../FullscreenImg/FullScrImg.html";
}

function Save() {
    try {
        var StoredOffline = localStorage["offline"];
        if (typeof StoredOffline === "undefined") {
            StoredOffline = "";
        }

        var DateTime = new Date();
        var uniqueID = DateTime.getDate() + "_"
                    + (DateTime.getMonth() + 1) + "_"
                    + DateTime.getFullYear()
                    + DateTime.getHours() + "_"
                    + DateTime.getMinutes() + "_"
                    + DateTime.getSeconds() + "-"
                    + gauge;
        localStorage["offline"] += uniqueID + ",";

        alert(uniqueID);

        
        localStorage[uniqueID + "other"] = river + "," + town + "," + currentLevel;

       
        //var fileTransfer = new FileTransfer();
        //// Get the data directory, creating it if it doesn't exist.
        //dataDir = fileSystem.root.getDirectory("data", { create: true });

        //// Create the lock file, if and only if it doesn't exist.
        //lockFile = dataDir.getFile(uniqueID +"img1"+".jpg", { create: true, exclusive: true });

        //fileTransfer.download(
        //    graph1.src,
        //    lockFile,
        //    function (entry) {
        //        console.log("download complete: " + entry.fullPath);
        //    },
        //    function (error) {
        //        console.log("download error source " + error.source);
        //        console.log("download error target " + error.target);
        //        console.log("upload error code" + error.code);
        //    }
        //);

        //localStorage[uniqueID + "img1"] = graph1.value;
        //localStorage[uniqueID + "img2"] = graph2.value;
        //alert(graph1.value);
       

        var fileTransfer = new FileTransfer();
        fileTransfer.download(
                image1str,
                "file://sdcard/"+"RiverLevels/"+uniqueID + "chart1" +".jpg",
            function (entry) {
                alert("download complete: " + entry.fullPath);
            },
            function (error) {
                alert("download error source " + error.source);
                alert("download error target " + error.target);
                alert("upload error code" + error.code);
            });
        
    }
    catch (ex) {
        alert(ex);
    }
}