# Skribl - Daily Writing Prompts App

A beautiful, full-featured writing prompt application built with React, TypeScript, Supabase, and shadcn/ui. Users can respond to daily writing prompts, view community submissions, and track their writing progress.

## Features

### 🔐 Authentication

- User registration and login with Supabase Auth
- Secure user sessions with automatic token refresh
- Clean error handling for authentication flows

### ✍️ Daily Prompts

- Automatic daily prompt rotation (updates at 12:00 AM UTC)
- Rich prompt database with engaging writing challenges
- Clean, card-based prompt display

### 📝 Response System

- Submit written responses to daily prompts
- One response per user per day with editing capabilities
- Public/private response options
- Real-time response submission and updates

### 🌟 Public Features

- Landing page displaying current prompt
- Anonymous community response feed
- Responsive design for all devices

### 📊 User Dashboard

- Personal writing statistics and streak tracking
- Complete response history with search and filtering
- Edit previous responses (within time limits)
- Visual progress indicators

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with shadcn/ui components
- **Backend**: Supabase (Auth + Database + Real-time)
- **Icons**: Lucide React
- **Deployment**: Next.js (frontend), Supabase (backend)

## Database Schema

### Tables

#### `prompt`

- `id` (uuid, primary key)
- `prompt_text` (text) - The writing prompt content
- `date` (date) - Date this prompt is active
- `created_at` (timestamp)
- `is_active` (boolean) - Whether this prompt is currently active

#### `responses`

- `id` (uuid, primary key)
- `user_id` (uuid, foreign key) - Reference to auth.users
- `prompt_id` (uuid, foreign key) - Reference to prompts table
- `response_text` (text) - User's written response
- `is_public` (boolean) - Whether response appears in public feed
- `start_time` (timestamp) - When the user started typing the response
- `end_time` (timestamp) - Submit time
- `word_count` (int4) - Number of words in response
- `created_at` (timestamp)
- `updated_at` (timestamp)

#### `prompt_categories`

- `id` (uuid, primary key)
- `prompt_id` (uuid) - FK to prompt table
- `category_id` (int8) FK to category table
- `create_at` (timestamp)

#### `category`

- `id` (uuid, primary key)
- `name` (string) - name of category
- `description` (string) - description
- `color` (string) - background color of chip
- `updated_at` (timestamp)
- `created_at`(timestamp)

## Key Features Implementation

### Daily Prompt Rotation

- Database stores prompts with specific dates
- Frontend queries for today's prompt using current date
- Automatic switching at midnight UTC

### User Statistics

- Real-time calculation of writing streaks
- Total submission counts
- Join date and progress tracking

### Response Management

- One response per user per prompt (database constraint)
- Edit capability with updated timestamps
- Public/private visibility controls

### Security

- Row Level Security (RLS) on all tables
- User isolation through auth.uid()
- Input validation and sanitization
