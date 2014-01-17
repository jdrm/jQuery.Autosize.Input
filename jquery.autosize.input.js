var Plugins;
(function (Plugins) {
    var AutosizeInput = (function () {
        function AutosizeInput(input, options) {
            var _this = this;
            this.input = $(input);
            this.options = options;

            this.mirror = $('<span style="position:absolute; top:-999px; left:0; white-space:pre;"/>');

            $.each(['fontFamily', 'fontSize', 'fontWeight', 'fontStyle', 'letterSpacing', 'textTransform', 'wordSpacing', 'textIndent'], function (i, val) {
                _this.mirror[0].style[val] = _this.input.css(val);
            });
            $("body").append(this.mirror);

            this.input.on("keydown keyup input propertychange change", function (e) {
                _this.update();
            });

            (function () {
                _this.update();
            })();
        }


        AutosizeInput.prototype.update = function () {
            var value = this.input.val();

            if (!value) {
                value = this.input.attr("placeholder") || "";
            }

            if (value === this.mirror.text()) {
                return;
            }

            this.mirror.text(value);

            var newWidth = this.mirror.width() + this.options.space;

            this.input.width(newWidth);
        };
        return AutosizeInput;
    })();
    Plugins.AutosizeInput = AutosizeInput;
    Plugins.AutosizeInput.instanceKey = 'autosizeInputInstance';

    var AutosizeInputOptions = (function () {
        function AutosizeInputOptions(space) {
            if (typeof space === "undefined") { space = 4; }
            this.space = space;
        }
        return AutosizeInputOptions;
    })();
    Plugins.AutosizeInputOptions = AutosizeInputOptions;

    (function ($) {
        var pluginDataAttributeName = "autosize-input";
        var validTypes = ["text", "password", "search", "url", "tel", "email"];

        $.fn.autosizeInput = function (options) {
            return this.each(function () {
                if (!(this.tagName == "INPUT" && $.inArray(this.type, validTypes) > -1)) {
                    return;
                }

                var $this = $(this);

                if (!$this.data(Plugins.AutosizeInput.instanceKey)) {
                    if (options == undefined) {
                        var options = $this.data(pluginDataAttributeName);

                        if (!(options && typeof options == 'object')) {
                            options = new AutosizeInputOptions();
                        }
                    }

                    $this.data(Plugins.AutosizeInput.instanceKey, new Plugins.AutosizeInput(this, options));
                }
            });
        };

        $(function () {
            $("input[data-" + pluginDataAttributeName + "]").autosizeInput();
        });
    })(jQuery);
})(Plugins || (Plugins = {}));
