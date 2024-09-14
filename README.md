# React Web app with Open AI

## Project dependencies

https://vitejs.dev/guide/

```bash
npm create vite@latest my-project -- --template react
```

```bash
cd my-project
```

```bash
npm install
```

```bash
npm run dev
```

-https://tailwindcss.com/docs/guides/vite

```bash
npm install -D tailwindcss postcss autoprefixer
```

```bash
npx tailwindcss init -p
```

Add the paths to all of your template files in your tailwind.config.js file.

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

Add the Tailwind directives to your CSS

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

```javascript
export default function App() {
  return <h1 className="text-3xl font-bold underline">Hello world!</h1>;
}
```

- https://www.npmjs.com/package/react-icons

```bash
npm i react-icons
```

- https://reactrouter.com/en/main/start/tutorial

```bash
npm install react-router-dom
```
