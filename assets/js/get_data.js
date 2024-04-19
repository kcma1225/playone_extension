
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