# Project Name: Ex01_CQ
Dự án này là một web app được phát triển bằng React nhằm quản lý danh sách sinh viên. Ứng dụng cho phép người dùng xem, chỉnh sửa, thêm mới và xóa thông tin sinh viên một cách dễ dàng.

## Cấu trúc source code
```
.
├── backend
│   ├── components
│   │   ├── responses
│   │   └── student-managing
│   │       ├── domain
│   │       │   └── studentManager.early.test
│   │       ├── entry-points
│   │       │   └── api
│   │       │       └── test
│   │       └── storage
│   ├── core
│   │   └── socket
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
    │   │   ├── Home
    │   │   └── Student
    │   │       ├── StudentImportForm
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
### Chạy chương trình
Chạy lệnh:```npm run dev```để vào chế độ dev mode, mở browser và nhập 'http://localhost:5473'