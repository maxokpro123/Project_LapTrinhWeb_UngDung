//Phản hồi
    
document.addEventListener("DOMContentLoaded", function() {
        emoj = document.getElementsByClassName("fa");
        for (var i = 0; i < emoj.length; i++) {
            emoj[i].onclick = function() {
                for (var j = 0; j < emoj.length; j++) {
                    emoj[j].classList.remove("ra");
                }
                this.classList.add("ra");
            }
        }
        input = document.getElementsByClassName("int");
        nhap = document.getElementById("placetext-1");
        for (var k = 0; k < input.length; k++) {
            input[k].onclick = function() {
                nhap.classList.add("hienbang");
            }
        }
    }, false)
    //Đăng nhập và đăng kí
document.addEventListener("DOMContentLoaded", function() {
        login = document.getElementById("login");
        list = document.getElementById("list");
        arrow = document.getElementById("arrow");
        ngoai = document.getElementById("body");
        login.onclick = function() {
            list.classList.toggle("xuat");
        }
        arrow.onclick = function() {
            list.classList.toggle("xuat");
        }
        ngoai.onclick = function() {
            list.classList.remove("xuat")
        }
    }, false)
    //Tìm phòng và tìm khách sạn
document.addEventListener("DOMContentLoaded", function() {
    search = document.getElementById("search");
    search.onclick = function() {
        list_2.classList.toggle("hien");

    }
}, false)
$(function() {
    $("#calendar").datepicker({ dateFormat: "dd-mm-yy" }).val();
});
$(function() {
    $("#calendar-2").datepicker({ dateFormat: "dd-mm-yy" }).val();
});
//Chọn ngày
$("input[name='demo0']").TouchSpin({
    min: 1,
    max: 10,
    initval: '',
    eplacementval: '',
    decimals: 0,
    forcestepdivisibility: 'round',
    verticalbuttons: false,
    verticalupclass: 'glyphicon glyphicon-chevron-up',
    verticaldownclass: 'glyphicon glyphicon-chevron-down',
    boostat: 5,
    booster: true,
    maxboostedstep: 10,
    prefix_extraclass: '',
    postfix_extraclass: '',
    step: 1,
    stepinterval: 100,
    stepintervaldelay: 500,
    mousewheel: true,
    buttondown_class: 'btn btn-dark',
    buttonup_class: 'btn btn-dark',
    buttondown_txt: '-',
    buttonup_txt: '+'
});
document.addEventListener("DOMContentLoaded", function() {
    var clickguest = document.getElementsByClassName("guest-all");
    var add = document.getElementById("add");
    for (var i = 0; i < clickguest.length; i++) {
        clickguest[i].onclick = function() {
            add.classList.toggle("hienadd");
        }
    }
}, false);

$(document).ready(function() {
    $("#demo0").change(function(e) {
        e.preventDefault();
        var value = $(this).val();
        if (value == "#demo0") {
            $("#room").html("please");
        } else {
            $("#room").html($(this).val());
        }
    });
});
$(document).ready(function() {
    $("#demo01").change(function(e) {
        e.preventDefault();
        var value = $(this).val();
        if (value == "#demo0") {
            $("#room-1").html("please");
        } else {
            $("#room-1").html($(this).val());
        }
    });
});
// Auto Login
var userInfo = {};
function autoLogin(){
    // var isSuccess = false;
    $.ajax({
        type: 'POST',
        url: '../../php/login.php',
        async: false,
        data: {action: 'Auto-Login'},
        dataType: 'json',
        success: (response)=>{
            if(response['success']){
                userInfo = response;
            }
            console.log(response);
        }
    });
    return userInfo;
}
autoLogin();
if(userInfo.quyenQuanTri=='1'){
    window.location.replace("../account/adminQuanLy.html");
}
$(()=>{
     $('#login ul.list-group').append('<li class="list-group-item"><a href="../account/quanly.html">Quản lý đơn phòng</a></li>')
     if(userInfo.hasOwnProperty('success'))
        if(userInfo['success']){
            let list_group = $('#login ul.list-group');
            list_group.children('li').first().remove();
            list_group.append('<li class="list-group-item"><a href="../account/taikhoan.html">Quản lý tài khoản</a></li>')
            list_group.append('<li class="list-group-item"><a href="../Login/login.html" onclick="return logOut()">Đăng xuất</a></li>')
            let account = $('<li class="list-group-item bg-primary"><a href="../account/taikhoan.html" class="text-light"><strong>Thông tin tài khoản</strong></a></li>');
            account.children('a').append('<br><span>'+userInfo['email_ND']+'</span>');
            list_group.append(account);
        }

})

