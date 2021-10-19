

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const btnOut = $('.navbar__menu-btn--out');
const userName = $('.navbar__menu-user');
const outBtn = $('.navbar__menu-btn--out');
const homeBtn = $('.navbar__menu-btn--home');

const containerHome = $('.container__home');
const containerList = $('.container__list');
const containerInfor = $('.container__infor');

// Biến nội dung từng chức năng

const containerDecen = $('.container__decen');
const containerSchedule = $('#container__schedule');
const containerAssigning = $('#container__assigning');
const containerWatch = $('#container__watch');
const containerUpdate = $('#container__update');
const containerVoting = $('#container__voting');
const containerScore = $('#container__score');

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
/*-----------------------------------Sử lý trang chủ----------------------------------------*/  

// Hàm hiển thị trang chủ
function homeDisplay(isDisplay){
    display(form, !isDisplay);
    display(outBtn, isDisplay);
    display(userName, isDisplay);
    display(containerHome, isDisplay);
    display(homeBtn, isDisplay);
}


function renderInformation(user, teachers){
    const result = teachers.filter(function(teacher){
        return user.mscb === teacher.mscb;
    })
    const teacher = result[0];
    const contentName = $('.content__name');
    const contentBirthDate = $('.content__birthdate');
    const contentGender = $('.content__gender');
    const contentPosition = $('.content__position');

    contentName.innerHTML += `<p class="content__infor">${teacher.fullname}</p>`;
    contentBirthDate.innerHTML += `<p class="content__infor">${teacher.birthDate}</p>`;
    contentGender.innerHTML += `<p class="content__infor">${teacher.gender}</p>`;
    contentPosition.innerHTML += `<p class="content__infor">${teacher.position}</p>`;
}



/* ----------------------------------Sử lý khi đã đăng nhập-------------------------------- */
function logged(data){
    const userLog = getUser(data);
    userName.innerHTML = `${getUser(data).fullname}`;
    homeDisplay(true);
    renderInformation(userLog ,teachers);
    // Về trang chủ
    if(homeBtn){
        homeBtn.onclick = function(e){
            display(containerHome,true);
            display(containerDecen, false);
            display(containerSchedule, false);
            display(containerAssigning, false);
            display(containerWatch, false);
            display(containerVoting, false);
            display(containerUpdate, false);
            display(containerScore, false);
        }
    }   

    // THoát 
    if(btnOut){
        btnOut.onclick = function(e){
            if(confirm('Bạn có chắc muốn thoát')){
                window.location.href = "./index.html";
                homeDisplay(false);
            }
        }
    }
    // chọn chức năng

    const itemDecen = $('#list-items--decen');
    const itemSchedule = $('#list-items--schedule');    
    const itemAssigning = $('#list-items--assigning');
    const itemWatch = $('#list-items--watch');
    const itemUpdate = $('#list-items--update');

    itemDecen.onclick = function(){
        display(containerDecen, true);
        display(containerHome, false);
        renderDecen(accounts, data);
    }

    itemSchedule.onclick = function(){
        display(containerHome, false);
        display(containerSchedule, true);
    }

    itemAssigning.onclick = function(){
        display(containerHome, false);
        display(containerAssigning, true);
    }

    itemWatch.onclick = function(){
        display(containerHome, false);
        display(containerWatch, true);
    }
    itemUpdate.onclick = function(){
        display(containerHome, false);
        display(containerUpdate, true);
    }


    // hiển thị những chức năng cho phép
    const items = $$('.list-items');
    items.forEach(function(item){
        display(item, false);
    })
    const user= getUser(data);
    switch (user.position){
        case 'admin': 
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
            display('#list-items--votting',true);
            display('#list-items--score',true);
            break;
        case 'HeadOfDepartment':
            display('#list-items--watch',true);
            display('#list-items--score',true);
            break;
        default: 
    }
}


/* ------------------------------Phân quyền hệ thống--------------------------------- */

const decentralization = $('#container__decen');
const decenList = $('.decen__list');

