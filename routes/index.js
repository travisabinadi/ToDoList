var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');

router.get("/", function (req, res, next) {
  let rawdata = fs.readFileSync('ToDoList.json');
  var store = JSON.parse(rawdata);
  res.send(store);
});

router.post("/", (req, res, next) => {
  var store = JSON.stringify(req.body);
  fs.writeFile(path.join(__dirname, '../../api/ToDoList.json'),
    store,
    error => (error) ?
      console.log("Error saving state!", error) :
      null
  )
  return res.send("You Successfully Posted the Store!")
})

module.exports = router;
