// delete list ajax





var updateList1 = function() {
    var newcard = document.getElementsByClassName("new-card");

    for (var i = 0; i < newcard.length; i++) {
        // console.log(newcard[i]);
        newcard[i].addEventListener("focus", function () {
            // this.nextSibling.css("display", "block");
            this.nextSibling.style.display = 'block';
            var s = this.nextSibling;
            s.nextSibling.style.display = 'block';
        });

        newcard[i].addEventListener("focusout", function () {
            var s = this.nextSibling;
            if (this.value == '') {
                this.nextSibling.style.display = 'none';
                s.nextSibling.style.display = 'none';
                // }
            }
            // }
        });
    }
}

var updateList = function () {
    var newcard = document.getElementsByClassName("new-card");

    newcard[newcard.length - 1].addEventListener("focus", function () {
        // this.nextSibling.css("display", "block");
        this.nextSibling.style.display = 'block';
        var s = this.nextSibling;
        s.nextSibling.style.display = 'block';

        newcard[newcard.length - 1].addEventListener("focusout", function () {
            var s = this.nextSibling;
            if (this.value == '') {
                this.nextSibling.style.display = 'none';
                s.nextSibling.style.display = 'none';
                // }
            }
            // }
        });
    })
}

var showNotiSave = function(){
    var desCard = document.getElementsByClassName("des");
    for(var i=0; i<desCard.length; i++){
        desCard[i].onclick = function(){
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Lưu thành công',
                showConfirmButton: false,
                timer: 1200
              });
            //alert("OK");
        }
    }
}

$(document).ready(function () {

    var update_avatar = document.getElementsByClassName('update-avatar');
    for (var i = 0; i < update_avatar.length; i++) {
        update_avatar[i].onclick = function () {
            // console.log(this.nextSibling);
            this.nextSibling.click();
        }
    };

    updateList1();
    showNotiSave();

    // document.getElementsByClassName('update-avatar').onclick = function () {
    //     // console.log(this);
    // };

    $(".custom-file-input").on("change", function () {
        var fileName = $(this).val().split("\\").pop();
        $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
    });

    //display none button saveFile && saveCoverImg



    //show form deadline
    $(document).ready(function () {
        $(".deadline").click(function () {
            $(".formDeadline").toggle();
        });
    });
    //show button saveDeadline
    $(document).ready(function () {
        $(".saveDeadline").css("display", "none");
        ($('input[type="date"]') && $('input[type="time"]')).change(function (e) {
            $(".saveDeadline").css("display", "block");
        });
    });

    //show Deadline
    // $(".saveDeadline").click(function () {
    //     var date = $('input[type="date"]').val();
    //     var time = $('input[type="time"]').val();
    //     $(".deadline-date").text(date);
    //     $(".deadline-time").text(time);
    //     $(".show-deadline").css("display", "block");
    // });

    //click span change to input name-card
    
})
// AJAX
var updatedes = function (x) {
    x.click(function (e) {
        e.preventDefault();
        var a = $(this).prev();
        var desStr = a[0].lastElementChild.value;
        var card_id = $(this).attr('id').substr(3, $(this).attr('id').length);
        console.log(desStr);
        console.log(card_id);
        $.ajax({
            url: "/card/changeDescription/",
            type: 'post',
            data: { "des": desStr, "card_id": card_id },
            success: function (response) {
                $("#comment" + card_id).prepend(response); // response html
                // console.log($(".cmt").last().attr('id'))
            },
            error: function (xhr) {
                console.log('loi');
            },
        });
    });
}

var update_card_comment = function (xs) {
    xs.click(function (e) {
        e.preventDefault();
        var a = $(this).prev();
        var commentStr = a[0].value;
        var card_id = $(this).attr('id');
        console.log(card_id);
        $.ajax({
            url: "/card/addComment",
            type: 'post',
            data: { "comment": commentStr, "card_id": card_id },
            success: function (response) {
                $("#comment" + card_id).prepend(response); // response html
            },
            error: function (xhr) {
                console.log('loi');
            },
        });
    });
}


