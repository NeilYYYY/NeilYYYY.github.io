//地理位置
// 发现有时会和当前页面重复，加一个判断
function randomPost() {
    fetch('/baidusitemap.xml').then(res => res.text()).then(str => (new window.DOMParser()).parseFromString(str, "text/xml")).then(data => {
        let ls = data.querySelectorAll('url loc');
        while (true) {
            let url = ls[Math.floor(Math.random() * ls.length)].innerHTML;
            if (location.href == url) continue;
            location.href = url;
            return;
        }
    })
}




//复制与F12提醒

// 复制提醒
document.addEventListener("copy",function(e){
  debounce(function () {
    new Vue({
      data: function () {
        this.$notify({
          title: "哎嘿！复制成功🍬",
          message: "若要转载最好保留原文链接哦，给你一个大大的赞！",
          position: 'top-left',
          offset: 50,
          showClose: true,
          type: "success",
          duration: 5000
        });
      }
    })
}, 300);
  })
  
  /* 禁用F12按键并提醒 */
  document.onkeydown = function () {
    if (window.event && window.event.keyCode == 123) {
    //   event.keyCode = 0;
    //   event.returnValue = false;
      new Vue({
        data:function(){
          this.$notify({
            title:"啊啊！你干嘛啊！",
            message:"奇怪的地方都被你看到啦…好羞羞…你要对人家负责哟！o(≧v≦)o",
            position: 'top-left',
            offset: 50,
            showClose: false,
            type:"success"
          });
          return{visible:false}
        }
      })
      return false;
    }
  };

// 防抖全局计时器
let TT = null;    //time用来控制事件的触发
// 防抖函数:fn->逻辑 time->防抖时间
function debounce(fn, time) {
    if (TT !== null) clearTimeout(TT);
    TT = setTimeout(fn, time);
}




