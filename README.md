# University Management System

This University Management System is a MERN Stack-based application offering separate login portals for students, faculty, and administrators, each with distinct features and functionalities.


## Key Features

### **Student Portal**
- **View Internal Marks**: Students can access their internal assessment scores.  
- **View External Marks**: External examination results are readily available.  
- **Course Materials**: Download course-related materials.  
- **Notices**: Stay updated by viewing official notices.  
- **Timetables**: Access personal class timetables.  
- **Update Password**: Manage and update their login passwords.

---

### **Faculty Portal**
- **Student Information**: View comprehensive details about students.  
- **Password Management**: Update their login credentials.  
- **Post Notices**: Publish important updates for students and faculty.  
- **Upload Materials**: Share course content with students.  
- **Timetable Management**: Organize and manage class schedules.  
- **Record Marks**: Input internal and external exam results.

---

### **Admin Portal**
- **Account Management**: Create and modify student, faculty, and admin accounts.  
- **Subject Management**: Add or edit subjects as needed.  
- **Notices Management**: Manage announcements effectively.  

---
## Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone   https://github.com/rajsarda1211/University-Management-System.git
   ```

2. **Install dependencies:**

   ```bash
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

3. **Setup environment variables:**
4. 
  - ## In frontend
   .env   
   ```bash
   REACT_APP_APILINK = http://localhost:5000/api
   REACT_APP_MEDIA_LINK = http://localhost:5000/media
   ```
  - ## In backend
  .env
   ```bash
   MONGODB_URI = mongodb+srv://sardaraj1211:hgzojxC2pNTJh6jF@cluster0.r8btj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   PORT = 5000
   FRONTEND_API_LINK = http://localhost:3000
   ```

4. **Run the admin seeder:**

   ```bash
   cd backend
   npm run seed
   ```

   - **Login ID:** `123456`
   - **Password:** `admin123`
  
   - Using this login to the admin account and from admin you can add new faculty, student and admins!

5. **Run the backend server:**

   ```bash
   cd backend
   npm start
   ```

6. **Run the frontend server:**

   ```bash
   cd ../frontend
   npm start
   ```


