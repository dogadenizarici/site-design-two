/*
 *	Responsive lightbox image gallery
 */
// Get all the images and the lightbox modal elements
const images = document.querySelectorAll('.gallery .image');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const closeButton = document.querySelector('.lightbox .close');
const prevButton = document.querySelector('.lightbox .prev');
const nextButton = document.querySelector('.lightbox .next');
const imageNumberLabel = document.getElementById('image-number');

let currentIndex = -1;
const imageArray = Array.from(images);

// Open the lightbox when an image is clicked
images.forEach((image, index) => {
	image.addEventListener('click', (e) => {
		e.preventDefault();  // Prevent the default behavior of the anchor tag
		currentIndex = index; // Set the current image index
		const imageUrl = image.getAttribute('href'); // Get the full-size image URL
		lightboxImage.src = imageUrl; // Set the source of the lightbox image
		lightbox.style.display = 'flex'; // Show the lightbox
		lightbox.setAttribute('aria-hidden', 'false'); // Make the lightbox accessible
		updateImageNumber(); // Update the image number display
		// Reset opacity and trigger transition
		setTimeout(() => {
			lightboxImage.style.opacity = 1;
		}, 100);
	});
});

// Update the image number label
function updateImageNumber() {
	imageNumberLabel.textContent = `${currentIndex + 1} / ${imageArray.length}`;
}

// Close the lightbox when the close button is clicked
closeButton.addEventListener('click', () => {
	lightbox.style.display = 'none'; // Hide the lightbox
	lightbox.setAttribute('aria-hidden', 'true'); // Make the lightbox accessible
});

// Close the lightbox when clicking outside the image
lightbox.addEventListener('click', (e) => {
	if (e.target === lightbox) {
		lightbox.style.display = 'none'; // Hide the lightbox
		lightbox.setAttribute('aria-hidden', 'true'); // Make the lightbox accessible
	}
});

// Function to navigate images with immediate image change
function navigateImage() {
	lightboxImage.src = imageArray[currentIndex].getAttribute('href'); // Change the image immediately
	updateImageNumber(); // Update the image number display
}

// Navigate to the previous image
prevButton.addEventListener('click', () => {
	currentIndex = (currentIndex > 0) ? currentIndex - 1 : imageArray.length - 1;
	navigateImage();
});

// Navigate to the next image
nextButton.addEventListener('click', () => {
	currentIndex = (currentIndex < imageArray.length - 1) ? currentIndex + 1 : 0;
	navigateImage();
});
