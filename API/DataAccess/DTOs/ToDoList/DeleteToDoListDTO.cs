using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.DTOs.ToDoList
{
    public class DeleteToDoListDTO
    {
        public Guid Id { get; set; }
        public string UserId { get; set; }
    }
}
