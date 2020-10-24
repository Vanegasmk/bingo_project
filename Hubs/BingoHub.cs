using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace bingo_project.Hubs
{
    public class BingoHub : Hub
    {
        public void Echo(string message)
        {
            Clients.All.SendAsync("SendMessage", message);
        }
    }
}