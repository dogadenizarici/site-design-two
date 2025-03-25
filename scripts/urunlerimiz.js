// ############### NAVBAR ###############
/*
 * Function to check the window width and deactivate the sidebar if necessary
 */
function sidebarDeactivate() {
	const checkbox = document.getElementById('sidebar-active');

	// Check if the window width is less than or equal to 600px
	if (window.innerWidth >= 700) {
		checkbox.checked = false; // Uncheck the checkbox
	}
}

// Listen for resize events to check window size on resize
window.addEventListener('resize', sidebarDeactivate);

// Run the function once on page load in case the page is already small
sidebarDeactivate();

/*
 * Offseting the header so that navbar see trough
 */
function adjustMarginTop() {

	// Get the height of the navbar
	const navbarHeight = navbar.offsetHeight;

	document.getElementById("slider").style.marginTop = `${-navbarHeight}px`;
}

/*
 * Scrolling change navbar design
 */
window.onscroll = function() {
	changeNavbarBackground();
};

function changeNavbarBackground() {
	var navbar = document.getElementById("navbar");
	if (window.scrollY > 200) {
		navbar.classList.add("scrolled");
	} else {
		navbar.classList.remove("scrolled");
	}
}

window.onload = adjustMarginTop;
window.onresize = adjustMarginTop;

// ############### SCROLLER ###############
/*
 * Infinite scroller part
 */
const scrollers = document.querySelectorAll(".scroller");

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
	addAnimation();
}

function addAnimation() {
	scrollers.forEach(scroller => {
		scroller.setAttribute("data-animated", true);

		const scrollerInner = scroller.querySelector(".inner-scroller");
		const scrollerContent = Array.from(scrollerInner.children);

		for (let i = 0; i < 5; i++) {
			scrollerContent.forEach(item => {
				const duplicatedItem = item.cloneNode(true);
				duplicatedItem.setAttribute("area-hidden", true);
				scrollerInner.appendChild(duplicatedItem);
			})
		}
	});
}
