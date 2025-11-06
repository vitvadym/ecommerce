import productModel from '../models/productModel.js';
import ApiError from '../utils/apiError.js';
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

const listProducts = async (req, res, next) => {
  try {
    const { category, type, search, page } = req.query;
    const filter = {};
    const perPage = 8;

    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }

    if (category) {
      const categories = category.split(',');
      filter.category = { $in: categories };
    }

    if (type) {
      const types = type.split(',');
      filter.subCategory = { $in: types };
    }

    const totalPages = Math.ceil(
      (await productModel.countDocuments({ ...filter })) / perPage,
    );

    const products = await productModel
      .find({
        ...filter,
      })
      .limit(perPage)
      .skip(page ? (page - 1) * perPage : 0);

    res.json({ success: true, products, totalPages });
  } catch (error) {
    next(error);
  }
};

const latestProducts = async (req, res, next) => {
  try {
    const products = await productModel
      .find({})
      .sort({ date: 'desc' })
      .limit(10);
    res.json({ success: true, products });
  } catch (error) {
    next(error);
  }
};

const bestSellerProducts = async (req, res, next) => {
  try {
    const products = await productModel.find({ bestseller: true }).limit(5);
    res.json({ success: true, products });
  } catch (error) {
    next(error);
  }
};

const removeProduct = async (req, res, next) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: 'Product Removed' });
  } catch (error) {
    next(error);
  }
};

const singleProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productModel.findById(id);
    const relatedProducts = await productModel
      .find({
        $and: [
          { category: product.category },
          { subCategory: product.subCategory },
        ],
        _id: { $ne: product._id },
      })
      .limit(5);

    if (!product) {
      return next(new ApiError('Product not found', 404));
    }
    res.json({ success: true, product, relatedProducts });
  } catch (error) {
    next(error);
  }
};

export {
  listProducts,
  addProduct,
  removeProduct,
  singleProduct,
  latestProducts,
  bestSellerProducts,
};
