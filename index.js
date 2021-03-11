const express = require("express");
const fs = require("fs");
const app = express();
const port = 3001;
const cors = require("cors")
var bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const R = require("ramda");
const path = require("path");
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload());

/**
 * TODO: getImage, getCv
 */

const personalInfoKeys = [
  "name",
  "surname",
  "dob",
  "gender",
  "address",
  "phone",
  "email",
];
const professionalInfoKeys = ["occupation", "employer", "years", "degree"];
const allKeys = R.concat(personalInfoKeys, professionalInfoKeys);

const isValidUser = (user) => {
  const userKeys = Object.keys(user);
  for (const key of userKeys) {
    if (!allKeys.includes(key) || !user[key].length) {
      return false;
    }
  }
  if (userKeys.length !== allKeys.length) {
    return false;
  }
  return true;
};

const isValidData = (user) => {
  const userKeys = Object.keys(user);
  for (const key of userKeys) {
    if (!allKeys.includes(key) || !user[key].length) {
      return false;
    }
  }
  if (!userKeys.length) {
    return false;
  }
  return true;
};

app.post("/createUser", (req, res) => {
  if (isValidUser(req.body)) {
    const user = {
      personal: R.pick(personalInfoKeys, req.body),
      professional: R.pick(professionalInfoKeys, req.body),
    };
    fs.writeFile("user.json", JSON.stringify(user), function (err) {
      if (err) {
        res.send("error, cannot write to file");
      } else {
        res.send("succesfully created user");
      }
    });
  } else {
    res.send("error, user is not correct");
  }
});

app.put("/updateUser", (req, res) => {
  if (isValidData(req.body)) {
    fs.readFile("user.json", function (err, data) {
      if (err) {
        res.send("error, cannot read user file");
      } else {
        const user = JSON.parse(data.toString());
        for (key in req.body) {
          if (personalInfoKeys.includes(key)) {
            user["personal"][key] = req.body[key];
          } else {
            user["professional"][key] = req.body[key];
          }
        }
        fs.writeFile("user.json", JSON.stringify(user), function (err) {
          if (err) {
            res.send("error, cannot write to file");
          } else {
            res.send("succesfully updated user");
          }
        });
      }
    });
  } else {
    res.send("error, new data is not correct");
  }
});

app.get("/getUser", (req, res) => {
  fs.readFile("user.json", function (err, data) {
    if (err) {
      res.send("error, cannot read user file");
    } else {
      const user = JSON.parse(data.toString());
      res.send(user);
    }
  });
});

app.delete("/deleteUser", (req, res) => {
  fs.unlink("user.json", (err) => {
    if (err) {
      res.send("error, cannot delete user file");
    } else {
      res.send("succesfully deleted user");
    }
  });
});

app.post("/uploadImage", (req, res) => {
  let imageFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  imageFile = req.files.imageFile;
  imageExtension = imageFile.name.split(".");
  imageFormat = imageExtension[imageExtension.length - 1]
  uploadPath = __dirname + "/images/profile." + imageFormat;

  imageFile.mv(uploadPath, (err) => {
    if (err) return res.status(500).send(err);

    res.send("Sucessfully uploaded image file");
  });
});

app.put("/updateImage", (req, res) => {
  fs.readdir("images", (err, files) => {
    if (err) {
      res.send("error deleting image");
    }
    for (const file of files) {
      fs.unlink(path.join("images", file), (err) => {
        if (err) {
          res.send("error deleting image");
        }
      });
    }
    let imageFile;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    }

    imageFile = req.files.imageFile;
    imageExtension = imageFile.name.split(".");
    imageFormat = imageExtension[imageExtension.length - 1]
    uploadPath = __dirname + "/images/profile." + imageFormat;

    imageFile.mv(uploadPath, (err) => {
      if (err) return res.status(500).send(err);

      res.send("Sucessfully uploaded image file");
    });
  });
});

app.delete("/deleteImage", (req, res) => {
  fs.readdir("images", (err, files) => {
    if (err) {
      res.send("error deleting image");
    }
    for (const file of files) {
      fs.unlink(path.join("images", file), (err) => {
        if (err) {
          res.send("error deleting image");
        }
      });
    }
    res.send("succesfully deleted image");
  });
});

app.put("/updateCV", (req, res) => {
  fs.readdir("documents", (err, files) => {
    if (err) {
      res.send("error deleting cv");
    }
    for (const file of files) {
      fs.unlink(path.join("documents", file), (err) => {
        if (err) {
          res.send("error deleting cv");
        }
      });
    }
    let cvFile;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    }

    cvFile = req.files.cvFile;
    cvExtension = cvFile.name.split(".");
    cvFormat = cvExtension[cvExtension.length - 1]
    uploadPath = __dirname + "/documents/cv." + cvFormat;

    cvFile.mv(uploadPath, (err) => {
      if (err) return res.status(500).send(err);

      res.send("Sucessfully uploaded CV");
    });
  });
});

app.post("/uploadCV", (req, res) => {
  let cvFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  cvFile = req.files.cvFile;
  cvExtension = cvFile.name.split(".");
  cvFormat = cvExtension[cvExtension.length - 1]
  uploadPath = __dirname + "/documents/cv." + cvFormat;

  cvFile.mv(uploadPath, (err) => {
    if (err) return res.status(500).send(err);

    res.send("Sucessfully uploaded CV");
  });
});

app.delete("/deleteCV", (req, res) => {
  fs.readdir("documents", (err, files) => {
    if (err) {
      res.send("error deleting cv");
    }
    for (const file of files) {
      fs.unlink(path.join("documents", file), (err) => {
        if (err) {
          res.send("error deleting cv");
        }
      });
    }
    res.send("succesfully deleted cv");
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});