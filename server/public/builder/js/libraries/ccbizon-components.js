

    var shopSubdomain = null;
    var host = 'http://ccbizon.com';

    if ( window.location !== window.parent.location ) {
        console.log('Design Mode, Url ' + window.parent.location.href);
        shopSubdomain = window.parent.location.href.split('/')[5];
    } else {
        console.log('Run Mode, url ' + window.location.href);


        const path = window.location.pathname.split('/')[1];

        // user in preview mode
        if (path === 'sites') {
            shopSubdomain = window.location.pathname.split('/')[2];
            console.log('User in Previw mode');
        } else {
            // user is in published mode
            shopSubdomain = window.location.host.split('.')[0];
            console.log('User in publish mode');
        }
    }

    function initMap() {
        console.log('shopSubdomain : ' + shopSubdomain);


        //seeing preview on dev box
        if ( window.location.host.indexOf('localhost') !== -1 ) {
            console.log('Running on localhost');
            host = 'http://localhost:3000';
            shopSubdomain = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1];
        }

        //seeing preview on production box
        if ( window.location.host.indexOf('ccbizon.com') !== -1 ) {
            console.log('Running on production');
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
                        zoom: 12,
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

    function loadGoogleMap(){
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = "https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyBFonMgy8pTD4S-xy16H7bJ7_TkqU8CUiI&sensor=false&callback=initialize";
        document.body.appendChild(script);
    }

    function setImgUrls(subDomain) {
        var this_ = this;
        this_.subDomain = subDomain;
        console.log('setImgulr subdomain : ' + subDomain);
        console.log('calling setimgurl ' + window.location.pathname);
        // user is in design mode
        if (window.location !== window.parent.location) {
          console.log('inside set Img ulr : user is designing');
          return;
        }

        $('img').each(function () {
            var imgTag= $(this);
            const imgPaths = $(this).attr('src').split('/');

            //console.log('image is in s3');
            var imgName = imgPaths[imgPaths.length - 1];
            //console.log('Image name : ' + imgName);

            if(imgName.length >= 30) {
                const s3Url = `https://s3.amazonaws.com/ccbizon-backend/${this_.subDomain}/assets/images/${imgName}`;

                imgTag.attr('src', s3Url);
            } else {
                //console.log('image is on localhost');
            }

        });

        //$('img').attr('src', `https://s3.amazonaws.com/${subDomain}/assets/images/tile.png`);
    }

    $(document).ready(function () {
        console.log('Shop subdomain : ' + shopSubdomain);
        setImgUrls(shopSubdomain);
        loadGoogleMap();
        initMap();

        $('#send-email').click(function () {
            if($('#sender-email').val().length == 0) {
                alert('Please specify your email address');
                return;
            }
            var email_info = {};

            email_info.fullname = $('#fullname').val();
            email_info.email = $('#sender-email').val();
            email_info.url = window.location.href;
            email_info.subject = $('#email-subject').val();
            email_info.message = $('#email-body').val();

            console.log('email_info : ' + JSON.stringify(email_info));

            console.log('host ' + host);


            $('#send-email').text('Sending...');
            $.post(host + '/business_user/shop/sales/mail', email_info, function(data) {
                $('#send-email').text('Send');
            })
                .fail(function (data) {
                    $('#send-email').text('Send');
                    alert('Message could not be send' + JSON.stringify(data));
                });
        });
    });
