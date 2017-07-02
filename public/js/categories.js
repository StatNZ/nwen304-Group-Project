/**
 * Created by monaruan on 27/06/17.
 */


// call to get information
$(document).ready(function () {
    var newHrf = location.href.replace('_', '/');


    window.onload = function () {

        $.ajax({
            type: 'GET',
            url: newHrf,

            error: function (error) {
                alert ('something gone wrong');
            }

        }).then(displayCategoryItems);
    }

    $('#cat-men').text(newHrf.replace('http://localhost:3000/category/', ' ').toUpperCase());

    function displayCategoryItems (rows) {
        // var i;
        // for (i = 0; i < rows.length; i++){
        //     alert(rows[i].name);
        // }
    }
});