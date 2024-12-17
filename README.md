# Task Management System (IneoTms)

This project is a **Task Management System** built with **Angular**. It provides an interface to manage tasks efficiently and track their status. The system supports both **local development** and **production environments**, with separate API endpoints for each environment.
Demo here: https://simple-tms.netlify.app/home

---

## 🚀 **Getting Started**

To start the development server, use the following command:

```bash
npm run start
```

This command will start the Angular development server, and you can access the application in your browser at:

```
http://localhost:4200/
```

The application will automatically reload if you make any changes to the source files.

---

## 📡 **API Endpoints**

The application interacts with a backend to manage task data. The API endpoint changes based on the environment:

- **Local Development:**  
  The API for task management runs via **JSON Server** and is available at:

  ```
  http://localhost:3000/tasks
  ```

  This endpoint is used when running the app in a local development environment.

- **Production Environment:**  
  In production, the app points to a cloud-based API endpoint:
  ```
  https://67615aff6be7889dc360be2c.mockapi.io/api/tasks
  ```
  This endpoint is used when the app is built and deployed.

---

## 🛠️ **Build the Project**

To build the project for production, run:

```bash
ng build
```

The build artifacts will be stored in the `dist/` directory. The files in this directory are optimized and ready for production deployment.

---

## 📦 **Code Scaffolding**

To generate a new component, use the following command:

```bash
ng generate component component-name
```

You can also generate other elements like directives, pipes, services, guards, etc. Example:

```bash
ng generate directive|pipe|service|class|guard|interface|enum|module
```

This makes it easier to add new functionality to the application.

---

## 📚 **Further Help**

For more details on Angular commands and options, use:

```bash
ng help
```

Or visit the official [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) for comprehensive documentation.
