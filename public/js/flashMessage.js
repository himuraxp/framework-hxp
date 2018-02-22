var FLASH = FLASH || (function(){
    return {
        toast : function(args) {
            ty = args.type;
            cl = args.class;
            msg = args.message;
            $(document).ready(function(){
                var $toastContent = $('<span>'+msg+'</span>');
                Materialize.toast($toastContent, 5000);
                $('.toast').addClass(cl);
            });
        }
    };
}());
