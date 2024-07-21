
const tips = document.querySelector(".tip-container");
const tipPercent = document.querySelectorAll(".tip");
const tipAmount = document.querySelector("#tip-amount");
const total = document.querySelector("#total-amount");
const billPerPerson = document.querySelector("#bill-per-person");
const generate = document.querySelector("#generate-bill");
const resetBtn = document.querySelector("#reset");
const billAmountIn = document.querySelector("#bill-amount");
const customTip = document.querySelector("#custom-tip");
const pepole = document.querySelector("#nopeople");

let tip = 0;

function toggleActive() {
    [...tips.children].forEach(node => {
        node.classList.remove("active");
    })
}

billAmountIn.addEventListener('input', () => {
    if(billAmountIn.value.length > 0){
        customTip.disabled = false;
        tips.classList.remove("disable");
    }else{
        customTip.disabled = true;
        tips.classList.add("disable");
        toggleActive();
    }
})

customTip.addEventListener('input', () => {
    tip = parseInt(customTip.value);
    if(customTip.value.length > 0){
        pepole.disabled = false;
    }else{
        pepole.disabled = true;
        pepole.value = undefined;
        generate.disabled = true;
    }
    toggleActive();
})

pepole.addEventListener('input', () => {
    if(pepole.value > 0){
        generate.disabled = false;
    }else{
        generate.disabled = true;
    }
})

tips.addEventListener('click', (e) => {
    if(tips.classList.contains('disable')) return;
    if (e.target != tips) {
        toggleActive();
        document.querySelector("#custom-tip").value = 0;
        const item = e.target;
        tip = parseInt(item.innerText)/100 * billAmountIn.value;
        item.classList.toggle("active");
        pepole.disabled = false;
    }
})



generate.addEventListener('click', () => {
    const billAmount = parseInt(billAmountIn.value);
    const noOfPeople = parseInt(pepole.value);
    resetBtn.disabled = false;
    if (customTip < 0) {
        tip = 0;
    }
    const totalBill = billAmount + tip;
    const perPersonBill = (totalBill / noOfPeople).toFixed(2);
    total.innerHTML = `&#x20b9 ${totalBill}`;
    billPerPerson.innerHTML = `&#x20b9 ${perPersonBill}`;
    tipAmount.innerHTML = `&#x20b9 ${tip}`;
})

function reset() {
    total.innerHTML = "";
    billPerPerson.innerHTML = "";
    tipAmount.innerHTML = "";
    resetBtn.disabled = true;
    billAmountIn.value = ""
    billAmountIn.disabled = true;
    tip = undefined;
    customTip.value = 0;
    customTip.disabled =true;
    toggleActive();
    pepole.value = undefined;
    pepole.disabled = true;
    tips.classList.add("disable");
    generate.disabled = true;
}