import { successResponse } from "../../common/utils/response/success.response.js";
import { signup ,login,updateUser,deleteUser,findOneUser} from "./user.service.js";
import { Router } from "express";
const router = Router();

router.post("/signup", async(req, res, next) => {
    const returnedData=await signup(req.body);

    successResponse({
      res,
      status:201,
      message:"user added successfully",
      data:returnedData
    })
});

router.post("/login", async(req, res, next) => {
    const returnedData=await login(req.body);

    successResponse({
      res,
      status:200,
      message:"login done successfully",
      data:returnedData
    })
});

router.patch("/:id", async(req, res, next) => {
    const returnedData=await updateUser(req.params.id,req.body);

    successResponse({
      res,
      status:200,
      message:"update user done successfully",
      data:returnedData
    })
});

router.delete("/:id", async(req, res, next) => {
    const returnedData=await deleteUser(req.params.id);

    successResponse({
      res,
      status:200,
      message:"delete user done successfully",
      data:returnedData
    })
});

router.get("/", async(req, res, next) => {
    const returnedData=await findOneUser(req.query.id);

    successResponse({
      res,
      status:200,
      message:"user founded successfully",
      data:returnedData
    })
});



export default router;
