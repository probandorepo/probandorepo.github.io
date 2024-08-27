function sendMessage(id) {
    var telefono = id; 

    // Recoger el texto de los labels y del textarea
    var nombre = document.getElementById('name').value; // Reemplaza 'label1' con el id de tu label
   // Reemplaza 'textarea' con el id de tu textarea
    var textarea = document.getElementById('message').value;

    // Construir el mensaje
    var mensaje = `Hola, soy ${nombre} y el motivo de mi consulta es: ${textarea}`;

    // Codificar el mensaje para que sea compatible con URL
    var mensajeCodificado = encodeURIComponent(mensaje);

    // Construir el enlace de WhatsApp
    var url = `https://wa.me/${telefono}?text=${mensajeCodificado}`;

    // Abrir el enlace en una nueva ventana/pestaña
    window.open(url, '_blank');
}
