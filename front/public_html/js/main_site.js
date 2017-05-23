/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready( function (e) {

    // Global
    var $img = $("#top-banner-images"), i = 0, speed = 300;

    // Changing Globals
    imageBannerInitialSize();

    /* Load all our images for our top banner into this array */
    var images = [
        'images/1391275534_nithiin.gif',
        'images/chictravelphotos-22june154-1326.jpg',
        'images/stock-photo-200657659.jpg'
    ];

    /*
     * Controls the changing of images in our top-banner. Done at
     * set interval, currently 10secs... Changes to 30secs
     */
    window.setInterval(function() {
        $img.fadeOut(speed, function() {
            $img.attr("src", images[(++i % images.length)]);
            //$img.attr('src', 'banner_images/ban' + (++i % bannerImagesLength) +'.jpg');
            $img.fadeIn(speed);
        });
    }, 30000);

    /* Set out images to all be the same size, regardless */
    function imageBannerInitialSize() {
        $img.width($(window).width());
        $img.height($(window).height() * 0.4);
    }

    /*
    var count = 0;
    for (count; count < 9; count++){
        images[count] = ('banner_images/ban' + (count + 1) + '.jpg');
    }
    */


});