//农历
var lunarInfo=[19416,19168,42352,21717,53856,55632,91476,22176,39632,21970,19168,42422,42192,53840,119381,46400,54944,44450,38320,84343,18800,42160,46261,27216,27968,109396,11104,38256,21234,18800,25958,54432,59984,28309,23248,11104,100067,37600,116951,51536,54432,120998,46416,22176,107956,9680,37584,53938,43344,46423,27808,46416,86869,19872,42416,83315,21168,43432,59728,27296,44710,43856,19296,43748,42352,21088,62051,55632,23383,22176,38608,19925,19152,42192,54484,53840,54616,46400,46752,103846,38320,18864,43380,42160,45690,27216,27968,44870,43872,38256,19189,18800,25776,29859,59984,27480,23232,43872,38613,37600,51552,55636,54432,55888,30034,22176,43959,9680,37584,51893,43344,46240,47780,44368,21977,19360,42416,86390,21168,43312,31060,27296,44368,23378,19296,42726,42208,53856,60005,54576,23200,30371,38608,19195,19152,42192,118966,53840,54560,56645,46496,22224,21938,18864,42359,42160,43600,111189,27936,44448,84835,37744,18936,18800,25776,92326,59984,27424,108228,43744,41696,53987,51552,54615,54432,55888,23893,22176,42704,21972,21200,43448,43344,46240,46758,44368,21920,43940,42416,21168,45683,26928,29495,27296,44368,84821,19296,42352,21732,53600,59752,54560,55968,92838,22224,19168,43476,41680,53584,62034,54560],solarMonth=[31,28,31,30,31,30,31,31,30,31,30,31],Gan=["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"],Zhi=["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"],Animals=["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"],solarTerm=["小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至"],sTermInfo=["9778397bd097c36b0b6fc9274c91aa","97b6b97bd19801ec9210c965cc920e","97bcf97c3598082c95f8c965cc920f","97bd0b06bdb0722c965ce1cfcc920f","b027097bd097c36b0b6fc9274c91aa","97b6b97bd19801ec9210c965cc920e","97bcf97c359801ec95f8c965cc920f","97bd0b06bdb0722c965ce1cfcc920f","b027097bd097c36b0b6fc9274c91aa","97b6b97bd19801ec9210c965cc920e","97bcf97c359801ec95f8c965cc920f","97bd0b06bdb0722c965ce1cfcc920f","b027097bd097c36b0b6fc9274c91aa","9778397bd19801ec9210c965cc920e","97b6b97bd19801ec95f8c965cc920f","97bd09801d98082c95f8e1cfcc920f","97bd097bd097c36b0b6fc9210c8dc2","9778397bd197c36c9210c9274c91aa","97b6b97bd19801ec95f8c965cc920e","97bd09801d98082c95f8e1cfcc920f","97bd097bd097c36b0b6fc9210c8dc2","9778397bd097c36c9210c9274c91aa","97b6b97bd19801ec95f8c965cc920e","97bcf97c3598082c95f8e1cfcc920f","97bd097bd097c36b0b6fc9210c8dc2","9778397bd097c36c9210c9274c91aa","97b6b97bd19801ec9210c965cc920e","97bcf97c3598082c95f8c965cc920f","97bd097bd097c35b0b6fc920fb0722","9778397bd097c36b0b6fc9274c91aa","97b6b97bd19801ec9210c965cc920e","97bcf97c3598082c95f8c965cc920f","97bd097bd097c35b0b6fc920fb0722","9778397bd097c36b0b6fc9274c91aa","97b6b97bd19801ec9210c965cc920e","97bcf97c359801ec95f8c965cc920f","97bd097bd097c35b0b6fc920fb0722","9778397bd097c36b0b6fc9274c91aa","97b6b97bd19801ec9210c965cc920e","97bcf97c359801ec95f8c965cc920f","97bd097bd097c35b0b6fc920fb0722","9778397bd097c36b0b6fc9274c91aa","97b6b97bd19801ec9210c965cc920e","97bcf97c359801ec95f8c965cc920f","97bd097bd07f595b0b6fc920fb0722","9778397bd097c36b0b6fc9210c8dc2","9778397bd19801ec9210c9274c920e","97b6b97bd19801ec95f8c965cc920f","97bd07f5307f595b0b0bc920fb0722","7f0e397bd097c36b0b6fc9210c8dc2","9778397bd097c36c9210c9274c920e","97b6b97bd19801ec95f8c965cc920f","97bd07f5307f595b0b0bc920fb0722","7f0e397bd097c36b0b6fc9210c8dc2","9778397bd097c36c9210c9274c91aa","97b6b97bd19801ec9210c965cc920e","97bd07f1487f595b0b0bc920fb0722","7f0e397bd097c36b0b6fc9210c8dc2","9778397bd097c36b0b6fc9274c91aa","97b6b97bd19801ec9210c965cc920e","97bcf7f1487f595b0b0bb0b6fb0722","7f0e397bd097c35b0b6fc920fb0722","9778397bd097c36b0b6fc9274c91aa","97b6b97bd19801ec9210c965cc920e","97bcf7f1487f595b0b0bb0b6fb0722","7f0e397bd097c35b0b6fc920fb0722","9778397bd097c36b0b6fc9274c91aa","97b6b97bd19801ec9210c965cc920e","97bcf7f1487f531b0b0bb0b6fb0722","7f0e397bd097c35b0b6fc920fb0722","9778397bd097c36b0b6fc9274c91aa","97b6b97bd19801ec9210c965cc920e","97bcf7f1487f531b0b0bb0b6fb0722","7f0e397bd07f595b0b6fc920fb0722","9778397bd097c36b0b6fc9274c91aa","97b6b97bd19801ec9210c9274c920e","97bcf7f0e47f531b0b0bb0b6fb0722","7f0e397bd07f595b0b0bc920fb0722","9778397bd097c36b0b6fc9210c91aa","97b6b97bd197c36c9210c9274c920e","97bcf7f0e47f531b0b0bb0b6fb0722","7f0e397bd07f595b0b0bc920fb0722","9778397bd097c36b0b6fc9210c8dc2","9778397bd097c36c9210c9274c920e","97b6b7f0e47f531b0723b0b6fb0722","7f0e37f5307f595b0b0bc920fb0722","7f0e397bd097c36b0b6fc9210c8dc2","9778397bd097c36b0b70c9274c91aa","97b6b7f0e47f531b0723b0b6fb0721","7f0e37f1487f595b0b0bb0b6fb0722","7f0e397bd097c35b0b6fc9210c8dc2","9778397bd097c36b0b6fc9274c91aa","97b6b7f0e47f531b0723b0b6fb0721","7f0e27f1487f595b0b0bb0b6fb0722","7f0e397bd097c35b0b6fc920fb0722","9778397bd097c36b0b6fc9274c91aa","97b6b7f0e47f531b0723b0b6fb0721","7f0e27f1487f531b0b0bb0b6fb0722","7f0e397bd097c35b0b6fc920fb0722","9778397bd097c36b0b6fc9274c91aa","97b6b7f0e47f531b0723b0b6fb0721","7f0e27f1487f531b0b0bb0b6fb0722","7f0e397bd097c35b0b6fc920fb0722","9778397bd097c36b0b6fc9274c91aa","97b6b7f0e47f531b0723b0b6fb0721","7f0e27f1487f531b0b0bb0b6fb0722","7f0e397bd07f595b0b0bc920fb0722","9778397bd097c36b0b6fc9274c91aa","97b6b7f0e47f531b0723b0787b0721","7f0e27f0e47f531b0b0bb0b6fb0722","7f0e397bd07f595b0b0bc920fb0722","9778397bd097c36b0b6fc9210c91aa","97b6b7f0e47f149b0723b0787b0721","7f0e27f0e47f531b0723b0b6fb0722","7f0e397bd07f595b0b0bc920fb0722","9778397bd097c36b0b6fc9210c8dc2","977837f0e37f149b0723b0787b0721","7f07e7f0e47f531b0723b0b6fb0722","7f0e37f5307f595b0b0bc920fb0722","7f0e397bd097c35b0b6fc9210c8dc2","977837f0e37f14998082b0787b0721","7f07e7f0e47f531b0723b0b6fb0721","7f0e37f1487f595b0b0bb0b6fb0722","7f0e397bd097c35b0b6fc9210c8dc2","977837f0e37f14998082b0787b06bd","7f07e7f0e47f531b0723b0b6fb0721","7f0e27f1487f531b0b0bb0b6fb0722","7f0e397bd097c35b0b6fc920fb0722","977837f0e37f14998082b0787b06bd","7f07e7f0e47f531b0723b0b6fb0721","7f0e27f1487f531b0b0bb0b6fb0722","7f0e397bd097c35b0b6fc920fb0722","977837f0e37f14998082b0787b06bd","7f07e7f0e47f531b0723b0b6fb0721","7f0e27f1487f531b0b0bb0b6fb0722","7f0e397bd07f595b0b0bc920fb0722","977837f0e37f14998082b0787b06bd","7f07e7f0e47f531b0723b0b6fb0721","7f0e27f1487f531b0b0bb0b6fb0722","7f0e397bd07f595b0b0bc920fb0722","977837f0e37f14998082b0787b06bd","7f07e7f0e47f149b0723b0787b0721","7f0e27f0e47f531b0b0bb0b6fb0722","7f0e397bd07f595b0b0bc920fb0722","977837f0e37f14998082b0723b06bd","7f07e7f0e37f149b0723b0787b0721","7f0e27f0e47f531b0723b0b6fb0722","7f0e397bd07f595b0b0bc920fb0722","977837f0e37f14898082b0723b02d5","7ec967f0e37f14998082b0787b0721","7f07e7f0e47f531b0723b0b6fb0722","7f0e37f1487f595b0b0bb0b6fb0722","7f0e37f0e37f14898082b0723b02d5","7ec967f0e37f14998082b0787b0721","7f07e7f0e47f531b0723b0b6fb0722","7f0e37f1487f531b0b0bb0b6fb0722","7f0e37f0e37f14898082b0723b02d5","7ec967f0e37f14998082b0787b06bd","7f07e7f0e47f531b0723b0b6fb0721","7f0e37f1487f531b0b0bb0b6fb0722","7f0e37f0e37f14898082b072297c35","7ec967f0e37f14998082b0787b06bd","7f07e7f0e47f531b0723b0b6fb0721","7f0e27f1487f531b0b0bb0b6fb0722","7f0e37f0e37f14898082b072297c35","7ec967f0e37f14998082b0787b06bd","7f07e7f0e47f531b0723b0b6fb0721","7f0e27f1487f531b0b0bb0b6fb0722","7f0e37f0e366aa89801eb072297c35","7ec967f0e37f14998082b0787b06bd","7f07e7f0e47f149b0723b0787b0721","7f0e27f1487f531b0b0bb0b6fb0722","7f0e37f0e366aa89801eb072297c35","7ec967f0e37f14998082b0723b06bd","7f07e7f0e47f149b0723b0787b0721","7f0e27f0e47f531b0723b0b6fb0722","7f0e37f0e366aa89801eb072297c35","7ec967f0e37f14998082b0723b06bd","7f07e7f0e37f14998083b0787b0721","7f0e27f0e47f531b0723b0b6fb0722","7f0e37f0e366aa89801eb072297c35","7ec967f0e37f14898082b0723b02d5","7f07e7f0e37f14998082b0787b0721","7f07e7f0e47f531b0723b0b6fb0722","7f0e36665b66aa89801e9808297c35","665f67f0e37f14898082b0723b02d5","7ec967f0e37f14998082b0787b0721","7f07e7f0e47f531b0723b0b6fb0722","7f0e36665b66a449801e9808297c35","665f67f0e37f14898082b0723b02d5","7ec967f0e37f14998082b0787b06bd","7f07e7f0e47f531b0723b0b6fb0721","7f0e36665b66a449801e9808297c35","665f67f0e37f14898082b072297c35","7ec967f0e37f14998082b0787b06bd","7f07e7f0e47f531b0723b0b6fb0721","7f0e26665b66a449801e9808297c35","665f67f0e37f1489801eb072297c35","7ec967f0e37f14998082b0787b06bd","7f07e7f0e47f531b0723b0b6fb0721","7f0e27f1487f531b0b0bb0b6fb0722"],nStr1=["日","一","二","三","四","五","六","七","八","九","十"],nStr2=["初","十","廿","卅"],nStr3=["正","二","三","四","五","六","七","八","九","十","冬","腊"];function lYearDays(b){var f,c=348;for(f=32768;f>8;f>>=1)c+=lunarInfo[b-1900]&f?1:0;return c+leapDays(b)}function leapMonth(b){return 15&lunarInfo[b-1900]}function leapDays(b){return leapMonth(b)?65536&lunarInfo[b-1900]?30:29:0}function monthDays(b,f){return f>12||f<1?-1:lunarInfo[b-1900]&65536>>f?30:29}function solarDays(b,f){if(f>12||f<1)return-1;var c=f-1;return 1===c?b%4==0&&b%100!=0||b%400==0?29:28:solarMonth[c]}function toGanZhiYear(b){var f=(b-3)%10,c=(b-3)%12;return 0===f&&(f=10),0===c&&(c=12),Gan[f-1]+Zhi[c-1]}function toAstro(b,f){return"魔羯水瓶双鱼白羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯".substr(2*b-(f<[20,19,21,21,21,22,23,23,23,23,22,22][b-1]?2:0),2)+"座"}function toGanZhi(b){return Gan[b%10]+Zhi[b%12]}function getTerm(b,f){if(b<1900||b>2100)return-1;if(f<1||f>24)return-1;var c=sTermInfo[b-1900],e=[parseInt("0x"+c.substr(0,5)).toString(),parseInt("0x"+c.substr(5,5)).toString(),parseInt("0x"+c.substr(10,5)).toString(),parseInt("0x"+c.substr(15,5)).toString(),parseInt("0x"+c.substr(20,5)).toString(),parseInt("0x"+c.substr(25,5)).toString()],a=[e[0].substr(0,1),e[0].substr(1,2),e[0].substr(3,1),e[0].substr(4,2),e[1].substr(0,1),e[1].substr(1,2),e[1].substr(3,1),e[1].substr(4,2),e[2].substr(0,1),e[2].substr(1,2),e[2].substr(3,1),e[2].substr(4,2),e[3].substr(0,1),e[3].substr(1,2),e[3].substr(3,1),e[3].substr(4,2),e[4].substr(0,1),e[4].substr(1,2),e[4].substr(3,1),e[4].substr(4,2),e[5].substr(0,1),e[5].substr(1,2),e[5].substr(3,1),e[5].substr(4,2)];return parseInt(a[f-1])}function toChinaMonth(b){if(b>12||b<1)return-1;var f=nStr3[b-1];return f+="月"}function toChinaDay(b){var f;switch(b){case 10:f="初十";break;case 20:f="二十";break;case 30:f="三十";break;default:f=nStr2[Math.floor(b/10)],f+=nStr1[b%10]}return f}function getAnimal(b){return Animals[(b-4)%12]}function solar2lunar(b,f,c){if(b<1900||b>2100)return-1;if(1900===b&&1===f&&c<31)return-1;var e,a,r=null,t=0;b=(r=b?new Date(b,parseInt(f)-1,c):new Date).getFullYear(),f=r.getMonth()+1,c=r.getDate();var d=(Date.UTC(r.getFullYear(),r.getMonth(),r.getDate())-Date.UTC(1900,0,31))/864e5;for(e=1900;e<2101&&d>0;e++)d-=t=lYearDays(e);d<0&&(d+=t,e--);var n=new Date,s=!1;n.getFullYear()===b&&n.getMonth()+1===f&&n.getDate()===c&&(s=!0);var u=r.getDay(),o=nStr1[u];0===u&&(u=7);var l=e;a=leapMonth(e);var i=!1;for(e=1;e<13&&d>0;e++)a>0&&e===a+1&&!1===i?(--e,i=!0,t=leapDays(l)):t=monthDays(l,e),!0===i&&e===a+1&&(i=!1),d-=t;0===d&&a>0&&e===a+1&&(i?i=!1:(i=!0,--e)),d<0&&(d+=t,--e);var h=e,D=d+1,g=f-1,v=toGanZhiYear(l),y=getTerm(b,2*f-1),m=getTerm(b,2*f),p=toGanZhi(12*(b-1900)+f+11);c>=y&&(p=toGanZhi(12*(b-1900)+f+12));var M=!1,T=null;y===c&&(M=!0,T=solarTerm[2*f-2]),m===c&&(M=!0,T=solarTerm[2*f-1]);var I=toGanZhi(Date.UTC(b,g,1,0,0,0,0)/864e5+25567+10+c-1),C=toAstro(f,c);return{lYear:l,lMonth:h,lDay:D,Animal:getAnimal(l),IMonthCn:(i?"闰":"")+toChinaMonth(h),IDayCn:toChinaDay(D),cYear:b,cMonth:f,cDay:c,gzYear:v,gzMonth:p,gzDay:I,isToday:s,isLeap:i,nWeek:u,ncWeek:"星期"+o,isTerm:M,Term:T,astro:C}}var calendarFormatter={solar2lunar:function(b,f,c){return solar2lunar(b,f,c)},lunar2solar:function(b,f,c,e){if((e=!!e)&&leapMonth!==f)return-1;if(2100===b&&12===f&&c>1||1900===b&&1===f&&c<31)return-1;var a=monthDays(b,f),r=a;if(e&&(r=leapDays(b,f)),b<1900||b>2100||c>r)return-1;for(var t=0,d=1900;d<b;d++)t+=lYearDays(d);var n=0,s=!1;for(d=1;d<f;d++)n=leapMonth(b),s||n<=d&&n>0&&(t+=leapDays(b),s=!0),t+=monthDays(b,d);e&&(t+=a);var u=Date.UTC(1900,1,30,0,0,0),o=new Date(864e5*(t+c-31)+u);return solar2lunar(o.getUTCFullYear(),o.getUTCMonth()+1,o.getUTCDate())}};


