const socketClient = io();
socketClient.on("enviando productos", (obj) => {
  ProductList(obj);
});

// Listado de productos en el endPonint http://localhost:8080/realTimeProducts
function ProductList(productList) {
  const productsDiv = document.getElementById("list-products");
  let productosHTML = "";
  productList.forEach((product) => {
    productosHTML += `
        <div class="">
        <div class="">
          <div class="">
            <img
              src=${product.img}
              class=""
              alt="Imagen descriptiva del producto"
            />
          </div>
          <div class=">
            <div class="">
              <h5 class="">${product.title}</h5>
              <p class="">${product.description} </p>
              <div class="">
                <p class=""><span class=""> Categoria: </span> ${product.code}</p>
              </div>
              <div class="">
                <p class="price"><span class="">precio: </span>${product.price} </p>
                <p class=""><span class="">Unidades disponibles:</span>
                   ${product.stock}</p>
                </div>
                <div class="">
                <small class=""><span class="">ID:</span> ${product.id}</small>
                <small class=""> <span class="">code:</span> ${product.code} </small>
                </div>
                </div>
          </div>
        </div>
      </div>`;
  });
  productsDiv.innerHTML = productosHTML;
}

// Crear producto en el endPoint http://localhost:8080/realTimeProducts y a su vez se muestra en la raiz http://localhost:8080
let form = document.getElementById("formProduct");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let title = form.elements.title.value;
  let description = form.elements.description.value;
  let stock = form.elements.stock.value;
  let img = form.elements.img.value;
  let code = form.elements.code.value;
  let price = form.elements.price.value;
    
  socketClient.emit("addProduct", {  
    title,
    description,
    stock,
    img,
    code,
    price,
  });

  // Resetear el formulario después de enviar la información
  form.reset();
});

document.getElementById("delete-btn").addEventListener("click", function () {
  const deleteInnput = document.getElementById("id-prod");
  const deleteId = deleteInnput.value;
  socketClient.emit("deleteProduct", deleteId);
  deleteInnput.value = "";
});



