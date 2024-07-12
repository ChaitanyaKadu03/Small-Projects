var express = require('express');
var router = express.Router();
const fs = require('fs');

const path = require('path');

const filePath = path.join(__dirname, '../database/userData.json');

const readJSONFile = () => {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContent);
};

const writeJSONFile = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

function Object(id, title, description) {
  (this.id = id), (this.title = title), (this.description = description);
}

/* GET home page. */
router.get('/', function (req, res, next) {
  res.status(200).send('Home ji');
});

/* GET todos page. */
router.get('/todos', function (req, res, next) {
  res.status(200).render('index', { data: readJSONFile() });
});

/* GET todos/:id page. */
router.get('/todos/:id', function (req, res, next) {
  let title = null;
  let description = null;

  readJSONFile().forEach((element) => {
    if (element.id == req.params.id) {
      console.log(element.title);
      title = element.title;
      description = element.description;
      return;
    }
  });

  if (title == null) {
    res.status(404).send('error bro');
  }

  res.status(200).send(`<p>${title}</p><p>${description}</p>`);
});

/* POST todos page. */
router.post('/todos', function (req, res, next) {
  const newData = new Object(req.body.id, req.body.title, req.body.description);
  const oldData = readJSONFile();
  oldData.push(newData);
  writeJSONFile(oldData);
  res.redirect('/todos');
});

/* PUT /todos/:id page. */
router.put('/todos/:id', function (req, res, next) {
  readJSONFile().forEach((element, index) => {
    if (req.params.id == element.id) {
      let oldData = readJSONFile();
      oldData[index].description = req.body.description;
      writeJSONFile(oldData);
      return;
    }
  });
  res.redirect('/todos');
});

/* DELETE home page. */
router.delete('/todos/:id', function (req, res, next) {
  let newData = readJSONFile().filter((data) => {
    if (data.id == req.params.id) {
      return false;
    }
    return true;
  });
  writeJSONFile(newData);
  res.redirect('/todos');
});

module.exports = router;

// step 1. Create txt file and sketch of database
// step 2. Create sketch of all the routes
// step 3. Create front-end basics
// step 4. Connect both front and back-end
// step 5. Check if any error
