import { time_formatter } from './assets/js/get_data.js'

function localStorageChecker(argument) { //True - replicate | False - not replicate, can put in
    for (var key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        var value = localStorage.getItem(key);
        if (value === argument) {
          return true;
        }
      }
    }
    return false;
  }

  function saveToLocalStorage(key, data) {
    var jsonData = JSON.stringify(data);
    
    localStorage.setItem(key, jsonData);
  }

document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const u_id = urlParams.get('user_id');
    const u_token = urlParams.get('user_token');
    const room_id = urlParams.get('room_id');
    const api_msg = `https://api.goplayone.com/api/voice_room/v1/last_messages?room_id=${room_id}`
    const api_me = `https://api.goplayone.com/api/user/v1/info/me`

    // ----- display information about profile--------------------------------
    const idItem = document.querySelector('.menu-item[data-info="ID"]');
    const tokenItem = document.querySelector('.menu-item[data-info="Token"]');
    const roomItem = document.querySelector('.menu-item[data-info="Room"]');
    idItem.setAttribute('data-info', `${u_id}`);
    tokenItem.setAttribute('data-info', `${u_token}`);
    roomItem.setAttribute('data-info', `${room_id}`);

    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        const infoBox = document.createElement('div');
        infoBox.classList.add('info-box');
        infoBox.textContent = item.getAttribute('data-info');
        item.appendChild(infoBox);
    
        item.addEventListener('mouseover', () => {
            infoBox.style.display = 'block';
        });
    
        item.addEventListener('mouseout', () => {
            infoBox.style.display = 'none';
        });
    });
    // -----------------------------------------------------------------------
    
    // Refreshing by the time,
    setInterval(async () => {
        fetch(api_msg, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'User-Token': u_token,
                'User-Id': u_id
            }
            })
            .then(response => response.json())
            .then(data => {
                data.data.forEach((item) => {
                    if (item.format == 'text'){
                        const gacha_list = []
                        const time = time_formatter(item.update_time).date + " - " +time_formatter(item.update_time).time
                        var items = {
                            message_id: item.message_id,
                            update_time: time,
                            nickname: item.nickname,
                            gift_name: item.gift_name,
                            number: item.number
                        }
                        const row = document.createElement('tr');
                        row.innerHTML = `
                        <td>${time}</td>
                        <td>${items.nickname}</td>
                        <td>${item.gift_name}</td>
                        <td>${item.number}</td>
                        `;
                        document.getElementById('table-body').appendChild(row);
                        gacha_list.push(items)
                    }
                });
            })
            .catch(error => console.error('Error:', error)); 
             
            
            
    },3000);
});