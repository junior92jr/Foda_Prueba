var FRDLocation = function () {

};

FRDLocation.set_location = function (position) {

    var geocoder = new google.maps.Geocoder();
    var infowindow = new google.maps.InfoWindow();

    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    var coords = new google.maps.LatLng(latitude, longitude);

    var options = {
        zoom                    : 16,
        center                  : coords,
        mapTypeControl          : false,
        navigationControlOptions: {
            style: google.maps.NavigationControlStyle.SMALL
        },
        disableDefaultUI        : true,
        //zoomControl: true,
        mapTypeId               : google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("location-map"), options);

    var marker = new google.maps.Marker({
                position: coords,
                map: map,
                draggable:true                
            });

    google.maps.event.addListener(marker, "drag", function (event) {
        var latitude = this.position.lat();
        var longitude = this.position.lng();
        var actual = new google.maps.LatLng(latitude, longitude);
        coords = actual;
    });

    google.maps.event.addListener(marker, "dragend", function (event) {

        geocoder.geocode({'latLng': coords}, function(results, status) {

            if (status == google.maps.GeocoderStatus.OK) {
              if (results[1]) {
                

                infowindow.setContent(results[0].formatted_address);
                infowindow.open(map, marker);
                document.getElementById('inputAddress').value = results[0].formatted_address;
                document.getElementById('inputDistrict').value = results[1].formatted_address.split(",",1);
                document.getElementById('inputCity').value = results[4].formatted_address.split(",",1);
              
              } else {
                alert('No results found');
              }
            } else {
              alert('Geocoder failed due to: ' + status);
            }
        });
    });
};

jQuery(document).ready(function () {
    Utils.geo_location(FRDLocation.set_location);

});

