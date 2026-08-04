const express = require("express");
const router = express.Router();

const {
  routerGetFavorites,
  routerPostUser,
  routerGetUsers,
  routerGetByIdUser,
  routerDeleteUser,
  routerPutUser,
} = require("../controllers/UsersController");

const {
  requireAdmin,
  requireTrustedOrigin,
} = require("../middlewares/requireAdmin");

// Ningún dato de usuarios puede ser público.
router.use(requireAdmin);

router.post("/favorite", requireTrustedOrigin, routerGetFavorites);

router.post("/", requireTrustedOrigin, routerPostUser);

router.get("/", routerGetUsers);

router.get("/:id", routerGetByIdUser);

router.put("/:id", requireTrustedOrigin, routerPutUser);

router.delete("/:id", requireTrustedOrigin, routerDeleteUser);

module.exports = router;