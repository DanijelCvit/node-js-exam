import { v4 as uuidv4 } from "uuid";

let movies = [
  {
    id: "1",
    title: "Inception",
    director: "Christopher Nolan",
    released: "2010-07-16",
  },
  {
    id: "2",
    title: "The Irishman",
    director: "Martin Scorcese",
    released: "2019-09-27",
  },
];

export const getMovies = (req, res) => {
  res.status(200).json(movies);
};

export const getMovie = (req, res) => {
  const id = req.params.id;

  const movie = movies.find((movie) => movie.id === id);

  if (!movie) return res.status(404).send(`Movie with id:${id} not found`);

  res.status(200).json(movie);
};

export const addMovie = (req, res) => {
  const { title, director, released } = req.body;

  if (!title || !director || !released) {
    return res.status(400).send("Missing property title, director or released");
  }

  const id = uuidv4();
  movies.push({ title, director, released, id });
  res.status(200).send(`Movie with id:${id} has been added to the list!`);
};

export const deleteMovie = (req, res) => {
  const id = req.params.id;

  const newMovies = movies.filter((movie) => movie.id !== id);

  if (newMovies.length === movies.length) {
    return res.status(404).send(`Movie with id:${id} not found`);
  }

  movies = newMovies;
  res.status(200).send(`Movie with id:${id} has been deleted`);
};