//右键菜单
function setMask() {
  //设置遮罩
  if (document.getElementsByClassName("rmMask")[0] != undefined)
      return document.getElementsByClassName("rmMask")[0];
  mask = document.createElement('div');
  mask.className = "rmMask";
  mask.style.width = window.innerWidth + 'px';
  mask.style.height = window.innerHeight + 'px';
  mask.style.background = '#fff';
  mask.style.opacity = '.0';
  mask.style.position = 'fixed';
  mask.style.top = '0';
  mask.style.left = '0';
  mask.style.zIndex = 998;
  document.body.appendChild(mask);
  document.getElementById("rightMenu").style.zIndex = 19198;
  return mask;
}

function insertAtCursor(myField, myValue) {

  //IE 浏览器
  if (document.selection) {
      myField.focus();
      sel = document.selection.createRange();
      sel.text = myValue;
      sel.select();
  }

  //FireFox、Chrome等
  else if (myField.selectionStart || myField.selectionStart == '0') {
      var startPos = myField.selectionStart;
      var endPos = myField.selectionEnd;

      // 保存滚动条
      var restoreTop = myField.scrollTop;
      myField.value = myField.value.substring(0, startPos) + myValue + myField.value.substring(endPos, myField.value.length);

      if (restoreTop > 0) {
          myField.scrollTop = restoreTop;
      }

      myField.focus();
      myField.selectionStart = startPos + myValue.length;
      myField.selectionEnd = startPos + myValue.length;
  } else {
      myField.value += myValue;
      myField.focus();
  }
}

let rmf = {};
rmf.showRightMenu = function (isTrue, x = 0, y = 0) {
  let $rightMenu = $('#rightMenu');
  $rightMenu.css('top', x + 'px').css('left', y + 'px');

  if (isTrue) {
      $rightMenu.show();
  } else {
      $rightMenu.hide();
  }
}

rmf.copyWordsLink = function () {
  let url = window.location.href
  let txa = document.createElement("textarea");
  txa.value = url;
  document.body.appendChild(txa)
  txa.select();
  document.execCommand("Copy");
  document.body.removeChild(txa);
}
rmf.switchReadMode = function () {
  const $body = document.body
  $body.classList.add('read-mode')
  const newEle = document.createElement('button')
  newEle.type = 'button'
  newEle.className = 'fas fa-sign-out-alt exit-readmode'
  $body.appendChild(newEle)

  function clickFn() {
      $body.classList.remove('read-mode')
      newEle.remove()
      newEle.removeEventListener('click', clickFn)
  }

  newEle.addEventListener('click', clickFn)
}

//复制选中文字
rmf.copySelect = function () {
  document.execCommand('Copy', false, null);
}

//回到顶部
rmf.scrollToTop = function () {
  document.getElementsByClassName("menus_items")[1].setAttribute("style", "");
  document.getElementById("name-container").setAttribute("style", "display:none");
  btf.scrollToDest(0, 500);
}

document.body.addEventListener('touchmove', function () {

}, { passive: false });

function popupMenu() {
  window.oncontextmenu = function (event) {
      // if (event.ctrlKey) return true;

      // 当关掉自定义右键时候直接返回
      if (mouseMode == "off") return true;

      $('.rightMenu-group.hide').hide();
      if (document.getSelection().toString()) {
          $('#menu-text').show();
      }
      if (document.getElementById('post')) {
          $('#menu-post').show();
      } else {
          if (document.getElementById('page')) {
              $('#menu-post').show();
          }
      }
      var el = window.document.body;
      el = event.target;
      var a = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/
      if (a.test(window.getSelection().toString()) && el.tagName != "A") {
          $('#menu-too').show()
      }
      if (el.tagName == 'A') {
          $('#menu-to').show()
          rmf.open = function () {
              if (el.href.indexOf("http://") == -1 && el.href.indexOf("https://") == -1 || el.href.indexOf("yisous.xyz") != -1) {
                  pjax.loadUrl(el.href)
              }
              else {
                  location.href = el.href
              }
          }
          rmf.openWithNewTab = function () {
              window.open(el.href);
              // window.location.reload();
          }
          rmf.copyLink = function () {
              let url = el.href
              let txa = document.createElement("textarea");
              txa.value = url;
              document.body.appendChild(txa)
              txa.select();
              document.execCommand("Copy");
              document.body.removeChild(txa);
          }
      } else if (el.tagName == 'IMG') {
          $('#menu-img').show()
          rmf.openWithNewTab = function () {
              window.open(el.src);
              // window.location.reload();
          }
          rmf.click = function () {
              el.click()
          }
          rmf.copyLink = function () {
              let url = el.src
              let txa = document.createElement("textarea");
              txa.value = url;
              document.body.appendChild(txa)
              txa.select();
              document.execCommand("Copy");
              document.body.removeChild(txa);
          }
          rmf.saveAs = function () {
              var a = document.createElement('a');
              var url = el.src;
              var filename = url.split("/")[-1];
              a.href = url;
              a.download = filename;
              a.click();
              window.URL.revokeObjectURL(url);
          }
      } else if (el.tagName == "TEXTAREA" || el.tagName == "INPUT") {
          $('#menu-paste').show();
          rmf.paste = function () {
              navigator.permissions
                  .query({
                      name: 'clipboard-read'
                  })
                  .then(result => {
                      if (result.state == 'granted' || result.state == 'prompt') {
                          //读取剪贴板
                          navigator.clipboard.readText().then(text => {
                              console.log(text)
                              insertAtCursor(el, text)
                          })
                      } else {
                          Snackbar.show({
                              text: '请允许读取剪贴板！',
                              pos: 'top-center',
                              showAction: false,
                          })
                      }
                  })
          }
      }
      let pageX = event.clientX + 10;
      let pageY = event.clientY;
      let rmWidth = $('#rightMenu').width();
      let rmHeight = $('#rightMenu').height();
      if (pageX + rmWidth > window.innerWidth) {
          pageX -= rmWidth + 10;
      }
      if (pageY + rmHeight > window.innerHeight) {
          pageY -= pageY + rmHeight - window.innerHeight;
      }
      mask = setMask();
      // 滚动消失的代码和阅读进度有冲突，因此放到readPercent.js里面了
      $(".rightMenu-item").click(() => {
          $('.rmMask').attr('style', 'display: none');
      })
      $(window).resize(() => {
          rmf.showRightMenu(false);
          $('.rmMask').attr('style', 'display: none');
      })
      mask.onclick = () => {
          $('.rmMask').attr('style', 'display: none');
      }
      rmf.showRightMenu(true, pageY, pageX);
      $('.rmMask').attr('style', 'display: flex');
      return false;
  };

  window.addEventListener('click', function () {
      rmf.showRightMenu(false);
  });
}
if (!(navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
  popupMenu()
}
const box = document.documentElement

function addLongtabListener(target, callback) {
  let timer = 0 // 初始化timer

  target.ontouchstart = () => {
      timer = 0 // 重置timer
      timer = setTimeout(() => {
          callback();
          timer = 0
      }, 380) // 超时器能成功执行，说明是长按
  }

  target.ontouchmove = () => {
      clearTimeout(timer) // 如果来到这里，说明是滑动
      timer = 0
  }

  target.ontouchend = () => { // 到这里如果timer有值，说明此触摸时间不足380ms，是点击
      if (timer) {
          clearTimeout(timer)
      }
  }
}

addLongtabListener(box, popupMenu)

// 全屏
rmf.fullScreen = function () {
  if (document.fullscreenElement) document.exitFullscreen();
  else document.documentElement.requestFullscreen();
}

// 右键开关
if (localStorage.getItem("mouse") == undefined) {
  localStorage.setItem("mouse", "on");
}
var mouseMode = localStorage.getItem("mouse");
function changeMouseMode() {
  if (localStorage.getItem("mouse") == "on") {
      mouseMode = "off";
      localStorage.setItem("mouse", "off");
      debounce(function () {
          new Vue({
              data: function () {
                  this.$notify({
                      title: "切换右键模式成功",
                      message: "当前鼠标右键已恢复为系统默认！",
                      position: 'top-left',
                      offset: 50,
                      showClose: true,
                      type: "success",
                      duration: 5000
                  });
              }
          })
      }, 300);
  } else {
      mouseMode = "on";
      localStorage.setItem("mouse", "on");
      debounce(function () {
          new Vue({
              data: function () {
                  this.$notify({
                      title: "切换右键模式成功",
                      message: "当前鼠标右键已更换为网站指定样式！",
                      position: 'top-left',
                      offset: 50,
                      showClose: true,
                      type: "success",
                      duration: 5000
                  });
              }
          })
      }, 300);
  }
}

//runtime
var now = new Date();
function createtime() {
  // 当前时间
  now.setTime(now.getTime() + 1000);
  var grt = new Date("01/01/2022 00:00:00");	// 网站诞生时间
  var days = (now - grt) / 1e3 / 60 / 60 / 24,
    dnum = Math.floor(days),
    hours = (now - grt) / 1e3 / 60 / 60 - 24 * dnum,
    hnum = Math.floor(hours);
  1 == String(hnum).length && (hnum = "0" + hnum);
  var minutes = (now - grt) / 1e3 / 60 - 1440 * dnum - 60 * hnum,
    mnum = Math.floor(minutes);
  1 == String(mnum).length && (mnum = "0" + mnum);
  var seconds = (now - grt) / 1e3 - 86400 * dnum - 3600 * hnum - 60 * mnum,
    snum = Math.round(seconds);
  1 == String(snum).length && (snum = "0" + snum);
  let currentTimeHtml = "";
  (currentTimeHtml =
    hnum < 18 && hnum >= 9
    ? `<img class='boardsign' src='https://img.shields.io/badge/-📖%20%20学习中-9cf' title='要往死里卷啊～~'><br> <div style="font-size:13px;font-weight:bold">本站居然运行了 ${dnum} 天 ${hnum} 小时 ${mnum} 分 ${snum} 秒 <i id="heartbeat" class='fas fa-heartbeat'></i> </div>`
    : `<img class='boardsign' src='https://img.shields.io/badge/-🐟%20%20摸鱼中-9cf' title='摸鱼的时候也要往死里卷啊~'><br> <div style="font-size:13px;font-weight:bold">本站居然运行了 ${dnum} 天 ${hnum} 小时 ${mnum} 分 ${snum} 秒 <i id="heartbeat" class='fas fa-heartbeat'></i> </div>`),
    document.getElementById("workboard") &&
    (document.getElementById("workboard").innerHTML = currentTimeHtml);
}
// 设置重复执行函数，周期1000ms
setInterval(() => {
  createtime();
}, 1000);




// 分享本页
function share_() {
  let url = window.location.origin + window.location.pathname
  try {
      // 截取标题
      var title = document.title;
      var subTitle = title.endsWith("| Neil") ? title.substring(0, title.length - 14) : title;
      navigator.clipboard.writeText('Neil的站内分享\n标题：' + subTitle + '\n链接：' + url + '\n欢迎来访！🍭🍭🍭');
      new Vue({
          data: function () {
              this.$notify({
                  title: "成功复制分享信息🎉",
                  message: "您现在可以通过粘贴直接跟小伙伴分享了！",
                  position: 'top-left',
                  offset: 50,
                  showClose: true,
                  type: "success", 
                  duration: 5000
              });
              // return { visible: false }
          }
      })
  } catch (err) {
      console.error('复制失败！', err);
  }
  // new ClipboardJS(".share", { text: function () { return '标题：' + document.title + '\n链接：' + url } });
  // btf.snackbarShow("本页链接已复制到剪切板，快去分享吧~")
}

// 防抖
function share() {
  debounce(share_, 300);
}



//snow
if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
  // 移动端不显示
} else {
  // document.write('<canvas id="snow" style="position:fixed;top:0;left:0;width:100%;height:100%;z-index:-2;pointer-events:none"></canvas>');

  window && (() => {
      let e = {
          flakeCount: 50, // 雪花数目
          minDist: 150,   // 最小距离
          color: "255, 255, 255", // 雪花颜色
          size: 1.5,  // 雪花大小
          speed: .5,  // 雪花速度
          opacity: .7,    // 雪花透明度
          stepsize: .5    // 步距
      };
      const t = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function (e) {
          window.setTimeout(e, 1e3 / 60)
      }
          ;
      window.requestAnimationFrame = t;
      const i = document.getElementById("snow"),
          n = i.getContext("2d"),
          o = e.flakeCount;
      let a = -100,
          d = -100,
          s = [];
      i.width = window.innerWidth,
          i.height = window.innerHeight;
      const h = () => {
          n.clearRect(0, 0, i.width, i.height);
          const r = e.minDist;
          for (let t = 0; t < o; t++) {
              let o = s[t];
              const h = a,
                  w = d,
                  m = o.x,
                  c = o.y,
                  p = Math.sqrt((h - m) * (h - m) + (w - c) * (w - c));
              if (p < r) {
                  const e = (h - m) / p,
                      t = (w - c) / p,
                      i = r / (p * p) / 2;
                  o.velX -= i * e,
                      o.velY -= i * t
              } else
                  o.velX *= .98,
                      o.velY < o.speed && o.speed - o.velY > .01 && (o.velY += .01 * (o.speed - o.velY)),
                      o.velX += Math.cos(o.step += .05) * o.stepSize;
              n.fillStyle = "rgba(" + e.color + ", " + o.opacity + ")",
                  o.y += o.velY,
                  o.x += o.velX,
                  (o.y >= i.height || o.y <= 0) && l(o),
                  (o.x >= i.width || o.x <= 0) && l(o),
                  n.beginPath(),
                  n.arc(o.x, o.y, o.size, 0, 2 * Math.PI),
                  n.fill()
          }
          t(h)
      }
          , l = e => {
              e.x = Math.floor(Math.random() * i.width),
                  e.y = 0,
                  e.size = 3 * Math.random() + 2,
                  e.speed = 1 * Math.random() + .5,
                  e.velY = e.speed,
                  e.velX = 0,
                  e.opacity = .5 * Math.random() + .3
          }
          ;
      document.addEventListener("mousemove", (e => {
          a = e.clientX,
              d = e.clientY
      }
      )),
          window.addEventListener("resize", (() => {
              i.width = window.innerWidth,
                  i.height = window.innerHeight
          }
          )),
          (() => {
              for (let t = 0; t < o; t++) {
                  const t = Math.floor(Math.random() * i.width)
                      , n = Math.floor(Math.random() * i.height)
                      , o = 3 * Math.random() + e.size
                      , a = 1 * Math.random() + e.speed
                      , d = .5 * Math.random() + e.opacity;
                  s.push({
                      speed: a,
                      velX: 0,
                      velY: a,
                      x: t,
                      y: n,
                      size: o,
                      stepSize: Math.random() / 30 * e.stepsize,
                      step: 0,
                      angle: 180,
                      opacity: d
                  })
              }
              h()
          }
          )()
  }
  )();
}


