document.addEventListener("DOMContentLoaded", function() { 
    //page=1&qty=10&sort=_id&desc=1
    userShow()
    if (Cookie.getCookie("page")) {

    } else {
        Cookie.setCookie("page", 1)
        Cookie.setCookie("qty", 10)
        Cookie.setCookie("sort", "time")
        Cookie.setCookie("desc", 1)
        Cookie.setCookie("mohu", "")
    }
    ifValue();
    //点击排序
    $("thead").on("click", "img", e => {
        var e = event || window.event;
        if ($(e.target).hasClass("sheng")) {
            removePriceActive()
            $(e.target).prop("src", "../img/jiantou1.png")
            Cookie.setCookie("sort", $(e.target).parent().attr("data-type"))
            Cookie.setCookie("desc", 1)
            init()
                // console.log("已执行上")
        }
        if ($(e.target).hasClass("jiang")) {
            removePriceActive()
            $(e.target).prop("src", "../img/jiantou1.png")
            Cookie.setCookie("sort", $(e.target).parent().attr("data-type"))
            Cookie.setCookie("desc", "-1")
            init()
                // console.log("已执行下")
        }
    })

    //封装清除排序选项高亮
    function removePriceActive() {
        // console.log(111)

        for (var a = 0; a < $(".img_sort").length; a++) {
            // console.log(a)
            $(".img_sort").eq(a).prop("src", "../img/jiantou.png")
                // console.log($(".img_sort").eq(a))
        }
        // console.log($(".img_sort").length)
    }

    //封装刷新时保持排序图标高亮
    activeIcon()

    function activeIcon() {
        //Cookie.getCookie("sort")
        //Cookie.getCookie("desc")
        for (var a = 0; a < $("thead>tr>th").length; a++) {
            if ($("thead>tr>th").eq(a).attr("data-type") == Cookie.getCookie("sort")) {
                if (Cookie.getCookie("desc") == 1) {
                    $("thead>tr>th").eq(a).children().eq(0).prop("src", "../img/jiantou1.png");
                } else if (Cookie.getCookie("desc") == -1) {
                    $("thead>tr>th").eq(a).children().eq(1).prop("src", "../img/jiantou1.png");
                }
            }


        }
    }

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
            location.href = `../html/addgoods.html`
        }

        //点击删除所有
        if ($(e.target).hasClass("deteleAll")) {
            ifValue()
            let arr = getDeleteArr();
            let _id = JSON.stringify(arr)
                // console.log(_id)
            if (arr.length > 0) {
                if (confirm("是否删除所选商品信息")) {
                    $.ajax({
                        type: "get",
                        url: `/api/list/cancelMany`,
                        data: `_id=${_id}`,
                        success: (data) => {
                            if (data.code == 1) {
                                alert("删除成功")
                                $(".all").parent().removeClass("layui-form-checked");
                                init();
                            } else {
                                alert("删除失败")
                            }
                        }
                    })
                }
            } else {
                alert("请选择需要删除的数据");
            }
        }

        //点击搜索
        if ($(e.target).hasClass("search")) {
            if ($(".shopName").val().trim()) {
                Cookie.setCookie("mohu", "mohu")
                init()
                    // console.log(111)
            } else {
                alert("请输入商品名称");
            }
        }

    })

    //封装函数，判断搜索框是否有值
    function ifValue() {
        if ($(".shopName").val().trim()) {
            Cookie.setCookie("mohu", "mohu")
        } else {
            Cookie.setCookie("mohu", "")
        }

    }


    // 封装获取所有被勾选的行
    function getDeleteArr() {
        var arr = [];
        for (var a = 0; a < document.querySelectorAll("tbody>tr>td>div").length; a++) {

            if ($(document.querySelectorAll("tbody>tr>td>div")[a]).hasClass("layui-form-checked")) {

                arr.push($(document.querySelectorAll("tbody>tr>td>div")[a]).attr("data-id"))
            }
        }
        return arr
    }

    //$(e.target).parent().parent().attr("data-id")
    $("tbody").on("click", (e) => {
        var e = event || window.event;

        // 点击编辑
        if ($(e.target).hasClass("compile")) {
            location.href = `../html/addgoods.html?_id=${$(e.target).parent().parent().attr("data-id")}`
        }

        //点击删除
        if ($(e.target).hasClass("cancel")) {
            let _id = $(e.target).parent().parent().attr("data-id");
            if (confirm("是否删除该条商品信息")) {
                ifValue()
                $.ajax({
                    type: "get",
                    url: `/api/list/cancel`,
                    data: `_id=${_id}`,
                    success: (data) => {
                        if (data.code == 1) {
                            alert("删除成功")
                            init();
                        } else {
                            alert("删除失败")
                        }
                    }
                })
            }

        }

        //点击上下架
        if ($(e.target).hasClass("state")) {
            // console.log($(e.target).parent().parent().children().eq(7).html())
            $.ajax({
                type: "get",
                url: `/api/list/update`,
                data: `_id=${$(e.target).attr("data-id")}&state=${$(e.target).html()}`,
                success: (data) => {
                    if (data.code == 1) {
                        init();
                    } else {
                        alert("修改失败")
                    }
                }
            })
        }
    })

    //封装内容数据渲染,传入数组
    function render(arr) {
        return arr.map((item, index) => {
            return (
                `<tr data-id="${item._id}">
                    <td>
                        <div class="layui-unselect layui-form-checkbox " lay-skin="primary" data-id="${item._id}">
                            <i class="layui-icon layui-icon-ok one"></i>
                        </div>
                    </td>
                    <td>${index+1}</td>
                    <td>${item.name}</td>
                    <td>${item.classify}</td>
                    <td>${item.price}</td>
                    <td>${item.sale}</td>
                    <td>${item.inventory}</td>
                    <td class="realState">${item.state}</td>
                    <td>${item.time}</td>
                    <td data-id="${item._id}">
                        <button class="layui-btn layui-btn-sm">
                            <i class="layui-icon compile"></i>
                        </button>
                        <button class="layui-btn layui-btn-primary layui-btn-sm ">
                                <i class="layui-icon cancel"></i>
                        </button>
                        <button class="layui-btn layui-btn-sm state" data-id="${item._id}">${item.state=="上架"?"下架":"上架"}</button>
                    </td>
                </tr>`
            )
        }).join(",")
    }


    //封装页码数据渲染，传入num
    function creatPage(num) {
        var str = `<p>共${Cookie.getCookie("allLength")}条</p>
                    <button class="layui-btn layui-btn-sm layui-btn-primary pagePrve" style="border-left: 1px solid #ccc;">上一页</button>`;
        for (var a = 0; a < num; a++) {
            str += `<button class = "layui-btn layui-btn-sm layui-btn-primary pageNum"> ${a + 1}</button>`
        }
        str += `<button class="layui-btn layui-btn-sm layui-btn-primary pageNext">下一页</button>`;
        return str;
    }
    //封装页码高亮
    function activePage(num) {
        $(".page button").eq(num).removeClass("layui-btn-primary")
    }
    //
    // 封装清除页码高亮
    function removeactivePage() {
        for (var a = 1; a < $(".page button").length - 1; a++) {
            $(".page button").eq(a).addClass("layui-btn-primary")
                // console.log($(".page button").eq(a))
        }

    }
    // //页面初始化
    function init() {
        ifValue()
        var str = Cookie.getCookie("mohu") ? `page=${Cookie.getCookie("page")}&qty=${Cookie.getCookie("qty")}&sort=${Cookie.getCookie("sort")}&desc=${Cookie.getCookie("desc")}&mohu=${Cookie.getCookie("mohu")}&shopName=${$(".shopName").val()}&classify=${$("#fenlei").val()}` : `page=${Cookie.getCookie("page")}&qty=${Cookie.getCookie("qty")}&sort=${Cookie.getCookie("sort")}&desc=${Cookie.getCookie("desc")}&mohu=${Cookie.getCookie("mohu")}`
            // console.log(str)
        $.ajax({
            type: "get",
            //url: `/api/list/page=${page}&qty=${qty}&sort=${sort}&desc=${desc}`,
            url: `/api/list`,
            data: str,
            success: function(data) {
                // console.log(Math.ceil(data.allLength / data.currLength))
                // console.log($(".page"))
                $("#bit").val(Cookie.getCookie("qty"))
                $("tbody").html(render(data.data))
                Cookie.setCookie("allLength", data.allLength)
                $(".page").html(creatPage(Math.ceil(data.allLength / data.qty)))

                // console.log("getcookie", Cookie.getCookie("allLength"))
                if (Math.ceil(data.allLength / data.qty) < Cookie.getCookie("page") && (data.allLength / data.qty) != 0) {
                    Cookie.setCookie("page", Math.ceil(data.allLength / data.qty))
                    if (Math.ceil(data.allLength / data.qty) <= 0) {
                        Cookie.setCookie("page", 1)
                    }
                    init()
                }

                activePage(Cookie.getCookie("page"))

                //设置输入页码框的最大值
                $(".toPage input").prop("max", Math.ceil(data.allLength / data.qty))
                    //console.log(Math.ceil(data.allLength / data.qty))
                getDeleteArr()
            }
        });
    }
    init()


    //点击页码
    $(".page").on("click", "button", e => {
        //点击页码
        if ($(e.target).hasClass("pageNum")) {

            ifValue()
            removeactivePage()
                //console.log($(e.target).html())
            Cookie.setCookie("page", $(e.target).html())
            init()

        }
        //点击上一页
        if ($(e.target).hasClass("pagePrve")) {
            // console.log(222)
            ifValue()
            if (Cookie.getCookie("page") > 1) {

                Cookie.setCookie("page", Cookie.getCookie("page") - 1)
                init()
            }
        }
        //点击下一页
        if ($(e.target).hasClass("pageNext")) {
            ifValue()
            if (Cookie.getCookie("page") < $(".page").children().length - 2) {
                // console.log(Cookie.getCookie("page"))
                Cookie.setCookie("page", Cookie.getCookie("page") * 1 + 1)
                init()
            }
        }
    })

    //选择条数

    $("#bit").on("input", function() {
        Cookie.setCookie("qty", $(this).val())
        if (Math.ceil(Cookie.getCookie("allLength") / $(this).val()) < Cookie.getCookie("Page")) {
            Cookie.setCookie("page", Math.ceil(Cookie.getCookie("allLength") / $(this).val()))
        }
        init()
    })

    // 输入页数
    $(".toPage input").on("input", function() {

        if ($(this).val() * 1 > $(this).prop("max") * 1) {

            $(this).val($(this).prop("max"))

        } else if ($(this).val() < 1) {
            $(this).val(1)

        }

    })


    //点击确定
    $(".toPageBtn").on("click", () => {
        Cookie.setCookie("page", $(".toPage input").val())
        init()
    })


})