using Contact_Management_System.Data;
using Contact_Management_System.Models;
using Contact_Management_System.Utility;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace Contact_Management_System.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DataController : Controller
    {

        // create a readonly variable named 'dataRepository' that is of type DataRepository
        private readonly DataRepository dataRepository;

        // create a variable of type JsonSerializerOptions named jsonSerializer and set WriteIndented to true
        private JsonSerializerOptions jsonSerializer = new JsonSerializerOptions { WriteIndented = true };

        /*
         * API_KEY will be used to authenticate the request from the client, not the best way to do it but it will do for now
         */
        // create a readonly variable named 'API_KEY' that is of type string and assign it a value of "api-vm3875y285982m35mn45b674"
        private readonly string API_KEY = "api-vm3875y285982m35mn45b674";


        // create a constructor that accepts a DataRepository object as a parameter and assign it to the dataRepository variable
        public DataController(DataRepository dataRepository)
        {
            this.dataRepository = dataRepository;
        }

        [HttpGet]
        public JsonResult GetAllContacts()
        {
            Request.Headers.TryGetValue("api-key", out var apikey);

            // if api key is not valid return a json result with a message "Invalid API Key"
            if (apikey != API_KEY)
            {
                return new JsonResult(new {Status = 401, message= "Invalid API Key" }, jsonSerializer);
            }

            // return a json result with a list of all contacts
            return new JsonResult(new {Status = 200, message="Success", data = dataRepository.GetAllEntries() }, jsonSerializer);
        }

        [HttpPost]
        public async Task<JsonResult> UploadContact(List<ContactModel> model)
        {
            Request.Headers.TryGetValue("api-key", out var apikey);
            // if api key is not valid return a json result with a message "Invalid API Key"
            if (apikey != API_KEY)
            {
                return new JsonResult(new { Status = 401, message = "Invalid API Key" }, jsonSerializer);
            }

            List<Contact> contacts = new List<Contact>();
            foreach (var item in model)
            {
                contacts.Add(item.ParseToContact());
            }

            // e dasok tanan

            await dataRepository.AddEntriesAsync(contacts);

            // return a json result with a message "Contact uploaded successfully"
            return new JsonResult(new { Status = 200, message = "Contact uploaded successfully" }, jsonSerializer);
        }

        [HttpPut]
        public JsonResult UpdateContact(ContactModel model)
        {
            Request.Headers.TryGetValue("api-key", out var apikey);
            // if api key is not valid return a json result with a message "Invalid API Key"
            if (apikey != API_KEY)
            {
                return new JsonResult(new { Status = 401, message = "Invalid API Key" }, jsonSerializer);
            }

            dataRepository.UpdateEntry(model.ParseToContact());

            // return a json result with a message "Contact updated successfully"
            return new JsonResult(new { Status = 200, message = "Contact updated successfully" }, jsonSerializer);
        }

        [HttpDelete]
        [Route("DeleteContact/{id}")]
        public JsonResult DeleteContact(int id)
        {
            Request.Headers.TryGetValue("api-key", out var apikey);
            // if api key is not valid return a json result with a message "Invalid API Key"
            if (apikey != API_KEY)
            {
                return new JsonResult(new { Status = 401, message = "Invalid API Key" }, jsonSerializer);
            }

            // return contact not found if the contact does not exist in the database
            if (!dataRepository.DeleteEntry(id))
            {
                return new JsonResult(new { Status = 404, message = "Contact not found" }, jsonSerializer);
            }

            // return a json result with a message "Contact deleted successfully"
            return new JsonResult(new { Status = 200, message = "Contact deleted successfully" }, jsonSerializer);
        }
    }
}
