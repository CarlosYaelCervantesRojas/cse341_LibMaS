const router = require("express").Router();
const usersController = require("../controllers/users");
const { isValidId, putDisplayName } = require("../utils/middleware")
const auth = require("../utils/auth")


router
    .get("/", usersController.getAll)
    .get("/:id",
        isValidId,
        usersController.get
    )
    .put("/:id",
        auth.isAuthenticated, 
        auth.isLibrarian, 
        isValidId,
        putDisplayName,
        usersController.put
    )
    .delete("/:id",
        auth.isAuthenticated, 
        auth.isLibrarian, 
        isValidId,
        usersController.delete
    )

module.exports = router;