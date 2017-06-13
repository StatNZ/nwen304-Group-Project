/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready( function (e) {
    
    // Globals
    var $img = $("#top-banner-images"), i = 0, speed = 300;
    var bannerImagesLength = 10;

   
    /* Load all our images for our top banner into this array */
    var images = [
        'ban1.jpg',
        'ban2.jpg',
        'ban3.jpg',
        'ban4.jpg',
        'ban5.jpg',
        'ban6.jpg',
        'ban7.jpg',
        'ban8.jpg',
        'ban9.jpg',
        'images/main_banner3.jpg'
    ];
    
    /*
    var count = 0;
    for (count; count < 9; count++){
        images.add('banner_images/ban' + (count + 1) + '.jpg');
    }
    */
   
   /* Because we set our heather to a certain height, we must
    * ensure that the rest of the layout conforms to 1 - header height
    */
   var windowWidth = $(window).width();
   var windowHeight = $(window).height();
   //$('#header').width(windowWidth);
   //$('#header').height(windowHeight * 0.4);
   
    
    /* Set out images to all be the same size, regardless */
    $img.width($(window).width());
    var windowHeight = $(window).height();
    $img.height(windowHeight * 0.4);
    
    /* controls the size of the drop down menu */
    $('.mega-dropdown-menu').height(windowHeight * 0.4);
    
    
    /* controls the size of the buttons fo the menu */
    var dropdownButtonsWidth = ($(window).width() * 0.7) / 7;
    $('.dropdown-toggle').width(dropdownButtonsWidth);

    /*
     * Controls the changing of images in our top-banner. Done at 
     * set interval, currently 10secs... Changes to 30secs
     */
    window.setInterval(function() {
        $img.fadeOut(speed, function() {
            //$img.attr("src", images[(++i % images.length)]);
            $img.attr('src', 'bannerImages/ban' + (++i % bannerImagesLength) +'.jpg');
            $img.fadeIn(speed);
        });
    }, 1000);
   
   /* Use this funciton to change the top banner pictures to 
    * suit the category you are currently looking at, We will copy 
    * this for the women and kids section aswell
    */
   $(".men-cat-items").hover(function () {
       //var manImageName = '';
       var image = $("#top-banner-images");
       //image.attr('src', manImageName);
       //image.fadeIn();
   });
   
   /* This doesn't work yet...
    * We want to control the opening and closing of our drop down menu
    * in our top-header. When you figure this out, please fix this for me
    */
   $(".mega-dropdown").hover(function(){
        // need to get this working somehows
        
        /* this option must have no time */
        $(this).children('ul').show(500);
    },
        function(){
            $(this).children('ul').hide();
	});
   
}); 


