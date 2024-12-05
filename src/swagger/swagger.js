const swaggerAutogen = require("swagger-autogen")({openapi: '3.0.0'});

const doc = {
  info: {
    title: "LibMaS API documentation", 
    description: "Final group project for BYU-I CSE341",
    version: "0.1a",
    schemas: [
      "http", "https"
    ],
    components: {
      securitySchemes: {
          sessionAuth: {
              type: 'apiKey',
              in: 'cookie',
              name: 'connect.sid', // Default cookie name for express-session
          },
      },
  },
  security: [{
      sessionAuth: []
  }],
  }
}
const outputFile = "./documentation.json"
const routes = ["../routes/index"]

swaggerAutogen(outputFile, routes, doc)
