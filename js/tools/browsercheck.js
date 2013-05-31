function BrowserCheck() {
    this._ua = {
        name: null,
        supported: false,
        chrome: false,
        firefox: false,
        msie: false
    };

    this._init = function() {
        var userAgent = navigator.userAgent;

        // check for chrome
        if (/\b(chrome)\/(\d+)/i.test(userAgent)) {
            this._ua.name = 'chrome';
            this._ua.chrome = {version: parseInt(userAgent.match(/\b(chrome)\/(\d+)/i)[2])};
            this._ua.supported = false;
        }
        
        // check for firefox
        else if (/\b(firefox)\/(\d+)/i.test(userAgent)) {
            this._ua.name = 'firefox';
            this._ua.firefox = {version: parseInt(userAgent.match(/\b(firefox)\/(\d+)/i)[2])};
            this._ua.supported = true;
        }

        // check for msie
        else if (/\b(msie)\s(\d+)/i.test(userAgent)) {
            this._ua.name = 'msie';
            this._ua.msie = {version: parseInt(userAgent.match(/\b(msie)\s(\d+)/i)[2])};
            if (this._ua.version >= 9) {
                this._ua.supported = true;
            }
        }
    };

    this._init();
}

Object.defineProperty(BrowserCheck.prototype, 'name', {
    get: function() {
        return this._ua.name;
    }
});

Object.defineProperty(BrowserCheck.prototype, 'version', {
    get: function() {
        return this._ua[this._ua.name].version;
    }
});

Object.defineProperty(BrowserCheck.prototype, 'isSupported', {
    get: function() {
        return this._ua.supported;
    }
});

$.ua = new BrowserCheck();