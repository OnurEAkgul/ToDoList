using Core.DataAccess;
using Core.DataAccess.EntityFramework;
using DataAccess.Abstract;
using DataAccess.Domains;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Concrete.EntityFramework
{

    public class ToDoListDAL : EntityRepository<ToDoList, UserDbContext>, IToDoListDAL
    {

    }
    /*public class ToDoListDAL : IToDoListDAL
    {
        private readonly UserDbContext _context;

        public ToDoListDAL(UserDbContext context)
        {
            _context = context;
        }

        public async Task<List<ToDoList>> GetAllAsync(Expression<Func<ToDoList, bool>> filter = null)
        {
            return filter == null
                ? await _context.toDoLists.ToListAsync()
                : await _context.toDoLists.Where(filter).ToListAsync();
        }

        public async Task<ToDoList> GetAsync(Expression<Func<ToDoList, bool>> filter)
        {
            return await _context.toDoLists.FirstOrDefaultAsync(filter);
        }

        public async Task AddAsync(ToDoList entity)
        {
            await _context.toDoLists.AddAsync(entity);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(ToDoList entity)
        {
            _context.toDoLists.Remove(entity);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(ToDoList entity)
        {
            _context.toDoLists.Update(entity);
            await _context.SaveChangesAsync();
        }
    }*/
}
