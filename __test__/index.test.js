import supertest from "supertest";
import app from "../index.js";

const request = supertest(app);

describe("POST /movies", () => {
  describe("given title, director and release date", () => {
    // should send a message that new movie has been added
    test("should send a message that new movies has been added", async () => {
      const body = {
        title: "Fight Club",
        director: "David Fincher",
        released: "1999-09-10",
      };

      const response = await request.post("/movies").send(body);

      // should return status code 200
      expect(response.statusCode).toBe(200);

      // header should have type text
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("text")
      );

      // should send a confirmation message
      expect(response.text).toEqual(
        expect.stringContaining("has been added to the list")
      );
    });
  });

  describe("missing a title, director or release date", () => {
    // should return an error message
    test("should return a text error message", async () => {
      const bodyData = [
        {},
        {
          director: "David Fincher",
          released: "1999-09-10",
        },
        {
          title: "Fight Club",
          released: "1999-09-10",
        },
        {
          title: "Fight Club",
          director: "David Fincher",
        },
      ];

      for (const body of bodyData) {
        const response = await request.post("/movies").send(body);

        // should return status code 400
        expect(response.statusCode).toBe(400);

        // header should have type text
        expect(response.headers["content-type"]).toEqual(
          expect.stringContaining("text")
        );
        expect(response.text).toEqual(
          "Missing property title, director or released"
        );
      }
    });
  });
});

describe("GET /movies", () => {
  describe("requesting all or one movie", () => {
    //should get an array of movies
    test("should get an array of movies", async () => {
      const response = await request.get("/movies");

      // should return status code 200
      expect(response.statusCode).toBe(200);

      // header should have type json
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );

      expect(typeof response.body).toEqual(typeof []);
    });

    // should return a single movie
    test("should return a single movie", async () => {
      const id = "1";
      const response = await request.get(`/movies/${id}`);

      // should return status code 200
      expect(response.statusCode).toBe(200);

      // header should have type json
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );

      expect(response.body.id).toEqual(id);
    });
  });

  describe("requesting a wrong id", () => {
    test("should return an error message", async () => {
      const id = "ABCDEF";
      const response = await request.get(`/movies/${id}`);

      // should return status code 400
      expect(response.statusCode).toBe(404);

      // header should have type text
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("text")
      );

      expect(response.text).toEqual(
        expect.stringContaining(`Movie with id:${id} not found`)
      );
    });
  });
});

describe("DELETE /movies", () => {
  describe("deleting a movie", () => {
    // should return message that movie has been deleted
    test("should return message that movie has been deleted", async () => {
      const id = "2";

      const response = await request.delete(`/movies/${id}`);

      // should return a 200 status code
      expect(response.statusCode).toBe(200);

      // header should have type text
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("text")
      );
      expect(response.text).toEqual(
        expect.stringContaining(`Movie with id:${id} has been deleted`)
      );
    });
  });

  describe("wrong movie id given", () => {
    // should give error message when no movie with id found
    test(" should give error message when no user with id found", async () => {
      const id = "ABCDEF";
      const response = await request.delete(`/movies/${id}`);

      // should return a 404 status code
      expect(response.statusCode).toBe(404);

      // header should have type text
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("text")
      );

      expect(response.text).toEqual(`Movie with id:${id} not found`);
    });
  });
});
