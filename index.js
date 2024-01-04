const Config = require("./config");
const Server = require("./SetUpServer");

class App {
  start() {
    Config.start();
    Server.start();
  }
}

const myApp = new App();

myApp.start();
