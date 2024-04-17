import express from 'express';
import { ProductManager } from './controllers/productManager.js';
import { CartManager } from './controllers/cartManager.js';
import { productsRouter } from './routes/products.router.js';
import { cartsRouter } from './routes/cart.router.js';
import { viewsRouter } from './routes/views.router.js';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import http from 'http'; 
import socketProducts from './socket/socketProducts.js';

const app = express();
const PORT = 8080;

export const productManager = new ProductManager();
export const cartManager = new CartManager();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

const server = http.createServer(app);
const socketServer = new Server(server); 

server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

socketProducts(socketServer);