var changeImage = function(){$(".changeImg").on('submit', function (e) {
    e.preventDefault();
    var form = $(this);
    var url = form.attr('action');
    // console.log(url);
    var file = e.target.querySelectorAll('input')[0].files[0];
    var formData = new FormData();
    formData.append('file', file);
    $.ajax({
        url: url,
        data: formData,
        type: 'post',
        processData: false,
        contentType: false,
        success: function (response) {
            $('#exampleModal' + response.id + " .cover-img").css("background-image", "url(" + response.file + ")");
            $('#card' + response.id + " .card-img-top").attr("src", response.file);
        },
        error: function (xhr) {
            console.log('loi');
        },
        crossDomain: true
    });
});
}
var updateDeleteCard = function() {
    $('.deleteCard').off('submit');
    $(".deleteCard").on('submit', function (e) {
        e.preventDefault();
        var form = $(this);
        var url = form.attr('action');
        var xoa = $(this).parent();
        $.ajax({
            url: url,
            data: form.serialize(),
            type: 'get',
            success: function (response) {
                xoa.remove();
            },
            error: function (xhr) {
                console.log('loi');
            },
        });
    });
}
updateDeleteCard();
var imgModal = function() {

    $(".saveFile").css("display", "none");
    $('input[name="filename"]').off('change');
    $('input[name="filename"]').change(function (e) {
        $(".saveFile").css("display", "block");
    });



    $('.img-upload').css("display", "none");
    $(".saveCoverImg").css("display", "none");
    $('.img-upload').off('change');
    $('.img-upload').change(function (e) {
        $(".saveCoverImg").css("display", "block");
    });


    function checkForChanges() {
        if (!($("body").hasClass('modal-open'))) {
            $(".saveCoverImg").css("display", "none");
            $(".formDeadline").hide();
        }
        setTimeout(checkForChanges, 50);
    }

    $(checkForChanges);

}
imgModal();
var changeImg = function(){
    $(".changeImg").off('submit');
    $(".changeImg").on('submit', function (e) {
        e.preventDefault();
        var form = $(this);
        var url = form.attr('action');
        // console.log(url);
        var file = e.target.querySelectorAll('input')[0].files[0];
        var formData = new FormData();
        formData.append('file', file);
        $.ajax({
            url: url,
            data: formData,
            type: 'post',
            processData: false,
            contentType: false,
            success: function (response) {
                $('#exampleModal' + response.id + " .cover-img").css("background-image", "url(" + response.file + ")");
                $('#card' + response.id + " .card-img-top").attr("src", response.file);
            },
            error: function (xhr) {
                console.log('loi');
            },
            crossDomain: true
        });
    });
}
changeImg();
var cardName = function() {
    var switchToInput3 = function () {
        var $input = $("<input>", {
            val: $(this).text(),
            type: "text",
            rel: jQuery(this).text(),
        });
        $input.css({ 'font-weight': 'bold', 'margin-top': '2px' });
        $input.addClass("spanToInput3");
        $(this).replaceWith($input);
        $input.on("blur", switchToSpan3);
        $input.select();
        $input.focusout(function() {
            $.ajax({
                url: "/card/editCardName",
                data: { "card_name": $input.val(), "card_id": $input.parent().parent().parent().parent().parent().parent().attr('id').substring(12)},
                success: function (response) {
                    $('#cardName'+response.id).text(response.name);
                },
                error: function (xhr) {
                    console.log('loi');
                },
                // complete: function () {
                //     // $.getScript("/js/work.js");
                //     $.getScript("/js/card.js");
                // }
            });
        })
    };
    var switchToSpan3 = function () {
        if (jQuery(this).val()) {
            var $text = jQuery(this).val();
        } else {
            var $text = jQuery(this).attr('rel');
        }
        var $span = $("<span>", {
            text: $text,
        });
        $span.addClass("spanToInput3");
        $span.addClass("span-cardname");
        $(this).replaceWith($span);
        $span.on("click", switchToInput3);
    }

    $(".spanToInput3").on("click", switchToInput3);
}
cardName();
var updateForm1 = function () {
    $('.form-add-card').on('submit', function (e) {
        e.preventDefault();
        var file = e.target.querySelectorAll('input')[2].files[0];
        var order = $(this).serializeJSON();
        var formData = new FormData();
        var list_id = e.target.querySelectorAll('button')[0].id;
        formData.append('file', file);
        formData.append('newcard', order['new-card']);
        formData.append('description', order.description);
        formData.append('listid', list_id);
        formData.append('workid', window.location.search.substring(4));
        var xa = $(this);
        $.ajax({
            url: "/card/addCard",
            // data: { "list_name": $('#new-list').val(), "work_id": window.location.search.substring(4) },
            data: formData,
            type: 'post',
            processData: false,
            contentType: false,
            success: function (response) {
                console.log(response);
                $("#add-card" + list_id).append(response);
                var a = $("#add-card" + list_id + ' .des').last();

                var card_id = xa.parent().prev().attr('id');
                var xs = $("#"+card_id+" .cmt");
                console.log(xs);
                
                update_card_comment(xs.last());
                updatedes(a);
                // var update_avatar = document.getElementsByClassName('update-avatar');
                
                // update_avatar[update_avatar.length-1].onclick = function () {
                //     // console.log(this.nextSibling);
                //     this.nextSibling.click();
                // }
                var ua = $("#"+card_id+" .update-avatar");
                ua.last().click(function(e) {
                    $(this)[0].nextSibling.click();
                })
                updateDeleteCard();
                imgModal();
                changeImg();
                cardName();
            },
            error: function (xhr) {
                console.log('loi');
            },
            // complete: function () {
            //     $.getScript("/js/cardForReload.js", function () {
            //         // alert('add cardReload js thanh cong');
            //     });
            // },
            crossDomain: true
        });
    });
}

