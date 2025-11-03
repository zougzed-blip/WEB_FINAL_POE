document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('enquiryModal');
    const enquiryTitle = document.getElementById('enquiryTitle');
    
    // Open enquiry modal
    window.openEnquiryForm = function(type) {
        modal.style.display = "block";
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        
        // Set the title based on type
        switch(type) {
            case 'fitness':
                enquiryTitle.textContent = 'Fitness Program Enquiry';
                break;
            case 'nutrition':
                enquiryTitle.textContent = 'Nutrition Plan Enquiry';
                break;
            case 'wellness':
                enquiryTitle.textContent = 'Wellness Service Enquiry';
                break;
        }
    }

    // Close modal when clicking the close button
    document.querySelector('.close-modal').onclick = function() {
        closeModal();
    }

    // Close modal when clicking outside
    window.onclick = function(event) {
        if (event.target == modal) {
            closeModal();
        }
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === "Escape" && modal.style.display === "block") {
            closeModal();
        }
    });

    function closeModal() {
        modal.style.display = "none";
        document.body.style.overflow = ''; // Restore scrolling
    }

    // Handle quick enquiry form submission
    document.getElementById('quickEnquiryForm').addEventListener('submit', function(e) {
        e.preventDefault();
        // Here you would typically send the form data to your server
        alert('Thank you for your enquiry! We will get back to you soon.');
        closeModal();
    });
    const contactForm = document.querySelector('form');
    const inputs = document.querySelectorAll('input, textarea');
    
    // Form validation and popup functionality
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            if (validateForm()) {
                // Show loading state
                const submitButton = contactForm.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitButton.disabled = true;
                
            
                setTimeout(() => {
                   
                    showPopup('success', 'Thank you for your message! We will get back to you soon.');
                    
                    // Reset form
                    contactForm.reset();
                    
                
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                }, 2000);
            }
        });
    }
    
    // Add focus effects to form inputs
    inputs.forEach(input => {
       
        input.addEventListener('focus', function() {
            this.style.borderColor = 'var(--primary)';
            this.style.boxShadow = '0 0 0 2px rgba(76, 175, 80, 0.2)';
            
            // Show input hint popup
            showInputHint(this);
        });
        
        // Remove focus effect
        input.addEventListener('blur', function() {
            this.style.borderColor = '#ccc';
            this.style.boxShadow = 'none';
 
            hideInputHint(this);
            
      
            validateField(this);
        });
        
        // Real-time validation for required fields
        input.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                this.style.borderColor = 'var(--primary)';
            } else {
                this.style.borderColor = '#ccc';
            }
        });
    });
    
    // Form validation function
    function validateForm() {
        let isValid = true;
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        
        // Reset previous error states
        document.querySelectorAll('.error-message').forEach(el => el.remove());
        inputs.forEach(input => input.classList.remove('error'));
        
        // Validate name
        if (!name.value.trim()) {
            showFieldError(name, 'Please enter your name');
            isValid = false;
        }
        
        // Validate email
        if (!email.value.trim()) {
            showFieldError(email, 'Please enter your email');
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            showFieldError(email, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate message
        if (!message.value.trim()) {
            showFieldError(message, 'Please enter your message');
            isValid = false;
        } else if (message.value.trim().length < 10) {
            showFieldError(message, 'Message should be at least 10 characters long');
            isValid = false;
        }
        
        return isValid;
    }
    
    // Validate individual field
    function validateField(field) {
        const value = field.value.trim();
        
        // Remove any existing error
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        field.classList.remove('error');
        
        // Validate based on field type
        if (field.id === 'email' && value && !isValidEmail(value)) {
            showFieldError(field, 'Please enter a valid email address');
            return false;
        }
        
        if (field.id === 'message' && value && value.length < 10) {
            showFieldError(field, 'Message should be at least 10 characters long');
            return false;
        }
        
        if (field.hasAttribute('required') && !value) {
            showFieldError(field, 'This field is required');
            return false;
        }
        
        return true;
    }
    
    // Show field error
    function showFieldError(field, message) {
        field.classList.add('error');
        field.style.borderColor = '#e74c3c';
        
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.style.color = '#e74c3c';
        errorElement.style.fontSize = '0.8rem';
        errorElement.style.marginTop = '-15px';
        errorElement.style.marginBottom = '15px';
        errorElement.textContent = message;
        
        field.parentNode.insertBefore(errorElement, field.nextSibling);
    }
    
    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Show input hint popup
    function showInputHint(input) {
        // Remove any existing hint
        hideInputHint(input);
        
        const hints = {
            'name': 'Enter your first name',
            'surname': 'Enter your last name',
            'email': 'We\'ll never share your email with anyone else',
            'message': 'Tell us how we can help you'
        };
        
        if (hints[input.id]) {
            const hintElement = document.createElement('div');
            hintElement.className = 'input-hint';
            hintElement.textContent = hints[input.id];
            hintElement.style.position = 'absolute';
            hintElement.style.backgroundColor = 'var(--dark)';
            hintElement.style.color = 'white';
            hintElement.style.padding = '8px 12px';
            hintElement.style.borderRadius = '4px';
            hintElement.style.fontSize = '0.8rem';
            hintElement.style.zIndex = '1000';
            hintElement.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
            hintElement.style.maxWidth = '250px';
            
            // Position the hint
            const rect = input.getBoundingClientRect();
            hintElement.style.top = (rect.top + window.scrollY - 40) + 'px';
            hintElement.style.left = rect.left + 'px';
            
            document.body.appendChild(hintElement);
            input.dataset.hintId = hintElement.textContent;
        }
    }
    
    // Hide input hint
    function hideInputHint(input) {
        const hints = document.querySelectorAll('.input-hint');
        hints.forEach(hint => {
            if (hint.textContent === input.dataset.hintId) {
                hint.remove();
            }
        });
    }
    
    // Show popup notification
    function showPopup(type, message) {
        // Remove any existing popup
        const existingPopup = document.querySelector('.popup-notification');
        if (existingPopup) {
            existingPopup.remove();
        }
        
        const popup = document.createElement('div');
        popup.className = `popup-notification popup-${type}`;
        popup.innerHTML = `
            <div class="popup-content">
                <span class="popup-icon">
                    <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                </span>
                <span class="popup-message">${message}</span>
                <button class="popup-close"><i class="fas fa-times"></i></button>
            </div>
        `;
        
        // Style the popup
        popup.style.position = 'fixed';
        popup.style.top = '20px';
        popup.style.right = '20px';
        popup.style.zIndex = '10000';
        popup.style.backgroundColor = type === 'success' ? '#4CAF50' : '#e74c3c';
        popup.style.color = 'white';
        popup.style.padding = '15px 20px';
        popup.style.borderRadius = '5px';
        popup.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        popup.style.maxWidth = '400px';
        popup.style.transform = 'translateX(150%)';
        popup.style.transition = 'transform 0.3s ease';
        
        // Style popup content
        const popupContent = popup.querySelector('.popup-content');
        popupContent.style.display = 'flex';
        popupContent.style.alignItems = 'center';
        popupContent.style.gap = '10px';
        
        // Style close button
        const closeButton = popup.querySelector('.popup-close');
        closeButton.style.background = 'none';
        closeButton.style.border = 'none';
        closeButton.style.color = 'white';
        closeButton.style.cursor = 'pointer';
        closeButton.style.marginLeft = 'auto';
        
        // Add event listener to close button
        closeButton.addEventListener('click', () => {
            popup.style.transform = 'translateX(150%)';
            setTimeout(() => {
                if (popup.parentNode) {
                    popup.parentNode.removeChild(popup);
                }
            }, 300);
        });
        
        document.body.appendChild(popup);
        
        // Animate in
        setTimeout(() => {
            popup.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto close after 5 seconds
        setTimeout(() => {
            if (popup.parentNode) {
                popup.style.transform = 'translateX(150%)';
                setTimeout(() => {
                    if (popup.parentNode) {
                        popup.parentNode.removeChild(popup);
                    }
                }, 300);
            }
        }, 5000);
    }
    
    // Add character counter for message textarea
    const messageTextarea = document.getElementById('message');
    if (messageTextarea) {
        const counter = document.createElement('div');
        counter.className = 'char-counter';
        counter.style.textAlign = 'right';
        counter.style.fontSize = '0.8rem';
        counter.style.color = '#666';
        counter.style.marginTop = '-15px';
        counter.style.marginBottom = '15px';
        
        messageTextarea.parentNode.insertBefore(counter, messageTextarea.nextSibling);
        
        messageTextarea.addEventListener('input', function() {
            const count = this.value.length;
            counter.textContent = `${count} characters`;
            
            if (count < 10) {
                counter.style.color = '#e74c3c';
            } else if (count < 50) {
                counter.style.color = '#f39c12';
            } else {
                counter.style.color = '#27ae60';
            }
        });
        
        // Initialize counter
        counter.textContent = `0 characters`;
        counter.style.color = '#666';
    }
    
    console.log('HealthyLife Contact JS loaded successfully!');
});