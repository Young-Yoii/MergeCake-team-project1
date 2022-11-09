// 가격 계산 해야됨

const $basketSubmit = document.querySelector("#basketSubmit");

// 클릭 했을 때 로컬 스토리지에 담기

const local = localStorage;
const data = {};

let number = (Object.keys(local) ?? []).length; 

$basketSubmit.addEventListener('click', function(e) {
    const btns = document.querySelectorAll('input[type="radio"]:checked+div>img,input[type="radio"]:checked+div>span');

    const lettering = document.querySelector('input[type="text"]').value;
    const options = btns.forEach(x=>{
       const [key, value] = (x.alt || x.className).split(',').slice(1,3);
       console.log(key, value);
       data[key] = value;
    });
    data["문구"] = lettering;
    data["price"] = 1000;

    console.log(data);

    local.setItem(number++, JSON.stringify(data));
});