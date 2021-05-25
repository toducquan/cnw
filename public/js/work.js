$(document).ready(function () {

    $("#avatar").click(function () {
        $("#formInvite").hide();
        $("#formAvt").toggle();
    });
});
$(document).ready(function () {
    $("#invite").click(function () {
        $("#formAvt").hide();
        $("#formInvite").toggle();
    });
});
$(document).ready(function () {
    $("#show-menu").click(function () {
        $("#formAvt").hide();
        $("#formInvite").hide();
        $("#formMenu").toggle();
    });
});
$(function () {
    $("#dropdown-menu-work-type a").click(function () {
        $("#dropdown-work-type .selection").text($(this).text());
    });
});
$(document).ready(function () {
    $("#dropdown-work-type").click(function () {
        $("#formAvt").hide();
        $("#formInvite").hide();
    });
});
$(".custom-file-input").on("change", function () {
    var fileName = $(this).val().split("\\").pop();
    $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
});
function openRightMenu() {
    document.getElementById("rightMenu").style.display = "block";
}
function closeRightMenu() {
    document.getElementById("rightMenu").style.display = "none";
}

// check validate addList
function checkList() {
    var nameNewList = document.getElementById("new-list").value;
    if (nameNewList == '') {
        alert("Empty");
        return false;
    }
    return true;
}

//click span change to input name-work
var switchToInput = function () {
    var $input = $("<input>", {
        val: $(this).text(),
        type: "text",
        rel: jQuery(this).text(),
    });
    $input.css({ 'font-weight': 'bold', 'margin-top': '2px' });
    $input.addClass("spanToInput");
    $(this).replaceWith($input);
    $input.on("blur", switchToSpan);
    $input.select();
};
var switchToSpan = function () {
    if (jQuery(this).val()) {
        var $text = jQuery(this).val();
    } else {
        var $text = jQuery(this).attr('rel');
    }
    var $span = $("<span>", {
        text: $text,
    });
    $span.addClass("spanToInput");
    $span.addClass("span-nav");
    $(this).replaceWith($span);
    $span.on("click", switchToInput);
}
$(".spanToInput").on("click", switchToInput);

//click span change to input name-list

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
