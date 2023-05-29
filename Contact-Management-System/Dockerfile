#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["Contact-Management-System/Contact-Management-System.csproj", "Contact-Management-System/"]
RUN dotnet restore "Contact-Management-System/Contact-Management-System.csproj"
COPY . .
WORKDIR "/src/Contact-Management-System"
RUN dotnet build "Contact-Management-System.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Contact-Management-System.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Contact-Management-System.dll"]