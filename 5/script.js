// 缓动函数
function easeOutQuart(progress) {
    return 1 - Math.pow(1 - progress, 4);
}

// 数字动画函数
function animateNumber(element, start, target, duration = 1000, isDecimal = false, isPercentage = false) {
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = easeOutQuart(progress);
        const current = start + (target - start) * easeProgress;
        
        let displayValue;
        if (isDecimal) {
            displayValue = current.toFixed(2);
        } else {
            displayValue = Math.floor(current);
        }
        
        if (isPercentage) {
            displayValue += '%';
        }
        
        element.textContent = displayValue;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 这里可以添加初始化代码
    // 例如：animateNumber(element, 0, 97.88, 1000, true, true);
});
