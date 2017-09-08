(function() {
  var config = {
    updateInterval: 60000
  };

  String.prototype.capitalize = function capitalize() {
    return this.toString().substr(0, 1).toUpperCase() + this.toString().substr(1);
  };

  /*
   * App logic
   */

  var currentCategory;

  function buildTable() {
    if (!(window.data instanceof Array) || window.data.length === 0) {
      alert("Data array is not ready, refreshing the page.");
      window.location.reload();
    }

    var $tbody = $('<tbody>');
    var $rows = [];

    data.forEach(function(integration, index) {
      var $row = $('<tr>');

      if (integration.status === 'ok') {
        $row.attr('class', ['green', integration.orgCategory].join(' '));
      } else {
        $row.attr('class', ['red', integration.orgCategory].join(' '));
      }

      var $cells = [
        $('<td>').attr('class', 'index'),
        $('<td>').attr('class', 'name').text(integration.orgName.capitalize()),
        $('<td>').attr('class', 'status').text(integration.status),
        $('<td>').attr('class', 'time').text(integration.time),
        $('<td>').attr('class', 'date').text(integration.date),
      ]      

      $row.append($cells);
      $rows.push($row);
    });

    $tbody.append($rows);
    if (currentCategory) {
      $tbody.find('tr:not(.' + currentCategory + ')').hide();
    }

    $('table tbody').replaceWith($tbody);
  }

  var dataUpdateInterval = setInterval(function() {
    $('#script-data').remove();
   
    var s = $('<script>');
    s[0].src = 'integr_status.js?nocache=' + new Date().getTime() + Math.random();
    s[0].id = 'script-data';
    s[0].onload = buildTable;
    s[0].onerror = location.reload;
    document.body.appendChild(s[0]);
  }, config.updateInterval);

  $(document).ready(buildTable);

  /*
   * UI handling
   */

    var $navbar = $('.navbar');
    $navbar.find('a').click(function() {
    $navbar.find('.navbar-toggle').click();
    currentCategory = $(this).attr('data-category');
    if(typeof currentCategory !== typeof undefined && currentCategory !== false){
	console.log("got it", currentCategory);
       $('tbody tr.' + currentCategory).fadeIn();
       $('tbody tr:not(.' + currentCategory + ')').fadeOut('slow');
    } else {
      $('tbody tr').fadeIn();
    }
  });
}());