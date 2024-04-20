import { get_InputUsers , get_gifts_list , get_quantity} from '../assets/js/get_data.js'
import { form1_f } from './function1.js'

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
const selectButton = document.getElementById('selectButton');
const form = document.querySelector('form')
const giftSelect = document.getElementById("giftSelect");
const receiverSelect = document.getElementById("receiverSelect");
const fillQuantityButton = document.getElementById("fillQuantity");
const quantityInput = document.getElementById("quantityInput");
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
selectButton.style.display = 'none'
giftSelect.innerHTML = '';




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


      
      chrome.cookies.getAll({url: url}, cookies => {
        try {
          var room_id = (url_parse[(url_parse.length)-1])
          var category = (url_parse[(url_parse.length)-2])
        }catch(error){}

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
        selectButton.style.display = 'block'
        form.style.display = 'block'
        form1_f(cookiesMap,room_id)
        
     
        selectButton.addEventListener('change', function() {
            const selectedValue = selectButton.value;
            
            // cancel
            const currentForm = document.querySelector('form:not([style="display: none;"])');
            currentForm.style.display = 'none';
            
            // display
            const selectedForm = document.getElementById(selectedValue);
            selectedForm.style.display = 'block';
        });

        
        
      //================================== </submit> ======================================
        
    });
  });
});