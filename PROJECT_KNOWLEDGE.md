# Project Overview & Knowledge Bank

## 1. Project Overview

Dự án này là một framework kiểm thử tự động giao diện người dùng (UI Testing) được xây dựng bằng **Playwright** và **TypeScript**. Framework áp dụng mô hình **Page Object Model (POM)** kết hợp với **Allure Report** để tạo báo cáo chi tiết. Ngoài ra, dự án còn tận dụng việc kết hợp giữa API và UI test để tối ưu thời gian chạy (ví dụ: tạo dữ liệu qua API trước khi test UI).

### Công nghệ sử dụng:
- **Ngôn ngữ**: TypeScript
- **Framework**: Playwright (`@playwright/test`)
- **Reporting**: Allure Report (`allure-playwright`, `allure-js-commons`)
- **Quản lý biến môi trường**: `dotenv`

### Cấu trúc thư mục (Architecture):
- `src/pages/`: Chứa các Page Objects. Tất cả các page đều kế thừa từ `CommonPage` và implement interface `CommonBehavior`.
- `src/fixtures/`: Chứa các custom fixtures của Playwright (vd: `admin-fixture.ts` tự động đăng nhập và chụp ảnh màn hình khi test thất bại).
- `src/utils/`: Chứa các hàm tiện ích như đọc biến môi trường (`config-utils.ts`) và khai báo hằng số (`constants-utils.ts`).
- `tests/`: Chứa các kịch bản kiểm thử (spec files), được tổ chức theo từng domain/tính năng (coupon, login, product).
- `resources/`: Chứa các tài nguyên phục vụ test (vd: file ảnh, JSON test data).
- `env/`: Chứa các cấu hình môi trường như `.env.local`, `.env.ci`.
- `playwright.config.ts`: File cấu hình chính của Playwright (chạy test song song, cấu hình reporter, retries, ...).

---

## 2. Knowledge Bank (Các quy tắc và kỹ thuật cốt lõi)

### 2.1. Page Object Model (POM) và `CommonPage`
- **`CommonPage`**: Là class nền tảng chứa các hàm thao tác với DOM thường dùng (nhập text, click button, chọn dropdown, ...). Các hàm này sử dụng **XPath** linh hoạt để tìm element dựa trên `label` (văn bản hiển thị trên UI).
- **Allure Steps**: Mọi hàm thao tác trong `CommonPage` đều được bọc trong `allure.step()` để tự động ghi log vào report (ví dụ: `Input value "..." into field "..."`).
- **Kế thừa**: Các page cụ thể (như `CouponPage`, `NewProductPage`) sẽ kế thừa `CommonPage` và chỉ định nghĩa thêm các thao tác đặc thù không có trong `CommonPage`.

### 2.2. Xử lý Fixture (`admin-fixture.ts`)
- Fixture `adminTest` được custom từ `test` của Playwright.
- Nó sẽ tự động điều hướng đến trang admin, kiểm tra và đăng nhập với tài khoản admin mặc định trước mỗi test case.
- Đặc biệt, fixture này chứa logic **tự động chụp ảnh màn hình toàn trang (full page screenshot)** và đính kèm vào report nếu test case đó bị thất bại (`status != 'passed'`).

### 2.3. Hybrid Testing (Kết hợp API và UI)
Để tối ưu thời gian chạy, dự án có áp dụng kỹ thuật gọi API trực tiếp trong các bài test UI:
- **Chuẩn bị dữ liệu (Setup)**: Dùng API để tạo sản phẩm (`NewProductPage.newProductByApi`) thay vì điền form UI, sau đó mới dùng UI để test tính năng "Edit Product".
- **Dọn dẹp dữ liệu (Teardown)**: Trong `adminTest.afterAll`, gọi API (`ProductsPage.deleteProduct`) để xóa toàn bộ dữ liệu đã tạo ra trong quá trình test, giúp môi trường sạch sẽ.
- **Lấy Token**: Cookie chứa token (`sid`, `asid`) được trích xuất trực tiếp từ trình duyệt (`CommonPage.getToken`) để phục vụ cho các request API này.

### 2.4. Quản lý Môi Trường (Environments)
- Biến môi trường được đọc từ các file trong thư mục `env/` (`.env.local`, `.env.ci`).
- Xử lý nạp biến môi trường tự động dựa vào `process.env.TEST_ENV` (mặc định là `local`) thông qua `dotenv` tại `src/utils/config-utils.ts`.
- Lệnh chạy script trong `package.json` quy định cấu hình môi trường (ví dụ: `npm run test:ci` sẽ truyền `TEST_ENV=ci`).

### 2.5. Các Best Practices trong dự án
- Không hardcode các thông tin nhạy cảm và URL, thay vào đó đặt ở `constants-utils.ts` và đọc qua biến môi trường.
- Test data (nếu lớn và phức tạp như payload API) được tách ra các file `.json` riêng lẻ (ví dụ: `new-product-body.json`).
- Khuyến khích sử dụng Locator theo Label hoặc Role để giả lập giống người dùng thực tế nhất thay vì dựa dẫm hoàn toàn vào class/id.
