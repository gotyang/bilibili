
    var test = (function () {
        let result;
        $.ajax({
            type: 'get',
            url: './b.json',
            dataType: 'json',
            async:false, 
            success: (response) => {
                result = response;
                
            }
        })
        return result;
    })();
    var jsonobj =test;
    
    console.log(jsonobj);


// input框事件
$(document).ready(function () {
    $('.l-head-top input').keyup(function (){
        $.ajax({
            type:'get',
            url:'http://suggestion.baidu.com/su?wd='+$('.l-head-top input').val(),
            dataType:'jsonp',
            jsonp:'cb',
            // jsonpCallback:'mycallback',
            success:function (json){
                // $('#list').empty();
                $('.searchword').html('');
                for (var i = 0; i < json.s.length; i++) {
                    $('.searchword').append(`<p>${json.s[i]}</p>`);
                }
                $('.searchword').css('display','block');
            }
        });
        
    if($('.l-head-top input').val()==''){
        $('.searchword').css('display','none');
    }
    });
    
});







//nav数字
$(document).ready(function () {
    // 渲染数字
    $.each(jsonobj.region_count,function(i,t){
        if(t>999){
            t=999+'+';
        }
        $($('.l-navlist li i')[i]).html(t);
    })
    


    //nav中间 所有li的鼠标事件
    
    $('.l-nav-mid .l-navlist li').hover(function(){
        $(this).children('p').css('display','block');

    },function(){
        $(this).children('p').css('display','none');
    });

    // nav右侧
    $('.l-navlivebox').hover(function(){
        $(this).children('p').css('display','block');

    },function(){
        $(this).children('p').css('display','none');
    });


});


    


// banner左侧轮播图


$(document).ready(function () {
    var mySwiper = new Swiper('.swiper-container', {
        // observer:true,
        autoplay: true,
        // direction: 'horizontal',
        // loop: true, // 循环模式选项
        initialSlide :0,    
        observer:true,  //修改swiper自己或子元素时，自动初始化swiper    
        observeParents:true,  //修改swiper的父元素时，自动初始化swiper
        onSlideChangeEnd: function(swiper){ 
        swiper.update();  //更新Swiper，这个方法包含了updateContainerSize，updateSlidesSize，updateProgress，updatePagination，updateClasses方法。也就是数据改变是重新初始化一次swiper；
        mySwiper.startAutoplay();  //重新开始自动切换；
        mySwiper.reLoop();  //重新对需要循环的slide个数进行计算，当你改变了slidesPerView参数时需要用到，需要自动轮播的时候必须要加上；
    },
        

        // 如果需要分页器
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            bulletActiveClass: 'my-bullet-active'
        }

    })

    //banner左侧轮播图动态渲染数据
    $.each(jsonobj.banner,function(index,item){
        var l_img='';
        l_img+=`<div class="swiper-slide"><img src="${item.img}"><p>${item.title}</p></div>`;
        $('.l-banner-left .swiper-wrapper').append(l_img);
    });

    
    
});




//banner右侧六宫格
$(document).ready(
    function () {
        var index = 0;
        $('.l-rightbox').eq(index).css('display', 'block');
        $('.l-prev').click(function () {
            index--;
            if (index < 0) {
                index = 2;
            }
            $('.l-rightbox').eq(index).css('display', 'block').siblings().css('display', 'none');
        });
        $('.l-next').click(function () {
            index++;
            if (index > 2) {
                index = 0;
            }
            $('.l-rightbox').eq(index).css('display', 'block').siblings().css('display', 'none');
        })



        //banner右侧六宫格渲染数据
        $.each(jsonobj.table,function(ind,itm){
            $.each(itm,function(l_ind,l_itm){
                var l_rightbox='';
                l_rightbox+=`<div class="l-infobox">
                <img src="${l_itm.img}" />
                <div class="l-info">
                <p>${l_itm.title}</p>
                <span><strong class="iconfont">&#xe665;</strong>${l_itm.up}</span>
                <i>${l_itm.play}</i>
                </div>
                </div>`;
                $($('.l-rightbox')[ind]).append(l_rightbox);
            });
        });


        $('.l-rightbox .l-infobox').on('mouseenter',function(){
            $(this).children('div').stop(true,false).animate({top:'0px'},300);
        }).on('mouseleave',function(){
            $(this).children('div').stop(true,false).animate({top:'68px'},300);
        });
    }
);


