# ChatApp

A real-time chat application that allows users to communicate through text and multimedia messages. Designed to be simple, efficient, and user-friendly.

## Features

- Real-time messaging
- Group chats
- Multimedia sharing (images, videos)
- User authentication
- Responsive design

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, Redux, CSS |
| Backend | Node.js, Express |
| Database | MongoDB |
| Real-time | Socket.io |

## Prerequisites

- Node.js >= 14
- npm >= 6
- MongoDB (for local development)

## Setup & Installation

1. **Clone the repository**

   ```sh
   git clone https://github.com/SijanBhandari17/ChatApp.git
   cd ChatApp
   ```

2. **Install dependencies**

   ```sh
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the root directory:

   ```env
   MONGODB_URI=<your_mongo_db_connection_string>
   PORT=3000
   ```

4. **Start the application**

   ```sh
   npm start
   ```

## Project Structure

```
ChatApp/
├── client/         # Frontend code
├── server/         # Backend code
├── .env            # Environment variables
├── package.json    # npm dependencies
└── README.md       # Project documentation
```

## Scripts

| Command | Description |
|---|---|
| `npm start` | Start the development server |
| `npm test` | Run tests |
| `npm run build` | Build for production |


## Deployment

| Layer | Platform | Status |
|---|---|---|
| Frontend | Vercel | ✅ Live |
| Backend | Railway | ~~Free tier ($5 credit/month)~~ — Credit expired |
| Database | MongoDB Atlas | ✅ Live |
