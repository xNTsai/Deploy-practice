import axios from 'axios';

const instance = axios.create({
  baseURL: `http://localhost:4000/api`,
});

export default instance;


// import axios from "axios";

// const API_ROOT =
//   process.env.NODE_ENV === "production"
//     ? "/api"
//     : "http://localhost:4000/api";

// const instance = axios.create({ baseURL: API_ROOT });
// export default instance
// instance.get('/hi').then((data) => console.log(data));
