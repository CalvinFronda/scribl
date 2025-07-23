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
- **Deployment**: Netlify (frontend), Supabase (backend)

## Setup Instructions

### Prerequisites
- Node.js 18+ and npm
- A Supabase account ([sign up here](https://supabase.com))

### 1. Clone and Install Dependencies

```bash
# Clone the repository
git clone <your-repo-url>
cd skribl

# Install dependencies
npm install
```

### 2. Set Up Supabase

1. Create a new project in [Supabase Dashboard](https://app.supabase.com)
2. Go to Settings → API to get your project URL and anon key
3. Navigate to the SQL editor in your Supabase dashboard
4. Run the migration files in order:
   - `supabase/migrations/create_prompts_table.sql`
   - `supabase/migrations/create_responses_table.sql`

### 3. Environment Configuration

```bash
# Copy the environment template
cp .env.example .env

# Edit .env with your Supabase credentials
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Configure Supabase Authentication

In your Supabase dashboard:
1. Go to Authentication → Settings
2. Disable email confirmation (for development)
3. Set site URL to `http://localhost:5173` for local development

### 5. Run the Application

```bash
# Start the development server
npm run dev

# Open your browser to http://localhost:5173
```

## Database Schema

### Tables

#### `prompts`
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
- `created_at` (timestamp)
- `updated_at` (timestamp)

### Security (RLS Policies)

- **Prompts**: Public read access, authenticated insert
- **Responses**: Users can read/write own responses, public can read public responses
- Automatic user association through auth.uid()

## Project Structure

```
src/
├── components/
│   ├── auth/          # Authentication forms
│   ├── dashboard/     # User dashboard components
│   ├── layout/        # Header and layout components
│   ├── prompts/       # Prompt display components
│   ├── responses/     # Response forms and lists
│   └── ui/           # Reusable UI components
├── contexts/         # React contexts (Auth)
├── hooks/           # Custom React hooks
├── lib/            # Supabase client configuration
├── pages/          # Main page components
├── types/          # TypeScript type definitions
└── App.tsx         # Main application component
```

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

## Deployment

### Frontend (Netlify)
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables in Netlify dashboard

### Backend (Supabase)
- Already deployed when you create the Supabase project
- Database migrations run through the SQL editor
- Automatic scaling and backups included

## Development Guidelines

- Use TypeScript for all new components
- Follow the established file structure
- Implement proper error boundaries
- Add loading states for all async operations
- Ensure responsive design on all breakpoints
- Test authentication flows thoroughly

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test thoroughly
4. Submit a pull request with a clear description

## Support

For issues and questions:
1. Check the [Supabase documentation](https://supabase.com/docs)
2. Review the React and TypeScript documentation
3. Open an issue in this repository

## License

MIT License - see LICENSE file for details