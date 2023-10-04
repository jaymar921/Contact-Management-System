using Contact_Management_System.Data;
using Contact_Management_System.Models;
using Contact_Management_System.Utility;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace Contact_Management_System.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly DataRepository dataRepository;
            
        public HomeController(ILogger<HomeController> logger, DataRepository dataRepository)
        {
            _logger = logger;
            this.dataRepository = dataRepository;
        }

        /*
         * Returns the index view / home page
         */
        public IActionResult Index()
        {
            return View();
        }

        // create a method that returns an IFrame.cshtml view


        public IActionResult IFrame()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        /*
         * This method will accept a ContactModel as parameter,
         * registers a new contact information in the database then redirects back to the home page
         */
        [HttpPost]
        [Route("AddContact")]
        public IActionResult AddContact(ContactModel model)
        {
            model.Name = model.Name.Capitalize();
            dataRepository.AddEntry(model.ParseToContact());   
            return RedirectToAction("Index", "Home");
        }
    }
}