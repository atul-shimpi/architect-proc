$(function () {

    function initMap() {
        // get lat/long from address
        var shopSubdomain = null;

        if ( window.location !== window.parent.location ) {
            console.log('Design Mode, Url ' + window.parent.location.href);
            shopSubdomain = window.parent.location.href.split('/')[5];
        } else {
            console.log('Run Mode, url ' + window.location.href);
            shopSubdomain = window.location.host.split('.')[0];
        }


        var host = 'http://ccbizon.com';

        if ( shopSubdomain.indexOf('localhost') !== -1 ) {
            host = 'http://localhost:3000';
            shopSubdomain = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1];
        }

        console.log('Url' + host + '/business_user/shops.json?subdomain=' + shopSubdomain);

        $.get(host + '/business_user/shops.json?subdomain=' + shopSubdomain, showMap);

        function showMap(data) {
            console.log('shop ' + data.address);

            geocoder = new google.maps.Geocoder();
            data.address = data.address || 'Pune';

            //In this case it gets the address from an element on the page, but obviously you  could just pass it to the method instead
            var address = 'SAARRTHI SOUVENIR, VIBGYOR SCHOOL, PUNE';//document.getElementById( 'address' ).value;

            geocoder.geocode({'address': data.address}, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    console.log('got latlong' + JSON.stringify(data));

                    //In this case it creates a marker, but you can get the lat and lng from the location.LatLng
                    //map.setCenter( results[0].geometry.location );

                    var location = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());

                    var mapCanvas = document.getElementById('map');
                    var mapOptions = {
                        center: location,
                        zoom: 16,
                        panControl: false,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    }
                    var map = new google.maps.Map(mapCanvas, mapOptions);

                    var marker = new google.maps.Marker({
                        map: map,
                        position: results[0].geometry.location,
                        label: data.name,
                        animation: google.maps.Animation.BOUNCE
                    });
                } else {
                    alert('Geocode was not successful for the following reason: ' + status + " " + results);
                }
            });

        }


    }

    $(document).ready(function () {
        initMap();
    });
    //google.maps.event.addDomListener(document, 'ready', initMap);
});