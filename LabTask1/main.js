document.addEventListener('DOMContentLoaded', function() {
  const menuButton = document.getElementById('menu-icon');
  const menu = document.getElementById('menu');

  menuButton.addEventListener('click', function() {
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
  });

  menu.addEventListener('mouseleave', function() {
    menu.style.display = 'none';
  });
});

function smoothScroll(target, duration) {
  var targetElement = document.querySelector(target);
  var targetPosition = targetElement.getBoundingClientRect().top;
  var startPosition = window.pageYOffset;
  var distance = targetPosition - startPosition;
  var startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    var timeElapsed = currentTime - startTime;
    var run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}

var navLinks = document.querySelectorAll('nav a');

navLinks.forEach(function(navLink) {
  navLink.addEventListener('click', function(e) {
    e.preventDefault();
    var target = this.getAttribute('href');
    var duration = 1000;
    smoothScroll(target, duration);
  });
});

document.addEventListener("DOMContentLoaded", function() {
  var navLinks = document.querySelectorAll('.nav-tabs .nav-link');
  
  // Function to update active tab
  function updateActiveTab(link) {
    navLinks.forEach(function(otherLink) {
      otherLink.classList.remove('active');
    });
    link.classList.add('active');
  }

  // Click event listener for each tab
  navLinks.forEach(function(link) {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      updateActiveTab(link);
      var targetId = link.getAttribute('href');
      document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Check which section is in view on page load and scroll
  window.addEventListener('load', function() {
    var sections = document.querySelectorAll('section');
    var scrollPosition = window.scrollY;

    sections.forEach(function(section) {
      var sectionTop = section.offsetTop;
      var sectionHeight = section.clientHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        var targetLink = document.querySelector('a[href="#' + section.id + '"]');
        if (targetLink) {
          updateActiveTab(targetLink);
        }
      }
    });
  });

  // Check which section is in view on scroll and update active tab
  window.addEventListener('scroll', function() {
    var sections = document.querySelectorAll('section');
    var scrollPosition = window.scrollY;

    sections.forEach(function(section) {
      var sectionTop = section.offsetTop;
      var sectionHeight = section.clientHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        var targetLink = document.querySelector('a[href="#' + section.id + '"]');
        if (targetLink) {
          updateActiveTab(targetLink);
        }
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const navbarHeight = document.getElementById('navbar').offsetHeight;
  const sections = document.querySelectorAll('.section');

  sections.forEach(section => {
    section.style.paddingTop = navbarHeight + 'px';
  });
});
