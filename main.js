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
    console.log("newNv: ", newNv);
    console.log("dsnv: ", dsnv);
    //TẠO JSON
    var dsnvJson = JSON.stringify(dsnv);
    //thêm value dssvJSON vào localStorage DSSV
    localStorage.setItem("DSNV", dsnvJson);
    //RENDER dsnv
    renderDSNV(dsnv);
    resetInput();
    closeForm("btnThemNV");
  }
}
//**FUNCTION XÓA NHÂN VIÊN */
function xoaNhanVien(taiKhoan) {
  //Tìm index của nv trong mảng dsnv
  var index = timKiemViTri(taiKhoan, dsnv);
  //Kiểm tra lại index khác -1 thì xóa
  if (index != -1) {
    // Xóa tại vị trí index vừa tìm được
    dsnv.splice(index, 1);
    //render lại dssv
    renderDSNV(dsnv);
    //Lưu lại vào JSON
    var dsnvJson = JSON.stringify(dsnv);
    //Lưu JSON vào localStorage
    localStorage.setItem("DSNV", dsnvJson);
  }
}
//FUNCTION** Sửa sinh viên
//Show thông tin lên form - cho phép sửa + cập nhật
function suaNhanVien(taiKhoan) {
  openForm("btnThemNV");
  //Tìm index của sv trong mảng dssv
  var index = timKiemViTri(taiKhoan, dsnv);
  console.log("index: ", index);
  //Nếu tìm thấy (index != -1) thì show thông tin lên form
  if (index != -1) {
    var nv = dsnv[index];
    showThongTin(nv);
    togDisable("tknv");
    togDisable("btnThemNV");
    togEnable("btnCapNhat");
  }
}
//FUNCTION** Cập nhật thông tin
function capNhatNV() {
  let taiKhoan = document.getElementById("tknv").value;
  //lấy index mảng chứa id đó
  var index = timKiemViTri(taiKhoan, dsnv);
  //Tạo biến mảng dummy - xóa mảng cũ gán mảng mới
  var editNv = layThongTinTuForm();
  //Validation input editSv
  var isValid = checkIsValid(editNv);
  // validation.kiemTraTrung(editSv.ma, "spanMaSV", "Mã sinh viên bị trùng");
  // Nếu true
  if (isValid) {
    //cắt bỏ mảng cũ chèn mảng editsv vào vị trí index
    dsnv.splice(index, 1, editNv);
    alert("Cập nhật thành công");

    //mở disable input id
    togEnable("tknv");
    togEnable("btnThemNV");
    togDisable("btnCapNhat");

    //Lưu lại dssv vào biến JSON
    var dsnvJson = JSON.stringify(dsnv);
    //Lưu JSON vào localStorage
    localStorage.setItem("DSNV", dsnvJson);
    //lấy lại mảng dssv
    renderDSNV(dsnv);
    //Reset input
    resetInput();
    //Closeform
    closeForm();
  }
}
