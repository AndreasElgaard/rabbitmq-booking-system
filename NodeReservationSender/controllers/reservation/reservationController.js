const express = require("express");
const reservationService = require("./reservationService");

module.exports.reserve = function (req, res, next) {
  const reservation = reservationService.reserve(req.body.guest, req.body.roomnumber, req.body.comments);

  if (!reservation) {
    res.status(400).json({ message: "Reservation was not created" })
  } else {
    res.status(200).json({
      reservation
    })
  }


}

// function reserve(req, res, next) {
//   reservationService.reserve(req.body.guest, req.body.roomnumber, req.body.comments).then((user) =>
//     user ? res.json(user) : res.status(400).json({ message: "Reservation was not created" }))
//     .catch((err) => next("Error in reservation"));
// }
