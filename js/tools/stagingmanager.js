function StagingManager() {
    this._stage = 'development';

    this._stages = {
        development: ['development'],
        staging: ['staging'],
        production: ['production'],
        debugging: ['debugging', 'development']
    };

    this._init = function() {
        for (var i in this._stages) {
            Object.defineProperty(StagingManager.prototype, i, {
                get: function() {
                    return this._stages[i].indexOf(i) >= 0;
                },
                set: function(value) {
                    if (typeof value === 'string') {
                        this._stages[i] = [value];
                    } else {
                        this._stages[i] = value;
                    }
                }
            });
        }
    };

    this._init();
}

Object.defineProperty(StagingManager.prototype, 'stage', {
    get: function() {
        return this._stage;
    },
    set: function(stage) {
        this._stage = stage;

        console.log('typeof $.staging.' + stage + ': ' + typeof this[stage]);

        if (typeof this[stage] !== 'boolean') {
            delete(this[stage]);
            this._stages[stage] = [stage];
            Object.defineProperty(StagingManager.prototype, stage, {
                get: function() {
                    return this._stages[stage].indexOf(stage) >= 0;
                },
                set: function(value) {
                    if (typeof value === 'string') {
                        this._stages[stage] = [value];
                    } else {
                        this._stages[stage] = value;
                    }
                }
            });
        }
    }
});

$.staging = new StagingManager();