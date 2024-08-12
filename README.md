# Pokegenesis

## Overview

NextJS Tanstack starter kit is a Next.js application designed to manage user data efficiently. It leverages modern web technologies, including React, TypeScript, and Tailwind CSS, to provide a responsive and user-friendly interface. The application supports user creation, updating, and deletion, along with a robust data fetching mechanism using React Query.

## Features

- **User Management**: Create, update, and delete user profiles.
- **Responsive Design**: Built with Tailwind CSS for a mobile-first approach.
- **Real-time Data Fetching**: Utilizes React Query for efficient data management and synchronization.
- **Form Validation**: Implements Formik and Yup for robust form handling and validation.
- **Dark Mode Support**: Automatically adjusts styles based on user preferences.

## Getting Started

To get started with the project, follow these steps:

### Prerequisites

Ensure you have the following installed:

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/chandansingh01/nextJs-admin-tanstack.git
   cd nextJs-admin-tanstack
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

### Running the Development Server

To start the development server, run:

```bash
npm run dev
# or
yarn dev
```

Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to see the application in action.

## Project Structure

The project is organized as follows:

```
src/
├── app/                  # Main application directory
│   ├── components/       # Reusable components
│   ├── api/              # API routes
│   ├── hooks/            # Custom hooks
│   ├── models/           # TypeScript models
│   ├── pages/            # Page components
│   ├── styles/           # Global styles
│   └── utils/            # Utility functions
├── public/               # Static assets
├── styles/               # Tailwind CSS configuration
└── types/                # TypeScript types
```

## Technologies Used

- **Next.js**: A React framework for server-side rendering and static site generation.
- **TypeScript**: A superset of JavaScript that adds static types.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **React Query**: A library for fetching, caching, and updating data in React applications.
- **Formik**: A library for building forms in React with ease.
- **Yup**: A JavaScript schema builder for value parsing and validation.
- **TanStack Table**: A library for building data tables in React with ease.
- **TanStack Query**: A library for managing data fetching and caching in React applications.


## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please open an issue or submit a pull request.

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.


