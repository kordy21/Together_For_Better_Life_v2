document.addEventListener('DOMContentLoaded', function() {
            console.log("Counting animation script started."); // رسالة تأكيد بدء السكريبت

            const statNumbers = document.querySelectorAll('.stat-number');

            const animateNumber = (element, start, end, duration, prefix = '', suffix = '') => {
                let startTime;
                const step = (currentTime) => {
                    if (!startTime) startTime = currentTime;
                    const progress = Math.min((currentTime - startTime) / duration, 1);
                    const value = Math.floor(progress * (end - start) + start);
                    element.textContent = prefix + value.toLocaleString() + suffix; // Add toLocaleString for comma separation
                    if (progress < 1) {
                        requestAnimationFrame(step);
                    } else {
                        element.textContent = prefix + end.toLocaleString() + suffix; // Ensure final value is exact
                    }
                };
                requestAnimationFrame(step);
            };

            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const statNumberElement = entry.target;
                        const targetValue = parseInt(statNumberElement.getAttribute('data-target-value'));
                        const prefix = statNumberElement.getAttribute('data-prefix') || '';
                        const suffix = statNumberElement.getAttribute('data-suffix') || '';

                        // Set initial text to '0' (or '0+' etc.) before animation
                        statNumberElement.textContent = prefix + '0' + suffix;

                        // Add class to trigger CSS transition for opacity/transform
                        statNumberElement.classList.add('is-visible');

                        // Start the counting animation
                        animateNumber(statNumberElement, 0, targetValue, 2000, prefix, suffix); // 2000ms = 2 seconds duration

                        // Stop observing once animated
                        observer.unobserve(statNumberElement);
                    }
                });
            }, {
                threshold: 0.5 // Trigger when 50% of the element is visible
            });

            statNumbers.forEach(numberElement => {
                // Initialize text content to '0' or '0+' etc. based on data attributes
                const prefix = numberElement.getAttribute('data-prefix') || '';
                const suffix = numberElement.getAttribute('data-suffix') || '';
                numberElement.textContent = prefix + '0' + suffix;
                
                observer.observe(numberElement);
            });
        });