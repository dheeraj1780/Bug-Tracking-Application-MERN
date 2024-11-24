import { body, param, validationResult } from "express-validator";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../errors/customErrors.js";
import mongoose from "mongoose";
import Report from "../models/ReportModel.js";
import Bug from "../models/BugModel.js";
import CMS from "../models/CmsModel.js";
import User from "../models/UserModel.js";
import ShopSystem from "../models/ShopSystemModel.js";
import Novalnet from "../models/NovalnetModel.js";

export const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

// User Validations
//validation at user creation time
export const validateUserInput = withValidationErrors([
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isEmail()
    .withMessage("Username must be a valid email address")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),
  body("username")
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 4 })
    .withMessage("Username must be at least 4 characters long")
    .custom(async (value) => {
      const userExists = await User.findOne({ username: value });
      if (userExists) throw new BadRequestError("Username already exists");
    }),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  body("role")
    .notEmpty()
    .withMessage("Role is required")
    .isIn(["developer", "tester", "admin", "incharge"])
    .withMessage("Role must be 'developer', 'tester', 'admin', or 'incharge'"),
]);

//validation at user updation time
export const validateUserUpdateInput = withValidationErrors([
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),
  body("username")
    .notEmpty()
    .withMessage("Username is required")
    .isEmail()
    .withMessage("Username must be a valid email address")
    .isLength({ min: 4 })
    .withMessage("Username must be at least 4 characters long"),
  body("role")
    .notEmpty()
    .withMessage("Role is required")
    .isIn(["developer", "tester", "admin", "incharge"])
    .withMessage("Role must be 'developer', 'tester', 'admin', or 'incharge'"),
]);

//validation at user id used time
export const validateUserIdParam = withValidationErrors([
  param("id").custom(async (value) => {
    if (!mongoose.Types.ObjectId.isValid(value))
      throw new BadRequestError("Invalid User ID");
    const user = await User.findById(value);
    if (!user) throw new NotFoundError(`No User found with ID ${value}`);
  }),
]);

//validation at user login time
export const validateUserLoginInput = withValidationErrors([
  body("username")
    .notEmpty()
    .withMessage("Username is required to login")
    .isEmail()
    .withMessage("Username must be a valid email address"),
  body("password").notEmpty().withMessage("Password is required to login"),
]);

// CMS Validations
//validation at cms creation time
export const validateCmsInput = withValidationErrors([
  body("name")
    .notEmpty()
    .withMessage("CMS name is required")
    .isLength({ min: 3 })
    .withMessage("CMS name must be at least 3 characters long")
    .custom(async (value) => {
      const cmsExists = await CMS.findOne({ name: value });
      if (cmsExists)
        throw new BadRequestError("CMS with this name already exists");
    }),
]);

//validation at cms id used time
export const validateCmsIdParam = withValidationErrors([
  param("id").custom(async (value) => {
    if (!mongoose.Types.ObjectId.isValid(value))
      throw new BadRequestError("Invalid CMS ID");
    const cms = await CMS.findById(value);
    if (!cms) throw new NotFoundError(`No CMS found with ID ${value}`);
  }),
]);

// ShopSystem Validations
//validation at shopsystem creation time
export const validateShopSystemInput = withValidationErrors([
  body("name")
    .notEmpty()
    .withMessage("ShopSystem name is required")
    .isLength({ min: 3 })
    .withMessage("ShopSystem name must be at least 3 characters long")
    .custom(async (value) => {
      const existingShopSystem = await ShopSystem.findOne({ name: value });
      if (existingShopSystem) {
        throw new BadRequestError("ShopSystem with this name already exists");
      }
    }),
  body("CmsId")
    .optional()
    .custom(async (value) => {
      if (value) {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          throw new BadRequestError("Invalid CMS ID");
        }
        const cms = await CMS.findById(value);
        if (!cms) throw new NotFoundError(`No CMS found with ID ${value}`);
      }
    }),
]);

//validation at shopsystem id used time
export const validateShopSystemIdParam = withValidationErrors([
  param("id").custom(async (value) => {
    if (!mongoose.Types.ObjectId.isValid(value))
      throw new BadRequestError("Invalid ShopSystem ID");
    const shopSystem = await ShopSystem.findById(value);
    if (!shopSystem)
      throw new NotFoundError(`No ShopSystem found with ID ${value}`);
  }),
]);

// Novalnet Validations
//validation at novalnet creation time
export const validateNovalnetInput = withValidationErrors([
  body("version")
    .notEmpty()
    .withMessage("Novalnet version is required")
    .custom(async (value) => {
      const novalnetExists = await Novalnet.findOne({ version: value });
      if (novalnetExists)
        throw new BadRequestError("Novalnet with this version already exists");
    }),
]);

