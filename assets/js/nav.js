$(document).ready(function() {
    var isActive = false;
    var type = $('nav').length;
    if (type) {
        sizeAdaptiveTop();
        $(window).resize(function() {
            sizeAdaptiveTop();
        });
        function sizeAdaptiveTop() {
            var width = $(window).width();
            if (width < 993) {
                $('#nav-menu')
                .css('display', 'none')
                .css('padding-top', '60px')
                .removeClass('right hide-on-med-and-down');

                $('.nav-tab')
                .css('width', '100%')
                .css('textAlign', 'center')
                .css('background', 'white');

                $('.nav-tab a').css('color', '#333');
                $('nav i').css('height', 'auto');
                $('.dropdown-content').removeClass('dropdown-nav');

                $('#brand-logo').attr('href', '#!')
                .unbind('click')
                .click(function(event) {
                    event.preventDefault();
                    if (!isActive) {
                        isActive = true;
                        $('#nav-menu').slideDown();
                    } else {
                        isActive = false;
                        $('#nav-menu').slideUp();
                    }
                });
            } else {
                $('#nav-menu')
                .css('padding-top', '0')
                .addClass('right hide-on-med-and-down')
                .css('display', 'block');

                $('.nav-tab')
                .css('width', 'auto')
                .css('textAlign', 'auto')
                .css('background', 'none');

                $('.nav-tab a').css('color', '#fff');
                $('nav i').css('height', '56px');
                $('.dropdown-content').addClass('dropdown-nav');
                
                $('#brand-logo')
                .unbind('click')
                .attr('href', '/');
            }
        };
    } else {
        sizeAdaptiveSide();
        $(window).resize(function() {
            sizeAdaptiveSide();
        });
        function sizeAdaptiveSide() {
            if ($('#side-menu').length === 0) {
                $('body').prepend('<span id="side-menu" class="fa fa-bars fa-2x grey-text"></span>');
            }
            var width = $(window).width();
            if (width < 993) {
                $('#side-menu')
                .unbind('click')
                .click(function() {
                    if (!isActive) {
                        isActive = true;
                        $('#nav-mobile').css('transform', 'translateX(0%)');
                    } else {
                        isActive = false;
                        $('#nav-mobile').css('transform', 'translateX(-105%)');
                    }
                });
            } else {
                $('#nav-mobile').css('transform', 'translateX(0%)');
                if ($('#side-menu').length > 0) {
                    $('#side-menu').remove();
                }
            }
        };
    }
});