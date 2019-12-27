$(function () {
  $(".form-group .el-input_inner").focus(function () {
    // console.log($(this).parent().next());
    $(this).parent().next().css("display", "none");

  })
  $(".form-group .el-input_inner").blur(function () {
    if (!$(this).val()) {
      $(this).parent().next().css("display", "block");
    }
  })

  $(".check-box input").change(function () {
    var $check = $(".check-box input").attr('checked');
    console.log($check)
    if ($check == "checked") {
      $(".form-group .el-button").removeAttr("disabled");
      $(".form-group .el-button").addClass('el-button--primary');
      $(".form-group .el-button").bind('click',function () {  

        var $user = $(".form-group input[type='text']").val();
        var $pass = $(".form-group input[type='password']").val();
        if (!$user || !$pass) {
          $(".error-message").css("display","block");
          return;
        }
        $.ajax({
          type: "get",
          url: "http://10.36.135.32/test/login2.php",
          data: "act=add&" + "user=" + $user + "&pass=" + $pass,
          success: function (data) {
            var $err = JSON.parse(data);
            if ($err.err == 0) {
              window.location.assign('login.html');
            } else {
              $(".usermesg").css("display","block");
              $(".usermesg").html('昵称被占用');
            }
          }
        })

      })
    } else {
      $(".form-group .el-button").attr("disabled");
      $(".form-group .el-button").removeClass('el-button--primary');
      $(".form-group .el-button").unbind('click',function () {  })
    }

  })








})