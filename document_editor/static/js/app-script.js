
$(function () {
    "use strict";


    //sidebar menu js
    $.sidebarMenu($('.sidebar-menu'));

    // === toggle-menu js

    $(".toggle-menu, .overlay").on("click", function (e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
        $(".overlay").toggleClass("active");
    });

    // === sidebar menu activation js

    $(function () {
        for (var i = window.location, o = $(".sidebar-menu a").filter(function () {
            return this.href == i;
        }).addClass("active").parent().addClass("active"); ;) {
            if (!o.is("li")) break;
            o = o.parent().addClass("in").parent().addClass("active");
        }
    }),

        /* Back To Top */

        $(document).ready(function () {
            $(window).on("scroll", function () {
                if ($(this).scrollTop() > 300) {
                    $('.back-to-top').fadeIn();
                } else {
                    $('.back-to-top').fadeOut();
                }
            });
            $('.back-to-top').on("click", function () {
                $("html, body").animate({ scrollTop: 0 }, 600);
                return false;
            });
        });

    $(function () {
        $('[data-toggle="popover"]').popover()
    })


    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })


    $("#rangeComic").ionRangeSlider({
        min: 0,
        max: 100,
        onChange: function (data) {
            $("#Comic").html(data.from);
        },
    });

    $("#rangeCritics").ionRangeSlider({
        min: 0,
        max: 100,
        onChange: function (data) {
            $("#Critics").html(data.from);
        },
    });

    $("#rangeIrony").ionRangeSlider({
        min: 0,
        max: 100,
        onChange: function (data) {
            $("#Irony").html(data.from);
        },
    });

    $("#rangeBusiness").ionRangeSlider({
        min: 0,
        max: 100,
        onChange: function (data) {
            $("#Business").html(data.from);
        },
    });

    $("#rangeArticle").ionRangeSlider({
        min: 0,
        max: 100,
        onChange: function (data) {
            $("#Article").html(data.from);
        },
    });
    $("#rangeTextToner").ionRangeSlider({
        min: 0,
        max: 1000,
    });
});