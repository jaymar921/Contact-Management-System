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

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

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