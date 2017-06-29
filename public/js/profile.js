/**
 * Created by Status O'Brien on 30/06/17.
 */

$(document).ready(function () {


    window.onload = function () {
        getKartItems();
    };

    function getKartItems () {
        $.ajax ({
            url: 'http://localhost:3000/kart_items',
            type: 'GET',

            error: function (xhr) {
                // User must sign in to access kart
                alert ('profile error occured');
                return;
            }
        }).then(displayProfileKartItems);
    }

    /**
     * Displays all our items in our cart in our profile part,
     * Lets the user buy etc
     * @param rows
     */
    function displayProfileKartItems (rows) {
        var i;
        var totalPrice = 0;

        for (i=0; i<rows.length; i++) {
            var name = rows[i].name;
            var desc = rows[i].description;
            var price = rows[i].price;
            var image = rows[i].imagesource;
            var subTotal = price * 1 // price * quantity
            totalPrice += subTotal;


            // need a quantity, set to 1 for now

            var kartHTML = '' +
                '<tr>' +
                '   <td data-th="Product">' +
                '       <div class="row">' +
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
                '       <button class="btn btn-info btn-sm"><i class="fa fa-refresh"></i></button>' +
                '       <button class="btn btn-danger btn-sm"><i class="fa fa-trash-o"></i></button>' +
                '   </td>' +
                '</tr>';

            var newItem = $(kartHTML);
            newItem.find('.img-responsive').attr('src', image);
            newItem.find('.item-description').text(desc);
            newItem.find('.nomargin').text(name);
            newItem.find('.item-price').text(price);
            newItem.find('.item-subtotal').text(subTotal);

            newItem.hide();
            $('#profile-kart-display').prepend(newItem);
            newItem.show('clip',250).effect('highlight',1000);
        }

        //update total price
        $('.kart-total-price').text(totalPrice);
    }

});
