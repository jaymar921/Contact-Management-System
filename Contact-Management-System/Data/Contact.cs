using System.ComponentModel.DataAnnotations;

namespace Contact_Management_System.Data
{
    public class Contact
    {
        [Key]
        public int ID { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string ContactNo { get; set; } = string.Empty;
    }
}
