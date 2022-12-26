import express from 'express';
import cors from 'cors';
import routes from './src/routes';
import db from './src/db';
import path from "path";



  const app = express();
  const port = process.env.PORT || 4000;
  app.use(cors());

  if (process.env.NODE_ENV === "production") {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, "../frontend", "build")));
    // app.get("/*", function (req, res) {
      // res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"));
    // });
  }
  app.use(express.json())
  app.listen(port, () =>                                   
    console.log(`Example app listening on port ${port}!`),
  );
  db.connect()
  app.use('/', routes);




