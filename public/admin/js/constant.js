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
})
