// 監聽從 popup.js 發送過來的訊息
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    // 檢查訊息類型
    if (message.type === 'formSubmitted') {
        sendResponse({result: message.u_id}); // 確保在這裡呼叫 sendResponse

        
    } else if(message.type === 'get_list'){
        fetch('https://api.goplayone.com/api/gift/v3/list', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'User-Token': message.u_token,
              'User-Id': message.u_id
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

        // 返回 true 告訴 Chrome 保持 sendResponse 的可用性
        return true;
    }
});
