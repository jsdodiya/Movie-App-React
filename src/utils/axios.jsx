import axios from "axios";

const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3/', 
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NmUxMjMzOWQ5NDcxNzcxNDE0OWZiNGFjZmJlYThkZSIsIm5iZiI6MTczNzUzMTE0OS4zOTgwMDAyLCJzdWIiOiI2NzkwOWYwZDJhN2FmZjBjM2IyOGE5NDkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.WPoXSspVjEWbH-oBZISQVOwvWj2s4_GsJ9CXOpTVqXs'
      }
});

export default instance;