//universe
function dark() {
  window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  var e,
      t,
      o,
      n,
      a = .05,
      s = document.getElementById("universe"),
      c = !0,
      i = "226,225,224",
      r = [];
  function l() {
      e = window.innerWidth,
      t = window.innerHeight,
      o = .216 * e,
      s.setAttribute("width", e),
      s.setAttribute("height", t)
  }
  function d() {
      n.clearRect(0, 0, e, t);
      for (var o = r.length, a = 0; a < o; a++) {
          var s = r[a];
          s.move(),
          s.fadeIn(),
          s.fadeOut(),
          s.draw()
      }
  }
  function b() {
      this.reset = function() {
          this.giant = u(3),
          this.comet = !this.giant && !c && u(10),
          this.x = m(0, e - 10),
          this.y = m(0, t),
          this.r = m(1.1, 2.6),
          this.dx = m(a, 6 * a) + (this.comet + 1 - 1) * a * m(50, 120) + .1,
          this.dy = -m(a, 6 * a) - (this.comet + 1 - 1) * a * m(50, 120),
          this.fadingOut = null,
          this.fadingIn = !0,
          this.opacity = 0,
          this.opacityTresh = m(.2, 1 - .4 * (this.comet + 1 - 1)),
          this.do = m(5e-4, .002) + .001 * (this.comet + 1 - 1)
      },
      this.fadeIn = function() {
          this.fadingIn && (this.fadingIn = !(this.opacity > this.opacityTresh), this.opacity += this.do)
      },
      this.fadeOut = function() {
          this.fadingOut && (this.fadingOut = !(this.opacity < 0), this.opacity -= this.do / 2, (this.x > e || this.y < 0) && (this.fadingOut = !1, this.reset()))
      },
      this.draw = function() {
          if (n.beginPath(), this.giant)
              n.fillStyle = "rgba(180,184,240," + this.opacity + ")",
              n.arc(this.x, this.y, 2, 0, 2 * Math.PI, !1);
          else if (this.comet) {
              n.fillStyle = "rgba(" + i + "," + this.opacity + ")",
              n.arc(this.x, this.y, 1.5, 0, 2 * Math.PI, !1);
              for (var e = 0; e < 30; e++)
                  n.fillStyle = "rgba(" + i + "," + (this.opacity - this.opacity / 20 * e) + ")",
                  n.rect(this.x - this.dx / 4 * e, this.y - this.dy / 4 * e - 2, 2, 2),
                  n.fill()
          } else
              n.fillStyle = "rgba(226,225,142," + this.opacity + ")",
              n.rect(this.x, this.y, this.r, this.r);
          n.closePath(),
          n.fill()
      },
      this.move = function() {
          this.x += this.dx,
          this.y += this.dy,
          !1 === this.fadingOut && this.reset(),
          (this.x > e - e / 4 || this.y < 0) && (this.fadingOut = !0)
      },
      setTimeout((function() {
          c = !1
      }), 50)
  }
  function u(e) {
      return Math.floor(1e3 * Math.random()) + 1 < 10 * e
  }
  function m(e, t) {
      return Math.random() * (t - e) + e
  }
  l(),
  window.addEventListener("resize", l, !1),
  function() {
      n = s.getContext("2d");
      for (var e = 0; e < o; e++)
          r[e] = new b,
          r[e].reset();
      d()
  }(),
  function e() {
      "dark" == document.getElementsByTagName("html")[0].getAttribute("data-theme") && d(),
      window.requestAnimationFrame(e)
  }()
}
dark()

