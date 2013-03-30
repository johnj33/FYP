function Initialise() {
    try{

        var text1 = document.getElementById("text1");
        var text2 = document.getElementById("text2");
        var text3 = document.getElementById("text3");
        var text4 = document.getElementById("text4");
        var graph1 = document.getElementById("graph1");
        var graph2 = document.getElementById("graph2");
        
        var values = localStorage["Gauge"].split(",");
        var graphurl = "http://www.environment-agency.gov.uk/homeandleisure/floods/riverlevels/Controls/RiverLevels/ChartImage.jpg?Id=";

        image1str = graphurl + values[4] + "&ChartType=Graph";
        image2str = graphurl + values[4] + "&ChartType=Histogram";

        graph1.src = image1str;
        graph2.src = image2str;
        gauge = values[3];
        url =  'http://query.yahooapis.com/v1/public/yql?q='+encodeURIComponent('select * from html where url="'+values[1]+'"')+' and xpath="//*[@id=\'station-detail-right\']/div/div/h3\"&format=json&callback=cbFunc';
              
       
        //$.get(url,
                
        //    function (data) {
        //    alert('page content: ' + data);
        //    }
        //    );
        var xmlHttp = null;

        xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", url, false);
        xmlHttp.send(null);
        var currentLevel = xmlHttp.responseText.split("Current level: ")[1].split("\"")[0];
        

        text1.textContent = "Gauge: " + gauge;
        text2.textContent = "Town: " + values[0];
        text3.textContent = " \n River: " + values[2];
        text4.textContent = "Current Level:" + currentLevel;
    }
    catch (ex) {
        alert(ex);
    }
    
}
var image1str;
var image2str;
var gauge;

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
