const router = require("express").Router();

const usersController = require("../controllers/users");
const { isValidId } = require("../utils/middleware")


router
    .get("/", usersController.getAll)
    // .post("/", usersController.post)
    .get("/:id",
        isValidId,
        usersController.get
    )
    .put("/:id",
        isValidId,
        usersController.put
    )
    .delete("/:id",
        isValidId,
        usersController.delete
    )

module.exports = router;