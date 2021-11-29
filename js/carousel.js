window.onload = function () {

    var div_ = document.querySelector('div');
    var showPic = document.querySelector('#showPic');
    var circlebtn = document.querySelector('#circlebtn');
    var btn_l = document.querySelector('#btn_l');
    var btn_r = document.querySelector('#btn_r');

    var divWidth = div_.offsetWidth;

    div_.addEventListener('mouseenter', function () {
        btn_l.style.display = 'block';
        btn_r.style.display = 'block';
        // todo 鼠标悬浮时默认播放暂停
        clearInterval(timer);
        timer == null;
    })

    div_.addEventListener('mouseleave', function () {
        btn_l.style.display = 'none';
        btn_r.style.display = 'none';
        // todo 鼠标悬浮时默认播放暂停
        timer = setInterval(function () {
            btn_r.click();
        }, 2000)
    })

    // 遍历showPic 得到showPic一共有多少个li
    for (var i = 0; i < showPic.children.length; i++) {
        var li_ = document.createElement('li');
        circlebtn.appendChild(li_);
        li_.setAttribute('index', i);

        //todo 小圆圈的点击事件
        li_.addEventListener('click', function () {

            circle = this.getAttribute('index');
            circleChange();

            var index = this.getAttribute('index');
            // console.log(index);
            animate(showPic, -index * divWidth);
        })
    }
    circlebtn.children[0].className = 'current';

    //todo小圆圈的排他思想封装
    function circleChange() {
        for (var j = 0; j < circlebtn.children.length; j++) {
            circlebtn.children[j].className = '';
        }

        circlebtn.children[circle].className = 'current';
    }

    //克隆第一张图片添加在最后一张
    var pic = showPic.children[0].cloneNode(true);
    showPic.appendChild(pic);
    // console.log(pic);

    var num = 0;
    var circle = 0;
    var flag = true;
    //todo下一张的点击事件
    btn_r.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num == showPic.children.length - 1) {
                showPic.style.left = 0;
                num = 0;
            }
            num++;
            animate(showPic, -num * divWidth, function () {
                flag = true;
            });

            circle++;
            if (circle == circlebtn.children.length) {
                circle = 0;
            }
            circleChange();
            }


        })

    //todo上一张的点击事件
    btn_l.addEventListener('click', function () {
        if (flag) {
            flag = false;
            num--;
            console.log(num);
            if (num < 0) {
                num = showPic.children.length - 2;
                console.log(num);
                showPic.style.left = - num * divWidth + 'px';
            }

            animate(showPic, -num * divWidth, function () {
                flag = true;
            });

            circle--;
            if (circle < 0) {
                circle = circlebtn.children.length - 1;
            }
            circleChange();

        }
    })

    //自动播放
    var timer = setInterval(function () {
        btn_r.click();
    }, 3000)
}