using CATS_Server.Services.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace CATS_Server
{
    public static class ClaimsExtensions
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="principal"></param>
        /// <returns></returns>
        public static int? GetId(this ClaimsPrincipal principal)
        {
            if (int.TryParse(principal.FindFirstValue(CustomClaimTypes.Id), out int result))
            {
                return result;
            }
            else
            {
                return default;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="identity"></param>
        /// <returns></returns>
        public static string GetToken(this ClaimsIdentity identity)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = identity,
                Expires = DateTime.UtcNow.AddMinutes(60),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(AuthenticationConfigurationServices.SharedSecret), SecurityAlgorithms.HmacSha256Signature)
            };



            var token = tokenHandler.CreateToken(tokenDescriptor);
            var serializedToken = tokenHandler.WriteToken(token);

            return serializedToken;
        }
    }
}
