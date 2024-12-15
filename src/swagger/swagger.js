const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "LibMaS API documentation",
    description: "Final group project for BYU-I CSE341. Authors: [Deana Briggs](https://github.com/deanabriggs), [Carlos Cervantes](https://github.com/CarlosYaelCervantesRojas), [Wilson Romero](https://github.com/wilsonBYU)",
    version: "0.1a",
  },
  schemes: ["https", "http"],
  securityDefinitions: {
    google_oauth: {
      type: 'oauth2',
      flow: 'implicit',
      authorizationUrl: "https://accounts.google.com/o/oauth2/v2/auth",
      scopes: {
        profile: 'Read your google profile data',
      }
    }
  }
};

//
const outputFile = "./documentation.json";
const routes = ["../routes/index"];

swaggerAutogen(outputFile, routes, doc);
