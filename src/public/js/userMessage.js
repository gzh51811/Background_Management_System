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

    var $img = $('#img');

    let $goods = $('#goods');
    console.log($goods)
    //上传文件按钮使用onchagne事件
    $goods.on('change', function () {
        console.log(this.files, this.value)
        //获取文件信息
        var file = this.files[0];
        //判断是否读取了文件
        if (window.FileReader) {
            var fr = new FileReader();
            console.log(fr);
            //获取预览图片元素
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
    let $userHead = $(".userHead");
    /** -----------------------------首次进入页面渲染信息-------------------------*/
    (async () => {
        var res = await userAjax({
            username
        });
        _id = res.data[0]._id;
        console.log(res.data[0])
        UserShow(res.data[0]);
        /**
         * @确认按钮事件
         * 1.根据file有无值，判断是否有修改头像
         * 2.有修改头像，
         *   2.1上传图片、
         *   2.2更新用户信息
         *   2.3重新渲染信息
         * 3.没有修改头像
         *   3.1更新用户信息
         *   3.2重新渲染
         */
        $btn.click(function () {
            let _goods = $goods[0].value
            if (_goods) {
                (async () => {
                    let res = await uploadUser();
                    await updateMsg({
                        photoUrl: `http://localhost:1811/${res.file.filename}`
                    })
                    let aaa = await userAjax({
                        username
                    })
                    UserShow(aaa.data[0]);
                })()
            } else {
                (async () => {
                    await updateMsg()
                    let aaa = await userAjax({
                        username
                    })
                    UserShow(aaa.data[0]);
                })()
            }
        })
    })()
    /**-----------------------方法封装---------------------------------- */
    
    /**
     * @渲染数据
     * 1.获取用户信息
     * 2.根据信息渲染
     */
    function UserShow(res) {
        $userHead.attr('src', `${res.photoUrl}`);
        $img.attr('src', `${res.photoUrl}`);
        $uname.html(res.nickname);
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
    /**
     * @update请求
     * 1.防止回调地狱用promise
     * 2.获取对应信息的值
     * 3.因为不一定修改头像，头像的url作为参数，用object.assign合并对象
     * 4.把合并后的值作为参数请求update
     */
    function updateMsg(obj) {
        return new Promise((resolve, reject) => {
            var defaults = {
                _id,
                nickname: $nickname.val(),
                upw: $userpw.val(),
                birthday: $shengri.val(),
                job: $zhiye.val(),
                city: $city.val(),
                email: $youxiang.val(),
                markdown: $beizhu.val(),
                tel: $tel.val(),
                gander: $gander.find(`.layui-anim dd`).filter('.layui-this').html()
            }
            console.log(defaults)
            var data = Object.assign({}, defaults, obj);
            //update请求
            $.post('../api/userList/update', data, function (res) {

                resolve(res)


            }, 'json')
        })
    }

    /**
     * @upload事件
     * 1.防止回调地狱用promise
     * 2.用FormData方法，传输文件流 
     * 3.单文件上传用set()方法
     * 4.把data值作为参数请求upload
     */
    function uploadUser() {
        return new Promise((resolve, reject) => {
            var data = new FormData();
            data.set('user', $goods[0].files[0])
            console.log(data.get('user'))
            $.ajax({
                url: "../api/userList/upload",
                type: "post",
                data,
                contentType: false, //使用multer配合ajax时无需配置multipart/form-data，multer将自动配置，手动配置将报错，boundary not found
                processData: false,
                success: function (res) {
                    resolve(res)
                },
                error: function (err) {
                    console.log(err);
                }
            });
            $goods.val = null;
        })
    }
})