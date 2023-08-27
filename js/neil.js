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
    ? `<img class='boardsign' src='https://cdn.neily.top/footer/学习中-9cf.svg' title='要往死里卷啊～~'><br> <div style="font-size:13px;font-weight:bold">本站居然运行了 ${dnum} 天 ${hnum} 小时 ${mnum} 分 ${snum} 秒 <i id="heartbeat" class='fas fa-heartbeat'></i> </div>`
    : `<img class='boardsign' src='https://cdn.neily.top/footer/摸鱼中-9cf.svg' title='摸鱼的时候也要往死里卷啊~'><br> <div style="font-size:13px;font-weight:bold">本站居然运行了 ${dnum} 天 ${hnum} 小时 ${mnum} 分 ${snum} 秒 <i id="heartbeat" class='fas fa-heartbeat'></i> </div>`),
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
          pjax.loadUrl("/comments/#post-comment");
        }
        else{
          window.location.href = "/comments/#post-comment";
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
        `
███    ██ ███████ ██ ██      
████   ██ ██      ██ ██      
██ ██  ██ █████   ██ ██      
██  ██ ██ ██      ██ ██      
██   ████ ███████ ██ ███████ 
                             
                             
        `,
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


function refreshCache() {
    if (confirm('是否确定刷新博文缓存')) location.reload(true)
}



document.addEventListener('pjax:complete', tonav);
document.addEventListener('DOMContentLoaded', tonav);
//响应pjax
function tonav(){
document.getElementById("name-container").setAttribute("style", "display:none");

var position = $(window).scrollTop();

$(window).scroll(function () {

  var scroll = $(window).scrollTop();

  if (scroll > position) {


    document.getElementById("name-container").setAttribute("style", "");
    document.getElementsByClassName("menus_items")[1].setAttribute("style", "display:none!important");

  } else {


    document.getElementsByClassName("menus_items")[1].setAttribute("style", "");
    document.getElementById("name-container").setAttribute("style", "display:none");

  }

  position = scroll;

});

//修复没有弄右键菜单的童鞋无法回顶部的问题
document.getElementById("page-name").innerText = document.title.split(" | Neil's Notes")[0];}








//BackGround

// 更新版本需要每个用户都恢复一次默认设置
if (localStorage.getItem("reset_2") == undefined) {
    localStorage.setItem("reset_2", "1");
    localStorage.removeItem("reset_1");
    clearItem();
    setTimeout(function () {
      new Vue({
        data: function () {
          this.$notify({
            title: "提示",
            message: " (｡･∀･)ﾉﾞ由于网站部分设置项更新，当前已为您重置所有设置，祝您愉快！",
            position: 'top-left',
            offset: 50,
            showClose: true,
            type: "success",
            duration: 8000
          });
        }
      })
    }, 1500);
  }
  
  // 清除localStorage配置项
  function clearItem() {
    localStorage.removeItem('blogbg');
    localStorage.removeItem('universe');
    localStorage.removeItem('blur');
    localStorage.removeItem('fpson');
    localStorage.removeItem('transNum');
    localStorage.removeItem('bing');
    localStorage.removeItem('blurRad');
    localStorage.removeItem('font');
    localStorage.removeItem('themeColor');
    localStorage.removeItem('rs');
    localStorage.removeItem('mouse');
  }
  
  
  //设置字体
  if (localStorage.getItem("font") == undefined) {
    localStorage.setItem("font", "PingFang");
  }
  setFont(localStorage.getItem("font"));
  function setFont(n) {
    localStorage.setItem("font", n)
    if (n == "default") {
      document.documentElement.style.setProperty('--global-font', '-apple-system');
      document.body.style.fontFamily = "-apple-system, Consolas_1, 'PingFang SC', 'PingFang', BlinkMacSystemFont, 'Segoe UI' , 'Helvetica Neue' , Lato, Roboto, 'Microsoft JhengHei' , 'Microsoft YaHei' , sans-serif";
    }
    else {
      document.documentElement.style.setProperty('--global-font', n);
      document.body.style.fontFamily = "var(--global-font), CascadiaCode, -apple-system, 'PingFang SC', 'PingFang', BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Lato, Roboto, 'Microsoft JhengHei', 'Microsoft YaHei', sans-serif";
    }
    try { setFontBorder(); } catch (err) { };
  }
  
  // 设置字体选择框边界
  function setFontBorder() {
    var curFont = localStorage.getItem("font");
    var swfId = "swf_" + curFont;
    document.getElementById(swfId).style.border = "2px solid var(--theme-color)";
    Array.prototype.forEach.call(document.getElementsByClassName("swf"), function (ee) {
      if (ee.id != swfId) ee.style.border = "2px solid var(--border-color)";
    });
  }
  
  
  // 设置主题色
  if (localStorage.getItem("themeColor") == undefined) {
    localStorage.setItem("themeColor", "blue");
  }
  setColor(localStorage.getItem("themeColor"));
  function setColor(c) {
    document.getElementById("themeColor").innerText = `:root{--theme-color:` + map.get(c) + ` !important}`;
    localStorage.setItem("themeColor", c);
    // 刷新鼠标颜色
    CURSOR.refresh();
    // 设置一个带有透明度的主题色，用于菜单栏的悬浮颜色
    var theme_color = map.get(c);
    var trans_theme_color = "rgba" + theme_color.substring(3, theme_color.length - 1) + ", 0.7)";
    document.documentElement.style.setProperty("--text-bg-hover", trans_theme_color);
  }
  
  
  // 控制星空背景特效开关
  if (localStorage.getItem("universe") == undefined) {
    localStorage.setItem("universe", "block");
  }
  
  setUniverse2(localStorage.getItem("universe"));
  function setUniverse2(c) {
    document.getElementById("universe").style.display = c;
    localStorage.setItem("universe", c);
  }
  
  function setUniverse() {
    if (document.getElementById("universeSet").checked) {
      setUniverse2("block");
    } else {
      setUniverse2("none");
    }
  }
  
  // 控制雪花背景特效开关
  if (localStorage.getItem("snow") == undefined) {
    localStorage.setItem("snow", "block");
  }
  
  setSnow2(localStorage.getItem("snow"));
  function setSnow2(c) {
    document.getElementById("snow").style.display = c;
    localStorage.setItem("snow", c);
  }
  
  function setSnow() {
    if (document.getElementById("snowSet").checked) {
      setSnow2("block");
    } else {
      setSnow2("none");
    }
  }
  
  // 帧率监测开关
  if (localStorage.getItem("fpson") == undefined) {
    localStorage.setItem("fpson", "1");
  }
  function fpssw() {
    if (document.getElementById("fpson").checked) {
      localStorage.setItem("fpson", "1");
    } else {
      localStorage.setItem("fpson", "0");
    }
    setTimeout(reload, 600);
  }
  
  // 刷新窗口
  function reload() {
    window.location.reload();
  }
  
  // 侧边栏开关
  if (localStorage.getItem("rs") == undefined) {
    localStorage.setItem("rs", "block");
  }
  if (localStorage.getItem("rs") == "block") {
    document.getElementById("rightSide").innerText = `:root{--rightside-display: block}`;
  } else {
    document.getElementById("rightSide").innerText = `:root{--rightside-display: none}`;
  }
  function toggleRightside() {
    document.getElementById("rightSideSet").checked ? (localStorage.setItem("rs", "block"), document.getElementById("rightSide").innerText = ":root{--rightside-display: block}") : (localStorage.setItem("rs", "none"), document.getElementById("rightSide").innerText = ":root{--rightside-display: none}")
  }
  
  // 透明度调节滑块
  if (localStorage.getItem("transNum") == undefined) {
    localStorage.setItem("transNum", 80);
  }
  var curTransNum = localStorage.getItem("transNum");
  var curTransMini = curTransNum * 0.95;
  document.getElementById("transPercent").innerText = `:root{--trans-light: rgba(253, 253, 253, ${curTransNum}%) !important; --trans-dark: rgba(25, 25, 25, ${curTransNum}%) !important} `;
  function setTrans() {
    var elem = document.getElementById("transSet");
    var newTransNum = elem.value;
    var target = document.querySelector('.transValue');
    target.innerHTML = "透明度 (0%-100%): " + newTransNum + "%";
    localStorage.setItem("transNum", newTransNum);
    curTransMini = newTransNum * 0.95;
    curTransNum = newTransNum;  // 更新当前透明度
    document.querySelector('#rang_trans').style.width = curTransMini + "%";
    document.getElementById("transPercent").innerText = `:root{--trans-light: rgba(253, 253, 253, ${newTransNum}%) !important; --trans-dark: rgba(25, 25, 25, ${newTransNum}%) !important} `;
  };
  
  
  // 模糊度调节滑块
  if (localStorage.getItem("blurRad") == undefined) {
    localStorage.setItem("blurRad", 20);
  }
  var curBlur = localStorage.getItem("blurRad"); // 当前模糊半径
  var miniBlur = curBlur * 0.95;
  document.getElementById("blurNum").innerText = `:root{--blur-num: blur(${curBlur}px) saturate(120%) !important`;
  function setBlurNum() {
    var elem = document.getElementById("blurSet");
    var newBlur = elem.value;
    var target = document.querySelector('.blurValue');
    target.innerHTML = "模糊半径 (开启模糊生效 0px-100px): " + newBlur + "px";
    localStorage.setItem("blurRad", newBlur);
    curBlur = newBlur;
    miniBlur = curBlur * 0.95;
    // var max = elem.getAttribute("max");
    document.querySelector('#rang_blur').style.width = miniBlur + "%";
    document.getElementById("blurNum").innerText = `:root{--blur-num: blur(${curBlur}px) saturate(120%) !important`;
  };
  
  
  // 模糊效果开关
  if (localStorage.getItem("blur") == undefined) {
    localStorage.setItem("blur", 0);
  }
  if (localStorage.getItem("blur") == 0) {
    document.getElementById("settingStyle").innerText = `:root{--backdrop-filter: none}`;
  } else {
    document.getElementById("settingStyle").innerText = `:root{--backdrop-filter: var(--blur-num)}`;
  }
  function setBlur() {
    if (document.getElementById("blur").checked) {
      localStorage.setItem("blur", 1);
      document.getElementById("settingStyle").innerText = `:root{--backdrop-filter: var(--blur-num)}`;
    } else {
      localStorage.setItem("blur", 0);
      document.getElementById("settingStyle").innerText = `:root{--backdrop-filter: none}`;
    }
  }
  
  // 切换自定义颜色
  var defineColor = localStorage.getItem("blogbg") && localStorage.getItem("blogbg").charAt(0) == '#' ? localStorage.getItem("blogbg") : '#F4D88A';
  function changeBgColor() {
    changeBg(document.querySelector("#define_colors").value)
  }
  
  // 更换背景(自己的代码)
  if (localStorage.getItem("blogbg") != undefined) {
    let curBg = localStorage.getItem("blogbg");
    document.getElementById("defineBg").innerText = `:root{
      --default-bg: ${curBg};
      --darkmode-bg: ${curBg};
      --mobileday-bg: ${curBg};
      --mobilenight-bg: ${curBg};
    }`;
    changeBg(curBg);
  } else {
      // 替换你自己的默认背景
    document.getElementById("defineBg").innerText = `:root{
      --default-bg: url(https://cdn.neily.top/images/IMG_2767.webp);
      --darkmode-bg:url(https://cdn.neily.top/images/IMG_2894.webp);
      --mobileday-bg: url(https://cdn.neily.top/images/IMG_3468.webp);
    }`;
  }
  
  let bingDayBg = screen.width <= 768 ? "url(https://bing.img.run/m.php)" : "url(https://bing.img.run/1920x1080.php)",
      bingHistoryBg = screen.width <= 768 ? "url(https://bing.img.run/rand_m.php)" : "url(https://bing.img.run/rand.php)",
      EEEDog = "url(https://api.yimian.xyz/img?type=moe&size=1920x1080)",
      picsum = "url(https://picsum.photos/1920/1080.webp)",
      waiBizhi = "url(https://api.ixiaowai.cn/api/api.php)",
      unsplash = "url(https://source.unsplash.com/random/1920x1080/)",
      touhou = "url(https://img.paulzzh.tech/touhou/random)";
  
  function changeBg(s) {
    let bg = document.getElementById("web_bg");
    if (s.charAt(0) == "#") {
      bg.style.backgroundColor = s;
      bg.style.backgroundImage = "none";
      defineColor = s;
    } else {
      bg.style.backgroundImage = s
      defineColor = '#F4D88A';
    };
    localStorage.setItem("blogbg", s);
    // localStorage.setItem("bing", "false");
    // if (document.getElementById("bingSet")) document.getElementById("bingSet").checked = false;
  }
  
  
  // 切换链接对应的背景(加入了链接检验与防抖)
  function getPicture() {
    debounce(getPicture_, 300);
  }
  
  function getPicture_() {
    let bg = document.getElementById("web_bg");
    checkImgExists(document.getElementById("pic-link").value).then(() => {
      // 有效的图片链接
      var link = "url(" + document.getElementById("pic-link").value + ")";
      bg.style.backgroundImage = link;
      localStorage.setItem("blogbg", link);
      localStorage.setItem("bing", "false");
      if (document.getElementById("bingSet")) document.getElementById("bingSet").checked = false;
      // 提示切换成功
      new Vue({
        data: function () {
          this.$notify({
            title: "可以啦🍨",
            message: "切换自定义背景成功！",
            position: 'top-left',
            offset: 50,
            showClose: true,
            type: "success",
            duration: 5000
          });
        }
      })
    }).catch(() => {
      // 无效的图片链接，提示无效
      new Vue({
        data: function () {
          this.$notify({
            title: "链接不对🤣",
            message: "请输入有效的图片链接！",
            position: 'top-left',
            offset: 50,
            showClose: true,
            type: "warning",
            duration: 5000
          });
        }
      })
    })
  }
  // 判断图片链接是否可用
  function checkImgExists(imgurl) {
    return new Promise(function (resolve, reject) {
      var ImgObj = new Image();
      ImgObj.src = imgurl;
      ImgObj.onload = function (res) {
        resolve(res);
      }
      ImgObj.onerror = function (err) {
        reject(err);
      }
    })
  }
  
  // // 霓虹灯开关
  // var clk;  // 定时器对象
  // if (localStorage.getItem("light") == undefined) {
  //   localStorage.setItem("light", true);
  // }
  // if (localStorage.getItem("light") == "true") {
  //   clearInterval(clk);
  //   clk = setInterval(changeLightColor, 1200);
  // }
  // function setLight() {
  //   if (document.getElementById("lightSet").checked) {
  //     clearInterval(clk);
  //     clk = setInterval(changeLightColor, 1200);
  //     localStorage.setItem("light", "true");
  //   } else {
  //     clearInterval(clk);
  //     localStorage.setItem("light", "false");
  //     // 恢复默认
  //     if (document.getElementById("site-name"))
  //       document.getElementById("site-name").style.textShadow = "#1e1e1ee0 1px 1px 1px";
  //     if (document.getElementById("site-title"))
  //       document.getElementById("site-title").style.textShadow = "#1e1e1ee0 1px 1px 1px";
  //     if (document.getElementById("site-subtitle"))
  //       document.getElementById("site-subtitle").style.textShadow = "#1e1e1ee0 1px 1px 1px";
  //     if (document.getElementById("post-info"))
  //       document.getElementById("post-info").style.textShadow = "#1e1e1ee0 1px 1px 1px";
  //     try {
  //       document.getElementsByClassName("author-info__name")[0].style.textShadow = "";
  //       document.getElementsByClassName("author-info__description")[0].style.textShadow = "";
  //     } catch {
  
  //     }
  //   }
  // }
  
  // 创建窗口
  var winbox = "";
  
  function createWinbox() {
    let div = document.createElement("div");
    document.body.appendChild(div);
    winbox = WinBox({
      id: "meihuaBox",
      index: 99,
      title: "页面设置",
      x: "left",
      y: "center",
      minwidth: "300px",
      height: "60%",
      background: 'var(--theme-color)',
      onmaximize: () => {
        div.innerHTML = `<style>body::-webkit-scrollbar {display: none;} div#meihuaBox {width: 100% !important;}</style>`;
      },
      onrestore: () => {
        div.innerHTML = "";
      },
    });
    winResize();
    window.addEventListener("resize", winResize);
  
    // 每一类我放了一个演示，直接往下复制粘贴 a标签 就可以，需要注意的是 函数里面的链接 冒号前面需要添加反斜杠\进行转义
    winbox.body.innerHTML = `
  <div class="settings" style="display: block;">
  <div id="article-container" style="padding:12px;">
  <br>
  <center><p><button onclick="reset()" style="background:linear-gradient(to right, #fc354c, #0abfbc);display:block;width:40%;padding:15px 0;border-radius:30px;color:white;font-size:1.1em;"><i class="fa-solid fa-arrows-rotate"></i>&nbsp;恢复默认设置</button></p></center>
  
  <h2>一、显示偏好</h2>
  
  <div class="transValue" style="font-weight:bold;padding-left:10px">透明度 (0%-100%): ${curTransNum}%</div>
  <div class="range">
    <input id="transSet" type="range" min="0" max="100" step="1" value=${curTransNum} oninput="setTrans()">
    <p class="rang_width" id="rang_trans" style="width:${curTransMini}%"></p>
  </div>
  
  <div class="blurValue" style="font-weight:bold;padding-left:10px">模糊半径 (开启模糊生效 0px-100px): ${curBlur} px</div>
  <div class="range">
    <input id="blurSet" type="range" min="0" max="100" step="1" value="${curBlur}" oninput="setBlurNum()">
    <p class="rang_width" id="rang_blur" style="width:${miniBlur}%"></p>
  </div>
  
  <div class="content" style="display:flex">
    <div class="content-text" style="font-weight:bold; padding-left:10px"> 模糊效果 (消耗性能) </div><input type="checkbox" id="blur" onclick="setBlur()">
  </div>
  
  <div class="content" style="display:flex">
    <div class="content-text" style="font-weight:bold; padding-left:10px"> 雪花特效 (日间模式) </div><input type="checkbox" id="snowSet" onclick="setSnow()">
    <div class="content-text" style="font-weight:bold; padding-left:10px"> 星空特效 (夜间模式) </div><input type="checkbox" id="universeSet" onclick="setUniverse()">
  </div>
  
  <div class="content" style="display:flex">
    <div class="content-text" style="font-weight:bold; padding-left:10px"> 帧率监测 (刷新生效) </div><input type="checkbox" id="fpson" onclick="fpssw()">
    <div class="content-text" style="font-weight:bold; padding-left:20px"> 侧边栏 (默认开) </div><input type="checkbox" id="rightSideSet" onclick="toggleRightside()">
  </div>
  
  <div class="note warning modern"><p>非商免字体未经授权只能个人使用。本站为完全非商业、非盈利性质的网站，平时用于个人学习交流，如有侵权请联系站长删除，谢谢！ —— 致版权方</p>
</div>
  <p id="swfs">
  <a class="swf" id="swf_TZZAW" href="javascript:;" rel="noopener external nofollow" style="font-family:'TZZAW'!important;color:black" onclick="setFont('TZZAW')">筑紫A丸ゴシック</a>
  <a class="swf" id="swf_PingFang" href="javascript:;" rel="noopener external nofollow" style="font-family:'PingFang'!important;color:black" onclick="setFont('PingFang')">苹方</a>
  <a class="swf" id="swf_XWWK" href="javascript:;" rel="noopener external nofollow" style="font-family:'XWWK'!important;color:black" onclick="setFont('XWWK')">霞鹜文楷</a>
  <a class="swf" id="swf_CascadiaCode" href="javascript:;" rel="noopener external nofollow" style="font-family:'CascadiaCode'!important;color:black" onclick="setFont('CascadiaCode')">CascadiaCode</a>
  <a class="swf" id="swf_CascadiaCodeItalic" href="javascript:;" rel="noopener external nofollow" style="font-family:'CascadiaCodeItalic'!important;color:black" onclick="setFont('CascadiaCodeItalic')">CascadiaCodeItalic</a>
  <a class="swf" id="swf_TTQ" href="javascript:;" rel="noopener external nofollow" style="font-family:'TTQ'!important;color:black" onclick="setFont('TTQ')">甜甜圈海报</a>
  <a class="swf" id="swf_HYTangMeiRen55W" href="javascript:;" rel="noopener external nofollow" style="font-family:'HYTangMeiRen55W'!important;color:black" onclick="setFont('HYTangMeiRen55W')">汉仪唐美人</a>
  <a class="swf" id="swf_default" href="javascript:;" rel="noopener external nofollow" style="font-family:-apple-system, IBM Plex Mono ,monosapce,'微软雅黑', sans-serif;!important;color:black" onclick="setFont('default')">系统默认</a>
  </p>
  
  <h2>二、主题色设置</h2>
  <div class="content" style="display:flex"><input type="radio" id="red" name="colors" value=" "
          onclick="setColor('red')"><input type="radio" id="orange" name="colors" value=" "
          onclick="setColor('orange')"><input type="radio" id="yellow" name="colors" value=" "
          onclick="setColor('yellow')"><input type="radio" id="green" name="colors" value=" "
          onclick="setColor('green')"><input type="radio" id="blue" name="colors" value=" "
          onclick="setColor('blue')"><input type="radio" id="heoblue" name="colors" value=" "
          onclick="setColor('heoblue')"><input type="radio" id="darkblue" name="colors" value=" "
          onclick="setColor('darkblue')"><input type="radio" id="purple" name="colors" value=" "
          onclick="setColor('purple')"><input type="radio" id="pink" name="colors" value=" "
          onclick="setColor('pink')" checked="checked"><input type="radio" id="black" name="colors" value=" "
          onclick="setColor('black')"><input type="radio" id="blackgray" name="colors" value=" "
          onclick="setColor('blackgray')"></div>
  
  <h2>三、背景设置</h2>
  <p><button onclick="localStorage.removeItem('blogbg');location.reload();" style="background:#5fcdff;display:block;width:100%;padding: 15px 0;border-radius:6px;color:white;"><i class="fa-solid fa-arrows-rotate"></i> 点我恢复默认背景</button></p>
      
  <h3>电脑</h3>
  <details class="folding-tag" cyan><summary> 查看电脑背景 </summary>
              <div class='content'>
              <div class="bgbox"><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://cdn.neily.top/images/IMG_2767.webp)" class="imgbox" onclick="changeBg('url(https://cdn.neily.top/images/IMG_2767.webp)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://cdn.neily.top/images/IMG_2894.webp)" class="imgbox" onclick="changeBg('url(https://cdn.neily.top/images/IMG_2894.webp)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://cdn.neily.top/images/Pixiv_80518034.webp)" class="imgbox" onclick="changeBg('url(https://cdn.neily.top/images/Pixiv_80518034.webp)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://cdn.neily.top/images/Pixiv_102996140.webp)" class="imgbox" onclick="changeBg('url(https://cdn.neily.top/images/Pixiv_102996140.webp)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://cdn.neily.top/images/Pixiv_103406887.webp)" class="imgbox" onclick="changeBg('url(https://cdn.neily.top/images/Pixiv_103406887.webp)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://cdn.neily.top/images/Pixiv_103824706.webp)" class="imgbox" onclick="changeBg('url(https://cdn.neily.top/images/Pixiv_103824706.webp)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://cdn.neily.top/images/Pixiv_103931711.webp)" class="imgbox" onclick="changeBg('url(https://cdn.neily.top/images/Pixiv_103931711.webp)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://cdn.neily.top/images/Pixiv_103951571.webp)" class="imgbox" onclick="changeBg('url(https://cdn.neily.top/images/Pixiv_103951571.webp)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://cdn.neily.top/images/prima_doll_ep1_ed_cover.webp)" class="imgbox" onclick="changeBg('url(https://cdn.neily.top/images/prima_doll_ep1_ed_cover.webp)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://cdn.neily.top/images/prima_doll_ep2_ed_cover.webp)" class="imgbox" onclick="changeBg('url(https://cdn.neily.top/images/prima_doll_ep2_ed_cover.webp)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://cdn.neily.top/images/prima_doll_ep3_ed_cover.webp)" class="imgbox" onclick="changeBg('url(https://cdn.neily.top/images/prima_doll_ep3_ed_cover.webp)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://cdn.neily.top/images/prima_doll_ep4_ed_cover.webp)" class="imgbox" onclick="changeBg('url(https://cdn.neily.top/images/prima_doll_ep4_ed_cover.webp)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://cdn.neily.top/images/prima_doll_ep5_ed_cover.webp)" class="imgbox" onclick="changeBg('url(https://cdn.neily.top/images/prima_doll_ep5_ed_cover.webp)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://cdn.neily.top/images/night_img_pc.webp)" class="imgbox" onclick="changeBg('url(https://cdn.neily.top/images/night_img_pc.webp)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://cdn.neily.top/images/IMG_2285.webp)" class="imgbox" onclick="changeBg('url(https://cdn.neily.top/images/IMG_2285.webp)')"></a></div>
              </div>
            </details>
  
  <h3>手机</h3>
  <details class="folding-tag" cyan><summary> 查看手机背景 </summary>
              <div class='content'>
              <div class="bgbox"><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://cdn.neily.top/images/IMG_3468.webp)" class="pimgbox" onclick="changeBg('url(https://cdn.neily.top/images/IMG_3468.webp)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://cdn.neily.top/images/IMG_3323.webp)" class="pimgbox" onclick="changeBg('url(https://cdn.neily.top/images/IMG_3323.webp)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://cdn.neily.top/images/Pixiv_98151668.webp)" class="pimgbox" onclick="changeBg('url(https://cdn.neily.top/images/Pixiv_98151668.webp)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://cdn.neily.top/images/Pixiv_100360926.webp)" class="pimgbox" onclick="changeBg('url(https://cdn.neily.top/images/Pixiv_100360926.webp)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://cdn.neily.top/images/Pixiv_101543297.webp)" class="pimgbox" onclick="changeBg('url(https://cdn.neily.top/images/Pixiv_101543297.webp)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://cdn.neily.top/images/Pixiv_95803021.webp)" class="pimgbox" onclick="changeBg('url(https://cdn.neily.top/images/Pixiv_95803021.webp)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://cdn.neily.top/images/Pixiv_101838628.webp)" class="pimgbox" onclick="changeBg('url(https://cdn.neily.top/images/Pixiv_101838628.webp)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://cdn.neily.top/images/Pixiv_102359605.webp)" class="pimgbox" onclick="changeBg('url(https://cdn.neily.top/images/Pixiv_102359605.webp)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://cdn.neily.top/images/Pixiv_103286041.webp)" class="pimgbox" onclick="changeBg('url(https://cdn.neily.top/images/Pixiv_103286041.webp)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://cdn.neily.top/images/Pixiv_104098752_0.webp)" class="pimgbox" onclick="changeBg('url(https://cdn.neily.top/images/Pixiv_104098752_0.webp)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://cdn.neily.top/images/Pixiv_104121656.webp)" class="pimgbox" onclick="changeBg('url(https://cdn.neily.top/images/Pixiv_104121656.webp)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://cdn.neily.top/images/Pixiv_104202526.webp)" class="pimgbox" onclick="changeBg('url(https://cdn.neily.top/images/Pixiv_104202526.webp)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://cdn.neily.top/images/Pixiv_104204067.webp)" class="pimgbox" onclick="changeBg('url(https://cdn.neily.top/images/Pixiv_104204067.webp)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://cdn.neily.top/images/Pixiv_104268098.webp)" class="pimgbox" onclick="changeBg('url(https://cdn.neily.top/images/Pixiv_104268098.webp)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://cdn.neily.top/images/Pixiv_104270940.webp)" class="pimgbox" onclick="changeBg('url(https://cdn.neily.top/images/Pixiv_104270940.webp)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://cdn.neily.top/images/Pixiv_104276681.webp)" class="pimgbox" onclick="changeBg('url(https://cdn.neily.top/images/Pixiv_104276681.webp)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://cdn.neily.top/images/Pixiv_104331161.webp)" class="pimgbox" onclick="changeBg('url(https://cdn.neily.top/images/Pixiv_104331161.webp)')"></a></div>
              </div>
            </details>
          
          
          
          
  <h3>渐变色</h3>
  <details class="folding-tag" cyan><summary> 查看渐变色背景 </summary>
              <div class='content'>
              <div class="bgbox"><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to right, #544a7d, #ffd452)" onclick="changeBg('linear-gradient(to right, #544a7d, #ffd452)')"></a><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to bottom, #7f7fd5, #86a8e7, #91eae4)" onclick="changeBg('linear-gradient(to bottom, #7f7fd5, #86a8e7, #91eae4)')"></a><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to left, #654ea3, #eaafc8)" onclick="changeBg('linear-gradient(to left, #654ea3, #eaafc8)')"></a><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to top, #feac5e, #c779d0, #4bc0c8)" onclick="changeBg('linear-gradient(to top, #feac5e, #c779d0, #4bc0c8)')"></a><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to top, #d3959b, #bfe6ba)" onclick="changeBg('linear-gradient(to top, #d3959b, #bfe6ba)')"></a><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to top, #8360c3, #2ebf91)" onclick="changeBg('linear-gradient(to top, #8360c3, #2ebf91)')"></a><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to top, #108dc7, #ef8e38)" onclick="changeBg('linear-gradient(to top, #108dc7, #ef8e38)')"></a><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to top, #355c7d, #6c5b7b, #c06c84)" onclick="changeBg('linear-gradient(to top, #355c7d, #6c5b7b, #c06c84)')"></a></div>
              </div>
            </details>
          
      
  <h3>纯色</h3>
  <details class="folding-tag" cyan><summary> 查看纯色背景 </summary>
              <div class='content'>
              <div class="bgbox"><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #ecb1b1" onclick="changeBg('#ecb1b1')"></a><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #d3ebac" onclick="changeBg('#d3ebac')"></a><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #ace9ce" onclick="changeBg('#ace9ce')"></a><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #c1ebea" onclick="changeBg('#c1ebea')"></a><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #dee7f1" onclick="changeBg('#dee7f1')"></a><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #e9e3f2" onclick="changeBg('#e9e3f2')"></a><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #f7eff5" onclick="changeBg('#f7eff5')"></a><input type="color" id="define_colors" href="javascript:;" rel="noopener external nofollow" class="box" autocomplete="on" value="${defineColor}" oninput="changeBgColor()"></input></div>
              </div>
            </details>
  
  
  <h3>壁纸API</h3>
  <details class="folding-tag" cyan><summary> 查看壁纸API背景 </summary>
              <div class='content'>
              <div class="bgbox"><a id="bingDayBox" rel="noopener external nofollow" style="background-image: ${bingDayBg}" class="box apiBox" onclick="changeBg('${bingDayBg}')"></a><a id="bingHistoryBox" rel="noopener external nofollow" style="background-image: ${bingHistoryBg}" class="box apiBox" onclick="changeBg('${bingHistoryBg}')"></a><a id="EEEDogBox" rel="noopener external nofollow" style="background-image: ${EEEDog}" class="box apiBox" onclick="changeBg('${EEEDog}')"></a><a id="picsumBox" rel="noopener external nofollow" style="background-image: ${picsum}" class="box apiBox" onclick="changeBg('${picsum}')"></a><a id="waiBizhiBox" rel="noopener external nofollow" style="background-image: ${waiBizhi}" class="box apiBox" onclick="changeBg('${waiBizhi}')"></a><a id="unsplashBox" rel="noopener external nofollow" style="background-image: ${unsplash}" class="box apiBox" onclick="changeBg('${unsplash}')"></a><a id="touhouBox" rel="noopener external nofollow" style="background-image: ${touhou}" class="box apiBox" onclick="changeBg('${touhou}')"></a></div>
              </div>
            </details>
      
      
  <h3>自定义背景</h3>
  <details class="folding-tag" cyan><summary> 设置自定义背景 </summary>
              <div class='content'>
              <p><center><input type="text" id="pic-link" size="70%" maxlength="1000" placeholder="请输入有效的图片链接，如 https://cdn.neily.top/images/IMG_2285.webp"></center></p><p><center><button type="button" onclick="getPicture()" style="background:var(--theme-color);width:35%;padding: 5px 0px 7px 0px;border-radius:30px;color:white;line-height:2;">🌈切换背景🌈</button></center></p>
              </div>
            </details>
  
  <br>
  <center><div style="font-size:1.2em;color:var(--theme-color);font-weight:bold;">------ ( •̀ ω •́ )y 到底啦 ------</div></center>
  <br>
  
  </div>
  
  </div>
  
  `;
  
    // 打开小窗时候初始化
    $("#" + localStorage.getItem("themeColor")).attr("checked", true);
    // if (localStorage.getItem("blur") == 1) {
    //   document.getElementById("blur").checked = true;
    // } else {
    //   document.getElementById("blur").checked = false;
    // }
    if (localStorage.getItem("universe") == "block") {
      document.getElementById("universeSet").checked = true;
    } else if (localStorage.getItem("universe") == "none") {
      document.getElementById("universeSet").checked = false;
    }
    if (localStorage.getItem("snow") == "block") {
      document.getElementById("snowSet").checked = true;
    } else if (localStorage.getItem("universe") == "none") {
      document.getElementById("snowSet").checked = false;
    }
    if (localStorage.getItem("fpson") == "1") {
      document.getElementById("fpson").checked = true;
    } else {
      document.getElementById("fpson").checked = false;
    }
    if (localStorage.getItem("rs") == "block") {
      document.getElementById("rightSideSet").checked = true;
    } else if (localStorage.getItem("rs") == "none") {
      document.getElementById("rightSideSet").checked = false;
    }
    // if (localStorage.getItem("bing") == "true") {
    //   document.getElementById("bingSet").checked = true;
    // } else {
    //   document.getElementById("bingSet").checked = false;
    // }
    // if (localStorage.getItem("light") == "true") {
    //   document.getElementById("lightSet").checked = true;
    // } else {
    //   document.getElementById("lightSet").checked = false;
    // }
    // setFontBorder();
  
  }
  
  // 恢复默认背景
  function resetBg() {
    localStorage.removeItem('blogbg');
    reload();
  }
  
  // 恢复默认设置并刷新页面
  function reset() {
    clearItem();
    reload();
  }
  
  // 适应窗口大小
  function winResize() {
    try {
      var offsetWid = document.documentElement.clientWidth;
      if (offsetWid <= 768) {
        winbox.resize(offsetWid * 0.95 + "px", "90%").move("center", "center");
      } else {
        winbox.resize(offsetWid * 0.6 + "px", "70%").move("center", "center");
      }
    } catch (err) {
      // console.log("Pjax毒瘤抽风运行winResize方法🙄🙄🙄");
    }
  }
  
  // 切换状态，窗口已创建则控制窗口显示和隐藏，没窗口则创建窗口
  function toggleWinbox() {
    if (document.querySelector("#meihuaBox")) {
      winbox.toggleClass("hide");
    } else {
      createWinbox();
    };
  }
  