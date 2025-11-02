import productModel from '../models/productModel.js';
import uploadToCloudinary from '../utils/uploadAsset.js';

const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
      rating,
    } = req.body;

    const files = req.files;

    const params = { files, folder: 'products', type: 'image' };
    const { urls } = await uploadToCloudinary(params);

    const newProductItem = {
      name,
      description,
      category,
      subCategory,
      sizes,
      images: urls,
      price: Number(price),
      bestseller: bestseller === 'true' ? true : false,
      rating: Number(rating),
    };

    const newProduct = new productModel(newProductItem);
    await newProduct.save();

    res.json({ message: 'Success', item: newProduct });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: 'Product Removed' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { listProducts, addProduct, removeProduct, singleProduct };
