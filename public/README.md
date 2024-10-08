# Dining Services App

## Project Overview

The Dining Services App is part of the Smart Campus System, aimed at enhancing the campus dining experience by providing real-time menu access, dietary management tools, meal credit tracking, dining reservations, and a feedback system. This app integrates with other subsystems of the Smart Campus System to provide a unified and efficient service for students, faculty, and staff.

## Setup Instructions

### Prerequisites

- Firebase
- npm (v6 or higher) or yarn
- MySQL (for database)

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-organization/5C---dining-services.git
   cd 5C---dining-services

2. **Install Dependencies**
    ```bash
    npm install
    # or
    yarn install

3. **Configure Environmental Variables**
    - Create a .env file in the root directory and add the following configuration:
    ```makefile
    DATABASE_HOST=localhost
    DATABASE_USER=root
    DATABASE_PASSWORD=thepassword
    DATABASE_NAME=dining_services

4. **Run Migrations**
    ```bash
    npm run migrate

5. **Start the Application**
    ```bash
    npm start
    # or
    yarn start

### Usage

- Access the App: Navigate to http://localhost:3000 in your web browser.
- API Endpoints: Refer to the API documentation for details on available endpoints and their usage.

### Documentation
For more detailed documentation, including API references and system architecture, refer to the following files:

[CONTRIBUTING.md](CONTRIBUTING.md) 
[VERSION_CONTROL.md](VERSION_CONTROL.md)
[CHANGELOG.md](CHANGELOG.md)

## Project Architecture
This project follows a microservices architecture. For more details, refer to [Architecture Documentation](ARCHITECTURE.md).



