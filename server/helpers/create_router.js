const express = require('express');
const ObjectID = require('mongodb').ObjectID;


const createRouter = function (collection) {

  const router = express.Router();

  router.get('/', (req, res) => {
    collection
      .find()
      .toArray()
      .then((docs) => res.json(docs))
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });

  router.get('/:id', (req, res) => {
    const id = req.params.id;
    collection
      .findOne({ _id: ObjectID(id) })
      .then((doc) => res.json(doc))
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });

  router.post("/", (req, res) => {
    //put the object into DB
    //return the object with its ID in the response
    const newData = req.body
    collection.insertOne(newData)
    .then((result) => {
      newData["_id"] = result["insertedId"]
      res.json(newData)
    })
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });

  router.delete("/:id", (req, res) => {
    const id = req.params.id;
    collection.deleteOne({ "_id": ObjectId(id) })
    .then((result) => {
      res.json(result)
    })
  })

  return router;
};

module.exports = createRouter;