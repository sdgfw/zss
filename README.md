# ZSS - React Project

This is a React application built with Vite.

## Check Package.json
Verify that your `package.json` contains the necessary scripts and dependencies.
- `dev`: Starts the development server.
- `build`: Builds the application for production.
- `preview`: Previews the built application.

## Installation

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```

## Development

Start the development server:
```bash
npm run dev
```

## Build

Build the application for production:
```bash
npm run build
```

## Deployment

This project is configured with GitHub Actions for automated deployment.
On every push to the `main` branch, the `Build and Deploy` workflow will run.
Ensure you have set up the necessary secrets if deploying to a specific hosting service.
The current configuration assumes deployment to GitHub Pages via the `peaceiris/actions-gh-pages` action.
