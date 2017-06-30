/**
 * Created by Status O'Brien on 30/06/17.
 */

/**
 * Contains all the global vars needed by specific functions within
 * other js files
 */


/**
 * @type {string} URL to redirect to
 */
//var $siteURL = 'http://localhost:3000';
 var $siteURL = 'https://urbanapparel.herokuapp.com';


var $searchURL = $siteURL + '/search';

/** PASSPORT ROUTES */
var $passportFacebookURL = $siteURL + '/auth/facebook';
var $passportGoogleURL = $siteURL + '/auth/google';

/** USER ROUTES */
var $userProfileURL = $siteURL + '/profile';
var $userKartURL = $siteURL + '/user/kart';
var $userInfoURL = $siteURL + '/user/info';

/** CATEGORY ROUTES */
var $subCategoryURL = $siteURL + '/subCategory';
var $categoryWomenURL = $siteURL + '/category_women';
var $categoryMenURL = $siteURL + '/category_men';

/** LOGIN ROUTES */
var $logInURL = $siteURL + '/login';
var $logOutURL = $siteURL + '/logout';



/**
 * Holds our current user, being able to be accessed from anywhere
 */
var $User;
