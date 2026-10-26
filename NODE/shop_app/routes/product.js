const { getAllProduct, createProduct, getOneProduct, updateProduct, deleteProduct, softDeleteProduct } = require("../controller/product.js")
const upload = require("../middleware/multer.js")
const validator = require("../middleware/validetor.js")
const {addProductSchema,updateProductSchema} = require("../validation/product.js")

const ProductRouter=require("express").Router()


ProductRouter.route("/")
    .get(getAllProduct)
    .post(validator(addProductSchema),createProduct)

ProductRouter.delete("/soft/:id",softDeleteProduct)

ProductRouter.route("/upload")
    .post(upload.single("attachment"),async (req, res) => {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }
        const imageUrl = `${req.protocol}://${req.get("host")}/public/${req.file.filename}`;
        return res.status(200).json({ success: true, message: "File uploaded successfully", imageUrl });
    });

ProductRouter.route("/:id")
    .patch(validator(updateProductSchema),updateProduct)
    .delete(deleteProduct)
    .get(getOneProduct)

module.exports=ProductRouter