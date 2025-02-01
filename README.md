# Car Models Filter App (Next.js)

This is a **Next.js** application that allows users to filter car models based on vehicle make and model year. It fetches data from the **VPIC API** and presents it in a user-friendly interface with pagination.

## Features

✅ Fetch vehicle makes & models dynamically  
✅ Responsive design using **Tailwind CSS**  
✅ Environment variables for API configuration  
✅ **Pagination** for a better browsing experience  
✅ **Reusable components** (`Navbar`, `ModelsFetcher`, `MalesFetcher`.)  
✅ **Next.js Suspense for smooth data fetching**  
✅ **Error handling & retry mechanism**
✅ **Optimized with Static Site Generation (SSG) using `generateStaticParams()`**

---

## Installation & Setup

### **1️⃣ Clone the Repository**

```sh
git clone https://github.com/your-repo/your-project.git
cd your-project
```

## Install Dependencies

```sh
npm install
```

## Configure Environment Variables

Create a .env.local file in the root directory and add the following

```sh
NEXT_PUBLIC_API_BASE_URL=https://vpic.nhtsa.dot.gov/api/vehicles
```

## Running & Building the Application

```sh
npm run dev
```

## Build for Production

```sh
npm run build
```

## Architecture Overview

### Folder Structure

```sh
/project
  ├── src/app               # Next.js App Router
  │   ├── /components       # Reusable UI components (Navbar, ModelsFetcher, MakesFetcher)
  │   ├── /page.tsx       # Home Page (Make & Year Selection)
  │   ├── /results/       # Results Page (Filtered Car Models)
  ├── /public            # Static assets (icons, images)
  ├── .env.local         # Environment variables
```

## Next.js (React Framework)

Tailwind CSS (Styling)
TypeScript (Static typing)
VPIC API (Vehicle Data)
React Suspense (Efficient Data Fetching)
Next.js App Router (Server-side rendering)

👤 Pedro Furquim - Developer
🔗 GitHub: [github.com/devpedrofurquim](https://github.com/devpedrofurquim)
