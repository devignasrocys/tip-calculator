const dom_strings = {
    bill_input: document.getElementById('bill'),
    people_count: document.getElementById('people-count'),
    tip_list: document.getElementById('tip-list'),
    tip_btns: document.querySelectorAll('li'),
    custom_btn: document.getElementById('btn-custom'),

    tip_amount: document.getElementById('tip-amount'),
    total_p_person: document.getElementById('total-person'),

    btn: document.getElementById('btn')
}

const current_status = {
    bill: 0,
    persons: 0,
    current_tip: 0
}

const calculateTip = (bill, tip, persons) => {
    return (bill * tip / 100) / persons
}

const calculateTotal = (bill, tip_amount, persons) => {
    return bill / persons + tip_amount
}

const update_ui = (tip_amount, total, persons) => {
    if(current_status.bill > 0 && current_status.persons > 0 && current_status.current_tip > 0) {
        let tip = calculateTip(tip_amount, total, persons)
        let total_p_person = calculateTotal(current_status.bill, tip, current_status.persons)
        dom_strings.tip_amount.innerText = `$${tip}`
        dom_strings.total_p_person.innerText = `$${total_p_person}`
    }
}

dom_strings.tip_list.addEventListener('click', (e) => {
    dom_strings.tip_btns.forEach(elm => elm.classList.remove('active'))
    e.target.classList.add('active')
    current_status.current_tip = Number(e.target.classList[0])
    update_ui(current_status.bill, current_status.current_tip,current_status.persons)
})

dom_strings.bill_input.addEventListener("keyup", () => {
    current_status.bill = Number(dom_strings.bill_input.value)
    update_ui(current_status.bill, current_status.current_tip,current_status.persons)
})

dom_strings.people_count.addEventListener('keyup', () => {
    current_status.persons = Number(dom_strings.people_count.value)
    update_ui(current_status.bill, current_status.current_tip,current_status.persons)
})

dom_strings.custom_btn.addEventListener('keyup', (e) => {
    current_status.current_tip = Number(e.target.value)
    update_ui(current_status.bill, (current_status.current_tip),current_status.persons)
    console.log(current_status)
})

dom_strings.btn.addEventListener('click', () => {
    current_status.bill = 0;
    current_status.persons = 0;
    current_status.current_tip = 0;
    dom_strings.bill_input.value = 0;
    dom_strings.people_count.value = 0;
    dom_strings.custom_btn.value = 0;
    dom_strings.tip_btns.forEach(elm => elm.classList.remove('active'))
    dom_strings.tip_amount.innerText = `$0.00`
    dom_strings.total_p_person.innerText = `$0.00`
})