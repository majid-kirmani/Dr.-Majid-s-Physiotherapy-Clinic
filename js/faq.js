// FAQ functionality for Dr. Majid's Physiotherapy and Weight Loss Clinic

document.addEventListener('DOMContentLoaded', function() {
  initFAQs();
});

/**
 * Initialize FAQ accordion functionality
 */
function initFAQs() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  if (faqItems.length === 0) return;
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    if (question) {
      question.addEventListener('click', () => {
        // Toggle active state of the clicked item
        item.classList.toggle('active');
        
        // Update the toggle symbol
        const toggle = question.querySelector('.faq-toggle');
        if (toggle) {
          toggle.textContent = item.classList.contains('active') ? '−' : '+';
        }
        
        // Close other open items (optional - for accordion behavior)
        faqItems.forEach(otherItem => {
          if (otherItem !== item && otherItem.classList.contains('active')) {
            otherItem.classList.remove('active');
            const otherToggle = otherItem.querySelector('.faq-toggle');
            if (otherToggle) {
              otherToggle.textContent = '+';
            }
          }
        });
      });
    }
  });
  
  // Open the first FAQ item by default
  if (faqItems.length > 0) {
    faqItems[0].classList.add('active');
    const firstToggle = faqItems[0].querySelector('.faq-toggle');
    if (firstToggle) {
      firstToggle.textContent = '−';
    }
  }
}