//昼夜切换
function switchNightMode() {
  document.querySelector('body').insertAdjacentHTML('beforeend', '<div class="Cuteen_DarkSky"><div class="Cuteen_DarkPlanet"><div id="sun"></div><div id="moon"></div></div></div>'),
      setTimeout(function () {
          document.querySelector('body').classList.contains('DarkMode') ? (document.querySelector('body').classList.remove('DarkMode'), localStorage.setItem('isDark', '0'), document.getElementById('modeicon').setAttribute('xlink:href', '#icon-moon')) : (document.querySelector('body').classList.add('DarkMode'), localStorage.setItem('isDark', '1'), document.getElementById('modeicon').setAttribute('xlink:href', '#icon-sun')),
              setTimeout(function () {
                  document.getElementsByClassName('Cuteen_DarkSky')[0].style.transition = 'opacity 3s';
                  document.getElementsByClassName('Cuteen_DarkSky')[0].style.opacity = '0';
                  setTimeout(function () {
                      document.getElementsByClassName('Cuteen_DarkSky')[0].remove();
                  }, 1e3);
              }, 2e3)
      })
  const nowMode = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
  if (nowMode === 'light') {
      // 先设置太阳月亮透明度
      document.getElementById("sun").style.opacity = "1";
      document.getElementById("moon").style.opacity = "0";
      setTimeout(function () {
          document.getElementById("sun").style.opacity = "0";
          document.getElementById("moon").style.opacity = "1";
      }, 1000);

      activateDarkMode()
      saveToLocal.set('theme', 'dark', 2)
      // GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night)
      document.getElementById('modeicon').setAttribute('xlink:href', '#icon-sun')
      // 延时弹窗提醒
      setTimeout(() => {
          new Vue({
              data: function () {
                  this.$notify({
                      title: "关灯啦☽",
                      message: "当前已成功切换至夜间模式！",
                      position: 'top-left',
                      offset: 50,
                      showClose: true,
                      type: "success",
                      duration: 5000
                  });
              }
          })
      }, 2000)
  } else {
      // 先设置太阳月亮透明度
      document.getElementById("sun").style.opacity = "0";
      document.getElementById("moon").style.opacity = "1";
      setTimeout(function () {
          document.getElementById("sun").style.opacity = "1";
          document.getElementById("moon").style.opacity = "0";
      }, 1000);
      
      activateLightMode()
      saveToLocal.set('theme', 'light', 2)
      document.querySelector('body').classList.add('DarkMode'), document.getElementById('modeicon').setAttribute('xlink:href', '#icon-moon')
      setTimeout(() => {
          new Vue({
              data: function () {
                  this.$notify({
                      title: "开灯啦☼",
                      message: "当前已成功切换至日间模式！",
                      position: 'top-left',
                      offset: 50,
                      showClose: true,
                      type: "success",
                      duration: 5000
                  });
              }
          })
      }, 2000)
  }
  // handle some cases
  typeof utterancesTheme === 'function' && utterancesTheme()
  typeof FB === 'object' && window.loadFBComment()
  window.DISQUS && document.getElementById('disqus_thread').children.length && setTimeout(() => window.disqusReset(), 200)
}


//动态标题
var OriginTitile = document.title;
var titleTime;
document.addEventListener('visibilitychange', function () {
  if (document.hidden) {
    //离开当前页面时标签显示内容
    document.title = '哎哟，页面崩溃了！';
    clearTimeout(titleTime);
  } else {
    //返回当前页面时标签显示内容
    document.title = '哈！吓你的！';
    //两秒后变回正常标题
    titleTime = setTimeout(function () {
      document.title = OriginTitile;
    }, 2000);
  }
});


//Welcome Info
//get请求
$.ajax({
  type: 'get',
  url: 'https://apis.map.qq.com/ws/location/v1/ip',
  data: {
      key: 'LOBBZ-2BMCD-V7P4P-HZPUI-HBG5V-25BX5',
      output: 'jsonp',
  },
  dataType: 'jsonp',
  success: function (res) {
      ipLoacation = res;
  }
})
function getDistance(e1, n1, e2, n2) {
  const R = 6371
  const { sin, cos, asin, PI, hypot } = Math
  let getPoint = (e, n) => {
      e *= PI / 180
      n *= PI / 180
      return { x: cos(n) * cos(e), y: cos(n) * sin(e), z: sin(n) }
  }

  let a = getPoint(e1, n1)
  let b = getPoint(e2, n2)
  let c = hypot(a.x - b.x, a.y - b.y, a.z - b.z)
  let r = asin(c / 2) * 2 * R
  return Math.round(r);
}

function showWelcome() {

  let dist = getDistance(121.48941, 31.40527, ipLoacation.result.location.lng, ipLoacation.result.location.lat); //这里换成自己的经纬度
  let pos = ipLoacation.result.ad_info.nation;
  let ip;
  let posdesc;
  //根据国家、省份、城市信息自定义欢迎语
  switch (ipLoacation.result.ad_info.nation) {
      case "日本":
          posdesc = "よろしく，一緒にお花見に行きませんか？";
          break;
      case "美国":
          posdesc = "Freedom!";
          break;
      case "英国":
          posdesc = "Ride the London Eye at night.";
          break;
      case "俄罗斯":
          posdesc = "Наслаждайтесь наблюдением за снегом на берегах Байкала.";
          break;
      case "法国":
          posdesc = "C'est La Vie.";
          break;
      case "德国":
          posdesc = "Die Zeit verging im Fluge.";
          break;
      case "澳大利亚":
          posdesc = "Go see the Great Barrier Reef!";
          break;
      case "加拿大":
          posdesc = "Pick up a maple leaf as a gift to you.";
          break;
      case "中国":
          pos = ipLoacation.result.ad_info.province + " " + ipLoacation.result.ad_info.city + " " + ipLoacation.result.ad_info.district;
          ip = ipLoacation.result.ip;
          switch (ipLoacation.result.ad_info.province) {
              case "北京市":
                  posdesc = "沙场烽火连胡月，海畔云山拥蓟城。";
                  break;
              case "天津市":
                  posdesc = "太行西带城烟碧，碣石东连海树青。";
                  break;
              case "河北省":
                  posdesc = "山势巍巍成壁垒，天下雄关。铁马金戈由此向，无限江山。";
                  break;
              case "山西省":
                  posdesc = "展开坐具长三尺，已占山河五百余。";
                  break;
              case "内蒙古自治区":
                  posdesc = "天苍苍，野茫茫，风吹草低见牛羊。";
                  break;
              case "辽宁省":
                  posdesc = "玄菟月初明，澄辉照辽碣。";
                  break;
              case "吉林省":
                  posdesc = "城临镜水沧烟上，地接屏山绿树头。";
                  break;
              case "黑龙江省":
                  posdesc = "万里独行榆塞远，一樽共饯菊花开。";
                  break;
              case "上海市":
                  posdesc = "落日西风见沪城，瓶山终古峙峥嵘。";
                  break;
              case "江苏省":
                  switch (ipLoacation.result.ad_info.city) {
                      case "南京市":
                          posdesc = "凤凰台上凤凰游，凤去台空江自流。";
                          break;
                      case "苏州市":
                          posdesc = "行人怅望苏台柳，曾与吴王扫落花。";
                          break;
                      default:
                          posdesc = "二十九年三到此，一生知有几回来。";
                          break;
                  }
                  break;
              case "浙江省":
                  posdesc = "东风渐绿西湖柳，雁已还人未南归。";
                  break;
              case "河南省":
                  switch (ipLoacation.result.ad_info.city) {
                      case "郑州市":
                          posdesc = "绣成安向春园里，引得黄莺下柳条。";
                          break;
                      case "南阳市":
                          posdesc = "臣本布衣，躬耕于南阳。此南阳非彼南阳！";
                          break;
                      case "驻马店市":
                          posdesc = "阑干凭遍不胜愁。汝水多情，却解东流。";
                          break;
                      case "开封市":
                          posdesc = "地理南溟阔，天文北极高。";
                          break;
                      case "洛阳市":
                          posdesc = "洛阳地脉花最宜，牡丹尤为天下奇。";
                          break;
                      default:
                          posdesc = "年来鞍马困尘埃，赖有青山豁我怀。";
                          break;
                  }
                  break;
              case "安徽省":
                  posdesc = "借问酒家何处有，牧童遥指杏花村。";
                  break;
              case "福建省":
                  posdesc = "井邑白云间，岩城远带山。";
                  break;
              case "江西省":
                  posdesc = "落霞与孤鹜齐飞，秋水共长天一色。";
                  break;
              case "山东省":
                  posdesc = "遥望齐州九点烟，一泓海水杯中泻。";
                  break;
              case "湖北省":
                  posdesc = "晴川历历汉阳树，芳草萋萋鹦鹉洲。";
                  break;
              case "湖南省":
                  posdesc = "三月东风吹雪消，湖南山色翠如浇。";
                  break;
              case "广东省":
                  posdesc = "日啖荔枝三百颗，不妨长作岭南人。";
                  break;
              case "广西壮族自治区":
                  posdesc = "百嶂千峰古桂州，乡来人物固难俦。";
                  break;
              case "海南省":
                  posdesc = "朝观日出逐白浪，夕看云起收霞光。";
                  break;
              case "四川省":
                  posdesc = "剑阁峥嵘而崔嵬，一夫当关，万夫莫开。";
                  break;
              case "贵州省":
                  posdesc = "春云蒸赤水，秋雨瘴青山。";
                  break;
              case "云南省":
                  posdesc = "玉龙飞舞云缠绕，万仞冰川直耸天。";
                  break;
              case "西藏自治区":
                  posdesc = "呼猿涧西藏石笋，丹桂苍松达鹫岭。";
                  break;
              case "陕西省":
                  posdesc = "来陕西开胜壤，召南分沃畴";
                  break;
              case "甘肃省":
                  posdesc = "羌笛何须怨杨柳，春风不度玉门关。";
                  break;
              case "青海省":
                  posdesc = "青海长云暗雪山，孤城遥望玉门关。";
                  break;
              case "宁夏回族自治区":
                  posdesc = "大漠孤烟直，长河落日圆。";
                  break;
              case "新疆维吾尔自治区":
                  posdesc = "驼铃古道丝绸路，胡马犹闻唐汉风。";
                  break;
              case "台湾省":
                  posdesc = "鲎帆天外落，虾岛水中央。";
                  break;
              case "香港特别行政区":
                  posdesc = "极目天低无去鹘，何处中原一发？";
                  break;
              case "澳门特别行政区":
                  posdesc = "广东诸舶口，最是澳门雄。";
                  break;
              default:
                  posdesc = "";
                  break;
          }
          break;
      default:
          posdesc = "Saluton!";
          break;
  }

  //根据本地时间切换欢迎语
  let timeChange;
  let date = new Date();
  if (date.getHours() >= 5 && date.getHours() < 11) timeChange = "<span>上午好</span>，一日之计在于晨！";
  else if (date.getHours() >= 11 && date.getHours() < 13) timeChange = "<span>中午好</span>，该摸鱼吃午饭了。";
  else if (date.getHours() >= 13 && date.getHours() < 15) timeChange = "<span>下午好</span>，懒懒地睡个午觉吧！";
  else if (date.getHours() >= 15 && date.getHours() < 16) timeChange = "<span>三点几啦</span>，一起饮茶呀！";
  else if (date.getHours() >= 16 && date.getHours() < 19) timeChange = "<span>夕阳无限好！</span>";
  else if (date.getHours() >= 19 && date.getHours() < 24) timeChange = "<span>晚上好</span>，夜生活嗨起来！";
  else timeChange = "夜深了，别再卷了，早点休息，少熬夜。";

  try {
      //自定义文本和需要放的位置
      document.getElementById("welcome-info").innerHTML =
          `<b><center>🎉 欢迎信息 🎉</center>&emsp;&emsp;欢迎来自 <span style="color:var(--theme-color)">${pos}</span> 的小伙伴，${timeChange}您现在距离站长约 <span style="color:var(--theme-color)">${dist}</span> 公里，当前的IP地址为： <span style="color:var(--theme-color)">${ip}</span>， ${posdesc}</b>`;
  } catch (err) {
      // console.log("Pjax无法获取#welcome-info元素🙄🙄🙄")
  }
}
window.onload = showWelcome;
// 如果使用了pjax在加上下面这行代码
// document.addEventListener('pjax:complete', showWelcome);


