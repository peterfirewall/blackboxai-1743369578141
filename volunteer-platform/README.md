# Volunteer Platform

A web application for connecting volunteers with community service opportunities.

## Features

- User registration and authentication (volunteers & organizations)
- Opportunity creation and management
- Responsive design with Tailwind CSS
- MySQL database backend
- EJS templating engine

## Prerequisites

- Node.js (v16+ recommended)
- MySQL server
- npm or yarn

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example`
4. Set up the database:
   ```bash
   mysql -u root -p < database.sql
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```
6. Access the application at `http://localhost:8000`

## Environment Variables

Create a `.env` file with the following variables:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=volunteer_platform
PORT=8000
SESSION_SECRET=yoursecretkey
```

## Available Scripts

- `npm start`: Start the production server
- `npm run dev`: Start the development server with nodemon
- `npm test`: Run tests (to be implemented)

## Project Structure

```
volunteer-platform/
├── server.js         # Main application entry point
├── database.js       # Database connection setup
├── routes/           # Route definitions
│   ├── auth.js       # Authentication routes
│   └── opportunities.js # Opportunity routes
├── views/            # EJS templates
├── public/           # Static assets
└── database.sql      # Database schema
```

## Screenshots

![Login Page](/screenshots/login.png)
![Opportunities Page](/screenshots/opportunities.png)

## License

MIT