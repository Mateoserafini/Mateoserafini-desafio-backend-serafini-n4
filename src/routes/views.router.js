import express from "express";
import { Router } from "express";
import { ProductManager } from '../controllers/productManager.js';
import { CartManager } from '../controllers/cartManager.js';

export class ViewsRouter {
    constructor() {
        this.router = Router();
        this.prod = new ProductManager();
        this.cart = new CartManager();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get("/", async (req, res) => {
            try {
                const products = await this.prod.getProducts();
                res.render("home", { products: products });
            } catch (error) {
                res.status(500).json({ error: "Error al conectarse al servidor" });
            }
        });

        this.router.get("/realTimeProducts", (req, res) => {
            try {
                res.render("realTimeProducts");
            } catch (error) {
                res.status(500).json({ error: "Error al conectarse al servidor" });
            }
        });
    }
}

// Exportamos una instancia de la clase para mantener la compatibilidad con el código existente
export const viewsRouter = new ViewsRouter().router;
