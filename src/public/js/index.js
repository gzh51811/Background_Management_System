document.addEventListener("DOMContentLoaded", function() {

    // console.log(typeof oneArr[0])


    //点击单选
    $(".layui-body").on("click", function(e) {
        var e = event || window.event;
        if ($(e.target).hasClass("one")) {

            if ($(e.target).parent().hasClass("layui-form-checked")) {

                $(e.target).parent().removeClass("layui-form-checked")
            } else {

                $(e.target).parent().addClass("layui-form-checked")
            }

            if (ifAllcheck()) {

                $(".all").parent().addClass("layui-form-checked")
            } else {
                $(".all").parent().removeClass("layui-form-checked")

            }

        }
    })

    //点击全选
    $(".layui-body").on("click", $(".all"), function(e) {
        var e = event || window.event;
        if ($(e.target).hasClass("all")) {

            if ($(e.target).parent().hasClass("layui-form-checked")) {

                $(e.target).parent().removeClass("layui-form-checked")
                ifcheck(false)
            } else {

                $(e.target).parent().addClass("layui-form-checked")
                ifcheck(true)

            }
        }
    })


    //封装判断是否所有单选都被勾上
    function ifAllcheck() {
        var oneArr = [...document.querySelectorAll(".one")];
        for (var a = 0; a < oneArr.length; a++) {
            // console.log([...oneArr[a].parentElement.classList].includes("layui-form-checked"))
            if ([...oneArr[a].parentElement.classList].includes("layui-form-checked") == false) {
                return false
            }
        }
        return true
    }

    //封装点击全选时改变所有单选的状态
    function ifcheck(boolean) {
        var oneArr = [...document.querySelectorAll(".one")]
            // console.log()
        for (var a = 0; a < oneArr.length; a++) {
            // $(oneArr[a].parentElement).addClass("layui-form-checked")
            if (boolean) {
                $(oneArr[a].parentElement).addClass("layui-form-checked")
                    //console.log(oneArr[a].paremtElement) //.addClass("layui-form-checked")
                    //console.log(111)
            } else {
                $(oneArr[a].parentElement).removeClass("layui-form-checked")
            }
        }

    }

    //头部提功能
    $(".top").on("click", function(e) {
        var e = event || window.event;

        // 点击添加
        if ($(e.target).hasClass("addAll")) {
            console.log($(e.target))
        }

        //点击删除所有
        if ($(e.target).hasClass("deteleAll")) {
            console.log($(e.target))
        }

        //点击搜索
        if ($(e.target).hasClass("search")) {
            console.log($(e.target))
        }

    })


    //封装数据渲染,传入数组
    function render(arr) {
        arr.map((item, index) => {
            return (
                `<tr>
                    <td>
                        <div class="layui-unselect layui-form-checkbox " lay-skin="primary">
                            <i class="layui-icon layui-icon-ok one"></i>
                        </div>
                    </td>
                    <td>${index}</td>
                    <td>${item.name}</td>
                    <td>${item.classify}</td>
                    <td>${item.price}</td>
                    <td>${item.sale}</td>
                    <td>${item.inventory}</td>
                    <td>${item.state}</td>
                    <td>${item.time}</td>
                    <td>
                        <button class="layui-btn layui-btn-sm">
                            <i class="layui-icon"></i>
                        </button>
                        <button class="layui-btn layui-btn-primary layui-btn-sm">
                                <i class="layui-icon"></i>
                        </button>
                        <button class="layui-btn layui-btn-sm">下架</button>
                    </td>
                </tr>`
            )
        }).join(",")
    }

    // //页面初始化
    function init() {
        $.ajax({
            type: "get",
            //url: `/api/list/page=${page}&qty=${qty}&sort=${sort}&desc=${desc}`,
            url: `/api/list?page=1&qty=10&sort=_id&desc=1`,
            function(data) {
                console.log(data)
            }
        });
    }
    init()
})