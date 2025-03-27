# 📝 TEKANDME - Test Technique (Todo App)

This is a fullstack Todo List application built for the technical assessment at **TEKANDME**.  
It includes task creation, editing, filtering, calendar integration, authentication, and a responsive UI.

---

## 🚀 Tech Stack

- **Frontend:** Next.js  + TypeScript + Zustand + Bootstrap + TailwindCSS  
- **Backend:** Node.js + Express + MongoDB + JWT Authentication  
- **State Management:** Zustand  
- **Calendar & Styling:** Tailwind + Bootstrap  
- **UI Inspired By:** [Figma Design](https://www.figma.com/file/sPNKk3izFkH45KiUzBSsVW/Test-Todo-List)

---

## 🧠 Features

✅ User registration & login  
✅ Token-based authentication with protected routes  
✅ Create, update, delete, and mark tasks as complete  
✅ Task filtering (search, category, priority)  
✅ Visual calendar view with task counts  
✅ Task detail modal  
✅ Fully responsive layout  
✅ Great code structure and best practices followed  

---

## 🔧 Setup Instructions

### 📦 1. Clone the repo

```bash
git clone https://github.com/declared-as-ala/TEKANDME_Test-Missaoui-Ala.git
cd TEKANDME_Test-Missaoui-Ala
```

### 🖥 2. Install frontend dependencies

```bash
cd frontend
npm install
```

### 🔐 3. Install backend dependencies

```bash
cd ../server
npm install
```

### ⚙️ 4. Create `.env` file in `/server` and add the following:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/todoapp
JWT_SECRET=mySuperSecretJWTKey
```

---

## ▶️ Running the Project

### Start backend

```bash
cd server
npm run dev
```

### Start frontend

```bash
cd frontend
npm run dev
```

Then open 👉 [http://localhost:3000](http://localhost:3000)

---

## 📁 Folder Structure

```bash
.
├── frontend/         # Next.js app
│   ├── app/
│   ├── components/
│   ├── store/
│   └── ...
├── server/           # Node.js backend
│   ├── routes/
│   ├── models/
│   └── controllers/
```

---

## 🙌 Author

**Ala Missaoui**  
📧 alamissaoui.dev@gmail.com  
🌐 [https://alamissaoui.me](https://alamissaoui.me)  
🔗 [LinkedIn](https://www.linkedin.com/in/your-profile)
