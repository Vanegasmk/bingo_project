using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace bingo_project.Hubs
{
    public class BingoHub : Hub
    {
        public async Task AddToGroup(string roomId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, roomId);
        }
        
        
       


    }
}