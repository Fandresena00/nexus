#

Nexus

A modern project management application built with cutting-edge technologies for seamless collaboration and task organization.

##

Features

- **
  Email Authentication
  **
  - Secure authentication powered by Better Auth
- **
  Project Management
  **
  - Create, update, and delete projects with ease
- **
  Task Organization
  **
  - Manage tasks within projects with full CRUD operations
- **
  Modern UI
  **
  - Beautiful, responsive interface built with shadcn/ui and Tailwind CSS
- **
  Type-Safe
  **
  - End-to-end type safety with TypeScript and Prisma

##

Tech Stack

- **
  Framework
  **
  :
  [
  Next.js 16
  ](https://nextjs.org/)
  - React framework for production
- **
  Authentication
  **
  :
  [
  Better Auth
  ](https://www.better-auth.com/)
  - Modern authentication solution
- **
  Database
  **
  :
  [
  PostgreSQL
  ](https://www.postgresql.org/)
  - Robust relational database
- **
  ORM
  **
  :
  [
  Prisma
  ](https://www.prisma.io/)
  - Next-generation ORM for Node.js and TypeScript
- **
  UI Components
  **
  :
  [
  shadcn/ui
  ](https://ui.shadcn.com/)
  - Re-usable components built with Radix UI
- **
  Styling
  **
  :
  [
  Tailwind CSS
  ](https://tailwindcss.com/)
  - Utility-first CSS framework

##

Getting Started

###

Prerequisites

- Node.js 18+
- PostgreSQL database
- npm, yarn, pnpm, or bun

###

Installation

1.  Clone the repository:

```
bash

git
 clone
cd
 nexus

```

2.  Install dependencies:

```
bash

npm

install

# or

yarn

install

# or

pnpm

install

# or

bun
install

```

3.  Set up environment variables:

```
bash

cp
 .env.example .env

```

Edit
`.env`
and add your configuration:

```
env

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/nexus"
# Better Auth
BETTER_AUTH_SECRET="your-secret-key"
BETTER_AUTH_URL="http://localhost:3000"
# Email (for authentication)
EMAIL_SERVER_HOST="smtp.example.com"
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER="your-email@example.com"
EMAIL_SERVER_PASSWORD="your-password"
EMAIL_FROM="noreply@nexus.app"

```

4.  Set up the database:

```
bash

npx prisma generate
npx prisma db push

```

5.  Run the development server:

```
bash

npm
 run dev
# or

yarn
 dev
# or

pnpm
 dev
# or

bun dev

```

6.  Open
    [
    http://localhost:3000
    ](http://localhost:3000)
    in your browser.

##

Database Schema

## The application uses the following main models:

**
User
**

- User accounts with email authentication
- **
  Project
  **
  - Projects that contain tasks
- **
  Task
  **
  - Individual tasks within projects

##

Project Structure

```

nexus/
├── app/                # Next.js app directory
│   ├── (auth)/        # Authentication routes
│   ├── (workspace)/   # Main application routes
│   ├── actions        # prisma request actions
│   └── api/           # API routes
├── components/        # React components
│   ├── ui/           # shadcn/ui components
│   └── ...           # Custom components
├── lib/              # Utility functions and configurations
│   ├── auth.ts       # Better Auth configuration
│   ├── prisma.ts        # Prisma client
│   └── ...
├── prisma/           # Database schema and migrations
│   └── schema.prisma
└── public/           # Static assets

```

##

Available Scripts

-

`npm run dev`

- Start development server
-

`npm run build`

- Build for production
-

`npm run start`

- Start production server
-

`npm run lint`

- Run ESLint
-

`npx prisma studio`

- Open Prisma Studio to view/edit database

##

Features in Detail

###

Authentication

- Email-based authentication with magic links or password
- Secure session management
- Protected routes and API endpoints

###

Project Management

- Create new projects with descriptions
- Update project details
- Delete projects (with cascading task deletion)
- View all projects in dashboard

###

Task Management

- Create tasks within projects
- Update task status and details
- Delete individual tasks
- Organize tasks by project

##

Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

##

License

This project is licensed under the MIT License.

##

Author

**
Anjara Fandresena
**

- Email: anjarafandresena05@gmail.com

##

Support

## For support or inquiries, please contact anjarafandresena05@gmail.com or open an issue in the repository.
