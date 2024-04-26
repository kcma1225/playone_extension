import { get_InputUsers , get_gifts_list , get_quantity} from '../assets/js/get_data.js'

//form tag
const form = document.querySelector('form')
const giftSelect = document.getElementById("giftSelect");
const receiverSelect = document.getElementById("receiverSelect");
const fillQuantityButton = document.getElementById("fillQuantity");
const quantityInput = document.getElementById("quantityInput");
//basic variable
const p4 = document.getElementById('p4')



// ================================= <gift list> =============================
export function form1_f(cookiesMap,room_id){
    chrome.runtime.sendMessage({
        type: 'get_gifts_list',
        u_id: cookiesMap['USER_ID'].value,
        u_token: cookiesMap['USER_TOKEN'].value
    }, function(r) {
        
        r.result.forEach(function(gift){
        var option = document.createElement('option');
        option.value = gift[0].id; 
        option.textContent = gift[0].name; 
        giftSelect.appendChild(option); 
    })
    });

    // ================================= </gift list> =============================



    // ================================= <receiver list> =============================
    chrome.runtime.sendMessage({
        type: 'get_members_list',
        room_id: room_id,
        u_id: cookiesMap['USER_ID'].value,
        u_token: cookiesMap['USER_TOKEN'].value

    }, function(r) {
        for (let member of r.result){
            var option = document.createElement('option');
            option.value = member.user_id; // 設置選項的值為禮物的id
            option.textContent = member.nickname; // 設置選項的顯示文字為禮物的名稱
            receiverSelect.appendChild(option); // 將選項新增到select元素中
        }
        
    });

    document.getElementById("addInputButton").addEventListener("click", function() {
        var inputContainer = document.getElementById("inputContainer");
        var newInput = document.createElement("input");
        newInput.type = "text";
        newInput.placeholder = "輸入ID";

        // 創建刪除按鈕
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "刪除";
        deleteButton.classList.add("delete");
        deleteButton.addEventListener("click", function() {
            inputContainer.removeChild(newInput);
            inputContainer.removeChild(deleteButton);
        });

        inputContainer.appendChild(newInput);
        inputContainer.appendChild(deleteButton);
    });

    // ================================= </receiver list> ==============================

    

    // ================================= <quantity> ==============================

    
    fillQuantityButton.addEventListener("click", function(event) {
        event.preventDefault()
        quantityInput.value = "10";
    });
    // ================================= </quantity> ==============================




    //================================== <submit> ======================================
    document.getElementById('submitButton').addEventListener('click', function(event) {
        event.preventDefault();

        const giftSelectValue = document.getElementById('giftSelect').value;
        const receiverSelectValue = document.getElementById('receiverSelect').value;
        const quantityInputValue = document.getElementById('quantityInput').value;
        
        chrome.runtime.sendMessage({
            type: 'formSubmitted',
            gift: get_gifts_list(),
            receiver: get_InputUsers(),
            quantity: get_quantity(),
            
            u_id: cookiesMap['USER_ID'].value,
            u_token: cookiesMap['USER_TOKEN'].value,
            room_id: room_id
        }, function(r) {
        const isSuccessd= r.status
        if (!isSuccessd){
            p4.textContent = "輸入尚未完整，請確認每個欄位皆有輸入"
            return
        }
            p4.textContent = r.result[0]
        });
    });
}