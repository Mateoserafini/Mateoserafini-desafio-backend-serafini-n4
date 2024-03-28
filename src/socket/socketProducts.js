import {ProductManager} from "../controllers/productManager.js";

const prod = new ProductManager();

const socketProducts = (socketServer) => {
  // Obtener lista de productos en el endpoint http://localhost:8080/realTimeProducts
  socketServer.on("connection", async (socket) => {
    console.log("Cliente conectado con el id #: ", socket.id);
    const productList = await prod.getProducts();
    socketServer.emit("enviando productos", productList);

    //Agregar producto a la lista
    socket.on("addProduct", async (obj) => {
      await prod.addProduct(obj);
      const listadeproductos = await prod.getProducts();
      socketServer.emit("enviando productos", listadeproductos);
    });

    //Eliminar producto por Id
    socket.on("deleteProduct", async (id) => {
      await prod.deleteProduct(id);
      const listadeproductos = await prod.getProducts();
      socketServer.emit("enviando productos", listadeproductos);
    });
  });
};

export default socketProducts;
