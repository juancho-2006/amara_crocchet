let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
const listaCarrito = document.getElementById('lista-carrito');
const total = document.getElementById('total');
const contenedorCarrito = document.getElementById("carrito");
const btnToggleCarrito = document.getElementById("toggleCarrito");
const contadorCarrito = document.getElementById("contador-carrito");

const opcionesTalla = ["XS", "S", "M", "L", "XL"];
const opcionesColor = [
  { nombre: "Rojo", codigo: "#8e2121ff" },
  { nombre: "Marfil", codigo: "#fdf0d5" },
  { nombre: "Azul", codigo: "#003049" },
  { nombre: "Lavanda", codigo: "#b497bd" },
  { nombre: "Verde Oliva", codigo: "#6b705c" }
];

const productos = [
  {
    nombre: "Amapola",
    precio: 45000,
    imagen: "img/Amapola.png",
    etiquetas: ["Nuevo", " Hecho a mano"]
  },
  {
    nombre: "Marfil",
    precio: 30000,
    imagen: "img/Marfil.png",
    etiquetas: ["Elegante", " Hecho a mano"]
  }
];

// Generar productos dinámicamente en la galería
const galeria = document.querySelector('.galeria');
galeria.innerHTML = '';
productos.forEach((producto, index) => {
  const div = document.createElement('div');
  div.className = 'producto';

  let etiquetasHTML = '';
  if (producto.etiquetas && producto.etiquetas.length > 0) {
    etiquetasHTML = `<div class="etiquetas">
      ${producto.etiquetas.map(etq => `<span class="etiqueta">${etq}</span>`).join('')}
    </div>`;
  }

  const selectTalla = `
    <label for="talla-${index}">Talla:</label>
    <select class="selector-talla" id="talla-${index}">
      ${opcionesTalla.map(t => `<option value="${t}">${t}</option>`).join('')}
    </select>
  `;

  const colorCircles = `
    <label>Color:</label>
    <div class="color-options" data-index="${index}">
      ${opcionesColor.map(c => `
        <span class="color-circle" 
              style="background-color: ${c.codigo};" 
              data-color="${c.nombre}" 
              title="${c.nombre}">
        </span>
      `).join('')}
    </div>
  `;

 div.innerHTML = `
  <img src="${producto.imagen}" alt="${producto.nombre}">
  ${etiquetasHTML}
  <h3>${producto.nombre}</h3>
  <p>$${Number(producto.precio).toLocaleString()}</p>
  <button class="ver-mas">Ver más</button>

  <div class="detalle-producto" style="display: none;">
    ${selectTalla}
    ${colorCircles}
    <button class="agregar-carrito">Agregar al carrito</button>
  </div>
`;

  galeria.appendChild(div);
  const botonVerMas = div.querySelector('.ver-mas');
const detalle = div.querySelector('.detalle-producto');

botonVerMas.addEventListener('click', () => {
  const visible = detalle.style.display === 'block';
  detalle.style.display = visible ? 'none' : 'block';
  botonVerMas.textContent = visible ? 'Ver más' : 'Ver menos';
});

});

// Activar selección visual de color
document.querySelectorAll('.color-options').forEach(div => {
  div.addEventListener('click', e => {
    if (e.target.classList.contains('color-circle')) {
      const parent = e.target.parentElement;
      parent.querySelectorAll('.color-circle').forEach(c => c.classList.remove('selected'));
      e.target.classList.add('selected');
      
    }
  });
});

// Asignar eventos a los botones

const botonesAgregar = document.querySelectorAll('.agregar-carrito');
botonesAgregar.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    const productoDiv = btn.closest('.producto');
    const talla = productoDiv.querySelector('.selector-talla').value;
    const color = productoDiv.querySelector('.color-circle.selected')?.dataset.color;

    if (!color) {
      alert("Por favor selecciona un color antes de agregar al carrito.");
      return;
    }

    const producto = productos[index];

    carrito.push({
      nombre: producto.nombre,
      precio: producto.precio,
      talla: talla,
      color: color
    });

    guardarCarrito();
    actualizarCarrito();
  });
});


