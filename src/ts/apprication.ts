/// <reference path="controller.ts" />

module FunnyTap {

    export class Application {

        ready() {
            var controller: Controller = new Controller();
            controller.index();
        }

    }

    $(()=> {
        var funnytap: Application = new Application();
        funnytap.ready();
    });

}
