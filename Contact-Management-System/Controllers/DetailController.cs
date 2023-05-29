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

        public IActionResult Index(int id)
        {
            Contact? contactData = dataRepository.GetEntry(id);
            if(contactData == null)
                return RedirectToAction("Index", "Home");
            return View(contactData.GetContactModel());
        }

        [HttpPost]
        [Route("UpdateContact")]
        public IActionResult UpdateContactInfo(ContactModel model)
        {
            Console.WriteLine(model.ID);
            Console.WriteLine(model.Name);
            Console.WriteLine(model.Email);
            Console.WriteLine(model.Address);
            Console.WriteLine(model.ContactNo);
            dataRepository.UpdateEntry(model.ParseToContact());
            TempData["Message"] = "Contact updated successfully";
            return Redirect($"/detail?id={model.ID}");
        }
    }
}
