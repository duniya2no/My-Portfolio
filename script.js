// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
  // Hero Animations
  const heroTimeline = gsap.timeline({ delay: 0.3 });
  
  heroTimeline
    .from('.hero-greeting', { opacity: 0, y: 50, duration: 0.8, ease: 'power3.out' })
    .from('.hero-title', { opacity: 0, y: 50, duration: 0.6, ease: 'power3.out' }, '-=0.4')
    .from('.hero-description', { opacity: 0, y: 50, duration: 0.6, ease: 'power3.out' }, '-=0.3')
    .from('.tech-badges', { opacity: 0, y: 50, duration: 0.6, ease: 'power3.out' }, '-=0.3')
    .from('.hero-cta', { opacity: 0, y: 50, duration: 0.6, ease: 'power3.out' }, '-=0.3')
    .from('.hero-image', { opacity: 0, scale: 0.8, rotation: -5, duration: 1, ease: 'elastic.out(1, 0.5)' }, '-=0.8');

  // Parallax effect for orbs
  gsap.to('.orb-primary', {
    y: -100,
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: 1
    }
  });

  gsap.to('.orb-secondary', {
    y: -200,
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: 1
    }
  });

  // Section animations
  const sections = document.querySelectorAll('.section');
  
  sections.forEach(section => {
    gsap.from(section.querySelectorAll('.section-header'), {
      opacity: 0,
      y: 50,
      duration: 0.8,
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });

    gsap.from(section.querySelectorAll('.glass-card'), {
      opacity: 0,
      y: 30,
      duration: 0.6,
      stagger: 0.15,
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      }
    });
  });

  // Skill bars animation
  const skillBars = document.querySelectorAll('.skill-progress');
  
  skillBars.forEach(bar => {
    const width = bar.style.width;
    bar.style.width = '0';
    
    gsap.to(bar, {
      width: width,
      duration: 1.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: bar,
        start: 'top 90%',
        toggleActions: 'play none none reverse'
      }
    });
  });

  // Timeline animation
  gsap.from('.timeline-item', {
    opacity: 0,
    x: -50,
    duration: 0.8,
    stagger: 0.3,
    scrollTrigger: {
      trigger: '.timeline',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    }
  });

  // Project cards animation
  gsap.from('.project-card', {
    opacity: 0,
    y: 60,
    scale: 0.9,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.projects-grid',
      start: 'top 75%',
      toggleActions: 'play none none reverse'
    }
  });

  // Project images animation on hover
  document.querySelectorAll('.project-card').forEach(card => {
    const img = card.querySelector('.project-image img');
    const overlay = card.querySelector('.project-overlay');
    
    card.addEventListener('mouseenter', () => {
      gsap.to(img, {
        scale: 1.1,
        duration: 0.5,
        ease: 'power2.out'
      });
      gsap.to(overlay, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
    
    card.addEventListener('mouseleave', () => {
      gsap.to(img, {
        scale: 1,
        duration: 0.5,
        ease: 'power2.out'
      });
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });

  // Navigation background on scroll
  window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navigation');
    if (window.scrollY > 50) {
      nav.style.background = 'rgba(10, 15, 26, 0.95)';
    } else {
      nav.style.background = 'rgba(10, 15, 26, 0.8)';
    }
  });
});

// Mobile menu toggle
function toggleMenu() {
  const navLinks = document.querySelector('.nav-links');
  navLinks.classList.toggle('active');
}

// Form submission with FormSubmit (No setup required - works immediately!)
async function handleSubmit(event) {
  event.preventDefault();
  
  const submitBtn = document.getElementById('submit-btn');
  const formMessage = document.getElementById('form-message');
  const form = document.getElementById('contact-form');
  
  // Disable submit button
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';
  formMessage.style.display = 'none';
  
  // Get form values
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  
  // Update subject with name
  form.querySelector('[name="_subject"]').value = `New Message from Portfolio Website - ${name}`;
  
  try {
    // Create form data
    const formData = new FormData(form);
    
    // Send to FormSubmit
    const response = await fetch('https://formsubmit.co/ajax/aliwork121477@gmail.com', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });
    
    const data = await response.json();
    
    if (response.ok && data.success) {
      // Show success message with animation
      formMessage.style.display = 'block';
      formMessage.style.background = 'rgba(34, 197, 94, 0.1)';
      formMessage.style.border = '1px solid rgba(34, 197, 94, 0.3)';
      formMessage.style.color = '#22c55e';
      formMessage.textContent = '✓ Thank you for your message! I will get back to you soon.';
      formMessage.style.fontWeight = '500';
      
      // Animate success message
      gsap.fromTo(formMessage, 
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.3 }
      );
      
      // Reset form
      form.reset();
      
      // Reset button after 3 seconds
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message ✉️';
        // Fade out message
        gsap.to(formMessage, {
          opacity: 0,
          y: -10,
          duration: 0.3,
          onComplete: () => {
            formMessage.style.display = 'none';
          }
        });
      }, 3000);
      
    } else {
      throw new Error(data.message || 'Form submission failed');
    }
    
  } catch (error) {
    console.error('Error sending message:', error);
    
    // Show error message with animation
    formMessage.style.display = 'block';
    formMessage.style.background = 'rgba(239, 68, 68, 0.1)';
    formMessage.style.border = '1px solid rgba(239, 68, 68, 0.3)';
    formMessage.style.color = '#ef4444';
    formMessage.innerHTML = '✗ There was an error sending your message. Please try again or contact me directly at <a href="mailto:aliwork121477@gmail.com" style="color: #14b8a6; text-decoration: underline;">aliwork121477@gmail.com</a>';
    formMessage.style.fontWeight = '500';
    
    // Animate error message
    gsap.fromTo(formMessage, 
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.3 }
    );
    
    // Reset button
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Message ✉️';
  }
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});
