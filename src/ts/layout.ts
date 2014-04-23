/// <reference path="../../definitions/jquery.d.ts" />

module FunnyTap {

    export class Layout extends HACKLE.View {

        $el = $('body');

        constructor() {
            super();
        }

        display($el: JQuery) {
            this.$el.empty().append($el);
        }

    }

}
