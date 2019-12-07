$('#userForm').on('submit',function(){
    var formData = $(this).serialize();
    //向服务器发送添加用户的请求
    $.ajax({
        url:'/users',
        type: 'post',
        data: formData,
        success: function(){
            location.reload();
        },
        error: function(){
            alert('用户添加失败')
        }
    })
    //阻止表单默认的提交行为
    return false;
})


//处理头像上传功能
$('#avatar').on('change',function(){
    var formData = new FormData();
    formData.append('avatar',this.files[0])

    //开始发请求
    $.ajax({
        type: 'post',
        url: '/upload',
      
        data: formData,
        processData: false,
        contentType: false,
        success :function(resp){
            //1.让用户看到这张图
         console.log(resp);
         
          var url =resp[0].avatar;
          console.log(url)
          $('#preview').attr('src',url);

          //2.设置隐藏域
          $('#hiddenInput').val(url)
          
        }
    })
})

$.ajax({
	type: 'get',
	url: '/users',
	success: function (response) {
		console.log(response)
		// 使用模板引擎将数据和HTML字符串进行拼接
		var html = template('userTpl', { data: response });
		// 将拼接好的字符串显示在页面中
		$('#userBox').html(html);
	}
});
