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
        name: 'GiaoVienBoMon',
        fullname: 'Giáo viên bộ môn',
        password: '123456',
        position: 'teacher-subject'
    },
    {
        id: 4,
        name: 'GiaoVienChuNhiem',
        fullname: 'Giáo viên chủ nhiệm',
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
const itemDecen = $('#list-items--decen');
const containerList = $('.container__list');
const containerDecen = $('.container__decen');


if(btnOut){
    btnOut.onclick = function(e){
        alert('Bạn có chắc muốn thoát');
        display(containerList,false);
        display(form,true);
        display(outBtn,false);
        display(userName,false);
        display(homeBtn,false);
        display(containerDecen, false);
    }
}

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

if(itemDecen) {
    itemDecen.onclick = function(e){
        containerDecen.classList.remove('display--none');
        containerList.classList.add('display--none');
        renderDecen(accounts);
    }
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

function logged(data){
    containerList.classList.remove('display--none');
    form.classList.add('display--none');
    userName.innerHTML = `${getUser(data).fullname}`;
    outBtn.classList.remove('display--none');
    userName.classList.remove('display--none');
    display(homeBtn, true);
    if(homeBtn){
        homeBtn.onclick = function(e){
            display('.container__list',true);
            display('.container__decen', false);
        }
    }   
}

// Phân quyền hệ thống
const decentralization = $('#container__decen');
const decenList = $('.decen__list');

function renderDecen(accounts){
    const htmls = accounts.map(function(account, index){
        return `
        <div class="decen__list-users">
            <img class="users__img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQctA-NSI59h7c-JFVTUWhozUanBiB-rX0MMg&usqp=CAU" alt="">
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

