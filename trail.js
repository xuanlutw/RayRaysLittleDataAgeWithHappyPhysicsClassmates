var time_interval = 1000;
var access_key = "make102GREATagain";

var options = {
    enableHighAccuracy: true,
    timeout: 800,
    maximumAge: 0
};

function success(pos) {
    var crd = pos.coords;
    console.log('Latitude : ' + crd.latitude + ', Longitude: ' + crd.longitude);
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", './send?lat='+crd.latitude+'&lng='+crd.longitude+'&access_key='+access_key, false );
    xmlHttp.send( null );
};

function error(err) {
    console.log('gg');
};

function clock(){
    navigator.geolocation.getCurrentPosition(success, error, options);
	setTimeout("clock();", time_interval);
};
clock();
