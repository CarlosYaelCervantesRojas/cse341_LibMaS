const router = require("express").Router();

const usersController = require("../controllers/users");
const { isValidId, putDisplayName } = require("../utils/middleware")


router
    .get("/", usersController.getAll)
    .get("/:id",
        isValidId,
        usersController.get
    )
    .put("/:id",
        isValidId,
        putDisplayName,
        usersController.put
    )
    .delete("/:id",
        isValidId,
        usersController.delete
    )

module.exports = router;