const yup=require("yup")

const addProductSchema=yup.object({
    name:yup.string().required("name is required").min(3,"name must be at least 3 characters").max(50,"name must be at most 50 characters"),
    description:yup.string().required("description is required").min(10,"description must be at least 10 characters"),
    price:yup.number().required("price is required").positive("price must be a positive number"),
    category:yup.string().required("category is required"),
    image:yup.string().url("image must be a valid URL")
}).required()

const updateProductSchema=yup.object({
    name:yup.string().min(3,"name must be at least 3 characters").max(50,"name must be at most 50 characters"),
    description:yup.string().min(10,"description must be at least 10 characters"),
    price:yup.number().positive("price must be a positive number"),
    category:yup.string(),
    image:yup.string().url("image must be a valid URL")
}).required()

module.exports={ addProductSchema, updateProductSchema }