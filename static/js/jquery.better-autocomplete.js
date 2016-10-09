(function($) {

$.fn.betterAutocomplete = function(method) {

  var methods = {
    init: function(resource, options, callbacks) {
      var $input = $(this),
        bac = new BetterAutocomplete($input, resource, options, callbacks);
      $input.data('better-autocomplete', bac);
      bac.enable();
    },
    enable: function(bac) {
      bac.enable();
    },
    disable: function(bac) {
      bac.disable();
    },
    destroy: function(bac) {
      bac.destroy();
    }
  }, args = Array.prototype.slice.call(arguments, 1);

  // Method calling logic
  this.each(function() {
    switch (method) {
    case 'init':
      methods[method].apply(this, args);
      break;
    case 'enable':
    case 'disable':
    case 'destroy':
      var bac = $(this).data('better-autocomplete');
      if (bac instanceof BetterAutocomplete) {
        methods[method].call(this, bac);
      }
      break;
    default:
      $.error(['Method', method,
          'does not exist in jQuery.betterAutocomplete.'].join(' '));
    }
  });

  // Maintain chainability
  return this;
};

var BetterAutocomplete = function($input, resource, options, callbacks) {

  var lastRenderedQuery = '',
    cache = {}, // Key-valued caching of search results
    cacheOrder = [], // Array of query strings, in the order they are added
    cacheSize = 0, // Keep count of the cache's size
    timer, // Used for options.delay
    activeRemoteCalls = [], // A flat array of query strings that are pending
    disableMouseHighlight = false, // Suppress the autotriggered mouseover event
    inputEvents = {},
    isLocal = ($.type(resource) != 'string'),
    $results = $('<ul />').addClass('better-autocomplete'),
    $ariaLive = null,
    hiddenResults = true, // $results are hidden
    preventBlurTimer = null; // IE bug workaround, see below in code.

  options = $.extend({
    charLimit: isLocal ? 1 : 3,
    delay: 350, // milliseconds
    caseSensitive: false,
    cacheLimit: isLocal ? 0 : 256, // Number of result objects
    remoteTimeout: 10000, // milliseconds
    crossOrigin: false,
    selectKeys: [9, 13], // [tab, enter]
    autoHighlight: true // Automatically highlight the topmost result
  }, options);

  callbacks = $.extend({}, defaultCallbacks, callbacks);

  callbacks.insertSuggestionList($results, $input);

  inputEvents.focus = function() {
    // If the blur timer is active, a redraw is redundant.
    preventBlurTimer || redraw(true);
  };

  inputEvents.blur = function() {
    // If the blur prevention timer is active, refocus the input, since the
    // blur event can not be cancelled.
    if (preventBlurTimer) {
      $input.focus();
    }
    else {
      // The input has already lost focus, so redraw the suggestion list.
      redraw();
    }
  };

  inputEvents.keydown = function(event) {
    var index = getHighlightedIndex();
    // If an arrow key is pressed and a result is highlighted
    if ($.inArray(event.keyCode, [38, 40]) >= 0 && $results.children().length > 0) {
      var newIndex,
        size = $('.result', $results).length;
      switch (event.keyCode) {
      case 38: // Up arrow
        newIndex = Math.max(-1, index - 1);
        break;
      case 40: // Down arrow
        newIndex = Math.min(size - 1, index + 1);
        break;
      }
      disableMouseHighlight = true;
      setHighlighted(newIndex, 'key', true);
      return false;
    }
    // A select key has been pressed
    else if ($.inArray(event.keyCode, options.selectKeys) >= 0 &&
             !event.shiftKey && !event.ctrlKey && !event.altKey &&
             !event.metaKey) {
      select();
      selectTicker();    //added so that selection also runs GO button
      return event.keyCode == 9; // Never cancel tab
    }
  };

  inputEvents.keyup = inputEvents.click = reprocess;

  $results.delegate('.result', {
    // When the user hovers a result with the mouse, highlight it.
    mouseenter: function() {
      if (disableMouseHighlight) {
        return;
      }
      setHighlighted($('.result', $results).index($(this)), 'mouse');
    },
    mousemove: function() {
      // Enable mouseover again.
      disableMouseHighlight = false;
    },
    mousedown: function() {
      select();
      return false;
    }
  });

  // Prevent blur when clicking on group titles, scrollbars etc.,
  // This event is triggered after the others because of bubbling.
  $results.mousedown(function() {
    // Bug in IE where clicking on scrollbar would trigger a blur event for the
    // input field, despite using preventDefault() on the mousedown event.
    // This workaround locks the blur event on the input for a small time.
    clearTimeout(preventBlurTimer);
    preventBlurTimer = setTimeout(function() {
      preventBlurTimer = null;
    }, 50);
    return false;
  });

  // If auto highlight is off, remove highlighting
  $results.mouseleave(function() {
    if (!options.autoHighlight) {
      setHighlighted(-1);
    }
  });

  this.enable = function() {
    // Turn off the browser's autocompletion
    $input
      .attr('autocomplete', 'OFF')
      .attr('aria-autocomplete', 'list')
      .parent()
      .attr('role', 'application')
      .append($('<span class="better-autocomplete-aria"></span>').attr({
        'aria-live': 'assertive',
        'id': $input.attr('id') + '-autocomplete-aria-live'
      }));
    $input.bind(inputEvents);
    $ariaLive = $('#' + $input.attr('id') + '-autocomplete-aria-live');
  };

  this.disable = function() {
    $input
      .removeAttr('autocomplete')
      .removeAttr('aria-autocomplete')
      .parent()
      .removeAttr('role');
    $results.hide();
    $ariaLive.empty();
    $input.unbind(inputEvents);
  };

  this.destroy = function() {
    $results.remove();
    $ariaLive.remove();
    $input.unbind(inputEvents);
    $input.removeData('better-autocomplete');
  };

  var cacheResults = function(query, results) {
    cacheSize += results.length;
    // Now reduce size until it fits
    while (cacheSize > options.cacheLimit && cacheOrder.length) {
      var key = cacheOrder.shift();
      cacheSize -= cache[key].length;
      delete cache[key];
    }
    cacheOrder.push(query);
    cache[query] = results;
  };

  var setHighlighted = function(index, trigger, autoScroll) {
    //console.log('Index: '+index)
    var prevIndex = getHighlightedIndex(),
      $resultList = $('.result', $results);
    //console.log('prevIndex: '+prevIndex)
    $resultList.removeClass('highlight');

    if (index < 0) {
      return
    }
    $resultList.eq(index).addClass('highlight')

    if (prevIndex != index) {
      $ariaLive.html($resultList.eq(index).html());
      var result = getResultByIndex(index);
      callbacks.highlight(result, $input, trigger);
    }

    // Scrolling
    var up = index == 0 || index < prevIndex,
      $scrollTo = $resultList.eq(index);

    if (!autoScroll) {
      return;
    }
    // Scrolling up, then make sure to show the group title
    if ($scrollTo.prev().is('.group') && up) {
      $scrollTo = $scrollTo.prev();
    }
    // Is $scrollTo partly above the visible region?
    if ($scrollTo.position().top < 0) {
      $results.scrollTop($scrollTo.position().top + $results.scrollTop());
    }
    // Or is it partly below the visible region?
    else if (($scrollTo.position().top + $scrollTo.outerHeight()) >
              $results.height()) {
      $results.scrollTop($scrollTo.position().top + $results.scrollTop() +
          $scrollTo.outerHeight() - $results.height());
    }
  };

  var getHighlightedIndex = function() {
    var res = $('.result.highlight', $results)
    ind= $('.result', $results).index(res);
    return ind
  };

  var getResultByIndex = function(index) {
    var $result = $('.result', $results).eq(index);
    if (!$result.length) {
      return; // No selectable element
    }
    return $result.data('result');
  };

  var select = function() {
    var highlighted = getHighlightedIndex();
    if(highlighted >= 0){
      var result = getResultByIndex(highlighted);
      callbacks.select(result, $input);
      // Redraw again, if the callback changed focus or content
      reprocess();
    }
  };

  /**
   */
  var fetchResults = function(query) {
    // Synchronously fetch local data
    if (isLocal) {
      cacheResults(query, callbacks.queryLocalResults(query, resource,
                                                      options.caseSensitive));
      redraw();
    }
    // Asynchronously fetch remote data
    else {
      activeRemoteCalls.push(query);
      var url = callbacks.constructURL(resource, query);
      $ariaLive.html('Searching for matches...');
      callbacks.beginFetching($input);
      callbacks.fetchRemoteData(url, function(data) {
        var searchResults = callbacks.processRemoteData(data);
        if (!$.isArray(searchResults)) {
          searchResults = [];
        }
        cacheResults(query, searchResults);
        // Remove the query from active remote calls, since it's finished
        activeRemoteCalls = $.grep(activeRemoteCalls, function(value) {
          return value != query;
        });
        if (!activeRemoteCalls.length) {
          callbacks.finishFetching($input);
        }
        redraw();
      }, options.remoteTimeout, options.crossOrigin);
    }
  };

  /**
   */
  function reprocess(event) {
    // If this call was triggered by an arrow key, cancel the reprocessing.
    if ($.type(event) == 'object' && event.type == 'keyup' &&
        $.inArray(event.keyCode, [38, 40]) >= 0) {
      return;
    }
    var query = callbacks.canonicalQuery($input.val(), options.caseSensitive);
    clearTimeout(timer);
    // Indicate that timer is inactive
    timer = null;
    redraw();
    if (query.length >= options.charLimit && !$.isArray(cache[query]) &&
        $.inArray(query, activeRemoteCalls) == -1) {
      // Fetching is required
      $results.empty();
      if (isLocal) {
        fetchResults(query);
      }
      else {
        timer = setTimeout(function() {
          fetchResults(query);
          timer = null;
        }, options.delay);
      }
    }
  };

  /**
   */
  var redraw = function(focus) {
    var query = callbacks.canonicalQuery($input.val(), options.caseSensitive);

    // The query does not exist in db
    if (!$.isArray(cache[query])) {
      lastRenderedQuery = null;
      $results.empty();
    }
    // The query exists and is not already rendered
    else if (lastRenderedQuery !== query) {
      lastRenderedQuery = query;
      renderResults(cache[query]);
    }
    // Finally show/hide based on focus and emptiness
    if (($input.is(':focus') || focus) && !$results.is(':empty')) {
      $results.filter(':hidden').show() // Show if hidden
        .scrollTop($results.data('scroll-top')); // Reset the lost scrolling
      if (hiddenResults) {
        hiddenResults = false;
        $ariaLive.html('Autocomplete popup');
        if (options.autoHighlight && $('.result', $results).length > 0) {
          setHighlighted(0, 'auto');
        }
        callbacks.afterShow($results);
      }
    }
    else if ($results.is(':visible')) {
      // Store the scrolling position for later
      $results.data('scroll-top', $results.scrollTop())
        .hide(); // Hiding it resets it's scrollTop
      if (!hiddenResults) {
        hiddenResults = true;
        $ariaLive.empty();
        callbacks.afterHide($results);
      }
    }
  };

  /**
   */
  var renderResults = function(results) {
    $results.empty();
    var groups = {}; // Key is the group name, value is the heading element.

    $.each(results, function(index, result) {
      if ($.type(result) != 'object') {
        return; // Continue
      }

      var output = callbacks.themeResult(result);
      if ($.type(output) != 'string') {
        return; // Continue
      }

      // Add the group if it doesn't exist
      var group = callbacks.getGroup(result);
      if ($.type(group) == 'string' && !groups[group]) {
        var $groupHeading = $('<li />').addClass('group')
          .append($('<h3 />').html(group))
          .appendTo($results);
        groups[group] = $groupHeading;
      }

      var $result = $('<li />').addClass('result')
        .append(output)
        .data('result', result) // Store the result object on this DOM element
        .addClass(result.addClass);

      // First groupless item
      if ($.type(group) != 'string' &&
          !$results.children().first().is('.result')) {
        $results.prepend($result);
        return; // Continue
      }
      var $traverseFrom = ($.type(group) == 'string') ?
                          groups[group] : $results.children().first();
      var $target = $traverseFrom.nextUntil('.group').last();
      $result.insertAfter($target.length ? $target : $traverseFrom);
    });
  };
};

var defaultCallbacks = {
  select: function(result, $input) {
    $input.val(result.title);
  },

  highlight: function(result, $input, trigger) {
    // Does nothing
  },

  themeResult: function(result) {
    var output = [];
    if ($.type(result.title) == 'string') {
      output.push('<h4>', result.title, '</h4>');
    }
    if ($.type(result.description) == 'string') {
      output.push('<p>', result.description, '</p>');
    }
    return output.join('');
  },

  queryLocalResults: function(query, resource, caseSensitive) {
    if (!$.isArray(resource)) {
      // Per default Better Autocomplete only handles arrays
      return [];
    }
    var results = [];
    $.each(resource, function(i, value) {
      switch ($.type(value)) {
      case 'string': // Flat array of strings
        if ((caseSensitive ? value : value.toLowerCase())
            .indexOf(query) >= 0) {
          // Match found
          results.push({ title: value });
        }
        break;
      case 'object': // Array of result objects
        if ($.type(value.title) == 'string' &&
            (caseSensitive ? value.title : value.title.toLowerCase())
            .indexOf(query) >= 0) {
          // Match found in title field
          results.push(value);
        }
        else if ($.type(value.description) == 'string' &&
                 (caseSensitive ? value.description :
                 value.description.toLowerCase()).indexOf(query) >= 0) {
          // Match found in description field
          results.push(value);
        }
        break;
      }
    });
    return results;
  },

  fetchRemoteData: function(url, completeCallback, timeout, crossOrigin) {
    $.ajax({
      url: url,
      dataType: crossOrigin && !$.support.cors ? 'jsonp' : 'json',
      timeout: timeout,
      success: function(data, textStatus) {
        completeCallback(data);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        completeCallback();
      }
    });
  },

  processRemoteData: function(data) {
    if ($.isArray(data)) {
      return data;
    }
    else {
      return [];
    }
  },

  getGroup: function(result) {
    if ($.type(result.group) == 'string') {
      return result.group;
    }
  },

  beginFetching: function($input) {
    $input.addClass('fetching');
  },

  finishFetching: function($input) {
    $input.removeClass('fetching');
  },

  afterShow: function($results) {},

  afterHide: function($results) {},

  constructURL: function(path, query) {
    return path + (path.indexOf('?') > -1 ? '&' : '?') + 'q=' + encodeURIComponent(query);
  },

  canonicalQuery: function(rawQuery, caseSensitive) {
    var query = $.trim(rawQuery);
    if (!caseSensitive) {
      query = query.toLowerCase();
    }
    return query;
  },

  insertSuggestionList: function($results, $input) {
    $results.width($input.outerWidth() - 2) // Subtract border width.
      .css({
        position: 'absolute',
        left: $input.position().left,
        top: $input.position().top + $input.outerHeight()
      })
      .hide()
      .insertAfter($input);
  }
};

var filters = $.expr[':'];
if (!filters.focus) {
  filters.focus = function(elem) {
    return elem === document.activeElement && (elem.type || elem.href);
  };
}

})(jQuery);