// extend推广渲染数据
$(document).ready(
    function () {
        // 右侧渲染数据
        $('.l-extend-right .l-extend-right-b a').append(`<img src="${jsonobj.extend.b.img}" alt="">`);
        

        // 左侧渲染数据
        $.each(jsonobj.extend.a,function(ext_i,ext_t){
            var extend_l='';

            extend_l+=`<div class="l-extend-leftbox">
            <a href="javascript:;"><img src="${ext_t.img}" alt=""></a>
            <p><a href="javascript:;">${ext_t.title}</a></p>
            <span><a><i class="iconfont">&#xe665;</i>&nbsp;${ext_t.up}</a></span>
        </div>`;
        
            $('.l-extend-leftbox-all').append(extend_l);
        })
    }
);




    $(document).ready(function(){
        // 封装渲染正在直播左侧数据
        function liveChange(arr) {
            $.each(arr,function(index,item){
                var publiccardhtml='';
                
                var onlinenum=item.online;
                if(onlinenum<10000){
                    onlinenum=item.online;
                }
                if(onlinenum>=10000){
                    
                    onlinenum=(item.online/10000).toFixed(1);
                    onlinenum=onlinenum+'万';
    
                }
                publiccardhtml+=`<div class="live-card">
                <a href="#">
                    <div class="y-pic">
                        <img class="liveFace" src="${item.pic}" alt="">
                        <p class="userNum"><i class="iconfont icon-yonghuguanli"></i>${onlinenum}</p>
                        <div class="y-mark">
                            <img src="${item.system_cover}">
                        </div>
                    </div>
                    <div class="y-up">
                        <img class="upFace"
                            src="${item.face}"
                            alt="">
                        <div class="up-text">
                            <p class="name">${item.uname}</p>
                            <p class="desc">${item.title}</p>
                            <p class="tag">${item.area_v2_parent_name}.${item.area_v2_name}</p>
                        </div>
                    </div>
                </a>
            </div>`;
            $('.y-live .y-list-box').append(publiccardhtml);
            });
        };
        // 进入页面加载执行函数
        liveChange(jsonobj.live.recommend);


        // 点击换一换
        $('.y-live .live-chose').click(function(){
            $('.y-live .y-list-box').html('');
            var l_livearr=jsonobj.live.recommend.reverse();
            
            liveChange(l_livearr);
        });

        // 渲染右侧排行数据
        $.each(jsonobj.live.ranking,function(index,item){
            var publiccardhtml='';
            
            var onlinenum=item.online;
            if(onlinenum<10000){
                onlinenum=item.online;
            }
            if(onlinenum>=10000){
                
                onlinenum=(item.online/10000).toFixed(1);
                onlinenum=onlinenum+'万';

            }
            publiccardhtml+=`<a href="https://live.bilibili.com/529" target="_blank" class="live-rank-item">
            <div class="rank-face"><span class="number">${index+1}</span><img
                    src="${item.face}"
                    alt="">
                <div class="txt">
                    <p>OldBa1</p>
                    <p class="p2">${item.title}</p>
                </div>
            </div>
            <div class="count"><i class="iconfont icon-yonghuguanli"></i>${onlinenum}</div>
        </a>`;
        if(index<=3){
            $('.y-live .liveP span').addClass('on');
        }
        $('.y-live .liveP').append(publiccardhtml);
        });




        // 右侧为你推荐渲染数据
        $.each(jsonobj.live.preview,function(index,item){
        var l_img='';
        l_img+=`<div class="swiper-slide"><img src="${item.img}"><p>${item.title}</p></div>`;
        $('.y-live-bannerBox .swiper-wrapper').append(l_img);
    });
    });





