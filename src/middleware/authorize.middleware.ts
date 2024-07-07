import { RequestWithUser } from "../utils/requestWithUser";
import { JWT_SECRET } from "../utils/constants";
import jsonwebtoken from "jsonwebtoken";
import { jwtPayload } from "../utils/jwtPayload";
import express from "express";
const authorize = async (req: RequestWithUser, res: express.Response, next: express.NextFunction) => {
   try {
      const token = getTokenFromRequestHeader(req);
      const payload = jsonwebtoken.verify(token, JWT_SECRET);
      req.name = (payload as jwtPayload).name;
      req.email = (payload as jwtPayload).email;
      req.role = (payload as jwtPayload).role;

      return next();
   } catch (err) {
      return next(err);
   }
};

const getTokenFromRequestHeader = (req: RequestWithUser) => {
   const bearerToken = req.header("Authorization");
   console.log("bearerToken: ", bearerToken);
   const token = bearerToken ? bearerToken.replace("Bearer ", "") : "";
   return token;
};
export default authorize;
