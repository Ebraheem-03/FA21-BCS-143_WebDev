document.addEventListener("DOMContentLoaded", function() {
    const menuFirstItem = document.querySelector(".navbar ul li:first-child a");
    
    const images = document.querySelectorAll(".card-img-top");
    
    images.forEach(image => {
        image.addEventListener("mouseover", function() {
            const imageName = image.alt;
            menuFirstItem.textContent = imageName;
        });
        
        image.addEventListener("mouseout", function() {
            menuFirstItem.textContent = "News"; // Reset to default text
        });
    });
});
