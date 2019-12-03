// 入口函数
$(function() {
    /*1.页面一加载 : ajax请求用户详情 */
    $.ajax({
        url: BigNew.user_detail,
        type:'get',
        dataType:'json',
        // data:{
        //     username: username,
        //     password: password,
        //     nickname: nickname,
        //     email: email,
        //     userPic: userPic
        // },
        success: function(backData){
            console.log(backData);
            $('.user_pic').attr('src',backData.data.userPic);
            // 数据相应之后渲染页面
            for(var key in backData.data) {
            $('.' + key).val(backData.data[key]);
            // $('.nickname').val(backData.data.nickname);
            // $('.email').val(backData.data.email);
            // $('.password').val(backData.data.password);
            }

        }
    });
    /*2. 文件预览 */

    /*3. 修改按钮点击 : 文件上传 */







})