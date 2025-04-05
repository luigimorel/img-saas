# ImageSaaS - Social Media Image Generator 🚀

<div align="center">
  <img src="public/hero.png" alt="ImageSaaS Hero" width="600"/>
  
  [![Next.js](https://img.shields.io/badge/Next.js-13-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
  [![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)](https://reactjs.org)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
  [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org)
  [![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io)
</div>

A powerful Next.js application that enables users to generate optimized images for various social media platforms. Built with modern technologies and best practices.

## ✨ Features

- 🖼️ Upload and optimize images for different social media platforms
- 🔐 Multiple authentication methods (Email, Google, Apple, Microsoft)
- 📱 Responsive design for all device sizes
- 🎨 Modern UI with Tailwind CSS
- 🤖 AI-powered image generation

## 📸 Screenshots

<div align="center">
  <img src="public/hero.png" alt="Homepage Screenshot" width="600"/>
  <p><em>AI-powered image generation interface with neural network visualization</em></p>
</div>

## 🛠️ Tech Stack

- **Frontend**
  - Next.js 13
  - React 18
  - Tailwind CSS
- **Authentication**
  - NextAuth.js
- **Database**
  - PostgreSQL
  - Prisma ORM
- **Image Processing**
  - Custom API endpoints
- **AI Integration**
  - OpenAI API

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- OAuth credentials (optional)
  - Google
  - Apple
  - Microsoft
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/luigimorel/img-saas.git
   cd imgsaas
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the database**
   ```bash
   npx prisma migrate dev
   ```

4. **Configure environment variables**
   ```bash
   cp .env.local.example .env.local
   ```

5. **Update `.env.local` with your credentials**
   - Generate NEXTAUTH_SECRET: `openssl rand -base64 32`
   - Configure database URL
   - Add OAuth credentials
   - Set OpenAI API key

6. **Start the development server**
   ```bash
   npm run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) in your browser

## ⚙️ Environment Variables

```bash
# NextAuth.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret # Generate with: openssl rand -base64 32

# Database
DATABASE_URL="postgresql://username:password@localhost:5432/imgsaas?schema=public"

# OAuth Credentials
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
APPLE_ID=your-apple-id
APPLE_SECRET=your-apple-secret
AZURE_AD_CLIENT_ID=your-azure-ad-client-id
AZURE_AD_CLIENT_SECRET=your-azure-ad-client-secret
AZURE_AD_TENANT_ID=your-azure-ad-tenant-id
```

## 🔐 Authentication Methods

- 📧 **Email/Password**: Traditional sign-up and sign-in
- 🔑 **Google OAuth**: Sign in with Google
- 🍎 **Apple OAuth**: Sign in with Apple
- 💼 **Microsoft OAuth**: Sign in with Microsoft

## 🚀 Deployment

The application can be deployed to Vercel with minimal configuration:

1. Push your code to GitHub
2. Import the repository to Vercel
3. Set up the environment variables
4. Deploy

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p>Made with ❤️ by Luigi Morel</p>
</div>
