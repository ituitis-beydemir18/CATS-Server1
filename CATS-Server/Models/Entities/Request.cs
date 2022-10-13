using CATS_Server.Models.Enums;
using HotChocolate.Types;
using HotChocolate.Types.Relay;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace CATS_Server.Models.Entities
{
    public class Request : AuditableEntity
    {
        public string Code { get; set; }
        public int RequestTypeId { get; set; }
        public int RequesterId { get; set; }
        public string RequesterUsername { get; set; }
      

        public string NotifierName { get; set; }
        public int? ReviewerId { get; set; }
        
        public RequestStatus Status { get; set; }
        public bool? InHouse { get; set; }
        public string Title { get; set; }

        public string AuthorizedPersonUserName { get; set; }
        public string AuthorizedPersonEmployeeId { get; set; }
        public string Explanation { get; set; }
                
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }

        public string References { get; set; }
        public string Qualifications { get; set; }

        


        public User Reviewer { get; set; }
        public User Requester { get; set; }

        public RequestType RequestType { get; set; }




   


    }
}
