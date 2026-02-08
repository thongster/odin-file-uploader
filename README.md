# Odin File Uploader

Odin File Uploader is a simple file storage app inspired by old-school desktop file explorers (Windows XP vibes). Users can sign up, create folders, upload files, download them later, and manage everything through a clean, desktop-style UI.

The main goal of this project was to learn how authentication, databases, and cloud file storage work together in a real application.

## Features

- User authentication (login required)
- Create, rename, and delete folders
- Upload files (max 1MB per file)
- Files can live in folders or the root
- Download files from anywhere
- Delete files
- Cloud-based file storage using Supabase (no local filesystem)

Folders are organizational only. Deleting a folder does **not** delete its files. Files fall back to the root.

## Tech Stack

- Node.js + Express
- EJS (server-side rendering)
- Prisma ORM
- PostgreSQL
- Supabase Storage
- Multer (in-memory uploads)
- Passport.js (authentication)
- Render (hosting)

## How It Works

- Files are uploaded to Supabase Storage
- Supabase returns a public URL
- File metadata and the URL are stored in Postgres via Prisma
- Downloads redirect directly to Supabase
- Deleting a file removes it from Supabase and the database
- The server never stores files on disk

## What I Learned

- The difference between cloud storage and databases
- Migrating from local uploads to cloud storage
- Handling deletes across storage and database
- Removing filesystem assumptions
- Working with Prisma relations and constraints

**Key takeaway:**
- File bytes → Supabase  
- File metadata → Postgres

## Notes

- File size limit: **1MB**
- Built for learning, not production
