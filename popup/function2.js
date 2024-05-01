import { get_InputUsers , get_gifts_list , get_quantity} from '../assets/js/get_data.js'

const test_text = document.getElementById("pe5") 

export function form2_f(cookiesMap,room_id){
    document.getElementById("form2_btn").addEventListener("click", function(event) {
        event.preventDefault();
       // 獲取 localStorage 中存儲的所有鍵值對
       var text = ""
       
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const value = localStorage.getItem(key);
            text = `key = ${key} | value = ${value} \n`
        }
  
        test_text.textContent = text
        
    });
}