//model.js là file chứa các khuôn mẫu cho obj(khuôn mẫu = các lớp đối tượng)
//khai báo khuôn mẫu cho obj NhanVien
function NhanVien(taiKhoan, ten, email, matKhau, date, luong, chucVu, gioLam) {
  this.taiKhoan = taiKhoan;
  this.ten = ten;
  this.email = email;
  this.matKhau = matKhau;
  this.date = date;
  this.luong = luong;
  this.chucVu = chucVu;
  this.gioLam = gioLam;
  this.tongLuong = function () {
    if ((this.chucVu = "Sếp")) {
      return this.luong * 3;
    }
    if ((this.chucVu = "Trưởng phòng")) {
      return this.luong * 2;
    }
    if ((this.chucVu = "Nhân viên")) {
      return this.luong;
    }
  };
  this.xepLoai = function () {
    if (this.gioLam >= 192) {
      return "Xuất sắc";
    }
    if (this.gioLam >= 176) {
      return "Giỏi";
    }
    if (this.gioLam >= 160) {
      return "Khá";
    } else {
      return "Trung bình";
    }
  };
}
