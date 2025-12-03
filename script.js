// ============================================================================
// PAGE LOADER
// ============================================================================
window.addEventListener('load', () => {
  const loader = document.getElementById('page-loader');
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = '0';
      loader.style.transition = 'opacity 0.5s ease-out';
      setTimeout(() => loader.remove(), 500);
    }, 800);
  }
});

// ============================================================================
// THEME TOGGLE
// ============================================================================
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const htmlElement = document.documentElement;

const initTheme = () => {
  const savedTheme = localStorage.getItem('theme') || 'light';
  htmlElement.classList.toggle('dark', savedTheme === 'dark');
  updateThemeIcon(savedTheme === 'dark');
};

const updateThemeIcon = (isDark) => {
  if (themeIcon) {
    themeIcon.setAttribute('stroke', isDark ? '#f1f5f9' : '#0f172a');
  }
};

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isDark = htmlElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcon(isDark);
  });
}

initTheme();

// ============================================================================
// VIDEO CONTROLS WITH ANIMATIONS
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('introVideo');
  const overlayBtn = document.getElementById('videoOverlayBtn');
  const overlayIcon = document.getElementById('videoOverlayIcon');
  const muteBtn = document.getElementById('muteBtn');

  if (!video) return;

  // Attempt autoplay with sound
  const attemptAutoplay = () => {
    video.muted = false;
    const playPromise = video.play();
    
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay blocked; mute and retry
        video.muted = true;
        video.play().catch(() => {
          console.log('Autoplay blocked by browser');
        });
        if (muteBtn) muteBtn.textContent = '🔇';
      });
    }
  };

  attemptAutoplay();

  // Overlay play/pause button with hover animation
  if (overlayBtn) {
    overlayBtn.addEventListener('mouseenter', () => {
      overlayBtn.style.transform = 'scale(1.1)';
      overlayBtn.style.boxShadow = '0 10px 25px rgba(124, 58, 237, 0.4)';
    });

    overlayBtn.addEventListener('mouseleave', () => {
      overlayBtn.style.transform = 'scale(1)';
      overlayBtn.style.boxShadow = '';
    });

    overlayBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      e.stopPropagation();

      // Button press animation
      overlayBtn.style.transform = 'scale(0.95)';
      setTimeout(() => {
        overlayBtn.style.transform = 'scale(1)';
      }, 100);

      try {
        if (video.paused) {
          video.muted = false;
          await video.play();
          if (muteBtn) {
            muteBtn.textContent = '🔊';
            muteBtn.style.animation = 'pulse 0.5s ease-out';
          }
        } else {
          video.pause();
        }
      } catch (err) {
        console.error('Play/pause failed:', err);
      }
    });
  }

  // Update overlay icon when video plays/pauses with animation
  const updateOverlayIcon = () => {
    if (!overlayIcon) return;
    overlayIcon.style.transition = 'transform 0.3s ease-out';
    
    if (video.paused) {
      overlayIcon.style.transform = 'scale(1.2) rotate(0deg)';
      setTimeout(() => {
        overlayIcon.innerHTML = '<path d="M8 5v14l11-7z"/>';
        overlayIcon.style.transform = 'scale(1)';
      }, 150);
    } else {
      overlayIcon.style.transform = 'scale(1.2) rotate(90deg)';
      setTimeout(() => {
        overlayIcon.innerHTML = '<path d="M6 19h4V5H6v14zM14 5v14h4V5h-4z"/>';
        overlayIcon.style.transform = 'scale(1)';
      }, 150);
    }
  };

  video.addEventListener('play', updateOverlayIcon);
  video.addEventListener('pause', updateOverlayIcon);

  // Mute/unmute button with animation
  if (muteBtn) {
    const updateMuteIcon = () => {
      muteBtn.textContent = video.muted ? '🔇' : '🔊';
    };

    muteBtn.addEventListener('mouseenter', () => {
      muteBtn.style.transform = 'scale(1.15) rotate(10deg)';
      muteBtn.style.boxShadow = '0 8px 20px rgba(124, 58, 237, 0.3)';
    });

    muteBtn.addEventListener('mouseleave', () => {
      muteBtn.style.transform = 'scale(1)';
      muteBtn.style.boxShadow = '';
    });

    muteBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      // Button press animation
      muteBtn.style.transform = 'scale(0.9)';
      setTimeout(() => {
        muteBtn.style.transform = 'scale(1)';
      }, 100);

      video.muted = !video.muted;
      updateMuteIcon();

      // Feedback animation
      muteBtn.style.animation = 'none';
      setTimeout(() => {
        muteBtn.style.animation = 'pulse 0.5s ease-out';
      }, 10);

      if (video.paused) {
        video.play().catch(() => {
          console.log('Play triggered but blocked');
        });
      }
    });

    updateMuteIcon();
  }
});

