var HACKLE;
(function (HACKLE) {
    var View = (function () {
        function View(viewCreateOptions) {
            if (typeof viewCreateOptions === "undefined") { viewCreateOptions = {}; }
            this.tagName = 'div';
            this.attributes = {};
            this.events = {};
            this.tagName = viewCreateOptions.tagName || 'div';
            this.id = viewCreateOptions.id || '';
            this.className = viewCreateOptions.className || '';
            this.attributes = viewCreateOptions.attributes || {};
            this.$el = isJQuery(viewCreateOptions.$el) ? viewCreateOptions.$el : $('<' + this.tagName + '>');

            this.reflectAttribute();
        }
        View.prototype.render = function () {
            return this;
        };

        View.prototype.reflectTagName = function () {
            this.$el = $('<' + this.tagName + '>');
        };

        View.prototype.reflectAttribute = function () {
            var attributes = {};

            if (this.id !== '') {
                attributes['id'] = this.id;
            }

            if (this.className !== '') {
                attributes['class'] = this.className;
            }

            for (var key in this.attributes) {
                attributes[key] = this.attributes[key];
            }

            this.$el.attr(attributes);
        };

        View.prototype.delegateEvents = function (events) {
            var _this = this;
            $.map(events, function (eventMethodWithData, eventWithSelector) {
                var splitEventMethodWithData = new SplitEventMethodWithData(eventMethodWithData);

                var eventAndSelectorPair = splitEventWithSelector(eventWithSelector);

                _this.$el.on.call(_this.$el, eventAndSelectorPair.eventName, eventAndSelectorPair.selector, splitEventMethodWithData.data, splitEventMethodWithData.method);
            });

            return this;
        };
        return View;
    })();
    HACKLE.View = View;

    function splitEventWithSelector(eventWithSelector) {
        var resultPair = eventWithSelector.split(' ');

        var eventName = resultPair.shift();
        var selector = resultPair.join(' ');

        return {
            'eventName': eventName,
            'selector': selector
        };
    }

    var SplitEventMethodWithData = (function () {
        function SplitEventMethodWithData(methodWithData) {
            this.data = null;
            if (typeof methodWithData === 'object') {
                this.method = methodWithData[0];
                this.data = methodWithData[1];
            } else {
                this.method = methodWithData;
            }
        }
        return SplitEventMethodWithData;
    })();

    var HBSTemplate = (function () {
        function HBSTemplate(hbsName) {
            this.hbsName = hbsName;
        }
        HBSTemplate.prototype.render = function (data) {
            if (typeof data === "undefined") { data = {}; }
            var resultHTML;
            var _hbsName = this.hbsName;

            var $getHBSTemplate = $.ajax({
                url: _hbsName,
                type: 'get',
                dataType: 'html',
                async: false
            });

            $getHBSTemplate.done(function (hbs) {
                var template = Handlebars.compile(hbs);
                resultHTML = template(data);
            });

            return resultHTML;
        };
        return HBSTemplate;
    })();
    HACKLE.HBSTemplate = HBSTemplate;

    var HBSTemplateFromString = (function () {
        function HBSTemplateFromString(hbs) {
            this.hbs = hbs;
        }
        HBSTemplateFromString.prototype.render = function (data) {
            if (typeof data === "undefined") { data = {}; }
            var template = Handlebars.compile(this.hbs);
            var resultHTML = template(data);

            return resultHTML;
        };
        return HBSTemplateFromString;
    })();
    HACKLE.HBSTemplateFromString = HBSTemplateFromString;

    function isJQuery($that) {
        return $that instanceof jQuery;
    }
    HACKLE.isJQuery = isJQuery;
})(HACKLE || (HACKLE = {}));
;var FunnyTap;
(function (FunnyTap) {
    var Application = (function () {
        function Application() {
        }
        Application.prototype.ready = function () {
            var controller = new FunnyTap.Controller();
            controller.index();
        };
        return Application;
    })();
    FunnyTap.Application = Application;

    $(function () {
        var funnytap = new Application();
        funnytap.ready();
    });
})(FunnyTap || (FunnyTap = {}));
;var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var FunnyTap;
(function (FunnyTap) {
    var Layout = (function (_super) {
        __extends(Layout, _super);
        function Layout() {
            _super.call(this);
            this.$el = $('body');
        }
        Layout.prototype.display = function ($el) {
            this.$el.empty().append($el);
        };
        return Layout;
    })(HACKLE.View);
    FunnyTap.Layout = Layout;
})(FunnyTap || (FunnyTap = {}));
;var FunnyTap;
(function (FunnyTap) {
    var Controller = (function () {
        function Controller() {
            this.layout = new FunnyTap.Layout();
        }
        Controller.prototype.index = function () {
            var view = new FunnyTap.FunnytapView();
            this.layout.display(view.$el);
        };
        return Controller;
    })();
    FunnyTap.Controller = Controller;
})(FunnyTap || (FunnyTap = {}));
;var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var FunnyTap;
(function (FunnyTap) {
    var FunnytapView = (function (_super) {
        __extends(FunnytapView, _super);
        function FunnytapView() {
            _super.call(this);
            this.tagName = 'div';
            this.className = 'funnytap';
            this.startFlag = false;
            this.events = {
                'click .stage': [this.stop, this]
            };

            this.reflectTagName();
            this.reflectAttribute();
            this.render();
            this.delegateEvents(this.events);
        }
        FunnytapView.prototype.stop = function (event, data) {
            var funnytap = event.data;

            if (funnytap.isStart()) {
                console.log('stop');
                funnytap.startFlag = false;
                funnytap.stopDate = new Date();
                var score = (funnytap.startDate.getTime() - funnytap.stopDate.getTime());
                $('#message').text('Score: ' + score.toString());
                $('#retry').removeClass('hide');
            }
        };

        FunnytapView.prototype.render = function () {
            this.screenFit();
            this.resizeToWindow();

            this.start();

            this.$el.append(this.renderTemplate());

            return this;
        };

        FunnytapView.prototype.start = function () {
            var funnytap = this;

            setTimeout(function () {
                console.log('start');
                funnytap.startFlag = true;

                $('#image').addClass('tap');
                $('#message').text('just tap!!');

                funnytap.startDate = new Date();
            }, 4000);
        };

        FunnytapView.prototype.renderTemplate = function () {
            var template = new HACKLE.HBSTemplate('hbs/stage.hbs');

            return template.render({});
        };

        FunnytapView.prototype.screenFit = function () {
            this.$el.css('height', $(window).height() + 'px');
        };

        FunnytapView.prototype.resizeToWindow = function () {
            var timer;
            var funnytap = this;

            $(window).on('resize', function () {
                if (timer) {
                    clearTimeout(timer);
                }

                timer = setTimeout(function () {
                    funnytap.$el.css('height', $(window).height() + 'px');
                }, 100);
            });
        };

        FunnytapView.prototype.isStart = function () {
            return this.startFlag;
        };
        return FunnytapView;
    })(HACKLE.View);
    FunnyTap.FunnytapView = FunnytapView;
})(FunnyTap || (FunnyTap = {}));
