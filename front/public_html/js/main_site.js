/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready( function (e) {
    
    
    // Main Globals
    var $img = $("#top-banner-images"), i = 0, speed = 300;
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();
    
    // Changing Globals
    var bannerImagesLength = 10;
    
    /* Initial Setup */
    var $originalDropdownHeight = dropdownMenuInitialSize();
   
    /* Load all our images for our top banner into this array */
    var images = [
	'images/1391275534_nithiin.gif',
	'images/chictravelphotos-22june154-1326.jpg',
	'images/stock-photo-200657659.jpg'
    ];

    /*
    var count = 0;
    for (count; count < 9; count++){
        images[count] = ('bannerImages/ban' + (count + 1) + '.jpg');
    }
    */
   
    /* Set out images to all be the same size, regardless */
    $img.width($(window).width());
    var windowHeight = $(window).height();
    $img.height(windowHeight * 0.4);
    
    /*
     * Controls the changing of images in our top-banner. Done at 
     * set interval, currently 10secs... Changes to 30secs
     */
    window.setInterval(function() {
        $img.fadeOut(speed, function() {
            $img.attr("src", images[(++i % images.length)]);
            //$img.attr('src', 'bannerImages/ban' + (++i % bannerImagesLength) +'.jpg');
            $img.fadeIn(speed);
        });
    }, 3000);
   
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
        $(this).children('ul').show();
        
        // now that we are inside the dropdown menu, we can
        // set the spacing of the items inside to be exact
        dropdownMenuInsideSpacing ();
          
    },
        function(){
            $(this).children('ul').hide();
	});

    
    /* 
     * This function sets our drop down menu to be
     * a specific size, we will also use this function
     * when the window changes its size
     */
    function dropdownMenuInitialSize () {
        
        var dropDownHeight = $('.row').height();
        $('.mega-dropdown-menu').height(dropDownHeight * 1.3);
        $('.mega-dropdown-menu').width(windowWidth); 
        return dropDownHeight;
    }
    
    function dropdownMenuInsideSpacing () {
        var classesLength = $('.col-sm-3').length;
        var colsWidth = $('.col-sm-3').width();
        var colsHeight = $('.mega-dropdown-menu').height();
        var width = (windowWidth - (colsWidth * classesLength))/2;
        var height = (colsHeight - $originalDropdownHeight)/2;
        $('.mega-dropdown-menu').children('li').children('ul').css({
            'padding-left' : width + 'px',
            'padding-top' : height + 'px',
            'padding-bottom' : height + 'px'
        });

    }
}); 


