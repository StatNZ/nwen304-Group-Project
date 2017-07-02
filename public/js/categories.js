/**
 * Created by monaruan on 27/06/17.
 */
function dispMenAll() {
    document.getElementById("men-formal").style.display = "none";
    document.getElementById("men-casual-top1").style.display = "none";
    document.getElementById("men-casual").style.display = "none";
    document.getElementById("men-shirt").style.display = "none";
    document.getElementsByClassName("men-sec").style.display = "block";
    document.getElementsByClassName("men-sec-shirt").style.display = "none";
    //document.getElementById("men-pop").style.display = "block";

}

function dispMenCas() {
    document.getElementById("men-casual").style.display = "block";
    document.getElementById("men-formal").style.display = "none";
    document.getElementById("men-casual-top1").style.display = "none";
    //document.getElementById("men-pop").style.display = "none";
    document.getElementsByClassName("men-sec-shirt").style.display = "block";
    document.getElementsByClassName("men-sec").style.display = "none";
}
function dispMenCas1() {
    document.getElementById("men-casual").style.display = "none";
    document.getElementById("men-formal").style.display = "none";
    document.getElementById("men-casual-top1").style.display = "block";
    //document.getElementById("men-pop").style.display = "none";
    document.getElementsByClassName("men-sec-shirt").style.display = "block";
    document.getElementsByClassName("men-sec").style.display = "none";
}

function dispMenForm() {
    document.getElementById("men-formal").style.display = "block";
    document.getElementById("men-casual").style.display = "none";
    document.getElementById("men-casual-top1").style.display = "none";
    //document.getElementById("men-pop").style.display = "none";
    document.getElementsByClassName("men-sec-shirt").style.display = "block";
    document.getElementsByClassName("men-sec").style.display = "none";
}

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

        }).then(displayCatItems);
    }

    $('#cat-men').text(newHrf.replace('http://localhost:3000/category/', ' ').toUpperCase());

    function displayCategoryItems (rows) {
        // var i;
        // for (i = 0; i < rows.length; i++){
        //     alert(rows[i].name);
        // }
    }
});