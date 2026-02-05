// Load student data and personalize page
function loadStudentData() {
    const studentDataStr = localStorage.getItem('studentData');
    
    if (!studentDataStr) {
        // Redirect to start page if no data
        window.location.href = 'index.html';
        return;
    }
    
    const studentData = JSON.parse(studentDataStr);
    
    // Update welcome message
    const welcomeMessage = document.getElementById('welcomeMessage');
    if (welcomeMessage) {
        welcomeMessage.textContent = `${studentData.name}님, 환영합니다! 🎉`;
    }
    
    // Update course message
    const courseMessage = document.getElementById('courseMessage');
    if (courseMessage) {
        courseMessage.textContent = `kt cloud TECH UP - ${studentData.courseName}`;
    }
    
    // Update start date
    const startDate = document.getElementById('startDate');
    if (startDate) {
        startDate.textContent = studentData.startDate;
    }
    
    // Update HRD course link
    const hrdCourseLink = document.getElementById('hrdCourseLink');
    if (hrdCourseLink && studentData.hrdUrl) {
        hrdCourseLink.href = studentData.hrdUrl;
    }
}

// Toggle mission completion
function toggleMission(missionId) {
    const button = document.getElementById('btn-' + missionId);
    const isCompleted = button.classList.contains('completed');
    
    if (isCompleted) {
        button.classList.remove('completed');
        button.innerHTML = '<i class="fas fa-check"></i> 미션 완료';
    } else {
        button.classList.add('completed');
        button.innerHTML = '<i class="fas fa-check-circle"></i> 완료됨';
    }
    
    updateProgress();
}

// Progress tracking
function updateProgress() {
    const buttons = document.querySelectorAll('.mission-complete-btn');
    const completed = Array.from(buttons).filter(btn => btn.classList.contains('completed')).length;
    const total = buttons.length;
    const percentage = (completed / total) * 100;
    
    const progressBar = document.getElementById('progressBar');
    progressBar.style.width = percentage + '%';
    
    // Save progress to localStorage
    const progress = {};
    buttons.forEach(btn => {
        const missionId = btn.id.replace('btn-', '');
        progress[missionId] = btn.classList.contains('completed');
    });
    localStorage.setItem('missionProgress', JSON.stringify(progress));
    
    // Show completion section if all missions are completed
    const completionSection = document.getElementById('completionSection');
    if (completed === total && total > 0) {
        completionSection.classList.add('show');
        // Scroll to completion section
        setTimeout(() => {
            completionSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
        
        // Trigger confetti animation
        createConfetti();
    } else {
        completionSection.classList.remove('show');
    }
}

// Load saved progress
function loadProgress() {
    const saved = localStorage.getItem('missionProgress');
    if (saved) {
        const progress = JSON.parse(saved);
        Object.keys(progress).forEach(missionId => {
            const button = document.getElementById('btn-' + missionId);
            if (button && progress[missionId]) {
                button.classList.add('completed');
                button.innerHTML = '<i class="fas fa-check-circle"></i> 완료됨';
            }
        });
        updateProgress();
    }
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 150);
        }
    });
}, observerOptions);

// Observe all mission cards
document.addEventListener('DOMContentLoaded', () => {
    // Load student data
    loadStudentData();
    
    const missionCards = document.querySelectorAll('.mission-card');
    missionCards.forEach(card => observer.observe(card));
    
    // Load saved progress
    loadProgress();
    
    // Smooth scroll for scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            document.querySelector('.missions').scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Add parallax effect to hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
});

// Confetti effect for completion
function createConfetti() {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe', '#43e97b', '#38f9d7'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.opacity = '1';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        
        document.body.appendChild(confetti);
        
        const duration = Math.random() * 3 + 2;
        const xMovement = (Math.random() - 0.5) * 200;
        const rotation = Math.random() * 360;
        
        confetti.animate([
            { 
                transform: 'translateY(0) translateX(0) rotate(0deg)',
                opacity: 1
            },
            { 
                transform: `translateY(${window.innerHeight + 10}px) translateX(${xMovement}px) rotate(${rotation}deg)`,
                opacity: 0
            }
        ], {
            duration: duration * 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
        
        setTimeout(() => {
            confetti.remove();
        }, duration * 1000);
    }
}

// Add hover effect to mission cards
document.addEventListener('DOMContentLoaded', () => {
    const missionCards = document.querySelectorAll('.mission-card');
    
    missionCards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', x + 'px');
            card.style.setProperty('--mouse-y', y + 'px');
        });
    });
});

// Add typing effect to hero subtitle
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Uncomment to enable typing effect
// window.addEventListener('load', () => {
//     const subtitle = document.querySelector('.hero-subtitle');
//     const originalText = subtitle.textContent;
//     typeWriter(subtitle, originalText, 100);
// });
