(function () {
  window.onload = function () { 
    if (localStorage.getItem("id") == 0) { 
      var $user = localStorage.getItem("userName");
      var $str = `
          <a href="login.html"><img src="./img/images/bilicard.jpg" alt="">&nbsp;&nbsp;${$user}</a>
          &nbsp;&nbsp;<a href="#" class="l-aresg">退出</a>
      `
      $('.l-loginimg').html($str);
    }


    if($('.l-aresg').html() == '退出'){
      $('.l-aresg').click(function () {  
        var $str1 = `
        <a href="login.html"><img src="img/beforelogin.jpg" alt="">&nbsp;&nbsp;登录</a>
        &nbsp;&nbsp;<a href="signin.html" class="l-aresg">注册</a>
        `
        $('.l-aresg').html($str1);
        localStorage.setItem('id','1');
        localStorage.removeItem('userName');
        window.location.reload();
      })
    }
  }


  //楼梯效果
  var mark = 1;
  var TIMER = null;
  $("#LoutiNav ul li").not(".y-toggle,.y-goTop").click(function () {
    mark = 2; //改变标记
    $("#LoutiNav ul li").removeClass("active");
    $(this).addClass("active");
    //点击左边导航 然后跳到指定的楼层
    var $index = $(this).index(); //找到了对应的序列号
    //alert($index);
    var $top = $("#main .Louti").eq($index).offset().top; //获取制定Louti与浏览器上面的距离
    //alert($top);
    $("body,html").stop(true, false).animate({
      scrollTop: $top
    }, 500, function () {
      mark = 1;
    }); //浏览器滚动的高度
  });
  //浏览器串口滚动事件 吸顶
  $(window).scroll(function () {
    if (mark == 1) {
      var $t = $(this).scrollTop(); //获取滚动条滚动的高度
      clearTimeout(TIMER);
      if ($(document).scrollTop() > 0) {
        TIMER = setTimeout(function () {
          $("#LoutiNav ul").addClass("xd");
          // console.log($(document).scrollTop());
        }, 100);
      } else {
        TIMER = setTimeout(function () {
          $("#LoutiNav ul").removeClass("xd");
        }, 100);
      }
      var $obj = $("#main .Louti");
      //循环每一个Louti 然后找到最先满足条件的那个 Louti
      $obj.each(function () {
        var $index = $(this).index();
        // console.log($index);
        //楼层与浏览器上面的高度
        var $height = $obj.eq($index).offset().top + $(this).height() / 2;
        // console.log($height);
        //document.title = $t + "--" + $height;
        if ($t < $height) {
          $("#LoutiNav ul li").removeClass("active")
          $("#LoutiNav ul li").eq($index).addClass("active");
          return false;
        }
      });
    }
  });

  $("#LoutiNav ul li.y-goTop").click(function () {
    $("body,html").stop(true, false).animate({
      scrollTop: 0
    }, 1000, function () {
      mark = 1;
    });
  });
  //楼梯效果结束

  var $pic = $(".y-list-box .live-card .y-pic");
  $pic.find(".liveFace").mouseenter(function () {
    $(this).next().next().css("display", "block");
  });
  $pic.find(".liveFace").mouseleave(function () {
    $(this).next().next().css("display", "none");
  });



  // 轮播图
  var mySwiper = new Swiper('.swiper-container', {
    loop: true, // 循环模式选项
    autoplay: true,//可选选项，自动滑动
    // 如果需要分页器
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      bulletClass: 'my-bullet',
      // type:'fraction', //分式类型
      bulletActiveClass: 'my-bullet-active',
    },
  })

  //选项卡功能
  $('.live-tabs .tab-switch .tab-switch-item').click(function () {
    $(this).addClass('on').siblings().removeClass('on');
    $('.live-tabs .tabQ').children('div').eq($(this).index()).addClass('show').siblings().removeClass('show');
    console.log($('.live-tabs .tabQ').children('div'));
  });
  $('.rank-header .tab-switch .tab-switch-item').click(function () {
    $(this).addClass('on').siblings().removeClass('on');
    $('.cartoon-rankBox').children('div').children('div').eq($(this).index()).addClass('show').siblings().removeClass('show');
  });


  // 视频预览功能
  $("body").on('mouseenter',".y-public-pic",function () {
    console.log($(this));
    
    $(this).children("#wjh").css("display","block");
    $(".y-public-pic #wjh").mousemove(function (e) { 
      // values: e.clientX, e.clientY, e.pageX, e.pageY
      
      if (e.target.className == "videoShow") {
        
        // 图片大小 除以 多少份 得到每一份多大

        var total = e.target.attributes[1].nodeValue;


        //每份宽度

        var item_width = 160 / total;

        //要调用第几张图片 鼠标位置 除以 每份宽度

        var num = Math.ceil(e.offsetX / item_width);

        //第几张图片 除以 10

        var x = num - 1 % 10;

        var y = Math.ceil(num / 10) - 1;

        // console.log(x + ":" + y);

        //修改背景图

        e.target.style.backgroundPosition = "-" + x * 160 + "px -" + y * 90 + "px";

      }
    })  
  });
  $("body").on('mouseleave','.y-public-pic',function () {
    $(this).children("#wjh").css("display","none");

  })


}())

