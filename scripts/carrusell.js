$(function () {
    // Espera a que el DOM esté listo para ejecutar el código
    const $slides = $('.carrusel-slide'); // Selecciona todos los elementos que representan las diapositivas
    const $dots = $('.slide li');         // Selecciona los indicadores (bolitas)
    let i = 0;                            // Índice actual de la diapositiva activa

    // Función para ir a una diapositiva específica
    function goTo(index) {
        $slides.eq(i).removeClass('a');   // Quita la clase activa de la diapositiva actual
        $dots.eq(i).removeClass('b');     // Quita la clase activa del indicador actual
        i = (index + $slides.length) % $slides.length; // Calcula el nuevo índice (cíclico)
        $slides.eq(i).addClass('a');      // Activa la nueva diapositiva
        $dots.eq(i).addClass('b');        // Activa el nuevo indicador
    }

    // Reproducción automática cada 2.5 segundos
    let auto = setInterval(() => goTo(i + 1), 2500);

    // Reinicia el temporizador automático (cuando hay interacción manual)
    function resetAuto() {
        clearInterval(auto);
        auto = setInterval(() => goTo(i + 1), 2500);
    }

    // Al hacer clic en un indicador (bolita)
    $dots.on('click', function () {
        goTo($dots.index(this)); // Cambia a la diapositiva correspondiente
        resetAuto();             // Reinicia el auto-play
    });

    // Botón "prev" (flecha izquierda)
    $('.carrusel-container .prev').on('click', function () {
        goTo(i - 1);             // Retrocede una diapositiva
        resetAuto();
    });

    // Botón "next" (flecha derecha)
    $('.carrusel-container .next').on('click', function () {
        goTo(i + 1);             // Avanza una diapositiva
        resetAuto();
    });

    // Al hacer clic en una diapositiva
    $slides.on('click', function (e) {
        const index = $slides.index(this);
        if (index !== i) {       // Si no es la diapositiva activa
            e.preventDefault();  // Evita la acción por defecto (ej. enlace)
            goTo(index);         // Cambia a esa diapositiva
            resetAuto();
        }
    });
});
