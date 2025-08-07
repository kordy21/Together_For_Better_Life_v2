document.addEventListener("DOMContentLoaded", function () {
  // Arabic data (default)
  const servicesAr = [
    {
      title: "1  الخطوة الأولى",
      description:
        "نعمل على توفير حياة كريمة للأسر المحتاجة، بتقديم الدعم المادي والعيني، وتأهيل منازلهم لتكون آمنة وصحية. نسعى لتوفير بيئة مستقرة تليق بكل فرد من أفراد المجتمع.",
    },
    {
      title: "2  الخطوة الثانية",
      description:
        "نوفر الدعم الشامل للأيتام والأسر الأكثر احتياجًا، من خلال برامج كفالة تضمن لهم التعليم الجيد، الرعاية الصحية، والمأوى المناسب. نؤمن بأن كل طفل يستحق فرصة لحياة كريمة ومستقبل مشرق.",
    },
    {
      title: "3  الخطوة الثالثة",
      description:
        "ندعم المشاريع الصغيرة والمتوسطة ونقدم التدريب المهني للشباب والسيدات، بهدف تمكين الأفراد والأسر اقتصاديًا. نساهم في بناء مجتمع منتج ومستدام، يمتلك فيه الجميع فرصًا لتحقيق الاكتفاء الذاتي والنمو.",
    },
  ];
  const services1Ar = [
    { title: "استكشاف المناطق المحتاجة" },
    { title: "استكشاف المناطق المحتاجة" },
    { title: "استكشاف المناطق المحتاجة" },
  ];

  // English data
  const servicesEn = [
    {
      title: "1  First Step",
      description:
        "We work to provide a decent life for needy families by offering financial and in-kind support and rehabilitating their homes to be safe and healthy. We aim to create a stable environment worthy of every individual in society.",
    },
    {
      title: "2  Second Step",
      description:
        "We provide comprehensive support for orphans and the most needy families through sponsorship programs that ensure quality education, healthcare, and suitable shelter. We believe every child deserves a chance for a decent life and bright future.",
    },
    {
      title: "3  Third Step",
      description:
        "We support small and medium enterprises and provide vocational training for youth and women to empower individuals and families economically. We contribute to building a productive, sustainable society where everyone has opportunities for self-sufficiency and growth.",
    },
  ];
  const services1En = [
    { title: "Exploring Needy Areas" },
    { title: "Exploring Needy Areas" },
    { title: "Exploring Needy Areas" },
  ];

  // Detect direction and choose data
  const isLTR = document.documentElement.dir === "ltr";
  const services = isLTR ? servicesEn : servicesAr;
  const services1 = isLTR ? services1En : services1Ar;

  let activeIndex = 0;
  const mohmServicesListContainer =
    document.getElementById("mohm-services-list");
  const mohmDescriptionTitle = document.getElementById(
    "mohm-description-title"
  );
  const mohmDescriptionText = document.getElementById("mohm-description-text");
  const mohmHighlightBar = document.getElementById("mohm-highlight-bar");
  const mohmServiceItemElements = [];

  function renderServices() {
    mohmServicesListContainer.innerHTML = "";
    mohmServiceItemElements.length = 0;

    services.forEach((service, idx) => {
      const serviceItem = document.createElement("div");
      serviceItem.classList.add("mohm-service-item");
      if (idx === activeIndex) {
        serviceItem.classList.add("active");
      }
      serviceItem.textContent = service.title;
      serviceItem.dataset.index = idx;

      serviceItem.addEventListener("click", function () {
        setActiveIndex(parseInt(this.dataset.index));
      });

      mohmServicesListContainer.appendChild(serviceItem);
      mohmServiceItemElements.push(serviceItem);
    });

    mohmDescriptionTitle.textContent =
      services1[activeIndex]?.title || services[activeIndex].title;
    mohmDescriptionText.textContent = services[activeIndex]?.description || "";
  }

  function setActiveIndex(index) {
    activeIndex = index;
    renderServices();
    updateHighlightPosition();
  }

  function updateHighlightPosition() {
    const el = mohmServiceItemElements[activeIndex];
    if (el) {
      const rect = el.getBoundingClientRect();
      const containerRect = mohmServicesListContainer.getBoundingClientRect();
      const relativeTop =
        rect.top - containerRect.top + mohmServicesListContainer.scrollTop;

      mohmHighlightBar.style.top = `${relativeTop}px`;
      mohmHighlightBar.style.height = `${el.offsetHeight}px`;
      mohmHighlightBar.style.display = "flex";
    } else {
      mohmHighlightBar.style.display = "none";
    }
  }

  renderServices();
  setTimeout(updateHighlightPosition, 100);

  window.addEventListener("resize", updateHighlightPosition);
  window.addEventListener("load", updateHighlightPosition);
});
