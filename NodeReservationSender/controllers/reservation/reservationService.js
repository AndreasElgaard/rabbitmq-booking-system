const { response } = require("express");
const rabbitsender = require("../../helpers/rabbitSender.js");

module.exports = {
  reserve,
};

async function reserve(guest, roomnumber, comments) {
  let newReservation = {
    guest: guest,
    roomnumber: roomnumber,
    comments: comments,
  };

  try {
    // her skal der sendes til message queue
    rabbitsender.sendToQueue(JSON.stringify(newReservation), "Reservations");
    return newReservation;
  } catch (error) {
    console.log("Error in reservation: " + error);
  }
}
