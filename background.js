
// 監聽從 popup.js 發送過來的訊息
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    // 檢查訊息類型
    if (message.type === 'formSubmitted') {
        const text = `你選擇的禮物是${message.gift} \n 送禮人是${message.receiver} \n 共${message.quantity}份`
        sendResponse({result: text}); // 確保在這裡呼叫 sendResponse

        
    } else if(message.type === 'get_gifts_list'){
        const gift_api = `https://api.goplayone.com/api/gift/v3/list`
        fetch(gift_api, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'User-Id': message.u_id,
              'User-Token': message.u_token
            }
          })
        .then(response => response.json())
        .then(data => {
            const item_list = []
            let index = 0
            for (let i of data.data.hot){
                item_list[index] = [{'name':i.name, 'id':i.id, 'price':i.price}];
                index++
             }
            sendResponse ({result: item_list})
        })
        .catch(error => sendResponse({result: error.message}));

        
        return true;

    } else if(message.type === 'get_members_list'){
        const room_id = message.room_id
        const room_url =  `https://msg.goplayone.com/api/voice_room/v1/supervisor?room_id=${room_id}`;
        fetch(room_url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'User-Id': message.u_id,
              'User-Token': message.u_token
            }
          })
        .then(response => response.json())
        .then(data => {
            sendResponse({result: data.data});
        })
        .catch(error => sendResponse({result: error.message}));

        return true;
    }
});
