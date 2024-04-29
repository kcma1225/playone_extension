export async function send_Gift_Requests(userId, userToken, room_id, gift_id, recevier, times, amount = 1) {  
    const requests = [];
    const msg_list = []
    const postData = {
        user_list: recevier,
        gift_id: gift_id,
        amount: amount,
        room_id: room_id
    };

    
    for (let i = 0; i < times; i++) {
        requests.push(fetch('https://api.goplayone.com/api/voice_room/v1/gift_users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'User-Token': userToken,
                'User-Id': userId
            },
            body: JSON.stringify(postData),
        }));
    }
    
    try {
        const responses = await Promise.all(requests);

        for (const response of responses) {
            const responseData = await response.json();
           
            if (responseData.msg.includes("用戶不存在")){
                msg_list.push("錯誤！🙍🏻‍♂️用戶不存在")
                break
            }
            else if (responseData.msg.includes("鑽石")){
                msg_list.push("錯誤！💎鑽石數量不足")
                break
            }
            else if(responseData.msg.includes("參數錯誤")){
                msg_list.push("錯誤！🎁禮物ID不存在")
                break
            }
            else if(responseData.msg.includes("successful")){
                msg_list.push("✅成功")
            }
            else{
                msg_list.push("❌錯誤")
                break
            }
        }
        return msg_list
    } catch (error) {
        msg_list.push("失敗")
        return msg_list
    }
    

}


chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    
    if (message.type === 'formSubmitted') {
        var responseText = '';
        var isSuccessd = 0

        if (!(message.receiver.length === 0) && !(message.quantity <= 0)) {
            isSuccessd = 1;
            send_Gift_Requests(message.u_id, message.u_token, message.room_id, message.gift, message.receiver, message.quantity)
            .then(data => {
                responseText = data[0];
                console.log(responseText);
        
                sendResponse({
                    status: isSuccessd, 
                    result: data
                });
            })
            .catch(error => {
                console.error(error);
                sendResponse({
                    status: isSuccessd, 
                    result: 'Error occurred while sending gift requests'
                });
            });
        } else {
            sendResponse({
                status: isSuccessd, 
                result: 'Invalid receiver or quantity'
            });
        }

        return true;
    } 
    
    else if(message.type === 'get_gifts_list'){ 
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
    } 

    else if(message.type === 'get_members_list'){
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

    else if(message.type === 'get_gache_message'){ 
        const room_id = message.room_id
        const gift_api = `https://api.goplayone.com/api/voice_room/v1/last_messages?room_id=${room_id}`
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
            for (let i of data.data){
                item_list[index] = [{'name':i.name, 'id':i.id, 'price':i.price}];
                index++
             }
            sendResponse ({result: item_list})
        })
        .catch(error => sendResponse({result: error.message}));

        
        return true;
    } 
});
