# Contest Manager

A full-stack web application for managing coding contest participation across multiple platforms. Built with React frontend and Node.js/Express backend with MongoDB database.

## Features

### Contest Management
- Add, edit, and delete coding contests
- Support for multiple platforms (LeetCode, Codeforces, AtCoder, HackerRank, CodeChef, TopCoder)
- Mark contests as completed with questions solved count
- Visual status indicators based on contest proximity

### Data Persistence
- MongoDB database for reliable data storage
- RESTful API for all CRUD operations
- Data import/export functionality
- Automatic data synchronization

### Performance Analytics
- Track questions solved per contest
- Visual performance graphs and statistics
- Contest completion progress tracking
- Platform-specific performance metrics

### User Interface
- Responsive design for desktop and mobile
- Modern glassmorphism UI design
- Real-time search and filtering
- Intuitive navigation and user experience

## Technology Stack

### Frontend
- **React 18.3.1** - UI framework
- **Vite 7.1.5** - Build tool and development server
- **React Router DOM 7.9.1** - Client-side routing
- **Lucide React** - Icon library
- **Recharts** - Data visualization
- **Custom CSS** - Styling with modern design patterns

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Database
- **MongoDB** - NoSQL database
- **Mongoose ODM** - Object document mapping

## Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create a `.env` file in the server directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/contest-tracker
NODE_ENV=development
```

4. Start the backend server:
```bash
npm run dev
```

The backend will be available at `http://localhost:5000`

### Frontend Setup

1. Navigate to the project root directory:
```bash
cd ..
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## API Endpoints

### Contest Management
- `GET /api/contests` - Retrieve all contests
- `GET /api/contests/upcoming` - Retrieve upcoming contests
- `GET /api/contests/past` - Retrieve completed contests
- `GET /api/contests/:id` - Retrieve specific contest
- `POST /api/contests` - Create new contest
- `PUT /api/contests/:id` - Update contest
- `PUT /api/contests/:id/mark-done` - Mark contest as completed
- `DELETE /api/contests/:id` - Delete contest

### Statistics
- `GET /api/contests/stats/summary` - Retrieve contest statistics

### Health Check
- `GET /api/health` - Server health status

## Database Schema

### Contest Model
```javascript
{
  name: String (required),
  platform: String (enum: ['LeetCode', 'Codeforces', 'AtCoder', 'HackerRank', 'CodeChef', 'TopCoder']),
  date: Date (required),
  time: String (required),
  link: String (required, URL validation),
  done: Boolean (default: false),
  questionsSolved: Number (min: 0),
  completedDate: Date,
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

## Project Structure

```
ContestManager/
├── src/
│   ├── components/
│   │   ├── AddContestModal.jsx
│   │   ├── ContestTable.jsx
│   │   ├── EditContestModal.jsx
│   │   ├── MarkDoneModal.jsx
│   │   ├── Navigation.jsx
│   │   └── PerformanceGraphs.jsx
│   ├── pages/
│   │   ├── PastContests.jsx
│   │   └── UpcomingContests.jsx
│   ├── services/
│   │   └── api.js
│   ├── styles/
│   │   └── App.css
│   ├── App.jsx
│   └── main.jsx
├── server/
│   ├── config/
│   │   └── database.js
│   ├── models/
│   │   └── Contest.js
│   ├── routes/
│   │   └── contests.js
│   ├── package.json
│   └── server.js
├── package.json
├── vite.config.js
└── README.md
```

## Usage

### Adding Contests
1. Click the "Add Contest" button on the Upcoming Contests page
2. Fill in contest details (name, platform, date, time, link)
3. Submit to save to database

### Managing Contests
- **Edit**: Click the edit icon on any contest card
- **Delete**: Click the delete icon to remove a contest
- **Mark Complete**: Click the checkmark icon and enter questions solved

### Viewing Performance
- Navigate to "Past Contests" to view completed contests
- View performance graphs showing questions solved over time
- Check statistics summary for overall performance metrics

### Data Management
- **Export**: Download contest data as JSON file
- **Import**: Upload JSON file to restore or merge contest data

## Development

### Available Scripts

#### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

#### Backend
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

### Code Style
- ESLint configuration for consistent code formatting
- React best practices and hooks usage
- Component-based architecture
- Separation of concerns between frontend and backend

## Deployment

### Local Network Access
To access the application from other devices on your local network:

1. Update `vite.config.js` to bind to all interfaces:
```javascript
server: {
  host: '0.0.0.0',
  port: 5173,
}
```

2. Update `server.js` to listen on all interfaces:
```javascript
app.listen(PORT, '0.0.0.0', () => {
  // Server configuration
});
```

3. Access via your local IP address: `http://YOUR_IP:5173`

### Production Deployment
For production deployment, consider:
- Environment variable configuration
- Database connection security
- CORS policy restrictions
- Error handling and logging
- Performance optimization

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues and questions:
1. Check the console for error messages
2. Verify MongoDB connection
3. Ensure all dependencies are installed
4. Check network connectivity for local access

## Future Enhancements

- User authentication and multi-user support
- Contest notifications and reminders
- Advanced analytics and reporting
- Mobile app development
- Integration with contest platform APIs
- Social features and contest sharing

## Author
- [Sudhanshu Shukla](https://sudhanshu-shukl.github.io/portfolio)

Commit 1 at 2025-09-19 00:50:39

Commit 2 at 2025-09-19 00:50:39

Commit 3 at 2025-09-19 00:50:40

Commit 4 at 2025-09-19 00:50:40

Commit 5 at 2025-09-19 00:50:40

Commit 6 at 2025-09-19 00:50:41

Commit 7 at 2025-09-19 00:50:41

Commit 1 at 2025-09-20 01:00:55

Commit 2 at 2025-09-20 01:00:55

Commit 3 at 2025-09-20 01:00:55

Commit 4 at 2025-09-20 01:00:55

Commit 5 at 2025-09-20 01:00:55

Commit 6 at 2025-09-20 01:00:55

Commit 7 at 2025-09-20 01:00:56
