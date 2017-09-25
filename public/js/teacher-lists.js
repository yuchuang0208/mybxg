define(["jquery","template","util","bootstrap"], function ($,template,util) {

    //设置菜单栏高亮显示
    util.setMenu(location.pathname);
    //获取教师数据
    $.ajax({
        type: "get",
        url: "/api/teacher",
        dataType: "json",
        success: function (data) {
            //console.log(data);
            var html = template("teacherInfoTpl",{list:data.result});
            $("#teacherInfo").html(html);

            //教师启用和注销功能
            $(".zx-teacher").on("click", function () {
                var that = this;
                var td = $(this).closest("td");

                var tcId = td.attr("data-tcId");
                var status = td.attr("data-status");
                //console.log(tcId,status);
                $.ajax({
                    type: "post",
                    url: "/api/teacher/handle",
                    data:{tc_id:tcId,tc_status:status},
                    dataType: "json",
                    success: function (data) {
                        //console.log(data);
                        if(data.code == 200) {
                            td.attr("data-status",data.result.tc_status);
                            if(data.result.tc_status == 0) {
                                $(that).text("注销");
                            }else {
                                $(that).text("启用");
                            }
                        }
                    }
                });
            });

            //查看教师功能
            $(".teacherInfo").on("click", function () {
                var td = $(this).closest("td");
                var tcId = td.attr("data-tcId");
                $.ajax({
                    type: "get",
                    url: "/api/teacher/view",
                    data: {tc_id:tcId},
                    dataType: "json",
                    success: function (data) {
                        //console.log(data);
                        var html = template("modalTpl",data.result);
                        $("#modalInfo").html(html);
                        $("#teacherModal").modal();
                    }
                })
            })
        }
    });





});