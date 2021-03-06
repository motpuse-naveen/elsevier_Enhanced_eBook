/*
 *  jQuery fullscreen popup - v0.0.1
 *  Simple fullscreen popup plugin
 *  https://github.com/nurislamov/jquery-fullscreen-popup
 *
 *  Made by Timur Nurislamov
 *  Under MIT License
 */
/* <a class="video-popup" href="popup.html">Open popup</a> */
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  (function($) {
    var FSP, defaults, pluginName;
    pluginName = "fullScreenPopup";
    defaults = {
      bgColor: "#fff",
      inlineStyles: true,
      lockDocumentScroll: true,
      mainWrapperClass: "fsp-wrapper",
      contentWrapperClass: "fsp-content",
      iframeClass: "video-iframe",
      closePopupClass: "fsp-close",
      animationSpeed: 200
    };
    FSP = (function() {
      function FSP(element, options) {
        this.element = element;
        this.closePopup = __bind(this.closePopup, this);
        this.init = __bind(this.init, this);
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.element = $(this.element);
        this.body = $("body");
        this.element.on("click", this.init);
      }

      FSP.prototype.init = function(event) {
        event.preventDefault();
        this.getTarget();
        //this.getTargetSizes();
        this.createWrappers();
        //this.wrapTarget();
        if (this.options.lockDocumentScroll) {
          this.lockDocumentScroll();
        }
        this.render();
        return this.bindEvents();
      };

      FSP.prototype.getTarget = function() {
        this.target = ""//$(this.element.attr("href") || this.element.data("popup"));
        this.targetHref = this.element.attr("href");
        //return this.targetParent = this.target.parent();
      };

      FSP.prototype.getTargetSizes = function() {
        return this.targetSizes = {
          width: this.target.width(),
          height: this.target.height()
        };
      };

      FSP.prototype.wrapTarget = function() {
        //this.target = this.detachFromDom(this.target);
        //return this.target.appendTo(this.contentWrapper);
      };

      FSP.prototype.render = function() {
        //this.target.show();
        this.attachToDom(this.mainWrapper, "body");
        //this.popupCentered();
        return this.mainWrapper.fadeIn(this.options.animationSpeed);
      };

      FSP.prototype.detachFromDom = function(element) {
        return element.detach();
      };

      FSP.prototype.attachToDom = function(element, target) {
        //debugger
        return element.appendTo(target);
      };

      FSP.prototype.bindEvents = function() {
        return this.close.on("click", this.closePopup);
      };

      FSP.prototype.createWrappers = function() {
        //debugger;
        //this.mainWrapper = document.createElement('div').
        this.mainWrapper = $("<div/>", {
          "class": "" + this.options.mainWrapperClass,
          "style": this.options.inlineStyles ? "background: " + this.options.bgColor + "; position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 9999; overflow-y: auto; overflow-x: hidden; display: none" : void 0
        });
        this.contentWrapper = $("<div/>", {
          "class": "" + this.options.contentWrapperClass,
          "style": "width: 100%; height: calc(100% - 40px); margin-top:35px"
        }).appendTo(this.mainWrapper);
        this.targetFrame = $("<iframe/>",{
          "class": "" + this.options.iframeClass,
          "allowfullscreen": "allowfullscreen",
          "style": "width: 100%; height: 100%;border: none;",
          "src": this.targetHref
        }).appendTo(this.contentWrapper);
        return this.close = $("<a/>", {
          href: "#",
          html: "&#215;",
          "class": "" + this.options.closePopupClass,
          "style": this.options.inlineStyles ? "position: absolute; right: 1em; top: 0.5em;font-size: 20px;" : void 0
        }).appendTo(this.mainWrapper);
      };

      FSP.prototype.popupCentered = function() {};

      FSP.prototype.closePopup = function(event) {
        var self;
        event.preventDefault();
        self = this;
        return this.mainWrapper.fadeOut(this.options.animationSpeed, function() {
          if (self.options.lockDocumentScroll) {
            self.unlockDocumentScroll();
          }
          self.target = "" //self.detachFromDom(self.target);
          //self.target.hide();
          self.attachToDom(self.target, self.targetParent);
          return self.deleteWrappers();
        });
      };

      FSP.prototype.deleteWrappers = function() {
        return this.mainWrapper.remove();
      };

      FSP.prototype.lockDocumentScroll = function() {
        return this.body.css({
          "overflow": "hidden"
        });
      };

      FSP.prototype.unlockDocumentScroll = function() {
        return this.body.css({
          "overflow": "visible"
        });
      };

      return FSP;

    })();
    return $.fn[pluginName] = function(options) {
      return this.each(function() {
        if (!$.data(this, "plugin_" + pluginName)) {
          return $.data(this, "plugin_" + pluginName, new FSP(this, options));
        }
      });
    };
  })(jQuery);

}).call(this);


$(function() {
  $(".video-popup").fullScreenPopup({});
});
