$(function () {

    let i = 0;
    function change() {
        ++i;
        $($(".carrusel-track div")[i - 1]).animate({ width: "10%" }, 0.01).removeClass("a");
        $($('.slide li')[i - 1]).removeClass("b");
        if (i == 5) {
            i = 0;
        }
        $($(".carrusel-track div")[i]).animate({ width: "50%" }).addClass("a");
        $($('.slide li')[i]).addClass("b");
    }
    var a = setInterval(change, 2000);

    let j = 0;
    $('.carrusel-track div').click(function () {
        clearInterval(a);
        j = $(this).index();
        if ($(this).hasClass("a")) { }
        else {
            $('.carrusel-track div').animate({ width: "10%" }, 0.5).removeClass('a');
            $('.slide li').removeClass('b');
            $(this).animate({ width: "50%" }, 200).addClass('a');
            $($('.slide li')[$(this).index()]).addClass('b');
        }
    });

    $('.carrusel-container span').click(function () {
        clearInterval(a);
        j = $('.carrusel-track .a').index();
        if (j == 0 && $(this).hasClass('prev')) {
            $($('.carrusel-track div')[0]).animate({ width: "10%" }, 0.01).removeClass("a");
            $($('.slide li')[0]).removeClass("b");
            $($('.carrusel-track div')[4]).animate({ width: "50%" }, 200).addClass("a");
            $($('.slide li')[4]).addClass("b");
        }
        else if (j == 4 && $(this).hasClass('next')) {
            $($('.carrusel-track div')[4]).animate({ width: "10%" }, 0.01).removeClass("a");
            $($('.slide li')[4]).removeClass("b");
            $($('.carrusel-track div')[0]).animate({ width: "50%" }, 200).addClass("a");
            $($('.slide li')[0]).addClass("b");
        }
        else {
            if ($(this).hasClass("prev")) {
                $($('.carrusel-track div')[j]).animate({ width: "10%" }, 0.01).removeClass("a");
                $($('.slide li')[j]).removeClass("b");
                $($('.carrusel-track div')[j - 1]).animate({ width: "50%" }, 200).addClass("a");
                $($('.slide li')[j - 1]).addClass("b");
            }
            else {
                $($('.carrusel-track div')[j]).animate({ width: "10%" }, 0.01).removeClass("a");
                $($('.slide li')[j]).removeClass("b");
                $($('.carrusel-track div')[j + 1]).animate({ width: "50%" }, 200).addClass("a");
                $($('.slide li')[j + 1]).addClass("b");
            }
        }
    });

});