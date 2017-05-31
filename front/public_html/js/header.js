/*
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

    var dropdownMenuImageInterval = 0, i = 1, speed = 300, interval_time = 2000;

    /**
     * This is called when the window is resized. Controls the settings
     * of all our headers upon resize.
     */
    $(window).resize(function () {
        $windowWidth = $(window).width();
        $windowHeight = $(window).height();
        $originalDropdownHeight = dropdownMenuInitialSize();
    });

    /**
     * Use this funciton to change and display the image within the
     * dropdown menu to suit the category you are currently looking at,
     * We will copy this for the women and kids sections, which are
     * the two functions posted below.
     */
     $(".men-cat-items").hover(function () {
        clearDropdownImage();

        var catItem = $(this).text().toLowerCase();
        var dir = 'dropdown_images/';
        var img = $('#dropdown_image');

        switch (catItem) {
            case 'footwear':
                dir += 'shoes';
                break;
            case 'casual shirts':
                dir += 'cs';
                break;
        }

        displayDropdownImages(img, dir, $(this));
    });

    /**
     * Same as .men-cat-items function, should be above this function
     */
    $(".women-cat-items").hover(function () {
        var catItem = $(this).text().toLowerCase();
        var dir = 'dropdown_images/';
        var img = $('#women_dropdown_img');
        switch (catItem) {
            case 'shoes':
                dir += catItem + '1.jpg';
                break;
        }
        img.attr('src', dir);
        img.fadeIn(300);
        img.height($originalDropdownHeight/1.5);

    });

    /**
     * Controls the opening and closing of our drop-down menu,
     */
    $(".mega-dropdown").hover(function(){
        // remove the image in the dropdown
        clearDropdownImage();


        // show the menu
        $(this).children('ul').show();

        // now that we are inside the dropdown menu, we can
        // set the spacing of the items inside to be exact

    }, function(){
        $(this).children('ul').hide();
    });

    /************************************************
     ************* LOG IN/OUT FUNCTIONS *************
     ************************************************/

    $('#login-modal').dialog({modal:true, autoOpen:false,
    buttons: {
        "Log In" : function () {

        },

        // second button
        "Cancel" : function () { $(this).dialog('close'); }
    }
    });

    $('.login-register').on('click', function () {
        alert ('clicking yall ass');
        $('#login-modal').dialog('open');
    });

    /************************************************
     ************* SEARCH BAR FUNCTIONS *************
     ************************************************/

    /**
     * Query the search when the user presses the enter button.
     * This is an alternative to onClick
     */
    $('.form-control').keypress(function(e){
        if (e.which == 13 && validateSearchInput()){
            // process the information
            var query = $(this).val().toLowerCase();
            // call the appropriate function
            return false;
        }
    });

    /**
     * Query the search when the user clicks the icon.
     * This is an alternative to 'enter' keypress
     */
    $('.glyphicon').on('click', function () {
        // instantly return if the search bar is empty
        validateSearchInput();

        // user has clicked the search icon,
        var query = $(this).val().toLowerCase();

        // call the appropriate function
    })


    /************************************************
     *********** SPECIAL FUNCTION CALLS *************
     ***********   AND HELPER METHODS   *************
     ************************************************/

    /**
     * This function sets our drop down menu to be
     * a specific size, we will also use this function
     * when the window changes its size
     */
    function dropdownMenuInitialSize () {

        var dropDownHeight = $('.row').height();
        var newHeight = $('#header').height() - $('.navbar').height();

        $('.mega-dropdown-menu').height(newHeight);
        $('.mega-dropdown-menu').width($windowWidth);
        return dropDownHeight;
    }

    /**
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
            'padding-right': width + 'px',
            'padding-top': height + 'px',
            'padding-bottom': height + 'px'
        });
    }

    /**
     * Removes the dropdown image that is displayed in the dropdown
     * menu.
     */
    function clearDropdownImage () {
        clearInterval(dropdownMenuImageInterval);
        $('#dropdown_image').attr('src', '');
        $('#dropdown_image').attr('alt', '');
    }

    /**
     * Helper Method:
     * Used for setting a picture to change at a given
     * time interval
     */
    function displayDropdownImages (img, dir, $this) {
        // we give it an image first
        img.attr('src', dir + '1.jpg');
        img.attr('alt', $this.text() + ' goes here');

        // now we set its interval for the image to change
        dropdownMenuImageInterval = setInterval(function () {
            img.fadeOut(speed, function () {
                if (i == 7) {
                    i = 0;
                }
                img.attr('src', dir + (++i) + '.jpg');
                img.attr('alt', $(this).text() + ' goes here');
                img.fadeIn();
            });
        }, interval_time);
    }

    /**
     * Validates the search input given by the user
     */
    function validateSearchInput () {
        var query = $('.form-control').val().toLowerCase();
        if (query == '') {
            alert ('empty string') // error check for now (testing)
            return false;
        }
        // will also need to check against XSS
        return true;
    }
})

