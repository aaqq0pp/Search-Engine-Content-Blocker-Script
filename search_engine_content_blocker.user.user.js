// ==UserScript==
// @name                搜索引擎关键字内容阻挡器
// @namespace      BlockAnyThingYouWant
// @match               http://www.baidu.com/*
// @match               https://www.baidu.com/*
// @match               https://m.baidu.com/*
// @match               https://s.quark.cn/*
// @match               https://www.google.com/*
// @match               /^https?\:\/\/encrypted.google.[^\/]+/
// @match               /^https?\:\/\/www.google.[^\/]+/
// @match               /^https?\:\/\/www.so.com/
// @match               /^https?\:\/\/www.youdao.com/
// @require             http://code.jquery.com/jquery-1.8.0.min.js
// @author              aaqq0pp
// @version             1.0.0.20240810
// @description         屏蔽搜索引擎结果中的自定义关键词
// @downloadURL         https://github.com/aaqq0pp/Search-Engine-Content-blocker-Script/blob/main/search_engine_content_blocker.user.user.js
// @updateURL           https://github.com/aaqq0pp/Search-Engine-Content-blocker-Script/blob/main/search_engine_content_blocker.user.user.js
// ==/UserScript==

// 黑名单关键词列表，以 "||" 分隔每个关键词
var BlackList = "找小姐||百度软件||百度浏览||百度卫士||百家号||百度游戏中心||下载之家||华军软件园||极速纯净下载||天极下载||ZOL软件下载||绿色下载站||PP助手||百度手机助手||2265安卓网||多多软件站||网赚||婚恋交友||賭場||赌场||百家乐||百家樂||金沙娱乐||澳门金沙||威尼斯人||永利澳门||澳门娱乐||送彩金||橡果国际||葡京||人娱乐||返利||算命||同城交友||成人网||2345||hao123||真人欢乐捕鱼||娱乐博彩||视点网||东方娱乐||经典语录||人人彩票||彩票网||棋牌||加盟||线上娱乐||时时彩||分分彩||五分彩||网上娱乐||注册平台||博彩||人人贷||澳门赌||老虎机||大乐透||娱乐城||七星彩||快三||新加坡双赢||幸运28||亿发娱乐";
// 将黑名单字符串分割成数组
var x = BlackList.split("||");

// 创建一个新的MutationObserver实例来监听DOM变化
var mo = new MutationObserver(function(allmutations) {
    // 获取当前页面的URL
    var href = window.location.href;

    // 根据不同的搜索引擎，选择不同的类名来遍历搜索结果
    if(href.indexOf("baidu.com") > -1){
        //移除热搜、资讯和推荐
        $(".s-news-rank-content").remove();
        $(".hot-news-wrapper").remove();
        $(".c-wrapper").remove();
        $(".cr-offset").remove();
        // 遍历百度搜索结果
        $(".c-container").each(deal);
    }

    else if(href.indexOf("google.com") > -1){
        // 遍历谷歌搜索结果
        $(".g").each(deal);
    }

    else if(href.indexOf("so.com") > -1){
        // 遍历360搜索结果
        $(".res-list").each(deal);
        $(".spread ").each(deal);
        $(".brand").each(deal);
    }

    else if(href.indexOf("bing.com") > -1){
        // 遍历必应搜索结果
        $(".b_algo").each(deal);
        $(".b_ans").each(deal);
    }

    else if(href.indexOf("youdao.com") > -1){
        // 遍历有道搜索结果
        $(".res-list").each(deal);
    }

    else if(href.indexOf("s.quark.cn") > -1){
        // 遍历夸克搜索结果
        $(".qk-card").each(deal);

        setTimeout(function() {
            // 延迟执行的代码
            console.log('页面加载完成后，这段代码被延迟执行了！');

            $(".com-cpc-card").html("Ad Removed");//夸克搜索去广告
            $(".cpc-card").html("Ad Removed");
        }, 300);
    }
});
// 开始监听document.body的子节点、字符数据以及子树的变化
mo.observe(document.body, {'childList': true, 'characterData': true, 'subtree': true});

// 处理每个搜索结果元素的函数
function deal(){
    // 获取当前元素的文本内容
    var curText = $(this).text();
    // 检查当前元素的文本是否包含黑名单中的关键词
    if(checkIndexof(curText)){
        // 如果包含，则移除当前元素
        //$(this).remove();
        $(this).html("Content Blocked");
    }
}

// 检查文本是否包含黑名单中的任意关键词
function checkIndexof(element){
    // 遍历黑名单数组
    for(var i = 0; i < x.length; i++){
        // 如果当前元素文本包含黑名单中的关键词，则返回true
        if(element.indexOf(x[i]) > -1){
            return true;
        }
    }
    // 如果没有找到任何关键词，则返回false
    return false;
}
