
using System;
using System.Collections.Generic;

namespace bingo_project.Models
{
    public class Admin
    {
        public long Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string UserType { get; set; }
    }
}