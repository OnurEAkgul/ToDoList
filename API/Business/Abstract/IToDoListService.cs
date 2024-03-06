using Core.Utilities.Results;
using DataAccess;
using DataAccess.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Abstract
{
    public interface IToDoListService
    {
        Task<IDataResult<List<ToDoList>>> GetAllAsync();
        Task<IResult> AddAsync(ToDoList ToDoLists);
        Task<IResult> DeleteAsync(ToDoList ToDoLists);
        Task<IResult> UpdateAsync(ToDoList ToDoLists);
    }
}
