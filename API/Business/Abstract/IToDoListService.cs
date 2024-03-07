using Core.Utilities.Results;
using DataAccess;
using DataAccess.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Business.Abstract
{
    public interface IToDoListService
    {
        Task<IDataResult<List<ToDoList>>> GetAllAsync();
        Task<IResult> AddAsync(ToDoList ToDoLists);
        Task<IResult> DeleteAsync(ToDoList ToDoLists);
        Task<IResult> UpdateContentAsync(ToDoList ToDoLists);
        Task<IResult> UpdateStatusAsync(ToDoList ToDoLists);
        Task<IDataResult<List<ToDoList>>> GetByFilterAsync(Expression<Func<ToDoList, bool>> filter);
        Task<IDataResult<ToDoList>> GetByIdAsync(Guid id);
        Task<IDataResult<List<ToDoList>>> GetByUserIdAsync(string userId);
        Task<IDataResult<List<ToDoList>>> GetCompletedByUserIdAsync(string userId);
        Task<IDataResult<List<ToDoList>>> GetNotCompletedByUserIdAsync(string userId);
        Task<IDataResult<List<ToDoList>>> GetCompletedAsync();
        Task<IDataResult<List<ToDoList>>> GetNotCompletedAsync();
    }
}
