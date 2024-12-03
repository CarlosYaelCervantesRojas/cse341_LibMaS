const swaggerAutogen = require("swagger-autogen")()

const doc = {
  info: {
    title: "LibMaS API documentation", 
    description: "Final group project for BYU-I CSE341"
  }
}
const outputFile = "./documentation.json"
const routes = ["../routes/index"]

swaggerAutogen(outputFile, routes, doc)
