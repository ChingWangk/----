let currentSlide = 0;
const totalSlides = 5;
const slidesWrapper = document.getElementById('slidesWrapper');
const currentPageSpan = document.getElementById('currentPage');
const indicators = document.querySelectorAll('.indicator');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// 更新导航状态
function updateNavigation() {
    currentPageSpan.textContent = currentSlide + 1;
    
    // 更新按钮状态
    prevBtn.disabled = currentSlide === 0;
    nextBtn.disabled = currentSlide === totalSlides - 1;
    
    // 更新指示器
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
}

// 切换到指定幻灯片
function goToSlide(slideIndex) {
    if (slideIndex >= 0 && slideIndex < totalSlides) {
        currentSlide = slideIndex;
        const translateX = -slideIndex * 20; // 每页占20%宽度
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
    
    // 数字动画（仅在数据页面）
    if (currentSlide === 2) {
        setTimeout(() => {
            animateNumbers();
        }, 300);
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