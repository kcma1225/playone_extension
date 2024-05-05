
export function form3_f(cookiesMap,room_id){

  //chrome.runtime.sendMessage({
  //    type: 'get_gacha_message',
  //    room_id: room_id,
  //    u_id: cookiesMap['USER_ID'].value,
  //    u_token: cookiesMap['USER_TOKEN'].value
//
  //}, function(r) {
  //    for (let msg of r.result){
  //        document.getElementById('msgtest').textContent = msg
  //    }
  //});

  // 定義一個函式，用於更新特定元素的內容
  function updateMessage(resultLength) {
    document.getElementById('msgtest').textContent = resultLength;
  }


  document.getElementById("msglistButton").addEventListener("click", function(event) {
      event.preventDefault();
    
      var user_id = cookiesMap['USER_ID'].value;
      var user_token = cookiesMap['USER_TOKEN'].value;
      var url = "../msglist.html?user_id=" + encodeURIComponent(user_id) + "&user_token=" + encodeURIComponent(user_token)+ "&room_id=" + encodeURIComponent(room_id);
    
      
      window.open(url, "_blank");
  });
}