// Gallery functionality for Dr. Majid's Physiotherapy and Weight Loss Clinic

document.addEventListener('DOMContentLoaded', function() {
  initGalleryFilter();
  initGalleryLightbox();
  initVideoTour();
});

/**
 * Initialize gallery filter functionality
 */
function initGalleryFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  if (filterButtons.length === 0 || galleryItems.length === 0) return;
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      // Get filter value
      const filterValue = button.getAttribute('data-filter');
      
      // Filter gallery items
      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        
        // Remove previous animation classes
        item.classList.remove('fade-in');
        
        if (filterValue === 'all' || filterValue === itemCategory) {
          item.style.display = 'block';
          // Add small delay before adding animation class
          setTimeout(() => {
            item.classList.add('fade-in');
          }, 50);
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/**
 * Initialize gallery lightbox functionality
 */
function initGalleryLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  if (galleryItems.length === 0) return;
  
  // Create lightbox elements
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.style.position = 'fixed';
  lightbox.style.top = '0';
  lightbox.style.left = '0';
  lightbox.style.width = '100%';
  lightbox.style.height = '100%';
  lightbox.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
  lightbox.style.display = 'none';
  lightbox.style.justifyContent = 'center';
  lightbox.style.alignItems = 'center';
  lightbox.style.zIndex = '9999';
  lightbox.style.opacity = '0';
  lightbox.style.transition = 'opacity 0.3s ease';
  
  const lightboxImg = document.createElement('img');
  lightboxImg.className = 'lightbox-img';
  lightboxImg.style.maxWidth = '90%';
  lightboxImg.style.maxHeight = '90%';
  lightboxImg.style.boxShadow = '0 5px 25px rgba(0, 0, 0, 0.5)';
  lightboxImg.style.transform = 'scale(0.9)';
  lightboxImg.style.transition = 'transform 0.3s ease';
  
  const lightboxCaption = document.createElement('div');
  lightboxCaption.className = 'lightbox-caption';
  lightboxCaption.style.position = 'absolute';
  lightboxCaption.style.bottom = '20px';
  lightboxCaption.style.left = '0';
  lightboxCaption.style.width = '100%';
  lightboxCaption.style.color = 'white';
  lightboxCaption.style.textAlign = 'center';
  lightboxCaption.style.padding = '10px';
  
  const lightboxClose = document.createElement('span');
  lightboxClose.className = 'lightbox-close';
  lightboxClose.innerHTML = '&times;';
  lightboxClose.style.position = 'absolute';
  lightboxClose.style.top = '20px';
  lightboxClose.style.right = '30px';
  lightboxClose.style.fontSize = '30px';
  lightboxClose.style.color = 'white';
  lightboxClose.style.cursor = 'pointer';
  
  // Add elements to lightbox
  lightbox.appendChild(lightboxImg);
  lightbox.appendChild(lightboxCaption);
  lightbox.appendChild(lightboxClose);
  document.body.appendChild(lightbox);
  
  // Add click event to gallery items
  galleryItems.forEach(item => {
    item.style.cursor = 'pointer';
    
    item.addEventListener('click', () => {
      const imgSrc = item.querySelector('img').src;
      const imgTitle = item.querySelector('.gallery-info h3').textContent;
      const imgDesc = item.querySelector('.gallery-info p').textContent;
      
      // Set lightbox content
      lightboxImg.src = imgSrc;
      lightboxCaption.innerHTML = `<h3 style="margin: 0 0 5px; font-size: 1.2rem;">${imgTitle}</h3><p style="margin: 0; opacity: 0.8;">${imgDesc}</p>`;
      
      // Show lightbox
      lightbox.style.display = 'flex';
      setTimeout(() => {
        lightbox.style.opacity = '1';
        lightboxImg.style.transform = 'scale(1)';
      }, 50);
    });
  });
  
  // Close lightbox on click
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', event => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });
  
  // Close lightbox on ESC key
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && lightbox.style.display === 'flex') {
      closeLightbox();
    }
  });
  
  // Function to close lightbox
  function closeLightbox() {
    lightbox.style.opacity = '0';
    lightboxImg.style.transform = 'scale(0.9)';
    
    setTimeout(() => {
      lightbox.style.display = 'none';
    }, 300);
  }
}

/**
 * Initialize video tour functionality
 */
function initVideoTour() {
  const videoPlaceholder = document.querySelector('.video-placeholder');
  const playButton = document.querySelector('.play-button');
  
  if (!videoPlaceholder || !playButton) return;
  
  playButton.addEventListener('click', () => {
    // In a real implementation, this would create a video element or open a modal with a video
    // For this example, we'll just show an alert
    alert('Video playback would start here in a real implementation.');
    
    // Example of what would happen in a real implementation:
    /*
    const videoContainer = videoPlaceholder.parentElement;
    const placeholderImage = videoPlaceholder.querySelector('img');
    
    // Create video element
    const video = document.createElement('video');
    video.className = 'tour-video';
    video.controls = true;
    video.autoplay = true;
    video.style.width = '100%';
    video.style.height = '100%';
    video.style.borderRadius = '8px';
    
    // Add source
    const source = document.createElement('source');
    source.src = 'videos/clinic-tour.mp4';
    source.type = 'video/mp4';
    
    video.appendChild(source);
    
    // Replace placeholder with video
    videoContainer.replaceChild(video, videoPlaceholder);
    */
  });
}