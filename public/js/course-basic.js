define(["jquery","template","util","ckeditor","form"], function ($, template, util,CKEDITOR) {
    util.setMenu("/course/add");
    //获取课程id
    var csId = util.searchStr("cs_id");
    //flag
    var flag = util.searchStr("flag");

    $.ajax({
        type: "get",
        url: "/api/course/basic",
        data: {cs_id:csId},
        dataType: "json",
        success: function (data) {
            //console.log(data);
            if(flag) {
                data.result.operate="课程编辑";
            }else{
                data.result.operate="课程添加";
            }

            var html = template("basicTpl",data.result);
            $("#basicInfo").html(html);

            //课程下拉联动
            $("#firstType").on("change", function () {
                var pId = $(this).val();
                $.ajax({
                    type: "get",
                    url: "/api/category/child",
                    data: {cg_id:pId},
                    dataType: "json",
                    success: function (data) {
                        console.log(data);
                        var tpl = '<option value="">请选择二级分类...</option>' +
                            '{{each list}}' +
                                '<option value="{{$value.cg_id}}">{{$value.cg_name}}</option>' +
                            '{{/each}}';
                        var html = template.render(tpl,{list : data.result});
                        $("#secType").html(html);
                    }
                });
            })

            //处理富文本
            CKEDITOR.replace("editor",{
                toolbarGroups : [
                    { name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
                    { name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] }
                ]
            });

            //点击保存按钮跳转页面
            $("#btn").on("click", function () {
                $("#courseForm").ajaxSubmit({
                    type: "post",
                    url: "/api/course/update/basic",
                    data: {cs_id:csId},
                    dataType: "json",
                    success: function (data) {
                        console.log(data);
                        if(data.code == 200) {
                            location.href = "/course/picture?cs_id="+data.result.cs_id;
                        }
                    }
                })
            })
        }
    });
});