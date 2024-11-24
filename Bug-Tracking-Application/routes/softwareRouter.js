import { Router } from "express";
const router = Router({ mergeParams: true });

import {
  createCMS,
  getCMS,
  getCMSById,
  updateCMS,
  deleteCMS,
  createShopSystem,
  getShopSystems,
  getShopSystemById,
  updateShopSystem,
  deleteShopSystem,
  createNovalnet,
  getNovalnet,
  getNovalnetById,
  updateNovalnet,
  deleteNovalnet,
} from "../controllers/softwareController.js";

import {
  validateCmsInput,
  validateShopSystemInput,
  validateNovalnetInput,
  validateCmsIdParam,
  validateShopSystemIdParam,
  validateNovalnetIdParam,
} from "../middleware/validationMiddleware.js";
import { requireRole } from "../middleware/authMiddleware.js";

// CMS Routes
router
  .route("/cms")
  .post(requireRole(["admin", "incharge"]), validateCmsInput, createCMS) // Validate and create CMS
  .get(requireRole(["admin", "incharge", "tester", "developer"]), getCMS); // Get all CMS

router
  .route("/cms/:id")
  .get(
    requireRole(["admin", "incharge", "tester", "developer"]),
    validateCmsIdParam,
    getCMSById
  ) // Validate and get CMS by ID
  .patch(
    requireRole(["admin", "incharge"]),
    validateCmsIdParam,
    validateCmsInput,
    updateCMS
  ) // Validate and update CMS
  .delete(requireRole("admin"), validateCmsIdParam, deleteCMS); // Validate and delete CMS

// Create a new ShopSystem (with or without CMS)
router
  .route("/shopsystems")
  .post(
    requireRole(["admin", "incharge"]),
    validateShopSystemInput,
    createShopSystem
  )
  .get(
    requireRole(["admin", "incharge", "tester", "developer"]),
    getShopSystems
  );

// Get a specific ShopSystem by ID
router
  .route("/shopsystems/:id")
  .get(
    requireRole(["admin", "incharge", "tester", "developer"]),
    validateShopSystemIdParam,
    getShopSystemById
  )
  .patch(
    requireRole(["admin", "incharge"]),
    validateShopSystemIdParam,
    validateShopSystemInput,
    updateShopSystem
  )
  .delete(requireRole("admin"), validateShopSystemIdParam, deleteShopSystem);

// Novalnet Routes
router
  .route("/novalnet")
  .post(
    requireRole(["admin", "incharge"]),
    validateNovalnetInput,
    createNovalnet
  ) // Validate and create Novalnet
  .get(requireRole(["admin", "incharge", "tester", "developer"]), getNovalnet); // Get all Novalnet versions

router
  .route("/novalnet/:id")
  .get(
    requireRole(["admin", "incharge", "tester", "developer"]),
    validateNovalnetIdParam,
    getNovalnetById
  ) // Validate and get Novalnet by ID
  .patch(
    requireRole(["admin", "incharge"]),
    validateNovalnetIdParam,
    validateNovalnetInput,
    updateNovalnet
  ) // Validate and update Novalnet
  .delete(requireRole("admin"), validateNovalnetIdParam, deleteNovalnet); // Validate and delete Novalnet

export default router;
