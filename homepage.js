document.addEventListener('DOMContentLoaded', () => {
    const announcementWrapper = document.getElementById('announcementWrapper');
    const announcementCards = announcementWrapper.querySelectorAll('.announcement-card');
    const prevBtn = document.getElementById('prevAnnouncementBtn');
    const nextBtn = document.getElementById('nextAnnouncementBtn');
    const totalCards = announcementCards.length;
    let currentIndex = 0;
    const intervalTime = 3000; // Increased frequency to 3 seconds from 5 seconds
    let autoScrollInterval;

    // Function to get the correct scroll width of a single card including its margin
    function getCardScrollWidth() {
        if (announcementCards.length > 0) {
            const card = announcementCards[0];
            const cardStyle = getComputedStyle(card);
            const cardWidth = card.offsetWidth;
            const marginRight = parseFloat(cardStyle.marginRight);
            return cardWidth + marginRight;
        }
        return 0;
    }

    // Function to update the announcement display
    function updateAnnouncement() {
        // Calculate the translation based on the current index and card width.
        // For desktop, we want to center the active card within the `announcement-section`.
        // For mobile, it's a simple left-to-right scroll.

        const cardWidth = getCardScrollWidth(); // This now accurately includes margin for both mobile/desktop cards

        let translateX = -currentIndex * cardWidth;

        if (window.innerWidth >= 992) {
            // On desktop, get the visible width of the announcement carousel area
            const visibleCarouselWidth = announcementWrapper.parentElement.offsetWidth; // This is the width of .announcement-section

            // Calculate the offset to center the current card within the visible area
            const centerOffset = (visibleCarouselWidth - cardWidth) / 2;
            translateX = -currentIndex * cardWidth + centerOffset;
        }
        
        announcementWrapper.style.transform = `translateX(${translateX}px)`;
    }

    // Function to go to the next announcement
    function showNextAnnouncement() {
        currentIndex = (currentIndex + 1) % totalCards;
        updateAnnouncement();
        resetAutoScroll(); // Reset timer on manual interaction
    }

    // Function to go to the previous announcement
    function showPrevAnnouncement() {
        currentIndex = (currentIndex - 1 + totalCards) % totalCards; // Ensure index stays positive
        updateAnnouncement();
        resetAutoScroll(); // Reset timer on manual interaction
    }

    // Start auto-scrolling
    function startAutoScroll() {
        // Only start auto-scroll if there's more than one card to scroll through
        if (totalCards > 1) {
            autoScrollInterval = setInterval(showNextAnnouncement, intervalTime);
        }
    }

    // Reset auto-scroll timer
    function resetAutoScroll() {
        clearInterval(autoScrollInterval);
        startAutoScroll();
    }

    // Event listeners for navigation buttons
    if (nextBtn && prevBtn) { // Ensure buttons exist before adding listeners
        nextBtn.addEventListener('click', showNextAnnouncement);
        prevBtn.addEventListener('click', showPrevAnnouncement);
    }

    // Recalculate scroll width and update on window resize
    window.addEventListener('resize', () => {
        updateAnnouncement(); // Update position based on new width
        // Re-evaluate auto-scroll based on current window size and total cards
        clearInterval(autoScrollInterval); // Clear existing interval
        if (totalCards > 1) {
            startAutoScroll(); // Restart auto-scroll if conditions met
        }
    });

    // Initial call to set the first announcement and start auto-scroll
    updateAnnouncement();
    startAutoScroll(); // Start auto-scroll on initial load regardless of size, it will be handled by resize
});
