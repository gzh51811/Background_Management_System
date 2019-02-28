jQuery(function ($) {
    //layui   JavaScript代码区域
    layui.use('element', function () {
        var element = layui.element;

    });
    layui.use('laydate', function () {
        var laydate = layui.laydate;

        //执行一个laydate实例
        laydate.render({
            elem: '#test1' //指定元素
        });
    });
    layui.use('form', function () {
        var form = layui.form;

        //各种基于事件的操作，下面会有进一步介绍
    });

    let $goods = $('#goods');
    console.log($goods)
    //上传文件按钮使用onchagne事件
    $goods.on('change',function () {
        console.log(this.files)
        //获取文件信息
        var file = this.files[0];
        //判断是否读取了文件
        if (window.FileReader) {
            var fr = new FileReader();
            console.log(fr);
            //获取预览图片元素
            var $img = $('#img');
            //文件加载完成后显示预览图片
            fr.onloadend = function (e) {

                $img.attr('src',e.target.result);
            };
            if(file){
                fr.readAsDataURL(file);
            }
            
            // portrait.style.display = 'block';
        }

    })


})