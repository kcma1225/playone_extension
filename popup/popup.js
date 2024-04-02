//dom tree
//p tag
const p1 = document.getElementById('p1')
const p2 = document.getElementById('p2')
const p3 = document.getElementById('p3')
const p4 = document.getElementById('p4')
//t tag
const t1 = document.getElementById('t1')
const t2 = document.getElementById('t2') 
const t3 = document.getElementById('t3')
const t4 = document.getElementById('t4') 
//form tag
const form = document.querySelector('form')
const giftSelect = document.getElementById("giftSelect");

//basic variable
const fail_color = "#ED2939"
const success_color = "#5cb85c"
const check_url_name = "goplayone.com"
let cookiesMap = {}
var room_id , category

//basic html settings
form.style.display = 'none'
p1.textContent = "非PLAYONE網站，無法使用"
p1.style.color = fail_color
t2.style.display = 'none'
t3.style.display = 'none'
giftSelect.innerHTML = '';

//testing data
const giftOptions = {
  gift1: "禮物一",
  gift2: "禮物二",
  gift3: "禮物三"
};


document.addEventListener('DOMContentLoaded', function () {
  chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {

      if (!(tabs && tabs[0] && tabs[0].url)) {
        return}
      
      const url = tabs[0].url

      if (!url.includes(check_url_name) || (url.trim() === '')){ 
        return}

      p1.textContent = "已連接Playone網站"
      p1.style.color = success_color
      var url_parse = url.split("/")
      try {
        var room_id = (url_parse[(url_parse.length)-1])
        var category = (url_parse[(url_parse.length)-2])
      }catch(error){}

      
      chrome.cookies.getAll({url: url}, cookies => {
        cookies.forEach(cookie => {
          if (cookie.name == 'USER_ID' || cookie.name == 'USER_TOKEN'){
            cookiesMap[cookie.name] = {
                value: cookie.value,
            };
          }
        });
        
        //--------------------------------------------------t2 show
        t2.style.display = 'block'
        //--------------------------------------------------p2 status
        if (Object.keys(cookiesMap).length === 0){
          p2.textContent = "尚未登入或操作錯誤"
          p2.style.color = fail_color
          return
        }
        p2.textContent = "成功登入"
        p2.style.color = success_color
        //--------------------------------------------------


        //--------------------------------------------------t3 show
        t3.style.display = 'block'
        //--------------------------------------------------p3 status
        if (category != 'voice'){
          p3.textContent = "未進入語音頻道"
          p3.style.color = fail_color
          return
        }
        p3.textContent = "已進入語音頻道"
        p3.style.color = success_color
        //--------------------------------------------------

        form.style.display = 'block'

        // ================================= <gift list> =============================
        chrome.runtime.sendMessage({
          type: 'get_list',
          u_id: cookiesMap['USER_ID'].value,
          u_token: cookiesMap['USER_TOKEN'].value
        }, function(r) {
          
          r.result.forEach(function(gift){
            var option = document.createElement('option');
            option.value = gift[0].id; // 設置選項的值為禮物的id
            option.textContent = gift[0].name; // 設置選項的顯示文字為禮物的名稱
            giftSelect.appendChild(option); // 將選項新增到select元素中
        })
      });

        // ================================= </gift list> =============================

        document.querySelector('form').addEventListener('submit', function(event) {
          // 防止表單默認提交行為
          event.preventDefault();
  
          // 獲取表單中的資料
          const giftSelectValue = document.getElementById('giftSelect').value;
          const receiverSelectValue = document.getElementById('receiverSelect').value;
          const quantityInputValue = document.getElementById('quantityInput').value;
  
          // 發送訊息給 background.js
          chrome.runtime.sendMessage({
              type: 'formSubmitted',
              gift: giftSelectValue,
              receiver: receiverSelectValue,
              quantity: quantityInputValue,
              u_id: cookiesMap['USER_ID'].value,
              u_token: cookiesMap['USER_TOKEN'].value,
          }, function(r) {
              p4.textContent = giftSelect.value
          });
      });
        
      });
  });
});

