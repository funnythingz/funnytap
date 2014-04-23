/// <reference path="../../definitions/jquery.d.ts" />
/// <reference path="hackleview.ts" />

module FunnyTap {

    export class FunnytapView extends HACKLE.View {

        tagName: string = 'div';
        className: string = 'funnytap';

        constructor() {
            super();

            this.reflectTagName();
            this.reflectAttribute();
            this.render();
            this.delegateEvents(this.events);
        }

        events = {
        }

        render(): FunnytapView {

            this.$el.append(
                this.renderTemplate()
            );

            return this;
        }

        private renderTemplate(): string {

            var template = new HACKLE.HBSTemplate('hbs/funnytap.hbs');

            return template.render({});
        }

    }

}