function actualizarCarrito() {
  listaCarrito.innerHTML = '';
  let suma = 0;

  carrito.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${item.nombre} - $${item.precio.toLocaleString()}
      <br><small>Talla: ${item.talla}, Color: ${item.color}</small>
    `;

    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = 'Eliminar';
    btnEliminar.style.marginLeft = '10px';
    btnEliminar.onclick = () => {
      carrito.splice(index, 1);
      guardarCarrito();
      actualizarCarrito();
    };

    li.appendChild(btnEliminar);
    listaCarrito.appendChild(li);
    suma += item.precio;
  });

  total.textContent = `Total: $${suma.toLocaleString()}`;
  contadorCarrito.textContent = `(${carrito.length})`;
}

function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Mostrar/ocultar catálogo
document.getElementById('btn-catalogo').addEventListener('click', function (e) {
  e.preventDefault();
  const catalogo = document.getElementById('catalogo');
  const amaraAutentico = document.getElementById('amara-autentico');

  const mostrar = (catalogo.style.display !== 'block');
  catalogo.style.display = mostrar ? 'block' : 'none';
  if (mostrar) {
    catalogo.scrollIntoView({ behavior: 'smooth' });
  }

  amaraAutentico.style.display = mostrar ? 'none' : 'block';
});

// Mostrar/ocultar carrito 
document.getElementById("btnCarritoFijo").addEventListener("click", function (e) {
  e.preventDefault();
  contenedorCarrito.style.display = (contenedorCarrito.style.display === "none" || contenedorCarrito.style.display === "") ? "block" : "none";
});

// Mostrar contenido principal y ocultar portada
document.getElementById("btnEmpezar").addEventListener("click", function () {
  document.getElementById("portada").style.display = "none";
  document.getElementById("contenido-principal").style.display = "block";
  window.scrollTo(0, 0);
});

document.getElementById('btnCarritoFijo').addEventListener('click', function(e) {
  e.preventDefault();
  document.getElementById('carritoLateral').classList.toggle('visible');
});

// Inicializar
actualizarCarrito();
// Mostrar/ocultar "Sobre nosotros"
document.getElementById('btn-sobre-nosotros').addEventListener('click', function (e) {
  e.preventDefault();
  const sobreNosotros = document.getElementById('sobre-nosotros');
  const amaraAutentico = document.getElementById('amara-autentico');

  const mostrar = (sobreNosotros.style.display !== 'block');
  sobreNosotros.style.display = mostrar ? 'block' : 'none';

  if (mostrar) {
    sobreNosotros.scrollIntoView({ behavior: 'smooth' });
    amaraAutentico.style.display = 'none';
  } else {
    amaraAutentico.style.display = 'block';
  }
});
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.toggle-btn').forEach(btn => {
    if (btn.tagName === 'BUTTON' && !btn.hasAttribute('type')) btn.type = 'button';

    btn.addEventListener('click', (e) => {
      if (btn.tagName === 'A') e.preventDefault();

      const content = btn.nextElementSibling;
      if (!content) return;

      // Guardar el display original una sola vez
      if (!content.dataset.origDisplay) {
        const cs = window.getComputedStyle(content).display;
        content.dataset.origDisplay = (cs === 'none') ? 'block' : cs;
      }

      const isHidden = window.getComputedStyle(content).display === 'none';
      content.style.display = isHidden ? content.dataset.origDisplay : 'none';
    });
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".hero-carousel img");
  let currentIndex = 0;
  const intervalTime = 4000; // tiempo entre cambios en milisegundos (4s)

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }

  // Inicial
  showSlide(currentIndex);

  // Cambia automáticamente
  setInterval(nextSlide, intervalTime);
});
document.getElementById('btnLogin').addEventListener('click', () => {
  document.getElementById('loginSection').style.display = 'block';
  document.getElementById('btnLogin').style.display = 'none'; // Oculta el botón original si quieres
});

document.getElementById('btnLogin').addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById('loginSection').style.display = 'block';
});

// Cambiar a formulario de registro
document.getElementById('btnRegister').addEventListener('click', () => {
  document.getElementById('loginSection').innerHTML = `
    <h2>Crear cuenta</h2>
    <form id="registerForm">
      <label for="name">Nombre completo:</label><br>
      <input type="text" id="name" name="name" required><br><br>

      <label for="email">Correo:</label><br>
      <input type="email" id="email" name="email" required><br><br>

      <label for="password">Contraseña:</label><br>
      <input type="password" id="password" name="password" required><br><br>

      <label for="confirmPassword">Confirmar contraseña:</label><br>
      <input type="password" id="confirmPassword" name="confirmPassword" required><br><br>

      <button type="submit">Registrarse</button>
      <button type="button" id="btnVolverLogin">Volver a iniciar sesión</button>
    </form>
  `;

  // Volver a login
  document.getElementById('btnVolverLogin').addEventListener('click', () => {
    mostrarFormularioLogin();
  });
});

// Función para restaurar el formulario de login
function mostrarFormularioLogin() {
  document.getElementById('loginSection').innerHTML = `
    <h2>Bienvenido</h2>
    <form id="loginForm">
      <label for="email">Correo:</label><br>
      <input type="email" id="email" name="email" required><br><br>

      <label for="password">Contraseña:</label><br>
      <input type="password" id="password" name="password" required><br><br>

      <button type="submit">Iniciar sesión</button>
      <button type="button" id="btnRegister">Crear cuenta</button>
    </form>
  `;

  // Reasignar evento de registro
  document.getElementById('btnRegister').addEventListener('click', () => {
    document.getElementById('btnRegister').click();
  });
}

