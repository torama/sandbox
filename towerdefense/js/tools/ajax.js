function Ajax(data) {
    this._data = data;
    this._xhr = null;

    this._init = function() {        
        if (!$.ua.isSupported) { return false; }

        if (typeof XMLHttpRequest === 'function') {
            this._xhr = new XMLHttpRequest();
        } else {
            if ($.staging.debugging) {
                throw new Error('Browser (' + $.ua.name + ' ' + $.ua.version + ') is not supported');
            }
        }
    };

    if (!this._init()) {
        return false;
    }
}

Object.defineProperty(Ajax.prototype, 'xhr', {
    get: function() {
        return this._xhr;
    }
});

Ajax.prototype.request = function(data) {

};

Tools.prototype.ajax = function(data) {
    return new Ajax(data);
};