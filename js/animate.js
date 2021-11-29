// todo 缓动动画
// 封装缓动动画函数 形参为目标元素 目的距离 回调样式函数
var timer = null;
function animate(obj, target, callback) {
    //定时器节流阀
    clearInterval(obj.timer);

    //给传入的目标元素设置定时器
    obj.timer = setInterval(function () {

        //设置快慢-线性动画步长      步长公式： 步长=（目标距离-目标元素现在的位置）/10
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);

        //设置停止条件为 obj.offsetLeft = target
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);

            //如果在最后的位置有回调样式的函数 则执行
            // if(callback){
            //     callback();
            // }
            callback && callback();
        }

        obj.style.left = obj.offsetLeft + step +'px';
    }, 30)
}
