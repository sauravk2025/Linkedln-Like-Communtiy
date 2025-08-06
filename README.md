# Linked Community Platform

A modern, professional social networking platform built with React, TypeScript, and Supabase. Features user authentication, profile management, and a public post feed with a clean, LinkedIn-inspired design.

## 🚀 Features

- **User Authentication**: Secure email/password registration and login
- **User Profiles**: Comprehensive profiles with name, email, and bio
- **Post Feed**: Create and view text-based posts with timestamps
- **Profile Pages**: Individual user profiles showing their posts
- **Responsive Design**: Mobile-friendly interface that works on all devices
- **Real-time Updates**: Live post creation and display
- **Professional UI**: LinkedIn-inspired design with smooth animations

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth)
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Routing**: React Router DOM
- **Build Tool**: Vite

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/linkedin-community-platform.git
cd linkedin-community-platform
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Add your Supabase credentials to `.env`:
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

5. Set up the database:
   - Run the SQL migration in `supabase/migrations/create_profiles_and_posts.sql`
   - This creates the necessary tables and security policies

6. Start the development server:
```bash
npm run dev
```

## 🗄️ Database Schema

The application uses two main tables:

### Profiles
- `id` (UUID, Primary Key)
- `email` (Text, Unique)
- `full_name` (Text)
- `bio` (Text, Optional)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

### Posts
- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key to Profiles)
- `content` (Text)
- `created_at` (Timestamp)

## 🔐 Security

- Row Level Security (RLS) enabled on all tables
- Users can only modify their own profiles and posts
- Public read access for posts and profiles
- Secure authentication with Supabase Auth

## 🎨 Design Features

- Clean, professional LinkedIn-inspired interface
- Responsive design with mobile-first approach
- Smooth animations and hover effects
- Consistent color scheme and typography
- Card-based layout for posts and profiles
- Loading states and error handling

## 📱 Pages

- **Home**: Public feed showing all posts
- **Profile**: User profile with editable information and user's posts
- **Authentication**: Login/register forms with validation

## 🚀 Deployment

The application is deployed on Netlify. To deploy your own version:

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist` folder to your preferred hosting service

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request


## 🔗 Live Demo

https://shimmering-cajeta-29d8cd.netlify.app/

---

Built with BOLT AI
using React ,Supabase
