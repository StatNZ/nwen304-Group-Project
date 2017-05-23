/**
 * Created by Status O'Brien on 23/05/17.
 *
 * This file contains all the information for our header. Includes
 * all the resize functionality, position and general information regarding
 * the header
 */

$(document).ready(function () {

    // Main Globals
    var $windowWidth = $(window).width();
    var $windowHeight = $(window).height();
    var $originalDropdownHeight = dropdownMenuInitialSize();


    /*
     * This is called when the window is resized. Controls the settings
     * of all our headers upon resize.
     */
    $(window).resize(function () {
        $windowWidth = $(window).width();
        $windowHeight = $(window).height();
        $originalDropdownHeight = dropdownMenuInitialSize();
    });


    /* Use this funciton to change the top banner pictures to
     * suit the category you are currently looking at, We will copy
     * this for the women and kids section aswell
     */
    $(".men-cat-items").hover(function () {
        var catItem = $(this).text().toLowerCase();
        var dir = 'dropdown_images/';
        var img = $('#dropdown_image');

        switch (catItem) {
            case 'footwear':
                dir += 'shoes';
                break;
        }
        //displayMultileDropdownImages(img, dir);
    });

    /* not really a good idea */
    function displayMultileDropdownImages (element, dir) {
        var i=1, speed = 300;
        element.height($originalDropdownHeight/1.5);

        window.setInterval(function() {
            element.fadeOut(speed, function() {
                element.attr('src', dir + (++i % 5) + '.jpg');
                element.fadeIn(speed);
            });
        }, 5000);
    }

    $(".women-cat-items").hover(function () {
        var catItem = $(this).text().toLowerCase();
        var dir = 'dropdown_images/';
        var img = $('#women_dropdown_img');
        alert (catItem);
        switch (catItem) {
            case 'shoes':
                dir += catItem + '1.jpg';
                break;
        }
        img.attr('src', dir);
        img.fadeIn(300);
        img.height($originalDropdownHeight/1.5);

    });


    /*
     * Controls the opening and closing of our drop-down menu,
     */
    $(".mega-dropdown").hover(function(){
        // need to get this working somehows
        $(this).children('ul').show();

        // now that we are inside the dropdown menu, we can
        // set the spacing of the items inside to be exact
        //dropdownMenuInsideSpacing ();

    }, function(){
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
        $('.mega-dropdown-menu').width($windowWidth);
        return dropDownHeight;
    }

    /*
     * Controls the positioning of the columns inside
     * the drop-down menu. Places our items in a nice
     * manner
     */
    function dropdownMenuInsideSpacing () {
        var classesLength = $('.col-sm-3').length;
        var colsWidth = $('.col-sm-3').width();
        var colsHeight = $('.mega-dropdown-menu').height();
        var width = ($windowWidth - (colsWidth * classesLength)) / 2;
        var height = (colsHeight - $originalDropdownHeight) / 2;

        $('.mega-dropdown-menu').children('li').children('ul').css({
            'padding-left': width + 'px',
            'padding-top': height + 'px',
            'padding-bottom': height + 'px'
        });
    }
})