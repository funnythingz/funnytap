/// <reference path="../../definitions/jquery.d.ts" />
/// <reference path="hackleview.ts" />

module FunnyTap {

    export class FunnytapView extends HACKLE.View {

        tagName: string = 'div';
        className: string = 'funnytap';

        private startFlag: boolean = false;
        private startDate: any;
        private stopDate: any;

        constructor() {
            super();

            this.reflectTagName();
            this.reflectAttribute();
            this.render();
            this.delegateEvents(this.events);
        }

        events = {
            'click .stage' : [this.stop, this]
        }

        private stop(event, data) {
            var funnytap = event.data;

            if(funnytap.isStart()) {
                console.log('stop');
                funnytap.startFlag = false;
                funnytap.stopDate = new Date();
                var score: number = (funnytap.startDate.getTime() - funnytap.stopDate.getTime());
                $('#message').text('Score: ' + score.toString());
                $('#retry').removeClass('hide');
            }
        }

        render(): FunnytapView {

            this.screenFit();
            this.resizeToWindow();

            this.start();

            this.$el.append(
                this.renderTemplate()
            );

            return this;
        }

        private start() {

            var funnytap = this;

            setTimeout(function() {
                console.log('start');
                funnytap.startFlag = true;

                $('#image').addClass('tap');
                $('#message').text('just tap!!');

                funnytap.startDate = new Date();

            }, 4000);
        }

        private renderTemplate(): string {

            var template = new HACKLE.HBSTemplate('hbs/stage.hbs');

            return template.render({});
        }

        private screenFit() {
            this.$el.css('height', $(window).height() + 'px');
        }

        private resizeToWindow() {
            var timer;
            var funnytap = this;

            $(window).on('resize', function() {
                if(timer) {
                    clearTimeout(timer);
                }

                timer = setTimeout(function() {
                    funnytap.$el.css('height', $(window).height() + 'px');
                }, 100);
            });
        }

        private isStart(): boolean {
            return this.startFlag;
        }

    }

}
