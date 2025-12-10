# O‘ziBEK – Travel Guide

A comprehensive travel platform for tourists visiting Uzbekistan.

## Project Structure

- `server/`: Node.js + Express + Prisma backend
- `client/`: React + Vite + TailwindCSS frontend

## Prerequisites

- Node.js (v16+)
- npm

## Setup & Run

### 1. Backend (Server)

```bash
cd server
npm install
# Initialize Database (SQLite)
npx prisma generate
npx prisma db push
# Seed Data
npm run seed
# Start Server
npm start
```
Server runs on `http://localhost:5000`.

### 2. Frontend (Client)

Open a new terminal:

```bash
cd client
npm install
npm run dev
```
Client runs on `http://localhost:5173` (or similar).

## Features

- **Stays**: Browse hotels, hostels, guesthouses with filters.
- **Attractions**: Discover historical and cultural sites.
- **Map**: Interactive map of Uzbekistan with points of interest.
- **Authentication**: Register and Login (JWT).
- **Localization**: English, Russian, Uzbek support.
- **Booking**: Simulated booking flow.

## Tech Stack

- **Frontend**: React, TailwindCSS, React Router, i18next, Leaflet
- **Backend**: Express, Prisma, SQLite (Demo), JWT