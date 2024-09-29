# SvelteKit Frontend for Rust Backend

This is the frontend of a full-stack application built using **SvelteKit**. It communicates with a **Rust (Axum)** backend API to create a dynamic web experience. The project showcases how to build a modern, fast frontend with SvelteKit.

## Features

- **SvelteKit Framework**: A fast, reactive frontend framework.
- **Integration with Rust Backend**: Communicates with the Rust API for data fetching.
- **Environment Configuration**: Uses environment variables for API endpoint configuration.
- **Responsive Design**: Optimized for mobile and desktop views.

## Prerequisites

Make sure you have the following installed on your system:

- **Node.js** (v16 or higher): [Install Node.js](https://nodejs.org/)
- **npm** or **yarn**: JavaScript package managers.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/AarambhDevHub/sveltekit-frontend.git
    cd sveltekit-frontend
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file with the following content:
    ```bash
    VITE_BACKEND_URL=http://localhost:3000
    ```

    Replace `http://localhost:3000` with the URL of your Rust backend API if it's hosted elsewhere.

---

## Running the Development Server

To start the development server, run:

```bash
npm run dev
```

This will start the SvelteKit development server and the app will be accessible at http://localhost:5173.

## Building for Production

To create a production build, run:

```bash
npm run build
```

The production-ready files will be generated in the build/ folder. You can then serve them using any static hosting service.

## Deployment

To deploy the frontend, follow these steps depending on your platform:

-**Netlify or Vercel:** Push your code to a GitHub repository, then connect your repo to the hosting service. It will automatically handle the deployment.

-**Custom Hosting:** Build the frontend and upload the build/ folder to your server or preferred hosting service.

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Donations

If you find this project useful and would like to support its continued development, you can make a donation via [Buy Me a Coffee](https://buymeacoffee.com/aarambhdevhub).

Thank you for your support!