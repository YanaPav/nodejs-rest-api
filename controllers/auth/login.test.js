const mongoose = require("mongoose");
const request = require("supertest");
require("dotenv").config();
const User = require("../../services/users/schema");
const { DB_HOST } = process.env;
const app = require("../../app");
const bcrypt = require("bcrypt");

describe("test login controller", () => {
  let server;
  beforeAll(() => (server = app.listen(3001)));
  afterAll(() => server.close());

  beforeEach((done) => {
    mongoose.connect(DB_HOST).then(() => done());
  });

  afterEach((done) => {
    mongoose.connection.close(() => done());
  });

  test("test login", async () => {
    const hashedPassword = await bcrypt.hash("test123", 10);

    const createUser = {
      email: "testuser@gmail.com",
      password: hashedPassword,
    };

    const loginUser = {
      email: "testuser@gmail.com",
      password: "test123",
    };

    await User.create(createUser);

    const response = await request(app).get("/api/users/login").send(loginUser);

    const { token, subscription } = await User.findOne({
      email: loginUser.email,
    });
    const { body } = response;
    const { user } = body;

    // відповідь повина мати статус-код 200
    expect(response.statusCode).toBe(200);

    // у відповіді повинен повертатися токен
    expect(body.token).toBeTruthy();
    expect(body.token).toBe(token);

    // у відповіді повинен повертатися об'єкт user з 2 полями email и subscription з типом даних String. Оскільки в моєму додатку повертається об'єкт з 3 полями (додатково повертаю посилання на аватарку), тут замість просто наявності 2 полів з типом String перевіряємо чітку відповідність даних, що повертаються.
    expect(user.email).toBe(loginUser.email);
    expect(user.subscription).toBe(subscription);

    await User.findOneAndDelete({ email: loginUser.email });
  });
});
