using Microsoft.EntityFrameworkCore;
using CATS_Server.DataAccess;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;
using CATS_Server.Settings;
using CATS_Server.Services.Configuration;
using HotChocolate.AspNetCore;
using HotChocolate.AspNetCore.GraphiQL;
using CATS_Server.Services.GraphQL;
using CATS_Server.Services.Mapster;
using CATS_Server.Services.Globalization;

var builder = WebApplication.CreateBuilder(args);

var services = builder.Services;

services.AddMemoryCache();
services.AddHttpContextAccessor();
services.AddHttpClient();
services.AddPooledDbContextFactory<ApplicationDbContext>(optionsBuilder => optionsBuilder.UseOracle(builder.Configuration.GetConnectionString("ApplicationContext")).UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking));
services.AddScoped((serviceProvider) => serviceProvider.GetRequiredService<IDbContextFactory<ApplicationDbContext>>().CreateDbContext());
services.AddMapperConfiguration();
services.AddControllers();
services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Version = "v1",
        Title = "CATS",
        Description = "A Corporate Authorization Tracking System"
    });
});
services.AddSingleton<IConfigureOptions<AppSettings>, AppSettingsConfigureOptions>();
//services.AddSingleton<PassengerJobsManager>();
services.AddSingleton<Translator>();

// Authentication and authorizations
AuthenticationConfigurationServices.ConfigureAuthenticationServices(services);
services.AddGraphQLServices();

// Hangfire Configuration
//services.AddHangfire(config => config.UseMemoryStorage());
//services.AddHangfireServer();

// Register SPA static files root path
//services.AddSpaStaticFiles(config => config.RootPath = "wwwroot");

// Add services to the container.
builder.Services.AddRazorPages();

var app = builder.Build();


// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "CATS-server v1"));
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
// Serve SPA Static files with HTTPS redirection
app.UseDefaultFiles();
app.UseStaticFiles();
//app.UseSpaStaticFiles();

app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
    endpoints.MapGraphQL();
});
app.UseGraphiQL(new GraphiQLOptions() { Path = "/graphiql", QueryPath = "/graphql" });

app.MapRazorPages();

app.Run();