// 番剧
// 番剧左侧选项卡效果以及右侧渲染数据
$(document).ready(function(){
    // 将周一周二的数据截取合并为一条新数据,添加到原来的数据中,形成8天的数据
    var l_webArr=jsonobj.drama.slice(0,2);
    var l_datawebArr=l_webArr[0].episodes.concat(l_webArr[1].episodes);
    var l_datawebObj={'episodes':l_datawebArr};
    jsonobj.drama.unshift(l_datawebObj);


    // 封装用于遍历weblio数据的函数
    function eachWebArr(arr,dom){
        $.each(arr,function(index,item){
            var allhtml='';
            allhtml+=`<div class="l-cardbox">
                    <img src="${item.cover}" alt="">
                    <div class="l-cardbox-txt">
                        <span><a href="javascript:;">${item.title}</a></span>
                        <i><a href="javascript:;">${item.pub_index}</a></i>
                    </div>
                </div>`;
        $(dom).append(allhtml);
        });
    }

    // 进入页面默认显示最新这栏的数据
    eachWebArr(jsonobj.drama[0].episodes,'.Louti-fanju .l-webliobox');
    
    

    // 点击事件
    $('.l-weblio-l .l-tabs li').each(function (web_index,web_item){
        $(web_item).click(function (){
            // 点击后清空l-webliobox的内容
            $('.l-webliobox').html('');
            // t添加类名
            $(this).addClass('l-on').siblings().removeClass('l-on');
            //保存当前点击的元素的下标
            var l_webidx=$(this).index();
            //获取下标对应的数据遍历执行函数
            eachWebArr(jsonobj.drama[l_webidx].episodes,'.Louti-fanju .l-webliobox');
            
            
        })
    });


    // 渲染右侧数据
    var l_rankArr=[];
    // 获取排名前十的数据
    for(var wi=0,wlen=jsonobj.DramaList.list.length;wi<wlen;wi++){
        if(jsonobj.DramaList.list[wi].rank<=10){
            l_rankArr.push(jsonobj.DramaList.list[wi]);
        }
    }

    // 渲染数据
    $.each(l_rankArr,function(ri,rt){
        var l_rankhtml='';
        l_rankhtml+=`<div class="l-weblio-rbox">
        <span class="l-num">${rt.rank}</span>
        <a href="javascript:;" class="l-weblio-link">
            <span class="l-weblio-title">${rt.title}</span>
            <span class="l-weblio-update">${rt.new_ep.index_show}</span>
        </a>
    </div>`;
        if(rt.rank<=4){
            $('.Louti-fanju .l-weblio-rbox .l-num').attr('style','background-color: #00a1d6;color: white;');
        }
        $('.Louti-fanju .l-weblio-r-bottom').append(l_rankhtml);
    });
});








    // 动画
    $(document).ready(function(){
        // 渲染动画左侧数据

        // 在此封装渲染动画的函数
        function animationChange(arr) {
            $.each(arr,function(index,item){
                var publiccardhtml='';
                
                var onlinenum=item.attribute;
                
                if(onlinenum<10000){
                    onlinenum=item.attribute;
                }
                if(onlinenum>=10000){
                    
                    onlinenum=(item.attribute/10000).toFixed(1);
                    onlinenum=onlinenum+'万';
    
                }
                publiccardhtml+=`<div class="public-card">
                <a href="#">
                    <div class="y-public-pic">
                        <img class="liveFace" alt="" src="${item.pic}">
                        <p class="userNum"><i class="iconfont icon-yonghuguanli"></i>${onlinenum}</p>
                        <div id="wjh">
                            <div class="videoShow" data-num="11"
                                style="background:url(${jsonobj.Videopreview[index].img});">
                            </div>
                        </div>
                    </div>
                    <div class="y-up">
                        <div class="up-text">
                            <p class="name">
                            ${item.title}
                            </p>
                            <p class="tag"><i class="iconfont">&#xe665;</i>${item.owner.name}</p>
                        </div>
                    </div>
                </a>
            </div>`;
            $('.y-animation-Box .y-public-list-box').append(publiccardhtml);
            });
        };
        // 进入页面调用
        animationChange(jsonobj.animation.archives);
        // 点击换一换
        $('.y-animation-Box .public-chose').click(function(){
            $('.y-animation-Box .y-public-list-box').html('');
            var l_livearr=jsonobj.animation.archives.reverse();

            animationChange(l_livearr);
        });

    });






    // 番剧动态渲染数据
    $(document).ready(function(){
        // 封装渲染番剧动态数据的函数
        function fanjuChange(arr){
            $.each(arr,function(index,item){
                var publiccardhtml='';
                
                var onlinenum=item.attribute;
                
                if(onlinenum<10000){
                    onlinenum=item.attribute;
                }
                if(onlinenum>=10000){
                    
                    onlinenum=(item.attribute/10000).toFixed(1);
                    onlinenum=onlinenum+'万';
    
                }
                publiccardhtml+=`<div class="public-card">
                <a href="#">
                    <div class="y-public-pic">
                        <img class="liveFace" alt="" src="${item.pic}">
                        <p class="userNum"><i class="iconfont icon-yonghuguanli"></i>${onlinenum}</p>
                        <div id="wjh">
                            <div class="videoShow" data-num="11"
                                style="background:url(${jsonobj.Videopreview[index].img});">
                            </div>
                        </div>
                    </div>
                    <div class="y-up">
                        <div class="up-text">
                            <p class="name">
                            ${item.title}
                            </p>
                            <p class="tag"><i class="iconfont">&#xe665;</i>${item.owner.name}</p>
                        </div>
                    </div>
                </a>
            </div>`;
            $('.l-weblio-o .y-public-list-box').append(publiccardhtml);
            });
        }
        // 进入页面加载调用函数
        fanjuChange(jsonobj.animation.archives);
        // 点击换一换切换数据
        $('.Louti-fanju .l-weblio-o .public-chose').click(function(){
            $('.l-weblio-o .y-public-list-box').html('');
            var l_livearr=jsonobj.animation.archives.reverse();
            fanjuChange(l_livearr);
        });

        



        // 右侧为你推荐渲染数据
        $.each(jsonobj.live.preview,function(index,item){
            var l_img='';
            l_img+=`<div class="swiper-slide"><img src="${item.img}"><p>${item.title}</p></div>`;
            $('.l-weblio-o-r .swiper-wrapper').append(l_img);
        });
    });



    // 国创
