(function() {

  (function($) {
    var InputHistory, normalizeKeyHandler;
    InputHistory = (function() {

      InputHistory.name = 'InputHistory';

      function InputHistory(options) {
        this.size = options.size || 50;
        this.values = [];
        this.index = 0;
      }

      InputHistory.prototype.push = function(message) {
        this.values.unshift(message);
        return this.values.splice(this.size);
      };

      InputHistory.prototype.prev = function() {
        var message;
        if (this.index > this.size - 1) {
          this.index = 0;
        }
        message = this.values[this.index];
        this.index += 1;
        return message;
      };

      InputHistory.prototype.next = function() {
        this.index -= 1;
        if (this.index < 0) {
          this.index = 0;
          return "";
        } else {
          return this.values[this.index];
        }
      };

      return InputHistory;

    })();
    normalizeKeyHandler = function(raw, elseHandler) {
      elseHandler || (elseHandler = function(e) {});
      switch (typeof raw) {
        case 'number':
          return function(e) {
            return e.keyCode === raw;
          };
        case 'string':
          return function(e) {
            return "" + e.keyCode === raw;
          };
        case 'function':
          return raw;
        default:
          return elseHandler;
      }
    };
    return $.fn.inputHistory = function(options) {
      var history,
        _this = this;
      options || (options = {});
      options.data || (options.data = 'inputHistory');
      options.store = normalizeKeyHandler(options.store, function(e) {
        return e.keyCode === 13 && !e.shiftKey;
      });
      options.prev = normalizeKeyHandler(options.prev, function(e) {
        return e.keyCode === 38 || (e.ctrlKey && e.keyCode === 80);
      });
      options.next = normalizeKeyHandler(options.next, function(e) {
        return e.keyCode === 40 || (e.ctrlKey && e.keyCode === 78);
      });
      history = this.data(options.data) || new InputHistory(options);
      this.data(options.data, history);
      this.bind('keydown', function(e) {
        if (options.store(e)) {
          history.push(_this.val());
        }
        if (options.prev(e)) {
          _this.val(history.prev()) && e.preventDefault();
        }
        if (options.next(e)) {
          return _this.val(history.next()) && e.preventDefault();
        }
      });
      return this;
    };
  })(jQuery);

}).call(this);
