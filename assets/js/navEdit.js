$(document).ready(function() {
    $('#add-entity-nav').click(function() {
        console.log('add entity');
        $('#choice-action-nav .enable').fadeOut();
        setTimeout(function() {
            $('#choice-action-nav .disable').fadeIn();
        }, 400);
    });
    $('#back-choice-action-nav').click(function() {
        console.log('back to choice');
        $('#choice-action-nav .disable').fadeOut();
        setTimeout(function() {
            $('#choice-action-nav .enable').fadeIn();
        }, 400);
    });
});