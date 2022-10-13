using CATS_Server.DataAccess;
using HotChocolate;
using HotChocolate.AspNetCore.Authorization;
using HotChocolate.Execution;
using HotChocolate.Types;
using Mapster;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace CATS_Server.Services.GraphQL
{
    public abstract class BaseMutation<TEntity> where TEntity : class
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <param name="input"></param>
        /// <param name="dbContext"></param>
        /// <returns></returns>
        public TEntity Save<T>(int? id, T input, ApplicationDbContext dbContext, Action<TEntity> callbackFunc = null)
        {
            // Input validation 
            var ValidatorContext = new ValidationContext(input);
            var validationResults = new List<ValidationResult>();
            if (!Validator.TryValidateObject(input, ValidatorContext, validationResults, true))
            {
                var errors = validationResults.Select(r =>
                    ErrorBuilder
                    .New()
                    .SetCode(StatusCodes.BadRequest)
                    .SetMessage(r.ErrorMessage).Build());
                throw new QueryException(errors);
            }

            TEntity result;
            if (id.HasValue) // Update
            {
                // Check entity existance 
                var existing = dbContext.Set<TEntity>().Find(id);
                if (existing != null)
                {
                    // Map input to user entity 
                    existing = input.Adapt(existing);

                    // Invoke callback function
                    callbackFunc?.Invoke(existing);

                    // Update entity
                    result = dbContext.Set<TEntity>().Update(existing).Entity;
                }
                else
                {
                    throw ExceptionBuilder.Create(StatusCodes.NotFound, StatusMessages.ResourceNotFound);
                }
            }
            else // Add
            {
                // Add to repository
                var newRecord = input.Adapt<TEntity>();


                // Update entity
                result = dbContext.Set<TEntity>().Add(newRecord).Entity;
            }

            // Save changes to database 
            _ = dbContext.SaveChanges();

            return result;
        }

        /// <summary>
        /// 
        /// </summary>
        /// 
        /// <param name="id"></param>
        /// <param name="dbContext"></param>
        /// <returns></returns>
        public bool Delete(int id, ApplicationDbContext dbContext, Action<TEntity> callbackFunc = null)
        {
            // Check entity existance 
            var existing = dbContext.Set<TEntity>().Find(id);
            if (existing == null)
            {
                throw ExceptionBuilder.Create(StatusCodes.NotFound, StatusMessages.ResourceNotFound);
            }
            else
            {
                // Invoke callback function
                callbackFunc?.Invoke(existing);
            }

            // Update repository
            dbContext.Set<TEntity>().Remove(existing);
            return dbContext.SaveChanges() > 0;
        }
    }
}