//validation at novalnet id used time
export const validateNovalnetIdParam = withValidationErrors([
  param("id").custom(async (value) => {
    if (!mongoose.Types.ObjectId.isValid(value))
      throw new BadRequestError("Invalid Novalnet ID");
    const novalnet = await Novalnet.findById(value);
    if (!novalnet)
      throw new NotFoundError(`No Novalnet found with ID ${value}`);
  }),
]);

//Report Validations
//validation at report creation time
export const validateReportInput = withValidationErrors([
  body("cms")
    .notEmpty()
    .withMessage("CMS is required")
    .custom(async (value) => {
      const cmsExists = await CMS.findById(value);
      if (!cmsExists) throw new NotFoundError("CMS does not exist");
    }),
  body("shopsystem")
    .optional()
    .custom(async (value, { req }) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new BadRequestError("Invalid ShopSystem ID");
      }
      const shopSystem = await ShopSystem.findById(value);
      if (!shopSystem) throw new NotFoundError("ShopSystem does not exist");
      if (
        req.body.cms &&
        shopSystem.cmsId &&
        shopSystem.cmsId.toString() !== req.body.cms
      ) {
        throw new BadRequestError(
          "ShopSystem is not associated with the selected CMS"
        );
      }
    }),
  body("novalnetVersion")
    .notEmpty()
    .withMessage("Novalnet version is required")
    .custom(async (value) => {
      const novalnetExists = await Novalnet.findById(value);
      if (!novalnetExists)
        throw new NotFoundError("Novalnet version does not exist");
    }),
]);

//validation at report id used time
export const validateReportIdParam = withValidationErrors([
  param("id").custom(async (value, { req }) => {
    const isValidMongoId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidMongoId) throw new BadRequestError("invalid MongoDB id");
    const report = await Report.findById(value);
    if (!report) throw new NotFoundError(`no Report with id ${value}`);
  }),
]);

// validations at report updation time
export const validateUpdateReportInput = withValidationErrors([
  body("status")
    .isIn(["open", "closed", "in-progress"])
    .withMessage("Status must be 'open', 'closed', or 'in-progress'"),
]);

// Bug Validations
//validations at bug creation time
export const validateBugInput = withValidationErrors([
  body("reportId")
    .notEmpty()
    .withMessage("Report ID is required")
    .custom(async (value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new BadRequestError("Invalid Report ID");
      }
      const report = await Report.findById(value);
      if (!report) throw new NotFoundError(`No Report found with ID ${value}`);
    }),

  body("name")
    .notEmpty()
    .withMessage("Bug name is required")
    .isLength({ min: 3 })
    .withMessage("Bug name must be at least 3 characters long"),

  body("description").notEmpty().withMessage("Bug description is required"),

  body("testerFeedback").notEmpty().withMessage("Tester feedback is required"),

  body("bugSeverity")
    .isIn(["high", "medium", "low"])
    .withMessage("Bug severity must be 'high', 'medium', or 'low'"),

  body("images")
    .optional()
    .custom((images) => {
      if (!Array.isArray(images))
        throw new BadRequestError("Images must be an array");
      if (images.length > 3)
        throw new BadRequestError("Maximum of 3 images can be uploaded");
    }),

  body("frontUrl").optional().isURL().withMessage("Invalid Front URL"),

  body("backUrl").optional().isURL().withMessage("Invalid Back URL"),

  // Auto-assign status and set createdBy
  (req, res, next) => {
    req.body.status = "assigned";
    req.body.createdBy = req.user.userId;
    next();
  },
]);

//validation at bug updation time
export const validateUpdateBugInput = withValidationErrors([
  body("description").notEmpty().withMessage("Bug description is required"),

  body("testerFeedback").notEmpty().withMessage("Tester feedback is required"),

  body("bugSeverity")
    .isIn(["high", "medium", "low"])
    .withMessage("Bug severity must be 'high', 'medium', or 'low'"),

  body("images")
    .optional()
    .custom((images) => {
      if (!Array.isArray(images))
        throw new BadRequestError("Images must be an array");
      if (images.length > 3)
        throw new BadRequestError("Maximum of 3 images can be uploaded");
    }),
  body("frontUrl").optional().isURL().withMessage("Invalid Front URL"),
  body("backUrl").optional().isURL().withMessage("Invalid Back URL"),
]);

//validation at bug id used time
export const validateBugIdParam = withValidationErrors([
  param("id").custom(async (value, { req }) => {
    const isValidMongoId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidMongoId) throw new BadRequestError("invalid MongoDB id");
    const bug = await Bug.findById(value);
    if (!bug) throw new NotFoundError(`no Bug with id ${value}`);
  }),
]);
