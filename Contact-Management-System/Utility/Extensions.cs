﻿using Contact_Management_System.Data;
using Contact_Management_System.Models;

namespace Contact_Management_System.Utility
{
    public static class Extensions
    {

        public static Contact ParseToContact(this ContactModel model)
        {
            return new Contact { ID = model.ID, Address = model.Address, ContactNo = model.ContactNo, Email = model.Email, Name = model.Name };
        }

        public static string Capitalize(this string source)
        {
            string word = string.Empty;
            foreach(var item in source.Split(' '))
            {
                word += item[0].ToString().ToUpper() + item.Substring(1).ToLowerInvariant() + " ";
            }
            return word.Trim();
        }
    }
}
