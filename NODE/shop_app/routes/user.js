const userRouter = require("express").Router();
const { getAllUsers, getOneUser, updateUser, deleteUser, softDeleteUser, createUser } = require("../controller/user.js");
const auth = require("../middleware/auth.js");
const restrictTo = require("../middleware/restricTo.js");
const validator = require("../middleware/validetor.js");
const { createUserValidation, updateUserValidation } = require("../validation/user.js");


userRouter.route("/")
    .get(auth,restrictTo(["admin","user"]),getAllUsers)
    .post(auth,restrictTo(["admin","user"]),validator(createUserValidation),createUser)

userRouter.delete("/soft/:id", auth,restrictTo(["admin","user"]), softDeleteUser)

userRouter.route("/:id")
    .get(auth,restrictTo(["admin","user"]),getOneUser)
    .patch(auth,restrictTo(["admin","user"]),validator(updateUserValidation),updateUser)
    .delete(auth,restrictTo(["admin","user"]),deleteUser)

module.exports = userRouter