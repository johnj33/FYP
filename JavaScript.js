var GetCurrentLocation = function () {
    var suc = function (p) {

        var mapOptions = {
            zoom: 14,
            center: new google.maps.LatLng(p.coords.latitude, p.coords.longitude),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }


        //map.center = new google.maps.LatLng(p.coords.latitude, p.coords.latitude);

        map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

        //var marker = new google.maps.Marker({
        //    map: map,
        //    position: p.coords
        //});
        //alert(p.coords.latitude + " " + p.coords.longitude);

        //document.getElementById("X").innerHTML = p.coords.latitude;

    };
    var locFail = function () {
    };
    navigator.geolocation.getCurrentPosition(suc, locFail)
};
var map;
function initialize() {
    var mapOptions = {
        zoom: 8,
        center: new google.maps.LatLng(-34.397, 150.644),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
   map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
}
