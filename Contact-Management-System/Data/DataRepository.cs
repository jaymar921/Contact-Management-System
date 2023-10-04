using Microsoft.EntityFrameworkCore;

namespace Contact_Management_System.Data
{
    public class DataRepository
    {

        private readonly AppDbContext _context;

        public DataRepository(AppDbContext context)
        {
            _context = context;
            // clear the contact table
            //_context.Database.ExecuteSqlRaw("DELETE FROM Contacts");

            // create the contact table
            //_context.Database.ExecuteSqlRaw("CREATE TABLE IF NOT EXISTS Contacts (ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT NOT NULL, Email TEXT NOT NULL, Address TEXT NOT NULL, ContactNo TEXT NOT NULL)");
        }

        // create a method named 'AddEntry' that accepts a Contact object as a parameter, save the contact int the database and return the ID of the contact
        public int AddEntry(Contact contact)
        {
            _context.Contacts.Add(contact);
            _context.SaveChanges();
            return contact.ID;
        }

        // create a method named AddEntryAsync that accepts a Contact object as a parameter, save the contact int the database and return the ID of the contact
        public async Task<int> AddEntryAsync(Contact contact)
        {
            await _context.Contacts.AddAsync(contact);
            await _context.SaveChangesAsync();
            return contact.ID;
        }

        // create a method named AddEntriesAsync that accepts a list of Contact objects as a parameter, save the contacts int the database and return the ID of the contact
        public async Task<int> AddEntriesAsync(List<Contact> contacts)
        {
            await _context.Contacts.AddRangeAsync(contacts);
            await _context.SaveChangesAsync();
            return contacts.Count;
        }

        // create a method named 'GetEntry' that accepts an ID of a contact as a parameter, return contact or default
        public Contact? GetEntry(int id)
        {
            return _context.Contacts.Where(c => c.ID == id).FirstOrDefault();
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
