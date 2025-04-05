# Social Media Image Generator

An AI-powered SaaS application that helps users generate optimized images for various social media platforms using OpenAI's image generation capabilities.

## Features

- Upload images and generate variations optimized for different social media platforms
- Support for Facebook, Twitter, and Reddit image dimensions
- Optional caption generation
- Modern, responsive UI with drag-and-drop functionality
- Real-time image preview

## Tech Stack

- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- OpenAI API
- UploadThing for file uploads
- NextAuth.js for authentication

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory with the following variables:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   UPLOADTHING_SECRET=your_uploadthing_secret_here
   UPLOADTHING_APP_ID=your_uploadthing_app_id_here
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Upload an image by dragging and dropping or clicking the upload area
2. Select a target social media platform
3. Optionally add a caption
4. Click "Generate Image" to create an optimized version
5. Download or share the generated image

## Image Dimensions

- Facebook: 1200 x 630 pixels
- Twitter: 1200 x 675 pixels
- Reddit: 1200 x 628 pixels

## License

MIT
