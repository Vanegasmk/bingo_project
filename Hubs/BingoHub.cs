using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace project_bingo.Hubs
{
    public class BingoHub : Hub
    {
        public void Echo(String message)
        {
            Clients.All.SendAsync("SendMessage", message);
        }
    }
}