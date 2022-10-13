using HotChocolate;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using CATS_Server.Models.Enums;

namespace CATS_Server.Services.GraphQL
{
    public class PersonalRequestInput
    {
        public int? Id { get; set; }
        public string Code { get; set; }
        [Required]
        public int RequestTypeId { get; set; }
        [Required]
        public int RequesterId { get; set; }
        [Required]
        public string RequesterUsername { get; set; }


        public string NotifierName { get; set; }
        public int? ReviewerId { get; set; }

        public RequestStatus Status { get; set; }
        [Required]
        public bool? InHouse { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string AuthorizedPersonUserName { get; set; }
        [Required]
        public string AuthorizedPersonEmployeeId { get; set; }
        [Required]
        public string Explanation { get; set; }
        [Required]
        public DateTime? StartDate { get; set; }
        [Required]
        public DateTime? EndDate { get; set; }

        
        public string Qualifications { get; set; }


    }
}
