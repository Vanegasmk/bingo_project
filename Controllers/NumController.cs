using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using bingo_project.Models;

namespace bingo_project.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NumerosController : ControllerBase
    {
        private readonly DataBaseContext _context;
        public static Numero[] numerosLista = new Numero[75];
        public NumerosController(DataBaseContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<int>>> GetNumbers()
        {
            List<int> newList = new List<int>();
            var listdb = await _context.Numeros.ToListAsync();
            foreach (var nu in listdb)
            {
               newList.Add(nu.Num);
            }
            
            return newList;

        }



        [HttpPost]
        public async Task<ActionResult<List<int>>> PostNumero()
        {
            var repeat = false;
            List<int> newList = new List<int>();
            Numero nuevoRandom = new Numero();
            var listdb = await _context.Numeros.ToListAsync(); //lista de la bd
            
            foreach (var nu in listdb)
            {
               newList.Add(nu.Num);
            }

            while (repeat == false)
            {
                Random rnd = new Random();
                int random = rnd.Next(1, 75);

                if(!newList.Contains(random)){
                    nuevoRandom.Num = random;
                    _context.Numeros.Add(nuevoRandom);
                    await _context.SaveChangesAsync();
                    newList.Add(random);
                    repeat = true;
                }else{
                    repeat = false;
                }
            }

            return newList;
        }


    }
}