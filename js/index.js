// 轮播图实现
window.onload = function(){
    // 获取元素
    var btn_l = document.querySelector('#btn_l');
    var btn_r = document.querySelector('#btn_r');
    var div = document.querySelector('div');
    var showPic = document.querySelector('#showPic');
    var circlebtn = document.querySelector('#circlebtn');
    // 定义公有变量
    var divWidth = div.offsetWidth;
    // 鼠标经过，左右按钮显示
    div.addEventListener('mouseenter', function(){
        btn_l.style.display = 'block';
        btn_r.style.display = 'block';
        clearInterval(timer);
        timer = null;
    })
    div.addEventListener('mouseleave',function(){
        btn_l.style.display = 'none';
        btn_r.style.display = 'none';
        timer = setInterval(function(){
            btn_r.click();
        },5000)
    })
    // 动态生成下方圆圈按钮
    for(var i = 0; i<showPic.children.length; i++){
        var li_ = document.createElement('li');
        li_.setAttribute('index',i);
        circlebtn.appendChild(li_);
        // 圆圈按钮排他思想
        li_.addEventListener('click',function(){
            for(var i = 0; i<circlebtn.children.length; i++){
                circlebtn.children[i].className = '';
            }
            this.className = 'current';
            
            
            var index = this.getAttribute('index');
            num = index;
            circle = index;
            animate(showPic,-index*divWidth);
        })
    }
    circlebtn.children[0].className = 'current'; 
    // 克隆第一章
    var pic = showPic.children[0].cloneNode(true);
    showPic.appendChild(pic);

     // 圆圈排他思想
     function circleChange(){
        for(var i = 0; i<circlebtn.children.length; i++){
            circlebtn.children[i].className = '';
        }
        circlebtn.children[circle].className = 'current';
    }

    // 右侧按钮功能实现
    var num = 0;
    var circle = 0;
    // 节流阀
    var flag = true;
    btn_r.addEventListener('click',function(){
        if(flag){
            flag =false;
            if(num == showPic.children.length - 1){
                showPic.style.left = 0;
                num = 0;
            }
            num++;
            animate(showPic,-num*divWidth,function(){
                flag = true;
            });
            circle++;
            if(circle == circlebtn.children.length){
                circle = 0;
            }
            circleChange();
        }
    })

    //左侧按钮功能实现
    btn_l.addEventListener('click',function(){
        if(flag){
            flag = false;
            if(num == 0){
                num = showPic.children.length - 1;
                showPic.style.left = -num*divWidth + 'px';     
            }
            num--;
            animate(showPic,-num*divWidth,function(){
                flag = true;
            });
            circle--;
            circle = circle<0?circlebtn.children.length-1:circle;
            circleChange();
        }
    })
   
    // 自动播放功能
    var timer = setInterval(function(){
        btn_r.click();
    },5000)
}
