/*!
 * jQuery Loan Calculator 3.1.3
 *
 * Author: Jorge González <scrub.mx@gmail>
 * Released under the MIT license - https://opensource.org/licenses/MIT
 */
;(function ($, window, document, undefined) {

    "use strict";

         const NASPERF_RATES = {
            'Collaborative': 165,
            'On-line archive': 110,
            'Raw': 55
        };

        const MINIMUM_AMOUNT = 1;

     const defaults = {
             // default values for a nas

            AMOUNT_FREE : 1,
            nasAmount: 1,
            nasperfRates: NASPERF_RATES,
            nasperf: 'Collaborative',


            // inputs
            nasAmountSelector: '#nas-amount',
            nasperfSelector: '#nas-perf',


            // display selected values
            selectedAmount: '#nac',
            selectedRate: '#npr',


            // display the results
            nascost: '#nas-cost'
        };

    /**
     * The actual plugin constructor
     * @param {Object} element
     * @param {Object} options
     */
    function Plugin(element, options) {
        this.$el       = $(element);
        this._name     = 'NasCalculator';
        this._defaults = defaults;
        this.settings  = $.extend({}, defaults, options);
        this.attachListeners();
        this.init();
    }

    // Avoid Plugin.prototype conflicts
      $.extend(Plugin.prototype, {
      //
          /**
           * Validates the data and shows the results.
           * @return {void}
           */
          init: function () {
              this.validate();
              this.render();
          },

          /**
           * Attach event listeners to the event handlers.
           * @return {void}
           */
          attachListeners: function () {
              var eventEmitters = [
                  this.settings.nasAmountSelector,
                  this.settings.nasperfSelector,
              ];

              $(eventEmitters.join()).on({
                  change    : this.eventHandler.bind(this),
                  mousemove : this.eventHandler.bind(this),
                  touchmove : this.eventHandler.bind(this)
              });
          },

          /**
           * Handle events from the DOM.
           * @return {void}
           */
          eventHandler: function () {
              this.update({
                  nasAmount       : this.$el.find(this.settings.nasAmountSelector).val(),
                  nasperf     : this.$el.find(this.settings.nasperfSelector).val()

              });
          },

          /**
           * Sanitize and validate the user input data.
           * @throws Error
           * @return {void}
           */
          validate: function () {
              if (typeof this.settings.nasAmount === 'string') {
                  this.settings.nasAmount = this._toNumeric(this.settings.nasAmount);
              }

              if (! $.isPlainObject(this.settings.nasperfRates)) {
                  throw new Error('The value provided for [nasperfRates] is not valid.');
              }

              for (var perfRate in this.settings.nasperfRates) {
                  if (typeof this.settings.nasperfRates[perfRate] === 'string') {
                      this.settings.nasperfRates[perfRate] = this._toNumeric(this.settings.nasperfRates[perfRate]);
                  }

                  if (! $.isNumeric(this.settings.nasperfRates[perfRate])) {
                      throw new Error('The value provided for [nasperfRates] is not valid.');
                  }

                  if (this.settings.nasperfRates[perfRate] < 1) {
                      this.settings.nasperfRates[perfRate] = this.settings.nasperfRates[perfRate] * 100;
                  }
              }

              // Sanitize the input
              this.settings.nasAmount = parseFloat(this.settings.nasAmount);


              if (! this.settings.nasperfRates.hasOwnProperty(this.settings.nasperf)) {
                  throw new Error('The value provided for [nasperf] is not valid.');
              }

              if (this.settings.nasAmount < MINIMUM_AMOUNT) {
                  throw new Error('The value provided for [nasAmount] must me at least the minimum.');
              }

          },

          /**
           * Show the results in the DOM.
           * @return {void}
           */
          render: function () {
              this._displaySelectedValues();
              this._displayResults();

          },

          /**
           * Show the selected values in the DOM.
           * @return {void}
           */
          _displaySelectedValues: function () {
              // Display the selected nas amount
              this.$el.find(this.settings.selectedAmount).html(
                  this.settings.nasAmount
              );

              // Display the selected  performances
              this.$el.find(this.settings.selectedRate).html(
                  this.settings.nasperfRates[this.settings.nasperf]
              );


          },

          /**
           * Display the results for the current values.
           * @return {void}
           */
          _displayResults: function () {
              // Display the loan total
              this.$el.find(this.settings.nascost).val(
                  this._toMoney(this._nasTotal())
              );

          },
          update: function (args) {
              this.settings = $.extend({}, this._defaults, this.settings, args);
              this.init();
              this.$el.trigger('nas:update');
          },

         _nasTotal: function (){

             const cost = this.settings.nasperfRates[this.settings.nasperf] * (this.settings.nasAmount-this._defaults.AMOUNT_FREE);

             return cost;
         },

          /**
           * Convert numeric format to money format.
           * @param  {Number} numeric
           * @return {String}
           */
          _toMoney: function (numeric) {
              if (typeof numeric == 'string') {
                  numeric = parseFloat(numeric);
              }

              return numeric.toFixed(0).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + ' CHF';
          },

          /**
           * Convert from money format to numeric format.
           * @param  {String} value
           * @return {Number}
           */
          _toNumeric: function (value) {
              return parseFloat(
                  value.toString().replace(/[^0-9\.]+/g, '')
              );
          },

          /**
           * To convert the provided value to percent format.
           * @param {Number} numeric
           * @returns {String}
           */
          _toPercentage: function (numeric) {
              return (numeric * 100).toFixed(2) + '%';
          }

      });

    /*!
     * jQuery Nas Calculator
     *
     * Author: J
     * Released under the MIT license - https://opensource.org/licenses/MIT
     */
    /**
     * Wrapper around the constructor to prevent multiple instantiations.
     */
    $.fn.NasCalculator = function (options, args) {

        return this.each(function () {
            var instance = $.data(this, 'plugin_nasCalculator');
            if (! instance) {
                $.data(this, 'plugin_nasCalculator', new Plugin(this, options));
            }
            else if (options === 'update') {
                return instance.update(args);
            }
        });
    };

})(jQuery, window, document);
