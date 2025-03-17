import express from 'express';
const app = express();
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';
import 'express-async-errors';


// import middlewares and routes
import notFoundHandler from './libraries/errorHandler/notFoundHandler';
import errorHandler from './libraries/errorHandler/errorHandler';

import router from './static-content'
import studentRouter from './components/student-managing/entry-points/api/studentManagement.route';
import path from 'path';

// middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(compression());

app.use(express.static(path.join(import.meta.dirname, '../frontend/dist')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use(router);
app.use('/students', studentRouter);

// error handler
app.use(notFoundHandler);
app.use(errorHandler);

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Open: http://localhost:${PORT}`);
});
