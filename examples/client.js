var breaker = new CircuitBreaker({
  timeoutDuration: 1000,
  volumeThreshold: 1,
  errorThreshold: 10
});

breaker.onCircuitOpen = function() {
  console.log('threshold reached', this._state);
};

var fallback = function() {
  alert("Service is down");
};

var requestWithFallback = function(url, fallback) {
  var command = function(success, failure) {
    $.ajax({ url: url })
      .done(success)
      .fail(failure);
  };

  breaker.run(command, fallback);
};

$(function() {
  $('.success').click(function(e) {
    requestWithFallback('/success', fallback);
  });

  $('.fail').click(function(e) {
    requestWithFallback('/fail', fallback);
  });

  $('.timeout').click(function(e) {
    requestWithFallback('/timeout', fallback);
  });

  $('.flaky').click(function(e) {
    requestWithFallback('/flaky', fallback);
  });
});