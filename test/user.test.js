const supertest = require("supertest")
const app = require("../src/server")
const request = supertest(app)


const mainUser =  {
  email: "dev@dev.com",
  password: '12345'
}


afterAll(async () => { 
  try {
     await request.delete(`/user/${mainUser.email}`)
  } catch (e) {
    console.log(e)
  }

})

describe("Authentication", () => {
  it("should create an user with an email and password", async () => {
    const req = await request.post("/user")
    .send(mainUser)
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
    const req = await request.post("/user").send(mainUser);
    const status = req.status;
    expect(status).toBe(400);
    resolve()
    }, 4000));
  })
})
