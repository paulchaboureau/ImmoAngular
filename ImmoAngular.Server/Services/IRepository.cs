namespace ImmoAngular.Server.Services;

public interface IRepository<T> where T : class
{
    Task<IEnumerable<T>> GetByUserIdAsync(string userId);
    Task<T> AddAsync(T entity);
} 