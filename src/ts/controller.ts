/// <reference path="layout.ts" />

module FunnyTap {

    export class Controller {

        layout: Layout = new Layout();

        index() {
            var view: FunnytapView = new FunnytapView();
            this.layout.display(view.$el);
        }

    }

}
