function getCookie (name) {
  var value = '; ' + document.cookie
  var parts = value.split('; ' + name + '=')
  if (parts.length == 2) {
    return parts
      .pop()
      .split(';')
      .shift()
  }
}

$(function () {
  // iCheck for checkbox and radio inputs
  $('input[type="checkbox"].minimal, input[type="radio"].minimal').iCheck({
    checkboxClass: 'icheckbox_minimal-blue',
    radioClass: 'iradio_minimal-blue'
  })
  // Red color scheme for iCheck
  $(
    'input[type="checkbox"].minimal-red, input[type="radio"].minimal-red'
  ).iCheck({
    checkboxClass: 'icheckbox_minimal-red',
    radioClass: 'iradio_minimal-red'
  })
  // Flat red color scheme for iCheck
  $('input[type="checkbox"].flat-red, input[type="radio"].flat-red').iCheck({
    checkboxClass: 'icheckbox_square-green',
    radioClass: 'iradio_square-green'
  })

  function deactiveUser ($button, userId) {
    $.post('/admin/users/deactive', {
      userId
    }).done(function (msg) {
      console.log(msg)
      if (msg.status) {
        $button
          .removeClass('btn-danger deactiveUser')
          .addClass('btn-primary activeUser')
          .text('Active')
      }
    })
  }
  function activeUser ($button, userId) {
    $.post('/admin/users/active', {
      userId
    }).done(function (msg) {
      console.log(msg)
      if (msg.status) {
        $button
          .removeClass('btn-primary activeUser')
          .addClass('btn-danger deactiveUser')
          .text('Deactive')
      }
    })
  }

  $('#users .acde').on('click', function () {
    const $button = $(this)
    const userId = $button.attr('data-user-id')
    const token = $('[name=_csrf]').val()
    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
      jqXHR.setRequestHeader('X-XSRF-TOKEN', token)
      jqXHR.setRequestHeader('X-CSRF-TOKEN', token)
    })
    if ($button.hasClass('deactiveUser')) {
      deactiveUser($button, userId)
    } else {
      activeUser($button, userId)
    }
  })

  $('#users .viewKeys').on('click', function () {
    const $button = $(this)
    $('#userPaymentAddress').text($button.attr('data-user-pm'))
    $('#userPublicKey').text($button.attr('data-user-pubkey'))
    $('#userPrivateKey').text($button.attr('data-user-privkey'))
    $('#modal-info').modal('show')
  })

  $('#dateRange').daterangepicker({
    startDate: dateRange.split(' - ')[0],
    endDate: dateRange.split(' - ')[1],
    locale: {
      format: 'DD/MM/YYYY'
    }
  })

  /* Morris.js Charts */
  // Sales chart
  // var area = new Morris.Area({
  //   element   : 'revenue-chart',
  //   resize    : true,
  //   data      : [
  //     { y: '2011 Q1', item1: 2666, item2: 2666 },
  //     { y: '2011 Q2', item1: 2778, item2: 2294 },
  //     { y: '2011 Q3', item1: 4912, item2: 1969 },
  //     { y: '2011 Q4', item1: 3767, item2: 3597 },
  //     { y: '2012 Q1', item1: 6810, item2: 1914 },
  //     { y: '2012 Q2', item1: 5670, item2: 4293 },
  //     { y: '2012 Q3', item1: 4820, item2: 3795 },
  //     { y: '2012 Q4', item1: 15073, item2: 5967 },
  //     { y: '2013 Q1', item1: 10687, item2: 4460 },
  //     { y: '2013 Q2', item1: 8432, item2: 5713 }
  //   ],
  //   xkey      : 'y',
  //   ykeys     : ['item1', 'item2'],
  //   labels    : ['Item 1', 'Item 2'],
  //   lineColors: ['#a0d0e0', '#3c8dbc'],
  //   hideHover : 'auto'
  // });
  new Morris.Area({
    element: 'reserveStats',
    resize: true,
    data: statsByDate,
    xkey: 'date',
    ykeys: ['total_purchase', 'total_redeem'],
    labels: ['Purchase', 'Redeem'],
    lineColors: ['#a0d0e0', '#3c8dbc'],
    hideHover: 'auto'
  })
  new Morris.Area({
    element: 'amountStats',
    resize: true,
    data: statsByDate,
    xkey: 'date',
    ykeys: ['total_purchase_amount', 'total_redeem_amount'],
    labels: ['Purchase', 'Redeem'],
    lineColors: ['#a0d0e0', '#3c8dbc'],
    hideHover: 'auto'
  })
})
