namespace ImmoAngular.Server.Services;
    
using System;
using System.Threading.Tasks;
using ImmoAngular.Server.Models;

public class PropertyScraperService
{
    private PropertySource DetermineSource(string url)
    {
        if (string.IsNullOrEmpty(url))
            throw new ArgumentException("URL cannot be null or empty", nameof(url));

        if (!Uri.TryCreate(url, UriKind.Absolute, out Uri? uri))
            throw new ArgumentException("Invalid URL format", nameof(url));

        string host = uri.Host.ToLower();

        return host switch
        {
            var h when h.EndsWith("leboncoin.fr") => PropertySource.Leboncoin,
            var h when h.EndsWith("seloger.com") => PropertySource.SeLoger,
            var h when h.EndsWith("logic-immo.com") => PropertySource.LogicImmo,
            var h when h.EndsWith("pap.fr") => PropertySource.PapFr,
            _ => PropertySource.Other
        };
    }

    public async Task<Property> ScrapePropertyFromUrl(string url)
    {
        var source = DetermineSource(url);
        
        var property = new Property
        {
            SourceUrl = url,
            DateAdded = DateTime.UtcNow,
            Source = source,
            Title = "À implémenter", // TODO: Implémenter le scraping
            Price = 0, // TODO: Implémenter le scraping
            Location = "À implémenter", // TODO: Implémenter le scraping
            Description = "À implémenter", // TODO: Implémenter le scraping
            Images = new List<string>() // TODO: Implémenter le scraping
        };

        return property;
    }
}