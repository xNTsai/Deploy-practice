import express from 'express';
import path from "path";
import cors from "cors";
   const app = express();
   if (process.env.NODE_ENV === "development") {
	app.use(cors());
}
   const port = process.env.PORT || 4000;
    app.get('/', (req, res) => {
        res.send('Received a GET HTTP method');
    });  
    app.post('/', (req, res) => {
        res.send('Received a POST HTTP method');
    });
    app.put('/', (req, res) => {
        res.send('Received a PUT HTTP method');
    });
    app.delete('/', (req, res) => {
        res.send('Received a DELETE HTTP method');
    });

   app.get('/', (req, res) => {
     res.send('Hello, World!');
   });
   if (process.env.NODE_ENV === "production") {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, "../frontend", "build")));
    app.get("/*", function (req, res) {
      res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"));
    });
  }
   app.listen(port, () =>
     console.log(`Example app listening on port ${port}!`),
);