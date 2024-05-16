$(document).ready(function() {
    $('#contactForm').submit(function(event) {
      event.preventDefault();
      var firstName = $('#firstName').val();
      var lastName = $('#lastName').val();
      var email = $('#email').val();
      var subject = $('#subject').val();
      var message = $('#message').val();
      
      if (firstName === '' || lastName === '' || email === '' || subject === '' || message === '') {
        alert('Please fill out all required fields.');
      } else {
        $('#successModal').modal('show');

        setTimeout(function() {
          $('#successModal').modal('hide');
          $('#firstName').val('');
          $('#lastName').val('');
          $('#email').val('');
          $('#subject').val('');
          $('#message').val('');
        }, 2000);
      }
    });
});
