using Contact_Management_System.Models;

namespace Contact_Management_System.Data
{
    public class DataRepository
    {

        private readonly AppDbContext _context;

        public DataRepository(AppDbContext context)
        {
            _context = context;
        }

        // create a method named 'AddEntry' that accepts a Contact object as a parameter, save the contact int the database and return the ID of the contact
        public int AddEntry(Contact contact)
        {
            _context.Contacts.Add(contact);
            _context.SaveChanges();
            return contact.ID;
        }

        // create method named 'GetAllEntries' that returns a list of all contacts in the database
        public List<Contact> GetAllEntries()
        {
            return _context.Contacts.ToList();
        }

        // create a method named 'UpdateEntry' that accepts a Contact object as a parameter, update the contact in the database and return the ID of the contact
        public int UpdateEntry(Contact contact)
        {
            _context.Contacts.Update(contact);
            _context.SaveChanges();
            return contact.ID;
        }

        // create a method that accepts an ID of a contact as a parameter, delete the contact from the database and return a boolean value indicating if the contact was deleted
        public bool DeleteEntry(int id)
        {
            var contact = _context.Contacts.Find(id);
            if (contact != null)
            {
                _context.Contacts.Remove(contact);
                _context.SaveChanges();
                return true;
            }
            return false;
        }

        

        







    }
}
