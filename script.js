var container = document.querySelector(".container");
var pages = document.getElementsByClassName("page");
var currentPage = 0;

var isTurning = false; // 防止频繁触发翻页

// 监听触摸开始、滑动和结束事件
window.onload = function () {
    var body = document.getElementsByTagName("body")[0];
    body.addEventListener("touchstart", turnBegin, false);
    body.addEventListener("touchmove", turning, false);
    body.addEventListener("touchend", turnEnd, false);
}

var startY, endY; // 存储触摸开始和结束的位置

function turnBegin(event) {
    var touch = event.touches[0];
    startY = touch.pageY;
}

function turning(event) {
    event.preventDefault(); // 防止默认的滚动行为
    var touch = event.touches[0];
    endY = touch.pageY;
}

function turnEnd(event) {
    if (!isTurning) {
        if (startY - endY > 100) { // 上滑
            nextPage();
        } else if (endY - startY > 100) { // 下滑
            previousPage();
        }
        isTurning = true;
        setTimeout(function () {
            isTurning = false;
        }, 600); // 防止频繁触发翻页
    }
}

function nextPage() {
    if (currentPage < pages.length - 1) {
        currentPage++;
    } else {
        currentPage = 0; // 如果是最后一页，则跳回首页
    }
    updatePagePosition();
}

function previousPage() {
    if (currentPage > 0) {
        currentPage--;
    } else {
        currentPage = pages.length - 1; // 如果是第一页，则跳到最后一页
    }
    updatePagePosition();
}

function updatePagePosition() {
    // 更新容器的transform属性，移动到相应的页面
    container.style.transform = "translateY(-" + currentPage * 100 + "vh)";
}
