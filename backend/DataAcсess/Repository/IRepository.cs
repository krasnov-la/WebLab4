﻿using System.Linq.Expressions;

namespace backend.DataAccess.Repository
{
    public interface IRepository<T> where T : class 
    {
        void Add(T entity);
        IEnumerable<T> ReadAll();
        IQueryable<T> ReadWhere(Expression<Func<T, bool>> filter);
        T? ReadFirst(Expression<Func<T, bool>> filter);
        void Update(T entity);
        void Remove(T entity);
        void RemoveRange(IEnumerable<T> entities);
    }
}