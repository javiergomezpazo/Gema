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

  var ARROW_DOWN_KEYCODE = 40; /��ڴ�s%.22H.�������7��*1�t� ��67��Bo$NŁ�����l$3�
!ᕙr��B3�x�Q�9J�X/���,uT���SyKt�-����շ���://�>p^7�#����m���N7v�v�~̌�)шZ+-$e)|Y�.`��
d�����[#B�i����{��J�8B.��o_*/��-���E��R;��2?�=if�������.�lrq��%Pl 3U�#�����Ƨs����Da氚@cY��	H\��%Lwn��(c%�*�W;�/�t�^<75�ez&@��C�3D2bQڵ�@�*M���̹�&#��z���^Ta+�G%����I{�+,_L�.�.�����r���y��]֓ݑ�=4�1�y��8��&������n��M�=��q�����H�}����C�0���� ��	�a�%:��~%̧���΂�D6��4�RXבg?ӭ0ȯ�|�I
A�Ұ����d�]%�%�`�ncx-���.Z��f�T�����N��6= f0/���jqL-�t -|4K�d�W66��'l
���ab��C��n�Ś(h�=�>85��<��9�ɹደ����������ګ���i��O]f�Z4oΗn>���^����������� 8YttN�y��4��%�"ͥwQ~ �&+#�P�c���w�@Ƈֈ�ܙ�K���9��P*�'?;�'H�����7�m
�Yv�_��Y����u�N����?Ø�߀Ъ!��7!�m����sӧ�Hݻ��4��1n�A�����+9�d̓��#�s��|1[�Nj�����{����H���f���<�n�DtC�E��`"�J��pJ��/x�Y������"��dh&��JC&Ė���=]E��cl���:mT�;?s�m�P�a��wp���Rݤ�2�䔛؄�'��T���5��3M?F��!'�|���ΖE�K	�� 6��@B����3`�,�9�MM�ۈ�q
�Qｾ�
{�HX���T����B���~C@b2���P̭F'�@!��홿b�Fz��(��DǴ~�k [g���ȏT	�@i�k�K��a\,U���F�� ,�Dk0���j�8+�f�u<~!9(>���m��+��_��-*L���M��א`v�^"�+���u�SpK��n�`�mo��[<^�/&�E�/��/�6,{�
-�T����X��c;ʫU�
LhZ��\�lL�N=�v����)��=��dES����"5���AJ��l��X��_�T�XG����bO�4&�qWm�3j`��ֳp�tW�!z�X���m���j<	�H�ut�}�0�a�H�\�vL��c1-+'��[U�+d4�D�"4�ޣ�R|b�%�j@x������,"}�8��Rvױ�i�z�t�^�F�����0�@���C���%�*$nh����w�n4QJc���|X�Wp�D��
Q��X�_
���v��Ѣ�-?�� ߋ\Q6kbz�;Ԋ��=�����5މ���iS�\�E�b�i1�q Dѝ�Q�1�Ԝ��[���8�=��|.>�-��\��^)�o<`<��oA��A�����;��(\�l��=h�s/ɲmp�L�gz��G��e�lS����_.7����Է�	>q5L�o����(w���F���}����f�\���o��)u=D�0l�R��_WLp=}���*O�\Nt��=ґbʀto���bdҺCD����`�����H�qbe��'���z}�o��bo^AT��G�ki�J?.-]Ⱥ\���:���)A^`��3<"�������UI���,��sy���d����8�6(��*;,���w��:F�uj=b�-m&�P�<�Æ�^���n�����m9��+OuΈ,�D�8c����$��;ou`��o�:L����4�֤2Y3~���t
���=�<�J>EV8I����/���p�����`�$�յ
��s�<�3��lF�әS�84��Y2��imZ�����Z]�]�t]��c��e	�i��J��cs�6	C��@�I�mg6��	������L�ot��w�˨���A���mx�8�\�ѩ�%:���ŀ���Z�V���E8��]�UӆF�s�6�zA�;;{�a?fF��hF�������N��a2wY�G�������˽Mf%��Q!�z�/�����]��S�S��NA��Ϟ43k�hp��W[6�8]l v���Ǒ��Zv�ӹ��J}�0sXM�����$O�����;���?���q���R�B/��
�2} G�!�b�(��X�W����_�\D��=�_c/��ܣ����=��/&KT���xZI\9��L�<t��.��������NWxI�ez�z7Hr�&���yl���|$���o~�!�[���GlP҄ǰ qْ`_?�����SZg�e"��k�j)��ȅ�����V��|�����	iXR�K^�Ȯ���@�h�1��f�rQ�lm3@*Y�ZHg'\q�3����s��(��yM:�>�%g2���v���01�P�![	V��bE�T�� P��s�ن�����E���l�����r�d�U��봍ZB��.3tI-�7�K7[�d����{Cq��y���� �l:'��<�fe�k��һ(?����?g�ȱ���;�`cCo�`�L�%F���`(ʊ����_�}���v�۶��,��/R����A�:S'b�o��a��o@h��ʿ����F޽��k���Id���7� Lz��ڕ|2�I����M��-b'5�U
P��=BGXs$EIz�PI�g��K":!e��BR0y%�h8�|݅<�,�e]�|R�w24�~�!b��z��1�q�}��*����q]�6A(��0Xy��;8\tw�n�hcr�Ml�
��v��_ǚJ�ٙ����Z󐓀_>��vg˂�饄�W��}Z ��r���C����&�mD�8����^_}�=v$,���j*�W��|����ΉG�! 3HSD(�^�c��j���_�u#=��~�]L�gZ?�5��ɳ��
N�G��v�4��إ��0.��|&r�����F�� tFc5S��A��:�?���u�Ķzj��^�/��&T@�P�kh0;�/ʕ�e�:�)�%�`7W0xԶ�r[�-/�����_�?�=�_�W�In}Q�Zر�ժH4-B�@�A6�z��H;������ОB\��"�)j�����R� %�I���I,�L��/M�V,���srU��y縫6�50ֆx�Y8�U�+���g,Њ���6T��{5��H$�::��u��0P�k�	];&u�㱘������2�A"�Bo�Q`)~���O5  ��Ohn�`>o�I���k��4�{?y:f/m#^��GY_ �b��z�U74zk��;p7�(���XrO>,���m��k�(�^��/��pU�@�hQti��E�(�51��jAj�Ȏ?r��q��D�S��)��΢f1D����8 �����֘Qj��í��r�p	�@>�ޖ�].zt��70��巋 Yߠ}�S���K�d.e6U���ҹ�d�6�S&	�
z�3=Iˣd�L��[�g�/כ��a}�[���&�Yz~H��u�g�DB�>�����Z�^t\���ʔ��"\6�[)�¯+&��>��y��'�H.'�H��H1e@��7C�y12i�!�r�Ec0FPBR�	�@��8���`��~V�:�7V[�7� �C��#��J���.d].��weth� /0�ĂX���ނ\몤��F��t���EWS2Ǐ��Y�G�BX�I����`T#A�:�1���6�r�l��aCn����w�GS��R����SՕ���:gDb�F�1���Sj���:0ms�7w�����q�ukV��?�V�:[�ʞ]��@�%�"+�$Q�{Vԗq|L8V��끅U�����Z��9t��rz6#	���)^�`�,��j�6��\������K�.�.n���M�J̰�4@��ͱ�P��!�Sq ��2Ɍ�B�@Hxe���7���Ì;�eTt��� �K`6<KU���T�~�k�b�g�m-i���ˢ��ͮ��iC#�9t�w��Ӎ��ݰ3#`J4��JMY�_V'X����������PwZ�����&���(��K=�ۗʋ��|E��~�)���N����cO����k48������-�\�>�	;�L��H�?g-���\�d�>Q9�&�X��p�'W�`	�ĝ[���Hɸ����K(]��Mo��	�c����X�vm,ЫJ���/s.���㯱U�
�Q	����q��
˗�%��`<�$.�A�p@:ym��dwdwj�rރm'�*��$�25x�$9AxO�v�<6~� {>_�7?���-�u��#6(i�cX��lɆ0��E�	�i�)����2���5M5�u����O�t+�k>�g��D���4,)�!/ydW�}D	 X��^K�`���V�� ��&}-����M��KtƹZ|S˴&@��3����k�	�uu�j(ǐ���n�"
Z*FO �N��9�l�a�vrn�"�cyF�{����}9j��*f�u�F-!�S���͛󥛏�rD���h������<���FN6�Bf�}3�2�h��Hs�]���I���3T�X�~��u��7b8w&�#�{�i0
e���
�	ү�>g�M;�m[��w��]�)tVo`Šb�������0f�' 5jj��M�wD�z#����5R��$2�ho�s&=�~�J�>�����\�&_���n�*�f��#�9��$�Y�$o��[�%ݐ�FQ))���~4�R����h�����t>���;�	c�Ґ	���=wOW�h��8�>�N����ܸ.E� ��}�������T7i��19�&6a���y;��cM%���@��z�y�I�/��q��eA��R��+���>-��g9u��!��lyS��6"b��h�{��>��;�t|-�ţ�f��F{�ģ����)"s�щ1PH�}{�غ��i� �&�3������Y��f'�#UB;P��[��hrCU>3�Q��DK#�Z � ����)�ʠ�jϟ_H��:�}Eb[=5�J���l�
*�vS��5$��o�������A���ܒd��+<j�[�-���xQ��K��������ǯB�+�$��(V-�؎�jU��!E � S�SO�A`�fl�ahN!nYE���?���HMm�q���$[`�$�x&@�&U+����9�����<��s�U��kC��,y*��l��3`E��s����OB$`�y�:Le�(�5ׄ��:��XL���t�V��
� G����(���w�çP ��'4�s0�H�7��TA��5ls���<����/g�,�/d��P}�r��
���v��M���b,�'��U�6���B�i/���e��]�|�(�w�O�4��"W�͚���� �sd�9��8rM�v��)ڔwWgQ�"CZ� QtgTj�(5g���~h9��n ��oK�.=�W������E��oм�p�鎥C2
�2�*sGJC��K�l�)�G�Ù���Q�sY&��-����M��>�-w�O\���,=?$�ݺ��Q"�c��{��Y-W/:.D�[�FeJ]E.�ƭ�}��\O����Óy$�]$d�t��2 �Ǜ!�����Q���1#(!��R��C�XYn0	q?�^����؛Wա����GFZ�ҏKK�.���:�qJ��db���q�?xoA�uU��j#Kk��\ޢ�)���w�,ƣJ!����A��]0��� F�Z��zK@�I9T6��!�ׅ�f��ۣ��o)�F[Ω��CEC�3"1Q#����)	5��[��8曻��jo8ͺ5��G֌�k+z��-}e�.Ox�慒ON���=+��8>&+p�����*Xf�?�u��?�:��L9=�����t�/M0e�LE5rZ�V{��E�Ci�V�p7]����X%fY�n��?�����\�Mĩ8�t�w[���d�tB�a $�2�A��B�a��2*:O�c�%0���*��At*g���5s1�3����U��e���f�}մa����ͻ^�����n؏�0%Qk���,傃/��,~�B��UV�Qk�C�;-�}�ro�Y��aGȥ��K�E|r��{W���Tj�SP��'����5�s|����M.Nۃ�`��q�񟳖��t��R�(�Vh,c}8ɓ�~��i��-��e�d\E�j��%��Ћ箂�L�ȑ}�z�XF,J�6�U�ix��9�d��_�����*l��Bv��8i{��˃ɒ��q�?�VW� S8 ����z�;2��5N9�����D�~������I�'v;n�c�=����{H��}��4�1,@\�dC��׏"��4��V�Yp������Z
�:r�l⧀a��5��3AA"h{B�����,���>�,�m����\�E+[��JV����	Wܦ��?:�\)>��e^���ρvəL��Ɔ��]���?L5�c�V��m�X-#' ��F��g��0G;97|��<#۽�~����5Y{53�:m����]R�������V9"�kv���P\{|�bqw��A# '���	!3Ͼ�FB��Z���.���$e��*r,t?�����1�;}��=�4J����o��Ws�������-C�;��.�:�7�bP��ԉX���g��Z5���&�;�m���wo���{w�f�7ƍ9��v?v%G��yRxz�y.p�/f��I7B�T�q���IQ��,T����٭⒈nHY���LD^	?N)_w�O4�{�@W:�T���̈́�_iȄ��������@4p�l�y�`��
�p��gn\��M��>V�p���]��4ZƘ�r��B�ļ���ױ�avf���h��<�$��O���ٰ�hz)a���f�H賜:x��o6�����@|1Na4��W�Aa�	y:����Uw3_h���s��oHL������(�ھ=�Wl�H�_ e����x`k���p����*�(�w-v�49���*���(�"���h- ]���Z�ge�l����/$�g���"����a�W�r�E�	P�)T���η�Kģret����Cza
nI2�����|��������%�C�����u��W�ŕj[_�vlGy�*R�M��"�k���ީ'Ҏ 0r36�0�������c�ڟ��@����xH�u�-�}K<���K��������AU�i���9��vF��!�z�|��`4D��"c��Uc�^�'!	���b�o�2��kB׎I��x,�e�d�|�j~��f���P���{X�_���S( o���9�E��GsR� ���9���O���K����3�Q��Xx��^�DU����Z��܍&jil1�ܓ��� n�h�Z!ʴk�KA�2\�.P>Z»�']�{�+�fMLo�Z�ڀ���bp���;Q�?m�;����Y�!-�?�(��?�5f����pk?��\�7��%Ç�%r����+E��g{��"H�7h��T��t��!�K�M�����u�%]��I�����LO��(ٹ,�m������&�yX���;�'����m���n]��(�ұϿ�=|ì��"��x�2������M�Vʮ��	���:^���<�ˉ.�G:RL���͐^�LZw�������T)��!N�,7ؤ��U������@��+��Pb��{�##�R�ǥ�Y������]Y�:%�L2�`�Gָ����׺*�v���5�c.o�Ֆ�������Ve�E� r�.U�H�N�GL�-�ͤ*��tؐ���b3��������b�-�Tu婢������g}�����~�L[��]g��?�w�fݚU�#k�ϵ��C����g�'>P�Bɧ�
'I���e�8}�z`a,���侺V�~� �A����H��i:s��&�3K��9�M�=W�"�!���R�K��ۮk|Sz�2�,A7��Pissl.�&aH�TH:黭L�F2c:��0^�� ��n1�0�w���1����RG�k� :��D��㚹�}[Kڪ����u��j�0�Hy��]/�tbgo7��������BS�r�����?l�@�*����5�!ԝ��>z��ɬD�0�#�R����">9^т��_v�~*��)(��ٓffm��9<���r�&���A�0S�8���Y�n|:�?Y�Of�	4��>����U?X�4q����2V2�"|�C�JW��sS�[�o��>D=C,#�]� ���4��˜�h2B����k�@��zTa�~}��������dI���8�O+��+~�)��N^�e=���C����`ۉ�
o"i�L^�IN�$��7���1�������͏=�~Kr�>��J�� &[��L��Gs�|zN+�,�Ld�|MS-�u�p6�S�0�
������� �=!KJ|�K�U�@Q�6����X.ꢕ�mH%�A_��+n�b���q���2�I���@��N&ac��y®@]�&��1d+��[������ �S�z�3�`������X���^@?�wz_������x��Q��e�.�E��|��c���5;Z}o(�=>O��;�᠑��MWㄐ�g�L�!Zb-�\z��o2��9��yG� d|�Ν��Ĉ��c�BYq�x����O�~��zۖ��e`�E
��X1�Xg�D��m�3�Y���Z�wrѶ��Ȼ7}z�Խ;�L3����IO�_���O�<)<=�<���e䤆�J���G�k��(Io*�����VqID7��QTK
&"��������'��l�+�O*��N�b�د4dBly�A���U 8�6μO��@�`���37�K�&�q+o�x���.�M-cLN��MX�~b�Nu��XS�0;3��c�^kr2��g|��lYP4����
p`�O$�YN<v��7�C��D@ ����0���Ϡ��΄�<_Ie񪻙/����9��7�$&i���jtbRmߞ�+�n��p�.���I�L�g�05y�`A�Y���H�����t���R��Ln�?��H� �.��`�f��2h�R������N`_��VOͰ�+�9ۢ
���}	�a���%�A�2��}P�!=0�$��
���Vn�����^T�����!���k�Ǻ����J5ɭ/�U;���Z����EL�5��T��iG��b��[@VQ�1E���~ RS[j��:��>�%�IP��IՊ�pt}N�*�4Oc�w�f;���o=G>JwE����Z���܆��~�Ɠ�XGG1޷S��t�5�kǤ�p<Ӳr2]�U5�BF3A�Q(B��=
,�/�]���7�)���"�獣9)U�awۜFq�'�@���`���(�Y,<T_�\���Fo��}�F�4�K�ɇeU �M�� eڋ5�� x�j(-
���.��e�&���C-Hm����G18�]S���xʟ6���Y�,�Ȑ�@���3J����Z��A.����������E��"��Ƴ��v$���{*�~�c鐌¥̦��у��:��,�w�d�QA�p�/iy��\��6uK�l��z��<�O}˝�W���6K��r�.�l�H���_��aV�Ջ��V�Q�R�CQ@�æq+e_�u��Ӈz=���d��D	�#)�H��fH?/F&�;DT�h�JH�;���'V�lR�ϪWG��jk ��Du(������V����҅��e�������m��&�X0�#k\��[Ѐk]�t���Қ�1���jJ����?��h�R����"i9��c$�Q��#���fR���s:l��ua�����h��[J�іs���T�P��BLԈ3��JBM��V�-��殳����;N�n�*�5��ڊ^���`K_ٳ��y��Sd��$�pϊ�2��	�
��`=��
�Y�O�_]��O?G�΃�?SN�f$��4�9ŋCS̙%SQ��֦՞+q���A�x��%��MW5�)=V�Y���� ����96b�0$q*$���V&`#�1�Ph	��t��F�z�qǻ���Q��z̆g��ʵ|��Y���q�\����%m�y9Y���u_5ma�<�n�t�����cfL�F�Zi�)K�����d��P s�U}����NK~���dV�xEr�{Ry��h���/;E?�������I3��p��x�p�e�����(�b��zi��e7>�러�'
3���ZN@��,a��s�|�C+W�ڡ	%+�⹩�-�7rd��!��Ү�E zUi��e�E4!��c�5�B�
[A=*��]�>N��^a��`�$pAuA쏧����?��C'�����A�Q�{���q�7��^��w�4#h�ݎ����`�G������R���np�%MxL�-�с &����9a>=�p\&�y����º�\8��)`�n�A~���LP�ڞ��%%��%��*y��(�v�ki� ,u���6��ՠ��tv���1�y��8W��`j�פh�s�]r&����a�<aW���C���`u�-VDAK��	 ���Q=�m8��N�_�},��v/��;�/GM�^�L�Nۨ%x�2C�Ԣys�t�U�H����7���X��p�� �ɦ�qB�̳o�Q�-�m.����7I�Cp��ݏ�n 2>�F��D_bD�1�R��<��A8A��ܧl�ig�m�P��2��"����T,3u"V���Ƭ��VA�����h[�o�ݛ>�F�ڝD��qc¤�ݯ]��'c��y����"vRÍP� �l�#t�5GR��7��m�qv��$�R�(*%�W�S��]x���^6Е�'q}'C3a�W2!�������*cg�'�i�B0�a��ץh����7\���u w��&��1"���&�P?1o�:�u��D��h�1[�59	��>nw�,(�^J�|8�٧�,��;d���!oj" �FD�S�z���gP�cG�B�����x������x�� ��4E�bn5:1
��o��[7�C8�@��$z��3^ؚ<k� ܬ�D~�JhJ�]�]:M�b��g&7
��ai$Z�A`t�V3�Y4[�����A�Y'��Hl��fX����mQaB�n
վ������\]�>��^��[�vs�Gm{+�����}q/��~I��p��c���Uhq����Ū��Q^��T`@�"��dc�wꉴ#�܌M1�)D- �(���~?��-5Rr�dl���$��Ҥj�r8�>'wP{��1q��j��Qcm����#_��"� �{����}nCUX�W�I�D����[��� E��еcRg8�iY9�.ߪ�_!�� �(������.q�T
����vf���ќ�*Ȱ��mN#���G�c��v0��|����,��W.QU!qC����w��R[�%��ò�*��&ڿV�2���R�W�����n�I��^䊲Y��ߡ�6`���#�Ǯ)�NT<�O�����,jCdH��� ����j����?��-�� ����{���m����G�J�|���^~�����=n?ݱtHF�RfSe��Akh�{I�m�;e�ਠw8ѓ�<Jv.�d���}��r��~֧��N���a�~���D�[6J�t��|�0���Eǅ~+ިL��( aӸ��/��b���C��Wyx2��r���쑎S��x3�#��"*�_4c%$՟@
�|�+�6)�gի"~c�5{�
�:��?�^��H�T�qi�B��2�``~W�A��N	��L,���5.��-h���J�]mdiM���[t5%s����y�A)�U�a�4���F�1ĨS�So	h3)��F�96������~w{4��-��h�9U]y�x�wFd!&j�C߿?%���y��V�|s��`�O��Y�f��Ț�smE�C�P������ԼP�)��Iu�gE}�ǄcN_�XX�,�'���U���#@�AП)�g1�p~�Μ�š	�̒��FNk�j�ո�|� m������ߔ��,K�Ms��T����I�8�N�n+��ΘN(4��Wf:�}�[≠�]FE�(}b�fó�Q�Z>�N�,����f.|F�֒�꼼,��y�캯�6�0R�C�y�:�����13�D#j��Д�\p�eu���[(��ʪ>�o�pu�%��^�m2+Q<���ԃ�}���O�W�`�ꗝ��J�t
��|���Y[�F�s�z�ܲ���b{�@��T=�4~sֲ���OV����j�e�' yr��0MܹE>������_�п��z��T�� 9�Q�ˈEi��" ��4��2�"����1�Z{!P����@خ_'�a��|y0Y��� ���Jb�ʁd
䡓�vYOvGf�Р�(�=�v�HR'S�׻A�4���n��c�w��#��u>�c���\�8b���&<��˖l�@ ��QĜ0����
8.�<_�TKa]G.�M�8L�� ���}&(HDmOHÒ_��Ev�<�G� �E���4{ ���`ek�	R�j��B:;������Gg���G0��k���9�.9��_�ܰv��+PW�����r�J���+���b����Ԩ���6�h'�/�>�gd����ޗ�&k�b&^�m�<u��KjѼ8_���*G${͎V��k��S,�x8jd �d��8!d��7�(C��X�4��E������!8CE���Gx�Q7 z#�sg�/1���C�PV��� � �j�S�ߴ�޶e(|g؅~�Bg�V*֙:���c�B���V�݄|G���7��M�V#u�N"ӌ�Ƹ1a���׮��1O
O�<�n��l;��F�R�j6�:#)Jқ�J�6�8�U\�)k�����+�G�)��.���fy/�J瓊�����0�+�[^�s�t����3��4P!�0�̍�R�)By܇��.���8��Ku���SnbW����R��:�T"��4��ך����	�;[M/%l����	}�Sπ����75o#"�)�F����3(�#a!O�WRY��n�m��wN<�a ��@�"B3���T۷g����!����b=���lM�5XnVp"?R%�����.�&�q�T�3��O��4���0:X��������������W$��S3��Aζ�0�j7�j_C�q��vx�xP��.{�qH/L�-I��������ۂo�xᾸ�U|��`�������i�*��RMr�b��(�VE*0�iRr�1�;�D�FnƦ��b�UyLQ{s���Ԗ)�N��Ob�gT~iR�b9]��;��=�Ә8�]��Ψ��6�[���]l���=c�Vd�>��j�߫�$D"��Q����T�y�"]sM��1�3�Ť��L�oUͯ��Bq��x{�K�}�8|��~Bs;���y�hNJd�]�6����#�1{i;�2>���A��+�������[kw߁��D)�-ƒ{�a�_�m�_+D��b	)^����G�Bx���K|/rE٬����PR0�@v��C�c�x'*��Mygpu5�!2����Ew�G�ƌRs�n퇖�|�K���d��D�rpѣ{�H���l/�]�����
���X:$�p)��2w��5�ν$����2IpT�;��IR%;�e�M��>[��d?�S�r'���0y����C�ܭ�?%R:��W��o��r���B�oT���P�°i�J�~]1����^ϫ<<�Gr9�EB�HG�)�}��ϋ�I���/�1���O z<ĉ������������yQJ�q�}d�U*���t!�r|00�+�C[�y�I&��������4�ZW%ݮ6���{��-���9~|���<ڠr���HD����	bԩ�������Ce#�r{]Xlf��=����Rl�圪�<U4�9#�5⌡�ߟ�Q��Ձi�c���l0����Ӭ[��xd������!p(��W����j^(�Y�$�:ܳ����c±�/X,��e���W�*����� �ϔӳI8?mgN���sf�TT#��i��J\d>d�6^ju	wq�u�oJ�Ub%�9@�*mn�ͅ�$I��I%}��	�HfL'B�+3��-�f��.��s�>�^��Y�r-D�r���{\3?�okI[u^^}�nv�WMF)ϡۼ��n�����S��VZh�R.8��:Y��-�\eU��F8��Ӓ�G/�6��(Fq\��߾T^�'�+Z�w��N�O%v:e~>{�̬-\��9�^=\n���t�=H��f�G�9kٍK��'+����a5�Ʋև�<��K�&��"�P�J�U��v�_B�
�xn*x��M�ه�g�eĢ�kc�^U����sMF�������VP�J lׯ����WX�<�,	\P]��i%1p��2����k��'�!�{hPc��l;q\�M$������ �	��{b����;����:�����oa���A@I��eK6t �	|�(bN�OCOi���l��i����#�&~
�[a�_��>$��'�aI�/y�"�J�#J �����Z�= �E]���� �d5�k!��p�mz@�`^��3���#�Z�5� Z�h����/llX;O������@C9�l%X�v�Q�R1z@}pjT�yfs��s�a�3����N��Q��W1��6j	����%�hޜ/�|l�#��fG��ŵ��)w<42 p��h�2��i�!DK�D�K�� �MRF���"�B�#<����ù3ї��sL��T(+N~vO�~5�)�o�Yo�2���B�H��z+�L��տ��1��UCP+�nB�#���y��O���w'�iF{cܘ�0�i�kWr�ɘ'��G��7�b����p#T)@5�a͑%��B!yx��*.�膔5�JI�D����u^�D���t��IE\���L���L�-�?�{�
D��ƙ�	v�w~��u+��<��`���p�ݥ�H�e��)7�	+�O�۩Nk*fg���k�CN~���۝-���6_l�i��>˩�g�Y�fsț�ķ�F��{}��ܑ����+),^u7�6��;'��0��d M��[�N��B���3�֍�N�Pv1��i��� �&�,7+8��ځ�|�b�N�øX��ɍ��'BX��`���LqV�V�x��BrP|�	�+��Vzſ g[T�P��B��!�8�|;�D<(WF���8����$��\��Q���m��x�p_\��*�_�?0�_|m�X�<~Z\�&��E�ja�v�W�"д)�ј�z"�#7cSC{
q�*�<�����DjjK���\'��'��3	*�4�Z�����TŞ�iL���lg��X�g��W�6@C���@+2v��P5���x"� ��(���a*�<@���&t����bZVN�˷��W�h!�8Eh��G���žK>Հ�?����YD��q4'�
2�a�����蘽��x9ea|� ˅���KTUH��譵����h���c�=���
ඉ���L{���/�U��E!�[~ҥ>��l����v���{ ;��!Ǳk
�O�Ӧ�3�:����b�� ��;��ZcF�9���C�a>�%xp�\2|x[&w9��ѹR$�x�x���.�d}��}O��Ow.�Q���T�;z�Z�^�e��N�$8*���$,����2٦ni���\o�����o�|�j���f��!Q��ş�)��+��7�j�z�q!�ߊ7*S�z(
�pa�4n������z�P��U��#���"!{�#Ŕ�>����Ȥu������A	I�'�=���r�M��Y���Xm�޼��%����>2�*�~\Z��u�>�ߕuС�S���$fxD`����{p���nWYZ�=��]M�?��gqmP
9`UvX$"��Qu�1��z��[�Lʡ�xN���.,6���M�K)6�rNUW�*�Y��q����OI��w�����1��u6��S{�i֭Ye<�f�\[��<l�+{vy�5/�|��p�D�YQ_��1�X���V�2�I��k����ytg��ٌ$���3�xqh�9�d*��Y$5,
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
     ��s%.22H/�������7��*1�t� ��67��Bm�$NŁ�����l$3�
!ᕙr��B3�x�Q�9J�X/���,uT���S9Kt�=����ѷ���://�>p^7�#����m���N7v�v�~̌�)шZ+-4e)|Y�,`��
d�����[#B�i�{��J�8B.��o_*/��-ػ�e��R;��2?�=if�������.�lrq��$P� 3U�#�����Ƨs����Da氚@cY��	H�\��%Lwn��(c%�*�W;�/�t�^<7�e�&@��C�3�2bQڵ�@�*M���̹�&#��z���^Ta+�G%����I{�+,_L�.�.�����r���y��]֓ݑ�=4�1�y��8��&������n��M�=��q�����H�}����C�0���� ��	�a�%:��~1'̧���΂�D6��4�RXבg?ӭ0ȯ�|�	
A�Ұ�Ė�d�]%�%�`�ncx-���.Z��f�T�����N��6= f0/���j�L-�t -|�K�d�66��'�
���ab��C��n�Ŋ(h�=�>85��<��9�ɹደ����������ګ���i�� O]f�Z4oΗn>���^����������� 8�t4N�y��4��%�"ͥwQ~ �&)#�P�c���w�@Ƈވ�ܙ�K���9��P*�'?;�'H�����7�m
�Yv�_��Y����u�N����?Ø�߀Ъ!��7!�m����{ӧ�Hݻ��4��1n�A�����+9�d̓��#�s��|1[�Nj�����{����H���f���<�n�DtC�E��`"�J��pJ��/x�Y������"��dh&��JG&Ė���=]��cl���;T�;?s�m�P�a��wp���Rݤ�2�䔛؄�'��T���5��3�?F��!'�|���ΖE�K	�� 6��@B����3`�,�9�MM�ۈ�q
�Qｾ�
{�HX���T����B���~C@b2���P̭F'�@!��홿b�Fz��(��Dϴ~�k [�g���ȏT	�@i�k�K��a\,U���F��!,�Dk0��Vj�8+�f�u<~!9(>���m��+��_��-*L���M��א`v�^"�+���u�SpK��n�`�mo��[<^�/.�E�/��/�6�{�
-�T����Z��c;ʫU�
hZ��\�lL�N=�v����)��=��dES����"5���AJ��l��X��_�T�XG����bO�4&�qWm�3j`��ֳp�tW�!z�X���m���j<	�H�ut�}�0�a�H�\�vL��c1-+'��[U�+d4�D"4�ޣ�R�b�%�j@x������,"}�8��Rvװ�i�~�t�^�F�����0�@���C���%�*$nh����w�n4QJc���|X�Wp�D��
Q��X�_
���v��Ѣ�-?�� ߋ\Q6kbz�;Ԃ��=�����5މ���iS�\�E�b�i1�q Dѝ�Q�1�Ԝ��[���8�<��|.>�-��\��^)�o<`<��oA��A�����;��(\�l��=h�s/ɲmp�L�gz��G��e�lS����_�7����Է�	>q5L�o����(w���F���}����f�\���o��)u=D�0l�R��_WLp=}���*O�\Nt��=ґbʀto���bdҺCD����`�����H�qbe��&���zu�o��bo^AT�{G�ki�J?.-]Ⱥ\���:���)A^`��3<"�������UI���,��sy���d����8�6(��*;,���w��:F�uj=b�-m&�P�<�Æ�^���n�����m9��+OuΈ,�D�8c����$��;ou`��o�:L�����֬2Y3~���u
���=�<�J>EV8I����/���p�����`��$���
��s�<�3��lF�OәS�84��Y2��imZ�����Z]�]�t]��b��e	�i��J��cs�6	C��@�I�me6��	������L�ot��w�˨���A���lx�:�\�ѩ�%:���ŀ���Z�V���E8��]�UӆF�s�6�zA�;{�a?fF��hD�������N��a2WY�G�������˽Mf%��Q!�z�/�����]��S�S��NA��Ϟ43k�hp��W�[6�8]l(v���Ǒ��Zv�ӹ��J}�0sXM�����$O�����;���?���q���P�B/��
�2} G�!�b�(��X�W����_�\D��=�_c/��ԣ����=��/&KT���xZI\9��L�<t��.��������NWxI�ej�z7Hr�&���yl���|$���o~�!�[���GlP҄ǰ qْ`_?�����SZg�e"��k�j)��ȅ�����V��|�����	iXR�K^�Ȯ���@�h�1��f�rQ�lm3@*Y�ZHg'\q�3����s����yM:�>�%g2���v���01�P�![	V��bE�T�� P��s�ن�����E���l�����r�d�U��봍ZB��.3tI-�7�K7[�d����{Cq��y���� l:'��<�fe�k��һ(?����?g�ȱ���;� �Cn�p�L�%F���`(ʊ����_�}���v�۶��,��/R����A�:S'b�o��a��o@h��ʿ����F޽��k���Id���7� Lz��ڕ}2�I����M��-b'5�U
P��=BGXs$EIz�PI�g��K"�!e��RR0y%�h8�|݅<�,�e]�|R�w24�~�!b��z��1�q�}��*����q]�6A(��0Xy��;8\tw�n�hcr�Ml�
��v��_ǚJ�ٙ����Z󐓀_>��vg˂�饄�W��}Z ��r���C����&�mD�8�Ѫ�^_}�=v$,���J*�W��|����ΉG�! 1HSD(�V�c��j���_�uc=��~�]L�gZ?�5��ɳ��
N�G��v�4ߵإ��0.��|fr�����F�� tFk5S��A��:�?���u��Ķzj��^�/��&T@�P�kH0;�/ʕ�e�:�)�%�`7W0xԶ�r[�-/�����_�?�=�_�W�In}Q�Zر���H4-B�@�A6�z��H;������ОB���"�)j�����R� %�I���I,�L��/M�V,���srU��y縫6�50ֆx�Y8�U�+���g,Њ���6T��{5��H$�::��u��0P�k�	];&u�㱘������2�A"�Bo�Q`)~���O5� ��Ohn�`�>o�I���k��4�{?y:f/m'#^��CY_ �b��z�U74zk��;p7�(���XrO>,���m��k�(�^��/��pU�@�hQti��E�(�51��jAj�Ȏ?r��q��D�S��)��΢f1D����8 �����֘Qj��í��r�p	�@>�ޖ�].zt��70��巋 Yݠ}�S���K�d.e6U���ֹ�d�6�S&	�
z�3=Iˣd�L��[�g�/כ��a}�[���&�Yz~H��u�g�DJ�>�����Z�^t\���ʔ��"\6[)�¯+&��>��y��'�H.'�H��Hqe@��7C�y12i�!�r�Ec0FPBR�	�@��8���`��~V�:�7V[�7� �C��#��J���.d].��weth� /0�ĂX���ނ\몤��F��t���EWS2Ǐ��Y�G�BX�I����`T#A�:�1���6�r�l��aCn����w�GS��R����SՕ���:gDb�F�1���Sj���:0mq�7w�����q�ukV��?�V�:[�ʞ]��@�%�"+�$Q�{Vԗq|L8V��뉅U�����Z�?�9t��rz6#	���)^�`�,��j�6��\��̇��K�.�.n���M�J̲�4@��ͱ�P��!	Sq ��2Ɍ�B�@Hxe���7���Ì;�eTt��� �K`6<KU���T�~�k�b�g�m-i���ˢ��ͮ��i�#�9t�w��Ӎ��ݰ3#`J4��JMY�_V'X����������Pwz�����&���(��K=�ۗʋ��xE��~�)���N����gO����k48������-�\�.�	;�L��H�?g-���\�d�>Q�9�&�X��p�'W�`	�ĝ[���Xɸ����K(]��Mo��	�#����X�vm,ЫJ���/s.���㯱U�
�Q	����q��
˗�%���`<�$��A�p@:ym��dwdvj�rރm'�+��$�25x�$9A�xO�v�<6~� {>_�7?���-�u��#6(i�cX��lɆ0��E�	�i�)����2���5M��u����O�t+�k>�g��D���4,)�%/YdW�}D	 X��^K�`���V�� ��}-����M��KtƹZ|S˼&@��3����k�	�uu�j(ǐ���n�"
Z*FO �N��9�l�a�vrn�"�cyF�{����y9j��*f�u�F-!�S���͛󥛏�rD���h������<���F N6�Bf�}3�2�h��Hs�]���I���3T�X�~��u��7b8w&�#�{�i0�
e����	ү�>e�M;�m[��w��]�)tVo`Šb�������0f�7 �jj��M�wD�z#����5R��$2�ho�s&=�~�J�>�����\�&_���n�*�f��#�9��$�Y�$o��[�%ݐ�FQ))���~4�R����h�����t>���;�	c�Ґ	���=wOW�h��8�>�N����ܸ.E� ��}�������T7i��19�&6a���y;��cM%���@��z�y�I�/��q��eA��R��+���>-��g9u��!��lyS��6"b��h�{��>��;�t|%�ū�f��F�{�ģ����)"s�щ1PH�}{�غ��i� �.&�3������Y��f'�#UB;P��Z��irKU>3�Q��DK#�Z � ����)�ʠ�jϟ^H��:�}Eb[=5�J���l�
*�vS��5$��o�������A���ܒd��+<j�[�-���xQ��K��������ǯB�+�$��(V-�؎�jU��!E � S�SO�A`�fl�ahO!nYE���?���HMm�q���$[`�$�x&A�&U+����9�����<��s�U��kC��,�*��h��3hE��s����OB$`�x�:Le�(�5ׄ��:��XL���t�V��
� G����(���w�çP ��'4�s0�H�7��TA��5ls���<����/g�,�/d��P}�r��
���vw�M���b,�'��U�6���B�i/���e��]�|�(�w�O�4��"W�͚���� �sd�9��8vM�w��)ڔwWgQ�"CZ� Qt�Tk�(5g���~h9��n �K�oK�.=�W������E��oо�p�鎥C2
�2�*sGZC��K�l�)�G�Ù���Q�sY&��-����M��>�-w�O\���,=?$�ݺ��Q"�c��{��Y-W/:.D�[�FeJ]E.�ƭ�}��\O����Óy$�]$d�t��2 �Ǜ!�����Q���1#(!��R��C�XYn�Iq?�^����؛Wա����GFZ�ҏKK�.���:�uJ��db���q�?xoA�uU��j#Kk��\ޢ�)���w�,ΣJ!����A��]0��� F�Z��zK@�I8T6��!�ׅ�f��ۣ��o)�F[Ω��SEC�3"1Q#����)	5��[��8曻��j�8ͺ5��G֌�k+z��-}e�.O|�慒O�N���=+��8>&+p�����*Xf�?�u��?�:��L9=�����t�/M0g�LE5rZ�V{��E�Ci�V�p7]����X%fY�n��?�����\�Mĩ8�t�w[���d�tB�a $�2�A��B�a��2*:G�c�%0���*��At*g���5s1�3����U��e���f�}մa����ɻ^�����n؏�0%Qk���,傃/��,~�B��UV�Qk�C�;-�}�ro�Y��aGȥ��K�E|r��%{W���Tj�SP��'����5�sx����M.Nۃ�`��q�񟳖��t��R�(�Vh,k}8ɓ�~��i��-��e�d\E�j��%��Ћ禢�L�ȑ}�z�XF,J�6�U�ix��9�d��_�����*l���v��8i{��˃ɒ��q�?�VW� S8 ����z�;2��5F9�����D�z������I�'v;n�c�=����{H��}��4�1,@\�dC��׏"��4��V�Yp������Z
�:r�l⧀a��5��3AA"h{B�����,���>�,�m����\�E+[��JV����	Wܦ��?:�\->��e^���ρvəL��Ɔ��]���?L5�c�V��m�X-�' ��F��g��0G;97|��<#۽�~����5Y{3�zm����]R�������V9"�kv���P\{|�bqw��A# '���	!3Ͼ�FB��Z���.���$e��+r,t?�����1�;}��=�4J����g��Ws�������-C�;��.�:�7�bP��ԉX���g��Z5���&�;�m���wo���{w�f�7ƍ9��v�v%G��yRxz�y.p�/f��I7B�T�q���IQ��,T����٭⒈nHY���LD^	?N)_w�O4�{�@W:�T���̈́�_iȄ��������@4p�m�y�`��
�p��gn\��M��>V�p�N��]��4ZƘ�r��B�ļ���ױ�avf���h��<�$��O���ٲ�hz)a���f�H賜:x��o6�����@|1Na4��W�Aa�	y:����Uw3_h���s��oHL������(�ھ=�Wl�H�_ e����x`k���p����*�(�w-v�49���*���(�"���h- ]���Z�ge�l����/$�g���"����a�W�r�E�	P�)T���η�Kăret����Cza
nI2�����|��������%�C�����u��W�ŕj�[_�vlGy�*R�M��"�k���ީ'Ҏ 0r36�0�������c�ڟ��@����8H�u�-�}K<���K��������AU�i���9��vF��!�z�|��`4D��"c��Uc�^�'!	���b�o�2��kB׎I��x,�e�d�|�j~��f���P���{X�_���S( o���9�E��GsR� ���9���O���K����3�Q��Xx��^�DU����Z��܍&Jyl1�ܓ��� n�h�Z!ʴk�KA�2\�.P>Z»�']�{�+�fMLo�Z�ڀ���bp���;Q�?m�;����Y�!-�?�(��?�5f����pk?��\�7��%Ç�%r����+E��g{��"H�7h��T��t��!�K�M�����u�%Y��I�����LO��(ٹ,�m������&�yX���;�'����m���n]��(�ұϿ�=|ì��"��x�2������M�Vʾ��	���z^���<�ˉ.�G:RL���͐^�LZw�������T)��!N�,7ؤ��U������@��+��Pb��{�##�R�ǥ�Y������]Y�:%�L2�`�Gָ�?���׺*�v���5�c.o�Ք�������Ve�E� r�.U�H�N�GL�%�ͤ*��tؐ���b3��������b�-�Tu婢������g}�����~�L[��]g��?�w�fݚU�#k�ϵ��C����g�'>P�Bɧ�
'I���e�8}�z`a,���俺V�~� �A����H��i:s��&�3K��9�M�=W�"�!���R�K����k|Sz��,A7��Pissl.�&aH�TH:黭L�F2c:��0^�� ��n!�0�w���1����RG�k� :��D��㚹�}[Kڪ����u��j�0�Hy��]/�tcgo7��������BS�r�����?l�@�*����5�!ԝ��>z��ɬD�0�#�R����">9^т��_v�~*��)(��ٓffm��9<���r�&���A�0S�8���Y�n|:�?Y�Of�	4��>����U?X�4q����2V2�"|�C�JW��sS�[�o��>D=C,#�]� ���4��˜�h2B����k�@��zTa�~}��������dI���8�O+��+~�)��N^�e=���C����`ۉ�
o"I�L^�IN�$��7���1�������͏=�~s�>��J�� .[��L��Es�|zJ+�,�Ld�|MS-�u�p6�S�0�
������� �=!KJ|�K�U�@Q�6����X.ꢕ�mH%�A_��+n�b���q���2�I���@��L&ac��y®@]�&��1d+��[������ �S�z�3�p������X���^@?�wz_������x��QK��e�.�E��|��c���5;Z}o(�=>O��;�᠑��MGㄐ�g�L�!Zb-�\z��o�2��9��yG� d|�Ν��Ĉ��c�BYq�x����O�~��zۖ��e`�E
��X1�Xg�D��m�3�Y���Z�w�Ѷ��Ȼ7}z�Խ;�L3����IO�_���O�<)<=�<���E줆�J�ٸG�k��(Io*�����VqID7��QTJ
&"��������'��l�+�O*��N�f�د4dBly�A���U 8�6μO��@�`���37�K�&�q+o�x���.�M-cLN��MX�~b�Nu��XS�0;3��c�^kr��'|��lYP4����
p`�O$�YN<v��7�C��D@ ����0���Ϡ�ǎ��<_Ie񪻙/����9��7�$&i���jtbRmߞ�+�n��p�/���I�L�g��5y�`A�Y���H�����t���R��Ln�?��H� �.��`�f��2h�Z������N`_��VOͰ�+�9ۢ
���}	�a���%�A�2��}P�!=0�$��
���Vn�����^T�����!���k�Ǻ����J5ɭ/�U;���Z����EH�5��T��iG��b�S�[@VQ�1E���~ RS[j��:��>�%�IP��IՊ�pt}N�*�4Oc�wUf;���o=G�JwE����Z���܆��~�Ɠ�XGG1޷S��t�5�kǤ�p<۲r2]�U5�BF3A�Q(B��=
,�/�]���7�	���"�獣9)U�awۜFp�'�@���`���(�Y,<T_�\��B�Fo��}�F�4�K�ɇeU �M��eڋ5�� x�j(-
���.��e�&���C-Hm����G18�]S���xʟ6���Y�,�Ȑ�@���3J����Z��.����������E��"��Ƴ��v$���{*�~�c鐌¥̦��у��:��,�w�$�QA�p�'iy��\��6uK�l��z��<�O}˝�W���6K��r�.�l�H���_��aV�Ջ��V�Q�R�CQ@�æq+e_�u��Ӈz=���d��D	�#)�H��f�?/F&�;DT�h�JH*?���'V�lR�ϪWG��jk ��Du(�Ľ���V����҅��e�������m��&�X0�#k\��[Ѐk]�t���Қ�1���jJ����?��h�R����"i9��c$�Q��#���fR���s:l��ua�����h��[J�іs���T�P��BLԈ3��JBM��V�-��殳����;N�n�*�5��ڊ^���`K_ٳ��y��Sd��$�pϊ�2��	�
��`=��
�Y�O�_]��O?G��à?SN�f$��4�9ŋC̙%SQ��֦՞+q���A�x��%��M�5�)=V�Y���� ����96j�0$q*$���V&`#�1�Ph	��t��F�z�qǻ���Q��z	̆g��ʵ|��Y���q�\����%m�yyY����u_5ma�<�n�t�����cfL�F�Zi�)K�����d��P s�U}����NK~���dV�x�r��Ry��h���/;E?�������I3��p��x�p�e����� �b��zi��e7>�러�'
3���ZN@��,a��s�|�C+W�ڡ	�+�⹩�-�7rd��!��Ү�E zUi��e�E4!��c�5�B�
[A=*��]�>N��^a��`�$pAuA쏧����?��C'�����A�Q�{���q�7��^��w�$'h�ݎ����`�G������R���np�%Mx�-�Ё &����9a>=�p\&�y����º�\8��)`�n�A~���LP�ڞ��%%��%��*y��(�v�ki� ,u���6��ՠ��tv���1�y��8W��`j�פh�c�]r&����a�<aW���C���`u�-VDAK��	 ���Q=�m8��NN_�},��v/��;�/GM�^�L�Nۨ%x�2C�Ԣys�t�U�H����7���X��p�� �ɦ�qB�̳o�Q�-�i.����7I�Cp��ݏ�n 2>�F��D_bD~�1�R��8��A<A��ܧl�ig�m�P��2��"����T�3u"V���Ƭ��VA���	��h[�o�ݛ>�F�ޝD��qc¤�ݯ]��'c��y����"vRÍP� �l�#t�5GR��7��m�qv��$�R�(*%�W�S��]x���^6Е�'q}'C3a�W2!�������*cg�'�i�B0�a��ץh����7\���u@w��&��1&���&�P?1o�:�u��D��h�1Z�59	��>nw�,(�^J�|8�٧�,��;d���!oj" �FD�S�z���gP�cG�B�����x������x�� ��4E�bn5:1
��o��[7�C8�@��$z��3^ؚ<k� ܬ�D~�JhJ�]�]:M�b��g&7
��aidZ�A`t�V3�Y4[�����A�Y'��Hl��fX����mqaB�n
վ������\]�>��^��[�vs�Gm{+�����}q/��~I��p��c���Uhq����Ū��Q^��T`@�"��dc�wꉴ#�܌M1�)�- �(���~?��-5Rr�dl���$��Ҥj�r8�>'wP{��1q��j��Qcm����#_��"� �{����}nC�X�W�I�D����[��� E��еcRg8�iY9�.ߪ�_!�� �(������.q�T
����vf���ќ�*Ȱ��mN#���G�c��v0��|����,��W.QU!qC����w��R[�%��ò�*��&ڿV�2���R�W�����n�I��^䊲Y��ߡ�6`���#�Ǯ)�NT<�O�����,jCdH��� ����j����?��-�� ����s���m����GwJ�|���^~�����=n?ݱtHF�RfSe��Akh�{I�m�;e�ਠw8ӓ�<Jv.�d���}��r��~֧��N�a�~���D�[6J�t��|�0���Eǅ~+ިL���( aӸ��/��b���C��Wyx2��r���쑎S��x3�#��"*�_4ce$՟@
�x�+�6)�gի#~c�5{�
�:��?�^��H�T�qi�B��2�``~W�A��N	��L,���5.��-h���J�]mdiM���[t5%s����y�A)�U�a�4���F�1ĨS�So	h3)��F�96������~w{<��-��h�9U]y�h�sd!&j�C߿?%���y���|s��`�O��Y�f��Ț�smE�C�P������ԼP�)��Iu�gE}�ǄcN_�XX�,�'���U���#@�AП)�g3�p~�Μ�š	�̒��FNk�jϕ��|� m������ߔ��,K�Ms��T����I�8�N�n+��̘N(4��Wf:�}�[≠�]FE�(}b�fó�Q�Z>�N�,���f.|F�֒�꼼,��y�캯�6�0R�C�y�:�����13�D#j��Д�\p�eu���[(��ʪ>�o�pu�%��^�m2+Q<���ԃ�}���O�W�`�ꗝ��J�t
��|���Y[�F�s�z�ܲ���b{�@��T=�4�sֲ���OV����j�e�' yr��0MܹE>������_�п��z��T�� 9�Q�ˈEi��" ��4��2�"����1�{!P���@خ_'�a��|y0Y��� ���Jb�ʁd
䡓�vYOvGf�Р�(�=�v�HR/S�׻A�4���n��c�w��#��u~�c���\�8b���&<��˖l�@ ��QĜ0����
8.�<_�TKa]G.�M�0L�� ���}&(HmOHÒ_�Ev�<�G� �E���4{ ���hek�R�j��B:;������Gg���G0��k���9�.9��_�ذv��+PW�����r�B���+���b����Ԩ���6�h'�/�>�gd����ޗ�&k�b&^�m�<u��KjѼ9_���*G${͎V��k��S,�x8hd �d��8!d��7�(C��X�4��E������!8CE���Gx�Q7 z#�sg�/1���C�PV��� � �j�S�ߴ�޶e(|g؅~�Bg�V*֙:���c�B���V�݄|G���7��M�^#u�N"ӌ�Ƹ1a���׮��1O
O�<�n��l;��F�R�j6�:#)Jқ�J�6�8�U\�)k�����+�G�)��.���fy/�J瓊�����0�+�[^�s�t����3��4P!�0�̍�R�	By܇��[.���:��Ku�F��SnbV����S��:�T"��4�ך����	�;[M/%l����	}�Sπ����75�o#"�)�F����3(�#a!O�WRY��n�m��wN<�a ��@�"B1���T۷g����!����b=���lM�5XnVp"?R%�����.�&�q�T�3��O��4���0:X��������������W$��S3��Aζ�0�j7�j_C�q��vx�xP��.{�qH/L�-I��������ۂo�xᾸ�U|��`�������y�*��BMr�b��(�VE*0�iRr�1�;�D�FnƦ����UyLQ�s���Ԗ)�N��Ob�gT~iR�b9]��;��=�Ә8�]��Ψ��6�[���]l���=c�Vd�>��j�߫�$D"��Q����T�y�"]sM��1�3�Ŵ��L�oUͯ��Bq��x{�K�}�8|��~Bs;���y�hNJd�]�6����#�1{i;�r>���A��+�������[kw߁��D)�-ƒ{�a�_�m�_+D��b)^����G�Bx���K|/rE٬����PR0�@v��C�c�x'*��Mygpu5�!2����Ew�G�ƌRs�n퇖�|�K���d��D�rpѣ{�H���l/�]�����
���X:$�p)��2w��5�ν$˶��2IpT�;��IZ%;�e�M��>[��d?�S�r'���0y����C�ܭ�?%R:��W��o��r���B�oT���P�°i�J�~]1����^ϫ<<�Gr9�EB�HG�)�}��ϋ�I���/�1���O z<ĉ������������yQJ�q�}d�U*���t!�r|00�+�C[�y�I&��������4�ZW%ݮ6���{��-���9~|���<ڠr���HD����	bԩ�������Ce#�r{]Xlf��=����Rl�圪�<U4�9#�5⌡�ߟ�P��Ձi�c���l0����Ӭ[��xd������!p(��W����j^(�Y�$�:ܳ����c±�/X,��e���W�*����� �ϔӳI8?MgN���sf�TT#��i��J\d>d�6^ju	wqSu�oJ�Ub�%�9@�*mn�ͅ�$I��I'}��	�HfL'B�+3��-�f��.��s�>�^��Y�r-D�r���{\3>�okI[u^^}�nv�UMF)ϡۼ��n�����S��VZh�R.8��:Y��-�\eU��F8��Ӓ�G/�6��(Fq�\��߾T^�'�+Z�w��N�O�v:e~>{�̬-\��9�^=\n���t�=H��f�G�9kٍO��'+����a5�Ʋև�<��K�&��"�P�J�U��v�_B�
�xn*x��M�ه�g�eĢ�k#�^U����sMF�������VP�J lׯ����WX�<�,	\P]��i%1p��2����k��'�#�{hPc��l;q\�M$������ �	��{b����;����:�����oa���A@I��eK6t �	|�(bN�OCOi���l��i����#�&~
�[a�_��>$��'�aI�/y�"�J�#J �����Z�= �E]���� �d5�k!��p�mz@�`^��3���#�Z�5� Z�h����/llX;O������PC9�l%X�v�Q�R1z@}pjT�yfs��s�a�3����N��Q��W1��6j	����%�hޜ/�|l�#��fG��ŵ��)w<42 p��h�2��i�!DK�E�K�� �MRF���"�B�#<����ù3ї��sL��T(+N~vO�~5�)�o�Yo�2���B�H��z+�L��տ��1��UCP+�nB�#���y��O���w'�iF{cܘ�0�i�kWr�ɘ'��G��7�b����p#T)@5�a͑%��B%yx��*.�膔5�JI�D����u^�D���t��IE\���L���L�m�?�{�
D��ƙ�	v�w~��u)��<��`���p�ݥ�I�e��)7�	+�O�۩Nk*fg���k�CN~���۝-���6_l�i��>˩�g�Y�fsț�ķ�F��{}��ؑ����+�,^u7�6��;'��0��d M��[�F��B���3�֍�N�Pv1��i��� �&�,7+8��ځ�|�b�N�øX��ɍ��'BX��`���LqV�V�x��BrP|�	�+��Vzſ g[T�P��B��!�8�|;�D<(WF���8����$��\��Q���m��x�p_\��*�_�?0�_|m�X�<~Z\�&��E�ja�v�W�"д)�٘�z"�#7cSC{
q�*�<�����DjjK���\'��'��3	*�4�Z�����TŞ�iL���lg��X�g��W�6@C���@+2v��P5���x"� ��(���a*�<@���&t����bZVN�˷��W�h!�8
Eh��G���žK>Հ�?����YD��q4'�
2�a�����蘽��x9ea|� �����KTUH��譵����h���c�=���
ඉ���L{���/�U��E!�[~ҥ���l����w���{ ;��!Ǳk
�O�Ӧ�3�:����b�� ��;��ZcF�9���C�q>�%xp�\2|x["w9��ѽR$�x�x���.�d}��}O��Ow,�Q���T�;z�Z�^�e��N�$8*���$-����2٦ni���\o�����o�|�j���f��!Q��ş�)��+��7�j�z�q!�ߊ7*S�z(
�pa�4n������z�P��U��#���"!{�#Ŕ�>����Ȥu������A	I�'�=���r�M��Y���Xm�޼��%����>2�*�~\Z��u�>�ߕuС�S���$fxD`����{p���nWYZ�=��]M�?��gqmP
9`UvX$"��Qu�1��z��[�Lʡ�xN���.,6���M�K)6�rNUW�*�Y��q����OI��w�����1��u6��Sy�i֭Ye<�f�\[��8l�+{vy�5/�|��p�D�YQ_��1�X���V�2K�I��k����y�g��ٌ$���3�xqh�9�d*���ڴEvent$8.SCROLL, function (event) {
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
