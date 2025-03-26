/*
 * Offseting the header so that navbar see trough
 */
function adjustMarginTop() {

	// Get the height of the navbar
	const navbarHeight = navbar.offsetHeight;

	document.getElementById("slider").style.marginTop = `${-navbarHeight}px`;
}

window.onload = adjustMarginTop;
window.onresize = adjustMarginTop;

// ############### SLIDER ###############
/*
 * Header slider mouse click scroll and button navigation with smooth behavior
 */
const slider = document.querySelector(".slider-container");
let isDown = false;
let startX;
let scrollLeft;
let scrollForce = 2;
let slideWidth = slider.clientWidth; // Assuming each slide takes up the full width of the container

// Left and Right buttons
const leftButton = document.getElementById('slider-left-button');
const rightButton = document.getElementById('slider-right-button');

// Function to update the slideWidth
function updateSlideWidth() {
	slideWidth = slider.clientWidth;
}

// Mouse events
slider.addEventListener("mousedown", (event) => {
	isDown = true;
	startX = event.pageX - slider.offsetLeft;
	scrollLeft = slider.scrollLeft;


	// Disable scroll snap while dragging
	slider.style.scrollSnapType = 'none';
});

slider.addEventListener("mouseleave", () => {
	if (isDown) {
		isDown = false;
		smoothScrollToNearestSlide(); // Smooth scroll when mouse leaves
	}
	// Re-enable scroll snap when mouse leaves
	slider.style.scrollSnapType = 'x mandatory';
});

slider.addEventListener("mouseup", () => {
	if (isDown) {
		isDown = false;
		smoothScrollToNearestSlide(); // Smooth scroll when mouse is released
	}
	// Re-enable scroll snap when mouse is released
	slider.style.scrollSnapType = 'x mandatory';
});

slider.addEventListener("mousemove", (event) => {
	if (!isDown) return;
	const x = event.pageX - slider.offsetLeft;
	const walk = (x - startX) * scrollForce;
	slider.scrollLeft = scrollLeft - walk;
	event.preventDefault();
});

// Function to smoothly scroll to the nearest slide after dragging
function smoothScrollToNearestSlide() {
	// Recalculate the slide width in case the window has resized
	updateSlideWidth();

	const scrollMax = slider.scrollWidth - slider.clientWidth;
	const scrollPercentage = slider.scrollLeft / scrollMax;
	const nearestSlide = Math.round(scrollPercentage * (slider.scrollWidth / slideWidth)); // Nearest slide index

	// Scroll to the nearest slide with smooth transition
	const targetPosition = nearestSlide * slideWidth;
	slider.scrollTo({
		left: targetPosition,
		behavior: 'smooth', // Smooth scroll to the target slide
	});
}

// Recalculate the slide width when the window is resized
window.addEventListener('resize', () => {
	updateSlideWidth();
	// Ensure scroll snap is enabled after resizing
	slider.style.scrollSnapType = 'x mandatory';
});

// Handle button click functionality with smooth scroll
leftButton.addEventListener('click', () => {
	// Scroll to the previous slide with smooth transition
	const newScrollLeft = slider.scrollLeft - slideWidth;
	// Check if we're at the first slide (to loop)
	if (newScrollLeft < 0) {
		slider.scrollTo({
			left: slider.scrollWidth - slideWidth,
			behavior: 'smooth',
		});
	} else {
		slider.scrollTo({
			left: newScrollLeft,
			behavior: 'smooth',
		});
	}
});

rightButton.addEventListener('click', () => {
	// Scroll to the next slide with smooth transition
	const newScrollLeft = slider.scrollLeft + slideWidth;
	// Check if we've reached the last slide (to loop)
	if (newScrollLeft >= slider.scrollWidth) {
		slider.scrollTo({
			left: 0,
			behavior: 'smooth',
		});
	} else {
		slider.scrollTo({
			left: newScrollLeft,
			behavior: 'smooth',
		});
	}
});
