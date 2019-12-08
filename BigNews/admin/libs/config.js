//闭包实现沙箱模式
(function (w) {
    //jq入口函数：DOM树加载完毕
    //将jedate与wangEditor两个插件的配置写到这个文件中。 
    //如果其他文件需要使用插件，直接导入这个文件即可
    $(function () {

        var E = window.wangEditor;//创建构造函数
        var editor = new E('#editor')//创建编辑器
        editor.create();

        //将editor变成全局变量
        w.editor = editor;

        jeDate("#testico", {
            theme: { bgcolor: "#C81623", pnColor: "#FF6653" },
            format: "YYYY-MM-DD",
            isinitVal: true,
            festival: true, 
            zIndex:10002,//设置弹出层的层级
        });
    });
})(window);