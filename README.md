# ImageSaaS - Social Media Image Generator

A Next.js application that allows users to generate optimized images for various social media platforms.

## Features

- Upload images and generate optimized versions for different social media platforms
- Authentication with email/password, Google, Apple, and Microsoft
- Responsive design for all device sizes
- Modern UI with Tailwind CSS

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Authentication**: NextAuth.js
- **Database**: PostgreSQL with Prisma ORM
- **Image Processing**: Custom API endpoints

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- OAuth credentials for Google, Apple, and Microsoft (optional)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/imgsaas.git
   cd imgsaas
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the database:
   ```bash
   npx prisma migrate dev
   ```

4. Create a `.env.local` file based on `.env.local.example`:
   ```bash
   cp .env.local.example .env.local
   ```

5. Update the `.env.local` file with your credentials:
   - Generate a NEXTAUTH_SECRET: `openssl rand -base64 32`
   - Set up your database URL
   - Add your OAuth credentials (if using social login)

6. Run the development server:
   ```bash
   npm run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Authentication

The application supports multiple authentication methods:

- **Email/Password**: Traditional sign-up and sign-in
- **Google OAuth**: Sign in with Google
- **Apple OAuth**: Sign in with Apple
- **Microsoft OAuth**: Sign in with Microsoft

## Deployment

The application can be deployed to Vercel with minimal configuration:

1. Push your code to GitHub
2. Import the repository to Vercel
3. Set up the environment variables
4. Deploy

## License

This project is licensed under the MIT License - see the LICENSE file for details.
