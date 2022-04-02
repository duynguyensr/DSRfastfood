const Product = require("../model/Product");
const Comment = require("../model/Comment");
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} = require("../middleware/CheckToken");

const router = require("express").Router();

//CREATE

router.post("/", async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json({
      success: true,
      message: "product was created",
      productInfo: savedProduct,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Update product successfully",
      updatedProduct,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Product has been deleted...",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

//GET PRODUCT
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json({
      success: true,
      message: "Product was found successfully",
      productInfo: product,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

//GET ALL PRODUCTS
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json({
      success: true,
      message: "All products found",
      products,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

//Get all comment of product
router.get("/comment/:productId", async (req, res) => {
  try {
    const comments = await Comment.find({
      productId: `${req.params.productId}`,
    })
      .populate("userId", "username")
      .sort({ updatedAt: -1 })
      .limit(20);
    res.status(200).json({
      success: true,
      message: "All comment found",
      comments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

//postComment
router.post("/comment", verifyToken, async (req, res) => {
  const newComment = new Comment(req.body);
  try {
    const savedComment = await newComment.save();
    res.status(200).json({
      success: true,
      message: "Comment was posted",
      commentInfo: savedComment,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

//edit comment
router.put(
  "/comment/:id/:commentId",
  verifyTokenAndAuthorization,
  async (req, res) => {
    try {
      const updatedComment = await Comment.findByIdAndUpdate(
        req.params.commentId,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json({
        success: true,
        message: "Comment was updated",
        commentInfo: updatedComment,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
);

router.delete(
  "/comment/:id/:commentId",
  verifyTokenAndAuthorization,
  async (req, res) => {
    try {
      const updatedComment = await Comment.findByIdAndDelete(
        req.params.commentId
      );
      res.status(200).json({
        success: true,
        message: "Comment was deleted",
        commentInfo: updatedComment,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
);

module.exports = router;
