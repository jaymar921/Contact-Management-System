using Contact_Management_System.Data;
using Contact_Management_System.Models;
using Contact_Management_System.Utility;
using Microsoft.AspNetCore.Mvc;

namespace Contact_Management_System.Controllers
{
    public class DetailController : Controller
    {
        private readonly DataRepository dataRepository;

        public DetailController(DataRepository dataRepository)
        {
            this.dataRepository = dataRepository;
        }

        /*
         * Returns the view for the contact details
         * 
         * It will check if the contact exists in the database, if it does then it will return the view containing the data
         * otherwise it will redirect to the home page
         */
        public IActionResult Index(int id)
        {
            Contact? contactData = dataRepository.GetEntry(id);
            if(contactData == null)
                return RedirectToAction("Index", "Home");
            return View(contactData.GetContactModel());
        }

        /*
         * This method will accept a ContactModel as parameter
         * and update the contact in the database based on the Contact.ID, which is the primary key
         * then the method will redirect back to the contact details page
         */
        [HttpPost]
        [Route("UpdateContact")]
        public IActionResult UpdateContactInfo(ContactModel model)
        {
            dataRepository.UpdateEntry(model.ParseToContact());
            TempData["Message"] = "Contact updated successfully";
            return Redirect($"/detail?id={model.ID}");
        }
    }
}
