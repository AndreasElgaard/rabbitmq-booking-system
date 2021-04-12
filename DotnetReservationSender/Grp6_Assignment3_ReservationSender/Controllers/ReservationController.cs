using Grp6_Assignment3_ReservationSender.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using RabbitMQ.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace Grp6_Assignment3_ReservationSender.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ReservationController : ControllerBase
    {
        private readonly ILogger<ReservationController> _logger;

        //CTOR
        public ReservationController(ILogger<ReservationController> logger)
        {
            _logger = logger;
        }

        //POST - Creates a new reservation
        [HttpPost]
        public IActionResult PostReservation(Reservation reservation)
        {
            var factory = new ConnectionFactory() { HostName = "localhost" };
            try
            {
                using (var connection = factory.CreateConnection())
                {
                    using (var channel = connection.CreateModel())
                    {
                        channel.QueueDeclare(queue: "Reservations",
                                             durable: false,
                                             exclusive: false,
                                             autoDelete: false,
                                             arguments: null);

                        string msg = JsonConvert.SerializeObject(reservation);
                        var reqBody = Encoding.UTF8.GetBytes(msg);

                        Console.WriteLine(reqBody);

                        channel.BasicPublish(exchange: "",
                                             routingKey: "Reservations",
                                             basicProperties: null,
                                             body: reqBody);

                        Console.WriteLine(" [x] Send {0}", msg);
                    }
                }
                return Ok();
            }
            catch (Exception e)
            {
                throw e;
            }
            
        }
    }
}