// ============================================================================
// SMOOTH SCROLL & ACTIVE NAV LINKS WITH ANIMATIONS
// ============================================================================
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
  link.addEventListener('mouseenter', () => {
    link.style.transform = 'translateY(-2px)';
    link.style.color = '#7c3aed';
  });

  link.addEventListener('mouseleave', () => {
    link.style.transform = 'translateY(0)';
    link.style.color = '';
  });

  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Highlight active nav link on scroll with animation
window.addEventListener('scroll', () => {
  let current = '';
  const sections = document.querySelectorAll('section[id]');

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    const linkId = link.getAttribute('href').substring(1);
    if (linkId === current) {
      link.style.color = '#7c3aed';
      link.style.fontWeight = '600';
      link.style.borderBottom = '2px solid #7c3aed';
      link.style.paddingBottom = '4px';
    } else {
      link.style.color = '';
      link.style.fontWeight = '';
      link.style.borderBottom = '';
      link.style.paddingBottom = '';
    }
  });
});

// ============================================================================
// COUNTER ANIMATION WITH ENHANCED UI
// ============================================================================
const animateCounters = () => {
  const counters = document.querySelectorAll('.counter');

  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-counter'));
    let current = 0;
    const increment = target / 100;
    const duration = 1500;
    const steps = duration / 16;
    let stepCount = 0;

    // Add scale animation on start
    counter.parentElement.style.transform = 'scale(1.1)';
    counter.parentElement.style.transition = 'transform 0.3s ease-out';

    const updateCounter = () => {
      current += increment;
      if (stepCount < steps) {
        counter.textContent = Math.floor(current);
        counter.style.animation = 'slideInUp 0.5s ease-out';
        stepCount++;
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
        counter.parentElement.style.transform = 'scale(1)';
      }
    };

    updateCounter();
  });
};

// Trigger counter animation when section comes into view
const observerOptions = {
  threshold: 0.3,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && entry.target.querySelector('.counter')) {
      animateCounters();
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

const statsSection = document.querySelector('.grid.grid-cols-2');
if (statsSection) observer.observe(statsSection);

// ============================================================================
// PROJECT FILTER WITH ANIMATIONS
// ============================================================================
const projectFilter = document.getElementById('project-filter');
const projectCards = document.querySelectorAll('.project-card');

if (projectFilter) {
  projectFilter.addEventListener('change', (e) => {
    const filterValue = e.target.value;

    projectCards.forEach(card => {
      const category = card.getAttribute('data-category');
      if (filterValue === 'all' || category === filterValue) {
        card.style.display = 'block';
        card.style.animation = 'fadeInScale 0.5s ease-out';
        setTimeout(() => {
          card.style.opacity = '1';
        }, 10);
      } else {
        card.style.animation = 'fadeOutScale 0.3s ease-out';
        card.style.opacity = '0';
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    });
  });
}

// Project card hover animation
projectCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-8px) scale(1.02)';
    card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0) scale(1)';
    card.style.boxShadow = '';
  });
});

