let currentSlide = 0;
const totalSlides = 7;
const slidesWrapper = document.getElementById('slidesWrapper');

// 更新导航状态
function updateNavigation() {
    // 导航状态更新（已移除底部导航栏）
}

// 切换到指定幻灯片
function goToSlide(slideIndex) {
    if (slideIndex >= 0 && slideIndex < totalSlides) {
        currentSlide = slideIndex;
        const translateX = -slideIndex * 14.2857; // 每页占14.2857%宽度（100%/7页）
        slidesWrapper.style.transform = `translateX(${translateX}%)`;
        updateNavigation();
        
        // 触发当前幻灯片动画
        animateCurrentSlide();
    }
}

// 下一页
function nextSlide() {
    if (currentSlide < totalSlides - 1) {
        goToSlide(currentSlide + 1);
    }
}

// 上一页
function previousSlide() {
    if (currentSlide > 0) {
        goToSlide(currentSlide - 1);
    }
}

// 动画化当前幻灯片内容
function animateCurrentSlide() {
    const currentSlideElement = document.querySelector(`.slide:nth-child(${currentSlide + 1})`);
    const content = currentSlideElement.querySelector('.slide-content');
    
    // 重置动画
    content.style.animation = 'none';
    content.offsetHeight; // 触发重排
    content.style.animation = 'slideIn 0.8s ease-out';
    
    // 为不同页面添加特殊动画
    switch(currentSlide) {
        case 0: // 首页
            animateHomePage();
            break;
        case 1: // 大纲页
            animateOutlinePage();
            break;
        case 2: // 背景页
            animateBackgroundPage();
            break;
        case 3: // 分析页
            animateAnalysisPage();
            break;
        case 4: // 目标页
            animateGoalsPage();
            break;
        case 5: // 工作措施页
            animateMeasuresPage();
            break;
        case 6: // 成效与经验页
            animateResultsPage();
            break;
    }
}

// 首页动画
function animateHomePage() {
    const homeContent = document.querySelector('.home-content');
    if (homeContent) {
        homeContent.classList.add('fade-in');
    }
}

// 大纲页动画
function animateOutlinePage() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = 'all 0.6s ease';
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 100);
        }, index * 200);
    });
}

// 背景页动画
function animateBackgroundPage() {
    const sections = document.querySelectorAll('.background-section');
    sections.forEach((section, index) => {
        setTimeout(() => {
            section.style.opacity = '0';
            section.style.transform = 'translateX(-30px)';
            section.style.transition = 'all 0.6s ease';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateX(0)';
            }, 100);
        }, index * 300);
    });
}

// 分析页动画
function animateAnalysisPage() {
    const problemItems = document.querySelectorAll('.problem-item');
    problemItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            item.style.transition = 'all 0.6s ease';
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            }, 100);
        }, index * 200);
    });
}

// 目标页动画
function animateGoalsPage() {
    const goalItems = document.querySelectorAll('.goal-item');
    goalItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = 'all 0.6s ease';
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 100);
        }, index * 200);
    });
}

// 工作措施页动画
function animateMeasuresPage() {
    const measureItems = document.querySelectorAll('.measure-item');
    measureItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-30px)';
            item.style.transition = 'all 0.6s ease';
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, 100);
        }, index * 200);
    });
}

// 成效与经验页动画
function animateResultsPage() {
    const dataItems = document.querySelectorAll('.data-item');
    const videoPlaceholder = document.querySelector('.video-placeholder');
    
    // 数据项动画
    dataItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            item.style.transition = 'all 0.6s ease';
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            }, 100);
        }, index * 150);
    });
    
    // 视频占位符动画
    if (videoPlaceholder) {
        setTimeout(() => {
            videoPlaceholder.style.opacity = '0';
            videoPlaceholder.style.transform = 'translateY(30px)';
            videoPlaceholder.style.transition = 'all 0.8s ease';
            setTimeout(() => {
                videoPlaceholder.style.opacity = '1';
                videoPlaceholder.style.transform = 'translateY(0)';
            }, 100);
        }, dataItems.length * 150 + 200);
    }
}

// 数字动画
function animateNumbers() {
    const satisfaction = document.getElementById('satisfaction');
    const orderRate = document.getElementById('orderRate');
    
    animateNumber(satisfaction, 93.62, 2000);
    animateNumber(orderRate, 97.88, 2000, '%');
}

