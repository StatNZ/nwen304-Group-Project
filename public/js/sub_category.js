/**
 * Created by monaruan on 2/07/17.
 */

$(document).ready(function () {

    var gender = $('#cat-gender-call').text();
    var subcat = $('#cat-subcat').text();
    var href = $('#cat-gender-call').attr('name');


    var uuid;
    var name;
    var desc;
    var price;
    var image;
    window.onload = function () {

        $.ajax({
            type: 'GET',
            url: $siteURL + href,

            error: function (error) {
                alert ('something gone wrong');
            }

        }).then(displaySubCategoryItems);

    };

    function displaySubCategoryItems (rows) {

        var i;

        for (i=0; i<rows.length; i++) {
            uuid = rows[i].itemid;
            name = rows[i].name;
            desc = rows[i].description;
            price = rows[i].price;
            image = rows[i].imagesource;


            var product_disp = '' +
                '       <div id="gender-cat" class="gender-cas">' +
                '           <div class="responsive">' +
                '               <div class="gallery">' +
                '                   <a href="#" >' +
                //will need to replace static image - place holder for now, can't find from db
                '                       <img class="category-img" src="/public/images/men-shirt1.jpg" alt="" width="300" height="200" />' +
                '                   </a>'+
                '                   <div class="desc">' +
                '                       <a class="item-name" style="color: black; font-size: 20px;"></a>' +
                '                   </div>' +
                '                   <div class="desc">' +
                '                        <a class="item-price" style="color: black"></a>' +
                '                   </div>' +
                '               </div>' +
                '           </div>'+
                '       </div>';

            var disp = $(product_disp);
            //disp.find('.kart-item-delete-btn').attr('name', uuid);
            disp.find('.item-name').text(name);
            disp.find('.category-img').attr('src', image);
            disp.find('.item-description').text(desc);
            disp.find('.item-price').text(price);

            $('#category-item-display').prepend(disp);
            disp.show('clip',250).effect('highlight',1000);



        }
        //should be taken to view the actual product webpage
        $('#category-item-display').on('click', '.gallery',  function(){
             alert ('redirecting');
             //window.redirect($siteURL);
             //window.redirect($siteURL + '/' + gender + '/' + $(this).find('.item-name').text());

             $("#category-item-display").empty();// use .empty() to clear out function???
            // //delete displayCategoryItems;

            displayItem();
        });

        function displayItem(rows) {

            //need check for what item it is
            //var i;
            //for(i=0; i<rows.length; i++) {
            // doesn't display correct one
            $('#item-name1').text(name);
            //$('#item-price').text(rows[i].price);
            $('#item-price1').text(price);
            $('#category-img').image(image);
            //}

            /* var productdisp = '' +
             ' <a href="#" >' +
             ' <img id="category-img" src="" alt="" width="300" height="200" >' +
             ' </a>' +
             ' <div class="desc">' +
             ' <a id="item-name">name</a>' +
             ' </div>' +
             ' <div class="desc">' +
             ' <a id="item-price">price</a>' +
             ' </div>';

             var disp = $(productdisp);
             disp.find('.item-name').text(name);
             disp.find('.item-price').text(price);
             disp.find('.category-img').attr('src', image);*/
        }

    }
});