document.addEventListener('DOMContentLoaded', () => {
            const announcementWrapper = document.getElementById('announcementWrapper');
            const announcementCards = announcementWrapper.querySelectorAll('.announcement-card');
            const prevBtn = document.getElementById('prevAnnouncementBtn');
            const nextBtn = document.getElementById('nextAnnouncementBtn');
            const totalCards = announcementCards.length;
            let currentIndex = 0;
            const intervalTime = 5000; // 5 seconds
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
                const cardScrollWidth = getCardScrollWidth();
                announcementWrapper.style.transform = `translateX(-${currentIndex * cardScrollWidth}px)`;
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
                autoScrollInterval = setInterval(showNextAnnouncement, intervalTime);
            }

            // Reset auto-scroll timer
            function resetAutoScroll() {
                clearInterval(autoScrollInterval);
                startAutoScroll();
            }

            // Event listeners for navigation buttons
            nextBtn.addEventListener('click', showNextAnnouncement);
            prevBtn.addEventListener('click', showPrevAnnouncement);

            // Recalculate scroll width and update on window resize
            window.addEventListener('resize', () => {
                updateAnnouncement(); // Update position based on new width
            });

            // Initial call to set the first announcement and start auto-scroll
            updateAnnouncement();
            startAutoScroll();
        });