var num = document.querySelectorAll(".man span");
var hours = 0;
var minutes = 0;
var seconds = 0;
var newTimer = null;

function Go() {
    seconds ++;
    if (seconds >= 0 && seconds < 59) {
        // 如果秒数小于10，秒数写为0和当前秒数（01-09）
        if (seconds < 10) {
            num[2].innerHTML = '0' + seconds;
        } else {
            // 秒数大于10，秒数为当前值
            num[2].innerHTML = seconds;
        }
    } else {
        // 秒数超过59，重置为0，分钟++，秒数位置变成00
        seconds = 0;
        minutes++;
        num[2].innerHTML = "00";
    }

    if (seconds > 59) {
        // 如果秒数大于59，且分钟小于10，补0，分钟大于10，显示
        if (minutes < 10) {
            num[1].innerHTML = '0' + minutes + ': ';
        } else {
            num[1].innerHTML = minutes + ': ';
        }
        // 秒数大于59，分钟++ 显示分钟数
        minutes++;
        num[1].innerHTML = minutes + ': ';
        // 如果秒数小于59，显示00分钟
        // 分钟变成0，小时++
    } else {
        num[1].innerHTML = '00' + ': ';
        minutes = 0;
        hours++;
    }

    // 如果，分钟数大于59，进入外层条件
    if (minutes > 59) {
        // 如果小时小于10，小时处的内容为补0 + 小时数
        if (hours < 10) {
            num[0].innerHTML = '0' + hours + ': ';
        } else {
            num[0].innerHTML = hours + ': ';
        }
    }
}

