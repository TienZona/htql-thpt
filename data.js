const accounts  = [
    {
        mscb: 'CB000',
        name: 'TienZona',
        fullname: 'Chung Phát Tiến',
        password: '123456',
        position: 'admin'
    },
    {
        mscb: 'CB001',
        name: 'HieuTruong',
        fullname: 'Thầy hiệu trưởng',
        password: '123456',
        position: 'Administrators'
    },
    {
        mscb: 'CB002',
        name: 'GiaoVienBoMon1',
        fullname: 'Giáo viên bộ môn 1',
        password: '123456',
        position: 'teacher-subject'
    },
    {
        mscb: 'CB003',
        name: 'GiaoVienBoMon2',
        fullname: 'Giáo viên bộ môn 2',
        password: '123456',
        position: 'teacher-subject'
    },
    {
        mscb: 'CB004',
        name: 'GiaoVienBoMon3',
        fullname: 'Giáo viên bộ môn 3',
        password: '123456',
        position: 'teacher-subject'
    },
    {
        mscb: 'CB005',
        name: 'GiaoVienChuNhiem1',
        fullname: 'Giáo viên chủ nhiệm 1',
        password: '123456',
        position: 'teacher-homeroom'
    },
    {
        mscb: 'CB006',
        name: 'GiaoVienChuNhiem2',
        fullname: 'Giáo viên chủ nhiệm 2',
        password: '123456',
        position: 'teacher-homeroom'
    }
]


const teachers = [
    {
        mscb: 'CB000',
        fullname: 'Chung Phát Tiến',
        birthDate: '12/06/2001',
        gender: 'Nam',
        position: 'admin'
    },
    {
        mscb: 'CB001',
        fullname: 'Thầy hiệu trưởng',
        birthDate: '12/10/1970',
        gender: 'Nam',
        position: 'Hiệu trưởng'
    },
    {
        mscb: 'CB002',
        fullname: 'Giáo viên bộ môn 1',
        birthDate: '12/10/1980',
        gender: 'Nữ',
        position: 'Giáo viên bộ môn'
    },
    {
        mscb: 'CB003',
        fullname: 'Giáo viên bộ môn 2',
        birthDate: '12/10/1980',
        gender: 'Nữ',
        position: 'Giáo viên bộ môn'
    },
    {
        mscb: 'CB004',
        fullname: 'Giáo viên bộ môn 3',
        birthDate: '12/10/1980',
        gender: 'Nữ',
        position: 'Giáo viên bộ môn'
    },
    {
        mscb: 'CB005',
        fullname: 'Giáo viên chủ nhiệm 1',
        birthDate: '12/10/1980',
        gender: 'Nữ',
        position: 'Giáo viên chủ nhiệm'
    },
    {
        mscb: 'CB006',
        fullname: 'Giáo viên chủ nhiệm 2',
        birthDate: '12/10/1980',
        gender: 'Nữ',
        position: 'Giáo viên chủ nhiệm'
    }
]

const classLists = [
    {
        id: 1,
        name:  '12A1',
        students: [
            {
                id: 1,
                name: 'Phùng Thị Lan Anh',
                birthDate: '31/1/2002',
                gender: 'Nữ',
                telephone: '0841234141'
            },
            {
                id: 2,
                name: 'Vũ Ngọc Anh',
                birthDate: '21/12/2002',
                gender: 'Nữ',
                telephone: '0841234141'
            },
            {
                id: 3,
                name: 'Dương Minh Đại Cương',
                birthDate: '3/8/2002',
                gender: 'Nam',
                telephone: '0841234141'
            },
        ]
    },
    {
        id: 2,
        name:  '12A2',
        students: [
            {
                id: 1,
                name: 'Phùng Đức Kiên',
                birthDate: '31/1/2002',
                gender: 'Nam',
                telephone: '0841234141'
            },
            {
                id: 2,
                name: 'Nguyễn Cẩm Linh',
                birthDate: '21/12/2002',
                gender: 'Nữ',
                telephone: '0841234141'
            },
            {
                id: 3,
                name: 'Nguyễn Hải Linh',
                birthDate: '3/8/2002',
                gender: 'Nam',
                telephone: '0841234141'
            },
            {
                id: 4,
                name: 'Nguyễn Phương Linh',
                birthDate: '14/10/2002',
                gender: 'Nữ',
                telephone: '0841234141'
            },
        ]
    },
]