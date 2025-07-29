document.addEventListener('DOMContentLoaded', function () {
  const services = [
    {
      title: '1  الخطوة الأولى',
      description:
        'نعمل على توفير حياة كريمة للأسر المحتاجة، بتقديم الدعم المادي والعيني، وتأهيل منازلهم لتكون آمنة وصحية. نسعى لتوفير بيئة مستقرة تليق بكل فرد من أفراد المجتمع.',
    },
    {
      title: '2  الخطوة الثانية',
      description:
        'نوفر الدعم الشامل للأيتام والأسر الأكثر احتياجًا، من خلال برامج كفالة تضمن لهم التعليم الجيد، الرعاية الصحية، والمأوى المناسب. نؤمن بأن كل طفل يستحق فرصة لحياة كريمة ومستقبل مشرق.',
    },
    {
      title: '3  الخطوة الثالثة',
      description:
        'ندعم المشاريع الصغيرة والمتوسطة ونقدم التدريب المهني للشباب والسيدات، بهدف تمكين الأفراد والأسر اقتصاديًا. نساهم في بناء مجتمع منتج ومستدام، يمتلك فيه الجميع فرصًا لتحقيق الاكتفاء الذاتي والنمو.',
    },
  ];
  const services1 = [
    {
      title:'استكشاف المناطق المحتاجة',
      
    },
    {
      title: '  استكشاف المناطق المحتاجة ',
      
    },
    {
      title: ' استكشاف المناطق المحتاجة ',
      
    },
  ];

  let activeIndex = 0; // Initial active index
  const mohmServicesListContainer = document.getElementById('mohm-services-list');
  const mohmDescriptionTitle = document.getElementById('mohm-description-title');
  const mohmDescriptionText = document.getElementById('mohm-description-text');
  const mohmHighlightBar = document.getElementById('mohm-highlight-bar'); // Get the highlight bar element
  const mohmServiceItemElements = []; // To store references to the created service item divs

  // Function to render service items and update description
  function renderServices() {
    mohmServicesListContainer.innerHTML = ''; // Clear existing items
    mohmServiceItemElements.length = 0; // Clear array of elements

    services.forEach((service, idx) => {
      const serviceItem = document.createElement('div');
      serviceItem.classList.add('mohm-service-item'); // Use the new class name
      if (idx === activeIndex) {
        serviceItem.classList.add('active');
      }
      serviceItem.textContent = service.title;
      serviceItem.dataset.index = idx; // Store index for click handling
      
      serviceItem.addEventListener('click', function () {
        setActiveIndex(parseInt(this.dataset.index));
      });
      mohmServicesListContainer.appendChild(serviceItem);
      mohmServiceItemElements.push(serviceItem);
    });

    // Update description card
mohmDescriptionTitle.textContent =
  services1[activeIndex]?.title || services[activeIndex].title;

mohmDescriptionText.textContent =
  services[activeIndex]?.description || '';
  }

  // Function to set active index and re-render
  function setActiveIndex(index) {
    activeIndex = index;
    renderServices(); // Re-render to apply active class
    updateHighlightPosition();
  }

  // Function to update highlight bar position
  function updateHighlightPosition() {
    const el = mohmServiceItemElements[activeIndex];
    if (el) {
      const rect = el.getBoundingClientRect();
      const containerRect = mohmServicesListContainer.getBoundingClientRect();
      const relativeTop = rect.top - containerRect.top + mohmServicesListContainer.scrollTop;

      mohmHighlightBar.style.top = `${relativeTop}px`;
      mohmHighlightBar.style.height = `${el.offsetHeight}px`;
      mohmHighlightBar.style.display = 'flex'; // Ensure it's visible
    } else {
      mohmHighlightBar.style.display = 'none'; // Hide if no element is active
    }
  }

  // Initial render and highlight position update
  renderServices();
  // Use a slight delay to ensure all elements are rendered and measured correctly
  setTimeout(updateHighlightPosition, 100);

  // Event listeners for responsiveness and initial load
  window.addEventListener('resize', updateHighlightPosition);
  window.addEventListener('load', updateHighlightPosition);
});