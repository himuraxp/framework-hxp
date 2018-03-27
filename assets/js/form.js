$(document).ready(function(){
    $('select').material_select();
    $('input').keyup(function(event) {
        var tmp = $('input.validate');
        for (var i = 0; i < tmp.length; i++) {
            if (!event.target.validity.valid && !event.target.value !== '') {
                if (i + 1 === tmp.length) {
                    $('input:submit').offsetParent().addClass('disabled').attr('disabled', true);
                    return true;
                }
            } else {
                $('input:submit').offsetParent().removeClass('disabled').attr('disabled', false);
                return false;
            }
        }
    });
});
