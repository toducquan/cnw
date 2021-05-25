document.getElementById('update-avatar').onclick = function() {
        document.getElementById('img-upload').click();
    };

    $(document).ready(function() {
        $('input[type="file"]').change(function(e) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Tải lên thành công',
                showConfirmButton: false,
                timer: 1200
            })
        });
    });

    $(".custom-file-input").on("change", function() {
        var fileName = $(this).val().split("\\").pop();
        $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
    });

    //zoom avatar
    var modalAvatar = document.getElementById("myModalAvatar");

    var img = document.getElementById("myImg");
    var modalImg = document.getElementById("img01");
    img.onclick = function() {
        modalAvatar.style.display = "block";
        modalImg.src = this.src;
    }
    var closeAvatar = document.getElementById("close-avatar");
    $("#close-avatar").click(function() {
        modalAvatar.style.display = "none";
    });
    //end zoom

    // Disable form submissions if there are invalid fields
    (function() {
        'use strict';
        window.addEventListener('load', function() {
            // Get the forms we want to add validation styles to
            var forms = document.getElementsByClassName('needs-validation');
            // Loop over them and prevent submission
            var validation = Array.prototype.filter.call(forms, function(form) {
                form.addEventListener('submit', function(event) {
                    if (form.checkValidity() === false) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                    form.classList.add('was-validated');
                }, false);
            });
        }, false);
    })();

    function checkPass() {
        var newPassword = document.changePass.newPass.value;
        var rePassword = document.changePass.rePass.value;

        if (newPassword == rePassword /*&& (newPassword != null || newPassword != "")*/ ) {
            return true;
        } else {
            alert("Mật khẩu không trùng khớp");
            return false;
        }
    };