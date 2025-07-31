function showCharityTab(event, tabId) {
      document.querySelectorAll('.charity-tab-content').forEach(tab => tab.classList.remove('active'));
      document.getElementById(tabId).classList.add('active');
      document.querySelectorAll('.charity-tab-button').forEach(btn => btn.classList.remove('active'));
      event.target.classList.add('active');

     
      if (tabId === 'charity-tab1' && window.charitySwiper1) setTimeout(() => window.charitySwiper1.update(), 200);
      if (tabId === 'charity-tab2' && window.charitySwiper2) setTimeout(() => window.charitySwiper2.update(), 200);
      if (tabId === 'charity-tab-qura' && window.charitySwiper3) setTimeout(() => window.charitySwiper3.update(), 200);
      if (tabId === 'charity-tab3' && window.charitySwiper4) setTimeout(() => window.charitySwiper4.update(), 200);
    }

    window.addEventListener("load", () => {
      
      window.charitySwiper1 = new Swiper(".charitySwiper1", {
        slidesPerView: 1, 
        spaceBetween: 25,
        pagination: {
          el: ".charity-swiper-pagination1", 
          clickable: true,
        },
        navigation: {
          nextEl: ".charitySwiper1 .swiper-button-next", 
          prevEl: ".charitySwiper1 .swiper-button-prev",
        },
        breakpoints: {
           768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          992: {
            slidesPerView: 2,
            spaceBetween: 25,
          },
        }
      });

      window.charitySwiper2 = new Swiper(".charitySwiper2", {
        slidesPerView: 1,
        spaceBetween: 25,
        pagination: {
          el: ".charity-swiper-pagination2",
          clickable: true,
        },
        navigation: {
          nextEl: ".charitySwiper2 .swiper-button-next",
          prevEl: ".charitySwiper2 .swiper-button-prev",
        },
        breakpoints: {
           768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          992: {
            slidesPerView: 2,
            spaceBetween: 25,
          },
        }
      });

      window.charitySwiper3 = new Swiper(".charitySwiper3", {
        slidesPerView: 1,
        spaceBetween: 25,
        pagination: {
          el: ".charity-swiper-pagination3",
          clickable: true,
        },
        navigation: {
          nextEl: ".charitySwiper3 .swiper-button-next",
          prevEl: ".charitySwiper3 .swiper-button-prev",
        },
        breakpoints: {
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          992: {
            slidesPerView: 2,
            spaceBetween: 25,
          },
        }
      });

      window.charitySwiper4 = new Swiper(".charitySwiper4", {
        slidesPerView: 1,
        spaceBetween: 25,
        pagination: {
          el: ".charity-swiper-pagination4",
          clickable: true,
        },
        navigation: {
          nextEl: ".charitySwiper4 .swiper-button-next",
          prevEl: ".charitySwiper4 .swiper-button-prev",
        },
        breakpoints: {
           768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            992: {
              slidesPerView: 2,
              spaceBetween: 25,
            },
        }
      });
    });


     window.addEventListener('load', function() {
      new Swiper(".aboutSwiper", {
        slidesPerView: 1,
        spaceBetween: 25,
        loop: true, /* Enable looping for continuous slide */
        pagination: {
          el: ".aboutSwiper-pagination-dots", /* Target the new pagination element outside */
          clickable: true,
        },
        navigation: {
          nextEl: ".aboutSwiper .swiper-button-next", /* Target navigation inside this swiper */
          prevEl: ".aboutSwiper .swiper-button-prev",
        },
      });
    });