using Contact_Management_System.Data;

namespace Contact_Management_System.Models
{
    public class ContactModel
    {
        public int ID { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string ContactNo { get; set; } = string.Empty;

    }
}
