const accounts  = [
    {
        id: 1,
        name: 'TienZona',
        fullname: 'Chung Phát Tiến',
        password: '123456',
        position: 'boss'
    },
    {
        id: 2,
        name: 'HieuTruong',
        fullname: 'Thầy hiệu trưởng',
        password: '123456',
        position: 'Administrators'
    },
    {
        id: 3,
        name: 'GiaoVienBoMon1',
        fullname: 'Giáo viên bộ môn 1',
        password: '123456',
        position: 'teacher-subject'
    },
    {
        id: 4,
        name: 'GiaoVienBoMon2',
        fullname: 'Giáo viên bộ môn 2',
        password: '123456',
        position: 'teacher-subject'
    },
    {
        id: 5,
        name: 'GiaoVienBoMon3',
        fullname: 'Giáo viên bộ môn 3',
        password: '123456',
        position: 'teacher-subject'
    },
    {
        id: 6,
        name: 'GiaoVienChuNhiem1',
        fullname: 'Giáo viên chủ nhiệm 1',
        password: '123456',
        position: 'teacher-homeroom'
    },
    {
        id: 7,
        name: 'GiaoVienChuNhiem2',
        fullname: 'Giáo viên chủ nhiệm 2',
        password: '123456',
        position: 'teacher-homeroom'
    }
]



const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const btnOut = $('.navbar__menu-btn--out');
const userName = $('.navbar__menu-user');
const outBtn = $('.navbar__menu-btn--out');
const homeBtn = $('.navbar__menu-btn--home');
const containerList = $('.container__list');
const containerDecen = $('.container__decen');
const itemDecen = $('#list-items--decen');
const itemSchedule = $('#list-items--schedule');
const schedule = $('#container__schedule');

function getUser(user){
    var user = accounts.filter(function(account){
        return user.fullname === account.name;
    })
    return user[0];
}

function getAccount() {
    return accounts;
}

function checkAccount(inputAccount){
    const accounts = getAccount();
    return accounts.some(function(account){
        if((inputAccount.fullname === account.name) && (inputAccount.password === account.password)) return true;
    });
}

function display(elementName, isDisplay){
    var element
    if(typeof elementName === 'string'){
        element = $(elementName);
    }else{
        element = elementName;
    }
    if(isDisplay){
        element.classList.remove('display--none');
    }else {
        element.classList.add('display--none');
    }
}


/* ----------------------------------Sử lý khi đã đăng nhập-------------------------------- */
function logged(data){
    userName.innerHTML = `${getUser(data).fullname}`;
    display(form, false);
    display(outBtn, true);
    display(userName, true);
    display(containerList, true);
    display(homeBtn, true);

    // Về trang chủ
    if(homeBtn){
        homeBtn.onclick = function(e){
            display('.container__list',true);
            display('.container__decen', false);
            display(schedule, false);

        }
    }   

    // THoát 
    if(btnOut){
        btnOut.onclick = function(e){
            alert('Bạn có chắc muốn thoát');
            window.location.href = "http://127.0.0.1:5500/index.html";
            display(containerList,false);
            display(form,true);
            display(outBtn,false);
            display(userName,false);
            display(homeBtn,false);
            display(containerDecen, false);
            display(schedule, false);
        }
    }
    // chọn chức năng

    itemDecen.onclick = function(){
        display(containerDecen, true);
        display(containerList, false);
        renderDecen(accounts, data);
    }

    itemSchedule.onclick = function(){
        display(containerList, false);
        display(schedule, true);
    }


    // hiển thị những chức năng cho phép
    const items = $$('.list-items');
    items.forEach(function(item){
        display(item, false);
    })
    const user= getUser(data);
    switch (user.position){
        case 'boss': 
            const items = $$('.list-items');
            items.forEach(function(item){
                display(item, true);
            })
            break;
        case 'Administrators': 
            display('#list-items--decen',true);
            display('#list-items--schedule',true);
            display('#list-items--assigning',true);
            break;
        case 'teacher-subject':
            display('#list-items--watch',true);
            display('#list-items--score',true);
            break;
        case 'teacher-homeroom':
            display('#list-items--watch',true);
            display('#list-items--update',true);
            display('#list-items--votting',true);
            display('#list-items--score',true);
            break;
        default: 
    }


}


/* ------------------------------Phân quyền hệ thống--------------------------------- */

const decentralization = $('#container__decen');
const decenList = $('.decen__list');

// Xử lý giao diện
function renderDecen(accounts, user){
    const htmls = accounts.map(function(account, index){
        const src = getSource(account.position);
        return ((user.fullname === account.name) || (account.position === 'boss')) ? '' : `
        <div class="decen__list-users">
            <img class="users__img" src="${src}" alt="">
            <table class="users__infor">
                <tr>
                    <th class="users__infor-name">${account.fullname}</th>
                </tr>
                <tr>
                    <td class="users__infor-position">Chức vụ: ${account.position}</td>
                </tr>
            </table>
            <div class="users__edit">
                <label for="position" class="users__label">Chỉnh sửa: </label>
                <select name="position" id="position" class="users__control">
                    <option value="">Lựa chọn chức vụ</option>
                    <option value="Administrators">Administrators</option>
                    <option value="teacher-subject">teacher-subject</option>
                    <option value="teacher-homeroom">teacher-homeroom</option>
                </select>
                <button class="users__edt-btn">Lưu</button>
            </div>
        </div>
        `
    })
    decenList.innerHTML = htmls.join('');
    const editBtns = $$('.users__edt-btn');
    Array.from(editBtns).forEach(function(editBtn,index){
        editBtn.onclick = function(){
            const position = this.parentElement.parentElement.querySelector('.users__infor-position');
            const valueEdit = this.parentElement.querySelector('.users__control').value;
            if(valueEdit != ''){
                position.innerHTML = `Chức vụ: ${valueEdit}`;
            }
        } 
    })
}

function getSource(position){
    switch (position){
        case 'boss': return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRg6mcF8ahzuZCEGb6q957TAaswNJwBq7shQ&usqp=CAU'; break;
        case 'Administrators': return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQctA-NSI59h7c-JFVTUWhozUanBiB-rX0MMg&usqp=CAU'; break;
        case 'teacher-subject': return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCevtWkfWhNADi52wcGtc_16g6snPY9Je_wQ&usqp=CAU'; break;
        case 'teacher-homeroom': return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpP7IYDDV_TjtQY4gw78U39mgB04XWKkquIg&usqp=CAU'; break;
        default: return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRitJuxaJKiZ4CMpST04Nswn6UBEj-5hZMwbQ&usqp=CAU';
    }
}

/* ------------------------------Lập thời khóa biểu--------------------------------- */

// Xử lý chọn lớp lập thời khóa biểu
const selectLevel = $('#level-class');
const selectClass = $('#class');
const saveSchadule = $('.schedule__navbar-btn');

renderClass(12, selectClass);
selectLevel.onchange = function () {
    renderClass(this.value, selectClass);
}

function renderClass(level, selectClass){
    var htmls = '';
    for(let i = 1; i <= 10; i++){
        const className = level + 'A' + i;
        htmls += `<option value="${className}">${className}</option>
        `;
    }
    selectClass.innerHTML = htmls;
}

saveSchadule.onclick = function(){
    alert('Đã lưu thời khóa biểu');
}
// function render