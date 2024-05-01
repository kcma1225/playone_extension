import { time_formatter } from './assets/js/get_data.js'

document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const u_id = urlParams.get('user_id');
    const u_token = urlParams.get('user_token');
    const room_id = urlParams.get('room_id');
    const api_msg = `https://api.goplayone.com/api/voice_room/v1/last_messages?room_id=${room_id}`
    const api_me = `https://api.goplayone.com/api/user/v1/info/me`


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
    fetch(api_me, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'User-Token': u_token,
          'User-Id': u_id
        }
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('u_id').innerText = u_id;
        document.getElementById('u_token').innerText = u_token;
        document.getElementById('room_id').innerText = room_id;
        })
        .catch(error => console.error('Error:', error));




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
                const time = time_formatter(item.update_time).date + " - " +time_formatter(item.update_time).time
                const row = document.createElement('tr');
                row.innerHTML = `
                <td>${time}</td>
                <td>${item.user_name}</td>
                <td>${item.format}</td>
                <td>${item.content}</td>
                `;
                document.getElementById('table-body').appendChild(row);
        });
        })
        .catch(error => console.error('Error:', error));
});