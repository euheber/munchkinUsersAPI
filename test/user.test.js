const supertest = require("supertest")
const app = require("../src/server")
const request = supertest(app)

describe("Authentication", () => {
  it("should create an user with an email and password", async () => {
    const req = await request.post("/user")
    .send({ email: "quasedev@dev.com", password: "12345" })
    const status = req.status
    expect(status).toBe(200)
  })

  it("should not allow an empty email or password", async () => {
    const req = await request.post("/user").send({ email: "", password: "" })
    const status = req.status
    expect(status).toBe(400)
  })

  it("should not allow duplicated email", async() => {
    await new Promise(resolve => setTimeout(async() => { 
      const req = await request.post("/user").send({ email: "quasedev@dev.com", password: "12345" });
    const status = req.status;
    expect(status).toBe(400);
    resolve()
    }, 4000));

    // Após o atraso, execute a solicitação POST
    
  })
})
