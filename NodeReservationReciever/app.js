require("./database");
const rabbitsender = require("./helpers/rabbitSender");
const Reservation = require("./models/reservationModel");

const amqp = require("amqplib/callback_api");
const { json } = require("express");
//  Connect to RabbitMQ server
amqp.connect("amqp://localhost", function (error0, connection) {
  if (error0) {
    throw error0;
  }

  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1;
    }

    var queue = "Reservations";

    channel.assertQueue(queue, {
      durable: false,
    });
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

    channel.consume(
      queue,
      async function (msg) {
        console.log(" [x] Received %s", msg.content.toString());

        let createdRecipe = await Reservation.create(JSON.parse(msg.content));

        rabbitsender.sendToQueue(
          JSON.stringify(createdRecipe) + " Has been confirmed",
          "Confirms"
        );
      },
      {
        noAck: true,
      }
    );
  });
});
