using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Linq.Expressions;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Core.DataAccess.EntityFramework
{
    public class EntityRepository<TEntity, TContext> : IEntityRepository<TEntity>
    where TEntity : class, new() where TContext : IdentityDbContext, new()
    {

        public async Task AddAsync(TEntity entity)
        {
            using (TContext c = new TContext())
            {
                var addedEntity = c.Entry(entity);
                addedEntity.State = EntityState.Added;
                await c.SaveChangesAsync();
            }
        }

        public async Task DeleteAsync(TEntity entity)
        {
            using (TContext c = new TContext())
            {
                var deletedEntity = c.Entry(entity);
                deletedEntity.State = EntityState.Deleted;
                await c.SaveChangesAsync();
            }
        }

        public async Task<TEntity> GetAsync(Expression<Func<TEntity, bool>> filter)
        {
            using (TContext c = new TContext())
            {
                return await c.Set<TEntity>().SingleOrDefaultAsync(filter);
            }
        }

        public async Task<List<TEntity>> GetAllAsync(Expression<Func<TEntity, bool>> filter = null)
        {
            using (TContext c = new TContext())
            {
                return filter == null
                    ? await c.Set<TEntity>().ToListAsync()
                    : await c.Set<TEntity>().Where(filter).ToListAsync();
            }
        }

        public async Task UpdateAsync(TEntity entity)
        {
            using (TContext c = new TContext())
            {
                var updatedEntity = c.Entry(entity);
                updatedEntity.State = EntityState.Modified;
                await c.SaveChangesAsync();
            }
        }

       
    }

}

