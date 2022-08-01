//controller là folder chứa các func + nội dung chi tiết của nó
//các func trong controller có thể dựa vào model.js để khởi tạo các biến nằm trong func
// Lấy các thông tin từ form đưa vào biến dựa theo model NhanVien trong ./model.js
function layThongTinTuForm() {
  // lấy các giá trị từ input người dùng
  const taiKhoan = document.getElementById("tknv").value;
  const ten = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const matKhau = document.getElementById("password").value;
  const date = document.getElementById("datepicker").value;
  const luong = document.getElementById("luongCB").value;
  const chucVu = document.getElementById("chucvu").value;
  const gioLam = document.getElementById("gioLam").value;
  //đưa về 1 mảng mới theo cấu tạo của model NhanVien từ model.js
  return new NhanVien(
    taiKhoan,
    ten,
    email,
    matKhau,
    date,
    luong,
    chucVu,
    gioLam
  );
}
// Xuất thông tin đã đưa vào mảng mới lên bảng
function renderDSNV(nvArr) {
  // Tạo biến chứa giá trị HTML
  var contentHTML = "";
  // duyệt các obj sv trong mảng dssv
  for (i = 0; i < nvArr.length; i++) {
    //gọi các thuộc tính trong obj sinh viên gán vào 1 biến sv sử dụng trong vòng lặp
    var nv = nvArr[i];
    //tạo biến thẻ tr chứa các thông tin cần xuất. gán các thuộc tính gọi từ obj sinh viên
    var trContent = `<tr>
      <td>${nv.taiKhoan}</td>
      <td>${nv.ten}</td>
      <td>${nv.email}</td>
      <td>${nv.date}</td>
      <td>${nv.chucVu}</td>
      <td>${nv.tongLuong()}</td>
      <td>${nv.xepLoai()}</td>
      <td><button onclick="xoaNhanVien('${
        nv.taiKhoan
      }')" class='btn btn-danger'>Xóa</button></td>
      <td><button onclick="suaNhanVien('${
        nv.taiKhoan
      }');" class='btn btn-warning' data-toggle="modal"
      data-target="#myModal" >Sửa</button></td>
      </tr>`;
    //   <td>${nv.tongLuong()}</td>
    //   <td>${nv.xepLoai()}</td>
    //thêm giá trị vào biến
    contentHTML += trContent;
  }
  //xuất ra bảng id tbodySinhVien
  document.getElementById("tableDanhSach").innerHTML = contentHTML;
}
//**FUNC Close form */
function closeForm(id) {
  $(document.getElementById(id)).attr("data-dismiss", "modal");
}
//**FUNC Open form */
function openForm(id) {
  $(document.getElementById(id)).attr("data-toggle", "modal");
}
//**FUNC kiểm tra valid */
function checkIsValid(nv) {
  var isValid =
    //Kiểm tra rỗng tài khoản, tên, email, mật khẩu, lương, giờ làm, lương
    validation.kiemTrarong(
      nv.taiKhoan,
      "tbTKNV",
      "Tài khoản nhân viên không được để trống"
    ) &
    validation.kiemTrarong(
      nv.ten,
      "tbTen",
      "Tên nhân viên không được để trống"
    ) &
    validation.kiemTrarong(
      nv.email,
      "tbEmail",
      "Email nhân viên không được để trống"
    ) &
    validation.kiemTrarong(
      nv.matKhau,
      "tbMatKhau",
      "Mật khẩu không được để trống"
    ) &
    validation.kiemTrarong(nv.luong, "tbLuongCB", "Lương không được để trống") &
    validation.kiemTrarong(
      nv.gioLam,
      "tbGiolam",
      "Giờ làm không được để trống"
    ) &
    // Kiểm tra độ dài tài khoản,
    validation.kiemTraDoDai(
      nv.taiKhoan,
      6,
      4,
      "tbTKNV",
      "Tài khoản nhân viên phải trên 4 kí tự và dưới 6 kí tự"
    ) &
    validation.kiemTraDoDai(
      nv.matKhau,
      10,
      6,
      "tbMatKhau",
      "Mật khẩu nhân viên phải trên 6 kí tự và dưới 10 kí tự"
    ) &
    //Kiểm tra chức vụ
    validation.kiemTraChucVu(
      nv.chucVu,
      "tbChucVu",
      "Chọn chức vụ cho nhân viên"
    ) &
    // Kiểm tra email
    validation.kiemTraEmail(nv.email, "tbEmail", "Email không hợp lệ") &
    //Kiểm tra kí tự tên
    validation.kiemTraTen(nv.ten, "tbTen", "Tên phải là kí tự chữ không dấu") &
    // Kiểm tra pass
    validation.kiemTraPass(
      nv.matKhau,
      "tbMatKhau",
      "Pass phải có 1 kí tự in hoa, một kí tự không in hoa, một chữ số và 1 kí tự đặc biệt "
    ) &
    //Kiểm tra lương
    validation.kiemTraMinMax(
      nv.luong,
      1000000,
      20000000,
      "tbLuongCB",
      "Vui lòng nhập lương từ 1.000.000 - 20.000.000"
    ) &
    validation.kiemTraMinMax(
      nv.gioLam,
      80,
      200,
      "tbGiolam",
      "Vui lòng nhập giờ làm từ 80 - 200 giờ"
    );
  return isValid;
}
//**FUNCTION reset thông tin */
function resetInput() {
  document.getElementById("tknv").value = "";
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("luongCB").value = "";
  document.getElementById("chucvu").value = "";
  document.getElementById("gioLam").value = "";
}
//FUNCTION Tìm kiếm vị trí
function timKiemViTri(taiKhoan, dsnv) {
  for (i = 0; i < dsnv.length; i++) {
    // tạo biến nv gán bằng biến nv index = i trong mảng dsnv (dsnv[i])
    var nv = dsnv[i];
    // Nếu nv.ma == taiKhoan trả về giá trị i
    if (nv.taiKhoan == taiKhoan) {
      return i;
    }
  }
  // Nếu nv.ma != taiKhoan trả về giá trị -1
  return -1;
}
// FUNCTION disable ô input và btn
function togDisable(id) {
  document.getElementById(id).disabled = true;
}
function togEnable(id) {
  document.getElementById(id).disabled = false;
}
//**FUNCTION show thông tin */
function showThongTin(nv) {
  document.getElementById("tknv").value = nv.taiKhoan;
  document.getElementById("name").value = nv.ten;
  document.getElementById("email").value = nv.email;
  document.getElementById("password").value = nv.matKhau;
  document.getElementById("datepicker").value = nv.date;
  document.getElementById("luongCB").value = nv.luong;
  document.getElementById("chucvu").value = nv.chucVu;
  document.getElementById("gioLam").value = nv.gioLam;
}