//LogOut
function logOut(){
    var cont = false;
    $.ajax({
        type: 'POST',
        url: '../../php/index.php',
        async: false,
        data: {action: 'LogOut'},
        dataType: 'json',
        success: (response)=>{
            if(response['success'])
                cont = true;
        }
    });
    return cont;

}
var gopY = '';
$(()=>{
    for(let i =0;i<$('label.check').length;i++){
        $($('.check')[i]).click(()=>{
            gopY = $($('.check > p')[i]).text();
        })
    }
})
function danhGia(){
    let doHaiLong = $('.modal-content.note div.fa.emoj.ra > p').text();
    let cauHoi = $('#placetext-1').val();
    let email_sdt_lienhe = $('#email_sdt_lienhe').val();
    
    var cont = false;
    $.ajax({
        type: 'POST',
        url: '../../php/index.php',
        async: false,
        data: {action: 'danhGia', doHaiLong: doHaiLong, gopY: gopY, cauHoi: cauHoi, email_sdt_lienhe: email_sdt_lienhe},
        dataType: 'json',
        success: (response)=>{
            if(response['success'])
                cont = true;
        }
    });
    return cont;
}
const dsKV = [9,7,8,11,1,5,10,12,3,6,2,4];
$(()=>{
    for(let i=0;i<$('.number').length;i++){
        $(`.number.number-${i+1}`).click((e)=>{
            $.getJSON(`../../php/index.php?action=setKhuVuc&maKhuVuc=KHUVUC${dsKV[i]}`);
        })
    }
})
// Main
$(()=>{
    // Tìm kiếm
    // time picker
    let timestart = '1-1-2000';
    let timeend = '1-1-2000';
    let keyword = '';
    $('#search').on('change', (e)=>{
        keyword = $(e.target).val();
        console.log(keyword);
    })
    $('#calendar').on('change', ()=>{
        timestart = $('#calendar').val();
        console.log(timestart);
    })
    $('#calendar-2').on('change', ()=>{
        timeend =$('#calendar-2').val();
        console.log(timeend);
    })
    let numPhong = 1;
    let numNguoi = 2;
    $('#demo0').on('change', ()=>{
        numPhong = $('#demo0').val();
        $('#demo0').val(`  ${numPhong} phòng`);
        console.log(numPhong);
    })
    $('#demo01').on('change', ()=>{
        numNguoi =$('#demo01').val();
        $('#demo01').val(`  ${numNguoi} người`);
        console.log(numNguoi);
    })
    $('#btn_search').click((e)=>{
        // alert('chua tim dc'+keyword);
        searchEngine(keyword);
    })

})


function searchEngine(keyword) {
    let filter, list;
    let rs = [];
    filter = keyword.toUpperCase();

    $.getJSON(`../../php/hotel.php?action=ks_info_all`, data=>{
        list = data.map(value=>[value.maKhachSan, value.tenKhachSan]);
    }).done(()=>{
        for (i = 0; i < list.length; i++) {
            if (list[i][1].toUpperCase().indexOf(filter) > -1) {
                rs.push(list[i]);
            }
        }
    })
    console.log(rs);
}