// ============================================================================
// CONTACT FORM WITH ANIMATIONS
// ============================================================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  const inputs = contactForm.querySelectorAll('input, textarea');

  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.style.transform = 'scale(1.02)';
      input.style.boxShadow = '0 0 15px rgba(124, 58, 237, 0.3)';
      input.style.borderColor = '#7c3aed';
    });

    input.addEventListener('blur', () => {
      input.style.transform = 'scale(1)';
      input.style.boxShadow = '';
      input.style.borderColor = '';
    });
  });

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    // Button animation on submit
    submitBtn.style.animation = 'pulse 0.5s ease-out';
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    try {
      console.log('Form submitted:', data);

      // Success animation
      submitBtn.style.background = '#10b981';
      submitBtn.textContent = '✓ Message Sent!';

      setTimeout(() => {
        submitBtn.style.background = '';
        submitBtn.textContent = 'Send Message';
        submitBtn.disabled = false;
        contactForm.reset();
      }, 2000);
    } catch (error) {
      console.error('Error submitting form:', error);
      submitBtn.style.background = '#ef4444';
      submitBtn.textContent = '✗ Error!';

      setTimeout(() => {
        submitBtn.style.background = '';
        submitBtn.textContent = 'Send Message';
        submitBtn.disabled = false;
      }, 2000);
    }
  });
}

// ============================================================================
// COPY TO CLIPBOARD WITH ANIMATIONS
// ============================================================================
document.querySelectorAll('[data-copy-email]').forEach(element => {
  element.addEventListener('mouseenter', () => {
    element.style.transform = 'translateX(2px)';
    element.style.textDecoration = 'underline wavy';
  });

  element.addEventListener('mouseleave', () => {
    element.style.transform = 'translateX(0)';
    element.style.textDecoration = '';
  });

  element.addEventListener('click', (e) => {
    e.preventDefault();
    const email = 'rakib.akond@outlook.com';
    navigator.clipboard.writeText(email).then(() => {
      element.style.animation = 'pulse 0.5s ease-out';
      const originalText = element.textContent;
      element.textContent = '✓ Copied!';
      element.style.color = '#10b981';

      setTimeout(() => {
        element.textContent = originalText;
        element.style.color = '';
      }, 1500);
    }).catch(() => {
      alert('Failed to copy');
    });
  });
});

document.querySelectorAll('[data-copy-phone]').forEach(element => {
  element.addEventListener('mouseenter', () => {
    element.style.transform = 'translateX(2px)';
    element.style.textDecoration = 'underline wavy';
  });

  element.addEventListener('mouseleave', () => {
    element.style.transform = 'translateX(0)';
    element.style.textDecoration = '';
  });

  element.addEventListener('click', (e) => {
    e.preventDefault();
    const phone = '+880 1883 799 630';
    navigator.clipboard.writeText(phone).then(() => {
      element.style.animation = 'pulse 0.5s ease-out';
      const originalText = element.textContent;
      element.textContent = '✓ Copied!';
      element.style.color = '#10b981';

      setTimeout(() => {
        element.textContent = originalText;
        element.style.color = '';
      }, 1500);
    }).catch(() => {
      alert('Failed to copy');
    });
  });
});

// ============================================================================
// HIRE BUTTON WITH ANIMATIONS
// ============================================================================
const hireBtn = document.getElementById('hire-btn');

