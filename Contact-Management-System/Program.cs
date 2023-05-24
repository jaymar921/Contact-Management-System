// import the AppDbContext
using Contact_Management_System.Data;
// import the EntityFrameworkCore
using Microsoft.EntityFrameworkCore;


var builder = WebApplication.CreateBuilder(args);

// create a string variable policyCorsname with APICors value, then add a cors in builder services with policy origin value of * and method value of *
string policyCorsname = "APICors";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: policyCorsname,
               builder =>
               {
            builder.WithOrigins("*").WithMethods("*");
        });
});

// Add a DBContext into the builder service that use and option to UseSqlite and point to the database file named SimpleContactManagementSystem
builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlite("Data Source=SimpleContactManagementSystem"));
// Add the DataRepository into the builder service as a scoped service
builder.Services.AddScoped<DataRepository>();


// Add services to the container.
builder.Services.AddControllersWithViews();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

// add the cors policy to the app and set isoriginalallowed to true, allowanymethod, allowcredentials, allowanyheader, and don't pass the policy name
app.UseCors(options => options.SetIsOriginAllowed(x => _ = true).AllowAnyMethod().AllowCredentials().AllowAnyHeader());

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();