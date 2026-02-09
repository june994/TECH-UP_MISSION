// Course data with URLs
const courseData = {
    'product-design': {
        name: '프로덕트 디자인',
        hrdUrl: 'https://www.work24.go.kr/hr/a/a/3100/selectTracseDetl.do?tracseId=AIG20250000501679&tracseTme=2&cstmConsTme=&crseTracseSe=C0061&trainstCstmrId=500045581284&tracseReqstsCd=&focusId=',
        startDate: '2026-03-17'
    },
    'product-management': {
        name: '프로덕트 매니지먼트',
        hrdUrl: 'https://www.work24.go.kr/hr/a/a/3100/selectTracseDetl.do?tracseId=AIG20250000501677&tracseTme=2&cstmConsTme=&crseTracseSe=C0061&trainstCstmrId=500045581284&tracseReqstsCd=&focusId=',
        startDate: '2026-03-17'
    },
    'cloud-native': {
        name: '클라우드 네이티브',
        hrdUrl: 'https://www.work24.go.kr/hr/a/a/3100/selectTracseDetl.do?tracseId=AIG20250000501674&tracseTme=2&cstmConsTme=&crseTracseSe=C0061&trainstCstmrId=500045581284&tracseReqstsCd=&focusId=',
        startDate: '2026-03-17'
    },
    'cloud-infra': {
        name: '클라우드 인프라',
        hrdUrl: 'https://www.work24.go.kr/hr/a/a/3100/selectTracseDetl.do?tracseId=AIG20250000501678&tracseTme=3&cstmConsTme=&crseTracseSe=C0061&trainstCstmrId=500045581284&tracseReqstsCd=&focusId=',
        startDate: '2026-03-17'
    },
    'cyber-security': {
        name: '사이버 보안',
        hrdUrl: 'https://www.work24.go.kr/hr/a/a/3100/selectTracseDetl.do?tracseId=AIG20250000501669&tracseTme=2&cstmConsTme=&crseTracseSe=C0061&trainstCstmrId=500045581284&tracseReqstsCd=&focusId=',
        startDate: '2026-03-17'
    },
    'generative-ai': {
        name: '생성형 AI',
        hrdUrl: 'https://www.work24.go.kr/hr/a/a/3100/selectTracseDetl.do?tracseId=AIG20250000501671&tracseTme=2&cstmConsTme=&crseTracseSe=C0061&trainstCstmrId=500045581284&tracseReqstsCd=&focusId=',
        startDate: '2026-03-17'
    },
    'frontend': {
        name: '프론트엔드',
        hrdUrl: 'https://www.work24.go.kr/hr/a/a/3100/selectTracseDetl.do?tracseId=AIG20250000501665&tracseTme=2&cstmConsTme=&crseTracseSe=C0061&trainstCstmrId=500045581284&tracseReqstsCd=&focusId=',
        startDate: '2026-03-17'
    },
    'fullstack': {
        name: '풀스택',
        hrdUrl: 'https://www.work24.go.kr/hr/a/a/3100/selectTracseDetl.do?tracseId=AIG20250000501656&tracseTme=2&cstmConsTme=&crseTracseSe=C0061&trainstCstmrId=500045581284&tracseReqstsCd=&focusId=',
        startDate: '2026-03-17'
    },
    'backend': {
        name: '백엔드',
        hrdUrl: 'https://www.work24.go.kr/hr/a/a/3100/selectTracseDetl.do?tracseId=AIG20250000501666&tracseTme=2&cstmConsTme=&crseTracseSe=C0061&trainstCstmrId=500045581284&tracseReqstsCd=&focusId=',
        startDate: '2026-03-17'
    }
};

// Handle form submission
function handleSubmit(event) {
    event.preventDefault();
    
    const studentName = document.getElementById('studentName').value.trim();
    const courseSelect = document.getElementById('courseSelect').value;
    
    if (!studentName || !courseSelect) {
        alert('모든 항목을 입력해주세요.');
        return;
    }
    
    // Save to localStorage
    const studentData = {
        name: studentName,
        course: courseSelect,
        courseName: courseData[courseSelect].name,
        hrdUrl: courseData[courseSelect].hrdUrl,
        startDate: courseData[courseSelect].startDate,
        timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('studentData', JSON.stringify(studentData));
    
    // Redirect to mission page
    window.location.href = 'mission.html';
}

// Add animation on scroll
document.addEventListener('DOMContentLoaded', () => {
    const courseCards = document.querySelectorAll('.course-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.animation = 'fadeIn 0.6s ease-out forwards';
                }, index * 100);
            }
        });
    }, {
        threshold: 0.2
    });
    
    courseCards.forEach(card => {
        card.style.opacity = '0';
        observer.observe(card);
    });
});
