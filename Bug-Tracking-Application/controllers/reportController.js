import CMS from "../models/CmsModel.js";
import Report from "../models/ReportModel.js";
import { StatusCodes } from "http-status-codes";
import ShopSystem from "../models/ShopSystemModel.js";
import Novalnet from "../models/NovalnetModel.js";

export const getAllReports = async (req, res) => {
  const reports = await Report.find({ createdBy: req.user.userId });
  res.status(StatusCodes.OK).json({ reports });
};

export const createReport = async (req, res) => {
  req.body.createdBy = req.user.userId;
  let cms = (await CMS.findById(req.body.cms)) || "";
  let ss = (await ShopSystem.findById(req.body.shopsystem)) || "";
  let nov = (await Novalnet.findById(req.body.novalnetVersion)) || "";
  let formattedDate = new Date().toISOString().split("T")[0];
  req.body.name = `${cms.name}-${ss.name}-${nov.version}-${formattedDate}`;
  const report = await Report.create({
    ...req.body,
    createdBy: req.user.userId,
    name: req.body.name,
  });
  res.status(StatusCodes.CREATED).json({ report });
};

export const getReport = async (req, res) => {
  const report = await Report.findById(req.params.id);
  res.status(StatusCodes.OK).json({ report });
};

export const deleteReport = async (req, res) => {
  const removedReport = await Report.findByIdAndDelete(req.params.id);
  res.status(StatusCodes.OK).json({ msg: "job deleted", job: removedReport });
};

export const updatedReport = async (req, res) => {
  const updatedReport = await Report.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(StatusCodes.OK).json({ msg: "job modified", job: updatedReport });
};
