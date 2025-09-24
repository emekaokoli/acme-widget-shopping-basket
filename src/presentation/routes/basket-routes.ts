// src/presentation/routes/basket-routes.ts
import { Router } from 'express';
import { createBasketController } from '../../controllers/basket-controller';
import { Basket } from '../../domain/basket';
import { defaultDelivery } from '../../domain/delivery/default-delivery';
import { redWidgetOffer } from '../../domain/offers/red-widget-offer';
import { requireAuth } from '../../middlewares/requireAuth';

const catalogue = [
  { code: 'R01', name: 'Red Widget', price: 32.95 },
  { code: 'G01', name: 'Green Widget', price: 24.95 },
  { code: 'B01', name: 'Blue Widget', price: 7.95 },
];

// Ideally baskets are per-user, not shared global
// Here you'd fetch/create from DB or session instead
const basket = new Basket([redWidgetOffer()], defaultDelivery());
const basketController = createBasketController(basket, catalogue);

export const basketRoutes = Router();

basketRoutes.post('/add', requireAuth, basketController.add);
basketRoutes.get('/total', requireAuth, basketController.total);
