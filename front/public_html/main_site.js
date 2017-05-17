/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready( function (e) {
   
   $('#home-button').on('click', function () {
       alert ('you clicked the home button');
       window.location.replace('http://localhost:8383/OnlineShopping_groupProject/');
   });
        
        $('.navigation a').on( 'click', function(event) {
  var target  = $( this );
  var element = target.attr('href');

  $('.navigation a').removeClass('active')
  target.addClass('active');

  $("body, html").animate({ 
    scrollTop: $( element ).offset().top - 90  
  }, 800);
});

});


