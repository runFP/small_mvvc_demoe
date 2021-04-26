class ErrorCenter {
    constructor() {
        this.errorType = {
            modal: {
                noState: (state) => {
                    try{
                        throw new Error(`[noState or no modal]:view must connect a modal or It"s not a state ${state} in modal`);
                    }catch (e) {
                        console.error(e.message);
                    }
                }
            },
            view: function () {

            },
            viewModal: function () {

            }
        };
    }
}

export const error_center = new ErrorCenter();