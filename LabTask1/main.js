document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.getElementById('menu-icon');
    const menu = document.getElementById('menu');
  
    menuButton.addEventListener('click', function() {
      menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    });
  
  });
  
  document.addEventListener('DOMContentLoaded', function() {
    const menu = document.getElementById('menu');
  
    menu.addEventListener('mouseleave', function() {
      menu.style.display = 'none';
    });
  });
  