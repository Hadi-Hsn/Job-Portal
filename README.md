# MERN Job Portal

Welcome to the MERN Job Portal! This is a full-stack web application built using the MERN stack, designed to help users find and apply for job opportunities.

## Features
- **User Authentication:** Users can sign up, log in, and log out securely.
- **Job Listings:** Employers can post job openings, and job seekers can browse available jobs.
- **Job Search:** Job seekers can search for jobs based on different criteria such as job title.
- **Job Applications:** Job seekers can apply for jobs directly through the portal, and employers can manage job applications.
- **User Profiles:** Users can create and manage their profiles.
- **Admin Panel:** Admin users have access to an admin panel where they can manage users and job listings.

## How to Start the Project

1. **Clone the Repository:**
   ```sh
   git clone <repository_url>
   cd mern-job-portal
   ```

2. **Install Dependencies:**
   - For the backend:
     ```sh
     cd backend
     npm install
     ```
   - For the frontend:
     ```sh
     cd ../frontend
     npm install
     ```

3. **Set Up Environment Variables:**
   - Create a `.env` file in the `backend` directory with the following variables:
     ```sh
     MONGO_URI=<your_mongodb_connection_string>
     JWT_SECRET=<your_jwt_secret>
     ```

4. **Run the Application:**
   - Start the backend server:
     ```sh
     cd backend
     npm start
     ```
   - Start the frontend server:
     ```sh
     cd ../frontend
     npm start
     ```

5. **Access the Application:**
   - Open your web browser and go to `http://localhost:3000` to view the frontend.
   - The backend server should be running on `http://localhost:5000`.

6. **Admin Access:**
   - To access the admin panel, you need to create an admin user or modify the user role in the database directly.

## Contributions
We welcome contributions! Please fork the repository and submit pull requests.