// 国创左侧选项卡效果以及右侧渲染数据
$(document).ready(function(){
    // 将周一周二的数据截取合并为一条新数据,添加到原来的数据中,形成8天的数据
    var l_webArr=jsonobj.madeinchina.result.slice(0,2);
    var l_datawebArr=l_webArr[0].episodes.concat(l_webArr[1].episodes);
    var l_datawebObj={'episodes':l_datawebArr};
    jsonobj.madeinchina.result.unshift(l_datawebObj);


    // 封装用于遍历weblio数据的函数
    function eachWebArr(arr,dom){
        $.each(arr,function(index,item){
            var allhtml='';
            allhtml+=`<div class="l-cardbox">
                    <img src="${item.cover}" alt="">
                    <div class="l-cardbox-txt">
                        <span><a href="javascript:;">${item.title}</a></span>
                        <i><a href="javascript:;">${item.pub_index}</a></i>
                    </div>
                </div>`;
        $(dom).append(allhtml);
        });
    };

    // 进入页面默认显示最新这栏的数据
    eachWebArr(jsonobj.madeinchina.result[0].episodes,'.l-madeinchina .l-webliobox');
    
    

    // 点击事件
    $('.l-madeinchina .l-weblio-l .l-tabs li').each(function (web_index,web_item){
        $(web_item).click(function (){
            // 点击后清空l-webliobox的内容
            $('.l-madeinchina .l-webliobox').html('');
            // t添加类名
            $(this).addClass('l-on').siblings().removeClass('l-on');
            //保存当前点击的元素的下标
            var l_webidx=$(this).index();
            //获取下标对应的数据遍历执行函数
            eachWebArr(jsonobj.madeinchina.result[l_webidx].episodes,'.l-madeinchina .l-webliobox');
            
            
        })
    });


    // 渲染右侧数据
    var l_rankArr=[];
    // 获取排名前十的数据
    for(var wi=0,wlen=jsonobj.madeinchinaRank.result.list.length;wi<wlen;wi++){
        if(jsonobj.madeinchinaRank.result.list[wi].rank<=10){
            l_rankArr.push(jsonobj.madeinchinaRank.result.list[wi]);
        }
    }
    
    // 渲染数据
    $.each(l_rankArr,function(ri,rt){
        var l_rankhtml='';
        l_rankhtml+=`<div class="l-weblio-rbox">
        <span class="l-num">${rt.rank}</span>
        <a href="javascript:;" class="l-weblio-link">
            <span class="l-weblio-title">${rt.title}</span>
            <span class="l-weblio-update">${rt.new_ep.index_show}</span>
        </a>
    </div>`;
        if(rt.rank<=4){
            $('.l-madeinchina .l-weblio-rbox .l-num').attr('style','background-color: #00a1d6;color: white;');
        }
        $('.l-madeinchina .l-weblio-r-bottom').append(l_rankhtml);
    });


    // 右侧底部轮播图渲染数据
    $.each(jsonobj.madeinchinaBanner.result,function(index,item){
        var l_img='';
        l_img+=`<div class="swiper-slide"><img src="${item.img}"></div>`;
        $('.l-madeinchina .swiper-wrapper').append(l_img);
    });
});


// 漫画
// 漫画左侧选项卡效果以及右侧渲染数据
$(document).ready(function(){


    // 封装用于数据的函数
    function eachWebArr(arr,dom){
        $.each(arr,function(index,item){
            var allhtml='';
                allhtml+=`<a href="//manga.bilibili.com/detail/mc27355?from=bili_main_pop" target="_blank"
            class="manga-card"><img
                src="${item.vertical_cover}"
                alt="">
            <p title="${item.title}" class="manga-title">${item.title}</p>
            <p class="manga-tag">${item.styles[0]}&nbsp;${item.styles[1]}</p>
            </a>`;
            $(dom).append(allhtml);
            
        });
    }

    // 进入页面默认显示最新这栏的数据
    eachWebArr(jsonobj.carton[0],'.y-cartoon .manga-list-box');
    

    

    // 点击tab事件
    $('.y-cartoon .cartoon-box .tab-switch-item').each(function (web_index,web_item){
        $(web_item).click(function (){
            // 点击后清空l-webliobox的内容
            $('.y-cartoon .manga-list-box').html('');
            // t添加类名
            $(this).addClass('on').siblings().removeClass('on');
            //保存当前点击的元素的下标
            var l_webidx=$(this).index();
            //获取下标对应的数据遍历执行函数
            eachWebArr(jsonobj.carton[l_webidx],'.y-cartoon .manga-list-box');
            
            
        })
    });
});