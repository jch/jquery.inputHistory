(($)->
  class InputHistory
    constructor: (options)->
      @size   = options.size || 50
      @values = []
      @index  = 0

    push: (message)->
      @values.unshift(message)
      @values.splice(@size)

    prev: ->
      if @index > @size-1
        @index = 0
      message = @values[@index]
      @index += 1
      message

    next: ->
      @index -= 1
      if @index < 0
        @index = 0
        ""
      else
        @values[@index]

  normalizeKeyHandler = (raw, elseHandler)->
    elseHandler or= (e)->
      # no op

    switch typeof(raw)
      when 'number' then (e)->
        e.keyCode == raw
      when 'string' then (e)->
        "" + e.keyCode == raw
      when 'function' then raw
      else elseHandler

  $.fn.inputHistory = (options)->
    options      or= {}
    options.data or= 'inputHistory'

    # enter without shift key
    options.store = normalizeKeyHandler options.store, (e)->
      e.keyCode == 13 && !e.shiftKey

    # up, alt-p
    options.prev = normalizeKeyHandler options.prev, (e)->
      e.keyCode == 38 || (e.ctrlKey && e.keyCode == 80)

    # down, alt-n
    options.next = normalizeKeyHandler options.next, (e)->
      e.keyCode == 40 || (e.ctrlKey && e.keyCode == 78)

    history = @data(options.data) || new InputHistory(options)
    @data options.data, history
    @bind 'keydown', (e)=>
      history.push(@val()) if options.store(e)
      @val(history.prev()) and e.preventDefault() if options.prev(e)
      @val(history.next()) and e.preventDefault() if options.next(e)

    this
)(jQuery)