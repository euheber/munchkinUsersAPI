const supertest = require("supertest")
const app = require("../src/server")
const request = supertest(app)


it("should respond on port 3000", async () => {

    const req = await request.get("/")
    const status = req.status
    expect(status).toBe(200)
  
})



