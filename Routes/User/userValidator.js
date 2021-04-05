const { body } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "createUser": {
      return [body("name", "name does not exists").exists()];
    }
  }
};
