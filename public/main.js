const socket = io();


function makeHTML(mensajes) {
    return mensajes
        .map((elem, index) => {
            return `<div>
                <b style="color: blue;">${elem.author}</b>
                <span style="color: brown;">[${elem.date}]</span>:
                <em>${elem.text}</em> </div>`;
        })
        .join(" ");
}

function render(data) {
    const html = makeHTML(data);
    document.getElementById("mensajes").innerHTML = html;
}

socket.on("mensajes", (mensajes) => {
    render(mensajes);
});

function makeProductHTML(productos) {
    return productos
        .map((elem, index) => {
            return `<div>
                <strong>Title: ${elem.title}</strong><br>
                <em>Price: ${elem.price}</em><br>
                <em>Thumbnail: ${elem.thumbnail}</em><br>
                <em>Timestamp: ${elem.timeStamp}</em><br>
                <em>Id: ${elem.id}</em><br>
                </div>`;
        })
        .join(" ");
}
function renderProducts(data) {
    const html = makeProductHTML(data);
    document.getElementById("productsContainer").innerHTML = html;
}
socket.on("productos", (productos) => {
    renderProducts(productos);
});

function addMessage(e) {
    const mensaje = {
        author: document.getElementById("username").value,
        date: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
        
        text: document.getElementById("texto").value,
    };
    socket.emit("nuevoMensaje", mensaje);
    return false;
}
