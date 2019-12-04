// 入口函数
$(function() {
    /*1.页面一加载 : ajax请求用户详情 */
    $.ajax({
        url: BigNew.user_detail,
        type:'get',
        dataType:'json',
        success: function(backData){
            console.log(backData);
            $('.user_pic').attr('src',backData.data.userPic);
            // 数据相应之后渲染页面
            for(var key in backData.data) {
            // 灵活方式: 通过遍历对象,使用字符串拼接的方式自动生成对应的参数
            $('.' + key).val(backData.data[key]);
            // 传统方式: 在参数多的情况下,逐条修改太过繁琐 
            // $('.nickname').val(backData.data.nickname);
            // $('.email').val(backData.data.email);
            // $('.password').val(backData.data.password);
            }
        }
    });
    /*2. 文件预览 */
    //1.给file表单元素注册onchange事件
    $('#exampleInputFile').change(function () {
        //1.2 获取用户选择的图片
        var file = this.files[0];
        //1.3 将文件转为src路径
        var url = URL.createObjectURL(file);
        //1.4 将url路径赋值给img标签的src
        $('.user_pic').attr('src', url);
    });

    /*3. 修改资料,按钮点击 : 文件上传 */
    $('.btn-edit').on('click',function(e){
        //禁用表单默认提交事件
        e.preventDefault();
        //创建FormData对象：参数是表单dom对象
        var fd = new FormData($('#form')[0])
        $.ajax({
            url: BigNew.user_edit,
            type:'post',
            dataType:'json',
            data:fd,
            contentType: false,
            processData: false,
            success: function(backData){
                // 修改之后弹窗通知用户修改成功
                alert('修改成功');
                // 修改成功之后刷新页面,
                /*注意点
                若是没有加parent,只会刷新修改个人中心修改页面,
                而个人中心是在主页上显示,所以要加上parent
                */
                window.parent.location.reload();
            }
        });
    });







})