/**
 * Created by Status O'Brien on 30/06/17.
 */

/**
 * Contains all the global vars needed by specific functions within
 * other js files
 */

/**
 * Holds our current user if they are logged in,
 * being able to be accessed from anywhere
 */
var $User;


window.onload = function () {

    /** Will automatically retrieve the kart and all it's items,
     * on every load, could be costly */
    getUserKartItems(displayDrowdownKartItems);
};

// =========================================================================
// AJAX ROUTES/CALLS =======================================================
// =========================================================================

/**
 * @type {string} URL to redirect to
 */
var $siteURL = 'http://localhost:3000';
// var $siteURL = 'https://urbanapparel.herokuapp.com';

var $searchURL = $siteURL + '/search';

/** PASSPORT ROUTES */
var $passportFacebookURL = $siteURL + '/auth/facebook';
var $passportGoogleURL = $siteURL + '/auth/google';

/** USER ROUTES */
var $userProfileURL = $siteURL + '/profile';
var $userInfoURL = $siteURL + '/user/info';

/** KART ROUTES */
var $kartURL = $siteURL + '/kart';
var $deleteKartItemURL = $siteURL + '/kart/removeItem';
var $checkoutKartURL = $siteURL + '/kart/checkout';

/** CATEGORY ROUTES */
var $subCategoryURL = $siteURL + '/subCategory';
var $categoryWomenURL = $siteURL + '/category_women';
var $categoryMenURL = $siteURL + '/category_men';

/** LOGIN ROUTES */
var $logInURL = $siteURL + '/login';
var $logOutURL = $siteURL + '/logout';

/**
 * Ajax call to the server to retrieve the kart items contained by the
 * current user
 * @param func
 */
function getUserKartItems (func) {
    $.ajax ({
        url: $kartURL,
        type: 'GET',

        error: function (err) {
            // User must sign in to access kart
            return;
        }
    }).then(func);
}

/** Retrieves the current logged in user information */
function getUserInfo () {
    $.ajax ({
        url: $userInfoURL,
        type: 'GET',

        error: function (err) {
            // User must sign in to access kart
            return;
        }
    }).then(displayUserInfo);
}

/** Processes our checked out items */
function processCheckout () {
    $.ajax ({
        url: $checkoutKartURL,
        type: 'GET'

    });
}


// =========================================================================
// KART FUNCTIONALITY ======================================================
// =========================================================================

/**
 * Shopping cart information and updates
 */
function updateKartCount (size) {
    $('#kartNumber').text(' ' + size);
}

/**
 * Shows all the kart items in the kart which is located in the header
 * @param rows
 */
function displayDrowdownKartItems (rows) {
    // access items by name, description, etc
    if (rows.length <= 0)
        return;

    // update our number of items in kart
    // $('#kartNumber').text(' ' + rows.length);
    updateKartCount(rows.length);

    // needs to be more accurately defined
    if ($('#kart-items').children().length == rows.length)
        return;

    var totalPrice = 0;

    var i;
    for (i=0; i<rows.length; i++) {

        // combine total price
        totalPrice += rows[i].price;

        var kartHTML = '' +
            '<li>' +
            '   <span class="item">' +
            '      <span class="item-left">' +
            '          <img id="kart-item-img" src="' + rows[i].imagesource + '" alt="" />' +
            '          <span class="item-info">' +
            '              <span class="item-name"></span>' +
            '              <span class="item-price"></span>' +
            '          </span>' +
            '      </span>' +
            '      <span class="item-right">' +
            '          <button class="kart-item-delete-btn btn btn-xs btn-danger pull-right"><i class="fa fa-trash-o"></i> </button>' +
            '      </span>' +
            '   </span>' +
            '</li>';

        var newItem = $(kartHTML);
        newItem.find('.kart-item-delete-btn').attr('name', rows[i].itemid);
        newItem.find('.item-name').text(rows[i].name);
        newItem.find('.item-price').text(rows[i].price);

        $('#kart-display-header').prepend(newItem);
    }

    // append 'view cart' to the back
    var endKartHTML = '' +
        '<li class="divider"></li>' +
        '<li><a class="text-center" href="/login">View Cart</a></li>';
    $('#kart-view-cart-header').append(endKartHTML);
}

/**
 * Displays all our items in our cart in our profile part,
 * Lets the user buy etc
 * @param rows
 */
function displayProfileKartItems (rows) {
    // update kart number count
    updateKartCount(rows.length);

    var i;
    var totalPrice = 0;

    for (i=0; i<rows.length; i++) {
        var uuid = rows[i].itemid;
        var name = rows[i].name;
        var desc = rows[i].description;
        var price = rows[i].price;
        var image = rows[i].imagesource;

        // need a quantity, set to 1 for now
        var subTotal = price * 1 // price * quantity
        totalPrice += subTotal;

        var kartHTML = '' +
            '<tr>' +
            '   <td data-th="Product">' +
            '       <div class="row kart-item-info-row">' +
            '           <div class="col-sm-2 hidden-xs"><img src="" alt="..." class="img-responsive"/></div>' +
            '           <div class="col-sm-10">' +
            '               <h4 class="nomargin"></h4>' +
            '               <p class="item-description"></p>' +
            '           </div>' +
            '       </div>' +
            '   </td>' +
            '   <td class="item-price" data-th="Price"></td>' +
            '   <td data-th="Quantity">' +
            '       <input type="number" class="form-control text-center kart-item-quantity" value="1">' +
            '   </td>' +
            '   <td data-th="Subtotal" class="text-center item-subtotal">'+ subTotal +'</td>' +
            '   <td class="actions" data-th="">' +
            '       <button class="btn btn-danger btn-sm kart-item-delete-btn"><i class="fa fa-trash-o"></i></button>' +
            '   </td>' +
            '</tr>';

        var newItem = $(kartHTML);
        newItem.find('.kart-item-delete-btn').attr('name', uuid);
        newItem.find('.img-responsive').attr('src', image);
        newItem.find('.item-description').text(desc);
        newItem.find('.nomargin').text(name);
        newItem.find('.item-price').text(price);
        newItem.find('.item-subtotal').text(subTotal);

        $('#kart-display-profile').prepend(newItem);
    }

    //update total price, to be precise
    var temp = totalPrice + '';
    if (temp.length > 4)
        totalPrice = totalPrice.toPrecision(5);
    else
        totalPrice = totalPrice.toPrecision(4);
    $('.kart-total-price').text('$ ' + totalPrice);
}

function deleteKartItem (element) {
    var uuid = $(element).attr('name');
    alert ('delete kart items: ' + uuid);
    // ajax call to delete element
    $.ajax ({
        url: $deleteKartItemURL + '/' + $User.email + '/' + uuid,
        type: 'DELETE',

        error: function (err) {
            // User must sign in to access kart
            alert ('error');
            return false;
        }
    });
    return true;
}

// =========================================================================
// USER/PROFILE FUNCTIONALITY ==============================================
// =========================================================================

function displayUserInfo (user) {
    // need to display all the relevant user info
    // to the current user
    $User = user;
    $('.profile-user-name').text(user.user_name);
    $('.profile-user-email').text(user.email);
    $('.profile-user-address').text(user.address);
}

function displayUserInfoEdit () {
    // we now fill in all the information that we have on the current user
    // into the form, from here they can change and edit as they see fit
    $('#profile-first-name').val($User.first_name);
    $('#profile-last-name').val($User.last_name);
    $('#profile-address').val($User.address);
    $('#profile-email').val($User.email);
}
