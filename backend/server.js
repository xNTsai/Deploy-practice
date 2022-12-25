import express from 'express';
import cors from 'cors';
import ScoreCard from './models/ScoreCard.js'
import routes from './src/routes';
import db from './src/db';


  const app = express();
  const port = process.env.PORT || 4000;
  if (process.env.NODE_ENV === "development") {
    app.use(cors());
  }
  app.use(express.json())
  app.listen(port, () =>                                   
    console.log(`Example app listening on port ${port}!`),
  );
  db.connect()
  app.use('/', routes);




