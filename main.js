// index.js là nơi gọi các function từ controller - render/ xuất output theo tương tác
//** Khởi tạo mảng danh sách chứa toàn bộ thông tin nhân viên
var dsnv = [];
//Lấy thông tin DSSV từ localStorage
var dsnvJson = localStorage.getItem("DSNV");
// Nếu mảng dssv = null gọi lại dssvJson đưa vào dssv
if (dsnvJson != null) {
  dsnv = JSON.parse(dsnvJson);
  //array khi lưu xuống từ bộ nhớ json sẽ ko có thuộc tính như ban đầu
  //gọi lại toàn bộ thuộc tính, map lại
  for (i = 0; i < dsnv.length; i++) {
    var nv = dsnv[i];
    dsnv[i] = new NhanVien(
      nv.taiKhoan,
      nv.ten,
      nv.email,
      nv.matKhau,
      nv.date,
      nv.luong,
      nv.chucVu,
      nv.gioLam
    );
  }
  // render lại hàm dsnv
  renderDSNV(dsnv);
}
//**FUNCTION THÊM NHÂN VIÊN */
function themNV() {
  //Lấy từng biến vào biến-mảng = newNv cho func layThongTinTuForm của controller.js
  var newNv = layThongTinTuForm();
  //Kiểm tra input
  var isValid =
    // Kiểm tra valid
    checkIsValid(newNv) &
    // Kiểm tra trùng
    validation.kiemTraTrung(
      newNv.taiKhoan,
      "tbTKNV",
      "Tài khoản nhân viên bị trùng"
    );
  console.log("isValid: ", isValid);
  // Nếu isValid = true
  if (isValid == true) {
    //Đẩy từng giá trị của biến newNv vào mảng Dssv
    dsnv.push(newNv);
    console.log("dsnv: ", dsnv);
    //TẠO JSON
    var dsnvJson = JSON.stringify(dsnv);
    //thêm value dssvJSON vào localStorage DSSV
    localStorage.setItem("DSNV", dsnvJson);
    //RENDER dsnv
    renderDSNV(dsnv);
    resetInput();
    closeForm("btnThemNV");
    //   resetInput();
  }
}
// }
