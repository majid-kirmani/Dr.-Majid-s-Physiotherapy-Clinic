// Main JavaScript file for Dr. Majid's Physiotherapy and Weight Loss Clinic

document.addEventListener('DOMContentLoaded', function() {
  // Initialize mobile menu
  initMobileMenu();
  
  // Initialize scroll effect for header
  initHeaderScroll();
  
  // Initialize smooth scroll for anchor links
  initSmoothScroll();
  
  // Initialize fade-in animations
  initFadeInAnimations();
});

/**
 * Initialize mobile menu toggle functionality
 */
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (!menuToggle || !navMenu) return;
  
  menuToggle.addEventListener('click', function() {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
  
  // Close menu when clicking on a link
  const navLinks = document.querySelectorAll('.nav-menu a');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      menuToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
    const isClickInsideMenu = navMenu.contains(event.target);
    const isClickOnToggle = menuToggle.contains(event.target);
    
    if (!isClickInsideMenu && !isClickOnToggle && navMenu.classList.contains('active')) {
      menuToggle.classList.remove('active');
      navMenu.classList.remove('active');
    }
  });
}

/**
 * Initialize scroll effect for header
 */
function initHeaderScroll() {
  const header = document.getElementById('header');
  
  if (!header) return;
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
      header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.backgroundColor = '#ffffff';
      header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    }
  });
}

/**
 * Initialize smooth scroll for anchor links
 */
function initSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const headerHeight = document.getElementById('header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Initialize fade-in animations for elements as they scroll into view
 */
function initFadeInAnimations() {
  const fadeElements = document.querySelectorAll('.service-card, .program-card, .story-card, .team-member, .certification-item');
  
  if (fadeElements.length === 0) return;
  
  const fadeInOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const fadeInObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, fadeInOptions);
  
  fadeElements.forEach(element => {
    fadeInObserver.observe(element);
  });
}

/**
 * Validate form inputs
 * @param {HTMLFormElement} form - The form to validate
 * @returns {boolean} - Whether the form is valid
 */
function validateForm(form) {
  const requiredInputs = form.querySelectorAll('[required]');
  let isValid = true;
  
  requiredInputs.forEach(input => {
    if (!input.value.trim()) {
      isValid = false;
      showInputError(input, 'This field is required');
    } else {
      removeInputError(input);
      
      // Email validation
      if (input.type === 'email' && !validateEmail(input.value)) {
        isValid = false;
        showInputError(input, 'Please enter a valid email address');
      }
      
      // Phone validation
      if (input.type === 'tel' && !validatePhone(input.value)) {
        isValid = false;
        showInputError(input, 'Please enter a valid phone number');
      }
    }
  });
  
  return isValid;
}

/**
 * Show error message for input
 * @param {HTMLElement} input - The input element
 * @param {string} message - The error message
 */
function showInputError(input, message) {
  const formGroup = input.closest('.form-group');
  let errorElement = formGroup.querySelector('.error-message');
  
  if (!errorElement) {
    errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.style.color = '#EA4335';
    errorElement.style.fontSize = '0.85rem';
    errorElement.style.marginTop = '5px';
    formGroup.appendChild(errorElement);
  }
  
  errorElement.textContent = message;
  input.style.borderColor = '#EA4335';
}

/**
 * Remove error message from input
 * @param {HTMLElement} input - The input element
 */
function removeInputError(input) {
  const formGroup = input.closest('.form-group');
  const errorElement = formGroup.querySelector('.error-message');
  
  if (errorElement) {
    errorElement.remove();
  }
  
  input.style.borderColor = '';
}

/**
 * Validate email format
 * @param {string} email - The email to validate
 * @returns {boolean} - Whether the email is valid
 */
function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

/**
 * Validate phone number format
 * @param {string} phone - The phone number to validate
 * @returns {boolean} - Whether the phone number is valid
 */
function validatePhone(phone) {
  const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  return re.test(String(phone));
}

/**
 * Show form submission message
 * @param {HTMLElement} form - The form element
 * @param {string} message - The message to display
 * @param {boolean} isSuccess - Whether the submission was successful
 */
function showFormMessage(form, message, isSuccess = true) {
  const formContainer = form.closest('.form-container');
  let messageElement = formContainer.querySelector('.form-message');
  
  if (!messageElement) {
    messageElement = document.createElement('div');
    messageElement.className = 'form-message';
    messageElement.style.padding = '12px';
    messageElement.style.borderRadius = '4px';
    messageElement.style.marginTop = '20px';
    messageElement.style.textAlign = 'center';
    messageElement.style.fontWeight = '600';
    formContainer.appendChild(messageElement);
  }
  
  if (isSuccess) {
    messageElement.style.backgroundColor = 'rgba(52, 168, 83, 0.1)';
    messageElement.style.color = '#34A853';
    messageElement.style.borderLeft = '4px solid #34A853';
  } else {
    messageElement.style.backgroundColor = 'rgba(234, 67, 53, 0.1)';
    messageElement.style.color = '#EA4335';
    messageElement.style.borderLeft = '4px solid #EA4335';
  }
  
  messageElement.textContent = message;
  
  // Remove message after 5 seconds if it's a success message
  if (isSuccess) {
    setTimeout(() => {
      messageElement.style.opacity = '0';
      messageElement.style.transition = 'opacity 0.5s ease';
      
      setTimeout(() => {
        messageElement.remove();
      }, 500);
    }, 5000);
  }
}

/**
 * Submit form data to Google Sheets (mock function)
 * In a real implementation, this would connect to Google Apps Script
 * @param {HTMLFormElement} form - The form to submit
 * @param {string} formType - The type of form (booking, contact, feedback)
 */
function submitFormToGoogleSheets(form, formType) {
  // This is a mockup function. In a real implementation, we would:
  // 1. Create a Google Apps Script to accept form data and add it to a Google Sheet
  // 2. Make a fetch() request to the published script URL
  
  // For demonstration purposes, we'll simulate a successful submission
  return new Promise((resolve, reject) => {
    // Simulate network delay
    setTimeout(() => {
      // Simulate 90% success rate
      const isSuccess = Math.random() < 0.9;
      
      if (isSuccess) {
        resolve({
          status: 'success',
          message: getSuccessMessage(formType)
        });
      } else {
        reject({
          status: 'error',
          message: 'There was a problem submitting your form. Please try again.'
        });
      }
    }, 1500);
  });
}

/**
 * Get success message based on form type
 * @param {string} formType - The type of form
 * @returns {string} - The success message
 */
function getSuccessMessage(formType) {
  switch (formType) {
    case 'booking':
      return 'Your appointment request has been received! We will contact you shortly to confirm.';
    case 'contact':
      return 'Thank you for your message! We will get back to you as soon as possible.';
    case 'feedback':
      return 'Thank you for your feedback! We appreciate your input.';
    default:
      return 'Form submitted successfully!';
  }
}