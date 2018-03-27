export class flashMessage {

    constructor(data) {
        this.ty = data.type;
        this.cl = data.class;
        this.msg = data.message;
        this.toast()
    }

    toast() {
        self = this
        $(document).ready(() => {
            let $toastContent = $('<span>'+self.msg+'</span>');
            Materialize.toast($toastContent, 5000);
            $('.toast').addClass(self.cl);
        });
    }


}

export default flashMessage