//cat
if (document.body.clientWidth > 992) {
  function getBasicInfo() {
      /* 窗口高度 */
      var ViewH = $(window).height();
      /* document高度 */
      var DocH = $("body")[0].scrollHeight;
      /* 滚动的高度 */
      var ScrollTop = $(window).scrollTop();
      /* 可滚动的高度 */
      var S_V = DocH - ViewH;
      var Band_H = ScrollTop / (DocH - ViewH) * 100;
      return {
          ViewH: ViewH,
          DocH: DocH,
          ScrollTop: ScrollTop,
          Band_H: Band_H,
          S_V: S_V
      }
  };
  function show(basicInfo) {
      if (basicInfo.ScrollTop > 0.001) {
          $(".neko").css('display', 'block');
      } else {
          $(".neko").css('display', 'none');
      }
  }
  (function ($) {
      $.fn.nekoScroll = function (option) {
          var defaultSetting = {
              top: '0',
              scroWidth: 6 + 'px',
              z_index: 9999,
              zoom: 0.9,
              borderRadius: 5 + 'px',
              right: 62 + 'px',
              // 这里可以换为你喜欢的图片，例如我就换为了雪人，但是要抠图
              nekoImg: "https://cdn.neily.top/images/snowman.webp",
              hoverMsg: "下雪啦~",
              color: "var(--theme-color)",
              during: 500,
              blog_body: "body",
          };
          var setting = $.extend(defaultSetting, option);
          var getThis = this.prop("className") !== "" ? "." + this.prop("className") : this.prop("id") !== "" ? "#" +
              this.prop("id") : this.prop("nodeName");
          if ($(".neko").length == 0) {
              this.after("<div class=\"neko\" id=" + setting.nekoname + " data-msg=\"" + setting.hoverMsg + "\"></div>");
          }
          let basicInfo = getBasicInfo();
          $(getThis)
              .css({
                  'position': 'fixed',
                  'width': setting.scroWidth,
                  'top': setting.top,
                  'height': basicInfo.Band_H * setting.zoom * basicInfo.ViewH * 0.01 + 'px',
                  'z-index': setting.z_index,
                  'background-color': setting.bgcolor,
                  "border-radius": setting.borderRadius,
                  'right': setting.right,
                  'background-image': 'url(' + setting.scImg + ')',
                  'background-image': '-webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.1) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.1) 75%, transparent 75%, transparent)', 'border-radius': '2em',
                  'background-size': 'contain'
              });
          $("#" + setting.nekoname)
              .css({
                  'position': 'fixed',
                  'top': basicInfo.Band_H * setting.zoom * basicInfo.ViewH * 0.01 - 50 + 'px',
                  'z-index': setting.z_index * 10,
                  'right': setting.right,
                  'background-image': 'url(' + setting.nekoImg + ')',
              });
          show(getBasicInfo());
          $(window)
              .scroll(function () {
                  let basicInfo = getBasicInfo();
                  show(basicInfo);
                  $(getThis)
                      .css({
                          'position': 'fixed',
                          'width': setting.scroWidth,
                          'top': setting.top,
                          'height': basicInfo.Band_H * setting.zoom * basicInfo.ViewH * 0.01 + 'px',
                          'z-index': setting.z_index,
                          'background-color': setting.bgcolor,
                          "border-radius": setting.borderRadius,
                          'right': setting.right,
                          'background-image': 'url(' + setting.scImg + ')',
                          'background-image': '-webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.1) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.1) 75%, transparent 75%, transparent)', 'border-radius': '2em',
                          'background-size': 'contain'
                      });
                  $("#" + setting.nekoname)
                      .css({
                          'position': 'fixed',
                          'top': basicInfo.Band_H * setting.zoom * basicInfo.ViewH * 0.01 - 50 + 'px',
                          'z-index': setting.z_index * 10,
                          'right': setting.right,
                          'background-image': 'url(' + setting.nekoImg + ')',
                      });
                  if (basicInfo.ScrollTop == basicInfo.S_V) {
                      $("#" + setting.nekoname)
                          .addClass("showMsg")
                  } else {
                      $("#" + setting.nekoname)
                          .removeClass("showMsg");
                      $("#" + setting.nekoname)
                          .attr("data-msg", setting.hoverMsg);
                  }
              });
          this.click(function (e) {
              btf.scrollToDest(0, 500)
          });
          $("#" + setting.nekoname)
              .click(function () {
                  btf.scrollToDest(0, 500)
              });
          return this;
      }
  })(jQuery);

  $(document).ready(function () {
      //部分自定义
      $("#myscoll").nekoScroll({
          bgcolor: 'rgb(0 0 0 / .5)', //背景颜色，没有绳子背景图片时有效
          borderRadius: '2em',
          zoom: 0.9
      }
      );
      //自定义（去掉以下注释，并注释掉其他的查看效果）
      // $("#myscoll").nekoScroll({
      //     nekoname:'snowman', //nekoname，相当于id
      //     nekoImg:'https://cdn.neily.top/images/snowman.webp', //neko的背景图片
      //     //scImg:"img/绳1.png", //绳子的背景图片
      //     bgcolor:'rgb(0 0 0 / .5)', //背景颜色，没有绳子背景图片时有效
      //     zoom:0.9, //绳子长度的缩放值
      //     hoverMsg:'下雪啦～', //鼠标浮动到neko上方的对话框信息
      //     right:'80px', //距离页面右边的距离
      //     fontFamily:'楷体', //对话框字体
      //     fontSize:'14px', //对话框字体的大小
      //     color:'#1e90ff', //对话框字体颜色
      //     scroWidth:'6px', //绳子的宽度
      //     z_index:100, //不用解释了吧
      //     during:1200, //从顶部到底部滑动的时长
      // });
  })
}





//fixed-comment
//移除FixedComment类，保持原生样式，确保不与最新评论跳转冲突
function RemoveFixedComment() {
  var activedItems = document.querySelectorAll('.fixedcomment');
  if (activedItems) {
    for (i = 0; i < activedItems.length; i++) {
      activedItems[i].classList.remove('fixedcomment');
    }
  }
}
//给post-comment添加fixedcomment类
function AddFixedComment(){
  var commentBoard = document.getElementById('post-comment');
  var quitBoard = document.getElementById('quit-board');
  commentBoard.classList.add('fixedcomment');
  quitBoard.classList.add('fixedcomment');
}
//创建一个蒙版，作为退出键使用
function CreateQuitBoard(){
  var quitBoard = `<div id="quit-board" onclick="RemoveFixedComment()"></div>`
  var commentBoard = document.getElementById('post-comment');
  commentBoard.insertAdjacentHTML("beforebegin",quitBoard)
}

function FixedCommentBtn(){
  //第一步，判断当前是否存在FixedComment类，存在则移除，不存在则添加
  // 获取评论区对象
  var commentBoard = document.getElementById('post-comment');
  // 若评论区存在
  if (commentBoard) {
      // 判断是否存在fixedcomment类
      if (commentBoard.className.indexOf('fixedcomment') > -1){
        // 存在则移除
        RemoveFixedComment();
      }
      else{
        // 不存在则添加
        CreateQuitBoard();
        AddFixedComment();
      }
  }
  // 若不存在评论区则跳转至留言板(留言板路径记得改为自己的)
  else{
    // 判断是否开启了pjax，尽量不破坏全局吸底音乐刷新
      if (pjax){
        pjax.loadUrl("/comments/");
      }
      else{
        window.location.href = "/comments/";
      }
  }
}
//切换页面先初始化一遍，确保开始时是原生状态。所以要加pjax重载。
RemoveFixedComment();



//fixed-pagination
document.addEventListener('scroll',function(){

  //滚动条高度+视窗高度 = 可见区域底部高度
  var visibleBottom = window.scrollY + document.documentElement.clientHeight;
  //可见区域顶部高度
  var visibleTop = window.scrollY;
  // 获取翻页按钮容器
  var pagination = document.getElementById('pagination');
  // 获取位置监测容器，此处采用评论区
  var eventlistner = document.getElementById('post-comment');
  if (eventlistner&&pagination){
  var centerY = eventlistner.offsetTop+(eventlistner.offsetHeight/2);
  if(centerY>visibleTop&&centerY<visibleBottom){
    pagination.style.display = 'flex';
  }else{
    pagination.style.display = 'none';
  }
}
})




