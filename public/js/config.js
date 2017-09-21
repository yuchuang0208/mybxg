
//ÅäÖÃÎÄ¼ş
require.config({
    baseUrl: "/public/assets",
    paths: {
        jquery: "jquery/jquery",
        cookie: "jquery-cookie/jquery.cookie",
        template: "artTemplate/template-web",
        bootstrap: "bootstrap/js/bootstrap.min",
        util: "../js/util",
        common: "../js/common",
        login: "../js/login1",
        teacherList: "../js/teacher-lists",
        teacherAdd: "../js/teacher-add"

    },
    shim : {
        bootstrap : {
            deps : ['jquery']
        }
    }

});