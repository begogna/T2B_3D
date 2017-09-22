$(function () {

    //déclaration des variables
    var light = $('.hov');
    var img = $('img');
    var content = $('.content');

    // cacher le hover
    light.hide();
   
    //montrer light au survol de img
    img.mouseenter(function () {
        $(this).next().fadeIn(3434);
        console.log($(this).next())
        content.addClass('content_hover');
    });

    light.mouseleave(function(){
        $(this).fadeout('slow');
        content.removeClass('content_hover');
        // light.hide();
        
    });
});