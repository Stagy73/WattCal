const models = require("../models");

const browse = (req, res) => {
  models.device
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.device
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const readean = (req, res) => {
  console.warn("Request response", res);
  console.warn("Request question", req);
  console.warn("Request received with EAN!!!:", req.params.ean);

  models.device
    .find(req.params.ean)
    .then(([rows]) => {
      if (rows[0] == null) {
        console.warn("Device not found!!!!.");
        res.sendStatus(404);
      } else {
        console.warn("Device found:", rows[0]);
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const edit = (req, res) => {
  const device = req.body;

  // TODO validations (length, format...)

  device.id = parseInt(req.params.id, 10);

  models.device
    .update(device)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const add = (req, res) => {
  const device = req.body;

  // TODO validations (length, format...)

  models.device
    .insert(device)
    .then(([result]) => {
      res.location(`/devices/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  models.device
    .delete(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  browse,
  read,
  readean,
  edit,
  add,
  destroy,
};
