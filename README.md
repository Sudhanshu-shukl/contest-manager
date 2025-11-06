
# Contest Manager 
A full-stack web application to track and manage coding contest participation across multiple platforms.

---

<div align="center">
  <img src="https://img.shields.io/badge/Platform-React-61DAFB?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Database-MongoDB-47A248?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge" />
</div>

---

## Demo

<div align="center">
  <img src="docs/demo.png" alt="App Screenshot" width="720"/>
</div>

---

## Features

### Contest Management
- Add, edit, delete contests across **LeetCode, Codeforces, AtCoder, HackerRank, CodeChef, TopCoder**  
- Mark contests completed with **questions solved count**  
- Visual indicators for upcoming and past contests  
- Filter & search contests in real-time

### Data Persistence
- MongoDB database for reliable storage  
- RESTful API for all CRUD operations  
- Import/export contest data (JSON)  
- Automatic synchronization between frontend and backend

### Performance Analytics
- Track **questions solved per contest**  
- Visual performance graphs & statistics  
- Platform-specific performance metrics  
- Overall completion tracking

### User Interface
- Responsive for desktop & mobile  
- Modern **glassmorphism** UI design  
- Intuitive navigation & UX

---

## Tech Stack

<div align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height="35" alt="React" />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" height="35" alt="Node.js" />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" height="35" alt="Express" />
  <img width="12" />
  <img src="https://cdn.simpleicons.org/mongodb/47A248" height="35" alt="MongoDB" />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" height="35" alt="JavaScript" />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" height="35" alt="HTML5" />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" height="35" alt="CSS3" />
</div>

---

## Installation

### Prerequisites
- Node.js v16+  
- MongoDB (local or Atlas)  
- npm or yarn

### Backend Setup
```bash
cd server
npm install
# configure .env
npm run dev
Frontend Setup
```
```bash
cd ..
npm install
npm run dev
```
Access frontend at http://localhost:5173 and backend at http://localhost:5000.

## API Endpoints

### Contests
- `GET /api/contests` → All contests
- `GET /api/contests/upcoming` → Upcoming contests
- `GET /api/contests/past` → Completed contests
- `GET /api/contests/:id` → Contest details
- `POST /api/contests` → Add new contest
- `PUT /api/contests/:id` → Update contest
- `PUT /api/contests/:id/mark-done` → Mark as completed
- `DELETE /api/contests/:id` → Delete contest

### Stats
- `GET /api/contests/stats/summary` → Performance metrics

### Health
- `GET /api/health` → Server status

## Database Schema
```javascript
{
  name: String,
  platform: ['LeetCode','Codeforces','AtCoder','HackerRank','CodeChef','TopCoder'],
  date: Date,
  time: String,
  link: String,
  done: Boolean,
  questionsSolved: Number,
  completedDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```
## Project Structure
```bash
lua
Copy code
ContestManager/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── styles/
│   ├── App.jsx
│   └── main.jsx
├── server/
│   ├── config/
│   ├── models/
│   ├── routes/
│   └── server.js
├── package.json
├── vite.config.js
└── README.md
```
## Usage
- Add, edit, delete contests easily
- Mark contests as complete & track questions solved
- View detailed performance analytics and charts
- Import/export contest data in JSON

## Development & Scripts

### Frontend
- `npm run dev` → start dev server
- `npm run build` → production build
- `npm run preview` → preview production
- `npm run lint` → lint code

### Backend
- `npm run dev` → start with nodemon
- `npm start` → production

## Deployment

### Local Network
- Bind `vite.config.js` & `server.js` to `0.0.0.0` for LAN access
- Access via `http://YOUR_IP:5173`

### Production
- Configure env vars, CORS, logging & optimizations

## Future Enhancements
- Multi-user support & authentication
- Notifications & reminders
- Advanced analytics & reporting
- Mobile app integration
- Platform API integration

## Author
[Sudhanshu Shukla](https://sudhanshu-shukl.github.io/portfolio)

Commit 1 at 2025-11-04 18:14:47

Commit 2 at 2025-11-04 18:14:47

Commit 1 at 2025-11-04 18:15:18

Commit 2 at 2025-11-04 18:15:19

Commit 3 at 2025-11-04 18:15:19

Commit 4 at 2025-11-04 18:15:19

Commit 5 at 2025-11-04 18:15:19

Commit 6 at 2025-11-04 18:15:19

Commit 7 at 2025-11-04 18:15:19

Commit 8 at 2025-11-04 18:15:19

Commit 9 at 2025-11-04 18:15:19

Commit 10 at 2025-11-04 18:15:19

Commit 11 at 2025-11-04 18:15:20

Commit 12 at 2025-11-04 18:15:20

Commit 13 at 2025-11-04 18:15:20

Commit 14 at 2025-11-04 18:15:20

Commit 15 at 2025-11-04 18:15:20

Commit 16 at 2025-11-04 18:15:20

Commit 17 at 2025-11-04 18:15:20

Commit 18 at 2025-11-04 18:15:20

Commit 19 at 2025-11-04 18:15:20

Commit 20 at 2025-11-04 18:15:21

Commit 21 at 2025-11-04 18:15:21

Commit 22 at 2025-11-04 18:15:21

Commit 23 at 2025-11-04 18:15:21

Commit 24 at 2025-11-04 18:15:21

Commit 25 at 2025-11-04 18:15:21

Commit 26 at 2025-11-04 18:15:21

Commit 27 at 2025-11-04 18:15:21

Commit 28 at 2025-11-04 18:15:21

Commit 29 at 2025-11-04 18:15:21

Commit 30 at 2025-11-04 18:15:22

Commit 31 at 2025-11-04 18:15:22

Commit 32 at 2025-11-04 18:15:22

Commit 33 at 2025-11-04 18:15:22

Commit 34 at 2025-11-04 18:15:22

Commit 35 at 2025-11-04 18:15:22

Commit 36 at 2025-11-04 18:15:22

Commit 37 at 2025-11-04 18:15:22

Commit 38 at 2025-11-04 18:15:22

Commit 39 at 2025-11-04 18:15:23

Commit 40 at 2025-11-04 18:15:23

Commit 1 at 2025-11-06 21:13:45

Commit 2 at 2025-11-06 21:13:46

Commit 3 at 2025-11-06 21:13:46

Commit 4 at 2025-11-06 21:13:46

Commit 5 at 2025-11-06 21:13:46

Commit 6 at 2025-11-06 21:13:46

Commit 7 at 2025-11-06 21:13:46

Commit 8 at 2025-11-06 21:13:46

Commit 9 at 2025-11-06 21:13:46

Commit 10 at 2025-11-06 21:13:47

Commit 11 at 2025-11-06 21:13:47

Commit 12 at 2025-11-06 21:13:47

Commit 13 at 2025-11-06 21:13:47

Commit 14 at 2025-11-06 21:13:47

Commit 15 at 2025-11-06 21:13:47

Commit 16 at 2025-11-06 21:13:47

Commit 17 at 2025-11-06 21:13:47

Commit 18 at 2025-11-06 21:13:47

Commit 19 at 2025-11-06 21:13:48

Commit 20 at 2025-11-06 21:13:48

Commit 21 at 2025-11-06 21:13:48

Commit 22 at 2025-11-06 21:13:48

Commit 23 at 2025-11-06 21:13:48

Commit 24 at 2025-11-06 21:13:48

Commit 25 at 2025-11-06 21:13:48

Commit 26 at 2025-11-06 21:13:48
