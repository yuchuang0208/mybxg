define(["jquery","template","util","ckeditor"], function ($, template, util,CKEDITOR) {
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
        }
    });
});