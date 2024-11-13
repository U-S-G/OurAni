window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");
    loader.classList.add("loader--hidden");

    loader.addEventListener("transitionend", () => {
        document.body.removeChild(loader);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.photo img');
    const slideshowContainer = document.querySelector('.slideshow-container');
    const slideshowContent = document.querySelector('.slideshow-content img');
    const closeBtn = document.querySelector('.close-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;

    images.forEach((img, index) => {
        img.addEventListener('click', () => {
            currentIndex = index;
            showSlideshow();
        });
    });

    closeBtn.addEventListener('click', () => {
        slideshowContainer.style.display = 'none';
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
        showSlideshow();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
        showSlideshow();
    });

    function showSlideshow() {
        slideshowContent.src = images[currentIndex].src;
        slideshowContainer.style.display = 'flex';
        // Set the max-width and max-height of the image to fit the screen size
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const maxWidth = viewportWidth * 0.8; // 80% of viewport width
        const maxHeight = viewportHeight * 0.8; // 80% of viewport height
        slideshowContent.style.maxWidth = maxWidth + 'px';
        slideshowContent.style.maxHeight = maxHeight + 'px';
    }
});
