// Contact and feedback form functionality for Dr. Majid's Physiotherapy and Weight Loss Clinic

document.addEventListener('DOMContentLoaded', function() {
  initContactForm();
  initFeedbackForm();
});

/**
 * Initialize contact form submission
 */
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Validate form
    if (!validateForm(contactForm)) return;
    
    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Submit form data
    submitFormToGoogleSheets(contactForm, 'contact')
      .then(response => {
        // Reset form
        contactForm.reset();
        
        // Show success message
        showFormMessage(contactForm, response.message, true);
        
        // Reset button
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
      })
      .catch(error => {
        // Show error message
        showFormMessage(contactForm, error.message, false);
        
        // Reset button
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
      });
  });
}

/**
 * Initialize feedback form submission
 */
function initFeedbackForm() {
  const feedbackForm = document.getElementById('feedbackForm');
  
  if (!feedbackForm) return;
  
  // Initialize star rating functionality
  initStarRating();
  
  feedbackForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Validate form
    if (!validateForm(feedbackForm)) return;
    
    // Show loading state
    const submitButton = feedbackForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Submitting...';
    submitButton.disabled = true;
    
    // Submit form data
    submitFormToGoogleSheets(feedbackForm, 'feedback')
      .then(response => {
        // Reset form
        feedbackForm.reset();
        
        // Reset star rating
        const stars = feedbackForm.querySelectorAll('.rating input');
        stars.forEach(star => star.checked = false);
        
        // Show success message
        showFormMessage(feedbackForm, response.message, true);
        
        // Reset button
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
      })
      .catch(error => {
        // Show error message
        showFormMessage(feedbackForm, error.message, false);
        
        // Reset button
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
      });
  });
}

/**
 * Initialize star rating functionality
 */
function initStarRating() {
  const ratingContainer = document.querySelector('.rating');
  
  if (!ratingContainer) return;
  
  const stars = ratingContainer.querySelectorAll('input');
  const labels = ratingContainer.querySelectorAll('label');
  
  // Add hover effect
  labels.forEach((label, index) => {
    label.addEventListener('mouseover', () => {
      for (let i = labels.length - 1; i >= index; i--) {
        labels[i].style.color = '#FBBC05';
      }
    });
    
    label.addEventListener('mouseout', () => {
      labels.forEach(label => {
        if (!label.control.checked) {
          label.style.color = '';
        }
      });
    });
  });
  
  // Add click effect
  stars.forEach((star, index) => {
    star.addEventListener('change', () => {
      labels.forEach(label => {
        label.style.color = '';
      });
      
      for (let i = labels.length - 1; i >= index; i--) {
        labels[i].style.color = '#FBBC05';
      }
    });
  });
}