if (hireBtn) {
  hireBtn.addEventListener('mouseenter', () => {
    hireBtn.style.transform = 'translateY(-3px)';
    hireBtn.style.boxShadow = '0 15px 35px rgba(124, 58, 237, 0.4)';
  });

  hireBtn.addEventListener('mouseleave', () => {
    hireBtn.style.transform = 'translateY(0)';
    hireBtn.style.boxShadow = '';
  });

  hireBtn.addEventListener('click', () => {
    hireBtn.style.animation = 'pulse 0.5s ease-out';
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// ============================================================================
// ANALYTICS DASHBOARD WITH CHARTS
// ============================================================================
const initAnalyticsDashboard = () => {
  const visitorsCount = document.getElementById('visitors-count');
  const projectsCount = document.getElementById('projects-count');
  const engagementCount = document.getElementById('engagement-count');

  const animateNumber = (element, min, max) => {
    const target = Math.floor(Math.random() * (max - min)) + min;
    let current = 0;
    const increment = target / 50;
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target;
        clearInterval(interval);
      } else {
        element.textContent = Math.floor(current);
      }
    }, 30);
  };

  if (visitorsCount) {
    visitorsCount.style.animation = 'slideInLeft 0.5s ease-out';
    animateNumber(visitorsCount, 1000, 5000);
  }

  if (projectsCount) {
    projectsCount.style.animation = 'slideInLeft 0.6s ease-out';
    animateNumber(projectsCount, 100, 500);
  }

  if (engagementCount) {
    engagementCount.style.animation = 'slideInLeft 0.7s ease-out';
    animateNumber(engagementCount, 50, 150);
  }

  // Initialize all charts
  initVisitorsChart();
  initProjectsChart();
  initGeoChart();
};

// Chart 1: Visitors Area Chart - Compact & Amazing
const initVisitorsChart = () => {
  const ctx = document.getElementById('visitorsChart');
  if (!ctx || typeof Chart === 'undefined') {
    console.log('Visitors chart canvas not found or Chart.js not loaded');
    return;
  }

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        label: 'Visitors',
        data: [120, 190, 150, 220, 180, 210, 195],
        borderColor: '#7c3aed',
        backgroundColor: 'rgba(124, 58, 237, 0.15)',
        borderWidth: 3,
        tension: 0.5,
        fill: true,
        pointBackgroundColor: '#7c3aed',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 3,
        pointHoverRadius: 5,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#fff',
          bodyColor: '#fff',
          borderColor: '#7c3aed',
          borderWidth: 1,
          padding: 8,
          displayColors: false,
          callbacks: {
            label: function(context) {
              return context.parsed.y + ' visitors';
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 250,
          grid: {
            color: 'rgba(124, 58, 237, 0.08)',
            drawBorder: false,
          },
          ticks: {
            font: {
              size: 10,
            },
            color: 'rgba(0, 0, 0, 0.5)',
          }
        },
        x: {
          grid: {
            display: false,
            drawBorder: false,
          },
          ticks: {
            font: {
              size: 10,
            },
            color: 'rgba(0, 0, 0, 0.5)',
          }
        },
      },
    },
  });
};

// Chart 2: Projects Bar Chart - Compact & Colorful
const initProjectsChart = () => {
  const ctx = document.getElementById('projectsChart');
  if (!ctx || typeof Chart === 'undefined') {
    console.log('Projects chart canvas not found or Chart.js not loaded');
    return;
  }

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [{
        label: 'Project Views',
        data: [65, 89, 72, 95],
        backgroundColor: [
          'rgba(124, 58, 237, 0.85)',
          'rgba(14, 165, 233, 0.85)',
          'rgba(34, 197, 94, 0.85)',
          'rgba(251, 146, 60, 0.85)',
        ],
        borderRadius: 6,
        borderSkipped: false,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#fff',
          bodyColor: '#fff',
          borderColor: '#7c3aed',
          borderWidth: 1,
          padding: 8,
          displayColors: false,
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          grid: {
            color: 'rgba(124, 58, 237, 0.08)',
            drawBorder: false,
          },
          ticks: {
            font: {
              size: 10,
            },
            color: 'rgba(0, 0, 0, 0.5)',
          }
        },
        x: {
          grid: {
            display: false,
            drawBorder: false,
          },
          ticks: {
            font: {
              size: 10,
            },
            color: 'rgba(0, 0, 0, 0.5)',
          }
        },
      },
    },
  });
};

