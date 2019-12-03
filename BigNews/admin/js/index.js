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
        url:BigNew.user_info
        ,
        type:'get',
        dataType:'json',
        success: function(backData){
        console.log(backData);
        // 进入主页之后渲染个人信息
        $('.user_info>span').text('欢迎'+backData.data.nickname);
        // 将管理员的名字设置为系统请求回来的
        $('.user_info>img').attr('src',backData.data.userPic);
        // 将管理员头像设置为跟随系统请求回来的
        $('.user_center_link>img').attr('src',backData.data.userPic);
        // 将右上角的个人头像设置为系统返回参数
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
    /*
    02.退出登录*/
    $('.logout').click(function() {
        // 为退出登录按钮注册点击事件
        localStorage.removeItem('token');
        // 删除本地数据库内的token令牌
        window.location.href = './login.html';
        // 页面跳转回登录页面
    })

    // 03. 一级菜单点击事件
    $('.level01').click(function() {
        // 为当前被点击到的标签增加一个“active”标签名，而其他的标签是sibings（）进行排他，removeClass()方法移除没有被点击的"active"类名
        $(this).addClass('active').siblings().removeClass('active');
        // 判断当前点击的是否是那个有二级菜单的标签,使用index()方法找到当前被点击的标签
        if ($(this).index() == 1) {
            // slideToggle() : 在被选元素上进行 slideUp() 和 slideDown() 之间的切换。
            $('.level02').slideToggle();
            // 箭头旋转切换动画
            // 利用find()方法选中b标签,toggleClass方法检查目标中指定的类,
            // 存在就删除,不存在就添加
            $(this).find('b').toggleClass('rotate0');
            // 调用二级菜单中的点击事件,使用[0]将jquery转成js原生对象
            // 使用eq(0)的方法把焦点放在 a 标签上面
            $('.level02>li:eq(0) a')[0].click();
        }else {
            // 若点击的不是文章管理标签,则将文章管理的二级菜单高亮移除
            $('.level02>li').removeClass('active');
        }
    })

    // 04. 二级菜单点击事件
    $('.level02>li').click(function(){
    // 为当前被点击到的标签增加一个“active”标签名，而其他的sibings（）进行排他，removeClass()方法移除没有被"active"类名
    $(this).addClass('active').siblings().removeClass('active');
    })
})
