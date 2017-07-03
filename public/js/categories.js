/**
 * Created by monaruan on 27/06/17.
 */


// call to get information
$(document).ready(function () {

    var uuid;
    var name;
    var desc;
    var price;
    var image;

    var gender = $('#cat-gender-call').text().trim();
    var callback = $('#cat-gender-call').attr('name');

    window.onload = function () {

        // this callback was sent from the server and stored in this
        // attribute


        $.ajax({

            url: $siteURL + callback,
            type: 'GET',

            error: function (error) {
                alert ('something gone wrong');
            }

        }).then(displayCategoryItems);
    };

    function displayCategoryItems (rows) {
         /*var i;
         for (i = 0; i < rows.length; i++){
             //alert(rows[i].name);
             $('#item-name').text(rows[i].name);
             $('#item-price').text(rows[i].price);
             $('#category-img').image(rows[i].imagesource);


         }*/
         //alert (rows[0].name);
        alert(rows);
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
                '       </div>';

            var disp = $(product_disp);
            //disp.find('.kart-item-delete-btn').attr('name', uuid);
            disp.find('.item-name').text(name);
            disp.find('.item-name').attr('href', '/' + gender + '/' + name.trim());


            $('#catpage-display-items').prepend(disp);
            disp.show('clip',250).effect('highlight',1000);



        }
    }
    //should be taken to view the actual product webpage
    $('#catpage-display-items').on('click', '.gallery',  function(){
        // alert ('redirecting');
        // window.redirect($siteURL + '/' + gender + '/' + $(this).find('.item-name').text());

        // $("#catpage-display-items").empty();// use .empty() to clear out function???
        // //delete displayCategoryItems;
        // displayItem();
    });

    function displayItem(rows) {
        //alert(location.href);
        //need check for what item it is
        //var i;
        //for(i=0; i<rows.length; i++) {
        // doesn't display correct one
            $('#item-name').text(name);
            //$('#item-price').text(rows[i].price);
            $('#item-price').text(price);
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
    // $('#catpage-display-items').on('click', '.category-img',  function(){
    //     $("#catpage-display-items").empty();
    // });
});