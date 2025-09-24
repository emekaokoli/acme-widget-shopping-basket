import express, { ErrorRequestHandler, NextFunction, Request, Response, RequestHandler } from 'express';
import session from 'express-session';
import { fakeAuth } from './middlewares/fakeAuth';
import { basketRoutes } from './presentation/routes/basket-routes';
import { errorHandler } from './modules/errorHandler';

const app = express();
app.use(express.json());

app.use(
  session({
    secret: 'sample key',
    resave: false,
    saveUninitialized: false,
  }) as RequestHandler
);

// injected a fake user for all requests
app.use(fakeAuth as RequestHandler);
app.use('/basket', basketRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));

app.use(errorHandler);
