angular.module('paypal.services.global', [])
  .factory('Global', [
    function() {
        var _this = this;
        _this._data = {
            location: location
        };
        return _this._data;
    }
  ])