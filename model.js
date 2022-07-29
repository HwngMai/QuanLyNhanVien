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
}
