// const menuModel = require("../Models/menuModel")

// const create = async (req, res) => {
//   try {
//     const { image, main, sub } = req.body;

//     if (!image) {
//       return res.status(400).json({
//         success: false,
//         message: "Image is required",
//       });
//     }

//     if (!main) {
//       return res.status(400).json({
//         success: false,
//         message: "Main category is required",
//       });
//     }

//     if (!sub) {
//       return res.status(400).json({
//         success: false,
//         message: "Sub category is required",
//       });
//     }

//     const menu = await menuModel.create({
//       image,
//       main,
//       sub,
//     });

//     return res.status(201).json({
//       success: true,
//       message: "Menu created successfully",
//       data: menu,
//     });

//   } catch (error) {
//     console.error(error);

//     return res.status(500).json({
//       success: false,
//       message: "Something went wrong",
//     });
//   }
// };

// const get= async( req, res)=>{

//     try {
//     const menu= await menuModel.find()
        
//     return res.send({
//         msg:"sucessful",
//         flag:0,
//         menu
//     })
//     } catch (error) {
//         console.log(error)
//         return res.send('something went wrong',1)
        
//     }
    
// }


// const Delete= async(req, res)=>{
//     const {id}= req.params

//     try {
//         await menuModel.findByIdAndDelete(id)
//         return res.send('data deleete ',0)
//     } catch (error) {
//         console.log(error )
//         return res.send('something went wrong',1)
//     }
// }

// module.exports= {create, get, Delete}



const menuModel = require("../Models/menuModel");
const cloudinary = require("../config/cloundary");
const streamifier = require("streamifier");

// Upload image to Cloudinary
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "ShreeSS/Menu",
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

// Create Category
// const create = async (req, res) => {
//   try {
//     const { main, sub } = req.body;

//     if (!req.file) {
//       return res.status(400).json({
//         success: false,
//         message: "Image is required",
//       });
//     }

//     if (!main) {
//       return res.status(400).json({
//         success: false,
//         message: "Main category is required",
//       });
//     }

//     if (!sub) {
//       return res.status(400).json({
//         success: false,
//         message: "Sub category is required",
//       });
//     }

//     const result = await uploadToCloudinary(req.file.buffer);

//     const menu = await menuModel.create({
//       image: result.secure_url,
//       public_id: result.public_id,
//       main,
//       sub,
//     });

//     return res.status(201).json({
//       success: true,
//       message: "Category created successfully",
//       data: menu,
//     });

//   } catch (error) {
//     console.log(error);

//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

const create = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const { main, sub } = req.body;

    const result = await uploadToCloudinary(req.file.buffer);

    console.log("Cloudinary:", result);

    const menu = await menuModel.create({
      image: result.secure_url,
      public_id: result.public_id,
      main,
      sub,
    });

    console.log("Saved Menu:", menu);

    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: menu,
    });

  } catch (error) {
    console.log("Create Category Error:", error)

    return res.status(500).json({
        success: false,
        message: error.message
    })
}
};


// Get Categories
const get = async (req, res) => {
  try {
    const menu = await menuModel.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: menu,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Category
const Delete = async (req, res) => {
  try {
    const menu = await menuModel.findById(req.params.id);

    if (!menu) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Delete image from Cloudinary
    if (menu.public_id) {
      await cloudinary.uploader.destroy(menu.public_id);
    }

    // Delete from MongoDB
    await menu.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  create,
  get,
  Delete,
};