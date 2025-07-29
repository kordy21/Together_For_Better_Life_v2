document.addEventListener('DOMContentLoaded', function() {
   // Swiper initialization for "قصص ملهمة" (Stories Carousel)
   var mySwiperStories = new Swiper(".mySwiper", {
     slidesPerView: 1,
     spaceBetween: 20,
     centeredSlides: false,
     slideToClickedSlide: true,
     loopAdditionalSlides: 3,
     loop: true,
     pagination: {
       el: ".mySwiper .swiper-pagination",
       clickable: true,
     },
     navigation: {
       nextEl: ".mySwiper .swiper-button-next",
       prevEl: ".mySwiper .swiper-button-prev",
     },
     breakpoints: {
       768: {
         slidesPerView: 2,
       },
       992: {
         slidesPerView: 3,
       },
     },
   });

   // Swiper initialization for "شركاء النجاح" (Partners Carousel - Mobile Only)
   var partnersMobileSwiper = new Swiper(".partners-mobile-swiper", {
       loop: true,
       slidesPerView: 2,
       spaceBetween: 15,
       autoplay: {
           delay: 3000,
           disableOnInteraction: false,
       },
       pagination: {
           el: ".partners-mobile-swiper .swiper-pagination",
           clickable: true,
       },
       breakpoints: {
           0: {
               slidesPerView: 2,
               spaceBetween: 15,
           },
           576: {
               slidesPerView: 3,
               spaceBetween: 20,
           }
       }
   });
});
