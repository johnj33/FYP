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

        text1.textContent = "Gauge: " + values[3];
        text2.textContent = "Town: " + values[0];
        text3.textContent = " \n River: " + values[2];
       
    }
    catch (ex) {
        alert(ex);
    }
    
}
