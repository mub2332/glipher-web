const app = require("../app");
const request = require("supertest");

const endpointUrl = "/api/gif";

const mockData = require("./mockData/mock.video.json");

describe(endpointUrl, () => {
    it("POST " + endpointUrl, async () => {
        const response = await request(app).post(endpointUrl).send(mockData);
        expect(response.statusCode).toBe(200);
        expect(response.body.downloadUrl).toBeDefined();
    });
});

afterAll(async () => {
    await new Promise(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error
});
