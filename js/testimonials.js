// Testimonials slider functionality for Dr. Majid's Physiotherapy and Weight Loss Clinic

document.addEventListener('DOMContentLoaded', function() {
  initTestimonialSlider();
});

/**
 * Initialize testimonial slider
 */
function initTestimonialSlider() {
  const testimonials = document.querySelectorAll('.testimonial');
  const dots = document.querySelectorAll('.testimonial-dot');
  
  if (testimonials.length === 0) return;
  
  let currentIndex = 0;
  let interval;
  
  // Set up click handlers for dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentIndex = index;
      updateTestimonial();
      resetInterval();
    });
  });
  
  // Function to update the active testimonial
  function updateTestimonial() {
    testimonials.forEach((testimonial, index) => {
      if (index === currentIndex) {
        testimonial.classList.add('active');
      } else {
        testimonial.classList.remove('active');
      }
    });
    
    dots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }
  
  // Function to move to the next testimonial
  function nextTestimonial() {
    currentIndex = (currentIndex + 1) % testimonials.length;
    updateTestimonial();
  }
  
  // Function to start the automatic slideshow
  function startAutoSlide() {
    interval = setInterval(nextTestimonial, 5000);
  }
  
  // Function to reset the interval when user interacts
  function resetInterval() {
    clearInterval(interval);
    startAutoSlide();
  }
  
  // Pause rotation when hovering over testimonials
  const testimonialContainer = document.querySelector('.testimonial-container');
  if (testimonialContainer) {
    testimonialContainer.addEventListener('mouseenter', () => {
      clearInterval(interval);
    });
    
    testimonialContainer.addEventListener('mouseleave', () => {
      startAutoSlide();
    });
  }
  
  // Initialize slider
  updateTestimonial();
  startAutoSlide();
  
  // Handle touch events for mobile
  let touchStartX = 0;
  let touchEndX = 0;
  
  const handleSwipe = () => {
    const swipeThreshold = 50;
    const swipeDistance = touchEndX - touchStartX;
    
    if (swipeDistance < -swipeThreshold) {
      // Swipe left - go to next
      nextTestimonial();
      resetInterval();
    } else if (swipeDistance > swipeThreshold) {
      // Swipe right - go to previous
      currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
      updateTestimonial();
      resetInterval();
    }
  };
  
  if (testimonialContainer) {
    testimonialContainer.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });
    
    testimonialContainer.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });
  }
}