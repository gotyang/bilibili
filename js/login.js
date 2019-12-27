(function () {  
  //登录
  $(".btn-login").click(function (e) { 
    // e.preventDefault();
    var $user = $(".username input").val();
    var $pass = $(".password input").val();
    if(!$user || !$pass){
      $('.tips').css("display","block");
      return;
    }
    $.ajax({
      type: "get",
      url: "http://10.36.135.32/test/login2.php",
      data: "act=login&"+"user="+$user+"&pass="+$pass,
      success: function (data) {
        var $err = JSON.parse(data);
        if($err.err==0){
          localStorage.setItem('id',$err.err);
          localStorage.setItem('userName',$user);
          window.location.assign('index.html');
        }else{
          localStorage.setItem('id',$err.err);
          localStorage.removeItem('userName');
          alert($err.msg);
        }
      }
    })
  });
  
  $(".username input").focus(function () {  
    $(".username .tips").css("display","none");

  })
  $(".username input").blur(function () {  
    if(!$(".username input").val()){
      $('.username .tips').css("display","block");
    }
  })
  $(".password input").blur(function () {  
    if(!$(".password input").val()){
      $('.password .tips').css("display","block");
    }
  })

  $(".password input").focus(function () {  
    $(".password .tips").css("display","none");

  })

}())