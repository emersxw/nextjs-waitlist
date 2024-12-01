# Inquitab Landing Page

Landing page for Inquitab, a Chrome extension that helps students get instant answers to online questions using artificial intelligence.

## 🚀 About The Project

Inquitab is a Chrome extension that:
- Automatically detects questions on web pages
- Provides instant answers using AI
- Automatically highlights the correct answer
- Offers detailed explanations for better understanding

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── waitlist/
│   │       └── route.ts      # Waitlist API endpoint
│   ├── fonts/
│   │   ├── GeistVF.woff     # Main font
│   │   └── GeistMonoVF.woff # Monospace font
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Main layout
│   ├── page.tsx             # Main page
│   └── favicon.ico          # Favicon
├── components/
│   ├── molecules/
│   │   ├── StatusMessage.tsx # Status message component
│   │   └── ...
│   └── organisms/
│       └── WaitlistForm.tsx  # Waitlist form component
├── types/
│   └── index.ts             # TypeScript type definitions
└── prisma/
    ├── schema.prisma        # Database schema
    └── migrations/          # Database migrations
```

## 🛠️ Technologies Used

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Prisma (ORM)
- PostgreSQL

## 🎨 Required Assets

### Images
Add the following images to the `public/images/` directory:
- `step1.png` - Screenshot showing automatic question detection
- `step2.png` - Screenshot showing the highlighted correct answer

### Video
Add the demo video at:
```
public/videos/demo.mp4
```
The video should showcase the extension in use, highlighting:
- Automatic question detection
- Analysis process
- Answer display
- Detailed explanation

## 🚦 Getting Started

1. Clone the repository:

```bash
git clone https://github.com/your-username/inquitab-landing
```

2. Install dependencies:

```bash
npm install
# or
bun install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

4. Set up the database:

```bash
npx prisma migrate dev
```

5. Start the development server:

```bash
npm run dev
# or
bun dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the result.

## 📝 Environment Variables

Create an `.env` file with the following variables:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/inquitab"
```

## 🔄 API Endpoints

### POST /api/waitlist
Endpoint to add users to the waitlist.

Payload:
```json
{
  "name": "string",
  "email": "string"
}
```

Success response:
```json
{
  "name": "string",
  "email": "string"
}
```

## 📱 Responsiveness

The landing page is fully responsive and optimized for:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🌙 Dark Mode

The project includes native dark mode support with automatic system preference detection.

## 📦 Build and Deploy

To create a production build:

```bash
npm run build
# or
bun run build
```

For deployment, we recommend using the [Vercel Platform](https://vercel.com).

## 🤝 Contributing

1. Fork the project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## 🔒 Beta Access

The extension is currently in closed beta. Early beta users will receive:
- Lifetime free access to the extension
- Priority support
- Input on new features

After the beta period, the extension will be priced at $10/month.
