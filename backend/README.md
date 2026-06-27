# Backend

Backend server for realtime whiteboard collaboration.

## Features

* Socket.IO communication
* Room management
* User connection tracking
* Real-time whiteboard sync
* Chat system

## Run

```bash
npm install
npm run dev
```

## Folder Structure

```txt
Backend/
├── utils/
├── server.ts
└── package.json
```

## Main Events

* userJoined
* whiteboardData
* message
* disconnect
