function Initialise() {
    try{

        var text1 = document.getElementById("text1");
        var text2 = document.getElementById("text2");
        var text3 = document.getElementById("text3");
        var graph1 = document.getElementById("graph1");
        var graph2 = document.getElementById("graph2");
        
        var values = localStorage["Gauge"].split(",");
        var graphurl = "http://www.environment-agency.gov.uk/homeandleisure/floods/riverlevels/Controls/RiverLevels/ChartImage.jpg?Id=";

        graph1.src = graphurl + values[4] + "&ChartType=Graph";
        graph2.src = graphurl + values[4] + "&ChartType=Histogram";
        gauge = values[3];

        text1.textContent = "Gauge: " + gauge;
        text2.textContent = "Town: " + values[0];
        text3.textContent = " \n River: " + values[2];
       
    }
    catch (ex) {
        alert(ex);
    }
    
}
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
