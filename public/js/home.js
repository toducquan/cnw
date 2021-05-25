// $(".board-title").click(function() {
//     alert("helo");
// })
$('.board-title').click('shown.bs.modal', function () {
    $('[name="name"]').trigger('focus')
})

$('#congviec').keyup(function () {
    if ($(this).val().length != 0) {
        $('#show').removeAttr('name');
        $('#show').hide();
        $('#congviec').attr('name', 'team_id');
    }
    if ($(this).val().length == 0) {
        $('#congviec').removeAttr('name');
        $('#show').show();
        $('#show').attr('name', 'team_id');
    }
});


//check image for new work
$(document).ready(function() {
    $('#addNewWork').click(function(){
        var fileName = $('#imgWork').val().split("\\").pop();
        if(fileName == '')
            $("#notiImgWork").css("display", "block");
        else
            $("#notiImgWork").css("display", "none");
    });
});

// Add the following code if you want the name of the file appear on select
$(".custom-file-input").on("change", function () {
    var fileName = $(this).val().split("\\").pop();
    $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
});

// validate
(function () {
    'use strict';
    window.addEventListener('load', function () {
        var forms = document.getElementsByClassName('needs-validation');
        var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();


// AJAX

// $(document).ready(function () {
//     $(".deleteWork").on('submit', function (e) {
//         e.preventDefault();
//         var form = $(this);
//         var url = form.attr('action');
//         var xoa = $(this).parent();
//         $.ajax({
//             url: url,
//             data: form.serialize(),
//             type: 'get',
//             success: function (response) {
//                 xoa.remove();
//             },
//             error: function (xhr) {
//                 console.log('loi');
//             },
//         });
//     });
// })