// Chart 3: Engagement Doughnut Chart - Compact & Beautiful
const initGeoChart = () => {
  const ctx = document.getElementById('geoChart');
  if (!ctx || typeof Chart === 'undefined') {
    console.log('Geo chart canvas not found or Chart.js not loaded');
    return;
  }

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Analytics', 'Development', 'Design', 'Other'],
      datasets: [{
        data: [40, 30, 20, 10],
        backgroundColor: [
          'rgba(124, 58, 237, 0.9)',
          'rgba(14, 165, 233, 0.9)',
          'rgba(34, 197, 94, 0.9)',
          'rgba(251, 146, 60, 0.9)',
        ],
        borderColor: '#fff',
        borderWidth: 2,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            font: {
              size: 10,
            },
            color: 'rgba(0, 0, 0, 0.7)',
            padding: 10,
            usePointStyle: true,
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#fff',
          bodyColor: '#fff',
          borderColor: '#7c3aed',
          borderWidth: 1,
          padding: 8,
          displayColors: false,
          callbacks: {
            label: function(context) {
              return context.label + ': ' + context.parsed + '%';
            }
          }
        }
      },
    },
  });
};

// Wait for Chart.js to load before initializing charts
document.addEventListener('DOMContentLoaded', () => {
  // Small delay to ensure Chart.js is loaded
  setTimeout(() => {
    initAnalyticsDashboard();
  }, 500);
});

// ============================================================================
// BUTTON ANIMATIONS (All buttons)
// ============================================================================
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mouseenter', () => {
    btn.style.transform = 'translateY(-2px)';
    btn.style.transition = 'all 0.3s ease-out';
  });

  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'translateY(0)';
  });

  btn.addEventListener('mousedown', () => {
    btn.style.transform = 'translateY(1px)';
  });

  btn.addEventListener('mouseup', () => {
    btn.style.transform = 'translateY(-2px)';
  });
});

// ============================================================================
// SOCIAL ICONS WITH ANIMATION
// ============================================================================
document.querySelectorAll('.social-icon').forEach(icon => {
  icon.addEventListener('mouseenter', () => {
    icon.style.transform = 'scale(1.3) rotate(10deg)';
    icon.style.color = '#7c3aed';
  });

  icon.addEventListener('mouseleave', () => {
    icon.style.transform = 'scale(1)';
    icon.style.color = '';
  });
});

// ============================================================================
// BLOB ANIMATION (Animated blobs)
// ============================================================================
const initBlobAnimation = () => {
  const blobs = document.querySelectorAll('.blob');
  if (blobs.length === 0) return;

  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes float {
      0%, 100% { transform: translate(0, 0) scale(1); }
      33% { transform: translate(30px, -30px) scale(1.1); }
      66% { transform: translate(-20px, 20px) scale(0.9); }
    }
    @keyframes slideInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes slideInLeft {
      from { opacity: 0; transform: translateX(-20px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes fadeInScale {
      from { opacity: 0; transform: scale(0.8); }
      to { opacity: 1; transform: scale(1); }
    }
    @keyframes fadeOutScale {
      from { opacity: 1; transform: scale(1); }
      to { opacity: 0; transform: scale(0.8); }
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.1); opacity: 0.8; }
    }
  `;
  document.head.appendChild(style);

  blobs.forEach((blob, index) => {
    blob.style.animation = `float ${5 + index * 2}s infinite ease-in-out`;
  });
};

initBlobAnimation();

// ============================================================================
// SCROLL PROGRESS BAR
// ============================================================================
const addScrollProgressBar = () => {
  const progressBar = document.createElement('div');
  progressBar.id = 'scroll-progress';
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 4px;
    background: linear-gradient(to right, #7c3aed, #0ea5e9);
    width: 0%;
    z-index: 1000;
    transition: width 0.1s ease-out;
  `;
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
  });
};

addScrollProgressBar();

// ============================================================================
// INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS
// ============================================================================
const fadeInElements = document.querySelectorAll('section, .project-card, .service-card, .testimonial');

const fadeInObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'slideInUp 0.6s ease-out forwards';
      fadeInObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeInElements.forEach(el => fadeInObserver.observe(el));

// ============================================================================
// CONSOLE LOG
// ============================================================================
console.log('✅ Portfolio script loaded successfully with optimized charts!');