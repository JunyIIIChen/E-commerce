const port = 4000;
const express = require('express');
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { error } = require('console');

app.use(express.json());
app.use(cors());

//database connection with mongodb
mongoose.connect("mongodb+srv://superadmin:superadmin@cluster0.mfjcg.mongodb.net/e-commerce?retryWrites=true&w=majority&appName=Cluster0")


app.get("/", (req, res) => {
    res.send("Express app is running")
})


//Image Storage Engine 
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
      return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
  
  // Route for Images folder
app.use('/images', express.static('upload/images'));
  

const upload = multer({ storage: storage })
app.post("/upload", upload.single('product'), (req, res) => {
res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`
})
})
  
  

// Schema for creating product
const ProductSchema = new mongoose.Schema({
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    new_price: {
      type: Number,
      required: true,
    },
    old_price: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    available: {
      type: Boolean,
      default: true,
    },
  }, {
    collection: 'products'  // Explicitly set collection name to 'products'
});
  
// Create Product model
const Product = mongoose.model("Product", ProductSchema);

// Create API to upload image
app.post("/addproduct", async (req, res) => {
    let products = await Product.find({});
    let id;
    if (products.length > 0){
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1
    }
    else
    {
        id = 1;
    }
    const product = new Product({
        id: id,
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("saved");
    res.json({
        success: true,
        name:req.body.name,
    })

})

// create api for delete product
app.post("/removeproduct", async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    console.log("removed");
    res.json({
        success: true,
        name: req.body.name,
    }
    )
})

// creating api for getting all product
app.get("/allproducts", async (req,res) => {
    let products = await Product.find({});
    console.log("all products fetched");
    res.send(products);
})


//Schema creating for user model
const Users = mongoose.model("Users", {
  name: {
      type:String,
  },
  email: {
    type: String,
    unique:true,
  },
  password: {
    type: String,
  },
  cartData: {
    type:Object,
  },
  date: {
    type: Date,
    default:Date.now,
  }
})

//Creating Endpoint for registering the user
app.post('/signup', async (req,res) => {
  let check = await Users.findOne({ email: req.body.email });
  if (check) {
    return res.status(400).json({success:false,errors:"existing user found with same email address."})
  }

  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }
  const user = new Users({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  })

  await user.save();

  const data = {
    user: {
      id:user.id
    }
  }

  const token = jwt.sign(data, 'secret_ecom');

  res.json({ success: true, token });
})

// creating endpoint for user login
app.post('/login', async (req,res) => {
  let user = await Users.findOne({ email: req.body.email })
  if (user) {
    const passCompare = req.body.password === user.password;
    if (passCompare) {
      const data = {
        user: {
          id: user.id
        }
      }
      const token = jwt.sign(data, "secret_eco");
      res.json({ success: true, token });
    }
    else {
      res.json({ success: false, error: "Wrong Password" });
    }
  }
  else {
    res.json({success:false, errors:"Wrong Email Id"})
  }
})

// API Creation
app.listen(port, (error) => {
    if (!error) {
        console.log("Server running on Port" + port)
    }
    else {
        console.log("Error:" + error)
    }
})
