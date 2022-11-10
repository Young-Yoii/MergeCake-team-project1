const $basketSubmit = document.querySelector("#basketSubmit");

const local = localStorage;
const data = {};

let number = 0;

$basketSubmit.addEventListener('click', function(e) {

    if (local.length === 0) number = 0;

    const $options = document.querySelectorAll('input[type="radio"]:checked');

    if ($options.length === 0) {
        alert('옵션을 선택해주세요.');
        return;
    }

    const btns = document.querySelectorAll('input[type="radio"]:checked+div>span');
    console.log(btns);

    // const lettering = document.querySelector('input[type="text"]').value;
    let total = 0; // 기본값
    const options = btns.forEach(x=>{
        const [key, value] = (x.className).split(',').slice(0,2);
        const [KCAL, G, PRICE] = (x.className).split(',').slice(2,5);
        console.log((x.className).split(',').slice(2,5));
        total += Number(PRICE);
        console.log(key, value);
        data[key] = value;
    });
    data['price'] = total;
    // data["문구"] = lettering;


    console.log(data);

    local.setItem(number++, JSON.stringify(data));
});