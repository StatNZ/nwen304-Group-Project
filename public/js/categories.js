/**
 * Created by monaruan on 27/06/17.
 */


// call to get information
$(document).ready(function () {
    var newHrf = location.href.replace('_', '/');
    var gender = newHrf.replace('http://localhost:3000/category/', ' ').trim();


    window.onload = function () {

        $.ajax({
            type: 'GET',
            url: newHrf,

            error: function (error) {
                alert ('something gone wrong');
            }

        }).then(displayCategoryItems);
    };

    $('#cat-gender').text(gender.toUpperCase());

    function displayCategoryItems (rows) {
         /*var i;
         for (i = 0; i < rows.length; i++){
             //alert(rows[i].name);
             $('#item-name').text(rows[i].name);
             $('#item-price').text(rows[i].price);
             $('#category-img').image(rows[i].imagesource);


         }*/
         //alert (rows[0].name);

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
                '                       <img class="category-img" src="images/men-shirt1.jpg" alt="" width="300" height="200" />' +
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

    $('#catpage-display-items').on('click', '.item-name',  function(){

    });
});