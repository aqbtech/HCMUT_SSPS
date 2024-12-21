# HCMUT Student Smart Printing System

## Introduction
<p style="text-align: justify;">
Ho Chi Minh University of Technology Student Smart Printing Service (HCMUT_SSPS) for serving
students in its campuses to print their documents.
</p>

### Supervisor
**ThS. Trần Trương Tuấn Phát**

### Member
We are a group of enthusiastic students from the Computer Science and Engineering department at HCMUT. Our team members include:
|MSSV    | FullName               | Role |
|--------|------------------------|------|
|2212825 | Từ Văn Nguyễn Anh Quân | Project manager, Backend Developer
|2212841 | Trần Hưng Quốc         | Frontend Developer
|2212865 | Đoàn Ngọc Văn Quý      | Backend Developer
|2212801 | Nguyễn Minh Quân       | Backend Developer
|2212868 | Nguyễn Minh Quý        | Frontend Developer

## Technologies Used

### Backend
- **Spring Boot**: A powerful framework for building Java-based web applications. It simplifies the development process by providing a comprehensive set of tools and libraries.

### Frontend
- **React**: A popular JavaScript library for building user interfaces. React allows for the creation of dynamic and responsive web pages.

## Features

### User Authentication
- Integrated with **HCMUT_SSO** for secure and seamless login for all users.
### Payment Integration
- Integration payment with BK_Pay.
### Student Features
- **Document Management**:
  - Upload documents (PDF, DOCX, etc.).
  - Edit before printing: select pages, set color, adjust margins, and preview layout.
- **Paper Store**:
  - Browse and purchase various paper types and sizes.
- **Printing History**:
  - View all previous print jobs with details like time, pages, and cost.
- **Balance Management**:
  - Check current balance (number of printable pages).
  - Receive balance updates from the system operator.

###  Student Printing Service Officer (SPSO) Features
- **Printer Management**:
  - Monitor printer status (online/offline, ink, paper levels).
  - Assign printers to specific locations.
- **Student Management**:
  - View all students' printing history.
  - Grant or deduct balances for students.
- **Reporting**:
  - Generate usage reports for printers, students, and resources.


## Project Structure

```
HCMUT_E-commerce/
├── Backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   └── resources/
│   ├── pom.xml
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── ...
└── README.md
```

## Getting Started

### Prerequisites

- **Java 21**: Ensure you have JDK 21 installed.
- **Node.js**: Required for running the React development server.
- **MySQL**: The database used for storing application data.

### Backend Setup

1. Clone the repository:
   ```
   git clone https://github.com/aqbtech/HCMUT_SSPS.git
   cd HCMUT_SSPS/ssps_be
   ```
2. Configure the database and environment variable:
    - Create `.env` in `src/main/`.
    - Update the MySQL connection details, payment integration infomation, firebase service key and jwt signer key:
      ```
      SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3309/e-commerce
      SPRING_DATASOURCE_DRIVER_CLASS_NAME=com.mysql.cj.jdbc.Driver
      SPRING_DATASOURCE_USERNAME=your-username
      SPRING_DATASOURCE_PASSWORD=your-password
      CORS_ALLOWED_ORIGINS=http://localhost:5173
      CONFIG_CAS_SERVER=your-CAS-SSO-server
      ```

3. Build and run the backend:
   ```
   ./mvn clean package
   ./mvnw spring-boot:run
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd ../ssps_fe
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the React development server:
   ```
   npm run dev
   ```

## Contact

For any questions or suggestions, please contact the project maintainers at [tvnaquan@gmail.com](mailto:tvnaquan@gmail.com).
