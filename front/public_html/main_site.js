/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready( function (e) {
    
    // Globals
    var $img = $("#top-banner-images"), i = 0, speed = 300;

   
    /* Load all our images for our top banner into this array */
    var images = [
        "images/1391275534_nithiin.gif",
        "images/chictravelphotos-22june154-1326.jpg",
        "images/stock-photo-200657659.jpg"
    ];
   
   /* Because we set our heather to a certain height, we must
    * ensure that the rest of the layout conforms to 1 - header height
    */
   var windowWidth = $(window).width();
   var windowHeight = $(window).height();
   $('#header').width(windowWidth);
   $('#header').height(windowHeight * 0.4);
   
    
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
            $img.attr("src", images[(++i % images.length)]);
            $img.fadeIn(speed);
        });
    }, 10000);
   
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
        $(this).children('ul').show(500);
    },
        function(){
            $(this).children('ul').hide("fast");
	});
   
}); 


