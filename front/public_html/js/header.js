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
        //var manImageName = '';
        var image = $("#top-banner-images");
        //image.attr('src', manImageName);
        //image.fadeIn();
    });

    /*
     * Controls the opening and closing of our drop-down menu,
     */
    $(".mega-dropdown").hover(function(){
        // need to get this working somehows
        $(this).children('ul').show();

        // now that we are inside the dropdown menu, we can
        // set the spacing of the items inside to be exact
        dropdownMenuInsideSpacing ();

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