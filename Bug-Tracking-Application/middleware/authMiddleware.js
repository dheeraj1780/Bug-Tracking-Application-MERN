import {
  UnauthorizedError,
  BadRequestError,
  UnauthenticatedError,
} from "../errors/customErrors.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError("authentication invalid");

  try {
    const { userId, role } = verifyJWT(token);
    req.user = { userId, role };
    console.log(role);
    next();
  } catch (error) {
    throw new UnauthenticatedError("authentication invalid");
  }
};

export const isOwner = (req, resourceOwnerId) => {
  if (req.user.userId !== resourceOwnerId.toString()) {
    throw new UnauthorizedError(
      "You are not authorized to access this resource"
    );
  }
};

export const canAccessOwnResource = async (req, model, Id) => {
  const resource = await model.findById(Id);
  if (!resource) {
    throw new NotFoundError(`Resource with ID ${Id} not found`);
  }

  // Check ownership
  isOwner(req, resource.createdBy);

  return resource; // Return the resource if valid
};

// Middleware to check if user has the required role
export const requireRole = (allowedRoles) => (req, res, next) => {
  if (!allowedRoles.includes(req.user.role)) {
    throw new UnauthorizedError(
      "You are not authorized to perform this action"
    );
  }
  next();
};

// Middleware to restrict admin actions on themselves
export const restrictSelfDelete = (req, res, next) => {
  const { role, userId } = req.user; // Admin's details
  const targetUserId = req.params.id; // User ID being acted upon

  // Admins cannot delete their own accounts
  if (role === "admin" && userId === targetUserId) {
    throw new BadRequestError("Admins cannot delete their own accounts");
  }
  next();
};

// Middleware to prevent non-admin users from deleting admins
export const preventAdminDelete = async (req, res, next) => {
  const targetUser = await User.findById(req.params.id); // Fetch target user details
  if (targetUser.role === "admin" && req.user.role !== "admin") {
    throw new UnauthorizedError("Only admins can delete other admins");
  }
  next();
};
