$(function() {
    // 入口函数
    /*结题思路
    1.登陆按钮点击事件
    ***注意点  : 表单按钮需要阻止默认跳转行为
        1.1  非空判断
        1.2  获取用户名和密码
        1.3  ajax发送请求
        1.4  响应数据之后跳转首页
    */ 
    $('.input_sub').click(function(e) {
        e.preventDefault();
        // 阻止表单默认跳转行为
    // 1.1  非空判断
    if ($('.input_txt').val().trim().length == 0  || $('.input_pass').val().trim().length == 0) {
        // trim()  :  去除空格
        // alert('请输入用户名与密码');
        // 使用bootstrap的模态框
        // 修改模态框的文字
        $('.modal-body>p').text('请输入用户名和密码');
        // 调用bootstrap内的方法,显示模态框
        $('#myModal').modal();
        return;
        // 当程序执行到这里之后,代表错误,使用return将程序结束
    }
    // 1.2  获取用户名和密码
    // 1.3  ajax发送请求
    $.ajax({
        // 将项目基地址:http://localhost:8080/api/v1
        // 与请求地址：/admin/user/login 进行拼接,
        // 请求方式 : post
        // 请求参数 : username password
        url: BigNew.user_login,
        type:'post',
        dataType:'json',
        data:{
            // 向后台请求用户名及密码.判断正确性
            username: $('.input_txt').val(),
            password: $('.input_pass').val()
        },
        success: function(backData){
            // 将返回的结果打印出来
        console.log(backData);
        // 进行判断,验证用户输入的账号密码是不是对的
        if (backData.code == 200) {
            // 若后台返回的code值等于200,那么久代表验证通过,
                    // 使用bootstrap的模态框
            // 修改模态框的文字
            $('.modal-body>p').text('登陆成功');
            $('#myModal').modal();
            // 点击确认提示之后再进项跳转
            $('.modal-footer>button').click(function(){
                // 将服务器返回的token令牌存入 localstrage
                localStorage.setItem('token',backData.token);
                // 通过window.location.href进行跳转;
                window.location.href = './index.html';
            })
        }else{
            // 直接将后台返回的错误提示给用户
                    // 使用bootstrap的模态框
        // 修改模态框的文字
        $('.modal-body>p').text(backData.msg);
        $('#myModal').modal();
        }
        }
    });

    })
})