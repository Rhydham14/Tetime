const multer = require('multer');
// const path = require('path');

const storage = multer.diskStorage({
  
    destination: function (req, file, cb) {
      cb(null, '/home/rhydham/Documents/Tetime/backend/middleware/uploads/');  
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname); // Use the original filename for storing the file
    },

});
console.log("*************",storage);


const upload = multer({ storage: storage });
console.log("---------",upload);

module.exports = upload;
    
 