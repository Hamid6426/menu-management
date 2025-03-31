const express = require("express");
const restaurantController = require("../controllers/restaurantController");
const { protectRoute, authorizeRoles } = require("../middlewares/middlewares");
const upload = require("../middlewares/uploadMiddleware");

const router = express.Router();

router.post("/:username", protectRoute, authorizeRoles("super-admin", "admin"), restaurantController.createRestaurant);
router.get("/", restaurantController.getAllRestaurants);
router.get(
  "/:username",
  protectRoute,
  authorizeRoles("admin", "super-admin"),
  restaurantController.getCurrentUserRestaurants
);
// router.get("/:restaurantId", restaurantController.getRestaurantById);
router.get("/:restaurantSlug", restaurantController.getRestaurantBySlug);
router.put(
  "/:restaurantSlug",
  protectRoute,
  authorizeRoles("admin", "manager", "super-admin"),
  restaurantController.updateRestaurant
);
router.delete(
  "/:restaurantSlug",
  protectRoute,
  authorizeRoles("admin", "super-admin"),
  restaurantController.deleteRestaurant
);
router.post(
  "/:restaurantSlug/add-logo",
  protectRoute,
  upload.single("logo"),
  authorizeRoles("admin", "manager", "super-admin"),
  restaurantController.uploadRestaurantLogo
);

module.exports = router;
