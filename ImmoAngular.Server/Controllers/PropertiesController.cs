namespace ImmoAngular.Server.Controllers;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Collections.Generic;
using System.Threading.Tasks;
using ImmoAngular.Server.Models;
using ImmoAngular.Server.Services;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class PropertiesController : ControllerBase
{
    private readonly PropertyScraperService _scraperService;
    private readonly IRepository<Property> _repository;

    public PropertiesController(
        PropertyScraperService scraperService,
        IRepository<Property> repository)
    {
        _scraperService = scraperService;
        _repository = repository;
    }

    [HttpPost("scrape")]
    public async Task<ActionResult<Property>> ScrapeProperty([FromBody] string url)
    {
        var property = await _scraperService.ScrapePropertyFromUrl(url);
        property.UserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        await _repository.AddAsync(property);
        return Ok(property);
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Property>>> GetProperties()
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var properties = await _repository.GetByUserIdAsync(userId);
        return Ok(properties);
    }
}