var updateForm = function () {
    $('.form-add-card').last().on('submit', function (e) {
        e.preventDefault();
        var file = e.target.querySelectorAll('input')[2].files[0];
        var order = $(this).serializeJSON();
        var formData = new FormData();
        var list_id = e.target.querySelectorAll('button')[0].id;
        formData.append('file', file);
        formData.append('newcard', order['new-card']);
        formData.append('description', order.description);
        formData.append('listid', list_id);
        formData.append('workid', window.location.search.substring(4));
        var xa = $(this);
        $.ajax({
            url: "/card/addCard",
            // data: { "list_name": $('#new-list').val(), "work_id": window.location.search.substring(4) },
            data: formData,
            type: 'post',
            processData: false,
            contentType: false,
            success: function (response) {
                console.log(response);
                $("#add-card" + list_id).append(response);
                var a = $("#add-card" + list_id + ' .des').last();
                // update_card_comment();
                var card_id = xa.parent().prev().attr('id');
                var xs = $("#"+card_id+" .cmt");
                console.log(xs);
                update_card_comment(xs.last());
                console.log($(this));
                updatedes(a);

                var ua = $("#"+card_id+" .update-avatar");
                ua.last().click(function(e) {
                    $(this)[0].nextSibling.click();
                })
                updateDeleteCard();
                imgModal();
                changeImg();
                cardName();
            },
            error: function (xhr) {
                console.log('loi');
            },
            // complete: function () {
            //     $.getScript("/js/cardForReload.js", function () {
            //         // alert('add cardReload js thanh cong');
            //     });
            // },
            crossDomain: true
        });
    });
}


