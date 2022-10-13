using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using CATS_Server.Models.Entities;
using CATS_Server.Extensions;

namespace CATS_Server.DataAccess
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
        public IConfiguration Configuration { get; }
        public IHttpContextAccessor ContextAccessor { get; }
        public DbSet<Application> APPLICATIONS { get; set; }
        public DbSet<ApplicationRole> APPLICATION_ROLES { get; set; }
        public DbSet<ApplicationType> APPLICATION_TYPES { get; set; }
        public DbSet<Language> LANGUAGES { get; set; }
        public DbSet<Request> REQUESTS { get; set; }
        public DbSet<RequestType> REQUEST_TYPES { get; set; }
        public DbSet<Role> ROLES { get; set; }
        public DbSet<Station> STATIONS { get; set; }
        public DbSet<Translation> TRANSLATIONS { get; set; }
        public DbSet<User> USERS { get; set; }
        public DbSet<UserRole> USER_ROLES { get; set; }
        public DbSet<UserType> USER_TYPES { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            // One-to-Many relationships
            modelBuilder.Entity<Language>().HasMany(l => l.Translations).WithOne(t => t.Language).HasForeignKey(t => t.LanguageCode).HasPrincipalKey(l => l.Code);
            modelBuilder.Entity<RequestType>().HasMany(l => l.Requests).WithOne(t => t.RequestType).HasForeignKey(t => t.RequestTypeId).HasPrincipalKey(l => l.Id);
            modelBuilder.Entity<User>().HasMany(l => l.RequesterRequests).WithOne(t => t.Requester).HasForeignKey(t => t.RequesterId).HasPrincipalKey(l => l.Id);
            modelBuilder.Entity<User>().HasMany(l => l.ReviewerRequests).WithOne(t => t.Reviewer).HasForeignKey(t => t.ReviewerId).HasPrincipalKey(l => l.Id);
            // Many-to-Many Relationships 
            modelBuilder.Entity<UserRole>().HasKey(x => new { x.UserId, x.RoleId });
            modelBuilder.Entity<ApplicationRole>().HasKey(x => new { x.ApplicationId, x.RoleId });

            // Property-Column mappings
            foreach (var entity in modelBuilder.Model.GetEntityTypes())
            {
                var storeObjectIdentifier = StoreObjectIdentifier.Table(entity.GetTableName(), entity.GetSchema());

                // Columns name mapping 
                foreach (var property in entity.GetProperties())
                {
                    property.SetColumnName(property.GetColumnName(storeObjectIdentifier).ToSnakeCase());

                    // Set global soft-delete query filter
                    if (property.Name == "Deleted")
                    {
                        modelBuilder.Entity(entity.Name).Property(property.Name).HasDefaultValue(false);
                        modelBuilder.Entity(entity.Name).AddQueryFilter<AuditableEntity>(e => e.Deleted == false);
                    }
                }
            }

        }
        public void EnableAuditing()
        {
            foreach (var entry in ChangeTracker.Entries<AuditableEntity>())
            {
                switch (entry.State)
                {
                    case EntityState.Added:
                        entry.CurrentValues["Created"] = DateTime.Now;
                        entry.CurrentValues["CreatedBy"] = ContextAccessor?.HttpContext?.User?.Identity?.Name;
                        break;
                    case EntityState.Modified:
                        entry.CurrentValues["LastModified"] = DateTime.Now;
                        entry.CurrentValues["LastModifiedBy"] = ContextAccessor?.HttpContext?.User?.Identity?.Name;
                        break;
                    case EntityState.Deleted:
                        entry.State = EntityState.Modified;
                        entry.CurrentValues["Deleted"] = true;
                        entry.CurrentValues["LastModified"] = DateTime.Now;
                        entry.CurrentValues["LastModifiedBy"] = ContextAccessor?.HttpContext?.User?.Identity?.Name;
                        break;
                }
            }
        }
        public override int SaveChanges(bool acceptAllChangesOnSuccess)
        {
            EnableAuditing();
            return base.SaveChanges(acceptAllChangesOnSuccess);
        }
        public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default)
        {
            EnableAuditing();
            return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
        }
    }
}
