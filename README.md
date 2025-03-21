# Project Name: Ex01_CQ
Dự án này là một web app được phát triển bằng React nhằm quản lý danh sách sinh viên. Ứng dụng cho phép người dùng xem, chỉnh sửa, thêm mới và xóa thông tin sinh viên một cách dễ dàng.

## Cấu trúc source code
```
.
├── backend
│   ├── components
│   │   └── student-managing
│   │       ├── domain
│   │       │   ├── import-export
│   │       │   │   └── impl
│   │       │   ├── management
│   │       │   │   └── StudentManager.early.test
│   │       │   └── services
│   │       │       └── impl
│   │       ├── entry-points
│   │       │   └── api
│   │       │       ├── import-export
│   │       │       │   └── test
│   │       │       └── student-management
│   │       │           └── test
│   │       └── storage
│   ├── core
│   │   ├── logger
│   │   ├── responses
│   │   ├── socket
│   │   └── stream
│   ├── libraries
│   │   ├── errorHandler
│   │   ├── utils
│   │   └── validator
│   └── static-content
└── frontend
    ├── src
    │   ├── components
    │   │   ├── Content
    │   │   ├── Header
    │   │   ├── Loading
    │   │   ├── NothingDisplay
    │   │   ├── Notification
    │   │   └── SubHeader
    │   ├── contexts
    │   ├── pages
    │   │   ├── Category
    │   │   │   ├── Faculty
    │   │   │   ├── Management
    │   │   │   ├── Programs
    │   │   │   ├── Status
    │   │   │   └── styles
    │   │   ├── Home
    │   │   └── Student
    │   │       ├── Form
    │   │       │   ├── StudentAddress
    │   │       │   ├── StudentIdentity
    │   │       │   └── StudentImportForm
    │   │       ├── StudentItem
    │   │       └── StudentList
    │   ├── services
    │   └── styles
    └── test
```

## Hướng dẫn cài đặt & chạy chương trình
### Yêu cầu hệ thống
Node.js (>= 16)
npm

### Cài đặt
Chạy lệnh:```npm i``` ở cả thư mục gốc (root) và thư mục frontend

### Build chương trình
Chạy lệnh:```npm run build```

### Chạy chương trình (development mode)
Chạy lệnh:```npm run dev``` để vào dev mode, mở browser địa chỉ: 'http://localhost:5173'

### Chạy chương trình (deployment mode)
Chạy lệnh:```npm start``` để vào deployment mode, mở browser địa chỉ: 'http://localhost:3000'


## Hướng dẫn sử dụng **Version 2.0**