//day
var d = new Date();
m = d.getMonth() + 1;
dd = d.getDate();
y = d.getFullYear();

// 公祭日
if (m == 9 && dd == 18) {
    document.getElementsByTagName("html")[0].setAttribute("style", "filter: grayscale(60%);");
    if (sessionStorage.getItem("isPopupWindow") != "1") {
        Swal.fire("今天是九一八事变" + (y - 1931).toString() + "周年纪念日\n🪔勿忘国耻，振兴中华🪔");
        sessionStorage.setItem("isPopupWindow", "1");
    }
}
if (m == 7 && dd == 7) {
    document.getElementsByTagName("html")[0].setAttribute("style", "filter: grayscale(60%);");
    if (sessionStorage.getItem("isPopupWindow") != "1") {
        Swal.fire("今天是卢沟桥事变" + (y - 1937).toString() + "周年纪念日\n🪔勿忘国耻，振兴中华🪔");
        sessionStorage.setItem("isPopupWindow", "1");
    }
}
if (m == 12 && dd == 13) {
    document.getElementsByTagName("html")[0].setAttribute("style", "filter: grayscale(60%);");
    if (sessionStorage.getItem("isPopupWindow") != "1") {
        Swal.fire("今天是南京大屠杀" + (y - 1937).toString() + "周年纪念日\n🪔勿忘国耻，振兴中华🪔");
        sessionStorage.setItem("isPopupWindow", "1");
    }
}
if (m == 8 && dd == 14) {
    document.getElementsByTagName("html")[0].setAttribute("style", "filter: grayscale(60%);");
    if (sessionStorage.getItem("isPopupWindow") != "1") {
        Swal.fire("今天是世界慰安妇纪念日\n🪔勿忘国耻，振兴中华🪔");
        sessionStorage.setItem("isPopupWindow", "1");
    }
}


// 节假日
if (m == 10 && dd <= 3) {//国庆节
    if (sessionStorage.getItem("isPopupWindow") != "1") {
        Swal.fire("祝祖国" + (y - 1949).toString() + "岁生日快乐！");
        sessionStorage.setItem("isPopupWindow", "1");
    }
}
if (m == 8 && dd == 15) {//搞来玩的，小日子投降
    if (sessionStorage.getItem("isPopupWindow") != "1") {
        Swal.fire("小日子已经投降" + (y - 1945).toString() + "年了😃");
        sessionStorage.setItem("isPopupWindow", "1");
    }
}
if (m == 1 && dd == 1) {//元旦节
    if (sessionStorage.getItem("isPopupWindow") != "1") {
        Swal.fire(y.toString() + "年元旦快乐！🎉");
        sessionStorage.setItem("isPopupWindow", "1");
    }
}
if (m == 3 && dd == 8) {//妇女节
    if (sessionStorage.getItem("isPopupWindow") != "1") {
        Swal.fire("各位女神们，妇女节快乐！👩");
        sessionStorage.setItem("isPopupWindow", "1");
    }
}
l = ["非常抱歉，因为不可控原因，博客将于明天停止运营！", "好消息，日本没了！", "美国垮了，原因竟然是川普！", "微软垮了！", "你的电脑已经过载，建议立即关机！", "你知道吗？站长很喜欢你哦！", "一分钟有61秒哦", "你喜欢的人跟别人跑了！"]
if (m == 4 && dd == 1) {//愚人节，随机谎话
    if (sessionStorage.getItem("isPopupWindow") != "1") {
        Swal.fire(l[Math.floor(Math.random() * l.length)]);
        sessionStorage.setItem("isPopupWindow", "1");
    }
}
if (m == 5 && dd == 1) {//劳动节
    if (sessionStorage.getItem("isPopupWindow") != "1") {
        Swal.fire("劳动节快乐\n为各行各业辛勤工作的人们致敬！");
        sessionStorage.setItem("isPopupWindow", "1");
    }
}
if (m == 5 && dd == 4) {//青年节
    if (sessionStorage.getItem("isPopupWindow") != "1") {
        Swal.fire("青年节快乐\n青春不是回忆逝去,而是把握现在！");
        sessionStorage.setItem("isPopupWindow", "1");
    }
}
if (m == 5 && dd == 20) {//520
    if (sessionStorage.getItem("isPopupWindow") != "1") {
        Swal.fire("今年是520情人节\n快和你喜欢的人一起过吧！💑");
        sessionStorage.setItem("isPopupWindow", "1");
    }
}
if (m == 7 && dd == 1) {//建党节
    if (sessionStorage.getItem("isPopupWindow") != "1") {
        Swal.fire("祝中国共产党" + (y - 1921).toString() + "岁生日快乐！");
        sessionStorage.setItem("isPopupWindow", "1");
    }
}
if (m == 9 && dd == 10) {//教师节
    if (sessionStorage.getItem("isPopupWindow") != "1") {
        Swal.fire("各位老师们教师节快乐！👩‍🏫");
        sessionStorage.setItem("isPopupWindow", "1");
    }
}
if (m == 12 && dd == 25) {//圣诞节
    if (sessionStorage.getItem("isPopupWindow") != "1") {
        Swal.fire("圣诞节快乐！🎄");
        sessionStorage.setItem("isPopupWindow", "1");
    }
}

//传统节日部分

if ((y == 2023 && m == 4 && dd == 5) || (y == 2024 && m == 4 && dd == 4) || (y == 2025 && m == 4 && dd == 4)) {//清明节
    if (sessionStorage.getItem("isPopupWindow") != "1") {
        Swal.fire("清明时节雨纷纷,一束鲜花祭故人💐");
        sessionStorage.setItem("isPopupWindow", "1");
    }
}
if ((y == 2023 && m == 12 && dd == 22) || (y == 2024 && m == 12 && dd == 21) || (y == 2025 && m == 12 && dd == 21)) {//冬至
    if (sessionStorage.getItem("isPopupWindow") != "1") {
        Swal.fire("冬至快乐\n快吃上一碗热热的汤圆和饺子吧🧆");
        sessionStorage.setItem("isPopupWindow", "1");
    }
}

var lunar = calendarFormatter.solar2lunar();

//农历采用汉字计算，防止出现闰月导致问题

if ((lunar["IMonthCn"] == "正月" && lunar["IDayCn"] == "初六") || (lunar["IMonthCn"] == "正月" && lunar["IDayCn"] == "初五") || (lunar["IMonthCn"] == "正月" && lunar["IDayCn"] == "初四") || (lunar["IMonthCn"] == "正月" && lunar["IDayCn"] == "初三") || (lunar["IMonthCn"] == "正月" && lunar["IDayCn"] == "初二") || (lunar["IMonthCn"] == "正月" && lunar["IDayCn"] == "初一") || (lunar["IMonthCn"] == "腊月" && lunar["IDayCn"] == "三十") || (lunar["IMonthCn"] == "腊月" && lunar["IDayCn"] == "廿九")) {
    //春节，本来只有大年三十到初六，但是有时候除夕是大年二十九，所以也加上了
    if (sessionStorage.getItem("isPopupWindow") != "1") {
        Swal.fire(y.toString() + "年新年快乐\n🎊祝你心想事成，诸事顺利🎊");
        sessionStorage.setItem("isPopupWindow", "1");
    }
}
if ((lunar["IMonthCn"] == "正月" && lunar["IDayCn"] == "十五")) {
    //元宵节
    if (sessionStorage.getItem("isPopupWindow") != "1") {
        Swal.fire("元宵节快乐\n送你一个大大的灯笼🧅");
        sessionStorage.setItem("isPopupWindow", "1");
    }
}
if ((lunar["IMonthCn"] == "五月" && lunar["IDayCn"] == "初五")) {
    //端午节
    if (sessionStorage.getItem("isPopupWindow") != "1") {
        Swal.fire("端午节快乐\n请你吃一条粽子🍙");
        sessionStorage.setItem("isPopupWindow", "1");
    }
}
if ((lunar["IMonthCn"] == "七月" && lunar["IDayCn"] == "初七")) {
    //七夕节
    if (sessionStorage.getItem("isPopupWindow") != "1") {
        Swal.fire("七夕节快乐\n黄昏后,柳梢头,牛郎织女来碰头");
        sessionStorage.setItem("isPopupWindow", "1");
    }
}
if ((lunar["IMonthCn"] == "八月" && lunar["IDayCn"] == "十五")) {
    //中秋节
    if (sessionStorage.getItem("isPopupWindow") != "1") {
        Swal.fire("中秋节快乐\n请你吃一块月饼🍪");
        sessionStorage.setItem("isPopupWindow", "1");
    }
}
if ((lunar["IMonthCn"] == "九月" && lunar["IDayCn"] == "初九")) {
    //重阳节
    if (sessionStorage.getItem("isPopupWindow") != "1") {
        Swal.fire("重阳节快乐\n独在异乡为异客，每逢佳节倍思亲");
        sessionStorage.setItem("isPopupWindow", "1");
    }
}

// 切换主题提醒
// if (y == 2022 && m == 12 && (dd >= 18 && dd <= 20)) {
//     if (sessionStorage.getItem("isPopupWindow") != "1") {
//         Swal.fire("网站换成冬日限定主题啦⛄");
//         sessionStorage.setItem("isPopupWindow", "1");
//     }
// }



//console
var now1 = new Date();

function createtime1() {
    var grt = new Date("01/01/2022 00:00:00"); //此处修改你的建站时间或者网站上线时间
    now1.setTime(now1.getTime() + 250);
    var days = (now1 - grt) / 1000 / 60 / 60 / 24;
    var dnum = Math.floor(days);

    var ascll = [
        `欢迎!`,
        `Future is now 🍭🍭🍭`,
        "小站已经苟活",
        dnum,
        "天啦!",
        "©2022 By Neil",
    ];

    setTimeout(
        console.log.bind(
            console,
            `\n%c${ascll[0]} %c ${ascll[1]} %c ${ascll[2]} %c${ascll[3]}%c ${ascll[4]}%c ${ascll[5]}\n\n%c ${ascll[6]}\n`,
            "color:#39c5bb",
            "",
            "color:#39c5bb",
            "color:#39c5bb",
            "",
            "color:#39c5bb",
            ""
        )
    );
}

