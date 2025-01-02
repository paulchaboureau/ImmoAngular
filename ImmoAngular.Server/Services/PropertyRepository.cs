namespace ImmoAngular.Server.Services;

using ImmoAngular.Server.Models;

public class PropertyRepository : IRepository<Property>
{
    private readonly List<Property> _properties = new();

    public async Task<IEnumerable<Property>> GetByUserIdAsync(string userId)
    {
        return _properties.Where(p => p.UserId == userId);
    }

    public async Task<Property> AddAsync(Property entity)
    {
        _properties.Add(entity);
        return entity;
    }
} 