// Xử lý giao diện phân quyền hệ thống
function renderDecen(accounts, user){
    const htmls = accounts.map(function(account, index){
        const src = getSource(account.position);
        return ((user.fullname === account.name) || (account.position === 'admin')) ? '' : `
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
                    <option value="headOfDepartment">headOfDepartment</option>
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
        case 'admin': return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRg6mcF8ahzuZCEGb6q957TAaswNJwBq7shQ&usqp=CAU'; break;
        case 'Administrators': return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQctA-NSI59h7c-JFVTUWhozUanBiB-rX0MMg&usqp=CAU'; break;
        case 'teacher-subject': return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCevtWkfWhNADi52wcGtc_16g6snPY9Je_wQ&usqp=CAU'; break;
        case 'teacher-homeroom': return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpP7IYDDV_TjtQY4gw78U39mgB04XWKkquIg&usqp=CAU'; break;
        case 'headOfDepartment': return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTffZfEd5t5jg_-rbWccL7ao7N35wsZg0F8zg&usqp=CAU'; break;
        default: return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRitJuxaJKiZ4CMpST04Nswn6UBEj-5hZMwbQ&usqp=CAU';
    }
}

/* ------------------------------Lập thời khóa biểu--------------------------------- */

// Xử lý chọn lớp học
const selectLevel = $('#level-class');
const selectClass = $('#class');
const saveSchadule = $('.schedule__navbar-btn');

const watchLevel = $('#watch__navbar-item-level');
const watchClass = $('#watch__navbar-item-class');
const watchBtnSave = $('.watch__navbar-item-btn');
const watchHeading = $('.watch__container-heading');
const watchContainer = $('.watch__container');
const selectClassName = $('.schedule__container-class');

const updateLevel = $('#update__navbar-item-level');
const updateClass = $('#update__navbar-item-class');
const updateBtnSave = $('.update__navbar-item-btn');


renderClass(12, selectClass);
selectLevel.onchange = function () {
    renderClass(this.value, selectClass);
}

renderClass(12, watchClass);
watchLevel.onchange = function () {
    renderClass(this.value, watchClass);
}

renderClass(12, updateClass);
updateLevel.onchange = function(){
    renderClass(this.value, updateClass);
}

// render chọn lớp học
function renderClass(level, selectClass){
    var htmls = '';
    for(let i = 1; i <= 10; i++){
        const className = level + 'A' + i;
        htmls += `<option value="${className}">${className}</option>
        `;
    }
    selectClass.innerHTML = htmls;
}

// Chọn lớp xem danh sách lớp
watchBtnSave.onclick = function(){
    renderClassList(classLists, watchClass.value);
    watchContainer.classList.remove('display--none');
    watchHeading.innerHTML = `Danh sách lớp ${watchClass.value}`;
}
selectClassName.innerHTML = `Lớp: ${selectClass.value}`;
saveSchadule.onclick = function(){
    selectClassName.innerHTML = `Lớp: ${selectClass.value}`;
}

// Sử lý giao diện danh sách lớp
const tableClassList = $('.watch__container-classLists');

function renderClassList(classLists, className){
    tableClassList.innerHTML = `
        <tr>
            <th>STT</th>
            <th>Họ và tên</th>
            <th>Ngày sinh</th>
            <th>Giới tính</th>
            <th>Số điện thoại</th>
        </tr>
        `;  
    var classList = classLists.filter(function(classList){
        return classList.name === className;
    })
    if(classList[0]){
        classList[0].students.forEach(function(student,index){
            tableClassList.innerHTML += `
            <tr>
                <th class="classLists__number">${index+1}</th>
                <td class="classLists__name">${student.name}</td>
                <td class="classLists__birthDate">${student.birthDate}</td>
                <td class="classLists__gender">${student.gender}</td>
                <td class="classLists__telephone">${student.telephone}</td>
            </tr>
            `
        })
    }
}


/* ------------------------------update danh sach lop----------------------------*/


// Liệt kê lớp học cần chỉnh sửa
var classListTemp;
updateBtnSave.onclick = function(){
    classListTemp = {...getClassLists(updateClass.value)};
    classListTemp.students = [...getClassLists(updateClass.value).students];
    const heading = $('.update__container-heading');
    heading.innerHTML = `Lớp: ${updateClass.value}`;
    const updateContainer = $('.update__container');
    if(!updateContainer.querySelector('.btn__save--update')){
        updateContainer.innerHTML += '<button class="btn__save--update">Lưu chỉnh sửa</button>';
        updateContainer.innerHTML += '<button class="btn__save--add">Thêm</button>';
    }
    renderUpdateClassList(classListTemp);
    
    // Sao khi có danh sách lớp
    btnDelete();
    btnAdd();
    startUpdate();

    // Lưu chỉnh sửa
    const saveBtn = $('.btn__save--update');
    saveBtn.onclick = function(){
        updateData(getClassLists(updateClass.value));
    } 
    
}


// Bấm xóa học sinh
function btnDelete(){
    const updateBtnDeletes = $$('.update__btn--delete');
    if(updateBtnDeletes){
        updateBtnDeletes.forEach(function(btn, index){
            btn.onclick = function(){
                const id = parseInt(btn.parentElement.parentElement.querySelector('.classLists__number').outerHTML.substring(31,32));
                deleteStudent(index, classListTemp);
                btn.parentElement.parentElement.parentElement.innerHTML = '';
                renderUpdateClassList(classListTemp);
                btnDelete();
            };
        })
    }
}

// Chỉnh sửa thông tin
function startUpdate(){
    const tableClassList = $('.update__container-classLists');
    const inputElements = tableClassList.querySelectorAll('.table__input');
    inputElements.forEach(function(inputElement, index){
        inputElement.oninput = function(e){
            inputElement.classList.add('oninput');
            const temp = this.parentElement.parentElement.querySelector('.classLists__number').outerHTML;
            const index =  parseInt(temp.substring(31, 32)) - 1;
            const row = this.parentElement.parentElement;
            const name = row.querySelector('.classLists__name').firstChild.value;
            const birthDate = row.querySelector('.classLists__birthDate').firstChild.value;
            const gender = row.querySelector('.classLists__gender').firstChild.value;
            const telephone = row.querySelector('.classLists__telephone').firstChild.value;
            const value = {
                id: index,
                name: name,
                birthDate: birthDate,
                gender: gender,
                telephone: telephone
            }
            updateStudent(index , value, classListTemp);
        }
    })
}


// Bấm nút thêm
function btnAdd(){
    const btnAdd = $('.btn__save--add');
    btnAdd.onclick = function(){
        const tableClassList = $('.update__container-classLists');
        const numberRow = $$('.row__student');
        tableClassList.innerHTML += `
            <tr class="row__student">
                <th class="classLists__number">${numberRow.length + 1}</th>
                <td class="classLists__name"><input class="table__input" type="text" value=""></input></td>
                <td class="classLists__birthDate"><input class="table__input" type="text" value=""></input></td>
                <td class="classLists__gender"><input class="table__input" type="text" value=""></input></td>
                <td class="classLists__telephone"><input class="table__input" type="text" value=""></input></td>
                <td class="update__btn">
                    <button class="update__btn--delete">Xóa</button>
                </td>
            </tr>
        `
        const id  = classListTemp.students[classListTemp.students.length - 1].id + 1;
        const data = {
            id: id,
            name: '',
            birthDate: '',
            gender: '',
            telephone: ''
        }
        addStudent(data, classListTemp);
        renderUpdateClassList(classListTemp);
        btnDelete();
        startUpdate();
    }
}

// Xóa một học sinh ra khỏi danh sách lớp
function deleteStudent(index, classList){
    if(index == 0){
        classList.students.shift();
    }else{
        classList.students.splice(index,1);
    }
}

function addStudent(student, classList){
    classList.students[classList.students.length] = {
        id: student.id,
        name: student.name,
        birthDate: student.birthDate,
        gender: student.gender,
        telephone: student.telephone
    }
}

function updateStudent(index, data, classList){
    const student = classList.students[index];
    student.name = data.name;
    student.birthDate = data.birthDate;
    student.gender = data.gender;
    student.telephone = student.telephone;
}

// render ra danh sách lớp để update
function renderUpdateClassList(classLists){
    const tableClassList = $('.update__container-classLists');
    tableClassList.innerHTML = `
        <tr>
            <th>STT</th>
            <th>Họ và tên</th>
            <th>Ngày sinh</th>
            <th>Giới tính</th>
            <th>Số điện thoại</th>
            <th class="col__btn">Chỉnh sửa</th>
        </tr>
        `;  
    var classList = classLists;
    if(classList){
        classList.students.forEach(function(student,index){
            tableClassList.innerHTML += `
            <tr class="row__student">
                <th class="classLists__number">${index+1}</th>
                <td class="classLists__name"><input class="table__input" type="text" value="${student.name}"></input></td>
                <td class="classLists__birthDate"><input class="table__input" type="text" value="${student.birthDate}"></input></td>
                <td class="classLists__gender"><input class="table__input" type="text" value="${student.gender}"></input></td>
                <td class="classLists__telephone"><input class="table__input" type="text" value="${student.telephone}"></input></td>
                <td class="update__btn">
                    <button class="update__btn--delete">Xóa</button>
                </td>
            </tr>
            `
        })
    }
}

// cập nhật dữ liệu sao khi lưu chỉnh sửa

function updateData(classList){
    const tableClassList = $('.update__container-classLists');
    const datas = tableClassList.querySelectorAll('.row__student');
    const students = [];
    datas.forEach(function(data, index){
        const name = data.querySelector('.classLists__name').firstChild.value;
        const birthDate = data.querySelector('.classLists__birthDate').firstChild.value;
        const gender = data.querySelector('.classLists__gender').firstChild.value;
        const telephone = data.querySelector('.classLists__telephone').firstChild.value;
        students[index] = {
            id: index+1,
            name: name,
            birthDate: birthDate,
            gender: gender,
            telephone: telephone
        }
    })
    classList.students = students;
}

function getClassLists(className){
    const classList = classLists.filter(function(classList){
        return classList.name === className
    });
    return classList[0];
}

function renderNumber(){
    const tableClassList = $('.update__container-classLists');
    const numberRows = tableClassList.querySelectorAll('.row__student');
    numberRows.forEach(function(numberRow, index){
        numberRow.firstChild.innerHTML = index+1;
    })
}