function pintarProductos(){
    var contenedor = document.querySelector(".contenedor");
    if (!contenedor) return;

    var html = "";

    PRODUCTOS.forEach(function(producto){
        html += `
            <article class="caluga">
                <a href="paginas/producto.html?id=${producto.id}" class="producto-link">
                    <span class="nombre">${producto.nombre}</span>
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                </a>
                <span class="precio">Precio: $${producto.precio.toLocaleString("es-CL")}</span>
                <button class="button producto-control" data-id="${producto.id}">Agregar</button>
            </article>
        `;
    });

    contenedor.innerHTML = html;
}

pintarProductos();