define(["jquery"], function ($) {
    return {
        searchStr: function (key) {
            //获取url中指定的参数值
            var param = location.search.substr(1);
            var result = null;
            if(param) {
                var ps = param.split("&");
                $.each(ps, function (index, item) {
                    var kv = item.split("=");
                    if(kv[0]== key) {
                        result = kv[1];
                        return false;    //终止循环
                    }
                });
            }
            return result;
        },
        setMenu : function (path) {
            //设置菜单栏高亮显示
            $(".aside .navs a[href='"+path+"']").addClass("active").closest("ul").show();
        }
    }
});