/**
 * Created by monaruan on 2/07/17.
 */

$(document).ready(function () {

    var gender = $('#cat-gender-call').text();
    var subcat = $('#cat-subcat').text();
    var href = $('#cat-gender-call').attr('name');

    var itemObject;

    window.onload = function () {

        $('.gender-cas').hide();

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
            var uuid = rows[i].itemid;
            var name = rows[i].name;
            var desc = rows[i].description;
            var price = rows[i].price;
            var image = rows[i].imagesource;


            var product_disp = '' +
                '       <div id="gender-cat" class="gender-cas">' +
                '           <div class="responsive">' +
                '               <div class="gallery">' +
                '                   <a href="#" >' +
                //will need to replace static image - place holder for now, can't find from db
                '                       <img class="category-img" src="images/men-shirt1.jpg" alt="" style="margin-top: -10px" width="300" height="200" />' +
                '                   </a>'+
                '                   <div class="desc">' +
                '                       <a class="item-name" style="color: black"></a>' +
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
            disp.find('.item-name').attr('name', uuid);
            //disp.find('.category-img').attr('src', image);
            disp.find('.item-description').text(desc);
            disp.find('.item-price').text('$'+price);

            $('#category-item-display').prepend(disp);
            disp.show('clip',250).effect('highlight',1000);



        }
        //should be taken to view the actual product webpage
        $('#category-item-display').on('click', '.gallery',  function(){

            // get all the information regarding this image
            var uuid = $(this).find('.item-name').attr('name');
            getItem(uuid, displayItem);
        });

        function displayItem(rows) {

            itemObject = rows[0];

            $('#category-item-display').hide();
            $('.gender-cas').show('clip', 250);

            // doesn't display correct one
            $('#item-name1').text(rows[0].name);
            $('#item-price1').text("$"+rows[0].price);
            //$('#category-img').attr('src', rows[0].imagesource);

        }

    }



    $('#add-item').on('click', function () {
        // get the current item
        addItemToKart(itemObject);
    });
});