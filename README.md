# **Services API**

This project implements a Services API to manage services and their versions. The API is built with Nest.js, PostgreSQL, and TypeORM.

---

## **Features**
- CRUD operations for services.
- Management of service versions.
- Filtering, sorting, and pagination for service listings.
- TODO: Authentication and authorization using JWT.
- Validation and error handling.
- TODO: Unit and integration tests to ensure reliability.

---

## **Design Considerations**
### **1. Scalability**
- Database Schema:  
  Separate tables for Service and Version entities to normalize the data and avoid redundancy.  
  The Version table includes a foreign key to Service for many-to-one relationships.
- API Structure:  
  Designed RESTful endpoints to adhere to standard conventions for maintainability and scalability.  
  Used pagination and sorting in listing endpoints to handle large datasets efficiently.

### **2. Security**
- Authentication:  
  Implemented JWT-based authentication to ensure secure access to the API.
- Validation:  
  Used class-validator to validate incoming data, reducing the risk of invalid data entering the system.
- Error Handling:  
  Added detailed error messages with proper HTTP status codes for client and server-side issues.

### **3. Test Coverage (TODO)**
Focused on testing critical parts of the service:
- Repository-level operations.
- Business logic in the service layer.
- Error scenarios, such as missing records and invalid input.

---

## **Assumptions**
1. Data Relationships:  
   A Service can have multiple Version entries, but each Version belongs to exactly one Service.  
   The versionNumber is unique per service.

2. API Usage:  
   Only authorized users can access the endpoints, requiring JWT authentication for all operations except public queries.

3. Environment:  
   The project is developed to run locally with PostgreSQL as the database.  
   Default configurations assume the database is running on localhost:5432.

4. Pagination Defaults:  
   If no pagination parameters are provided, the API returns all available records.

---

## **Trade-offs**
### **1. Simplified Authentication**
Trade-off: Chose JWT for simplicity and compatibility with REST APIs.  
Alternative: Could have implemented OAuth2 for better integration with external identity providers but would have required additional setup and complexity.

### **2. Database Constraints vs. Application Logic**
Trade-off: Added constraints like `@Unique` at the database level to prevent duplicates.  
Alternative: Could enforce uniqueness entirely in application logic, but database constraints ensure data integrity.

### **3. Development vs. Production Readiness**
Trade-off: Used synchronize: true in development for rapid iteration.  
Alternative: Disable synchronization and use migrations for better control in production environments.

---

## **Setup and Installation**
### **Requirements**
- Node.js v20+
- PostgreSQL v15+
- NPM v8+

### **Steps**
1. Clone the repository.  
   git clone https://github.com/12Parker/Services-Catalog.git  
   cd services-api  

2. Install dependencies.  
   npm install  

3. Set up the database:  
   Create a PostgreSQL database named services_api.  
   Update the .env file with your database credentials:  

   DATABASE_HOST=127.0.0.1  
   DATABASE_PORT=5432  
   DATABASE_USER=postgres  
   DATABASE_PASSWORD=your_password  
   DATABASE_NAME=services_api  

4. Start the application.  
   npm run start:dev  

5. Run tests.  
   npm run test  

---

## **API Documentation**

### **Endpoints**

#### **1. Services**
- GET /services  
  List all services with optional filtering, sorting, and pagination.
- POST /services  
  Create a new service.
- GET /services/:id  
  Retrieve a specific service by ID.
- PUT /services/:id  
  Update a service by ID.
- DELETE /services/:id  
  Delete a service by ID.

#### **2. Versions**
- POST /services/:id/versions  
  Create a new version for a service.
- GET /services/:id/versions  
  List all versions of a service.

---

## **Testing**

The project includes unit and integration tests to ensure robustness.

Example:  
npm run test  

---

## **Future Improvements**
1. Database Migrations:  
   Add a migration tool to handle schema changes in production environments.
2. Caching:  
   Use a caching layer (e.g., Redis) to improve performance for frequently accessed endpoints.
3. Monitoring:  
   Integrate monitoring tools (e.g., Prometheus, Grafana) for better observability.
4. Comprehensive Logging:  
   Improve logging to capture detailed request/response metadata.

---

## **License**
This project is licensed under the MIT License. See the LICENSE file for details.
