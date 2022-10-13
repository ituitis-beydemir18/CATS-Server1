using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CATS_Server.Extensions
{
    public static class DbContextExtensions
    {
        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="db"></param>
        /// <param name="currentItems"></param>
        /// <param name="newItems"></param>
        public static void TryUpdateManyToMany<T>(this DbContext db, IEnumerable<T> currentItems, IEnumerable<T> newItems) where T : class
        {
            db.Set<T>().RemoveRange(currentItems.Except(newItems));
            db.Set<T>().AddRange(newItems.Except(currentItems));
        }
    }
}
