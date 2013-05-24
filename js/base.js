var Engine = new function() {
    this.render = function() {
        for (var i in ResourceManager.resources) {
            ResourceManager.resources[i].RenderManager.draw();
        }
        window.postMessage('render', window.location);
    }
};

var ResourceManager = new function() {
    this._resources = [];

    this.add = function(resource) {
        this._resources.push(resource);
    };

    this.remove = function(resource) {
        this._resources.splice(resource, 1);
    };

    this.__defineGetter__('resources', function() {
        return this._resources;
    });
};

function FunctionHook() {
    this._functionList = [];
}

FunctionHook.prototype.check = function(func) {
    return false;
};
FunctionHook.prototype.add = function(func) {
    this._functionList.push(func);
    if (this.check()) {
        func.apply(this, Array.prototype.slice.call(arguments, 1));
    }
};

FunctionHook.prototype.run = function() {
    for (var i=0; i<this._functionList.length; i++) {
        this._functionList[i].apply(this, arguments);
    }
};

FunctionHook.prototype.clear = function() {
    this.onclear();
    this._functionList = [];
};

FunctionHook.prototype.onclear = function() {

};

function RenderManager(canvas) {
    this._context = canvas.getContext('2d');
    this._canvas = canvas;
    this._drawFunctions = new FunctionHook();

    this._events = {
        draw: new FunctionHook()
    };

    this.__defineSetter__('context', function(context) {
        this._context = context;
    });

    this.__defineGetter__('context', function() {
        return this._context;
    });

    this.on = function(evt, func) {
        if (this._events.hasOwnProperty(evt)) {
            this._events[evt].add(func);
            return true;
        } else {
            return false;
        }
    };

    this.draw = function() {
        this._events.draw.run(canvas);
    };
}

var InitBody = new FunctionHook();

InitBody.add(function() {
    window.addEventListener('message', function(evt) {
        if (evt.data === 'render') { Engine.render(); }
    });

    window.postMessage('render', window.location);
});

function initBody() {
    InitBody.run();
}