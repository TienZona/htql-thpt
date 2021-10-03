var accounts  = [
    {
        id: 1,
        name: 'TienZona',
        password: '123456',
        position: 'boss'
    },
    {
        id: 2,
        name: 'HieuTruong',
        password: '123456',
        position: 'Administrators'
    },
    {
        id: 3,
        name: 'GiaoVienBoMon',
        password: '123456',
        position: 'teacher-subject'
    },
    {
        id: 3,
        name: 'GiaoVienChuNhiem',
        password: '123456',
        position: 'teacher-homeroom'
    }
]



var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);

var btnOut = $('.navbar__menu-btn--out');

if(btnOut){
    btnOut.onclick = function(e){
        alert('Bạn có chắc muốn thoát');
        window.location.href = "./login.html";
    }
}

var homeIndex = function(){
    window.location.href = "./index.html";
}


var getAccount = function() {
    return accounts;
}

var checkAccount = function(inputAccount){
    var accounts = getAccount();
    return accounts.some(function(account){
        if((inputAccount.fullname === account.name) && (inputAccount.password === account.password)) return true;
    });
}