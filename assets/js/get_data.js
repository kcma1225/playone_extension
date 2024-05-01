// ================================= <gift list> =============================
export function get_InputUsers() {
    const receiverSelectValue = document.getElementById('receiverSelect').value;
    const inputContainer = document.getElementById("inputContainer");
    const inputs = inputContainer.querySelectorAll("input[type='text']");
    const users = [];
    
    if (receiverSelectValue !== 'none'){
        users.push(receiverSelectValue)
    }

    inputs.forEach(function(input) {
        if (input.value.trim() !== "") {
            users.push(input.value.trim());
        }
    });
    return users;
}

export function get_gifts_list(){
    const giftSelectValue = document.getElementById('giftSelect').value;
    return giftSelectValue
}

export function get_quantity(){
    const quantityInputValue = document.getElementById("quantityInput").value
    return quantityInputValue
}

export function time_formatter(originalTime){
    const date = new Date(originalTime);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0'); 
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0'); 
    const seconds = date.getSeconds().toString().padStart(2, '0'); 

    const formattedDate = `${year}-${month}-${day}`;
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    return {'date' : formattedDate,
            'time' : formattedTime}
}