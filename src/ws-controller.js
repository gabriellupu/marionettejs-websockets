(function(factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['underscore', 'marionette'], factory);
    } else if (typeof exports === 'object') {
        // CommonJS
        module.exports = factory(require('underscore'), require('marionette'));
    } else {
        // Globals
        factory(_, Marionette);
    }
}(function(_, Marionette) {

    var WebSocket = Marionette.Controller.extend({
        initialize: function(options) {
            var ws = this.ws = new WebSocket(options.url);
            ws.on('error', this._errorHandler);
            ws.on('message', this._messageHandler);
        },

        _errorHandler: function(e) {
            console.error(e);
        },

        _messageHandler: function(e) {
            var message = e.data;
            this.trigger('message:' + message.name, message.value);
        },

        send: function(name, value) {
            this.ws.send({
                name: name,
                value: value
            });
        }

    });

    //Exports
    Marionette.WebSocket = WebSocket;

    return Marionette;
}));
