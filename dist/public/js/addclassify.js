document.addEventListener("DOMContentLoaded", () => {
    //点击上下架
    let href = location.search.slice(1);
    if (href) {
        let arr = href.split("=");
        // console.log(arr)
        $.ajax({
            type: "get",
            url: "/api/classifyList/one",
            data: `${arr[0]}=${arr[1]}`,
            success: function(data) {
                $(".shopInput").val(data.data.classify).attr("data-id", data.data._id)
                $("textarea").val(data.data.classify)
                    // $(".classifyInput").val(data.data.classify)
                    // $(".stateInput").attr("lay-text", data.data.state)
                    // console.log(data.data.title)
                $(".yes_btn").on("click", () => {
                    //console.log($(".shangjia").html())
                    $.ajax({
                        type: "get",
                        url: "/api/classifyList/update",
                        data: `_id=${$(".shopInput").attr("data-id")}&classify=${$(".shopInput").val()}`,
                        success: function(data) {
                            if (data.code == 1) {
                                alert("更新成功")
                                location.href = `../html/classify.html`
                            } else {
                                alert("更新失败")
                            }
                        }
                    })
                })
            }
        })
    } else {
        $(".yes_btn").on("click", () => {
            //console.log($(".shangjia").html())
            $.ajax({
                type: "get",
                url: "/api/classifyList/insert",
                data: `classify=${$(".shopInput").val()}`,
                success: function(data) {
                    // console.log(data)
                    if (data.code == 1) {
                        alert("添加成功")
                        location.href = `../html/classify.html`
                    } else {
                        alert("添加失败")
                    }
                }
            })
        })
    }
})