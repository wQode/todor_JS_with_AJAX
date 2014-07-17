$(document).ready(function () {

  // $('body').on('mousemove', function(event) {
  //   console.log(event.screenX, event.screenY);
  // });

  // var show_form = function (event) {
  //   $('form').show();
  //   $('#new_priority').hide();
  // };
  // $('#new_priority').on('click', show_form)  

  // var hide_form = function (event) {
  //   event.preventDefault();
  //   $('form').hide();
  //   $('#new_priority').show();
  // };

  var toggle_form = function (event) {
    event && event.preventDefault && event.preventDefault();
    // New Priority button has no default, thus nothing to prevent
    
    $('form').fadeToggle(function () {
      $('#new_priority').toggle();
    
      // or can use this.reset();
      // $('#name').val('');
      // $('#color').val('');
      // $('#urgency').val('');
    });  
    $('form')[0].reset();
    // default state whenever form is toggled
    $('#add_priority').show();
    $('#update_priority').hide();
    $('#name').focus();
  };

  $('#new_priority').on('click', toggle_form);
  $('#cancel_priority').on('click', toggle_form); 
  // Cancel Priority button has a default to submit a form 
  // because it is a button within a form and will submit. 
  // the prevent default will prevent the submit action


  $('#priorities').on('submit', function (event) {
    event.preventDefault();

    var priority_name = $('#name').val();
    var priority_color = $('#color').val();
    var priority_urgency = $('#urgency').val();
    var priority_id = $('#priority_id').val();

    toggle_form("some variable");

    $.ajax({
      // ajax only works on local host and url tells it where to talk to
      url: '/priorities',
      type: 'POST',
      dataType: 'json',
      data: {
        name: priority_name,
        color: priority_color,
        urgency: priority_urgency,
        id: priority_id
      },
      success: function(p) {
        // console.log('done', p);
        // var $li = $('<li/>');
        
        // var $span1 = $('<span/>');
        // $span1.addClass('name');
        // $span1.text(p.name);
        
        // var $span2 = $('<span/>');
        // $span2.addClass('invisible color');
        // $span2.text(p.color);

        // var $span3 = $('<span/>');
        // $span3.addClass('invisible urgency');
        // $span3.text(p.urgency);

        // var $span4 = $('<span/>');
        // $span4.addClass('priority_id invisible');
        // $span4.text(p.id);

        // var $box = $('<div/>');
        // $box.addClass('priority');
        // $box.css('background-color', p.color);
        // $li.prepend($box);

        // $li.append($span1);
        // $li.append($span2);
        // $li.append($span3);
        // $li.append($span4);
        // $li.prependTo('#priority_list');
        render_priority(p);
      }
    });
  });

  var edit_priority = function () {
    // if form is hidden, then toggle_form (by testing)
    // $('form').is(':hidden') && toggle_form();
    if ($('form').is(':hidden')) {
      toggle_form(); 
    }

    $('#add_priority').hide();
    $('#update_priority').show();


    var $li = $(this).closest('li');
    var name = $li.find('.name').text();
    var color = $li.find('.color').text();
    var urgency = $li.find('.urgency').text();
    var priority_id = $li.find('.priority_id').text();

    $('#name').val( name );
    $('#color').val( color );
    $('#urgency').val( urgency );
    $('#priority_id').val( priority_id );

  };

  // Delegation ! Make sure you understand
  $('#priority-list').on('click', '.priority', edit_priority);


  var render_priority_boxes = function () {
    var $colors = $('.color');
    $colors.each(function (i, color) {
      var $color = $(color);
      var hex = $color.text();
      var $box = $('<div/>');
      $box.addClass('priority');
      $box.css('background-color', hex);
		// $color.after($box);
		// $color.prev().before($box)
      $color.closest('li').prepend($box);
    });
  };

  render_priority_boxes();

  var render_priority = function (p) {
        var $li = $('<li/>');
        
        var $span1 = $('<span/>');
        $span1.addClass('name');
        $span1.text(p.name);
        
        var $span2 = $('<span/>');
        $span2.addClass('invisible color');
        $span2.text(p.color);

        var $span3 = $('<span/>');
        $span3.addClass('invisible urgency');
        $span3.text(p.urgency);

        var $span4 = $('<span/>');
        $span4.addClass('priority_id invisible');
        $span4.text(p.id);

        var $box = $('<div/>');
        $box.addClass('priority');
        $box.css('background-color', p.color);
        $li.prepend($box);

        $li.append($span1);
        $li.append($span2);
        $li.append($span3);
        $li.append($span4);
        $li.prependTo('#priority-list');
  }
  for (var i = 0; i < priorities.length; i++) {
    render_priority( priorities[i]);
  };
});