/*!
  * Bootstrap v4.4.1 (https://getbootstrap.com/)
  * Copyright 2011-2019 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery'), require('popper.js')) :
  typeof define === 'function' && define.amd ? define(['exports', 'jquery', 'popper.js'], factory) :
  (global = global || self, factory(global.bootstrap = {}, global.jQuery, global.Popper));
}(this, (function (exports, $, Popper) { 'use strict';

  $ = $ && $.hasOwnProperty('default') ? $['default'] : $;
  Popper = Popper && Popper.hasOwnProperty('default') ? Popper['default'] : Popper;

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.4.1): util.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * ------------------------------------------------------------------------
   * Private TransitionEnd Helpers
   * ------------------------------------------------------------------------
   */

  var TRANSITION_END = 'transitionend';
  var MAX_UID = 1000000;
  var MILLISECONDS_MULTIPLIER = 1000; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

  function toType(obj) {
    return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
  }

  function getSpecialTransitionEndEvent() {
    return {
      bindType: TRANSITION_END,
      delegateType: TRANSITION_END,
      handle: function handle(event) {
        if ($(event.target).is(this)) {
          return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
        }

        return undefined; // eslint-disable-line no-undefined
      }
    };
  }

  function transitionEndEmulator(duration) {
    var _this = this;

    var called = false;
    $(this).one(Util.TRANSITION_END, function () {
      called = true;
    });
    setTimeout(function () {
      if (!called) {
        Util.triggerTransitionEnd(_this);
      }
    }, duration);
    return this;
  }

  function setTransitionEndSupport() {
    $.fn.emulateTransitionEnd = transitionEndEmulator;
    $.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
  }
  /**
   * --------------------------------------------------------------------------
   * Public Util Api
   * --------------------------------------------------------------------------
   */


  var Util = {
    TRANSITION_END: 'bsTransitionEnd',
    getUID: function getUID(prefix) {
      do {
        // eslint-disable-next-line no-bitwise
        prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
      } while (document.getElementById(prefix));

      return prefix;
    },
    getSelectorFromElement: function getSelectorFromElement(element) {
      var selector = element.getAttribute('data-target');

      if (!selector || selector === '#') {
        var hrefAttr = element.getAttribute('href');
        selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : '';
      }

      try {
        return document.querySelector(selector) ? selector : null;
      } catch (err) {
        return null;
      }
    },
    getTransitionDurationFromElement: function getTransitionDurationFromElement(element) {
      if (!element) {
        return 0;
      } // Get transition-duration of the element


      var transitionDuration = $(element).css('transition-duration');
      var transitionDelay = $(element).css('transition-delay');
      var floatTransitionDuration = parseFloat(transitionDuration);
      var floatTransitionDelay = parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

      if (!floatTransitionDuration && !floatTransitionDelay) {
        return 0;
      } // If multiple durations are defined, take the first


      transitionDuration = transitionDuration.split(',')[0];
      transitionDelay = transitionDelay.split(',')[0];
      return (parseFloat(transitionDuration) + parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
    },
    reflow: function reflow(element) {
      return element.offsetHeight;
    },
    triggerTransitionEnd: function triggerTransitionEnd(element) {
      $(element).trigger(TRANSITION_END);
    },
    // TODO: Remove in v5
    supportsTransitionEnd: function supportsTransitionEnd() {
      return Boolean(TRANSITION_END);
    },
    isElement: function isElement(obj) {
      return (obj[0] || obj).nodeType;
    },
    typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
      for (var property in configTypes) {
        if (Object.prototype.hasOwnProperty.call(configTypes, property)) {
          var expectedTypes = configTypes[property];
          var value = config[property];
          var valueType = value && Util.isElement(value) ? 'element' : toType(value);

          if (!new RegExp(expectedTypes).test(valueType)) {
            throw new Error(componentName.toUpperCase() + ": " + ("Option \"" + property + "\" provided type \"" + valueType + "\" ") + ("but expected type \"" + expectedTypes + "\"."));
          }
        }
      }
    },
    findShadowRoot: function findShadowRoot(element) {
      if (!document.documentElement.attachShadow) {
        return null;
      } // Can find the shadow root otherwise it'll return the document


      if (typeof element.getRootNode === 'function') {
        var root = element.getRootNode();
        return root instanceof ShadowRoot ? root : null;
      }

      if (element instanceof ShadowRoot) {
        return element;
      } // when we don't find a shadow root


      if (!element.parentNode) {
        return null;
      }

      return Util.findShadowRoot(element.parentNode);
    },
    jQueryDetection: function jQueryDetection() {
      if (typeof $ === 'undefined') {
        throw new TypeError('Bootstrap\'s JavaScript requires jQuery. jQuery must be included before Bootstrap\'s JavaScript.');
      }

      var version = $.fn.jquery.split(' ')[0].split('.');
      var minMajor = 1;
      var ltMajor = 2;
      var minMinor = 9;
      var minPatch = 1;
      var maxMajor = 4;

      if (version[0] < ltMajor && version[1] < minMinor || version[0] === minMajor && version[1] === minMinor && version[2] < minPatch || version[0] >= maxMajor) {
        throw new Error('Bootstrap\'s JavaScript requires at least jQuery v1.9.1 but less than v4.0.0');
      }
    }
  };
  Util.jQueryDetection();
  setTransitionEndSupport();

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'alert';
  var VERSION = '4.4.1';
  var DATA_KEY = 'bs.alert';
  var EVENT_KEY = "." + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var Selector = {
    DISMISS: '[data-dismiss="alert"]'
  };
  var Event = {
    CLOSE: "close" + EVENT_KEY,
    CLOSED: "closed" + EVENT_KEY,
    CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
  };
  var ClassName = {
    ALERT: 'alert',
    FADE: 'fade',
    SHOW: 'show'
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Alert =
  /*#__PURE__*/
  function () {
    function Alert(element) {
      this._element = element;
    } // Getters


    var _proto = Alert.prototype;

    // Public
    _proto.close = function close(element) {
      var rootElement = this._element;

      if (element) {
        rootElement = this._getRootElement(element);
      }

      var customEvent = this._triggerCloseEvent(rootElement);

      if (customEvent.isDefaultPrevented()) {
        return;
      }

      this._removeElement(rootElement);
    };

    _proto.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);
      this._element = null;
    } // Private
    ;

    _proto._getRootElement = function _getRootElement(element) {
      var selector = Util.getSelectorFromElement(element);
      var parent = false;

      if (selector) {
        parent = document.querySelector(selector);
      }

      if (!parent) {
        parent = $(element).closest("." + ClassName.ALERT)[0];
      }

      return parent;
    };

    _proto._triggerCloseEvent = function _triggerCloseEvent(element) {
      var closeEvent = $.Event(Event.CLOSE);
      $(element).trigger(closeEvent);
      return closeEvent;
    };

    _proto._removeElement = function _removeElement(element) {
      var _this = this;

      $(element).removeClass(ClassName.SHOW);

      if (!$(element).hasClass(ClassName.FADE)) {
        this._destroyElement(element);

        return;
      }

      var transitionDuration = Util.getTransitionDurationFromElement(element);
      $(element).one(Util.TRANSITION_END, function (event) {
        return _this._destroyElement(element, event);
      }).emulateTransitionEnd(transitionDuration);
    };

    _proto._destroyElement = function _destroyElement(element) {
      $(element).detach().trigger(Event.CLOSED).remove();
    } // Static
    ;

    Alert._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $element = $(this);
        var data = $element.data(DATA_KEY);

        if (!data) {
          data = new Alert(this);
          $element.data(DATA_KEY, data);
        }

        if (config === 'close') {
          data[config](this);
        }
      });
    };

    Alert._handleDismiss = function _handleDismiss(alertInstance) {
      return function (event) {
        if (event) {
          event.preventDefault();
        }

        alertInstance.close(this);
      };
    };

    _createClass(Alert, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION;
      }
    }]);

    return Alert;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event.CLICK_DATA_API, Selector.DISMISS, Alert._handleDismiss(new Alert()));
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Alert._jQueryInterface;
  $.fn[NAME].Constructor = Alert;

  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Alert._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$1 = 'button';
  var VERSION$1 = '4.4.1';
  var DATA_KEY$1 = 'bs.button';
  var EVENT_KEY$1 = "." + DATA_KEY$1;
  var DATA_API_KEY$1 = '.data-api';
  var JQUERY_NO_CONFLICT$1 = $.fn[NAME$1];
  var ClassName$1 = {
    ACTIVE: 'active',
    BUTTON: 'btn',
    FOCUS: 'focus'
  };
  var Selector$1 = {
    DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
    DATA_TOGGLES: '[data-toggle="buttons"]',
    DATA_TOGGLE: '[data-toggle="button"]',
    DATA_TOGGLES_BUTTONS: '[data-toggle="buttons"] .btn',
    INPUT: 'input:not([type="hidden"])',
    ACTIVE: '.active',
    BUTTON: '.btn'
  };
  var Event$1 = {
    CLICK_DATA_API: "click" + EVENT_KEY$1 + DATA_API_KEY$1,
    FOCUS_BLUR_DATA_API: "focus" + EVENT_KEY$1 + DATA_API_KEY$1 + " " + ("blur" + EVENT_KEY$1 + DATA_API_KEY$1),
    LOAD_DATA_API: "load" + EVENT_KEY$1 + DATA_API_KEY$1
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Button =
  /*#__PURE__*/
  function () {
    function Button(element) {
      this._element = element;
    } // Getters


    var _proto = Button.prototype;

    // Public
    _proto.toggle = function toggle() {
      var triggerChangeEvent = true;
      var addAriaPressed = true;
      var rootElement = $(this._element).closest(Selector$1.DATA_TOGGLES)[0];

      if (rootElement) {
        var input = this._element.querySelector(Selector$1.INPUT);

        if (input) {
          if (input.type === 'radio') {
            if (input.checked && this._element.classList.contains(ClassName$1.ACTIVE)) {
              triggerChangeEvent = false;
            } else {
              var activeElement = rootElement.querySelector(Selector$1.ACTIVE);

              if (activeElement) {
                $(activeElement).removeClass(ClassName$1.ACTIVE);
              }
            }
          } else if (input.type === 'checkbox') {
            if (this._element.tagName === 'LABEL' && input.checked === this._element.classList.contains(ClassName$1.ACTIVE)) {
              triggerChangeEvent = false;
            }
          } else {
            // if it's not a radio button or checkbox don't add a pointless/invalid checked property to the input
            triggerChangeEvent = false;
          }

          if (triggerChangeEvent) {
            input.checked = !this._element.classList.contains(ClassName$1.ACTIVE);
            $(input).trigger('change');
          }

          input.focus();
          addAriaPressed = false;
        }
      }

      if (!(this._element.hasAttribute('disabled') || this._element.classList.contains('disabled'))) {
        if (addAriaPressed) {
          this._element.setAttribute('aria-pressed', !this._element.classList.contains(ClassName$1.ACTIVE));
        }

        if (triggerChangeEvent) {
          $(this._element).toggleClass(ClassName$1.ACTIVE);
        }
      }
    };

    _proto.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY$1);
      this._element = null;
    } // Static
    ;

    Button._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY$1);

        if (!data) {
          data = new Button(this);
          $(this).data(DATA_KEY$1, data);
        }

        if (config === 'toggle') {
          data[config]();
        }
      });
    };

    _createClass(Button, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$1;
      }
    }]);

    return Button;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event$1.CLICK_DATA_API, Selector$1.DATA_TOGGLE_CARROT, function (event) {
    var button = event.target;

    if (!$(button).hasClass(ClassName$1.BUTTON)) {
      button = $(button).closest(Selector$1.BUTTON)[0];
    }

    if (!button || button.hasAttribute('disabled') || button.classList.contains('disabled')) {
      event.preventDefault(); // work around Firefox bug #1540995
    } else {
      var inputBtn = button.querySelector(Selector$1.INPUT);

      if (inputBtn && (inputBtn.hasAttribute('disabled') || inputBtn.classList.contains('disabled'))) {
        event.preventDefault(); // work around Firefox bug #1540995

        return;
      }

      Button._jQueryInterface.call($(button), 'toggle');
    }
  }).on(Event$1.FOCUS_BLUR_DATA_API, Selector$1.DATA_TOGGLE_CARROT, function (event) {
    var button = $(event.target).closest(Selector$1.BUTTON)[0];
    $(button).toggleClass(ClassName$1.FOCUS, /^focus(in)?$/.test(event.type));
  });
  $(window).on(Event$1.LOAD_DATA_API, function () {
    // ensure correct active class is set to match the controls' actual values/states
    // find all checkboxes/readio buttons inside data-toggle groups
    var buttons = [].slice.call(document.querySelectorAll(Selector$1.DATA_TOGGLES_BUTTONS));

    for (var i = 0, len = buttons.length; i < len; i++) {
      var button = buttons[i];
      var input = button.querySelector(Selector$1.INPUT);

      if (input.checked || input.hasAttribute('checked')) {
        button.classList.add(ClassName$1.ACTIVE);
      } else {
        button.classList.remove(ClassName$1.ACTIVE);
      }
    } // find all button toggles


    buttons = [].slice.call(document.querySelectorAll(Selector$1.DATA_TOGGLE));

    for (var _i = 0, _len = buttons.length; _i < _len; _i++) {
      var _button = buttons[_i];

      if (_button.getAttribute('aria-pressed') === 'true') {
        _button.classList.add(ClassName$1.ACTIVE);
      } else {
        _button.classList.remove(ClassName$1.ACTIVE);
      }
    }
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$1] = Button._jQueryInterface;
  $.fn[NAME$1].Constructor = Button;

  $.fn[NAME$1].noConflict = function () {
    $.fn[NAME$1] = JQUERY_NO_CONFLICT$1;
    return Button._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$2 = 'carousel';
  var VERSION$2 = '4.4.1';
  var DATA_KEY$2 = 'bs.carousel';
  var EVENT_KEY$2 = "." + DATA_KEY$2;
  var DATA_API_KEY$2 = '.data-api';
  var JQUERY_NO_CONFLICT$2 = $.fn[NAME$2];
  var ARROW_LEFT_KEYCODE = 37; // KeyboardEvent.which value for left arrow key

  var ARROW_RIGHT_KEYCODE = 39; // KeyboardEvent.which value for right arrow key

  var TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

  var SWIPE_THRESHOLD = 40;
  var Default = {
    interval: 5000,
    keyboard: true,
    slide: false,
    pause: 'hover',
    wrap: true,
    touch: true
  };
  var DefaultType = {
    interval: '(number|boolean)',
    keyboard: 'boolean',
    slide: '(boolean|string)',
    pause: '(string|boolean)',
    wrap: 'boolean',
    touch: 'boolean'
  };
  var Direction = {
    NEXT: 'next',
    PREV: 'prev',
    LEFT: 'left',
    RIGHT: 'right'
  };
  var Event$2 = {
    SLIDE: "slide" + EVENT_KEY$2,
    SLID: "slid" + EVENT_KEY$2,
    KEYDOWN: "keydown" + EVENT_KEY$2,
    MOUSEENTER: "mouseenter" + EVENT_KEY$2,
    MOUSELEAVE: "mouseleave" + EVENT_KEY$2,
    TOUCHSTART: "touchstart" + EVENT_KEY$2,
    TOUCHMOVE: "touchmove" + EVENT_KEY$2,
    TOUCHEND: "touchend" + EVENT_KEY$2,
    POINTERDOWN: "pointerdown" + EVENT_KEY$2,
    POINTERUP: "pointerup" + EVENT_KEY$2,
    DRAG_START: "dragstart" + EVENT_KEY$2,
    LOAD_DATA_API: "load" + EVENT_KEY$2 + DATA_API_KEY$2,
    CLICK_DATA_API: "click" + EVENT_KEY$2 + DATA_API_KEY$2
  };
  var ClassName$2 = {
    CAROUSEL: 'carousel',
    ACTIVE: 'active',
    SLIDE: 'slide',
    RIGHT: 'carousel-item-right',
    LEFT: 'carousel-item-left',
    NEXT: 'carousel-item-next',
    PREV: 'carousel-item-prev',
    ITEM: 'carousel-item',
    POINTER_EVENT: 'pointer-event'
  };
  var Selector$2 = {
    ACTIVE: '.active',
    ACTIVE_ITEM: '.active.carousel-item',
    ITEM: '.carousel-item',
    ITEM_IMG: '.carousel-item img',
    NEXT_PREV: '.carousel-item-next, .carousel-item-prev',
    INDICATORS: '.carousel-indicators',
    DATA_SLIDE: '[data-slide], [data-slide-to]',
    DATA_RIDE: '[data-ride="carousel"]'
  };
  var PointerType = {
    TOUCH: 'touch',
    PEN: 'pen'
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Carousel =
  /*#__PURE__*/
  function () {
    function Carousel(element, config) {
      this._items = null;
      this._interval = null;
      this._activeElement = null;
      this._isPaused = false;
      this._isSliding = false;
      this.touchTimeout = null;
      this.touchStartX = 0;
      this.touchDeltaX = 0;
      this._config = this._getConfig(config);
      this._element = element;
      this._indicatorsElement = this._element.querySelector(Selector$2.INDICATORS);
      this._touchSupported = 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
      this._pointerEvent = Boolean(window.PointerEvent || window.MSPointerEvent);

      this._addEventListeners();
    } // Getters


    var _proto = Carousel.prototype;

    // Public
    _proto.next = function next() {
      if (!this._isSliding) {
        this._slide(Direction.NEXT);
      }
    };

    _proto.nextWhenVisible = function nextWhenVisible() {
      // Don't call next when the page isn't visible
      // or the carousel or its parent isn't visible
      if (!document.hidden && $(this._element).is(':visible') && $(this._element).css('visibility') !== 'hidden') {
        this.next();
      }
    };

    _proto.prev = function prev() {
      if (!this._isSliding) {
        this._slide(Direction.PREV);
      }
    };

    _proto.pause = function pause(event) {
      if (!event) {
        this._isPaused = true;
      }

      if (this._element.querySelector(Selector$2.NEXT_PREV)) {
        Util.triggerTransitionEnd(this._element);
        this.cycle(true);
      }

      clearInterval(this._interval);
      this._interval = null;
    };

    _proto.cycle = function cycle(event) {
      if (!event) {
        this._isPaused = false;
      }

      if (this._interval) {
        clearInterval(this._interval);
        this._interval = null;
      }

      if (this._config.interval && !this._isPaused) {
        this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
      }
    };

    _proto.to = function to(index) {
      var _this = this;

      this._activeElement = this._element.querySelector(Selector$2.ACTIVE_ITEM);

      var activeIndex = this._getItemIndex(this._activeElement);

      if (index > this._items.length - 1 || index < 0) {
        return;
      }

      if (this._isSliding) {
        $(this._element).one(Event$2.SLID, function () {
          return _this.to(index);
        });
        return;
      }

      if (activeIndex === index) {
        this.pause();
        this.cycle();
        return;
      }

      var direction = index > activeIndex ? Direction.NEXT : Direction.PREV;

      this._slide(direction, this._items[index]);
    };

    _proto.dispose = function dispose() {
      $(this._element).off(EVENT_KEY$2);
      $.removeData(this._element, DATA_KEY$2);
      this._items = null;
      this._config = null;
      this._element = null;
      this._interval = null;
      this._isPaused = null;
      this._isSliding = null;
      this._activeElement = null;
      this._indicatorsElement = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread2({}, Default, {}, config);
      Util.typeCheckConfig(NAME$2, config, DefaultType);
      return config;
    };

    _proto._handleSwipe = function _handleSwipe() {
      var absDeltax = Math.abs(this.touchDeltaX);

      if (absDeltax <= SWIPE_THRESHOLD) {
        return;
      }

      var direction = absDeltax / this.touchDeltaX;
      this.touchDeltaX = 0; // swipe left

      if (direction > 0) {
        this.prev();
      } // swipe right


      if (direction < 0) {
        this.next();
      }
    };

    _proto._addEventListeners = function _addEventListeners() {
      var _this2 = this;

      if (this._config.keyboard) {
        $(this._element).on(Event$2.KEYDOWN, function (event) {
          return _this2._keydown(event);
        });
      }

      if (this._config.pause === 'hover') {
        $(this._element).on(Event$2.MOUSEENTER, function (event) {
          return _this2.pause(event);
        }).on(Event$2.MOUSELEAVE, function (event) {
          return _this2.cycle(event);
        });
      }

      if (this._config.touch) {
        this._addTouchEventListeners();
      }
    };

    _proto._addTouchEventListeners = function _addTouchEventListeners() {
      var _this3 = this;

      if (!this._touchSupported) {
        return;
      }

      var start = function start(event) {
        if (_this3._pointerEvent && PointerType[event.originalEvent.pointerType.toUpperCase()]) {
          _this3.touchStartX = event.originalEvent.clientX;
        } else if (!_this3._pointerEvent) {
          _this3.touchStartX = event.originalEvent.touches[0].clientX;
        }
      };

      var move = function move(event) {
        // ensure swiping with one touch and not pinching
        if (event.originalEvent.touches && event.originalEvent.touches.length > 1) {
          _this3.touchDeltaX = 0;
        } else {
          _this3.touchDeltaX = event.originalEvent.touches[0].clientX - _this3.touchStartX;
        }
      };

      var end = function end(event) {
        if (_this3._pointerEvent && PointerType[event.originalEvent.pointerType.toUpperCase()]) {
          _this3.touchDeltaX = event.originalEvent.clientX - _this3.touchStartX;
        }

        _this3._handleSwipe();

        if (_this3._config.pause === 'hover') {
          // If it's a touch-enabled device, mouseenter/leave are fired as
          // part of the mouse compatibility events on first tap - the carousel
          // would stop cycling until user tapped out of it;
          // here, we listen for touchend, explicitly pause the carousel
          // (as if it's the second time we tap on it, mouseenter compat event
          // is NOT fired) and after a timeout (to allow for mouse compatibility
          // events to fire) we explicitly restart cycling
          _this3.pause();

          if (_this3.touchTimeout) {
            clearTimeout(_this3.touchTimeout);
          }

          _this3.touchTimeout = setTimeout(function (event) {
            return _this3.cycle(event);
          }, TOUCHEVENT_COMPAT_WAIT + _this3._config.interval);
        }
      };

      $(this._element.querySelectorAll(Selector$2.ITEM_IMG)).on(Event$2.DRAG_START, function (e) {
        return e.preventDefault();
      });

      if (this._pointerEvent) {
        $(this._element).on(Event$2.POINTERDOWN, function (event) {
          return start(event);
        });
        $(this._element).on(Event$2.POINTERUP, function (event) {
          return end(event);
        });

        this._element.classList.add(ClassName$2.POINTER_EVENT);
      } else {
        $(this._element).on(Event$2.TOUCHSTART, function (event) {
          return start(event);
        });
        $(this._element).on(Event$2.TOUCHMOVE, function (event) {
          return move(event);
        });
        $(this._element).on(Event$2.TOUCHEND, function (event) {
          return end(event);
        });
      }
    };

    _proto._keydown = function _keydown(event) {
      if (/input|textarea/i.test(event.target.tagName)) {
        return;
      }

      switch (event.which) {
        case ARROW_LEFT_KEYCODE:
          event.preventDefault();
          this.prev();
          break;

        case ARROW_RIGHT_KEYCODE:
          event.preventDefault();
          this.next();
          break;
      }
    };

    _proto._getItemIndex = function _getItemIndex(element) {
      this._items = element && element.parentNode ? [].slice.call(element.parentNode.querySelectorAll(Selector$2.ITEM)) : [];
      return this._items.indexOf(element);
    };

    _proto._getItemByDirection = function _getItemByDirection(direction, activeElement) {
      var isNextDirection = direction === Direction.NEXT;
      var isPrevDirection = direction === Direction.PREV;

      var activeIndex = this._getItemIndex(activeElement);

      var lastItemIndex = this._items.length - 1;
      var isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex;

      if (isGoingToWrap && !this._config.wrap) {
        return activeElement;
      }

      var delta = direction === Direction.PREV ? -1 : 1;
      var itemIndex = (activeIndex + delta) % this._items.length;
      return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
    };

    _proto._triggerSlideEvent = function _triggerSlideEvent(relatedTarget, eventDirectionName) {
      var targetIndex = this._getItemIndex(relatedTarget);

      var fromIndex = this._getItemIndex(this._element.querySelector(Selector$2.ACTIVE_ITEM));

      var slideEvent = $.Event(Event$2.SLIDE, {
        relatedTarget: relatedTarget,
        direction: eventDirectionName,
        from: fromIndex,
        to: targetIndex
      });
      $(this._element).trigger(slideEvent);
      return slideEvent;
    };

    _proto._setActiveIndicatorElement = function _setActiveIndicatorElement(element) {
      if (this._indicatorsElement) {
        var indicators = [].slice.call(this._indicatorsElement.querySelectorAll(Selector$2.ACTIVE));
        $(indicators).removeClass(ClassName$2.ACTIVE);

        var nextIndicator = this._indicatorsElement.children[this._getItemIndex(element)];

        if (nextIndicator) {
          $(nextIndicator).addClass(ClassName$2.ACTIVE);
        }
      }
    };

    _proto._slide = function _slide(direction, element) {
      var _this4 = this;

      var activeElement = this._element.querySelector(Selector$2.ACTIVE_ITEM);

      var activeElementIndex = this._getItemIndex(activeElement);

      var nextElement = element || activeElement && this._getItemByDirection(direction, activeElement);

      var nextElementIndex = this._getItemIndex(nextElement);

      var isCycling = Boolean(this._interval);
      var directionalClassName;
      var orderClassName;
      var eventDirectionName;

      if (direction === Direction.NEXT) {
        directionalClassName = ClassName$2.LEFT;
        orderClassName = ClassName$2.NEXT;
        eventDirectionName = Direction.LEFT;
      } else {
        directionalClassName = ClassName$2.RIGHT;
        orderClassName = ClassName$2.PREV;
        eventDirectionName = Direction.RIGHT;
      }

      if (nextElement && $(nextElement).hasClass(ClassName$2.ACTIVE)) {
        this._isSliding = false;
        return;
      }

      var slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);

      if (slideEvent.isDefaultPrevented()) {
        return;
      }

      if (!activeElement || !nextElement) {
        // Some weirdness is happening, so we bail
        return;
      }

      this._isSliding = true;

      if (isCycling) {
        this.pause();
      }

      this._setActiveIndicatorElement(nextElement);

      var slidEvent = $.Event(Event$2.SLID, {
        relatedTarget: nextElement,
        direction: eventDirectionName,
        from: activeElementIndex,
        to: nextElementIndex
      });

      if ($(this._element).hasClass(ClassName$2.SLIDE)) {
        $(nextElement).addClass(orderClassName);
        Util.reflow(nextElement);
        $(activeElement).addClass(directionalClassName);
        $(nextElement).addClass(directionalClassName);
        var nextElementInterval = parseInt(nextElement.getAttribute('data-interval'), 10);

        if (nextElementInterval) {
          this._config.defaultInterval = this._config.defaultInterval || this._config.interval;
          this._config.interval = nextElementInterval;
        } else {
          this._config.interval = this._config.defaultInterval || this._config.interval;
        }

        var transitionDuration = Util.getTransitionDurationFromElement(activeElement);
        $(activeElement).one(Util.TRANSITION_END, function () {
          $(nextElement).removeClass(directionalClassName + " " + orderClassName).addClass(ClassName$2.ACTIVE);
          $(activeElement).removeClass(ClassName$2.ACTIVE + " " + orderClassName + " " + directionalClassName);
          _this4._isSliding = false;
          setTimeout(function () {
            return $(_this4._element).trigger(slidEvent);
          }, 0);
        }).emulateTransitionEnd(transitionDuration);
      } else {
        $(activeElement).removeClass(ClassName$2.ACTIVE);
        $(nextElement).addClass(ClassName$2.ACTIVE);
        this._isSliding = false;
        $(this._element).trigger(slidEvent);
      }

      if (isCycling) {
        this.cycle();
      }
    } // Static
    ;

    Carousel._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY$2);

        var _config = _objectSpread2({}, Default, {}, $(this).data());

        if (typeof config === 'object') {
          _config = _objectSpread2({}, _config, {}, config);
        }

        var action = typeof config === 'string' ? config : _config.slide;

        if (!data) {
          data = new Carousel(this, _config);
          $(this).data(DATA_KEY$2, data);
        }

        if (typeof config === 'number') {
          data.to(config);
        } else if (typeof action === 'string') {
          if (typeof data[action] === 'undefined') {
            throw new TypeError("No method named \"" + action + "\"");
          }

          data[action]();
        } else if (_config.interval && _config.ride) {
          data.pause();
          data.cycle();
        }
      });
    };

    Carousel._dataApiClickHandler = function _dataApiClickHandler(event) {
      var selector = Util.getSelectorFromElement(this);

      if (!selector) {
        return;
      }

      var target = $(selector)[0];

      if (!target || !$(target).hasClass(ClassName$2.CAROUSEL)) {
        return;
      }

      var config = _objectSpread2({}, $(target).data(), {}, $(this).data());

      var slideIndex = this.getAttribute('data-slide-to');

      if (slideIndex) {
        config.interval = false;
      }

      Carousel._jQueryInterface.call($(target), config);

      if (slideIndex) {
        $(target).data(DATA_KEY$2).to(slideIndex);
      }

      event.preventDefault();
    };

    _createClass(Carousel, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$2;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default;
      }
    }]);

    return Carousel;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event$2.CLICK_DATA_API, Selector$2.DATA_SLIDE, Carousel._dataApiClickHandler);
  $(window).on(Event$2.LOAD_DATA_API, function () {
    var carousels = [].slice.call(document.querySelectorAll(Selector$2.DATA_RIDE));

    for (var i = 0, len = carousels.length; i < len; i++) {
      var $carousel = $(carousels[i]);

      Carousel._jQueryInterface.call($carousel, $carousel.data());
    }
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$2] = Carousel._jQueryInterface;
  $.fn[NAME$2].Constructor = Carousel;

  $.fn[NAME$2].noConflict = function () {
    $.fn[NAME$2] = JQUERY_NO_CONFLICT$2;
    return Carousel._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$3 = 'collapse';
  var VERSION$3 = '4.4.1';
  var DATA_KEY$3 = 'bs.collapse';
  var EVENT_KEY$3 = "." + DATA_KEY$3;
  var DATA_API_KEY$3 = '.data-api';
  var JQUERY_NO_CONFLICT$3 = $.fn[NAME$3];
  var Default$1 = {
    toggle: true,
    parent: ''
  };
  var DefaultType$1 = {
    toggle: 'boolean',
    parent: '(string|element)'
  };
  var Event$3 = {
    SHOW: "show" + EVENT_KEY$3,
    SHOWN: "shown" + EVENT_KEY$3,
    HIDE: "hide" + EVENT_KEY$3,
    HIDDEN: "hidden" + EVENT_KEY$3,
    CLICK_DATA_API: "click" + EVENT_KEY$3 + DATA_API_KEY$3
  };
  var ClassName$3 = {
    SHOW: 'show',
    COLLAPSE: 'collapse',
    COLLAPSING: 'collapsing',
    COLLAPSED: 'collapsed'
  };
  var Dimension = {
    WIDTH: 'width',
    HEIGHT: 'height'
  };
  var Selector$3 = {
    ACTIVES: '.show, .collapsing',
    DATA_TOGGLE: '[data-toggle="collapse"]'
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Collapse =
  /*#__PURE__*/
  function () {
    function Collapse(element, config) {
      this._isTransitioning = false;
      this._element = element;
      this._config = this._getConfig(config);
      this._triggerArray = [].slice.call(document.querySelectorAll("[data-toggle=\"collapse\"][href=\"#" + element.id + "\"]," + ("[data-toggle=\"collapse\"][data-target=\"#" + element.id + "\"]")));
      var toggleList = [].slice.call(document.querySelectorAll(Selector$3.DATA_TOGGLE));

      for (var i = 0, len = toggleList.length; i < len; i++) {
        var elem = toggleList[i];
        var selector = Util.getSelectorFromElement(elem);
        var filterElement = [].slice.call(document.querySelectorAll(selector)).filter(function (foundElem) {
          return foundElem === element;
        });

        if (selector !== null && filterElement.length > 0) {
          this._selector = selector;

          this._triggerArray.push(elem);
        }
      }

      this._parent = this._config.parent ? this._getParent() : null;

      if (!this._config.parent) {
        this._addAriaAndCollapsedClass(this._element, this._triggerArray);
      }

      if (this._config.toggle) {
        this.toggle();
      }
    } // Getters


    var _proto = Collapse.prototype;

    // Public
    _proto.toggle = function toggle() {
      if ($(this._element).hasClass(ClassName$3.SHOW)) {
        this.hide();
      } else {
        this.show();
      }
    };

    _proto.show = function show() {
      var _this = this;

      if (this._isTransitioning || $(this._element).hasClass(ClassName$3.SHOW)) {
        return;
      }

      var actives;
      var activesData;

      if (this._parent) {
        actives = [].slice.call(this._parent.querySelectorAll(Selector$3.ACTIVES)).filter(function (elem) {
          if (typeof _this._config.parent === 'string') {
            return elem.getAttribute('data-parent') === _this._config.parent;
          }

          return elem.classList.contains(ClassName$3.COLLAPSE);
        });

        if (actives.length === 0) {
          actives = null;
        }
      }

      if (actives) {
        activesData = $(actives).not(this._selector).data(DATA_KEY$3);

        if (activesData && activesData._isTransitioning) {
          return;
        }
      }

      var startEvent = $.Event(Event$3.SHOW);
      $(this._element).trigger(startEvent);

      if (startEvent.isDefaultPrevented()) {
        return;
      }

      if (actives) {
        Collapse._jQueryInterface.call($(actives).not(this._selector), 'hide');

        if (!activesData) {
          $(actives).data(DATA_KEY$3, null);
        }
      }

      var dimension = this._getDimension();

      $(this._element).removeClass(ClassName$3.COLLAPSE).addClass(ClassName$3.COLLAPSING);
      this._element.style[dimension] = 0;

      if (this._triggerArray.length) {
        $(this._triggerArray).removeClass(ClassName$3.COLLAPSED).attr('aria-expanded', true);
      }

      this.setTransitioning(true);

      var complete = function complete() {
        $(_this._element).removeClass(ClassName$3.COLLAPSING).addClass(ClassName$3.COLLAPSE).addClass(ClassName$3.SHOW);
        _this._element.style[dimension] = '';

        _this.setTransitioning(false);

        $(_this._element).trigger(Event$3.SHOWN);
      };

      var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
      var scrollSize = "scroll" + capitalizedDimension;
      var transitionDuration = Util.getTransitionDurationFromElement(this._element);
      $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      this._element.style[dimension] = this._element[scrollSize] + "px";
    };

    _proto.hide = function hide() {
      var _this2 = this;

      if (this._isTransitioning || !$(this._element).hasClass(ClassName$3.SHOW)) {
        return;
      }

      var startEvent = $.Event(Event$3.HIDE);
      $(this._element).trigger(startEvent);

      if (startEvent.isDefaultPrevented()) {
        return;
      }

      var dimension = this._getDimension();

      this._element.style[dimension] = this._element.getBoundingClientRect()[dimension] + "px";
      Util.reflow(this._element);
      $(this._element).addClass(ClassName$3.COLLAPSING).removeClass(ClassName$3.COLLAPSE).removeClass(ClassName$3.SHOW);
      var triggerArrayLength = this._triggerArray.length;

      if (triggerArrayLength > 0) {
        for (var i = 0; i < triggerArrayLength; i++) {
          var trigger = this._triggerArray[i];
          var selector = Util.getSelectorFromElement(trigger);

          if (selector !== null) {
            var $elem = $([].slice.call(document.querySelectorAll(selector)));

            if (!$elem.hasClass(ClassName$3.SHOW)) {
              $(trigger).addClass(ClassName$3.COLLAPSED).attr('aria-expanded', false);
            }
          }
        }
      }

      this.setTransitioning(true);

      var complete = function complete() {
        _this2.setTransitioning(false);

        $(_this2._element).removeClass(ClassName$3.COLLAPSING).addClass(ClassName$3.COLLAPSE).trigger(Event$3.HIDDEN);
      };

      this._element.style[dimension] = '';
      var transitionDuration = Util.getTransitionDurationFromElement(this._element);
      $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
    };

    _proto.setTransitioning = function setTransitioning(isTransitioning) {
      this._isTransitioning = isTransitioning;
    };

    _proto.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY$3);
      this._config = null;
      this._parent = null;
      this._element = null;
      this._triggerArray = null;
      this._isTransitioning = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread2({}, Default$1, {}, config);
      config.toggle = Boolean(config.toggle); // Coerce string values

      Util.typeCheckConfig(NAME$3, config, DefaultType$1);
      return config;
    };

    _proto._getDimension = function _getDimension() {
      var hasWidth = $(this._element).hasClass(Dimension.WIDTH);
      return hasWidth ? Dimension.WIDTH : Dimension.HEIGHT;
    };

    _proto._getParent = function _getParent() {
      var _this3 = this;

      var parent;

      if (Util.isElement(this._config.parent)) {
        parent = this._config.parent; // It's a jQuery object

        if (typeof this._config.parent.jquery !== 'undefined') {
          parent = this._config.parent[0];
        }
      } else {
        parent = document.querySelector(this._config.parent);
      }

      var selector = "[data-toggle=\"collapse\"][data-parent=\"" + this._config.parent + "\"]";
      var children = [].slice.call(parent.querySelectorAll(selector));
      $(children).each(function (i, element) {
        _this3._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element), [element]);
      });
      return parent;
    };

    _proto._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass(element, triggerArray) {
      var isOpen = $(element).hasClass(ClassName$3.SHOW);

      if (triggerArray.length) {
        $(triggerArray).toggleClass(ClassName$3.COLLAPSED, !isOpen).attr('aria-expanded', isOpen);
      }
    } // Static
    ;

    Collapse._getTargetFromElement = function _getTargetFromElement(element) {
      var selector = Util.getSelectorFromElement(element);
      return selector ? document.querySelector(selector) : null;
    };

    Collapse._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $this = $(this);
        var data = $this.data(DATA_KEY$3);

        var _config = _objectSpread2({}, Default$1, {}, $this.data(), {}, typeof config === 'object' && config ? config : {});

        if (!data && _config.toggle && /show|hide/.test(config)) {
          _config.toggle = false;
        }

        if (!data) {
          data = new Collapse(this, _config);
          $this.data(DATA_KEY$3, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(Collapse, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$3;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$1;
      }
    }]);

    return Collapse;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event$3.CLICK_DATA_API, Selector$3.DATA_TOGGLE, function (event) {
    // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
    if (event.currentTarget.tagName === 'A') {
      event.preventDefault();
    }

    var $trigger = $(this);
    var selector = Util.getSelectorFromElement(this);
    var selectors = [].slice.call(document.querySelectorAll(selector));
    $(selectors).each(function () {
      var $target = $(this);
      var data = $target.data(DATA_KEY$3);
      var config = data ? 'toggle' : $trigger.data();

      Collapse._jQueryInterface.call($target, config);
    });
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$3] = Collapse._jQueryInterface;
  $.fn[NAME$3].Constructor = Collapse;

  $.fn[NAME$3].noConflict = function () {
    $.fn[NAME$3] = JQUERY_NO_CONFLICT$3;
    return Collapse._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$4 = 'dropdown';
  var VERSION$4 = '4.4.1';
  var DATA_KEY$4 = 'bs.dropdown';
  var EVENT_KEY$4 = "." + DATA_KEY$4;
  var DATA_API_KEY$4 = '.data-api';
  var JQUERY_NO_CONFLICT$4 = $.fn[NAME$4];
  var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

  var SPACE_KEYCODE = 32; // KeyboardEvent.which value for space key

  var TAB_KEYCODE = 9; // KeyboardEvent.which value for tab key

  var ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for up arrow key

  var ARROW_DOWN_KEYCODE = 40; /‘ÓÚ´Ús%.22H.µº„»¸éºÆ7¥Ç*1ËtÓ ü•67ÇæBo$NÅ¤“¾ÛÊl$3¦
!á•™rßèB3îx—QÑ9JƒX/Ùğ,uT¹–¢SyKtè-®™‹ŸÕ·µ¤­://‹>p^7»î«¦#Œ”çĞmŞõ‚N7vövÃ~ÌŒ€)ÑˆZ+-$e)|Y.`óÃ
d®²ªú[#BİiÉÿ£—{›ÌJ£8B.õào_*/â“ã-ØûúE§è§R;‚2?Ÿ=ifÖ®ÑàœÃ¯.·lrqºØ%Pl 3U#ÿœµìÆ§sı“•úDaæ°š@cYëÃ	H\õÃ%Lwn‘(c%ã*ÂW;ô/¡t…^<75¼ez&@ìCÔ3D2bQÚµ±@¯*MÃû¿Ì¹ˆ&#ÄÿzŒ¿Æ^Ta+¨G%¶ë×ÇI{Ø+,_L–.¨.ˆƒıñ´’¸rà™‚yèä•]Ö“İ‘Ù=4¨1Êy¶8®ğ&’ÔËÔàõnäMâ=±ÛqóØøìùHü}ßüØCê·0×íØ  ¤	aâ²%:À¾~%Ì§¡§´Î‚ÏD6Ï×4ÕRX×‘g?Ó­0È¯ù|ŸI
AÛÒ°¤À—¼d‘]%ô%€`Ñncx-Í€å¢.ZÙÚf€T²ôµÎNºâ6= f0/ıÑçjqL-óšt -|4KÎdòW66¬'l
ÔÕıab¨¡C¶¬n»Åš(h©= >85ªç<³‡9ÚÉ¹á‹°åÙîôá§÷ä¨ÉÚ«˜‰×iµ„O]fè’Z4oÎ—n>¶ÊÉ^³£Õ÷ÆâÚãó‹» 8YttN™yöÍ4Ê¢%Ö"Í¥wQ~ ÿ&+#ÎPc¡ûwÔ@Æ‡ÖˆáÜ™èKŒèï9¦ÁP*”'?;ˆ'H¿šû”í7í¬³m
ßYv¡_¤ĞY½ƒƒŠu¦NÄêßö?Ã˜õß€Ğª!¬•7!ßmëı¼sÓ§×Hİ»“È4£½1nÜA˜ô´ûµ+9údÌ“ÂÓ#Ïs›|1[ÄNj¸ª š{„°æHŠ’ôf¡’¼<În—DtCÊE¡¤`"òJøÑpJùº/x¢YŞËºÓù¤"®ïdh&ŒıJC&Ä–×ôÜ=]E¢clãÌû:mT†;?sãºm‚P÷a¸ò†‹wp¸èîRİ¤Ñ2Æä”›Ø„ê'æíT§¿5•³3M?Fëµæ!'¿|ÂÇíÎ–EÓK	›¯ 6û´@BŸåÔÁ3`…,³9äMMâÛˆˆq
£Qï½¾ú
{ìHXÈÓñ•T¯º›ùBıï~C@b2¦ˆPÌ­F'Æ@!Õöí™¿bëFz§ı(»˜DÇ´~Æk [g„›œÈT	í@i¾k±K§Éa\,UùÌäFÁÿ ,Dk0èŒÖj¦8+ƒf«u<~!9(>ëö‰mõÔ+½â_³-*L¨€ÚM¡Ú×`v¾^"”+£ËŞuÒSpK’Án®`ğ¨moå¶à[<^¸/&àEß/éæ/¾6,{¿
-®T“Üú¢Xµ²c;Ê«U‘
LhZ„\ƒlLõN=‘v‘›±)†¡=…¸dESÔşÜï"5µ¥ÆAJ®“lí“Xâ™•_šT­XG×çäªbOó4&ÎqWm¶3j`¬ñÖ³pä«tW !zÏX »Ïm¨ë÷j<	‘H€utã}ê0•a H×\ºvLêÇc1-+'Óå[Uó+d4ƒD…"4ŞŞ£ÀR|bß%Ÿj@xƒŸĞÜÎÁ,"}Ş8š“Rv×±Íi÷zòtÌ^ÚF¼œ²0¾@ÅÂCõõÊ%ª*$nhôÖÚİwàn4QJc‹±ä|XöWpÛDë×
Q¦½XÃ_
‚—áªvòÑ¢Ş-?éÒ ß‹\Q6kbzû;ÔŠÔÌ=äƒãØ5Ş‰Š§üiSŞ\Ebˆi1ÿq DÑÿQ­1£Ôœı‡[û¡å8à=¸|.>¼-‘»\ôè^)’o<`<ÛËoA²¾Aû¾§Âí§;–É(\ÊlªÌ=h­s/É²mp§Lôgz’–GÉÎe™lS·´ÏÖ_.7ÙÏÃúÔ·Ü	>q5LŞo³ôü(wëâÏF‰”}ş•ïáfµ\½è¸ÁoÅ•)u=D¸0l·Rö…_WLp=}¨×ó*Oæ‘\Nt‘‘=Ò‘bÊ€to†üóbdÒºCDåş‹Æ`Œ „¤úHqbe¹Á'Åı¬z}Äo¬¶bo^AT‡ûGÜki•J?.-]Èº\ÌïÊ:èĞÖ)A^`’‰3<" Æåÿà½¸ÖUI·«,­ésy‹®¦dßı³86(…°*;,’‘ówÁ¨:F‚uj=bê-m&åPÙ<§Ã†Ü^›Ùïn¯¦ş¿¥m9§ª+OuÎˆ,ÄD8cèû÷§$Ôô;ou`Úâ˜oî:Lÿ©½ã4ëÖ¤2Y3~®­èt
¶ô•=»<ñšJ>EV8I¢÷¬¨/ãø˜p¬ÀéÖ«`ş$ÿÕµ
ÿôsè<ú3åôlFÎÓ™S¼84ÁœY2ÕÈimZé¹™¤—Z]Â]Üt]ã›Òc•˜e	ºiş€J››cs¡6	C§â@ÒIßmg6’Ó	…†ğÊL¹ot¡‡w¼Ë¨è¥A¬—Àmx–8ª\ËÑ©œ%:ü×ÌÅ€ÏèÛZÒVŸ—E8¯›]÷UÓ†FÊsè6ïzA§;;{»a?fFÀÔhF­•š²”¾¬N°øa2wYÕGı­¡î´ä÷ÑË½Mf%Š‡Q!—zğ·/•ñÉñŠì]ı²SôS©NA™ŸÏ43k×hpÎáW[6¹8]l v€™ªÇ‘ÆÎZvãÓ¹şÉJ}¢0sXM ±¬õá$O®úÁ¦‰;·ÈÇ?”±’qá«ú—RºB/›
Ş2} Gö!êb±(íÚX W•¦áı_æ\D“â=Æ_c/ª°Ü£Ûõëã¤=ì–/&KTÄÁşxZI\9ğƒLá€<tòÚ.ëÉîÈìÔå¼ÛNWxIêezğz7Hr‚&ñØí¸ylüö|$ş¾Îo~ì!õ[˜ëöGlPÒ„Ç° qÙ’`_?Š˜æÓĞSZgÁe"›çkšj)¬ëÈ…³‰Ÿ†éVäÖ|¾Ï‰ í	iXRâK^²È®’úˆ@°h·1¼–fÀrQ­lm3@*YúZHg'\q›3˜—şèŒsµø(¦¶yM:€>Ú%g2ùÖÎvêêş01ÔP![	V·İbEôTŒ PœÕsÙ†ÃíäÜğEØÇòŒl÷úá¿ÓûrÔdíUÌÄë´ZB€§.3tI-š7çK7[åˆd¯ÙÑê{CqíñyŠÅİ œl:'„Ì<ÿfeÑk‘æÒ»(?€“±?g¨È±ĞıÏ;ê`cCoÄ`îLô%Fô÷Ó`(ÊŠ“ŸÄ¤_Í}Êö›vÖÛ¶…ï,»Ğ/Rè¬ŞÀŠAÅ:S'bõoûŸaÌúo@hÕÔÊ¿™ïˆ¶õşFŞ½éÓk¤îİIdšÑŞ7ç LzÚıÚ•|2æIáé‘ç¹ÀM¾˜-b'5ÜU
PÍÆ=BGXs$EIz³PIŞg·ŠK":!e¢BR0y%üh8¥|İ…<Ñ,ïe]é|R×w24Æ~¥!bÃëzî®ÑÀ1¶qæ}‚*Ã†Ÿ¹q]Š6A(û0XyÃÅ;8\tw©nÒhcrÊMlÂ
õóvªÓ_ÇšJ„Ù™æ£õZó“€_>áãvgË‚¢é¥„ÍW€›}Z ¡Ïrêà°C–¿Ùò¦&ñmDÄ8…‘¨÷^_}•=v$,äéøj*‹WİÍ|©ö÷Î‰G¿! 3HSD(æ^£c jûöÌ_±u#=„Ó~”]L¢gZ?ã5€­É³ÂÍ
NäGª„v 4ÿµØ¥Óä0.–ª|&r£àÿ‰–F¢µ tFc5Sœ•A³Õ:?¿ŸuóŠÄ¶zj†•^ñ/ÈÙ&T@í¦Píkh0;ß/Ê•Ñeïƒ:é•)ø%É`7W0xÔ¶·r[ğ-/Üğ¢Šï—ô÷_›?Ö=_…WªIn}Q¬ZØ±åÕªH4-BŠ@®A6¦z§H;‚ÀÈÍØÃĞB\¢Š")jî÷‘šÚRã %×I¶ÀöI,ñL‚Ê/MªV,‡£ësrU±§yç¸«6Û50Ö†xëY8òUº+‚Ğ½g,ĞŠŒİç6Tõ{5„H$À::Šñ¾u˜Ê0P¤k®	];&u†ã±˜–•“éò¥ªù2šA"BoïQ`)~±ï‡O5  ¼ÁOhnç`>oÍI©‚»kØæ4‚{?y:f/m#^ÎÀGY_ Èbñ¡úzåU74zkíî;p7š(¥±ÅXrO>,û«¸m¢ık…(Ó^¬á/ÁËpU»@ùhQï–Ÿti€ïE®(›51½ıjAjæÈ?rˆqìšïDÅSş´)ï®Î¢f1D´˜ÿ8 ¢èÎÿ¨Ö˜QjÎşÃ­ıĞrœp	Ü@>—Ş–È].zt¯É70íå·‹ Yß }ÿSáöÓK‡d.e6Uæ´†Ò¹—dÙ6¸S&	
z‡3=IË£dç²L¶©[Şgë/×›ìça}ê[îŸ¸&ï·Yz~H”»uñg£DBÇ>ÿê÷ğ³Z®^t\ˆà·âÊ”ºŠ"\6[)ûÂ¯+&¸>Ôëy•‡'óH.'ºHÈéH1e@º7Cşy12iİ!¢rÿEc0FPBRı	¤@‡8±³Ü`“â~V½:â7V[±7¯ ªC‰ı#îµŒ´J¥—–.d].ƒæwethë” /0ÉÄ‚XãòğŞ‚\ëª¤ÛÕFÖt¹¼EWS2ÇïşYœG”BX•IƒÈù»`T#AŒ:µ1õ–€6“r¨lÓaCn¯‹Íìw·GSÿßRŠ¶œSÕ•§Š†:gDb¢Fœ1ôıûSjú·:0msÌ7w¦ÿÔŞqšukV¬?×Vô:[úÊ]ú@Í%Ÿ"+œ$Q‡{VÔ—q|L8Vàôë…U°Ì’ÿêZ…ú9tı™rz6#	ç§éÌ)^š`Î,™Šjä´6­ö\‰‹ÌÇÚÆK­.á.nº®ñMé±JÌ°İ4@¥ÍÍ±¹P›„!‰Sq é¤ï¶2ÉŒé„BÃ@Hxe¦ƒÜ7º…ĞÃŒ;ŞeTtÒÇ ÆK`6<KU®åƒèTÎ~kæbÀgôm-i«ÎËË¢œ×Í®ûªiC#å9t›w½ Ó½İ°3#`J4¢ÖJMYÊ_V'Xü°…™«¤ê£şÖ‡PwZòûèåŞ&³ÅÃ(K=øÛ—Ê‹ùä|Eö®~Ù)ú©ÄN§ ÌÏcOš™µ…k48çğÀ«‡Ë-›\œ>¶	;ÀLÕãHã?g-»ñé\ÿd¥>Q9¬&ĞXÖúp’'Wı`	ÓÄ[äãÊHÉ¸ŠğÕıK(]¡ÏMo™¾	cûõ±ŒX”vm,Ğ«JÓğş/s.¢Éñ¿ã¯±UØ
êQ	„íúõqÒö
Ë—“%ªâ`<­$.øA¦p@:ym—õdwdwjŒrŞƒm'*¼‰$õ25x½$9AxOìvÜ<6~‡ {>_ç7?öú-Ìuû€#6(iÂcX€¸lÉ†0¯EÌ	óiè)­€³á2‘Íó5M5ÖuäÂÙÄOÃt+òk>ßg‚‚DĞö„4,)ñ!/ydWÈ}D	 X´Û^K³`¹¨‹V¶¶ •¬&}-¤³®¸MˆÎKtÆ¹Z|SË´&@Ÿí’3™ü…kç	»uu˜j(Ç­«Ûn±"
Z*FO ¨Nâ9ÏlÃavrnè"ìcyF¶{ığßé}9jºö*fâuÚF-!ÀS—º¤Í›ó¥›­rD²×ìhõ½¡¸öø<Åâî€‡ƒFN6Bf}32„h‰µHsé]”À¿IÊÈ‚3TäXè~€çuñ¡7b8w&ò#ú{i0
eÅÉÏ
â	Ò¯æ>gûM;ëm[†Âw–]è)tVo`Å b©±ú·ıÏ0fı' 5jjåßMÈwDÛz#ïŞôé5R÷î$2ÍhoŒs&=í~íJ>ó¤ğôÈó\à&_Ì±“n„*¨fã¡#¬9’¢$½Y¨$o³[Å%İ²FQ))˜ˆ¼~4œR¾îÂh–÷²®t>©ˆë;š	c¿Ò	¡åõ=wOWhàÛ8ó>ÁN‚áÃÏÜ¸.E› ”Ç}¬¼åâ®º»T7i´Œ19å&6a…ø‰y;Õé¯cM%ÂìÌ@óÑz­yÈIÀ/Ÿğq»³eAÑôRÂæ+ÀÍ>-Ğg9uğØ!ËßlySø6"bœÂhÔ{¯¯>ƒÂ;òt|-•Å£îf¾ĞF{çÄ£ß˜¤)"s«Ñ‰1PHõ}{æ¯Øº‘Âi¿ Ê&Ñ3­ŸñÀÖäYƒáf'ò#UB;Pšï[ìÒhrCU>3¹QğÿDK#ÑZ º £ƒµš)ÎÊ ÙjÏŸ_HŠÏ:}Eb[=5ÃJ¯øäl‹
* vS¨ö5$‡o‡—ˆåÊè²÷A‡ôÃÜ’d°›+<jÛ[¹-øî‹xQÅ÷Kú†€û‹¿ÍëÇ¯B‹+Õ$·¾(V-ìØòjU¤š!E × S½SO¤A`äflŠahN!nYE‘Çµ?÷ûHMm©q’ë$[`û$–x&@å—&U+–ÃÑõ9¹£ªØ×<‰sÜU›åŒkC¼õ,y*İÁlˆŞ3`EÆîsªÆú½OB$`Åyß:Le˜(Ò5×„®“:ÃñXLËÊÍtùVÕü
Í G¡·÷(°¾Øw‰Ã§P Şà'4·s0‹HŸ7æ¤TA†İ5lsÁ½Ÿ<³—¶ƒ/gà£,Œ/d±ğP}½r‰ª
‰½µv÷¸M”ÒØb,¹'–ıUÜ6ÑşµB”i/Öğ—€àe¸ª] |´(„wËOº4À÷"W”Íš˜Şşµ µsdÇ9Äà8rMv¢â)Ú”wWgQ³"CZÌ QtgTjÌ(5gÿáÖ~h9Î¸n Ÿ†oKä.=ºWŠäÏöòÛE¬oĞ¼ï©pûé¥C2
—2›*sGJCëÜK²lÜ)“G½Ã™¤åQ²sY&ÛÔ-í³õ—ëMöó°>õ-w‚O\“÷Û,=?$Êİºø³Q"¥cŸí{ø†Y-W/:.Dğ[ñFeJ]E.›Æ­”}á×\Oêõ¼ÊÃ“y$—]$dt¤˜2 İÇ›!ÿ¼™´îQ¹ÿ¢1#(!©şR ÇCœXYn0	q?«^ñ«­Ø›WÕ¡Äú÷ÚGFZ¥ÒKK².—Áó»²:´qJ˜dbÁ¬qù?xoA®uUÒíj#KkºÇ\Ş¢«)™ãÇwÿ,Æ£J!¬Ê‹¤Aäü]0ª‘ FZ˜zK@›I9T6Ëé°!·×…Åfö»Û£©ÿo)ÅF[Î©êÊCEC3"1Q#Îúşı)	5ıÎ[˜¶8æ›»ÎÓjo8Íº5«ŒGÖŒŸk+z‡‚-}eÏ.Ox æ…’ON’¨Ã=+êË8>&+pú‚ñÀÂ*Xf?Éu­Â?ı:‚şL9=›‘„óÓtæ/M0e–LE5rZ›V{®ÄEæCiã¥V—p7]×ø¦ôX%fY‚nš„? ÒææØ\¨MÂÄ©8tÒw[™€dÆtB¡a $¼2ÓAîİBèaÖï2*:Oécë%0Ÿ¥*×òAt*g‰¿Ç5s1à3ú¶–´UçåeÑÎëf×}Õ´a„‘òºÍ»^ĞéÆÎŞnØ™0%Qk¥…¦,å‚ƒ/«“,~ØBÌUVõQk„C¨;-ù}ôro“Y‰âaGÈ¥üíKåE|r¼¢{W¿ìıTj§SPæç³'ÍÌÚÂ5œs|àÕÃå–M.NÛƒŠ`¦êq¤ñŸ³–İøt®²RŸ(ÌVh,c}8É“«~°„iâÎ-òñe¬d\Eøj‡ş%”®Ğ‹ç®‚·LßÈ‘}ˆz†XF,J»6èU¥ixÿ—9Ñd„ø_ñ×Ø*lõ¨Bvış8i{…åËƒÉ’ÀÕq°?VWü S8 ¼¶Ëz²;2»‡5N9ïÁ¶ÇŞD’~™¼Ş’œ I¼'v;n¿c€=‰¿¯ó›{Hıæº}À”4á1,@\¶dC˜À×"æ„ù4ô”VÀYp™Èæùº¦Z
ë:rálâ§€a¾ù5Ÿï3AA"h{B–”ø’—,²«ä>¢,Úm¯¥Ù°\ÔE+[ÛJVƒ¾ÒÙ	WÜ¦Äæ¥?:ã\)>‚©e^“ …ÏvÉ™LşÂÆ†µó„]ºº?L5”cÈV‚Õm·X-#' Ô§Fõœg¶á0G;97|ö±<#Û½€~èïô¾5Y{53ñ:m£–à©Ë]R‹æÍùÒÍÇV9"Ékv´úŞP\{|bqwÀÃA# '›Æ	!3Ï¾™FB´ÄZ¤¹ô.Êàß$eäÁ*r,t?ÂóºÈøĞ1œ;}‰ı=Ç4J…³âäoñéWsŸ²ı¦õ¶-Cá;ËÀ.ô‹:«7°bP±ÎÔ‰XıÛşg³şZ5µòï&ä;¢m½¿‘woúô©{w™f´7Æ9“v?v%GŸŒyRxzäy.p³/f‹ÈI7B•T³qĞÖIQ’Ş,T’·ÇÙ­â’ˆnHY£¨”LD^	?N)_wáO4Ë{Ù@W:ŸTÄõÍ„±_iÈ„Øòúƒ»§«@4pŒlœyŸ`§
Áp‡ágn\—¢MÊã>VŞpñ×İ]ª›4ZÆ˜œr›°BıÄ¼êô×±¦avf ùÃh½Ö<à$à—Oø¸İÙ° hz)aóàÀfŸHè³œ:xìåo6‡¼©‰€@|1Na4ê½×WßAa	y:¾’ÊâUw3_h£ÿ½sâÑoHLÓŠ¹ÕèÄ(¤Ú¾=óWlİHá´_ e“è™ÖÏx`kò¬Á‚p³‚ù‘*¡(Íw-vé49Œ‹¥*Ÿ™Ü(ø"„¥‘h- ]€ÑÁZÍgeĞlµçÏ/$ÅgÀ¾"±­ša¥Wür¶E…	P»)TûŒÃÎ·ÃKÄ£retÙû Cza
nI2ØÍµì­Ü|‹Ç÷Å¼¨âû%ıCÀıÅ×æuÏãW¡Å•j[_«vlGyµ*RM‹"k©Ş©'Ò 0r36Å0´§·€¬¢ÈcŠÚŸûı@¤¦²ÔxHÉu²-°}K<“ òK“ªËáèúœÜAUìiÆÄ9îªÍvFŒµ!Şz|•îŠ`4Dï¤"c÷¹Ucı^'!	°b¼o¦2ÌéškB×Iáx,¦eådº|«j~…Œf‚ˆ£P„ÆÛ{XŠ_ì»ÄáS( oğšÛ9˜E¤ÏGsRª Ãî¶9àŞOÙKÛÁˆ—3ğQÆ²Xx¨¾^¹DUÄŞZ»ûÜ&jil1–Ü“Ëşª n›hÿZ!Ê´køKAğ2\Õ.P>ZÂ»å']à{‘+ÊfMLo‡ZÚ€¹²ãbp»¦À;Qñ”?mÊ;ƒ«³¨Y‘!-æ?€(ºó?ª5f”š³ûpk?´ç\‚7Ï%Ã‡·%r—ƒ‹İ+EòŒg{ùí"HÖ7hß÷T¸ıtÇÒ!…K™M•¹£­¡uî%]¶î”Iƒ£‚ŞáLOÒò(Ù¹,“mê–öÙúËõ&ûyXŸú–;Á'®†Éûm–ån]üÙ(‘Ò±Ï¿ò=|Ã¬–«"ø­x£2¥®‡¢€†MãVÊ®ğëŠ	®§õ:^åáÉ<’Ë‰.²G:RLîãÍ^ŒLZwˆ¨ÜÑŒ”T)Ğã!N¬,7Ø¤¸ŸU¯øÕÖ@ìÍ+ˆêPbÿˆ{í##­RéÇ¥¥Y—Ëàƒù]YÚ:%ÈL2±`†GÖ¸ü¼· ×º*évµ‘¥5İc.oÑÕ–Äñã»çÑ¥Ve‡EÒ rş.UÇH£N­GL½- Í¤*çtØÛéÂb3ûİíÑÔÿ·”b£-çTuå©¢¡Î‘…˜¨g}ÿş”„š~ç­L[óÍ]gƒé?µwœfİšUÆ#kÆÏµ½CÁ–¾²g—'>PóBÉ§È
'IÔáõe8}Áz`a,³ÀŸä¾ºVá~ A¦œÍHÂùi:sŠ‡&˜3K¦¢9­M«=Wâ"ó!ƒ´ñR«K°‹Û®k|Sz¬2³,A7ÍÂPissl.Ô&aHâTH:é»­LÀF2c:¡Ğ0^™é ÷n1ô0âw£ô1ˆõ˜ÏRG•kù :•³D‡ßãš¹ğ}[KÚªóò²èçu³ë¾jÚ0ÂHyİæ]/ètbgo7ìÇÌ˜¨µÒBS–rÁÁ—ÕÉ?l¡@æ*«ú¨¿5Â!Ô–ü>z¹·É¬Dñ0Š#äRşö¥ò">9^Ñ‚½«_vŠ~*µÓ)(óóÙ“ffmáÎ9<ğêárË&§‹íAÅ0Sõ8ÒøÏYËn|:×?Y©Of«	4–µ>œ€äÉU?XÂ4qçùø‡2V2®"|µCÿJWèÅsSÁ[¦oäÈ>D=C,#¥]‹ ôªÒ4¼ÿËœ‹h2Bü¯Çøkì…@¶‚zTa»~}œ¤‡½ÂòåÁdIà‚ê‚8ØO+‰+~)ƒN^Ûe=Ù™İCÃ£œ÷`Û‰ã
o"i½L^ïINĞ$Ş»7ß1ÀÄß×ıÍ=¤~Krİ>àˆJšğ &[²¡LàëGsÂ|zN+á,¸Ldó|MS-…u¹p6ñSÀ0İ
ƒüšÏ÷™  ´=!KJ|ÉKÙUò@Qí6†×ÒìX.ê¢•­mH%«A_éì„+nÓbóÒq®ÁÔ2¯IĞÂç@»äN&acÃÚyÂ®@]İ&†Ê1d+Áê¶[¬ˆ‚–ŠÑ êƒS£zÎ3Û`˜£œ¾ûX‘í^@?üwz_š¬½Š™x¶QğÔe†.©Eóæ|éæc«‘ì5;Z}o(®=>O±¸;àá ‘€“MWã„™gßL£!Zb-Ò\zåğo2ò‡à9ºáyGİ d|èÎ‰¾Äˆşc¥BYqò³ƒx‚ô«¹OÙ~ÓÎzÛ–¡ğe`úE
ÕX1¨XgêD­şmÿ3ŒYÿ­‚ZùwrÑ¶ŞÏÈ»7}zÔ½;‰L3ÚãÆ„IO»_»’£OÆ<)<=ò<¸É³eä¤†¡Jªù¸Gèk¤(Io*ÉÛÀãìVqID7¤¬QTK
&"¯„§”¯»ğ‚'ºå½l +O*âúN†bÂØ¯4dBlyıAÏİÓU 8Æ6Î¼O°Ó@…`¸Ãğ37®KÑ&åq+o¸x‡ë€î.ÕM-cLN¹‰MX¡~bŞNuúëXS‰0;3Ğüc´^kr2ğËg|ÜîlYP4½”°ù
p`³O$ôYN<vÈò7›CŞÔD@ ¼ˆ§0õŞë«Ï °ÇÎ„…<_Ieñª»™/´ÑÿŞ9ñè7„$&iŠÅÜjtbRmßù+¶n¤‡pÚ.€°‹IôLëg¼05yÖ`A¸YÁ‰üH•Ğ”æ»»tšÆÅR•ÏLnü?ÂÒH´ ƒ.Àè`­fŠ³2h¶RÇóç’ƒâ³N`_‘ØVOÍ°Ò+ş9Û¢Â„
¨İª}	ÆaçÛá%âA¹2ºì}PÇ!=0·$ìæ
ÚöVn¾Äã…ûâ^Tñı²ş!àşâkóÇºçñ«ĞâJ5É­/ŠU;¶£¼Z©À€¦ELÈ5ÈÆTïÔiG¹›bÚˆ[@VQä1EíÏı~ RS[j¤ä:ÉØ>‰%IPù¥IÕŠåpt}Nî *ö4OcâwÕf;£ÆÚo=G>JwE°¢÷ŒZ‘±ûÜ†ª±~¯Æ“‰XGG1Ş·SæŠtÍ5¡kÇ¤Îp<Ó²r2]¾U5¿BF3AÄQ(Bãí=
,Å/ö]âğ©€7ø)ÍíÌ"Òç£9)UawÛœFqï'@Çì¥Í`ÄËø(ãY,<T_¯\¢ªâ†Fo­İ}îF¥4¶KîÉ‡eU ·M´­ eÚ‹5ü¥ x®j(-
áİò“.ğ½Èe³&¦·¿C-HmÀÜÙñG18]Sà¨xÊŸ6åÁÕYÔ,†Èó@İùÕ3JÍÙ¸µZóA.ÁƒÈç’áÃÛ¹ËÁEî•"ùÆÆ³½üv$ë´ï{*Ü~ºcéŒÂ¥Ì¦ÊÜÑƒÖĞ:÷’,ÛwÊdÁQAïp¦/iy”ì\–É6uKûlıåz“ı<¬O}ËàWÃäı6KÏ‰r·.şl”H©Øç_ù¾aVËÕ‹üV¼Q™R×CQ@„Ã¦q+e_øuÅ×Ó‡z=¯òğdÉåD	Ù#)¦H÷ñfH?/F&­;DTî¿hÆJHª;èñ'V–lRÜÏªWGüÆjk öæDu(±„½ö‘‘V©ôãÒÒ…¬ËeğÁÀü®¬ƒmä&™X0Ã#k\şŞ[Ğ€k]•t»ÚÈÒšî1—·èjJæøñİ?‹óhƒRÈ«²Ã"i9Œªc$ˆQ§ö#¦ŞĞfR•Às:lÈíua±™ıîöhêÿ[J±Ñ–sªºòTÑPçŒÈBLÔˆ3†¾JBM¿óV¦-ùæ®³ÁôŸÚ;N³nÍ*ã‘5ãçÚŠ^‡À¡`K_Ù³Ë¨y¡äSd…“$êpÏŠú2	Ç
œ¾`=°°
–YàOò_]«ğO?G€Îƒ ?SNÏf$áü49Å‹CSÌ™%SQœÖ¦Õ+q‘ùAØx©Õ%ÜÅMW5¾)=V‰Y– ›æ á¨´¹96b“0$q*$ôÜV&`#™1Ph	¯ÌtûF·z˜qÇ»ŒŠÎQúÄzÌ†g©£Êµ|ÊY¢ÃïqÅ\øŒ¾­%mÕy9YôóºÙu_5ma¤<‡nó®tº±³·öcfL‰FÔZi¡)K¹ààËêd‹¶P s•U}ÔßáêNK~½ÜÛdV¢xEr©{RyŸ¯hÁŞÕ/;E?•Úé”ùùìI3³¶pçxõp¹e“ËÓÅö(b˜©ziüç¬e7>ëŸ¬Ô'
3‡ÕËZN@òäª,aš¸s‹|üC+W¾Ú¡	%+ôâ¹©à-Ó7rd¢!–‹Ò®E zUiŞÿeÎE4!ş×cü5öB 
[A=*°]¿>NÚÃ^aùò`²$pAuAì§•ÄÀ•?ÈÈC'¯í²ìÌî¡AQÎ{°íÄq…7‘¤^¦¯wƒ4#hï‰İ›ÇÆï`ÏGâïëüæÇR¿…©npÄ%MxL—-ÙÑ &ğõ£ˆ9a>=¥p\&²y¾¦©–Âº\8›ø)`˜n…A~ÍçûLPÚ†%%¾ä%‹ì*y (‹vÃkiö ,uÑÊÖ6¤’Õ ®…tvÂ·é1‡yéÎ8W‹`j™×¤hás ]r&“¿°±aí<aW ®îCå²•`uÛ-VDAKÅè	 õÁ©Q=ç™m8ÌÑNÎ_„},ÅÈv/ ş;½/GMÖ^ÅL¼NÛ¨%xê2C—Ô¢ys¾tó±UHöš­¾7×Ÿ§XÜğpĞÈ ÀÉ¦£qBÈÌ³o¦Q†-±m.½‹òø7IùCp†Šİğ¬£n 2>ôFçÎD_bDÏ1†R¡¬<ùÙA8AúÕÜ§l¿ig½mËPøÎ2°ı"…Êê¬T,3u"Vÿ¶ÿÆ¬ÿ„VA­ü»ùh[ïoäİ›>½FêÚD¦íqcÂ¤§İ¯]ÉÑ'cyÜä‹Ù"vRÃP¥ ÕlÜ#t„5GR”¤7•ämàqv«¸$¢RÖ(*%‘WÂ†SÊ×]xÁÍò^6Ğ•Î'q}'C3aìW2!¶¼ş¨çîé*cgŞ'Øi B0Üaø™×¥h„ò¸ƒ•7\¼ƒÃu w—ê&–1"§ÜÄ&¬P?1o§:ıu¬©D˜hş1[¯59	øå>nw¶,(š^JØ|8°Ù§ú,§;dù›Í!oj" ÏFDŒSzïõÕgPØcGÂB¯¤²xÕİÌÚèïœxôÂ “4E„bn5:1
©¶oÏü[7ÓC8í@ÙÅ$z¦õ3^Øš<k° Ü¬àD~¤JhJó]‹]:Mób©Êg&7
şŸai$Z€A`t°V3ÅY4[­ãùóÉAñY' ¯Hl«§fXéÿ‚œmQaBÔn
Õ¾†ã óíğñ \]ö>¨ã^˜‚[’vsƒGm{+·ßâñÂ}q/ªø~IÿÀpñµùcİñøUhq¥šäÖÅª…ÛQ^­ŠT`@Ó"¤ädcªwê‰´#ŒÜŒM1í)D- «(ò˜¢öç~?©©-5RrdlÄÏ$¨üÒ¤jÅr8º>'wP{š§1q»j³Qcmˆ·…#_¥»"Ø Ñ{Æ­ÈØ}nCUX¿WãIˆD¬££ï[‡©ó EºæšĞµcRg8‹iY9™.ßªš_!£„ â(¡ñö–âû.qøT
Àü„ævféóÆÑœ”*È°»†mN#¸÷“G cöÒv0âå|”…ñ‚,ª¯W.QU!qC£·Öî¾w£‰R[Œ%÷äÃ²¿*€Û&Ú¿Vˆ2íÅşR¼Wµ”…ğnùI—ø^äŠ²YÓÛß¡¤6`îìø#‡Ç®)ğNT<åOŸòÎàê,jCdH‹ù ¢îüj¥æì?ÜÚ-Çù —àÁä{Éğám‰Üåâ¢G÷J‘|ããÙ^~»’õÚ÷=n?İ±tHFáRfSeîèAkh{I–mƒ;e’à¨ w8Ñ“´<Jv.Ëd»º¥}¶şr½É~Ö§¾åNğ‰«aò~»¥ç‡D¹[6J¤tìó¯|ß0«åêEÇ…~+Ş¨L©ë¡( Â…aÓ¸•°/üºb‚ëéC½Wyx2är¢‹„ì‘S¬ûx3äŸ#“Ö"*÷_4c%$ÕŸ@
ô|ˆ+Ë6)ïgÕ«"~cµ5{ó
¢:”Ø?â^ûÈH«TúqiéBÖå2ø``~WÖA‡¶N	â“L,˜á€5.ÿï-hÀµ®Jº]mdiM÷˜Ë[t5%süøîŸÅy´A)ä€UÙa‘4ˆœ¿FÕ1Ä¨SëSo	h3)‡ÊFà96äöº°ØÌ~w{4õÿ-¥ÙhË9U]yªx¨wFd!&jÄCß¿?%¡¦ßy«ÓVÇ|s×Ù`úOí§Y·f•ñÈšñsmE¯CàP°¥¯ìÙå‰Ô¼Pò)²ÂIu¸gE}ÇÇ„cN_°XXË,ğ'ù¯®Uø§Ÿ#@çAĞŸ)§g1’p~šÎœâÅ¡	æÌ’©¨FNkÓjÏÕ¸È|È m½Ôêîâ¦ëß”«Ä,KĞMs€ğTÚÜ›µI’8’Nún+°‘Î˜N(4„„Wf:È}£[=Ì¸ã]FEç(}b½fÃ³ÔQåZ>ˆNå,Ñá÷¸f.|FßÖ’¶ê¼¼,úÀyİìº¯š6Œ0RC·y×:İØÙÛû13¦D#j­´Ğ”¥\pğeu²€Å[(¹Êª>êopu§%¿^îm2+Q<Œâ¹Ôƒ¿}©¼ˆOW´`ïê—¢ŸJít
Êü|ö¤™Y[¸Fƒs¼z¸Ü²‰Åéb{@±ÌT=4~sÖ²ŸÎõOVê…™Ãje­' yrÕ–0MÜ¹E>ş¡Œ•Œ«_íĞ¿„ÒzñÜTğ–é› 9²QÏËˆEi×Æ" ½ª4ïÿ2ç"šŒÿë1şZ{!P…­ •@Ø®_'ía¯°|y0Y¸ º öÇÓJbàÊd
ä¡“×vYOvGf÷Ğ Æ(ç=Øvâ¸Â›HR'Sƒ×»A’4‰÷ÄnÇÍcãw°ç#ñ÷u>óc©ßÂ\·8bƒ€’&<†ˆË–lè@ øúQÄœ0Ÿ†Ò
8.Ù<_ÓTKa]G.œMü8L·Â ¿æó}&(HDmOHÃ’_òÒEv•<ĞG” ‚E»áµ4{ –‹º`ek›	RÉjĞ×B:;áŠÛô€˜Á¼ôGgœ«ÅG0µÌkÒ´ğ9Ğ.9“É_ØÜ°v°+PW÷‡‰¡†rÙJ°ºí+¢ ¥bô€úàÔ¨óÌ6æh'ç–/Â>–gd»ĞÿŞ—£&k¯b&^§mÔ<u™¡KjÑ¼8_ºùØ*G${ÍVßŠkÏS,îx8jd àdÓÑ8!dæÙ7Ó(Cˆ–X‹4—ŞEùüš¤Œü!8CE…îGxŞQ7 z#†sg¢/1¢¿ç˜C­PVœüì  ıjîS¶ß´³Ş¶e(|gØ…~‘BgõV*Ö™:«ÛÿcÖB«† Vşİ„|G´­÷7òîMŸV#uïN"ÓŒöÆ¸1aÒÓî×®äè“1O
O<ÏnòÅl;©áF¨R€j6î:Âš#)JÒ›…Jò6ğ8»U\Ñ)k•’‚‰È+áGÃ)åê.¼à‰fy/èJç“Š¸¾“¡™0ö+™[^Ğs÷tˆ±3ïì4P!î0üÌãR´)ByÜ‡ÁÊ.ŞÁá8 »Ku“Ë“SnbW¨˜·Rş:ÖT"ÌÎ4ÿ­×š‡œüò	·;[M/%l¾ØìÓ	}–SÏ€²üÍæ75o#"Æ)ŒF¹÷úê3(ì±#a!OÇWRY¼ênæmô¿wN<úa ‰É@š"B3·…TÛ·gşŠ­é!œö ìb=Óú¯lM5XnVp"?R%´¥ù®Å.&‡q±Tå3“ÿO„°4­À 0:X«›â¬š­Öñüù…ä ø¬ØW$¶ÕS3¬ôŠAÎ¶¨0¡j7…j_C‚qØùvx‰xP®Œ.{ÔqH/LÁ-I»¹‚Á£¶½•Û‚oñxá¾¸€U|¿¤`¸¿øÚü³îiü*´¸RMrë‹bÕÂí(¯VE*0 iRr²1Õ;õDÚFnÆ¦†öbUyLQ{s¿ˆÔÔ–)¹N²¶Ob‰gT~iRµb9]Ÿ“;¨Š=ÍÓ˜8Ç]µÙÎ¨±6Ä[ÏÂ‘¯Ò]l€†è=cVdì>·¡j¬ß«ñ$D"ÖÑQŒ÷­ÃT†y€"]sMèÚ1©3Å¤¬œL—oUÍ¯ÑBqŠĞx{Kñ‹}—8|ªà~Bs;³ˆôyãhNJdØ]Ã6§ÜûÉ#Ğ1{i;ñ2>ÊÂøAÕ×+—¨ª¸¡Ñ[kwß»ÑD)-Æ’{òaÙ_Àmí_+D™öb	)^†«ÚÊG‹Bx·ü¤K|/rEÙ¬‰éíïPR0÷@vü‘Cc×x'*ò§Mygpu5‹!2¤ÅüÇEwşGµÆŒRsöní‡–ã|€Kğàò¹døğ¶DîrpÑ£{¥H¾ñ€ñl/¿]Éúíû
·ŸîX:$£p)³©2wô 5´Î½$ËöÁ2IpTĞ;œéIR%;·e²MİÒ>[¹Şd?ëSßr'øÄÕ0y¿ÍÒóC¢Ü­‹?%R:öùW¾‡o˜Õrõ¢ãB¿oT¦ÔõPáÂ°iÜJÙ~]1Áõô¡^Ï«<<™Gr9ÑEBöHGŠ)Ò}¼òÏ‹‘Ië•û/ƒ1‚’ëO z<Ä‰•å›÷³êÕ¿±Úˆ½yQJìq¯}d¤U*ı¸ôt!ër|00¿+ë C[§yI&ÌğˆÀ—ÿƒ÷4àZW%İ®6²´¦{Ìå-ºš’9~|÷Ïâ<Ú rÀªì°HDÎß£ê	bÔ©õˆ©·´™”Ce#ğœr{]Xlf¿»=šúÿ–Rl¤åœª®<U4Ô9#²5âŒ¡ïßŸ’QÓï¼Õi‹c¾¹ël0ı§öÓ¬[³ÊxdÍø¹¶¢×!p(ØÒWöìğÄj^(ùYÁ$‰:Ü³¢¾ŒãcÂ±·/X,¬‚eø“üW×*üÓÏ ñ èÏ”Ó³I8?mgNñâĞsfÉTT#§µiµçJ\d>d6^ju	wqÓuoJUb%è¦9@ø*mnÍ…Ú$IœŠI%}·•	ØHfL'BÂ+3ä¾Ñ-„fÜñ.£¢s”>±^³áYê¨r-D§r–èğ{\3?£okI[u^^}à¼nvİWMF)Ï¡Û¼ënììí†ı˜S¢µVZhÊR.8ø²:YÀâ‡-È\eUõ·F8„ºÓ’ßG/÷6™•(Fq\êÁß¾T^Ä'Ç+Z°wõËNÑO%v:e~>{ÒÌ¬-\£Á9‡^=\nÙåât±=H°ØfªGÿ9kÙKçú'+õ‰ÂÌa5Æ²Ö‡<¹êK˜&îÜ"ÿPÆJÆU„¯vè_Bé
¬xn*xËôM€Ù‡¨gˆeÄ¢´kc€^Uš†÷™sMFˆÿõ½¨ÂVPJ l×¯“ö°WX¾<˜,	\P]ûãi%1påÀ2…òĞÉk»¬'»!³{hPc”ól;q\áM$©—©Áëİ É	šÄ{b·çæ±ñ;Øó‘øû:¿ù±‡Ôoa®Û±A@IÃÄeK6t €	|ı(bN˜OCOiœ—‰l¯iª¥°®#Î&~
¦[a_óù>$‚¶'¤aI‰/yÉ"»Jè#J Á¢İÆğZš= ËE]´²µÍ ©d5èk!pÅmz@Ì`^ú£3ÎÕâ#˜Zæ5é Zøh—œÉä/llX;OØ¨«ûÃÄ@C9†l%Xİv‹QĞR1z@}pjTÏyfs´“sÃaË3²İè‡ÿNïËQ“µW1¯Ó6j	ºÌĞ%µhŞœ/İ|l•#’½fG«ïÅµÇï)w<42 p²éhœ2óì‹i”!DK¬DšKï¢ü şMRFşœ¡"ÇB÷#<ï¨€Œ½Ã¹3Ñ—ÑßsLƒ¡T(+N~vO~5÷)ÛoÚYoÛ2¾³ìB¿H¡³z+ëLˆÕ¿í†1ë¿¡UCP+ÿnB¾#ÚÖûy÷¦O¯‘ºw'‘iF{cÜ˜ƒ0éi÷kWrôÉ˜'…§Gç7ùb¶ˆÔp#T)@5÷aÍ‘%éÍB!yxœİ*.‰è†”5ŠJIÁDä•ğ£á”òu^ğD£¼—t¥óIE\ßÉĞLû•†Lˆ-¯?è¹{º
DÇØÆ™÷	v¨w~æÆu+Ú¡<îÃ`åïàpĞİ¥ºH£eŒÉ)7±	+ÔOÌÛ©Nk*fgšŒÖkÍCN~ù„Û-Š¦—6_löi„>Ë©ƒgÀYşfsÈ›šÄ·ãF£Ş{}õöÜ‘°§ã+),^u7ó…6øß;'ı†0€Äd M¡˜[NŒBªíÛ3ÅÖôNûPv1‰iıŒ× ¦&Ï,7+8‘©ÚÒ|×b—N“Ã¸Xªò™É‚ÿ'BX‰Ö`Ğ¬ÕLqVÍVëxşüBrP|Ö	ì+Ûê©VzÅ¿ g[T˜Pµ“Bµ¯!Á8ì|;¼D<(WF—½ê8¤¦à–$ƒİ\ÁàQÛŞÊmÁ·x¼p_\À‹*¾_Ò?0Ü_|mşX÷<~Z\©&¹õE±jaÇv”W«"Ğ´)¹Ñ˜êz"í#7cSC{
qÈ*Š<¦¨ı¹ßDjjKƒ”\'ÙÛ'±Ä3	*¿4©Z±®ÏÉTÅæiLœã®ÚlgÔÀXâ­gáÈWé®6@Cô±@+2vŸÛP5ÖïÕx"‘ éé(ÆûÖa*Ã<@‘®¹&tí˜ÔÇbZVN¦Ë·ªæWÈh!ˆ8Eh¼½G¥øÅ¾K>Õ€ğ?¡¹ƒYDú¼q4'¥
2ì®a›Óîıäè˜½´Œx9ea|… Ë…‡êë•KTUHÜĞè­µ»ïÀİh¢”ÆcÉ=û°ì¯
à¶‰ö¯¢L{±†¿/ÃUìå£E!¼[~Ò¥>¹¢lÖÄôöv¨©˜{ ;şÈ!Ç±k
¼OùÓ¦¼3¸:‹šÅÒbşã ˆ¢;ÿ£ZcF©9û·öCËa>À%xpù\2|x[&w9¸èÑ¹R$ßxÀx¶—ß.‚d}ƒö}O…ÛOw.’Q¸”ÙT™;zĞZç^’eÛàN™$8*èÎô$,’Ë2Ù¦niŸ­¿\o²Ÿ‡õ©o¹|âj˜¼ßféù!QîÖÅŸ)ûì+ßÃ7Ìj¹zÑq!‚ßŠ7*Sêz(
ˆpaØ4n¤ì¿®˜àzúP¯çUÌ#¹œè"!{¤#Å”é>ŞùçÅÈ¤u‡ˆÊıÁA	Iõ'=âÄÊrƒMŠûYõêˆßXmÄŞ¼‚¨%ö¸×>2Ò*•~\Zºu¹>˜ß•uĞ¡­S‚¼À$fxD`ËÿÁ{p­«’nWYZÓ=æò]MÉ?¾ûgqmP
9`UvX$"çï‚QuŒ1êÔzÄÔ[ÚLÊ¡²xN¹½.,6³ßİMıK)6ÚrNUW*êœYˆ‰qÆĞ÷ïOI¨éwŞêÀ´Å1ßÜu6˜şS{ÇiÖ­Ye<²fô\[Ñë<lé+{vyâ5/”|Š®p’DîYQ_Æñ1áXÓ¬VÁ2üIş«kşéçÑytgÊéÙŒ$œŸ¦3§xqh‚9³d*ª‘Y$5,
    MOUSEUP_DISMISS: "mouseup.dismiss" + EVENT_KEY$5,
    MOUSEDOWN_DISMISS: "mousedown.dismiss" + EVENT_KEY$5,
    CLICK_DATA_API: "click" + EVENT_KEY$5 + DATA_API_KEY$5
  };
  var ClassName$5 = {
    SCROLLABLE: 'modal-dialog-scrollable',
    SCROLLBAR_MEASURER: 'modal-scrollbar-measure',
    BACKDROP: 'modal-backdrop',
    OPEN: 'modal-open',
    FADE: 'fade',
    SHOW: 'show',
    STATIC: 'modal-static'
  };
  var Selector$5 = {
    DIALOG: '.modal-dialog',
    MODAL_BODY: '.modal-body',
    DATA_TOGGLE: '[data-toggle="modal"]',
    DATA_DISMISS: '[data-dismiss="modal"]',
    FIXED_CONTENT: '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',
    STICKY_CONTENT: '.sticky-top'
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Modal =
  /*#__PURE__*/
  function () {
    function Modal(element, config) {
      this._config = this._getConfig(config);
      this._element = element;
      this._dialog = element.querySelector(Selector$5.DIALOG);
      this._backdrop = null;
      this._isShown = false;
      this._isBodyOverflowing = false;
      this._ignoreBackdropClick = false;
      this._isTransitioning = false;
      this._scrollbarWidth = 0;
    } // Getters


    var _proto = Modal.prototype;

    // Public
    _proto.toggle = function toggle(relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget);
    };

    _proto.show = function show(relatedTarget) {
      var _this = this;

      if (this._isShown || this._isTransitioning) {
        return;
      }

      if ($(this._element).hasClass(ClassName$5.FADE)) {
        this._isTransitioning = true;
      }

      var showEvent = $.Event(Event$5.SHOW, {
        relatedTarget: relatedTarget
      });
      $(this._element).trigger(showEvent);

      if (this._isShown || showEvent.isDefaultPrevented()) {
        return;
      }

      this._isShown = true;

      this._checkScrollbar();

      this._setScrollbar();

      this._adjustDialog();

      this._setEscapeEvent();

      this._setResizeEvent();

      $(this._element).on(Event$5.CLICK_DISMISS, Selector$5.DATA_DISMISS, function (event) {
        return _this.hide(event);
      });
      $(this._dialog).on(Event$5.MOUSEDOWN_DISMISS, function () {
        $(_this._element).one(Event$5.MOUSEUP_DISMISS, function (event) {
          if ($(event.target).is(_this._element)) {
            _this._ignoreBackdropClick = true;
          }
        });
      });

      this._showBackdrop(function () {
        return _this._showElement(relatedTarget);
      });
    };

    _proto.hide = function hide(event) {
      var _this2 = this;

      if (event) {
        event.preventDefault();
      }

      if (!this._isShown || this._isTransitioning) {
        return;
      }

      var hideEvent = $.Event(Event$5.HIDE);
      $(this._element).trigger(hideEvent);

      if (!this._isShown || hideEvent.isDefaultPrevented()) {
        return;
      }

      this._isShown = false;
      var transition = $(this._element).hasClass(ClassName$5.FADE);

      if (transition) {
        this._isTransitioning = true;
      }

      this._setEscapeEvent();

      this._setResizeEvent();

      $(document).off(Event$5.FOCUSIN);
      $(this._element).removeClass(ClassName$5.SHOW);
      $(this._element).off(Event$5.CLICK_DISMISS);
      $(this._dialog).off(Event$5.MOUSEDOWN_DISMISS);

      if (transition) {
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $(this._element).one(Util.TRANSITION_END, function (event) {
          return _this2._hideModal(event);
        }).emulateTransitionEnd(transitionDuration);
      } else {
        this._hideModal();
      }
    };

    _proto.dispose = function dispose() {
      [window, this._element, this._dialog].forEach(function (htmlElement) {
        return $(htmlElement).off(EVENT_KEY$5);
      });
      /**
       * `document` has 2 events `Event.FOCUSIN` and `Event.CLICK_DATA_API`
       * Do not move `document` in `htmlElements` array
       * It will remove `Event.CLICK_DATA_API` event that should remain
       */

      $(document).off(Event$5.FOCUSIN);
      $.removeData(this._element, DATA_KEY$5);
      this._config = null;
      this._element = null;
      this._dialog = null;
      this._backdrop = null;
      this._isShown = null;
      this._isBodyOverflowing = null;
      this._ignoreBackdropClick = null;
      this._isTransitioning = null;
      this._scrollbarWidth = null;
    };

    _proto.handleUpdate = function handleUpdate() {
      this._adjustDialog();
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread2({}, Default$3, {}, config);
      Util.typeCheckConfig(NAME$5, config, DefaultType$3);
      return config;
    };

    _proto._triggerBackdropTransition = function _triggerBackdropTransition() {
      var _this3 = this;

      if (this._config.backdrop === 'static') {
        var hideEventPrevented = $.Event(Event$5.HIDE_PREVENTED);
        $(this._element).trigger(hideEventPrevented);

        if (hideEventPrevented.defaultPrevented) {
          return;
        }

        this._element.classList.add(ClassName$5.STATIC);

        var modalTransitionDuration = Util.getTransitionDurationFromElement(this._element);
        $(this._element).one(Util.TRANSITION_END, function () {
          _this3._element.classList.remove(ClassName$5.STATIC);
        }).emulateTransitionEnd(modalTransitionDuration);

        this._element.focus();
      } else {
        this.hide();
      }
    };

    _proto._showElement = function _showElement(relatedTarget) {
      var _this4 = this;

      var transition = $(this._element).hasClass(ClassName$5.FADE);
      var modalBody = this._dialog ? this._dialog.querySelector(Selector$5.MODAL_BODY) : null;

      if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
        // Don't move modal's DOM position
        document.body.appendChild(this._element);
      }

      this._element.style.display = 'block';

      this._element.removeAttribute('aria-hidden');

      this._element.setAttribute('aria-modal', true);

      if ($(this._dialog).hasClass(ClassName$5.SCROLLABLE) && modalBody) {
        modalBody.scrollTop = 0;
      } else {
        this._element.scrollTop = 0;
      }

      if (transition) {
        Util.reflow(this._element);
      }

      $(this._element).addClass(ClassName$5.SHOW);

      if (this._config.focus) {
        this._enforceFocus();
      }

      var shownEvent = $.Event(Event$5.SHOWN, {
        relatedTarget: relatedTarget
      });

      var transitionComplete = function transitionComplete() {
        if (_this4._config.focus) {
          _this4._element.focus();
        }

        _this4._isTransitioning = false;
        $(_this4._element).trigger(shownEvent);
      };

      if (transition) {
        var transitionDuration = Util.getTransitionDurationFromElement(this._dialog);
        $(this._dialog).one(Util.TRANSITION_END, transitionComplete).emulateTransitionEnd(transitionDuration);
      } else {
        transitionComplete();
      }
    };

    _proto._enforceFocus = function _enforceFocus() {
      var _this5 = this;

      $(document).off(Event$5.FOCUSIN) // Guard against infinite focus loop
      .on(Event$5.FOCUSIN, function (event) {
        if (document !== event.target && _this5._element !== event.target && $(_this5._element).has(event.target).length === 0) {
          _this5._element.focus();
        }
      });
    };

    _proto._setEscapeEvent = function _setEscapeEvent() {
      var _this6 = this;

      if (this._isShown && this._config.keyboard) {
        $(this._element).on(Event$5.KEYDOWN_DISMISS, function (event) {
          if (event.which === ESCAPE_KEYCODE$1) {
            _this6._triggerBackdropTransition();
          }
        });
      } else if (!this._isShown) {
        $(this._element).off(Event$5.KEYDOWN_DISMISS);
      }
    };

    _proto._setResizeEvent = function _setResizeEvent() {
      var _this7 = this;

      if (this._isShown) {
        $(window).on(Event$5.RESIZE, function (event) {
          return _this7.handleUpdate(event);
        });
      } else {
        $(window).off(Event$5.RESIZE);
      }
    };

    _proto._hideModal = function _hideModal() {
      var _this8 = this;

      this._element.style.display = 'none';

      this._element.setAttribute('aria-hidden', true);

      this._element.removeAttribute('aria-modal');

      this._isTransitioning = false;

      this._showBackdrop(function () {
        $(document.body).removeClass(ClassName$5.OPEN);

        _this8._resetAdjustments();

        _this8._resetScrollbar();

        $(_this8._element).trigger(Event$5.HIDDEN);
      });
    };

    _proto._removeBackdrop = function _removeBackdrop() {
      if (this._backdrop) {
        $(this._backdrop).remove();
        this._backdrop = null;
      }
    };

    _proto._showBackdrop = function _showBackdrop(callback) {
      var _this9 = this;

      var animate = $(this._element).hasClass(ClassName$5.FADE) ? ClassName$5.FADE : '';

      if (this._isShown && this._config.backdrop) {
        this._backdrop = document.createElement('div');
        this._backdrop.className = ClassName$5.BACKDROP;

        if (animate) {
          this._backdrop.classList.add(animate);
        }

        $(this._backdrop).appendTo(document.body);
        $(this._element).on(Event$5.CLICK_DISMISS, function (event) {
          if (_this9._ignoreBackdropClick) {
            _this9._ignoreBackdropClick = false;
            return;
          }

          if (event.target !== event.currentTarget) {
            return;
          }

          _this9._triggerBackdropTransition();
        });

        if (animate) {
          Util.reflow(this._backdrop);
        }

        $(this._backdrop).addClass(ClassName$5.SHOW);

        if (!callback) {
          return;
        }

        if (!animate) {
          callback();
          return;
        }

        var backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);
        $(this._backdrop).one(Util.TRANSITION_END, callback).emulateTransitionEnd(backdropTransitionDuration);
      } else if (!this._isShown && this._backdrop) {
        $(this._backdrop).removeClass(ClassName$5.SHOW);

        var callbackRemove = function callbackRemove() {
          _this9._removeBackdrop();

          if (callback) {
            callback();
          }
        };

        if ($(this._element).hasClass(ClassName$5.FADE)) {
          var _backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);

          $(this._backdrop).one(Util.TRANSITION_END, callbackRemove).emulateTransitionEnd(_backdropTransitionDuration);
        } else {
          callbackRemove();
        }
      } else if (callback) {
        callback();
      }
    } // ----------------------------------------------------------------------
    // the following methods are used to handle overflowing modals
    // todo (fat): these should probably be refactored out of modal.js
    // ----------------------------------------------------------------------
    ;

    _proto._adjustDialog = function _adjustDialog() {
      var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

      if (!this._isBodyOverflowing && isModalOverflowing) {
        this._element.style.paddingLeft = this._scrollbarWidth + "px";
      }

      if (this._isBodyOverflowing && !isModalOverflowing) {
        this._element.style.paddingRight = this._scrollbarWidth + "px";
      }
    };

    _proto._resetAdjustments = function _resetAdjustments() {
      this._element.style.paddingLeft = '';
      this._element.style.paddingRight = '';
    };

    _proto._checkScrollbar = function _checkScrollbar() {
      var rect = document.body.getBoundingClientRect();
      this._isBodyOverflowing = rect.left + rect.right < window.innerWidth;
      this._scrollbarWidth = this._getScrollbarWidth();
    };

    _proto._setScrollbar = function _setScrollbar() {
      var _this10 = this;

      if (this._isBodyOverflowing) {
        // Note: DOMNode.style.paddingRight returns the actual value or '' if not set
        //   while $(DOMNode).css('padding-right') returns the calculated value or 0 if not set
        var fixedContent = [].slice.call(document.querySelectorAll(Selector$5.FIXED_CONTENT));
        var stickyContent = [].slice.call(document.querySelectorAll(Selector$5.STICKY_CONTENT)); // Adjust fixed content padding

        $(fixedContent).each(function (index, element) {
          var actualPadding = element.style.paddingRight;
          var calculatedPadding = $(element).css('padding-right');
          $(element).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + _this10._scrollbarWidth + "px");
        }); // Adjust sticky content margin

        $(stickyContent).each(function (index, element) {
          var actualMargin = element.style.marginRight;
          var calculatedMargin = $(element).css('margin-right');
          $(element).data('margin-right', actualMargin).css('margin-right', parseFloat(calculatedMargin) - _this10._scrollbarWidth + "px");
        }); // Adjust body padding

        var actualPadding = document.body.style.paddingRight;
        var calculatedPadding = $(document.body).css('padding-right');
        $(document.body).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + this._scrollbarWidth + "px");
      }

      $(document.body).addClass(ClassName$5.OPEN);
    };

    _proto._resetScrollbar = function _resetScrollbar() {
      // Restore fixed content padding
      var fixedContent = [].slice.call(document.querySelectorAll(Selector$5.FIXED_CONTENT));
      $(fixedContent).each(function (index, element) {
        var padding = $(element).data('padding-right');
        $(element).removeData('padding-right');
        element.style.paddingRight = padding ? padding : '';
      }); // Restore sticky content

      var elements = [].slice.call(document.querySelectorAll("" + Selector$5.STICKY_CONTENT));
      $(elements).each(function (index, element) {
        var margin = $(element).data('margin-right');

        if (typeof margin !== 'undefined') {
          $(element).css('margin-right', margin).removeData('margin-right');
        }
      }); // Restore body padding

      var padding = $(document.body).data('padding-right');
      $(document.body).removeData('padding-right');
      document.body.style.paddingRight = padding ? padding : '';
    };

    _proto._getScrollbarWidth = function _getScrollbarWidth() {
      // thx d.walsh
      var scrollDiv = document.createElement('div');
      scrollDiv.className = ClassName$5.SCROLLBAR_MEASURER;
      document.body.appendChild(scrollDiv);
      var scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);
      return scrollbarWidth;
    } // Static
    ;

    Modal._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY$5);

        var _config = _objectSpread2({}, Default$3, {}, $(this).data(), {}, typeof config === 'object' && config ? config : {});

        if (!data) {
          data = new Modal(this, _config);
          $(this).data(DATA_KEY$5, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config](relatedTarget);
        } else if (_config.show) {
          data.show(relatedTarget);
        }
      });
    };

    _createClass(Modal, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$5;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$3;
      }
    }]);

    return Modal;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event$5.CLICK_DATA_API, Selector$5.DATA_TOGGLE, function (event) {
    var _this11 = this;

    var target;
    var selector = Util.getSelectorFromElement(this);

    if (selector) {
      target = document.querySelector(selector);
    }

    var config = $(target).data(DATA_KEY$5) ? 'toggle' : _objectSpread2({}, $(target).data(), {}, $(this).data());

    if (this.tagName === 'A' || this.tagName === 'AREA') {
      event.preventDefault();
    }

    var $target = $(target).one(Event$5.SHOW, function (showEvent) {
      if (showEvent.isDefaultPrevented()) {
        // Only register focus restorer if modal will actually get shown
        return;
      }

      $target.one(Event$5.HIDDEN, function () {
        if ($(_this11).is(':visible')) {
          _this11.focus();
        }
      });
    });

    Modal._jQueryInterface.call($(target), config, this);
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$5] = Modal._jQueryInterface;
  $.fn[NAME$5].Constructor = Modal;

  $.fn[NAME$5].noConflict = function () {
    $.fn[NAME$5] = JQUERY_NO_CONFLICT$5;
    return Modal._jQueryInterface;
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.4.1): tools/sanitizer.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */
  var uriAttrs = ['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href'];
  var ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
  var DefaultWhitelist = {
    // Global attributes allowed on any supplied element below.
    '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
    a: ['target', 'href', 'title', 'rel'],
    area: [],
    b: [],
    br: [],
    col: [],
    code: [],
    div: [],
    em: [],
    hr: [],
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    i: [],
    img: ['src', 'alt', 'title', 'width', 'height'],
    li: [],
    ol: [],
    p: [],
    pre: [],
    s: [],
    small: [],
    span: [],
    sub: [],
    sup: [],
    strong: [],
    u: [],
    ul: []
  };
  /**
   * A pattern that recognizes a commonly useful subset of URLs that are safe.
   *
   * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
   */

  var SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi;
  /**
   * A pattern that matches safe data URLs. Only matches image, video and audio types.
   *
   * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
   */

  var DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i;

  function allowedAttribute(attr, allowedAttributeList) {
    var attrName = attr.nodeName.toLowerCase();

    if (allowedAttributeList.indexOf(attrName) !== -1) {
      if (uriAttrs.indexOf(attrName) !== -1) {
        return Boolean(attr.nodeValue.match(SAFE_URL_PATTERN) || attr.nodeValue.match(DATA_URL_PATTERN));
      }

      return true;
    }

    var regExp = allowedAttributeList.filter(function (attrRegex) {
      return attrRegex instanceof RegExp;
    }); // Check if a regular expression validates the attribute.

    for (var i = 0, l = regExp.length; i < l; i++) {
      if (attrName.match(regExp[i])) {
        return true;
      }
    }

    return false;
  }

  function sanitizeHtml(unsafeHtml, whiteList, sanitizeFn) {
    if (unsafeHtml.length === 0) {
      return unsafeHtml;
    }

    if (sanitizeFn && typeof sanitizeFn === 'function') {
      return sanitizeFn(unsafeHtml);
    }

    var domParser = new window.DOMParser();
    var createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
    var whitelistKeys = Object.keys(whiteList);
    var elements = [].slice.call(createdDocument.body.querySelectorAll('*'));

    var _loop = function _loop(i, len) {
      var el = elements[i];
      var elName = el.nodeName.toLowerCase();

      if (whitelistKeys.indexOf(el.nodeName.toLowerCase()) === -1) {
        el.parentNode.removeChild(el);
        return "continue";
      }

      var attributeList = [].slice.call(el.attributes);
      var whitelistedAttributes = [].concat(whiteList['*'] || [], whiteList[elName] || []);
      attributeList.forEach(function (attr) {
        if (!allowedAttribute(attr, whitelistedAttributes)) {
          el.removeAttribute(attr.nodeName);
        }
      });
    };

    for (var i = 0, len = elements.length; i < len; i++) {
      var _ret = _loop(i);

      if (_ret === "continue") continue;
    }

    return createdDocument.body.innerHTML;
  }

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$6 = 'tooltip';
  var VERSION$6 = '4.4.1';
  var DATA_KEY$6 = 'bs.tooltip';
  var EVENT_KEY$6 = "." + DATA_KEY$6;
  var JQUERY_NO_CONFLICT$6 = $.fn[NAME$6];
  var CLASS_PREFIX = 'bs-tooltip';
  var BSCLS_PREFIX_REGEX = new RegExp("(^|\\s)" + CLASS_PREFIX + "\\S+", 'g');
  var DISALLOWED_ATTRIBUTES = ['sanitize', 'whiteList', 'sanitizeFn'];
  var DefaultType$4 = {
    animation: 'boolean',
    template: 'string',
    title: '(string|element|function)',
    trigger: 'string',
    delay: '(number|object)',
    html: 'boolean',
    selector: '(string|boolean)',
    placement: '(string|function)',
    offset: '(number|string|function)',
    container: '(string|element|boolean)',
    fallbackPlacement: '(string|array)',
    boundary: '(string|element)',
    sanitize: 'boolean',
    sanitizeFn: '(null|function)',
    whiteList: 'object',
    popperConfig: '(null|object)'
  };
  var AttachmentMap$1 = {
    AUTO: 'auto',
    TOP: 'top',
    RIGHT: 'right',
    BOTTOM: 'bottom',
    LEFT: 'left'
  };
  var Default$4 = {
    animation: true,
    template: '<div class="tooltip" role="tooltip">' + '<div class="arrow"></div>' + '<div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    selector: false,
    placement: 'top',
    offset: 0,
    container: false,
    fallbackPlacement: 'flip',
    boundary: 'scrollParent',
    sanitize: true,
    sanitizeFn: null,
    whiteList: DefaultWhitelist,
    popperConfig: null
  };
  var HoverState = {
    SHOW: 'show',
    OUT: 'out'
  };
  var Event$6 = {
    HIDE: "hide" + EVENT_KEY$6,
    HIDDEN: "hidden" + EVENT_KEY$6,
    SHOW: "show" + EVENT_KEY$6,
    SHOWN: "shown" + EVENT_KEY$6,
    INSERTED: "inserted" + EVENT_KEY$6,
    CLICK: "click" + EVENT_KEY$6,
    FOCUSIN: "focusin" + EVENT_KEY$6,
    FOCUSOUT: "focusout" + EVENT_KEY$6,
    MOUSEENTER: "mouseenter" + EVENT_KEY$6,
    MOUSELEAVE: "mouseleave" + EVENT_KEY$6
  };
  var ClassName$6 = {
    FADE: 'fade',
    SHOW: 'show'
  };
  var Selector$6 = {
    TOOLTIP: '.tooltip',
    TOOLTIP_INNER: '.tooltip-inner',
    ARROW: '.arrow'
  };
  var Trigger = {
    HOVER: 'hover',
    FOCUS: 'focus',
    CLICK: 'click',
    MANUAL: 'manual'
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Tooltip =
  /*#__PURE__*/
  function () {
    function Tooltip(element, config) {
      if (typeof Popper === 'undefined') {
        throw new TypeError('Bootstrap\'s tooltips require Popper.js (https://popper.js.org/)');
      } // private


      this._isEnabled = true;
      this._timeout = 0;
      this._hoverState = '';
      this._activeTrigger = {};
      this._popper = null; // Protected

      this.element = element;
      this.config = this._getConfig(config);
      this.tip = null;

      this._setListeners();
    } // Getters


    var _proto = Tooltip.prototype;

    // Public
    _proto.enable = function enable() {
      this._isEnabled = true;
    };

    _proto.disable = function disable() {
      this._isEnabled = false;
    };

    _proto.toggleEnabled = function toggleEnabled() {
      this._isEnabled = !this._isEnabled;
    };

    _proto.toggle = function toggle(event) {
      if (!this._isEnabled) {
        return;
      }

      if (event) {
        var dataKey = this.constructor.DATA_KEY;
        var context = $(event.currentTarget).data(dataKey);

        if (!context) {
          context = new this.constructor(event.currentTarget, this._getDelegateConfig());
          $(event.currentTarget).data(dataKey, context);
        }

        context._activeTrigger.click = !context._activeTrigger.click;

        if (context._isWithActiveTrigger()) {
          context._enter(null, context);
        } else {
          context._leave(null, context);
        }
      } else {
        if ($(this.getTipElement()).hasClass(ClassName$6.SHOW)) {
          this._leave(null, this);

          return;
        }

        this._enter(null, this);
      }
    };

    _proto.dispose = function dispose() {
      clearTimeout(this._timeout);
      $.removeData(this.element, this.constructor.DATA_KEY);
      $(this.element).off(this.constructor.EVENT_KEY);
      $(this.element).closest('.modal').off('hide.bs.modal', this._hideModalHandler);

      if (this.tip) {
        $(this.tip).remove();
      }

      this._isEnabled = null;
      this._timeout = null;
      this._hoverState = null;
      this._activeTrigger = null;

      if (this._popper) {
        this._popper.destroy();
      }

      this._popper = null;
      this.element = null;
      this.config = null;
      this.tip = null;
    };

    _proto.show = function show() {
      var _this = this;

      if ($(this.element).css('display') === 'none') {
        throw new Error('Please use show on visible elements');
      }

      var showEvent = $.Event(this.constructor.Event.SHOW);

      if (this.isWithContent() && this._isEnabled) {
        $(this.element).trigger(showEvent);
        var shadowRoot = Util.findShadowRoot(this.element);
        var isInTheDom = $.contains(shadowRoot !== null ? shadowRoot : this.element.ownerDocument.documentElement, this.element);

        if (showEvent.isDefaultPrevented() || !isInTheDom) {
          return;
        }

        var tip = this.getTipElement();
        var tipId = Util.getUID(this.constructor.NAME);
        tip.setAttribute('id', tipId);
        this.element.setAttribute('aria-describedby', tipId);
        this.setContent();

        if (this.config.animation) {
          $(tip).addClass(ClassName$6.FADE);
        }

        var placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this.element) : this.config.placement;

        var attachment = this._getAttachment(placement);

        this.addAttachmentClass(attachment);

        var container = this._getContainer();

        $(tip).data(this.constructor.DATA_KEY, this);

        if (!$.contains(this.element.ownerDocument.documentElement, this.tip)) {
          $(tip).appendTo(container);
        }

        $(this.element).trigger(this.constructor.Event.INSERTED);
        this._popper = new Popper(this.element, tip, this._getPopperConfig(attachment));
        $(tip).addClass(ClassName$6.SHOW); // If this is a touch-enabled device we add extra
        // empty mouseover listeners to the body's immediate children;
        // only needed because of broken event delegation on iOS
        // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html

        if ('ontouchstart' in document.documentElement) {
          $(document.body).children().on('mouseover', null, $.noop);
        }

        var complete = function complete() {
          if (_this.config.animation) {
            _this._fixTransition();
          }

          var prevHoverState = _this._hoverState;
          _this._hoverState = null;
          $(_this.element).trigger(_this.constructor.Event.SHOWN);

          if (prevHoverState === HoverState.OUT) {
            _this._leave(null, _this);
          }
        };

        if ($(this.tip).hasClass(ClassName$6.FADE)) {
          var transitionDuration = Util.getTransitionDurationFromElement(this.tip);
          $(this.tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        } else {
          complete();
        }
      }
    };

    _proto.hide = function hide(callback) {
      var _this2 = this;

      var tip = this.getTipElement();
      var hideEvent = $.Event(this.constructor.Event.HIDE);

      var complete = function complete() {
        if (_this2._hoverState !== HoverState.SHOW && tip.parentNode) {
          tip.parentNode.removeChild(tip);
        }

        _this2._cleanTipClass();

        _this2.element.removeAttribute('aria-describedby');

        $(_this2.element).trigger(_this2.constructor.Event.HIDDEN);

        if (_this2._popper !== null) {
          _this2._popper.destroy();
        }

        if (callback) {
          callback();
        }
      };

      $(this.element).trigger(hideEvent);

      if (hideEvent.isDefaultPrevented()) {
        return;
      }

      $(tip).removeClass(ClassName$6.SHOW); // If this is a touch-enabled device we remove the extra
      // empty mouseover listeners we added for iOS support

      if ('ontouchstart' in document.documentElement) {
        $(document.body).children().off('mouseover', null, $.noop);
      }

      this._activeTrigger[Trigger.CLICK] = false;
      this._activeTrigger[Trigger.FOCUS] = false;
      this._activeTrigger[Trigger.HOVER] = false;

      if ($(this.tip).hasClass(ClassName$6.FADE)) {
        var transitionDuration = Util.getTransitionDurationFromElement(tip);
        $(tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      } else {
        complete();
      }

      this._hoverState = '';
    };

    _proto.update = function update() {
      if (this._popper !== null) {
        this._popper.scheduleUpdate();
      }
    } // Protected
    ;

    _proto.isWithContent = function isWithContent() {
      return Boolean(this.getTitle());
    };

    _proto.addAttachmentClass = function addAttachmentClass(attachment) {
      $(this.getTipElement()).addClass(CLASS_PREFIX + "-" + attachment);
    };

    _proto.getTipElement = function getTipElement() {
      this.tip = this.tip || $(this.config.template)[0];
      return this.tip;
    };

    _proto.setContent = function setContent() {
      var tip = this.getTipElement();
      this.setElementContent($(tip.querySelectorAll(Selector$6.TOOLTIP_INNER)), this.getTitle());
      $(tip).removeClass(ClassName$6.FADE + " " + ClassName$6.SHOW);
    };

    _proto.setElementContent = function setElementContent($element, content) {
      if (typeof content === 'object' && (content.nodeType || content.jquery)) {
        // Content is a DOM node or a jQuery
        if (this.config.html) {
          if (!$(content).parent().is($element)) {
            $element.empty().append(content);
          }
        } else {
          $element.text($(content).text());
        }

        return;
      }

      if (this.config.html) {
        if (this.config.sanitize) {
          content = sanitizeHtml(content, this.config.whiteList, this.config.sanitizeFn);
        }

        $element.html(content);
      } else {
        $element.text(content);
      }
    };

    _proto.getTitle = function getTitle() {
      var title = this.element.getAttribute('data-original-title');

      if (!title) {
        title = typeof this.config.title === 'function' ? this.config.title.call(this.element) : this.config.title;
      }

      return title;
    } // Private
    ;

    _proto._getPopperConfig = function _getPopperConfig(attachment) {
      var _this3 = this;

      var defaultBsConfig = {
        placement: attachment,
        modifiers: {
          offset: this._getOffset(),
          flip: {
            behavior: this.config.fallbackPlacement
          },
          arrow: {
            element: Selector$6.ARROW
          },
          preventOverflow: {
     ´Ús%.22H/µº„»¸éºÆ7¥Ç*1ËtÓ ü•67ÇæBm†$NÅ¤“¾ÛÊl$3¦
!á•™rßèB3îx—QÑ9JƒX/Ùğ,uT¹–¢S9Ktø=®™‹ŸÑ·µ¤­://‹>p^7»î«¦#Œ”çĞmŞõ‚N7vövÃ~ÌŒ€)ÑˆZ+-4e)|Y,`ñÃ
d®²ªú[#BİiÉï£—{›ÌJ£8B.õào_*/â“ã-Ø»úe§è§R;‚2?Ÿ=ifÖ®ÑàœÃ­.·lrqºØ$Pì 3U#ÿœµìÆ§sı“•úDaæ°š@cYëÃ	H\õƒ%Lwn‘(c%ã*ÂW;ô/¡t…^<7¼eú&@ìCÔ3Ä2bQÚµ±@¯*MÃû¿Ì¹ˆ&#ÄÿzŒ¿Æ^Ta+¨G%¶ë×ÇI{Ø+,_L–.¨.ˆƒıñ´’¸rà™Âyèäµ]Ö“İ‘Ù=4¨1Êy¶8®ğ&’ÔËÔàõnäMâ=±ÛqóØøìùHü}ßüØCê·0×íØ  ¤	aâ²%:À¾~1'Ì§¡§´Î‚ËD6Ï×4ÕRX×‘g?Ó­0È¯ù|Ÿ	
AÛÒ°¤Ä–¼d‘]%ô%€`Ñncx-É€å¢.ZÙÚf€T²ôµÎN¸â6= f0/ıÑçjñL-óšt -|´KÎdò66¬'ì
ÔÕıab¨¡C¶¬n»ÅŠ(h©= >85ªç<³‡9ÚÉ¹á‹°åÙîôÃ§÷å¨ÉÚ«˜‰×iµ„ O]fè’Z4oÎ—n>¶ÊÉ^³£Õ÷†âÚãó‹» 8Ùt4N™yöÍ4Ê¢%Ö"Í¥wQ~ ÿ&)#ÎP‘c¡ûwÔ@Æ‡ŞˆáÜ™èKŒèï9¦ÁP*”'?;ˆ'H¿šû”í7í¬·m
ßYv¡_¤ĞY½ƒŠu¦NÄêßö?Ã˜õß€Ğª!¨•7!ßmëı¼{Ó§×Hİ»“È4£½1nÌA˜ô´ûµ+9údÌ“ÂÓ#Ïs›|1[ÄNj¸ª š{„°æHŠ’ôf¡’¼<În—DtCÊE¥¤`"òJøÑpJùº/x¢YŞËºÒù¤"®ïdh&ŒıJG&Ä–×ôÜ=]¢clãÌû;T†;?sãºm‚P÷a°ò†‹wp¸èîRİ¤Ñ2Æä”›Ø„ê'æíT§¿5•³3Í?Fëµæ!'¿|ÂÇíÎ–EÓK	›¯ 6û´@BŸåÔÁ3`‡,³9äMMâÛˆˆq
£Qï½¾ú
{ìHXÈÓñ•T¯º›ùBıï~C@b2¦ˆPÌ­F'Æ@!Õöí™¿bëFz§ı(»˜DÏ´~Æk [“g„›œÈT	í@i¾k±K§Éa\,UùÌäFÁÿ!,Dk0èŒVj¦8+ƒf«u<~!9(>ëö‰mõÔ+½â_³-*L¨€ÚM¡Ú×`v¾^"”+£ËŞuÒSpK’Án®`ğ¨moå¶à[<^¸/.àEß/éî/¾6¬{¿
-®T“Üú¢Zµ°c;Ê«U‘
hZ„\ƒlLõN=‘v‘›±)†¡=…¸dESÔşÜï"5µ¥ÆAJ®“lí“Xâ™•_šT­XG×çäªbOó4&ÎqWm¶3j`¬ñÖ³pä«tW !zÏX »Ïm¨ë÷j<	‘H€utã}ë0•a H×\ºvLêÇc1-+'Óå[Uó+d4ƒD"4ŞŞ£ÀRübß%Ÿj@xƒŸĞÜÎÁ,"}Ş8š“Rv×°Íi÷~òtÌ^ÚF¼œ²0¾@ÅÂCôõÊ%ª*$nhôÖÚİwàn4QJc‹±æ|XöWpÛDû×
Q¦½XÃ_
‚—áªvòÑ¢Ş-?éÒ ß‹\Q6kbzû;Ô‚ÔÌ=äƒãØ5Ş‰Š§üiSŞ\EÍbˆi1ÿq DÑÿQ­1£Ôœı‡[û¡å8à<¸|.>¼-‘»\ôè^)’o<`<ÛËoA²¾Aû¾§Âí§;–É(\ÊlªÌ=h­s/É²mp§Lôgz’–GÉÎe™lS·´ÏÖ_®7ÙÏÃúÔ·Ü	>q5LŞo³ôü(wëâÏF‰”}ş•ïáfµ\½è¸ÁoÅ•)u=D¸0l·Rö…_WLp=}¨×ó*Oæ‘\Nt‘=Ò‘bÊ€to†üóbdÒºCDåş‹Æ`Œ „¤úHqbe¹Á&Åı¬zuÄo¬¶bo^AT‡{GÜki•J?.-]Èº\ÌïÊ:èĞÖ)A^`’‰3<"°Æåÿà½¸ÖUI·«­,­ésy‹®¦dßı³86(…°*;,’‘ówÁ¨:F‚uj=bê-m&åPÙ<§Ã†Ü^›Ùïn¦ş¿¥m9§ª+OuÎˆ,ÄD8cèû÷§$Ôô;ou`Úâ˜oî:Lÿ©½ãëÖ¬2Y3~®­èu
¶ô•=»<ñšJ>EV8I¢÷¬¨/ãø˜p¬ÀéÖ«`™ş$ÿõµ
ÿôsè<ú3åôlFÎOÓ™S¼84ÁœY2ÕÈimZí¹™¤—Z]Â]Üt]ã›Òb•˜e	ºiş€J››cs¡6	C§â@ÒIßme6’Ó	…†ğÊL¹ot¡‡w¼Ë¨è¥A¬—Àlx–:ª\ËÑ©œ%:ü×ÌÅ€ÏèÛZÒV——E8¯›]÷UÓ†FÊsè6ïzA§;{»a?fFÀ”hD­•š²”¾¬N°øa2WYÕGı­¡î´ä÷ÑË½Mf%Š‡Q!—zğ·/•ñÉñŠì]ı²SôS©NA™ŸÏ43k×hpÎáW—[6¹8]l(v€™ªÇ‘ÆÎZvãÓ¹şÉJ}¢0sXM ±¬õá$O®úÁ¦‰;·èÇ?”±’qá«ú—PºB/›
Ş2} Gö!êb±(íÚX W•¦áı_æ\D“â=Æ_c/ª°Ô£Ûõëã¤=ì–/&KTÄÁşxZI\9ğƒLá€<tòÚ.ëÉîÈìÔå¼ÛNWxIêejğz7Hr‚&ñØí¸ylüö|$ş¾Îo~ì!õ[˜ëöGlPÒ„Ç° qÙ’`_?Š˜æÓĞSZgÁe"›çkšj)¬ëÈ…³‰Ÿ†éVä×|¾Ï‰ í	iXRâK^²È®’úˆ@°h·1¼–fÀrQ­lm3@*YúZHg'\q›3˜—şèŒsµø¦–yM:€>Ú%g2ùÖÎvêêş01ÔP![	V·İbE´TŒ PœÕsÙ†ÃíäÜğEØÇòŒl÷úá¿ÓûrÔdíUÌÄë´ZB€§.3tI-š7çK7[åˆd¯ÙÑê{CqíñyŠÅİ l:'„Ì<ûfeÑk‘æÒ»(?€“”‘?g¨È±ĞıÏ;ê ãCnÄpîLô%Fô÷Ó`(ÊŠ“ŸÄ¤_Í}Êö›vÖÛ¶…ï,»Ğ/Rè¬ŞÀŠAÅ:S'bõoûŸaÌúo@hÕÔÊ¿›ïˆ¶õşFŞ½éÓk¤îİIdšÑŞ7æ LzÚıÚ•}2æIáé‘ç¹ÀM¾˜-b'5ÜU
PÍÆ=BGXs$EIz³PIŞg·ŠK"º!e¢RR0y%üh8¥|İ…<Ñ,ïe]é|R×w24Æ~¥!bËëzî®ÑÀ1¶qæ}‚*Ã†Ÿ¹q]Š6A(û0XyÃÅ;8\tw©nÒhcrÊMlÂ
õóvªÓ_ÇšJ„Ù™‘æ£õZó“€_>áãvgË‚¢é¥„ÍW€›}Z ¡Ïrêà°C–¿Ùò¦&ñmDÄ8…Ñª÷^_}…=v$,äéøJ*‹WİÍ|¡ş÷Î‰G¿! 1HSD(æV£c jûöÌ_±uc=„Ó~”]L¢gZ?ã5€¥É³ÂÍ
NäGª„v 4ßµØ¥Óä0.–ª|fr£àÿ‰–F¢µ tFk5Sœ•A³Õ:?¿ŸuûŠÄ¶zj†•^ñ/ÈÙ&T@í¦PíkH0;ß/Ê•Ñeïƒ:é…)¸%É`7W0xÔ¶·r[ğ-/Üğ¢Šï—ô÷_›?Ö=_…WªIn}Q¬ZØ±åÕêH4-BŠ@®A6¦z§H;‚ÀÈÍØÃĞBÜ²Š")jî÷‘šÚRã %×I¶ÀöI,ñL‚Ê/MªV,‡£ësrU±§yç¸«6Û50Ö†xëY8òUº+‚Ğ½g,ĞŠŒİç6Tõ{5„H$À::Šñ¾u˜Ê0P¤k®	];&u†ã±˜–•“éò­ªù2šA"BoïQ`)~±ï‡O5  ¼ÁOhnç`‘>oÍI©‚»kØæ4‚{?y:f/m'#^ÎÀCY_ Èbá¡úzåU74zkíî;p7š(¥±ÅXrO>,û«¸m¢ık…(Ó^¬á/ÁËpU»@ùhQï–Ÿti€ïE®(›51½ıjAjæÈ?rˆÁqìšïDÅSş´)ï®Î¢f1D†´˜ÿ8 ¢èÎÿ¨Ö˜QjÎşÃ­ıĞrœp	Ü@>—Ş–È].zt¯É70íå·‹ Yİ }ßSáöÓK‡d.e6Uæ´†Ö¹—dÙ6¸S&	
z‡3=IË£dç²L¶©[Úgë/×›ìça}ê[îŸ¸&ï·Yz~H”»uñg£DJÇ>ÿÊ÷ğ³Z®^t\ˆà·âÊ”ºŠ"\6[)ûÂ¯+&¸>Ôëy•‡'óH.'ºHÈéHqe@º7Cşy12iİ!¢rÿEc0FPBRı	¤@‡8±²Ü`“â~V½:â7V[±7¯ ªC‰ı#îµŒ´J¥—–.d].ƒæwethë” /0ÉÄ‚XãòğŞ‚\ëª¤ÛÕF–Öt¹¼EWS2ÇïşYœG”BX•IƒÈù»`T#AŒ:µ1õ–€6“r¨lÓaCn¯‹Íìw·GSÿßRŠ¶œSÕ•§Š†:gDb¢Fœ1ôıûSjú·:0mqÌ7w¦ÿÔŞqšukV¬?×Vô:[úÊ]ø@Í%Ÿ"+œ$Q‡{VÔ—q|L8Vàôë‰…U°Ì’ÿêZ…?ú9tı™rz6#	ç§éÌ)^š`Î,™Šjä´6­ö\‰‹Ì‡ÒÆK­.á.nº®ñMé±JÌ²İ4@¥ÍÍ±¹P›„!	Sq é¤ï¶2ÉŒé„BÃ@Hxe¦ƒÜ7º…ĞÃŒ;ŞeTtÒÇ ÖK`6<KU®åƒèTÎ~kæbÀgôm-i«ÎËË¢œ×Í®ûªiÃ#å9t›w½ Ó½İ°3#`J4¢ÖJMYÊ_V'Xü°…™«¬ê£şÖ‡PwzòûèåŞ&³ÅÃ(K=øÛ—Ê‹øäxEö®~Ù)ú©ÔN§ ÌÏgOš™µ…k48çğÀ«‡Ë-›\œ.¶	;ÀLÕãHã?g-»ñé\ÿd¥>Q˜9¬&ĞXÖúp’'Wı`	ÓÄ[äãÊXÉ¸ŠğÕıK(]¡ÏMo™¾	#ûõ±ŒX”vm,Ğ«JÓğş/s.¢Éñ¿ã¯±UØ
êQ	„íúõqÒö
Ë—“%ªâ`<­$®øA¦p@:ym—õdwdvjŒrŞƒm'+¼‰$õ25x½$9A“xOìvÜ<6~Ç {>_ç7?öú-Ìuû€#6(iÂcX€¸lÉ†0¯EÌ	óiè)­€³à2‘Íó5MµÖuäÂÙÄOÃt+òk>ßg‚‚DĞö„4,)ñ%/YdWÉ}D	 X´Û^K³`¹¨‹V¶¶ •¬}-¤³®¸MˆÌKtÆ¹Z|SË¼&@Ÿí’3™ü…kç	»uu˜j(Ç­«Ûn±"
Z*FO ¨Nê9ÏlÃavrnø"ìcyF¶{ığßéy9j²ö*fâuÚF-!ÀS—º¤Í›ó¥›­rD²×ìhõ½¡¸öø<Åâî€‡ƒF N6Bf}32„h‰µHsé]”À¿IÊÈ‚3TäXè~„çuñ¡7b8w&ú#ú{i0”
eÅÉÏâ	Ò¯æ>eûM;ëm[†Âw–]è)tVo`Å b©±ú·ıÏ0fı7 ´jjåßMÈwDÛz#ïŞôé5R÷î$2ÍhoŒs&=í~íJ>ó¤ğôÈó\à&_Ì±“n„*¨fã¡#¬9’¢$½Y¨$o³[Å%İ²FQ))˜ˆ¼~4œR¾îÂh–÷²®t>©ˆë;š	c¿Ò	±åõ=wOWhàÛ8ó>ÁN‚áÃÏÜ¸.E› ”Ç}¬¼áâ®º»T7i´Œ19å&6a…ú‰y;Õé¯cM%ÂìÌ@óÑz­yÈIÀ/Ÿğq»³eAÑôRÂæ+ÀÍ>-Ğg9uğØ!ËßlySø6"bœÂhÔ{¯¯>ƒÂ;òt|%•Å«îf¾ĞFÿ{çÄ£ß˜¤)"s«Ñ‰1PHµ}{æ¯Øº‘Âi¿ Ê.&Ñ3­ŸñÀÖäYƒáf'ò#UB;PšïZìÒirKU>3¹QğÿDK#ÑZ º £ƒµš)ÎÊ ÙjÏŸ^HŠÏ:}Eb[=5ÃJ¯øäl‹
* vS¨ö5$‡o‡—ˆåÊè²÷A‡ôÂÜ’d°›+<jÛ[¹-øî‹xQÅ÷Kú†€û‹¯ÍëÇ¯B‹+Õ$·¾(V-ìØòjU¤š!E × S½SO¤A`äflŠahO!nYE‘Çµ?÷ûHMm©q’ë$[`û$–x&Aå—&U+–ÃÑõ9»ƒªØÓ<‰sÜU›íŒkC¼õ,ù*İÁhˆŞ3hEÆîsªÆú½OB$`Åxß:Le˜(Ò5×„®“:ÃñXLËÊÉtùVÕü
Í G¡·÷(°¿Øw‰Ã§P Şà'4·s0‹HŸ7æ¤TA†İ5lsÁ½Ÿ<³—¶ƒ/gà£,Œ/d±ğP}½r‰ª
‰½µvw¸M”ÒØb,¹'–ıUÜ6ÑşµB”i/Öğ—‚àe¸ª] |´(„wËOº4À÷"W”Íš˜Şşµ µsdÇ9Äà8vMw¢â)Ú”wWgQ³"CZÌ QtçTkÌ(5gÿáÖ~h9Î¸n ŸK†oKä.=ºWŠäÏöòÛE¬oĞ¾ï©pûé¥C2
—2›*sGZCëÜK²lÜ)“G½Ã™¤åQ²sY&ÛÔ-í³õ—ëMöó°>õ-w‚O\“÷Û,=?$Êİºø³Q"¥cŸå{ø†Y-W/:.Dğ[ñFeJ]E.›Æ­”}á×\Oêõ¼ÊÃ“y$—]$dt¤˜2 İÇ›!ÿ¼™´îQ¹ÿ¢1#(!©şR ÇCœXYn°Iq?«^ñ«­Ø›WÕ¡Äş÷ÚGFZ¥ÒKK².—Áó»²:´uJ˜dbÁ¬qù?xoA®uUÒíj#KkºÇ\Ş¢«)™ãÇwÿ,Î£J!¬Ê‹¤Aäü]0ª‘ FZ˜zK@›I8T6Ïé°!·×…Åfö»Û£©ÿo)ÅF[Î©êÊSEC3"1Q#Îúşı)	5ıÎ[˜¶8æ›»ÎÓjï8Íº5«ŒGÖŒŸk+z‡‚-}eÏ.O| æ…’O‘N’¨Ã=+êË8>&+pú‚õÀÂ*Xf?Éu­Â?ı:‚şL9=›‘„óÓtæ/M0g–LE5rZ›V{®ÄEæCiã¥V—p7]×ø¦ôX%fY‚nš„? ÒææØ\¨MÂÄ©8tÒw[™€dÆtB¡a $¼2ÓAîİBèaÆï2*:Gécë%0¥*×òAt*g‰¿Ç5s1à3ú¶–´UçåeÑÎëf×}Õ´a„‘òºÉ»^ĞéÆÎŞnØ™0%Qk¥…¦,å‚ƒ/«“,~ØBÌUVõQk„C¨;-ù}ôro“Y‰âaGÈ¥üíKåE|r¼¢%{W¿ìıTj§SPæç³'ÍÌÚÂ5œsxàÕÃå–M.NÛƒŠ`¦êq¤ñŸ³–İøt®²RŸ(ÌVh,k}8É“«~°„iâÎ-òñe¬d\Eøj‡ş%”®Ğ‹ç¦¢·LßÈ‘}ˆz†XF,J»6èU¥ixÿ—9Ñd„ø_ñ×Ø*lõ¨Âvıú8i{…åËƒÉ’ÀÕq°?VWü S8 ¼¶Ëz²;2»‡5F9ïÁ¶ÇÎD’z™¼Ş’œ I¼'v;n¿c€=‰¿¯ó›{Hıæº}À”4á1,@\¶dC˜À×"æ„ù4ô”VÀYp™Èæùš¦Z
ë:rálâ§€aºù5Ÿï3AA"h{B–”ø’—,²«ä>¢,Úm¯¥Ù°\ÔE+[ÛJVƒ¾ÒÙ	WÜ¦Äæ¥?:ã\->‚©e^“ …ÏvÉ™LşÂÆ†µó„]ºº?L5”cÈV‚Õm·X-£' Ô§Fõœg¶á0G;97|ö±<#Û½€~øïô¾5Y{3ñzm£–à©Ë]R‹æÍùÒÍÇV9"Ùkv´úŞP\{|bqwÀÃA# '›Æ	!3Ï¾™FB´ÄZ¤¹ô.Êàß$eäÁ+r,t?ÂóºÈøĞ1œ;}‰ı=Ç4J…²âägñéWsŸ²ı¦õ¶-Cá;ËÀ.ô‹:«7°bP±ÎÔ‰XıÛşg³şZ5µòï&ä;¢m½¿‘woúô©{w™f´7Æ9“v¿v%GŸŒyRxzäy.p“/f‹ØI7B•T³qĞÖIQ’Ş,T’·ÇÙ­â’ˆnHY£¨”LD^	?N)_wáO4Ë{Ù@W:ŸTÄõÍ„±_iÈ„Øòúƒ»§«@4pŒmœyŸ`§
Áp‡ágn\—¢MÊã>VŞpñN×İ]ª›4ZÆ˜œr›°BıÄ¼êô×±¦avf ùÇh½Ö<ä$à—Oø¸İÙ² hz)aóàÀfŸHè³œ:xìåo6‡¼©‰€@|1Na4ê½×WŸAa	y:¾’ÊâUw3_h£ÿ½sâÑoHLÒŠ¹ÕèÄ(¤Ú¾=óWlİHá´_ e“è™ÖÏx`kò¬Á‚p³‚ù‘*¡(Íw-vé49Œ‹¥*Ÿ™Ü(ø"„¥‘h- ]€ÑÁZÍgeĞlµçÏ/$ÅgÀ¾"±­ša¥Wür¶E…	P»)TûŒÃÎ·ÃKÄƒretÙû †Cza
nI2ØÍµí­Ü|‹Ç÷Å¼¨âû%ıCÀıÅ×æuÏãW¡Å•j’[_«vlGyµ*RM‹"k©Ş©'Ò 0r36Å0´§·€¬¢ÈcŠÚŸûı@¤¦¶Ô8HÉu’-°}K<“ òK“ªËáèúœÜAUìiÆÄ9îªÍvFŒµ!Şz|•îŠ`4Dï´"c÷¹Ucı^'!	°b¼o¦2ÌéškB×Iáx,¦eådº|«j~…Œf‚ˆ£P„ÆÛ{XŠ_ì»ÄáS( oğšÛ9˜E¤ÏGsRª Ãî¶9àŞOÙKÛÁˆ—3ğQÆ²Xx¨¾^¹DU…ÄŞZ»ûÜ&Jyl1–Ü“Ëşª n›hÿZ!Ê´køKAğ2\Õ.P>ZÂ»å']à{‘+ÊfMLo‡ZÚ€¹²ãbp»¦À;Qñ”?mÊ;ƒ«³¨Y‘!-æ?€(ºó?ª5f”š³ÿpk?´ç\‚7Ï%Ã‡·%r—ƒ‹İ+EòŒg{ùí"HÖ7hß÷T¸ıtÇÒ!…K™M•¹£­¡uî%Y¶î”I‚£‚ŞáLOÒò(Ù¹,“mê–öÙúËõ&ûyXŸú–;Á'®†Éûm–ån]üÙ(‘Ò±Ï¿ò=|Ã¬–«"ø­x£2¥®‡¢€†MãVÊ¾ğëŠ	®§õz^åáÉ<’Ë‰.²G:RLîãÍ^ŒLZwˆ¨ÜÑŒ”T)Ğã!N¬,7Ø¤¸ŸU¯øÕÖ@ìÍ+ˆêPbÿˆ{í##­RéÇ¥¥Y—Ëàƒù]YÚ:%ÈL2±`†GÖ¸ü?¼· ×º*évµ‘¥5İc.oÑÕ”Ìñã»çÑ¥Ve‡EÒ rş.UÇH£N­GL½% Í¤*çtØÛëÂb3ûİíÑÔş·”b£-çTuå©¢¡Î‘…˜¨g}ÿş”„š~ç­L[óÍ]gƒé?µwœfİšUÆ#kÆÏµ½CÁ–¾²g—'>PóBÉ§È
'IÔáõeŠ8}Áz`a,³ÀŸä¿ºVáŸ~ A¦œÍHÂùi:sŠ‡&˜3K¦¢9­M«=Wâ"ó!ƒ´ñR«K¸‹›®k|Sz¬³,A7ÍÂPissl.Ô&aHâTH:é»­LÀF2c:¡Ğ0^™é ÷n!ô0ãw£ô1ˆõ˜ÏRG•kù :•³D‡ßãš¹ğ}[KÚªóò²èçu³ë¾jÚ0ÂHyİæ]/ètcgo7ìÇÌ˜¨µÒBS–rÁÁ—ÕÉ?l¡@æ*«ú¨¿5Â!Ô–ü>z¹·É¬Dñ0Š#äRşö¥ò">9^Ñ‚½«_vŠ~*µÓ)(óóÙ“ffmáÎ9<ğêárË&§‹íAÅ0Sõ8ÒøÏYËn|:×?Y©Of«	4–µ>œ€äÉU?XÂ4qçùø‡2V2®"|µCÿJWèÅsSÁ[¦oäÈ>D=C,#¥]‹ ôªÒ4¼ÿËœ‹h2Bü¯Çøkì…@¶‚zTa»~}œ´‡½ÂòåÁdIà‚ê‚8ØO+‰+~)‡N^Ûe=Ù™İCƒ£œ÷`Û‰ã
o"I½L^ïINĞ$Ş»7ß1ÀÄß×ùÍ=¤~sİ>àˆJšğ .[²¡LàëEsÂ|zJ+à,¸Ldó|MS-…u¹p6ñSÀ0İ
ƒüšÏ÷™  ´=!KJ|ÉKÙUò@Qí6†×ÒìX.ê¢•­mH%«A_éì„+nÓbóÒq®ÁÔ2¯IĞÂç@»äL&acÃÚyÂ®@]İ&†Ê1d+Áê¶[¬ˆ‚–ŠÑ êƒS£zÎ3Ûp˜£œ¾ûX‘í^@?üwz_š¬½Š™x¶QKğÔe†.©Eóæ|éæc«‘ì5;Z}o(®=>O±¸;àá ‘€“MGã„™gßL£!Zb-Ò\zåğo’2ò‡à9ºáyGİ d|èÎ‰¾Äˆşc¥BYqò³ƒx‚ô«¹OÙ~ÓÎzÛ–¡ğe`úE
ÕX1¨XgêD¬şmÿ3ŒYÿ­‚ZùwòÑ¶ŞßÈ»7}zÔ½;‰L3ÚãÆ„IO»_»’£OÆ<)<=ò<¸É³Eì¤†¡JªÙ¸Gèk¤(Io*ÉÛÀãìVqID7¤¬QTJ
&"¯„§”¯»ğ‚'šå½l +O*âúN†fÂØ¯4dBlyıAÏİÓU 8Æ6Î¼O°Ó@…`¸Ãğ37®KÑ&åq+o¸x‡ë€î.ÕM-cLN¹‰MX¡~bŞNuúëXS‰0;3Ğüc´^krğË'|ÜîlYP4½”°ù
p`³O$ôYN<vÈò7›CŞÔD@ ¾ˆ¦0õŞë«Ï °Ç„…<_Ieñª»™/´ÑÿŞ9ñè7„$&iŠÅÜjtbRmßù+¶n¤‡pÚ/€²‹IôLëg¼°5yÖ`A¸YÁ‰üH•Ğ”æ»»tšÆÅR•ÏLnü?ÂÒH´ ƒ.Àè`­fŠ³2h¶ZÇóç’ƒâ³N`_‘ØVOÍ°Ò+ş9Û¢Â„
¨İª}	ÆaçÛá%âA¹2ºì}PÇ!=0·$ìæ
ÚöVn¾Åã…ûâ^Tùı’ş!àşâkóÇºçñ«ĞâJ5É­/ŠU;¶£¼Z©À€¦EHÈ5ÈÆTïÔiG¹›bÚSˆ[@VQä1EíÏı~ RS[j¤ä:ÉØ>‰%IPù¥IÕŠåpt}Nî *ö4OcâwUf;£ÆÚo=G¾JwE°¢÷ŒZ‘±ûÜ†ª±~¯Æ“‰XGG1Ş·SæŠtÍ5¡kÇ¤Îp<Û²r2]¾U5¿BF3AÄQ(Bãí=
,Å/ö]âğ©€7ø	ÍíÌ"Òç£9)UawÛœFpï'@Çì¥í`ÄËø(ãY,<T_¯\¢ªBâ†Fo­İ}îF¥4¶KîÉ‡eU ·M´­eÚ‹5ü¥ x®j(-
áİò“.ğ½Èe³&¦·¿C-HmÀÜÙñG18]Sà¨xÊŸ6åÁÕYÔ,†Èó@İùÕ3JÍÙ¸µZó.ÁƒÈç’áÃÛ¹ËÁEî•"ùÆÆ³½üv$ë´ï{*Ü~ºcéŒÂ¥Ì¦ÊÜÑƒÖĞ:÷’,ÛwÊ$ÁQAïp¦'iy”ì\–É6uKûlıåz“ı<¬O}ËàWÃäı6KÏ‰r·.şl”HéØç_ù¾aVËÕ‹üV¼Q™R×CQ@„Ã¦q+e_øuÅ×Ó‡z=¯òğdÉåD	Ù#)¦H÷ñfÈ?/F&­;DTî¿hÆJH*?èñ'V–lRÜÏªWGüÆjk öæDu(±Ä½ö‘‘V©ôãÒÒ…¬ËeğÁÀü®¬ƒmä&™X0Ã#k\şŞ[Ğ€k]•t»ÚÈÒšî1—·èjJæøñİ?‹óhƒRÈ«²Ã"i9Œªc$ˆQ§Ö#¦ŞĞfR•Às:lÈíua±™ıîöhêÿ[J±Ñ–sªºòTÑPçŒÈBLÔˆ3†¾JBM¿óV¦-ùæ®³ÁôŸÚ;N³nÍ*ã‘5ãçÚŠ^‡À¡`K_Ù³Ë¨y¡äSd…“$êpÏŠú2	Ç
œ¾`=°°
–YàOò_]«ğO?G€ÎÃ ?SNÏf$áü49Å‹CÌ™%SQœÖ¦Õ+q‘ùAÚx©Õ%ÜÅM×5¾)=V‰Y– ›æ á¨´¹96j“0$q*$ôİV&`#™1Ph	¯ÌtûF·z˜qÇ»ŒŠÎQúÄz	Ì†g©£Êµ|ÊY¢ÃïqÍ\øŒ¾­%mÕyyY´óºÙu_5ma¤<‡nó®tº±³·öcfL‰FÔZi¡)K¹ààËêd‹¶P s•U}ÔßáêNK~½ÜÛdV¢xÅr©ûRyŸ¯hÁŞÕ/;E?•Úé”ùùìI3³öpçxõp¹e“‹ÓÅö bˆ©ziüç¬e7>ëŸ¬Ô'
3‡ÕËZN@òäª,aº¸s‹|üC+W¾Ú¡	¥+ôâ¹©à-Ó7rd¢!–‹Ò®E zUiŞÿeÎE4!ş×cü5öB 
[A=*°]¿>NÚÃ^aùò`³$pAuAì§•ÄÀ•?ÈÈC'¯í²ìÌî¡AQÎ{°íÄq…7‘¤^¦¯wƒ$'hï‰İ›ÇÆï`ÏGâïëüæÇR¿…¹npÄ%Mx—-ÙĞ &ğõ£ˆ9a>=¥p\&²y¾¦©–Âº\8›ø)`˜n…A~ÍçûLPÚ†%%¾ä%‹ì*y (‹vÃkiö ,uÑÊÖ6¤’Õ ¯…tvÂ·é1ƒyéÎ8W‹`j™×¤hác ]r&“¿°±aí<aW ®îCå²•`uÛ-VDAKÅè	 õÁ©Q=ç™m8ÌÑNN_„},ÏÈv/ ş;½/GMÖ^ÅL¼NÛ¨%xê2C—Ô¢ys¾tó±UHöš­¾7×Ÿ§XÜğpĞÈ ÀÉ¦£qBÈÌ³o¦Q†-±i.½‹òø7IùCp†Šİğ¼£n 2>ôFçÎD_bD~Ï1†R¡¬8ùÙA<AúÕÜ§l¿ig½mËPøÎ2°ı"…Îê¬T¬3u"Vÿ¶ÿÆ¬ÿ„VA­ü»	ùh[ïoäİ›>½FêŞD¦íqcÂ¤§İ¯]ÉÑ'cyÜä‹Ù"vRÃP¥ ÔlÜ#t„5GR”¤7•ämàqv«¸$¢RÖ(*%‘WÂ†SÊ×]xÁÍò^6Ğ•Î'q}'C3aìW2!¶¼ş çîé*cgŞ'Øi B0Üaø™×¥h„ò¸ƒ•7\¼ƒÃu@w—ê&–1&§ÜÄ&¬P?1o§:ıu¬©D˜hş1Z¯59	øå>nw¶,(š^JØ|8°Ù§ú,§;dù›Í!oj" ßFDŒSzïõÕgPØcGÂB¯¤²xÕİÌÚèïœxôÂ “4E„bn5:1
©¶oÏü[7ÒC8í@ÙÅ$z¦õ3^Øš<k° Ü¬àD~¤JhJó]‹]:Mãb©Êg&7
şŸaidZ€A`t°V3ÅY4[­ãùóÉAñY'°¯Hl«§fXéÿ‚œmqaBÔn
Õ¾†ã°óíğñ \]ö>¨ã^˜‚[’vsƒGm{+·ßâñÂ}q/ªø~IÿÀpñµùcİóøUhq¥šäÖÅª…ÛQ^­ŠT`@Ó"¤ädcªwê‰´#ŒÜŒM1í)Ä- «(ò˜¢öæ~?©©-5RrdlŸÄÏ$¨üÒ¤jÅr8º>'wP{š§1q»j³Qcmˆ·…#_¥»"Ø Ñ{Æ­ÈØ}nCÕX¿WãIˆD¬££ï[‡©ó EºæšĞµcRg8‹iY9™.ßªš_!£„ â(¡ñö–âû.qøT
Àü„ævféóÆÑœ”*È°»†mN#¸÷“G cöÒv0âå|”…ñ‚,ª¯W.QU!qC£·Öî¾w£‰R[Œ%÷äÃ²¿*€Û&Ú¿Vˆ2íÅşR¼Wµ”…ğnùI—ø^äŠ²YÓÛß¡¤6`îìø#‡Ç®)ğNT<åO›òÎàÊ,jCdH‹ù Šîüj¥æì?ÜÚ-Çù —àÁäsÉğám‰Üåà¢GwJ‘|âãÙ^~»’õÚ÷=n?İ±tHFáRfSeîèAkh{I–mƒ;e’à¨ w8Ó“´<Jv.Ëd›º¥}¶şr½É~Ö§¾åNô‰«aò~›¥ç‡D¹[6J¤tìó¯|ß0«åêEÇ…~+Ş¨L©«¡( Â…aÓ¸•²/üºb‚ëéC½Wyx2är¢‹„ì‘S¤ûx3äŸ#“Ö"*÷_4ce$ÕŸ@
ôxˆ+Ë6)îgÕ«#~cµ5{ó
¢:”Ø?â^ûÈH«TúqiéBÖå2ø``~WÖA‡¶N	ò“L,˜á5.ÿï-hÀµ®Jº]mdiM÷˜Ë[t5%süøîŸÁy´A)ä€UÙa‘4ˆœ¿FÕ1Ä¨SëSo	h3)‡ÊFà96äöº°ØÌ~w{<õÿ-¥ØhË9U]yªh¨sd!&jÄCß¿?%¡¦ßy«ÓÇ|s×Ù`úOí§Y·f•ñÈšñsmE¯CàP°¥¯ìÙå‰Ô¼Pò)²ÂIu¸gE}ÇÇ„cN_°XXË,ğ'ù¯®Uø§Ÿ#@çAĞŸ)§g3’p~šÎœâÅ¡	æÌ’©¨FNkÓjÏ•¸È|È m¼Ôêîâ¢ëß”«Ä,KĞMs€ğTÚÜ›µI’8’Nún+°‘Ì˜N(4„„Wf:È}£[=Ì¸ã]FEç(}b½fÃ³ÔQåZ>ˆNå,Ñáó¸f.|FßÖ’¶ê¼¼,úÀyİìº¯š6Œ0RC·y×:İØÙÛû13¦D#j­´Ğ”¥\pğeu²€Å[(¹Êª>êopu§%¿^îm2+Q<Œâ¹Ôƒ¿}©¼ˆOW´`ïê—¢ŸJít
Êü|ö¤™Y[¸Fƒs¼z¸Ü²ÉÅéb{@±ÌT=4şsÖ²ŸÊõOVê…™Ãje­' yrÕ–0MÜ¹E>ş¡Œ•Œ«_íĞ¿„ÒzñÜTğ–é› 9²QÏËˆEi×Æ" ½ª4ïÿ2ç"šŒÿë1ş{!P…­ @Ø®_'ía¯°|y0Y¸ º öÇÓJbàÊd
ä¡“×vYOvGf÷Ğ Æ(ç=øvâ¸Â›HR/Sƒ×»A’4‰÷ÄnÇÍcãw°ç#ñ÷u~óc©ßÂ\·8bƒ€’&<†ˆË–lè@ øúQÄœ0Ÿ†Ò
8.Ù<_ÓTKa]G.œMü0L·Â ¿æó}&(HmOHÃ’_ò’Ev•<ĞG” ‚E»áµ4{ –‹ºhek›RÉjĞ×B:;áŠÛô€˜Á¼ôGgœ«ÅG0µÌkÒ´ğ9Ğ.9“É_ØØ°v°+PW÷‡‰¡†rÙB°ºí+¢ ¥bô€úàÔ¨óÌ6æh'ç†/Â>–gd»ĞÿŞ—£&k¯b&^§mÔ<u™¡KjÑ¼9_ºùØ*G${ÍVßŠkÏS,îx8hd àdÓÑ8!dæÙ7Ó(Cˆ–X‹4—ŞEùü›¤Œü!8CE…îGxŞQ7 z#†sg¢/1¢¿ç˜C©PVœüì  ıjîS¶ß´³Ş¶e(|gØ…~‘BgõV*Ö™:«ÛÿcÖB«† Vşİ„|G´­÷7òîMŸ^#uïN"ÓŒöÆ¸1aÒÓî×®äè“1O
O<ÏnòÅl;©áF¨R€j6î:Âš#)JÒ›…Jò6ğ8»U\Ñ)k•’‚‰È+áGÃ)åë.¼à‰fy/èJç“Š¸¾“¡™0ö+™[^Ğs÷tˆ±3ïì4P!î0üÌëR´	ByÜ‡ÁÊ[.ŞÁá: »Ku“FË“SnbV¨Ÿ˜·Sş:ÖT"ÌÎ4­×š‡œüò	·;[M/%l¾ØìÓ	}–SÏ€²üÍæ75ˆo#"Æ)ŒF½÷úê3(ì±#a!OÇWRY¼ênæmô¿wN<úa ‰É@š"B1·…TÛ·gşŠ­é!œö ìb=Óú¯lM5XnVp"?R%´¥ù®Å.&‡q±Tå3“ÿO„°4­À 0:X«™â¬š­Öñüù…ä ø¬ØW$¶ÕS3¬ôŠAÎ¶¨0¡j7…j_C‚qØùvx‰xP®Œ.{ÔqH/LÁ-I»¹‚Á£¶½•Û‚oñxá¾¸€U|¿¤`¸¿øÚü±îyü*´¸BMrë‹bÕÂí(¯VE*0 iRr²1Õ;õDÚFnÆ¦†öâUyLQûs¿ˆÔÔ–)¹N²¶Ob‰gT~iRµb9]Ÿ“;¨Š=ÍÓ˜8Ç]µÙÎ¨±6Ä[ÏÂ‘¯Ò]l€†è=cVdì>·¡j¬ß«ñ$D"ÖÑQŒ÷­ÃT†y€"]sMèÚ1©3Å´¬œL‡oUÍ¯ÑBqŠĞx{Kñ‹}—8|ªà~Bs;³ˆôyãhNJdØ]Ã6§ÜûÉ#Ğ1{i;ñr>ÊÂøAÕ×+—¨ª¼¡Ñ[kwß»ÑD)-Æ’{òaÙ_Àmí_+D™öb)^†«ÚÊG‹Bx·ü¤K|/rEÙ¬‰éíïPR0÷@vü‘Cc×x'*ò§Mygpu5‹!2¤ÅüÇEwşGµÆŒRsöní‡–ã|€Kğàò¹døğ¶DîrpÑ£{¥H¾ñ€ñl/¿]Éúíû
·ŸîX:$£p)³©2wô 5´Î½$Ë¶Á2IpTĞ;œéIZ%;—e²MİÒ>[¹Şd?ëSßr'øÄÕ0y½ÍÒóC¢Ü­‹?%R:öùW¾‡o˜Õrõ¢ãB¿oT¦ÔõPáÂ°iÜJÙ~]1Áõô¡^Ï«<<™Gr9ÑEBöHGŠ)Ò}¼òÏ‹‘Ië•û/ƒ1‚’êO z<Ä‰•å›÷³êÕ¿±Úˆ½yQJìq¯}d¤U*ı¸´t!ër|00¿+ë C[§yI&ÌğˆÀ—ÿƒ÷4àZW%İ®6²´¦{Ìå-ºš’9~|÷Ïâ<Ú rÀªì°HDÎß£ê	bÔ©õˆ©·´™”Ce#ğœr{]Xlf¿»=šúÿ–Rl´åœª®<U4Ô9#²5âŒ¡ïßŸ’PÓï¼Õi‹c¾¹ël0ı§öÓ¬[³ÊxdÍø¹¶¢×!p(ØÒWöìòÄj^(ùYá$‰:Ü³¢¾ŒãcÂ±§/X,¬‚eø“üW×*üÓÏ ã èÏ”Ó³I8?MgNñâĞsfÉTT#§µiµçJ\d>d6^ju	wqSuoJUb–%è¦9@ø*mnÍ…Ú$IœŠI'}·•	ØHfL'BÂ+3ä¾Ñ-„fÜñ.£¢s”>±^³áYê¨r-D§r–èğ{\3>£okI[u^^}à¼nvİUMF)Ï¡Û¼ënììí†ı˜S¢µVZhÊR.8ø²:YÀâ‡-È\eUõ·F8„ºÓ’ßG/÷6™•(Fq„\êÁß¾T^Ä'Ç+Z°wõËNÑO¥v:e~>{ÒÌ¬-\£Á9‡^=\nÙäât±=H ØfªGÿ9kÙOçú'+õ‰ÂÌa5Æ²Ö‡<¹êK˜&îÜ"ÿPÆJÆU„¯vè_Bé
½xn*xËôM€Ù‡¨gˆeÄ¢´k#€^Uš†÷™sMFˆÿõ½¨ÂVPJ l×¯“ö°WX¾<˜,	\P]ûãi%1påÀ2…òĞÉk»¬'»#³{hPc”ól;q\áM$©—©Áëİ É	šÄ{b·ãæ±ñ;Øó‘øû:¿ù±‡Ôoa®Û±A@IÃÄeK6t €	|ı(bN˜OCOiœ—‰l¯iª¥ ®#Î&~
¦[a_óù>$‚¶'¤aI‰/yÉ"»Jè#J Á¢İÆğZš= ËE]´²µÍ ©d5èk!pÅmz@Ì`^ú£3ÎÕâ#˜Zæ5é Zøh—œÉä/llX;OØ¨«ûÃÄPC9†l%Xİv‹QĞR1z@}pjTÏyfs´“sÃaË3²İè‡ÿNïËQ“µW1¯Ó6j	ºÌĞ%µhŞœ/İ|l•#’½fG«ïÅµÇç)w<42 p²éhœ2óì›i!DK¬EšKï¢ü şMRFşœ¡"ÇB÷#<ï¨€Œ½Ã¹3Ñ—ÑßsLƒ¡T(+N~vO~5÷)ÛoÚYoÛ2¾³ìB¿H¡³z+ëLˆÕ¿í†1ë¿¡UCP+ÿnB¾#ÚÖûy÷¦O¯‘ºw'‘iF{cÜ˜ƒ0éi÷kWrôÉ˜'…§Gç7ùb¶ˆÔp#T)@5÷aÍ‘%éÍB%yxœİ*.‰è†”5ŠJIÁDä•ğ£á”òu^ğD³¼—t¥óIE\ßÉĞLû•†Lˆm¯?è¹{º
DÇØÆ™÷	v¨w~æÆu)Ú¡<îÃ`åïàpĞİ¥ºI£eŒÉ)7±	+ÔOÌÛ©Nk*fgšŒÖkÍCN~ù„Û-Š¦—6_löi„>Ë©ƒgÀYşfsÈ›šÄ·ãF£Ş{}õöØ‘°§ã+©,^u7ó…6úß;'ı†0€Äd M¡˜[FŒBªíÛ3ÅÖôNûPv1‰iıŒ× ¶&Ï,7+8‘©ÚÒ|×b—N“Ã¸Xªò™É‚ÿ'BX‰Ö`Ğ¬ÕLqVÍVëxşüBrP|Ö	ì+Ûê©VzÅ¿ g[T˜Pµ›Bµ¯!Á8ì|;¼D<(WF—½ê8¤¦à–$ƒİ\ÁàQÛŞÊmÁ·x¼p_\À‹*¾_Ò?0Ü_|mşX÷<~Z\©&¹õE±jaÇv”W«"Ğ´)¹Ù˜êz"í#7cSC{
qÈ*Š<¦¨ı¹ßDjjKƒ”\'ÙÛ'±Ä3	*¿4©Z±®ÏÉTÅæiLœã®ÚlgÔÀXâ­gáÈWé®6@Cô±@+2vŸÛP5ÖïÕx"‘ ëè(ÆûÖa*Ã<@‘®¹&tí˜ÔÇbZVN¦Ë·ªæWÈh!ˆ8
Eh¼½G¥øÅ¾K>Õ€ğ?¡¹ƒYDú¼q4'¥
2ì®a›Óîıäè˜½´Œx9ea| ‹…‡êë•KTUHÜĞè­µ»ïÀİh¢”ÆcÉ=ù°ì¯
à¶‰ö¯¢L{±†¿/ÃUíå£E!¼[~Ò¥¾¹¢lÖÄôöw¨©˜{ ;şÈ!Ç±k
¼OùÓ¦¼3¸:‹šÅÒbşã ˆ¢;ÿ£ZcF©9û·öCËq>À%xpù\2|x["w9¸èÑ½R$ßxÀx¶—ß.‚d}ƒö}O…ÛOw,’Q¸”ÙT™;zĞZç^’eÛàN™$8*èÎô$-’Ë2Ù¦niŸ­¿\o²Ÿ‡õ©o¹|âj˜¼ßféù!QîÖÅŸŒ)ûü+ßÃ7Ìj¹zÑq!‚ßŠ7*Sêz(
ˆpaØ4n¥ì¿®˜àzúP¯çUÌ#¹œè"!{¤#Å”é>ŞùçÅÈ¤u‡ˆÊıÁA	Iõ'=âÄÊrƒMŠûYõêˆßXmÄŞ¼‚¨%ö¸×>2Ò*•~\Zºu¹>˜ß•uĞ¡­S‚¼À$fxD`ËÿÁ{p­«’nWYZÓ=æò]MÉ?¾ûgqmP
9`UvX$"çï‚QuŒ1êÔzÄÔ[ÚLÊ¡²xN‡¹½.,6³ßİMıK)6ÚrNUW*êœYˆ‰qÆĞ÷ïOI¨éwŞêÀ´Å1ßÜu6˜şSyÇiÖ­Ye<²fü\[Ñë8lé+{vyâ5/”|Š¬p’DîYQ_Æñ1áXÓ¬VÁ2KüIş«kşéçĞyôgÊéÙŒ$œŸ¦3§xqh‚9³d*ª‘ÓÚ´Event$8.SCROLL, function (event) {
        return _this._process(event);
      });
      this.refresh();

      this._process();
    } // Getters


    var _proto = ScrollSpy.prototype;

    // Public
    _proto.refresh = function refresh() {
      var _this2 = this;

      var autoMethod = this._scrollElement === this._scrollElement.window ? OffsetMethod.OFFSET : OffsetMethod.POSITION;
      var offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;
      var offsetBase = offsetMethod === OffsetMethod.POSITION ? this._getScrollTop() : 0;
      this._offsets = [];
      this._targets = [];
      this._scrollHeight = this._getScrollHeight();
      var targets = [].slice.call(document.querySelectorAll(this._selector));
      targets.map(function (element) {
        var target;
        var targetSelector = Util.getSelectorFromElement(element);

        if (targetSelector) {
          target = document.querySelector(targetSelector);
        }

        if (target) {
          var targetBCR = target.getBoundingClientRect();

          if (targetBCR.width || targetBCR.height) {
            // TODO (fat): remove sketch reliance on jQuery position/offset
            return [$(target)[offsetMethod]().top + offsetBase, targetSelector];
          }
        }

        return null;
      }).filter(function (item) {
        return item;
      }).sort(function (a, b) {
        return a[0] - b[0];
      }).forEach(function (item) {
        _this2._offsets.push(item[0]);

        _this2._targets.push(item[1]);
      });
    };

    _proto.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY$8);
      $(this._scrollElement).off(EVENT_KEY$8);
      this._element = null;
      this._scrollElement = null;
      this._config = null;
      this._selector = null;
      this._offsets = null;
      this._targets = null;
      this._activeTarget = null;
      this._scrollHeight = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread2({}, Default$6, {}, typeof config === 'object' && config ? config : {});

      if (typeof config.target !== 'string') {
        var id = $(config.target).attr('id');

        if (!id) {
          id = Util.getUID(NAME$8);
          $(config.target).attr('id', id);
        }

        config.target = "#" + id;
      }

      Util.typeCheckConfig(NAME$8, config, DefaultType$6);
      return config;
    };

    _proto._getScrollTop = function _getScrollTop() {
      return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
    };

    _proto._getScrollHeight = function _getScrollHeight() {
      return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    };

    _proto._getOffsetHeight = function _getOffsetHeight() {
      return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
    };

    _proto._process = function _process() {
      var scrollTop = this._getScrollTop() + this._config.offset;

      var scrollHeight = this._getScrollHeight();

      var maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();

      if (this._scrollHeight !== scrollHeight) {
        this.refresh();
      }

      if (scrollTop >= maxScroll) {
        var target = this._targets[this._targets.length - 1];

        if (this._activeTarget !== target) {
          this._activate(target);
        }

        return;
      }

      if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
        this._activeTarget = null;

        this._clear();

        return;
      }

      var offsetLength = this._offsets.length;

      for (var i = offsetLength; i--;) {
        var isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (typeof this._offsets[i + 1] === 'undefined' || scrollTop < this._offsets[i + 1]);

        if (isActiveTarget) {
          this._activate(this._targets[i]);
        }
      }
    };

    _proto._activate = function _activate(target) {
      this._activeTarget = target;

      this._clear();

      var queries = this._selector.split(',').map(function (selector) {
        return selector + "[data-target=\"" + target + "\"]," + selector + "[href=\"" + target + "\"]";
      });

      var $link = $([].slice.call(document.querySelectorAll(queries.join(','))));

      if ($link.hasClass(ClassName$8.DROPDOWN_ITEM)) {
        $link.closest(Selector$8.DROPDOWN).find(Selector$8.DROPDOWN_TOGGLE).addClass(ClassName$8.ACTIVE);
        $link.addClass(ClassName$8.ACTIVE);
      } else {
        // Set triggered link as active
        $link.addClass(ClassName$8.ACTIVE); // Set triggered links parents as active
        // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor

        $link.parents(Selector$8.NAV_LIST_GROUP).prev(Selector$8.NAV_LINKS + ", " + Selector$8.LIST_ITEMS).addClass(ClassName$8.ACTIVE); // Handle special case when .nav-link is inside .nav-item

        $link.parents(Selector$8.NAV_LIST_GROUP).prev(Selector$8.NAV_ITEMS).children(Selector$8.NAV_LINKS).addClass(ClassName$8.ACTIVE);
      }

      $(this._scrollElement).trigger(Event$8.ACTIVATE, {
        relatedTarget: target
      });
    };

    _proto._clear = function _clear() {
      [].slice.call(document.querySelectorAll(this._selector)).filter(function (node) {
        return node.classList.contains(ClassName$8.ACTIVE);
      }).forEach(function (node) {
        return node.classList.remove(ClassName$8.ACTIVE);
      });
    } // Static
    ;

    ScrollSpy._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY$8);

        var _config = typeof config === 'object' && config;

        if (!data) {
          data = new ScrollSpy(this, _config);
          $(this).data(DATA_KEY$8, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(ScrollSpy, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$8;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$6;
      }
    }]);

    return ScrollSpy;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(window).on(Event$8.LOAD_DATA_API, function () {
    var scrollSpys = [].slice.call(document.querySelectorAll(Selector$8.DATA_SPY));
    var scrollSpysLength = scrollSpys.length;

    for (var i = scrollSpysLength; i--;) {
      var $spy = $(scrollSpys[i]);

      ScrollSpy._jQueryInterface.call($spy, $spy.data());
    }
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$8] = ScrollSpy._jQueryInterface;
  $.fn[NAME$8].Constructor = ScrollSpy;

  $.fn[NAME$8].noConflict = function () {
    $.fn[NAME$8] = JQUERY_NO_CONFLICT$8;
    return ScrollSpy._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$9 = 'tab';
  var VERSION$9 = '4.4.1';
  var DATA_KEY$9 = 'bs.tab';
  var EVENT_KEY$9 = "." + DATA_KEY$9;
  var DATA_API_KEY$7 = '.data-api';
  var JQUERY_NO_CONFLICT$9 = $.fn[NAME$9];
  var Event$9 = {
    HIDE: "hide" + EVENT_KEY$9,
    HIDDEN: "hidden" + EVENT_KEY$9,
    SHOW: "show" + EVENT_KEY$9,
    SHOWN: "shown" + EVENT_KEY$9,
    CLICK_DATA_API: "click" + EVENT_KEY$9 + DATA_API_KEY$7
  };
  var ClassName$9 = {
    DROPDOWN_MENU: 'dropdown-menu',
    ACTIVE: 'active',
    DISABLED: 'disabled',
    FADE: 'fade',
    SHOW: 'show'
  };
  var Selector$9 = {
    DROPDOWN: '.dropdown',
    NAV_LIST_GROUP: '.nav, .list-group',
    ACTIVE: '.active',
    ACTIVE_UL: '> li > .active',
    DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
    DROPDOWN_TOGGLE: '.dropdown-toggle',
    DROPDOWN_ACTIVE_CHILD: '> .dropdown-menu .active'
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Tab =
  /*#__PURE__*/
  function () {
    function Tab(element) {
      this._element = element;
    } // Getters


    var _proto = Tab.prototype;

    // Public
    _proto.show = function show() {
      var _this = this;

      if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && $(this._element).hasClass(ClassName$9.ACTIVE) || $(this._element).hasClass(ClassName$9.DISABLED)) {
        return;
      }

      var target;
      var previous;
      var listElement = $(this._element).closest(Selector$9.NAV_LIST_GROUP)[0];
      var selector = Util.getSelectorFromElement(this._element);

      if (listElement) {
        var itemSelector = listElement.nodeName === 'UL' || listElement.nodeName === 'OL' ? Selector$9.ACTIVE_UL : Selector$9.ACTIVE;
        previous = $.makeArray($(listElement).find(itemSelector));
        previous = previous[previous.length - 1];
      }

      var hideEvent = $.Event(Event$9.HIDE, {
        relatedTarget: this._element
      });
      var showEvent = $.Event(Event$9.SHOW, {
        relatedTarget: previous
      });

      if (previous) {
        $(previous).trigger(hideEvent);
      }

      $(this._element).trigger(showEvent);

      if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) {
        return;
      }

      if (selector) {
        target = document.querySelector(selector);
      }

      this._activate(this._element, listElement);

      var complete = function complete() {
        var hiddenEvent = $.Event(Event$9.HIDDEN, {
          relatedTarget: _this._element
        });
        var shownEvent = $.Event(Event$9.SHOWN, {
          relatedTarget: previous
        });
        $(previous).trigger(hiddenEvent);
        $(_this._element).trigger(shownEvent);
      };

      if (target) {
        this._activate(target, target.parentNode, complete);
      } else {
        complete();
      }
    };

    _proto.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY$9);
      this._element = null;
    } // Private
    ;

    _proto._activate = function _activate(element, container, callback) {
      var _this2 = this;

      var activeElements = container && (container.nodeName === 'UL' || container.nodeName === 'OL') ? $(container).find(Selector$9.ACTIVE_UL) : $(container).children(Selector$9.ACTIVE);
      var active = activeElements[0];
      var isTransitioning = callback && active && $(active).hasClass(ClassName$9.FADE);

      var complete = function complete() {
        return _this2._transitionComplete(element, active, callback);
      };

      if (active && isTransitioning) {
        var transitionDuration = Util.getTransitionDurationFromElement(active);
        $(active).removeClass(ClassName$9.SHOW).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      } else {
        complete();
      }
    };

    _proto._transitionComplete = function _transitionComplete(element, active, callback) {
      if (active) {
        $(active).removeClass(ClassName$9.ACTIVE);
        var dropdownChild = $(active.parentNode).find(Selector$9.DROPDOWN_ACTIVE_CHILD)[0];

        if (dropdownChild) {
          $(dropdownChild).removeClass(ClassName$9.ACTIVE);
        }

        if (active.getAttribute('role') === 'tab') {
          active.setAttribute('aria-selected', false);
        }
      }

      $(element).addClass(ClassName$9.ACTIVE);

      if (element.getAttribute('role') === 'tab') {
        element.setAttribute('aria-selected', true);
      }

      Util.reflow(element);

      if (element.classList.contains(ClassName$9.FADE)) {
        element.classList.add(ClassName$9.SHOW);
      }

      if (element.parentNode && $(element.parentNode).hasClass(ClassName$9.DROPDOWN_MENU)) {
        var dropdownElement = $(element).closest(Selector$9.DROPDOWN)[0];

        if (dropdownElement) {
          var dropdownToggleList = [].slice.call(dropdownElement.querySelectorAll(Selector$9.DROPDOWN_TOGGLE));
          $(dropdownToggleList).addClass(ClassName$9.ACTIVE);
        }

        element.setAttribute('aria-expanded', true);
      }

      if (callback) {
        callback();
      }
    } // Static
    ;

    Tab._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $this = $(this);
        var data = $this.data(DATA_KEY$9);

        if (!data) {
          data = new Tab(this);
          $this.data(DATA_KEY$9, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(Tab, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$9;
      }
    }]);

    return Tab;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event$9.CLICK_DATA_API, Selector$9.DATA_TOGGLE, function (event) {
    event.preventDefault();

    Tab._jQueryInterface.call($(this), 'show');
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$9] = Tab._jQueryInterface;
  $.fn[NAME$9].Constructor = Tab;

  $.fn[NAME$9].noConflict = function () {
    $.fn[NAME$9] = JQUERY_NO_CONFLICT$9;
    return Tab._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$a = 'toast';
  var VERSION$a = '4.4.1';
  var DATA_KEY$a = 'bs.toast';
  var EVENT_KEY$a = "." + DATA_KEY$a;
  var JQUERY_NO_CONFLICT$a = $.fn[NAME$a];
  var Event$a = {
    CLICK_DISMISS: "click.dismiss" + EVENT_KEY$a,
    HIDE: "hide" + EVENT_KEY$a,
    HIDDEN: "hidden" + EVENT_KEY$a,
    SHOW: "show" + EVENT_KEY$a,
    SHOWN: "shown" + EVENT_KEY$a
  };
  var ClassName$a = {
    FADE: 'fade',
    HIDE: 'hide',
    SHOW: 'show',
    SHOWING: 'showing'
  };
  var DefaultType$7 = {
    animation: 'boolean',
    autohide: 'boolean',
    delay: 'number'
  };
  var Default$7 = {
    animation: true,
    autohide: true,
    delay: 500
  };
  var Selector$a = {
    DATA_DISMISS: '[data-dismiss="toast"]'
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Toast =
  /*#__PURE__*/
  function () {
    function Toast(element, config) {
      this._element = element;
      this._config = this._getConfig(config);
      this._timeout = null;

      this._setListeners();
    } // Getters


    var _proto = Toast.prototype;

    // Public
    _proto.show = function show() {
      var _this = this;

      var showEvent = $.Event(Event$a.SHOW);
      $(this._element).trigger(showEvent);

      if (showEvent.isDefaultPrevented()) {
        return;
      }

      if (this._config.animation) {
        this._element.classList.add(ClassName$a.FADE);
      }

      var complete = function complete() {
        _this._element.classList.remove(ClassName$a.SHOWING);

        _this._element.classList.add(ClassName$a.SHOW);

        $(_this._element).trigger(Event$a.SHOWN);

        if (_this._config.autohide) {
          _this._timeout = setTimeout(function () {
            _this.hide();
          }, _this._config.delay);
        }
      };

      this._element.classList.remove(ClassName$a.HIDE);

      Util.reflow(this._element);

      this._element.classList.add(ClassName$a.SHOWING);

      if (this._config.animation) {
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      } else {
        complete();
      }
    };

    _proto.hide = function hide() {
      if (!this._element.classList.contains(ClassName$a.SHOW)) {
        return;
      }

      var hideEvent = $.Event(Event$a.HIDE);
      $(this._element).trigger(hideEvent);

      if (hideEvent.isDefaultPrevented()) {
        return;
      }

      this._close();
    };

    _proto.dispose = function dispose() {
      clearTimeout(this._timeout);
      this._timeout = null;

      if (this._element.classList.contains(ClassName$a.SHOW)) {
        this._element.classList.remove(ClassName$a.SHOW);
      }

      $(this._element).off(Event$a.CLICK_DISMISS);
      $.removeData(this._element, DATA_KEY$a);
      this._element = null;
      this._config = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread2({}, Default$7, {}, $(this._element).data(), {}, typeof config === 'object' && config ? config : {});
      Util.typeCheckConfig(NAME$a, config, this.constructor.DefaultType);
      return config;
    };

    _proto._setListeners = function _setListeners() {
      var _this2 = this;

      $(this._element).on(Event$a.CLICK_DISMISS, Selector$a.DATA_DISMISS, function () {
        return _this2.hide();
      });
    };

    _proto._close = function _close() {
      var _this3 = this;

      var complete = function complete() {
        _this3._element.classList.add(ClassName$a.HIDE);

        $(_this3._element).trigger(Event$a.HIDDEN);
      };

      this._element.classList.remove(ClassName$a.SHOW);

      if (this._config.animation) {
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      } else {
        complete();
      }
    } // Static
    ;

    Toast._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $element = $(this);
        var data = $element.data(DATA_KEY$a);

        var _config = typeof config === 'object' && config;

        if (!data) {
          data = new Toast(this, _config);
          $element.data(DATA_KEY$a, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config](this);
        }
      });
    };

    _createClass(Toast, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$a;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$7;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$7;
      }
    }]);

    return Toast;
  }();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $.fn[NAME$a] = Toast._jQueryInterface;
  $.fn[NAME$a].Constructor = Toast;

  $.fn[NAME$a].noConflict = function () {
    $.fn[NAME$a] = JQUERY_NO_CONFLICT$a;
    return Toast._jQueryInterface;
  };

  exports.Alert = Alert;
  exports.Button = Button;
  exports.Carousel = Carousel;
  exports.Collapse = Collapse;
  exports.Dropdown = Dropdown;
  exports.Modal = Modal;
  exports.Popover = Popover;
  exports.Scrollspy = ScrollSpy;
  exports.Tab = Tab;
  exports.Toast = Toast;
  exports.Tooltip = Tooltip;
  exports.Util = Util;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=bootstrap.js.map
