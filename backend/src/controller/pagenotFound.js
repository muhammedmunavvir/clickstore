import { CustomErrorhandler } from "../utilities/customErrorHAndling.js";

export const notfoundpage = (req, res) => {
  throw CustomErrorhandler("page is not found  ",404);
};
