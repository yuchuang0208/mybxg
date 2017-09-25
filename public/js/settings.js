define(["jquery","template","ckeditor","uploadify","region","datepicker","language"], function ($, template,CKEDITOR) {
    $.ajax({
        type: "get",
        url: "/api/teacher/profile",
        dataType: "json",
        success: function (data) {
            //console.log(data);
            var html = template("settingsTpl",data.result);
            $("#settingsInfo").html(html);

            //处理头像上传
            $("#upfile").uploadify({
                width: 120,
                height: 120,
                buttonText: "",
                itemTemplate: "<span></span>",
                swf: "/public/assets/uploadify/uploadify.swf",
                uploader: "/api/uploader/avatar",
                fileObjName: "tc_avatar",
                onUploadSuccess: function (a, b) {
                    console.log(b);
                    var obj = JSON.parse(b);
                    $(".preview img").attr("src",obj.result.path);
                }
            });

            //省市级联动
            $("#pcd").region({
                url: "/public/assets/jquery-region/region.json"
            });

            //处理富文本
            CKEDITOR.replace("editor",{
                toolbarGroups : [
                { name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
                { name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] }
            ]
            });

            gitModifyInfo();
        }
    });

    //点击保存按钮,封装方法
    function gitModifyInfo() {
        $("#btn-success").on("click", function () {
            $.ajax({
                type: "post",
                url: "/api/teacher/modify",
                data: $("#modifyInfo").serialize(),
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    location.reload();
                }
            });
        });
    };




});