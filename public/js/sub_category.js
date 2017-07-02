/**
 * Created by monaruan on 2/07/17.
 */

/*
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
}*/

$(document).ready(function () {
    //var newHrf = location.href.replace('_', '/');
    alert(location);

    window.onload = function () {

        $.ajax({

            type: 'GET',
            url: location,

            error: function (error) {
                alert ('something gone wrong');
            }

        }).then(displaySubCategoryItems);
    };
    // need to get data for breadcrumb bar
    //$('#cat-gender').text(newHrf.replace('http://localhost:3000/subCategory#', 'MEN').toUpperCase());
    //$('#gender-shirt').text(newHrf.replace('http://localhost:3000/subCategory#', 'SHIRT').toUpperCase());



    function displaySubCategoryItems (rows) {
         /*var i;
         for (i = 0; i < rows.length; i++){
         //alert(rows[i].name);
         $('#item-name').text(rows[i].name);
         $('#item-price').text(rows[i].price);
         $('#category-img').image(rows[i].imagesource);


         }*/
        alert (rows[i].name);

        var i;

        for (i=0; i<rows.length; i++) {
            var uuid = rows[i].itemid;
            var name = rows[i].name;
            var desc = rows[i].description;
            var price = rows[i].price;
            var image = rows[i].imagesource;


            var product_disp = '' +
                //'<tr>' +
                //'    <tr data-th="item">' +
                '       <div id="gender-cat" class="gender-cas">' +
                '           <div class="responsive">' +
                '               <div class="gallery">' +
                '                   <a href="#" >' +
                //will need to replace static image - place holder for now, can't find from db
                '                       <img class="category-img" src="/public/images/men-shirt1.jpg" alt="" width="300" height="200" />' +
                '                   </a>'+
                '                   <div class="desc">' +
                '                       <a class="item-name" style="color: black"></a>' +
                '                   </div>' +
                '                   <div class="desc">' +
                '                        <a class="item-price" style="color: black"></a>' +
                '                   </div>' +
                '               </div>' +
                '           </div>'+
                //'       <div class="clearfix"></div>' +
                '       </div>';//+
            //'   </tr>'+
            //'</tr>';

            var disp = $(product_disp);
            //disp.find('.kart-item-delete-btn').attr('name', uuid);
            disp.find('.item-name').text(name);
            //disp.find('.category-img').attr('src', image);
            //disp.find('.item-description').text(desc);
            //disp.find('.nomargin').text(name);
            disp.find('.item-price').text(price);

            $('#catpage-display-items').prepend(disp);
            disp.show('clip',250).effect('highlight',1000);


        }


    }
});