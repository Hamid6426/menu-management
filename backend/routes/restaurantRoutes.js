const express = require("express");
const restaurantController = require("../controllers/restaurantController");
const { protectRoute, authorizeRoles } = require("../middlewares/middlewares");
const upload = require("../middlewares/uploadMiddleware");

const router = express.Router();

router.post("/:userId", protectRoute, authorizeRoles("super-admin", "admin"), restaurantController.createRestaurant);
router.get("/", restaurantController.getAllRestaurants);
router.get(
  "/:userId",
  protectRoute,
  authorizeRoles("admin", "super-admin"),
  restaurantController.getCurrentUserRestaurants
);
router.get("/id/:restaurantId", restaurantController.getRestaurantById);
router.get("/:slug", restaurantController.getRestaurantBySlug);
router.put(
  "/:restaurantId",
  protectRoute,
  authorizeRoles("admin", "manager", "super-admin"),
  restaurantController.updateRestaurant
);
router.delete(
  "/:restaurantId",
  protectRoute,
  authorizeRoles("admin", "super-admin"),
  restaurantController.deleteRestaurant
);
router.post(
  "/logo",
  protectRoute,
  upload.single("logo"),
  authorizeRoles("admin", "manager", "super-admin"),
  restaurantController.uploadRestaurantLogo
);

module.exports = router;
