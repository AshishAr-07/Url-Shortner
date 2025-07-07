# URL Shortener

A modern, fast URL shortener built with Next.js that transforms long URLs into short, shareable links.

## Features

- **Clean Interface**: Simple and intuitive design for easy URL shortening
- **Instant Generation**: Quick URL shortening with real-time feedback
- **Copy to Clipboard**: One-click copying of shortened URLs
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Database Storage**: Persistent storage of URLs and visit history

## Tech Stack

- **Frontend**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Database**: MongoDB with Mongoose
- **URL Generation**: ShortID for unique short URLs

## Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB database
- npm/yarn/pnpm/bun

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd url-shortner
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory and add your MongoDB connection string:
```env
MONGODB_URI=your_mongodb_connection_string
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

```
url-shortner/
├── app/
│   ├── api/
│   │   └── generate/
│   │       └── route.js      # API endpoint for URL generation
│   ├── globals.css           # Global styles
│   ├── layout.js            # Root layout component
│   └── page.js              # Main page component
├── lib/
│   └── db.js                # Database connection
├── model/
│   └── Url.js               # URL data model
└── public/                  # Static assets
```


## Usage

1. Enter a long URL in the input field
2. Click "Generate Short URL"
3. Copy the generated short URL using the copy button
4. Share your shortened URL!

## Development

The project uses Next.js App Router with the following key files:

- [`app/page.js`](app/page.js) - Main page component with URL shortening form
- [`app/api/generate/route.js`](app/api/generate/route.js) - API route for generating short URLs
- [`lib/db.js`](lib/db.js) - Database connection utility
- [`model/Url.js`](model/Url.js) - MongoDB schema for URL data

## Deployment

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

1. Push your code to a Git repository
2. Connect your repository to Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy!


## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

