/**
 * Created by Status O'Brien on 30/06/17.
 */

$(document).ready(function () {

    window.onload = function () {
        getUserKartItems(displayProfileKartItems);
        getUserInfo();
    };

    $('#profile-back-btn').on('click', function () {
        $('.profile-main-edit-view').hide();
        $('.profile-main-view').show('clip',250).effect('highlight',1000);
    });

    $('#profile-edit-btn').on('click', function () {
        // hide our current information
        $('.profile-main-view').hide();
        $('.profile-main-edit-view').show('clip',250).effect('highlight',1000);

        displayUserInfoEdit();
    });

    $('.profile-checkout-button').on('click', function () {
        if ($User.address == '') {
            alert ('You must enter an address');
            $('.profile-main-edit-view').show('clip',250).effect('highlight',1000);
        }
    });

    $('#kart-display-profile').on('click', '.kart-item-delete-btn', function () {
        var $this = $(this);
        // call gloabal vars function to run
        if (deleteKartItem($this)) {
            // remove the task from the view
            var deleteItem = $this.parent('td').parent('tr');
            deleteItem.effect('puff', function () {
                deleteItem.remove();
            });
        }

        // else error message
    });


});
