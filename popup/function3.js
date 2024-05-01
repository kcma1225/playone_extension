
export function form3_f(cookiesMap,room_id){
  document.getElementById("msglistButton").addEventListener("click", function(event) {
      event.preventDefault();
    
      var user_id = cookiesMap['USER_ID'].value;
      var user_token = cookiesMap['USER_TOKEN'].value;
      var url = "../msglist.html?user_id=" + encodeURIComponent(user_id) + "&user_token=" + encodeURIComponent(user_token)+ "&room_id=" + encodeURIComponent(room_id);
    
      // 打開新的網頁
      window.open(url, "_blank");
  });
}