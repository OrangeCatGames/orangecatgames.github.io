(function ($) {
    function jQueryDummy ($real, delay, _fncQueue) {
        var dummy = this;
        this._fncQueue = (typeof _fncQueue === 'undefined') ? [] : _fncQueue;
        this._delayCompleted = false;
        this._$real = $real;

        if (typeof delay === 'number' && delay >= 0 && delay < Infinity)
            this.timeoutKey = window.setTimeout(function () {
                dummy._performDummyQueueActions();
            }, delay);

        else if (delay !== null && typeof delay === 'object' && typeof delay.promise === 'function')
            delay.then(function () {
                dummy._performDummyQueueActions();
            });

        else if (typeof delay === 'string')
            $real.one(delay, function () {
                dummy._performDummyQueueActions();
            });

        else
            return $real;
    }

    jQueryDummy.prototype._addToQueue = function(fnc, arg){
        this._fncQueue.unshift({ fnc: fnc, arg: arg });

        if (this._delayCompleted)
            return this._performDummyQueueActions();
        else
            return this;
    };

    jQueryDummy.prototype._performDummyQueueActions = function(){
        this._delayCompleted = true;

        var next;
        while (this._fncQueue.length > 0) {
            next = this._fncQueue.pop();

            if (next.fnc === 'wait') {
                next.arg.push(this._fncQueue);
                return this._$real = this._$real[next.fnc].apply(this._$real, next.arg);
            }

            this._$real = this._$real[next.fnc].apply(this._$real, next.arg);
        }

        return this;
    };

    $.fn.wait = function(delay, _queue) {
        return new jQueryDummy(this, delay, _queue);
    };

    for (var fnc in $.fn) {
        if (typeof $.fn[fnc] !== 'function' || !$.fn.hasOwnProperty(fnc))
            continue;

        jQueryDummy.prototype[fnc] = (function (fnc) {
            return function(){
                var arg = Array.prototype.slice.call(arguments);
                return this._addToQueue(fnc, arg);
            };
        })(fnc);
    }
	
    $.extend({
        playSnd: function () {
            return $(
                   '<audio class="snd-player" autoplay="autoplay" style="display:none;">'
                     + '<source src="' + arguments[0] + '" />'
                     + '<embed src="' + arguments[0] + '" volume="1.0" hidden="true" autostart="true" loop="true"/>'
                   + '</audio>'
                 ).appendTo('body');
        },
        stopSnd: function () {
			$(".snd-player").wait(200).prop("volume", 1.0);
			$(".snd-player").wait(300).prop("volume", 0.9);
			$(".snd-player").wait(400).prop("volume", 0.8);
			$(".snd-player").wait(500).prop("volume", 0.7);
			$(".snd-player").wait(600).prop("volume", 0.6);
			$(".snd-player").wait(700).prop("volume", 0.5);
			$(".snd-player").wait(800).prop("volume", 0.4);
			$(".snd-player").wait(900).prop("volume", 0.3);
			$(".snd-player").wait(1000).prop("volume", 0.2);
			$(".snd-player").wait(1100).prop("volume", 0.1);
			$(".snd-player").wait(1200).prop("volume", 0.0);
			$(".snd-player").wait(1300).remove();
        }
    });
})(jQuery);
