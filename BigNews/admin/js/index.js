$(function() {
    // 设置入口函数
    /*
    1.页面一加载 : ajax 发送请求
    token: 作用
    (1) 客户端发送登陆请求 : 用户名 + 密码
    (2) 服务器返回一个token (加密字符串)
    (3) 客户端登陆以后所有的请求都需要发送token给服务器(服务器就知道这个用户是谁)
    一般在请求头中添加
    */
    

    // 1.页面一加载 : ajax请求个人信息
    $.ajax({
        url:'http://localhost:8080/api/v1/admin/user/info',
        type:'get',
        dataType:'json',
        success: function(backData){
        console.log(backData);
        // 进入主页之后渲染个人信息
        $('.user_info>span').text('欢迎'+backData.data.nickname);
        $('.user_info>img').attr('src',backData.data.userPic);
        $('.user_center_link>img').attr('src',backData.data.userPic);
        }
// 通过在jquery底层设置全局变量的方式,进行对未登录直接跳转页面的拦截
        /*给所有的ajax设置全局变量
(1)给每一个ajax设置默认的请求头
*/
// $.ajaxSetup({
//     /* 所有的ajax在发送之前会执行*/
//     beforeSend:function(xhr){
//     // 设置默认请求头
//     xhr.setRequestHeader('Authorization',localStorage.getItem('token'));
//     },
//     // 所有的错误请求会执行这个函数
//     error:function(xhr,status,error){
//     if (error == 'Forbidden') {
//         alert('请先登录');
//         window.location.href = './login.html'
//     }
//     }
// })
    });
    // //(1).实例化ajax对象
    // var xhr = new XMLHttpRequest();
    // //(2).设置请求方法和地址
    // //get请求的数据直接添加在url的后面 格式是 url?key=value
    // xhr.open('get', 'http://localhost:8080/api/v1/admin/user/info');
    // // 设置请求头  : 将token发送给服务器
    // xhr.setRequestHeader('Authorization',localStorage.getItem('token'));
    // //(3).发送请求
    // xhr.send();
    // //(4).注册回调函数
    // xhr.onload = function() {
    //     console.log(xhr.responseText)
    // };
})
