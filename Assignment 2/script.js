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
        console.log('Form submitted successfully!');
      }
    });
  });
  