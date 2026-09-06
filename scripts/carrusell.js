$(function () {

    const $slides = $('.carrusel-slide');
    const $dots = $('.slide li');
    let i = 0;

    function goTo(index) {
        $slides.eq(i).removeClass('a');
        $dots.eq(i).removeClass('b');
        i = (index + $slides.length) % $slides.length;
        $slides.eq(i).addClass('a');
        $dots.eq(i).addClass('b');
    }

    let auto = setInterval(() => goTo(i + 1), 2500);
    function resetAuto() {
        clearInterval(auto);
        auto = setInterval(() => goTo(i + 1), 2500);
    }

    $dots.on('click', function () {
        goTo($dots.index(this));
        resetAuto();
    });

    $('.carrusel-container .prev').on('click', function () {
        goTo(i - 1);
        resetAuto();
    });

    $('.carrusel-container .next').on('click', function () {
        goTo(i + 1);
        resetAuto();
    });

    $slides.on('click', function (e) {
        const index = $slides.index(this);
        if (index !== i) {
            e.preventDefault();
            goTo(index);
            resetAuto();
        }
    });

});