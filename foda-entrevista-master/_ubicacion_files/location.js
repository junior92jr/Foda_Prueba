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
        mapTypeId               : google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("location-map"), options);

    /* Se coloca un marcador sobre el mapa con las coordenadas de la posicion inicial
     * el mismo que se puede arrastrar a diferentes locaciones del mapa.
     */

    var marker = new google.maps.Marker({
        position                : coords,
        map                     : map,
        draggable               : true                
    });

    /* Se crea un Listener para que la latitud y longitud inicial se 
     * Actualice cada vez que se mueve el marcador.
     */

    google.maps.event.addListener(marker, "drag", function (event) {
        var lat_actual = this.position.lat();
        var lng_actual = this.position.lng();
        var actual = new google.maps.LatLng(lat_actual, lng_actual);
        coords = actual;
    });

    /* Un segundo Listener es usado para obtener la informacion sobre las direcciones 
     * de latitud y longitud exacta, para eso se usa el servicio de Reverse Geocoder del API
     * de Google maps. Cada vez que se arrastre el curso se iran actualizando los campos.
     */

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

    /* Este tercer listener hace que cada vez que cambia el marcador, despues de 
     * 3 segundos posiciona el marcador en el centro de la pantalla.
     */

    google.maps.event.addListener(map, 'center_changed', function() {
	    window.setTimeout(function() {
	      map.panTo(marker.getPosition());
	    }, 3000);
	});
};


jQuery(document).ready(function () {
    Utils.geo_location(FRDLocation.set_location);

});