function animateNumber(element, target, duration = 2000, suffix = '') {
    const start = 0;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = start + (target - start) * easeOutQuart;
        
        element.textContent = current.toFixed(2) + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// 键盘导航
document.addEventListener('keydown', function(e) {
    switch(e.key) {
        case 'ArrowLeft':
            e.preventDefault();
            previousSlide();
            break;
        case 'ArrowRight':
            e.preventDefault();
            nextSlide();
            break;
        case 'Home':
            e.preventDefault();
            goToSlide(0);
            break;
        case 'End':
            e.preventDefault();
            goToSlide(totalSlides - 1);
            break;
    }
});

// 鼠标滚轮导航（可选）
let wheelTimeout;
document.addEventListener('wheel', function(e) {
    e.preventDefault();
    
    clearTimeout(wheelTimeout);
    wheelTimeout = setTimeout(() => {
        if (e.deltaY > 0) {
            nextSlide();
        } else {
            previousSlide();
        }
    }, 150);
});

// 触摸手势支持
let startX = 0;
let endX = 0;

document.addEventListener('touchstart', function(e) {
    startX = e.touches[0].clientX;
});

document.addEventListener('touchmove', function(e) {
    e.preventDefault();
});

document.addEventListener('touchend', function(e) {
    endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    
    if (Math.abs(diff) > 50) {
        if (diff > 0) {
            nextSlide();
        } else {
            previousSlide();
        }
    }
});

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    updateNavigation();
    animateCurrentSlide();
    
    // 添加淡入效果
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// 阻止页面刷新时的滚动
window.addEventListener('beforeunload', function() {
    window.scrollTo(0, 0);
});

// Original JS remains unchanged above

// Additions for dynamic charts and triggering animations
window.addEventListener('DOMContentLoaded', function() {
    // Trigger number animations if elements exist
    const satisfaction = document.getElementById('satisfaction');
    const orderRate = document.getElementById('orderRate');
    // Add more as needed per page
    if (satisfaction) animateNumber(satisfaction, 93.62, 2000, '');
    if (orderRate) animateNumber(orderRate, 97.88, 2000, '%');

    // Trigger chart drawings if canvas exists
    const chartCanvas = document.getElementById('dataChart');
    if (chartCanvas) {
        // Example pie chart function (adapt per page)
        drawPieChart(chartCanvas, [58, 42], ['下降 (58%)', '其他'], ['#FF6384', '#36A2EB']);
    }

    // Add specific chart calls per page (overridden in individual HTML scripts if needed)
});

// Function to draw pie chart
function drawPieChart(canvas, data, labels, colors) {
    const ctx = canvas.getContext('2d');
    let total = data.reduce((a, b) => a + b, 0);
    let startAngle = 0;
    data.forEach((value, index) => {
        const sliceAngle = (value / total) * 2 * Math.PI;
        ctx.fillStyle = colors[index];
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, canvas.height / 2);
        ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, startAngle, startAngle + sliceAngle);
        ctx.closePath();
        ctx.fill();
        // Label
        const textAngle = startAngle + sliceAngle / 2;
        const textX = canvas.width / 2 + (canvas.width / 3) * Math.cos(textAngle);
        const textY = canvas.height / 2 + (canvas.height / 3) * Math.sin(textAngle);
        ctx.fillStyle = '#000';
        ctx.font = '16px Arial';
        ctx.fillText(labels[index], textX, textY);
        startAngle += sliceAngle;
    });
}

// Function to draw bar chart
function drawBarChart(canvas, data, labels, colors) {
    const ctx = canvas.getContext('2d');
    const barWidth = canvas.width / data.length / 2;
    const maxValue = Math.max(...data);
    data.forEach((value, index) => {
        const barHeight = (value / maxValue) * (canvas.height - 50);
        ctx.fillStyle = colors[index];
        ctx.fillRect(index * (barWidth * 2), canvas.height - barHeight, barWidth, barHeight);
        // Label
        ctx.fillStyle = '#000';
        ctx.font = '14px Arial';
        ctx.fillText(labels[index], index * (barWidth * 2), canvas.height - 5);
        ctx.fillText(value, index * (barWidth * 2) + barWidth / 4, canvas.height - barHeight - 10);
    });
}