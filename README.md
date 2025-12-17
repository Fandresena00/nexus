# **Nexus**

A modern and intuitive project management application designed for seamless collaboration, powerful task organization, and a delightful user experience.

Built with **Next.js**, **shadcn/ui**, **Tailwind CSS**, **Prisma**, and **Better Auth**.

---

## 🚀 Features

### 🔐 Email Authentication

Secure and modern email-based authentication powered by **Better Auth**.

### 📁 Project Management

- Create, update, and delete projects
- Clean and intuitive dashboard

### ✔️ Task Management

- Full CRUD operations on tasks
- Organized by project
- Status updates & seamless editing

### 🎨 Modern UI

- Polished interface built with **shadcn/ui**
- Fully responsive thanks to **Tailwind CSS**

### 🔒 Type Safety

- End-to-end reliability with **TypeScript** and **Prisma**

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/)
- **Authentication:** [Better Auth](https://www.better-auth.com/)
- **Database:** [PostgreSQL](https://www.postgresql.org/)
- **ORM:** [Prisma](https://www.prisma.io/)
- **UI:** [shadcn/ui](https://ui.shadcn.com/) (Radix UI-based components)
- **CSS:** [Tailwind CSS](https://tailwindcss.com/)

---

## 📦 Getting Started

### **Prerequisites**

- Node.js 18+
- PostgreSQL installed
- npm / yarn / pnpm / bun

---

## 🔧 Installation

### 1. Clone the repository

```bash
git clone https://github.com/Fandresena00/nexus.git
cd nexus
```

### 2. Install dependencies

```bash
npm install
# or yarn install / pnpm install / bun install
```

### 3. Configure environment variables

```bash
cp .env.example .env
```

Edit **.env** with your configuration:

```env
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
RESEND_API_KEY=re_api_key

# Email (for authentication)
GOOGLE_CLIENT_ID=google_client_id
GOOGLE_CLIENT_SECRET=google_client_secret
```

# Google cloud configuration

- Open Google **Cloud Console** → **APIs & Services** → **Credentials**
- Click Create **Credentials** → **OAuth client ID**
- Choose Web application
- Copy the **Client ID** and **Client Secret** into your environment variables

### 4. Set up the database

```bash
npx prisma generate
npx prisma db push
```

### 5. Start the development server

```bash
npm run dev
```

Then open:
👉 [http://localhost:3000](http://localhost:3000)

---

## 🗄️ Database Models

### **User**

- Email authentication
- Session management

### **Project**

- Belongs to a user
- Contains tasks

### **Task**

- Linked to a project
- CRUD + status updates

---

## 📁 Project Structure

```
nexus/
├── app/
│   ├── (auth)/            # Authentication routes
│   ├── (workspace)/       # Main workspace UI
│   ├── actions/           # Server actions (Prisma)
│   └── api/               # API routes
├── components/
│   ├── ui/                # shadcn/ui components
│   └── ...                # Custom components
├── lib/
│   ├── auth.ts            # Better Auth configuration
│   ├── prisma.ts          # Prisma client
│   └── ...
├── prisma/
│   └── schema.prisma      # Database schema
└── public/                # Static assets
```

---

## 📜 Scripts

| Command             | Description                  |
| ------------------- | ---------------------------- |
| `npm run dev`       | Start the development server |
| `npm run build`     | Build for production         |
| `npm run start`     | Run production server        |
| `npm run lint`      | Run ESLint                   |
| `npx prisma studio` | Visual database explorer     |

---

## 🔍 Features in Detail

### **Authentication**

- Magic link or password login
- Secure sessions
- Protected pages & API routes

### **Project Management**

- Create/edit/delete projects
- Dashboard with all user projects
- Cascading task deletion

### **Task Management**

- Create/edit/delete tasks
- Update task status
- Organized by project

---

## 🤝 Contributing

Contributions are welcome! Submit an Issue or open a Pull Request.

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👤 Author

**Anjara Fandresena**  
📧 **[anjarafandresena05@gmail.com](mailto:anjarafandresena05@gmail.com)**

---

## 🆘 Support

For inquiries or assistance, email:  
📧 **[anjarafandresena05@gmail.com](mailto:anjarafandresena05@gmail.com)**
