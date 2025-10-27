# 🚀 Orbit IDE

Orbit IDE is a full-stack, browser-based code editor designed to make coding accessible anywhere, instantly. It allows users to create, edit, and run code projects directly from the browser — without needing any local setup. The goal is to provide a smooth and efficient development experience with a modern UI and persistent project storage.

🔗 **Live Demo:** https://orbit-ide.vercel.app/  
📂 **Repository:** https://github.com/omeshwar08/orbit-ide

---

## 🌟 Features

✅ Create & manage multiple coding projects  
✅ Web-based code editor powered by Monaco  
✅ Real-time code execution  
✅ Persistent storage with database support  
✅ Clean and responsive developer-focused UI  
✅ Secure authentication & project ownership  
✅ Dark mode / modern styling  
✅ Built with scalable architecture

---

## 🛠️ Tech Stack

**Frontend**

- Next.js 14 (App Router), React, TypeScript
- Tailwind CSS + ShadCN UI
- Monaco Editor

**Backend**

- Node.js
- Prisma ORM
- PostgreSQL Database

**Authentication**

- NextAuth.js

**Deployment**

- Vercel

## 🔧 Installation & Setup

To run the project locally:

```bash
# Clone the repository
git clone https://github.com/omeshwar08/orbit-ide.git

# Navigate into the project
cd orbit-ide

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Add your DB credentials & auth configs inside .env

# Push Prisma schema to database
npx prisma db push

# Run the development server
npm run dev
```
