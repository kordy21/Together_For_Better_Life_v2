// Stories Carousel JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize carousel
    const carousel = document.querySelector('#storiesCarousel');
    let carouselInstance;
    
    if (carousel) {
        // Create Bootstrap carousel instance
        carouselInstance = new bootstrap.Carousel(carousel, {
            interval: 4000,
            wrap: true,
            pause: 'hover'
        });
    }

    // Handle story play overlay clicks
    const storyPlayOverlays = document.querySelectorAll('#stories-carousel .story-play-overlay');
    
    storyPlayOverlays.forEach(overlay => {
        overlay.addEventListener('click', function(e) {
            e.preventDefault();
            
            const videoUrl = this.getAttribute('data-video-url');
            
            if (videoUrl) {
                // Pause carousel when video is clicked
                if (carouselInstance) {
                    carouselInstance.pause();
                }
                
                // Add loading animation
                const card = this.closest('.story-card');
                card.classList.add('stories-loading');
                
                // Create modal for video
                createVideoModal(videoUrl);
                
                // Remove loading animation after modal is created
                setTimeout(() => {
                    card.classList.remove('stories-loading');
                }, 500);
            }
        });
    });

    // Touch/Swipe support for mobile
    let startX = 0;
    let endX = 0;
    
    carousel?.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
    });
    
    carousel?.addEventListener('touchend', function(e) {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const threshold = 50; // minimum distance for swipe
        const diff = startX - endX;
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                // Swipe left - next slide
                carouselInstance?.next();
            } else {
                // Swipe right - previous slide
                carouselInstance?.prev();
            }
        }
    }

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!carousel) return;
        
        switch(e.key) {
            case 'ArrowLeft':
                carouselInstance?.prev();
                break;
            case 'ArrowRight':
                carouselInstance?.next();
                break;
            case 'Escape':
                // Close any open modal
                const openModal = document.querySelector('.video-modal.show');
                if (openModal) {
                    closeVideoModal();
                }
                break;
        }
    });

    // Auto-pause carousel when page is not visible
    document.addEventListener('visibilitychange', function() {
        if (!carouselInstance) return;
        
        if (document.hidden) {
            carouselInstance.pause();
        } else {
            carouselInstance.cycle();
        }
    });

    // Handle carousel events
    carousel?.addEventListener('slide.bs.carousel', function(e) {
        // Add fade effect to indicators
        const indicators = document.querySelectorAll('.carousel-indicators button');
        indicators.forEach((indicator, index) => {
            indicator.style.opacity = index === e.to ? '1' : '0.5';
        });
    });

    // Lazy loading for story images (if needed)
    const storyImages = document.querySelectorAll('#stories-carousel .story-card-img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    storyImages.forEach(img => {
        imageObserver.observe(img);
    });)
    const images = document.querySelectorAll('.card-img-top');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });

    // Video Modal Functions
    function createVideoModal(videoUrl) {
        // Remove existing modal if any
        const existingModal = document.querySelector('.video-modal');
        if (existingModal) {
            existingModal.remove();
        }

        // Extract YouTube video ID
        const videoId = extractYouTubeId(videoUrl);
        
        if (!videoId) {
            alert('رابط الفيديو غير صحيح');
            return;
        }

        // Create modal HTML
        const modalHTML = `
            <div class="modal fade video-modal" id="videoModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">مشاهدة الفيديو</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body p-0">
                            <div class="ratio ratio-16x9">
                                <iframe 
                                    src="https://www.youtube.com/watch?v=9H4wW-onnrg${videoId}?autoplay=1&rel=0" 
                                    title="YouTube video" 
                                    allowfullscreen>
                                </iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add modal to page
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // Show modal
        const modal = document.querySelector('#videoModal');
        const modalInstance = new bootstrap.Modal(modal);
        modalInstance.show();

        // Resume carousel when modal is closed
        modal.addEventListener('hidden.bs.modal', function() {
            if (carouselInstance) {
                carouselInstance.cycle();
            }
            modal.remove();
        });
    }

    function extractYouTubeId(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    }

    function closeVideoModal() {
        const modal = document.querySelector('#videoModal');
        if (modal) {
            const modalInstance = bootstrap.Modal.getInstance(modal);
            modalInstance?.hide();
        }
    }

    // Performance optimization - reduce animations on low-end devices
    const isLowEndDevice = navigator.hardwareConcurrency <= 2 || 
                          navigator.deviceMemory <= 2 || 
                          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isLowEndDevice) {
        document.body.classList.add('reduced-motion');
        
        // Add CSS for reduced motion
        const style = document.createElement('style');
        style.textContent = `
            .reduced-motion .story-card {
                transition: none;
            }
            .reduced-motion .card-img-top {
                transition: none;
            }
            .reduced-motion .play-overlay {
                transition: none;
            }
        `;
        document.head.appendChild(style);
    }

    // Analytics tracking (if needed)
    function trackCarouselInteraction(action, slideIndex) {
        // Example: Google Analytics tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', 'carousel_interaction', {
                'action': action,
                'slide_index': slideIndex,
                'section': 'stories'
            });
        }
    }

    // Add click tracking to carousel controls
    document.querySelectorAll('.carousel-control-prev, .carousel-control-next').forEach(control => {
        control.addEventListener('click', function() {
            const action = this.classList.contains('carousel-control-prev') ? 'prev' : 'next';
            const activeSlide = document.querySelector('.carousel-item.active');
            const slideIndex = Array.from(activeSlide.parentNode.children).indexOf(activeSlide);
            trackCarouselInteraction(action, slideIndex);
        });
    });


    document.addEventListener('DOMContentLoaded', function(){
    
    // Initialize carousel
    const carousel = document.querySelector('#storiesCarousel');
    let carouselInstance;
    
    if (carousel) {
        // Create Bootstrap carousel instance
        carouselInstance = new bootstrap.Carousel(carousel, {
            interval: 4000,
            wrap: true,
            pause: 'hover'
        });
    }
})





