/// <reference path="../../definitions/fastclick.d.ts" />
/// <reference path="controller.ts" />

module FunnyTap {

    export class Application {

        ready() {
            FastClick.attach(document.body);

            var controller: Controller = new Controller();
            controller.index();
        }

    }

    $(()=> {
        var funnytap: Application = new Application();
        funnytap.ready();
    });

}
