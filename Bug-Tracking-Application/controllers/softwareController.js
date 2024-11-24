import CMS from "../models/CmsModel.js";
import ShopSystem from "../models/ShopSystemModel.js";
import Novalnet from "../models/NovalnetModel.js";
import { NotFoundError } from "../errors/customErrors.js";
import { StatusCodes } from "http-status-codes";

// Create a new CMS
export const createCMS = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const cms = await CMS.create({ ...req.body, createdBy: req.user.userId });
  res.status(StatusCodes.CREATED).json({ cms });
};

// Get all CMS
export const getCMS = async (req, res) => {
  const cms = await CMS.find();
  res.status(StatusCodes.OK).json({ cms });
};

// Get a specific CMS by ID
export const getCMSById = async (req, res) => {
  const { id } = req.params;
  const cms = await CMS.findById(id);
  res.status(StatusCodes.OK).json({ cms });
};

// Update a CMS by ID
export const updateCMS = async (req, res) => {
  const { id } = req.params;
  const cms = await CMS.findByIdAndUpdate(id, req.body, { new: true });
  res.status(StatusCodes.OK).json({ cms });
};

// Delete a CMS by ID and all associated ShopSystems
export const deleteCMS = async (req, res) => {
  const { id } = req.params;
  const cms = await CMS.findById(id);

  // Delete all ShopSystems associated with this CMS
  await ShopSystem.deleteMany({ CmsId: id });

  // Delete the CMS
  await cms.remove();
  res
    .status(StatusCodes.OK)
    .json({ msg: "CMS and associated ShopSystems deleted", cms });
};

// Create a new ShopSystem (with or without CMS association)
export const createShopSystem = async (req, res) => {
  const { name, CmsId } = req.body;
  req.body.createdBy = req.user.userId;
  // Validate CMS ID if provided
  if (CmsId) {
    const cms = await CMS.findById(CmsId);
    if (!cms) {
      throw new NotFoundError(`CMS with ID ${CmsId} not found`);
    }
  }

  const shopSystem = new ShopSystem({
    name,
    CmsId: CmsId || null, // If CmsId exists, use it; otherwise, set it to null
    createdBy: req.user.userId,
  });

  await shopSystem.save();

  res.status(StatusCodes.CREATED).json({ ShopSystem });
};

// Get all ShopSystems (with or without CMS)
export const getShopSystems = async (req, res) => {
  const shopSystems = await ShopSystem.find().populate("CmsId"); // Populate CMS if available
  res.status(StatusCodes.OK).json({ shopSystems });
};

// Get a specific ShopSystem by ID
export const getShopSystemById = async (req, res) => {
  const { id } = req.params;
  const shopSystem = await ShopSystem.findById(id).populate("CmsId");
  if (!shopSystem) {
    throw new NotFoundError(`No ShopSystem found with ID ${id}`);
  }
  res.status(StatusCodes.OK).json({ shopSystem });
};

// Update a ShopSystem by ID (with or without CMS)
export const updateShopSystem = async (req, res) => {
  const { id } = req.params;
  const { name, CmsId } = req.body;

  // Validate CMS ID if provided
  if (CmsId) {
    const cms = await CMS.findById(CmsId);
    if (!cms) {
      throw new NotFoundError(`CMS with ID ${CmsId} not found`);
    }
  }

  const updatedShopSystem = await ShopSystem.findByIdAndUpdate(
    id,
    { name, CmsId: CmsId || null },
    { new: true }
  ).populate("CmsId");

  if (!updatedShopSystem) {
    throw new NotFoundError(`No ShopSystem found with ID ${id}`);
  }

  res.status(StatusCodes.OK).json({ shopSystem: updatedShopSystem });
};

// Delete a ShopSystem by ID
export const deleteShopSystem = async (req, res) => {
  const { id } = req.params;
  const deletedShopSystem = await ShopSystem.findByIdAndDelete(id);
  if (!deletedShopSystem) {
    throw new NotFoundError(`No ShopSystem found with ID ${id}`);
  }
  res
    .status(StatusCodes.OK)
    .json({ msg: "ShopSystem deleted", shopSystem: deletedShopSystem });
};

// Create a new Novalnet
export const createNovalnet = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const novalnet = await Novalnet.create({
    ...req.body,
    createdBy: req.user.userId,
  });
  res.status(StatusCodes.CREATED).json({ novalnet });
};

// Get all Novalnet versions
export const getNovalnet = async (req, res) => {
  const novalnet = await Novalnet.find();
  res.status(StatusCodes.OK).json({ novalnet });
};

// Get a specific Novalnet by ID
export const getNovalnetById = async (req, res) => {
  const { id } = req.params;
  const novalnet = await Novalnet.findById(id);
  res.status(StatusCodes.OK).json({ novalnet });
};

// Update a Novalnet by ID
export const updateNovalnet = async (req, res) => {
  const { id } = req.params;
  const novalnet = await Novalnet.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.status(StatusCodes.OK).json({ novalnet });
};

// Delete a Novalnet by ID
export const deleteNovalnet = async (req, res) => {
  const { id } = req.params;
  const novalnet = await Novalnet.findByIdAndDelete(id);
  res.status(StatusCodes.OK).json({ msg: "Novalnet deleted", novalnet });
};
