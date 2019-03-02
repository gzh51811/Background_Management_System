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
    // layui.use('form', function () {
    //     var form = layui.form;

    //     //各种基于事件的操作，下面会有进一步介绍
    // });

    let $goods = $('#goods');
    console.log($goods)
    //上传文件按钮使用onchagne事件
    $goods.on('change', function () {
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

                $img.attr('src', e.target.result);
            };
            if (file) {
                fr.readAsDataURL(file);
            }
        }
    })

    //获取用户名
    var username = 'ann';
    let $nickname = $(".nickname");
    let $uname = $(".uname");
    let $confirmPw = $(".confirmPw");
    let $userpw = $(".userpw");
    let $tel = $(".tel");
    let $gander = $(".gander");
    let $shengri = $(".shengri");
    let $zhiye = $(".zhiye");
    let $city = $(".city");
    let $youxiang = $(".youxiang");
    let $beizhu = $(".beizhu");
    let $btn = $(".btn");
    // var $tips1 = $('.tips1');
    (async () => {
        var res = await userAjax({
            username
        });
        _id = res.data[0]._id;
        console.log(res.data[0])
        UserShow(res.data[0]);
        //确认按钮
        $btn.click(function(){
            // updateMsg() 
            uploadUser()
        })
    })()

    //渲染数据、
    function UserShow(res) {
        $goods.attr('src', `${res.photoUrl}`)
        $uname.html(res.nickname)
        $nickname.val(res.nickname);
        $userpw.val(res.upw);
        $confirmPw.val(res.upw);
        $shengri.val(res.birthday);
        $zhiye.val(res.job);
        $city.val(res.city);
        $youxiang.val(res.email);
        $beizhu.val(res.markdown);
        $tel.val(res.tel);
        $gander.find(`select option:contains(${res.gander})`).prop('selected', 'selected')
        //JavaScript代码区域
        layui.use('form', function () {
            var form = layui.form;
            //各种基于事件的操作，下面会有进一步介绍
        });
    }
    //update请求
    function updateMsg() {
        var data = {
            _id,
            nickname: $nickname.val(),
            upw: $userpw.val(),
            birthday: $shengri.val(),
            job: $zhiye.val(),
            city: $city.val(),
            email: $youxiang.val(),
            markdown: $beizhu.val(),
            tel: $tel.val(),
            gander: $gander.find(`.layui-anim dd`).filter('.layui-this').html(),
            photoUrl: $goods.attr('src')
        }
        //update请求
        $.post('../api/userList/update', data, function (res) {
            console.log(res)

        },'json')
    }
    //upload事件
    function uploadUser(){
        var data = new FormData();
        data.set('user',$goods[0].files[0])
        console.log(data.get('user'))
        // return new Promise(function(resolve, reject) {
        //     $.post('../api/userList/upload',data,function(res){
        // console.log(res)
                
        //     },'json')
        // })


        var xmlhttp = new XMLHttpRequest();
        //设置回调，当请求的状态发生变化时，就会被调用  
        xmlhttp.onreadystatechange = function () {
            //上传成功，返回的文件名，设置到父节点的背景中  
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                let data = xmlhttp.responseText;
                console.log(data)
                // resolve(data)
            }
        }
        //构造form数据 你可以用它传输文件流 它是基于form-data的传输方案
        // var data = new FormData();
        // 单图上传，默认选第一张，如果是多图的话，就要for循环遍历fileNode.files数组，并全部append到data里面传输
        // data.append("abc", fileNode.files[0])
        xmlhttp.open("post", "../api/userList/upload", true);
        //不要缓存  
        //xmlhttp.setRequestHeader("If-Modified-Since", "0");  
        //提交请求  
        xmlhttp.send(data);
        //清除掉，否则下一次选择同样的文件就进入不到onchange函数中了  
        $goods[0].value = null;
    }

})