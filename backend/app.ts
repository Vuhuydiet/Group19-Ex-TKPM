import express from 'express';
const app = express();
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';
import 'express-async-errors';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();


// import middlewares and routes
import notFoundHandler from './libraries/errorHandler/notFoundHandler';
import errorHandler from './libraries/errorHandler/errorHandler';

import router from './static-content'
import studentRouter from './components/student-managing/entry-points/api/student-management/studentManagement.route';
import importExportRouter from './components/student-managing/entry-points/api/import-export/importExportStudent.router';
import logger from './core/logger';

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
app.use('/utils/students', importExportRouter);

// error handler
app.use(notFoundHandler);
app.use(errorHandler);

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
  logger.info(`Environment: ${process.env.NODE_ENV}`);
  logger.info(`Open: http://localhost:${PORT}`);
});