$(document).ready(function () {
    updateForm1();
});
var updateDeleteList = function() {
    $('.deleteList').off('submit');
    $(".deleteList").on('submit', function (e) {
        e.preventDefault();
        var form = $(this);
        var url = form.attr('action');
        var xoa = $(this).parent().parent();
        $.ajax({
            url: url,
            data: form.serialize(),
            type: 'get',
            success: function (response) {
                xoa.remove();
            },
            error: function (xhr) {
                console.log('loi');
            },
        });
    });
}
    updateDeleteList();
    var changeList = function() {

        var switchToInput2 = function () {
            var $input = $("<input>", {
                val: $(this).text(),
                type: "text",
                rel: jQuery(this).text(),
            });
            $input.css({ 'height': '24px', 'margin': '0' });
            $input.addClass("spanToInput2");
            $(this).replaceWith($input);
            $input.on("blur", switchToSpan2);
            $input.select();
        
            var nameList = document.getElementsByClassName("spanToInput2");
            for (var i = 0; i < nameList.length; i++) {
                var tit = nameList[i].innerHTML;
                nameList[i].title = tit;
            }
        
            $input.focusout(function() {
                $.ajax({
                    url: "/card/editList",
                    data: { "list_name": $input.val(), "list_id": $input.parent().attr('action').substring(17) },
                    error: function (xhr) {
                        console.log('loi');
                    },
                    // complete: function () {
                    //     // $.getScript("/js/work.js");
                    //     $.getScript("/js/card.js");
                    // }
                });
            })
        
            // $input.focus(function(){
            //     alert(123);
            // });
        };
        var switchToSpan2 = function () {
            if (jQuery(this).val()) {
                var $text = jQuery(this).val();
            } else {
                var $text = jQuery(this).attr('rel');
            }
            var $span = $("<span>", {
                text: $text,
            });
            $span.addClass("spanToInput2");
            $(this).replaceWith($span);
            $span.on("click", switchToInput2);
        
            var nameList = document.getElementsByClassName("spanToInput2");
            for (var i = 0; i < nameList.length; i++) {
                var tit = nameList[i].innerHTML;
                nameList[i].title = tit;
            }
        }
        $(".spanToInput2").on("click", switchToInput2);
        
        //add title to span
        var nameList = document.getElementsByClassName("spanToInput2");
        for (var i = 0; i < nameList.length; i++) {
            var tit = nameList[i].innerHTML;
            nameList[i].title = tit;
        }   
        }
        
    changeList();
$(document).ready(function () {
    $(".addlist").click(function () {
        $.ajax({
            url: "/card/addList",
            data: { "list_name": $('#new-list').val(), "work_id": window.location.search.substring(4) },
            success: function (response) {
                $(".add-new-list").before(response);
                updateList();
                updateForm();
                updateDeleteList();
                changeList();
            },
            error: function (xhr) {
                console.log('loi');
            },
            // complete: function () {
            //     // $.getScript("/js/work.js");
            //     $.getScript("/js/card.js");
            // }
        });
    });
});

// $(document).ready(function () {
//     $(".cmt").click(function(e){
//     e.preventDefault();
//         var a = $(this).prev();
//         var commentStr = a[0].value;
//         var card_id = $(this).attr('id');
//     socket.emit("usersend",commentStr );
//   });
// })

// ajax new comment
var socket = io("http://localhost:3000");
socket.on("serverSendComment", function(data){
    $("#comment" + data.cardId ).prepend('<div class="a-comment"><img class="rounded-circle avatar-comment" src="'+data.avatar+'" alt="my avatar" /><a class="link-profile-member" href="../Profile/profileOther.html">'+data.name+'</a><div class="comment container">'+data.comment+'</div></div>');
});
$(document).ready(function () {
    $(".cmt").click(function (e) {
        e.preventDefault();
        var a = $(this).prev();
        var commentStr = a[0].value;
        var card_id = $(this).attr('id');
        console.log(card_id);
        $.ajax({
            url: "/card/addComment",
            type: 'post',
            data: { "comment": commentStr, "card_id": card_id },
            success: function (response) {
                // $("#comment" + card_id).prepend(response); // response html
                // console.log($(".cmt").last().attr('id'))
                // // console.log($(".cmt").first())
            },
            error: function (xhr) {
                console.log('loi');
            },
        });
    });


})

// ajax modal:

$(document).ready(function () {
    $(".des").click(function (e) {
        e.preventDefault();
        var a = $(this).prev();
        var desStr = a[0].lastElementChild.value;
        var card_id = $(this).attr('id').substr(3, $(this).attr('id').length);
        console.log(desStr);
        console.log(card_id);
        $.ajax({
            url: "/card/changeDescription/",
            type: 'post',
            data: { "des": desStr, "card_id": card_id },
            success: function (response) {
                $("#comment" + card_id).prepend(response); // response html
                console.log($(".cmt").last().attr('id'))
            },
            error: function (xhr) {
                console.log('loi');
            },
        });
    });

})

// ajax form:

$(document).ready(function () {
    
})