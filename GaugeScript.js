function Initialise() {
    try{
        Gauge = localStorage["Gauge"];
        var text1 = document.getElementById("text1");
        var text2 = document.getElementById("text2");
        var graph1 = document.getElementById("graph1");
        var graph2 = document.getElementById("graph2");
        var values = new Array();
        values = Gauge.split(",");
        var graphurl = "http://www.environment-agency.gov.uk/homeandleisure/floods/riverlevels/Controls/RiverLevels/ChartImage.jpg?Id=";

        graph1.src = graphurl + values[4] + "&ChartType=Graph";
        graph2.src = graphurl + values[4] + "&ChartType=Histogram";

        
        

        
        alert(values[4]);
        text1.textContent = "Gauge: " + values[3];
        text2.textContent = "Town: " + values[0] + " \n River: " + values[2];
    }
    catch (ex) {
        alert(ex);
    }
}