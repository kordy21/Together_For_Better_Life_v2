document.addEventListener('DOMContentLoaded', function() {
      // Data from the React component
      const draft  = [
        {
          title: "Strategy Alignment & Architecture",
          description:
            "How can you ensure strategy alignment and accelerate value delivery? By bridging the gap between strategic goals and execution, we empower organizations to achieve measurable outcomes. From portfolio management to agile project delivery, we partner with you to drive initiatives that prioritize value, enhance agility, and deliver results with efficiency and impact.",
        },
        {
          title: "Enterprise Portfolio & Program Management",
          description:
            "How Do You Align Program Execution To Strategy And Accelerate Value Realization? From Portfolio Management To Project Delivery, We'll Work With You To Deliver Strategies And Initiatives In An Agile, Rapid And Value-Driven Manner.",
        },
        {
          title: "Experience Design",
          description:
            "How can you create exceptional experiences that drive engagement and loyalty?Through innovative experience design, we craft solutions that connect with users on a deeper level. By blending creativity, research, and strategy, we design interactions that are intuitive, engaging, and aligned with your brand's vision, ensuring meaningful and lasting connections.",
        },
        {
          title: "Human Capital Management - Workforce Management",
          description:
            "How can you optimize your workforce to drive performance and achieve business goals?,With a focus on Human Capital and Workforce Management, we help you unlock the full potential of your teams. By implementing strategic solutions in talent acquisition, development, and workforce planning, we empower organizations to enhance productivity, foster engagement, and adapt to evolving business needs.",
        },
        {
          title: "Operational Excellence Design",
          description:
            "How can you achieve sustainable growth through operational excellence?By designing and implementing efficient processes, we help organizations streamline operations, reduce costs, and enhance performance. Our approach to Operational Excellence focuses on innovation, agility, and continuous improvement to deliver measurable results and long-term success.",
        },
        {
          title: "People & Change",
          description:
            "How can you empower your people to drive change and achieve lasting transformation?Through strategic People & Change initiatives, we help organizations navigate transformation by aligning culture, leadership, and workforce capabilities. By fostering engagement, resilience, and adaptability, we ensure your teams are equipped to embrace change and deliver sustained impact.",
        },
      ];

            // Data from the React component
      const services = [
        {
          title: "البيت المستور",
          description : ""
          },
        {
          title: "الكفالة الاجتماعية",
          description:
            "How Do You Align Program Execution To Strategy And Accelerate Value Realization? From Portfolio Management To Project Delivery, We'll Work With You To Deliver Strategies And Initiatives In An Agile, Rapid And Value-Driven Manner.",
        },
        {
          title: "التنمية الاقتصادية",
          description:
            "How can you create exceptional experiences that drive engagement and loyalty?Through innovative experience design, we craft solutions that connect with users on a deeper level. By blending creativity, research, and strategy, we design interactions that are intuitive, engaging, and aligned with your brand's vision, ensuring meaningful and lasting connections.",
        }

      ];

      let activeIndex = 0; // Initial active index
      const servicesListContainer = document.getElementById('services-list');
      const descriptionTitle = document.getElementById('description-title');
      const descriptionText = document.getElementById('description-text');
      const serviceItemElements = []; // To store references to the created service item divs

      // Function to render service items and update description
      function renderServices() {
        servicesListContainer.innerHTML = ''; // Clear existing items
        serviceItemElements.length = 0; // Clear array of elements

        services.forEach((service, idx) => {
          const serviceItem = document.createElement('div');
          serviceItem.classList.add('service-item');
          if (idx === activeIndex) {
            serviceItem.classList.add('active');
          }
          serviceItem.textContent = service.title;
          serviceItem.dataset.index = idx; // Store index for click handling

          serviceItem.addEventListener('click', function() {
            setActiveIndex(parseInt(this.dataset.index));
          });
          servicesListContainer.appendChild(serviceItem);
          serviceItemElements.push(serviceItem);
        });

        // Update description card
        descriptionTitle.textContent = services[activeIndex].title;
        descriptionText.textContent = services[activeIndex].description;
      }

      // Function to set active index and re-render
      function setActiveIndex(index) {
        activeIndex = index;
        renderServices(); // Re-render to apply active class
        updateHighlightPosition();
      }

      // Function to update highlight bar position
      function updateHighlightPosition() {
        const el = serviceItemElements[activeIndex];
        if (el) {
          const rect = el.getBoundingClientRect();
          const containerRect = servicesListContainer.getBoundingClientRect();
          const relativeTop = rect.top - containerRect.top + servicesListContainer.scrollTop;

          highlightBar.style.top = `${relativeTop}px`;
          highlightBar.style.height = `${el.offsetHeight}px`;
          highlightBar.style.display = 'flex'; // Ensure it's visible
        } else {
          highlightBar.style.display = 'none'; // Hide if no element is active
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



    // tabs two //


    
    // tabs two //


    
    