const request = require("supertest");
const app = require("../app");

describe("GET /images", () => {
  it("should return an array of images", async () => {
    const response = await request(app).get("/images/");

    expect(response.status).toBe(200);

    expect(Array.isArray(response.body)).toBe(true);

    expect(response.body.length).toBe(7);

    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0]).toHaveProperty("name");
    expect(response.body[0]).toHaveProperty("waldoPosition");
    expect(response.body[0]).toHaveProperty("link");
  });
});
