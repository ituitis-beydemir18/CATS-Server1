using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace CATS_Server.Services.Configuration
{
    public static class AuthenticationConfigurationServices
    {
        internal static readonly byte[] SharedSecret = Encoding.ASCII.GetBytes(
           "abcdefghijklmnopqrstuvwxyz1234567890");

        public static void ConfigureAuthenticationServices(IServiceCollection services) =>
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
                .AddJwtBearer(options =>
                {
                    options.RequireHttpsMetadata = false;
                    options.SaveToken = false;
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(SharedSecret),
                        ValidateLifetime = false,
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });
    }
}
