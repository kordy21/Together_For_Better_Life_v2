 document.addEventListener('DOMContentLoaded', function () {
            const carouselContainer = document.getElementById('blogCarousel');
            const carouselTrack = document.getElementById('blogCarouselTrack');
            const nextButton = carouselContainer.querySelector('.carousel-control-next');
            const prevButton = carouselContainer.querySelector('.carousel-control-prev');
            const indicatorsContainer = document.getElementById('blogCarouselIndicators');

            let currentSlide = 0; // Tracks the index of the first visible card
            let cardsPerView = 4; // Default for large screens

            // Function to update cardsPerView based on screen size
            function updateCardsPerView() {
                const width = window.innerWidth;
                if (width < 768) { // Mobile
                    cardsPerView = 1;
                } else if (width < 992) { // Tablet
                    cardsPerView = 2;
                } else if (width < 1200) { // Smaller desktop
                    cardsPerView = 3;
                } else { // Large desktop
                    cardsPerView = 4;
                }
            }

            // Function to generate indicators dynamically
            function generateIndicators() {
                indicatorsContainer.innerHTML = ''; // Clear existing indicators
                const totalCards = carouselTrack.children.length;
                
                // Calculate the maximum index currentSlide can be to avoid blank space
                // This is the index of the first card in the last *viewable group*
                const maxScrollableIndex = totalCards - cardsPerView;

                // Iterate through possible starting points for each "page"
                // The loop should go up to and include maxScrollableIndex
                for (let i = 0; i <= maxScrollableIndex; i += cardsPerView) {
                    const button = document.createElement('button');
                    button.setAttribute('type', 'button');
                    button.setAttribute('data-bs-target', '#blogCarousel');
                    // The slide-to value should be the index of the first card in this group
                    // This is already capped by the loop condition, but Math.min ensures robustness
                    const slideToIndex = Math.min(i, maxScrollableIndex);
                    button.setAttribute('data-bs-slide-to', slideToIndex);
                    button.setAttribute('aria-label', `Slide ${Math.floor(slideToIndex / cardsPerView) + 1}`);
                    
                    // Determine if this indicator should be active
                    if (currentSlide >= slideToIndex && currentSlide < slideToIndex + cardsPerView) {
                        button.classList.add('active');
                        button.setAttribute('aria-current', 'true');
                    }
                    
                    button.addEventListener('click', (event) => {
                        currentSlide = parseInt(event.target.getAttribute('data-bs-slide-to'));
                        updateCarouselPosition();
                    });
                    indicatorsContainer.appendChild(button);
                }

                // Handle the case where the last group is partial and its starting index wasn't covered by i += cardsPerView
                // This ensures an indicator for the very last possible view is always present.
                if (totalCards % cardsPerView !== 0 && maxScrollableIndex >= 0) {
                     const lastPartialGroupStartIndex = maxScrollableIndex;
                     // Only add if it's not already covered by a previous indicator (e.g., if maxScrollableIndex is a multiple of cardsPerView)
                     if (indicatorsContainer.querySelector(`[data-bs-slide-to="${lastPartialGroupStartIndex}"]`) === null) {
                         const button = document.createElement('button');
                         button.setAttribute('type', 'button');
                         button.setAttribute('data-bs-target', '#blogCarousel');
                         button.setAttribute('data-bs-slide-to', lastPartialGroupStartIndex);
                         button.setAttribute('aria-label', `Slide ${Math.floor(lastPartialGroupStartIndex / cardsPerView) + 1}`);
                         if (currentSlide >= lastPartialGroupStartIndex && currentSlide < lastPartialGroupStartIndex + cardsPerView) {
                             button.classList.add('active');
                             button.setAttribute('aria-current', 'true');
                         }
                         button.addEventListener('click', (event) => {
                             currentSlide = parseInt(event.target.getAttribute('data-bs-slide-to'));
                             updateCarouselPosition();
                         });
                         indicatorsContainer.appendChild(button);
                     }
                }
            }

            // Function to update carousel position
            function updateCarouselPosition() {
                // Ensure there are children before trying to get offsetWidth
                if (carouselTrack.children.length === 0) return;

                const cardWidth = carouselTrack.children[0].offsetWidth; // Get actual width of a single card-wrapper
                const translateXValue = -currentSlide * cardWidth;
                carouselTrack.style.transform = `translateX(${translateXValue}px)`;
                updateIndicators(); // Update indicators after position change
            }

            // Function to update active indicator
            function updateIndicators() {
                const buttons = indicatorsContainer.querySelectorAll('button');
                buttons.forEach((button) => {
                    const slideIndex = parseInt(button.getAttribute('data-bs-slide-to'));
                    // An indicator is active if currentSlide falls within its group
                    if (currentSlide >= slideIndex && currentSlide < slideIndex + cardsPerView) {
                        button.classList.add('active');
                        button.setAttribute('aria-current', 'true');
                    } else {
                        button.classList.remove('active');
                        button.removeAttribute('aria-current');
                    }
                });
            }

            // Event listener for Next button
            nextButton.addEventListener('click', function() {
                const totalCards = carouselTrack.children.length;
                // Calculate the maximum index currentSlide can be to avoid blank space
                const maxScrollableIndex = totalCards - cardsPerView;

                if (currentSlide < maxScrollableIndex) {
                    currentSlide += 1; // Scroll one card at a time
                } else {
                    currentSlide = 0; // Loop back to the first card
                }
                updateCarouselPosition();
            });

            // Event listener for Previous button
            prevButton.addEventListener('click', function() {
                const totalCards = carouselTrack.children.length;
                const maxScrollableIndex = totalCards - cardsPerView;

                if (currentSlide > 0) {
                    currentSlide -= 1; // Scroll one card at a time
                } else {
                    // Loop to the last possible scrollable position (last full view)
                    currentSlide = maxScrollableIndex; 
                }
                updateCarouselPosition();
            });

            // Handle window resize
            window.addEventListener('resize', () => {
                updateCardsPerView();
                // When resizing, we need to ensure currentSlide doesn't exceed the new maxScrollableIndex
                const totalCards = carouselTrack.children.length;
                const maxScrollableIndex = totalCards - cardsPerView;
                if (currentSlide > maxScrollableIndex) {
                    currentSlide = maxScrollableIndex > 0 ? maxScrollableIndex : 0; // Adjust if currentSlide is out of bounds
                }
                
                generateIndicators(); // Regenerate indicators based on new cardsPerView
                updateCarouselPosition(); // Set initial position
            });

            // Initial setup
            updateCardsPerView();
            generateIndicators();
            updateCarouselPosition(); // Set initial position
        });