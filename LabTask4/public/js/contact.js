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
          // Display confirmation dialog
          var confirmed = confirm('Are you sure you want to submit the form?');
          if (confirmed) {
              // Disable the submit button to prevent double submission
              $('#submitButton').prop('disabled', true);

              // Send form data to server
              $.ajax({
                  url: '/submit-form',
                  method: 'POST',
                  data: {
                      firstName: firstName,
                      lastName: lastName,
                      email: email,
                      subject: subject,
                      message: message
                  },
                  success: function(response) {
                      console.log('Form submission successful.');
                      // Trigger the modal
                      $('#successModal').modal('show');
                      
                      // Delay redirection by 2 seconds (adjust as needed)
                      setTimeout(function() {
                          console.log('Redirecting to homepage...');
                          // Redirect to homepage upon successful form submission
                          window.location.href = '/';
                      }, 2000);
                  },
                  error: function(xhr, status, error) {
                      console.error('Error submitting form:', error);
                      // Re-enable the submit button if there was an error
                      $('#submitButton').prop('disabled', false);
                  }
              });
          }
      }
  });

  // Logic for returning to homepage upon clicking the Return button
  $('#cancelButton').click(function() {
      console.log('Returning to homepage...');
      window.location.href = '/';
  });
});