createtime1();

function createtime2() {
    var ascll2 = [`NCC2-036`, `调用前置摄像头拍照成功，识别为「大聪明」`, `Photo captured: `, ` 🤪 `];

    setTimeout(
        console.log.bind(
            console,
            `%c ${ascll2[0]} %c ${ascll2[1]} %c \n${ascll2[2]} %c\n${ascll2[3]}`,
            "color:white; background-color:#10bcc0",
            "",
            "",
            'background:url("https://unpkg.zhimg.com/anzhiyu-assets@latest/image/common/tinggge.gif") no-repeat;font-size:450%'
        )
    );

    setTimeout(console.log.bind(console, "%c WELCOME %c 欢迎光临，大聪明", "color:white; background-color:#23c682", ""));

    setTimeout(
        console.warn.bind(
            console,
            "%c ⚡ Powered by Neil %c Aloha!",
            "color:white; background-color:#f0ad4e",
            ""
        )
    );

    setTimeout(console.log.bind(console, "%c W23-12 %c 系统监测到你已打开控制台", "color:white; background-color:#4f90d9", ""));
    setTimeout(
        console.warn.bind(console, "%c S013-782 %c 你现在正处于监控中", "color:white; background-color:#d9534f", "")
    );
}
createtime2();

// 重写console方法
console.log = function () { };
console.error = function () { };
console.warn = function () { };


//icon-font
'use strict';

function iconFont(args) {
  args = args.join(' ').split(',')
  let p0 = args[0]
  let p1 = args[1]?args[1]:1
  return `<svg class="icon" style="width:${p1}em; height:${p1}em" aria-hidden="true"><use xlink:href="#${p0}"></use></svg>`;
}

// hexo.extend.tag.register('icon',iconFont);





//fps
if (window.localStorage.getItem("fpson") == undefined || window.localStorage.getItem("fpson") == "1") {
  var rAF = function () {
      return (
          window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          function (callback) {
              window.setTimeout(callback, 1000 / 60);
          }
      );
  }();
  var frame = 0;
  var allFrameCount = 0;
  var lastTime = Date.now();
  var lastFameTime = Date.now();
  var loop = function () {
      var now = Date.now();
      var fs = (now - lastFameTime);
      var fps = Math.round(1000 / fs);

      lastFameTime = now;
      // 不置 0，在动画的开头及结尾记录此值的差值算出 FPS
      allFrameCount++;
      frame++;

      if (now > 1000 + lastTime) {
          var fps = Math.round((frame * 1000) / (now - lastTime));
          if (fps <= 5) {
              var kd = `<span style="color:#bd0000">卡成ppt</span>`
          } else if (fps <= 15) {
              var kd = `<span style="color:red">电竞级帧率</span>`
          } else if (fps <= 25) {
              var kd = `<span style="color:orange">有点难受</span>`
          } else if (fps < 35) {
              var kd = `<span style="color:#9338e6">不太流畅</span>`
          } else if (fps <= 45) {
              var kd = `<span style="color:#08b7e4">不错不错</span>`
          } else {
              var kd = `<span style="color:#39c5bb">十分流畅</span>`
          }
          document.getElementById("fps").innerHTML = `FPS:${fps} ${kd}`;
          frame = 0;
          lastTime = now;
      };

      rAF(loop);
  }

  loop();
} else {
  document.getElementById("fps").style = "display:none!important"
}



//cursor
var CURSOR;

Math.lerp = (a, b, n) => (1 - n) * a + n * b;

const getStyle2 = (el, attr) => {
    try {
        return window.getComputedStyle
            ? window.getComputedStyle(el)[attr]
            : el.currentStyle[attr];
    } catch (e) {}
    return "";
};

// 为了屏蔽异步加载导致无法读取颜色值，这里统一用哈希表预处理
const map = new Map();
map.set('red', "rgb(241, 71, 71)");
map.set('orange', "rgb(241, 162, 71)");
map.set('yellow', "rgb(241, 238, 71)")
map.set('purple', "rgb(179, 71, 241)");
map.set('blue', "rgb(102, 204, 255)");
map.set('gray', "rgb(226, 226, 226)");
map.set('green', "rgb(57, 197, 187)");
map.set('whitegray', "rgb(241, 241, 241)");
map.set('pink', "rgb(237, 112, 155)");
map.set('black', "rgb(0, 0, 0)");
map.set('darkblue', "rgb(97, 100, 159)");
map.set('heoblue', "rgb(66, 90, 239)");

class Cursor {
    constructor() {
        this.pos = {curr: null, prev: null};
        this.pt = [];
        this.create();
        this.init();
        this.render();
    }

    move(left, top) {
        this.cursor.style["left"] = `${left}px`;
        this.cursor.style["top"] = `${top}px`;
    }

    create() {
        if (!this.cursor) {
            this.cursor = document.createElement("div");
            this.cursor.id = "cursor";
            this.cursor.classList.add("hidden");
            document.body.append(this.cursor);
        }

        var el = document.getElementsByTagName('*');
        for (let i = 0; i < el.length; i++)
            if (getStyle2(el[i], "cursor") == "pointer")
                this.pt.push(el[i].outerHTML);
        // 为了防止出现黑色鼠标的情况，优先在这里对主题色进行赋值
        if (localStorage.getItem("themeColor") == undefined) {
            localStorage.setItem("themeColor", "blue");
        }
        var colorVal = map.get(localStorage.getItem("themeColor"));
        document.body.appendChild((this.scr = document.createElement("style")));
        this.scr.innerHTML = `* {cursor: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8' width='8px' height='8px'><circle cx='4' cy='4' r='4' opacity='1.0' fill='`+ colorVal + `'/></svg>") 4 4, auto}`;
    }

    refresh() {
        this.scr.remove();
        this.cursor.classList.remove("hover");
        this.cursor.classList.remove("active");
        this.pos = {curr: null, prev: null};
        this.pt = [];

        this.create();
        this.init();
        this.render();
    }

    init() {
        document.onmouseover  = e => this.pt.includes(e.target.outerHTML) && this.cursor.classList.add("hover");
        document.onmouseout   = e => this.pt.includes(e.target.outerHTML) && this.cursor.classList.remove("hover");
        document.onmousemove  = e => {(this.pos.curr == null) && this.move(e.clientX - 8, e.clientY - 8); this.pos.curr = {x: e.clientX - 8, y: e.clientY - 8}; this.cursor.classList.remove("hidden");};
        document.onmouseenter = e => this.cursor.classList.remove("hidden");
        document.onmouseleave = e => this.cursor.classList.add("hidden");
        document.onmousedown  = e => this.cursor.classList.add("active");
        document.onmouseup    = e => this.cursor.classList.remove("active");
    }

    render() {
        if (this.pos.prev) {
            // 跟踪速度调节
            this.pos.prev.x = Math.lerp(this.pos.prev.x, this.pos.curr.x, 0.15);
            this.pos.prev.y = Math.lerp(this.pos.prev.y, this.pos.curr.y, 0.15);
            this.move(this.pos.prev.x, this.pos.prev.y);
        } else {
            this.pos.prev = this.pos.curr;
        }
        requestAnimationFrame(() => this.render());
    }
}

(() => {
    CURSOR = new Cursor();
    // 需要重新获取列表时，使用 CURSOR.refresh()
})();




//Old Explorer
function browserTC() {
    btf.snackbarShow("");
    new Vue({
        data: function () {
            this.$notify({
                title: "浏览器版本较低，网站样式可能错乱。",
                message: "🤪样式错乱就可以甩锅了。",
                position: 'top-left',
                offset: 50,
                showClose: true,
                type: "warning",
                duration: 5000
            });
        }
    });
}
function browserVersion() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //Edge浏览器
    var isFirefox = userAgent.indexOf("Firefox") > -1; //Firefox浏览器
    var isOpera = userAgent.indexOf("Opera")>-1 || userAgent.indexOf("OPR")>-1 ; //Opera浏览器
    var isChrome = userAgent.indexOf("Chrome")>-1 && userAgent.indexOf("Safari")>-1 && userAgent.indexOf("Edge")==-1 && userAgent.indexOf("OPR")==-1; //Chrome浏览器
    var isSafari = userAgent.indexOf("Safari")>-1 && userAgent.indexOf("Chrome")==-1 && userAgent.indexOf("Edge")==-1 && userAgent.indexOf("OPR")==-1; //Safari浏览器
    if(isEdge) {
        if(userAgent.split('Edge/')[1].split('.')[0]<90){
            browserTC()
        }
    } else if(isFirefox) {
        if(userAgent.split('Firefox/')[1].split('.')[0]<90){
            browserTC()
        }
    } else if(isOpera) {
        if(userAgent.split('OPR/')[1].split('.')[0]<80){
            browserTC()
        }
    } else if(isChrome) {
        if(userAgent.split('Chrome/')[1].split('.')[0]<90){
            browserTC()
        }
    } else if(isSafari) {
        //不知道Safari哪个版本是该淘汰的老旧版本
    }
}
//2022-10-29修正了一个错误：过期时间应使用toGMTString()，而不是toUTCString()，否则实际过期时间在中国差了8小时
function setCookies(obj, limitTime) {
	let data = new Date(new Date().getTime() + limitTime * 24 * 60 * 60 * 1000).toGMTString()
	for (let i in obj) {
		document.cookie = i + '=' + obj[i] + ';expires=' + data
	}
}
function getCookie(name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if (arr = document.cookie.match(reg))
		return unescape(arr[2]);
	else
		return null;
}
if(getCookie('browsertc')!=1){
    setCookies({
        browsertc: 1,
    }, 1);
    browserVersion();
}