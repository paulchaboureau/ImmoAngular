namespace ImmoAngular.Server.Models;

using System;
using System.Collections.Generic;

public class Property
{
    public int Id { get; set; }
    public string Title { get; set; }
    public decimal Price { get; set; }
    public string Location { get; set; }
    public string Description { get; set; }
    public string SourceUrl { get; set; }
    public DateTime DateAdded { get; set; }
    public string UserId { get; set; }  // For authentication
    public List<string> Images { get; set; }
    public PropertySource Source { get; set; } // Enum: Leboncoin, SeLoger, etc.
}