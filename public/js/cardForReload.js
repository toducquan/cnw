var updateList = function() {
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


$(document).ready(function () {

    var update_avatar = document.getElementsByClassName('update-avatar');
    for (var i = 0; i < update_avatar.length; i++) {
        update_avatar[i].onclick = function () {
            // console.log(this.nextSibling);
            this.nextSibling.click();
        }
    };
    
    updateList();

    document.getElementsByClassName('update-avatar').onclick = function () {
        // console.log(this);
    };

    $(".custom-file-input").on("change", function () {
        var fileName = $(this).val().split("\\").pop();
        $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
    });

    //display none button saveFile && saveCoverImg
    $(document).ready(function () {
        $(".saveFile").css("display", "none");
        $('input[name="filename"]').change(function (e) {
            $(".saveFile").css("display", "block");
        });
    });
    $(document).ready(function () {
        $(".saveCoverImg").css("display", "none");
        $('.img-upload').change(function (e) {
            $(".saveCoverImg").css("display", "block");
        });
    });


    $(document).ready(function () {
        function checkForChanges() {
            if (!($("body").hasClass('modal-open'))) {
                $(".saveCoverImg").css("display", "none");
                $(".formDeadline").hide();
            }
            setTimeout(checkForChanges, 500);
        }
        $(checkForChanges);
    });


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
    $(".saveDeadline").click(function () {
        var date = $('input[type="date"]').val();
        var time = $('input[type="time"]').val();
        $(".deadline-date").text(date);
        $(".deadline-time").text(time);
        $(".show-deadline").css("display", "block");
    });
    //click span change to input name-card
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
})