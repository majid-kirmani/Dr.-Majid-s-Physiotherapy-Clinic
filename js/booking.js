// Booking form functionality for Dr. Majid's Physiotherapy and Weight Loss Clinic

document.addEventListener('DOMContentLoaded', function() {
  initBookingForm();
  initDateValidation();
});

/**
 * Initialize booking form submission
 */
function initBookingForm() {
  const bookingForm = document.getElementById('appointmentForm');
  
  if (!bookingForm) return;
  
  bookingForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Validate form
    if (!validateForm(bookingForm)) return;
    
    // Show loading state
    const submitButton = bookingForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Booking...';
    submitButton.disabled = true;
    
    // Submit form data
    submitFormToGoogleSheets(bookingForm, 'booking')
      .then(response => {
        // Reset form
        bookingForm.reset();
        
        // Show success message
        showFormMessage(bookingForm, response.message, true);
        
        // Reset button
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
      })
      .catch(error => {
        // Show error message
        showFormMessage(bookingForm, error.message, false);
        
        // Reset button
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
      });
  });
}

/**
 * Initialize date validation for booking form
 */
function initDateValidation() {
  const preferredDateInput = document.getElementById('preferredDate');
  const alternateDateInput = document.getElementById('alternateDate');
  
  if (!preferredDateInput) return;
  
  // Set minimum date to today
  const today = new Date();
  const todayString = formatDateForInput(today);
  preferredDateInput.setAttribute('min', todayString);
  
  if (alternateDateInput) {
    alternateDateInput.setAttribute('min', todayString);
  }
  
  // Function to format date for input
  function formatDateForInput(date) {
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    
    return `${year}-${month}-${day}`;
  }
  
  // Validate date selection
  preferredDateInput.addEventListener('change', function() {
    validateDate(this);
  });
  
  if (alternateDateInput) {
    alternateDateInput.addEventListener('change', function() {
      validateDate(this);
    });
  }
  
  // Function to validate date
  function validateDate(input) {
    const selectedDate = new Date(input.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Check if date is in the past
    if (selectedDate < today) {
      showInputError(input, 'Please select a future date');
      input.value = '';
      return;
    }
    
    // Check if date is a Sunday (clinic closed)
    if (selectedDate.getDay() === 0) {
      showInputError(input, 'The clinic is closed on Sundays. Please select another day');
      input.value = '';
      return;
    }
    
    // Check if date is more than 3 months in the future
    const threeMonthsFromNow = new Date();
    threeMonthsFromNow.setMonth(today.getMonth() + 3);
    
    if (selectedDate > threeMonthsFromNow) {
      showInputError(input, 'Please select a date within the next 3 months');
      input.value = '';
      return;
    }
    
    // If all validations pass, remove any error
    removeInputError(input);
  }
}

/**
 * Populate time slots based on selected day
 * @param {HTMLElement} dateInput - The date input element
 * @param {HTMLElement} timeSelect - The time select element
 */
function populateTimeSlots(dateInput, timeSelect) {
  const selectedDate = new Date(dateInput.value);
  const day = selectedDate.getDay();
  
  // Clear existing options except the first one
  while (timeSelect.options.length > 1) {
    timeSelect.remove(1);
  }
  
  // Define available time slots based on day
  let timeSlots = [];
  
  if (day === 6) {
    // Saturday hours
    timeSlots = [
      '10:00 AM', '11:00 AM', '12:00 PM',
      '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
    ];
  } else if (day >= 1 && day <= 5) {
    // Monday to Friday hours
    timeSlots = [
      '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
      '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', 
      '5:00 PM', '6:00 PM'
    ];
  }
  
  // Add time slots to select
  timeSlots.forEach(time => {
    const option = document.createElement('option');
    option.value = time;
    option.textContent = time;
    timeSelect.appendChild(option);
  });
}
