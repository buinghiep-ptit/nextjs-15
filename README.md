# My Next.js App

A modern, production-ready Next.js application with TypeScript, Tailwind CSS, internationalization, and SEO optimization.

## Features

- ⚡ **Next.js 15** with App Router (Next.js 15.3.4 với React 19.1.0)
- 🔷 **TypeScript** for type safety
- 🎨 **Tailwind CSS** for styling
- 🌍 **Internationalization** (English/Vietnamese) with next-intl
- 🔍 **SEO Optimized** with proper meta tags and sitemap
- 📱 **Responsive Design**
- 🎯 **Performance Optimized**
- 🛠️ **Developer Experience** with ESLint and proper project structure

## Project Structure

```
src/
├── app/                    # App Router directory
│   ├── [locale]/          # Internationalized routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── sitemap.ts         # Dynamic sitemap
│   └── robots.ts          # Robots.txt
├── components/            # Reusable components
│   ├── layout/           # Layout components
│   ├── ui/               # UI components
│   └── common/           # Common components
├── lib/                  # Utility functions
├── providers/
│   └── query-provider.tsx    # Query provider
├── hooks/                # Custom React hooks
├── types/                # TypeScript type definitions
├── constants/            # App constants
├── messages/             # Translation files
│   ├── en.json
│   └── vi.json
└── middleware.ts         # Next.js middleware
```

## 🌍 Đa ngôn ngữ

Dự án hỗ trợ đa ngôn ngữ với next-intl:

- **Tiếng Việt**: `/vi`
- **English**: `/en`

### Thêm ngôn ngữ mới:

1. Thêm locale vào `src/constants/site.ts`
2. Tạo file messages trong `messages/{locale}.json`
3. Cập nhật middleware nếu cần

## 🎨 UI Components

### Button

```tsx
import { Button } from '@/components/ui/button';

<Button variant="default" size="md">Click me</Button>
<Button variant="outline">Outline Button</Button>
<Button variant="destructive">Delete</Button>
```

### Card

```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>Card content goes here</CardContent>
</Card>;
```

### Modal

```tsx
import { Modal } from "@/components/ui/modal";

<Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Modal Title">
  Modal content
</Modal>;
```

## 🔧 Custom Hooks

### API Hooks

```tsx
import { useApi, useApiMutation } from "@/hooks/use-api";

// GET request
const { data, loading, error } = useApi(["users"], fetchUsers);

// POST/PUT/DELETE request
const createUser = useApiMutation(createUserAPI, {
  onSuccess: () => console.log("User created!"),
  invalidateQueries: [["users"]],
});
```

### Form Hooks

```tsx
import { useForm } from "@/hooks/use-form";

const form = useForm({
  initialValues: { email: "", password: "" },
  validate: (values) => {
    /* validation logic */
  },
  onSubmit: (values) => {
    /* submit logic */
  },
});
```

### Storage Hooks

```tsx
import { useLocalStorage } from "@/hooks/use-local-storage";

const [value, setValue, removeValue] = useLocalStorage("key", "default");
```

### Toast Notifications

```tsx
import { useToast } from "@/hooks/use-toast";

const { success, error, warning } = useToast();

success("Success!", "Operation completed successfully");
error("Error!", "Something went wrong");
```

## 📱 Responsive Design

```tsx
import {
  useIsMobile,
  useIsTablet,
  useIsDesktop,
} from "@/hooks/use-media-query";

const isMobile = useIsMobile();
const isTablet = useIsTablet();
const isDesktop = useIsDesktop();
```

````

## Getting Started

1. **Clone and install dependencies:**

```bash
git clone <your-repo>
cd my-nextjs-app
npm install
````

2. **Set up environment variables:**

```bash
cp .env.example .env.local
```

Edit `.env.local` with your values.

3. **Run the development server:**

```bash
npm run dev
```

4. **Build for production:**

```bash
npm run build
npm start
```

## Configuration

### Internationalization

The app supports English and Vietnamese by default. To add more languages:

1. Add locale to `src/constants/site.ts`
2. Create translation file in `src/messages/[locale].json`
3. Update middleware configuration

### SEO

SEO is configured with:

- Dynamic metadata generation
- Open Graph tags
- Twitter Card tags
- Structured data
- Sitemap generation
- Robots.txt

### Styling

Using Tailwind CSS with:

- Custom color palette
- Dark mode support
- Responsive utilities
- Custom animations

## Deployment

This app can be deployed to:

- **Vercel** (recommended)
- **Netlify**
- **AWS Amplify**
- **Docker**

For Vercel deployment:

```bash
npm install -g vercel
vercel
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript check

## License

MIT License - see LICENSE file for details.
