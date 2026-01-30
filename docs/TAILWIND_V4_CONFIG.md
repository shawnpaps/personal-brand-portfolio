# Tailwind CSS v4 Configuration Guide

## Important: You're Using Tailwind CSS v4! 🎨

This project uses **Tailwind CSS v4**, which has a **completely different configuration system** than v3.

### Key Differences

| Tailwind v3 | Tailwind v4 |
|-------------|-------------|
| `tailwind.config.js` | `@theme` in CSS files |
| JavaScript configuration | CSS custom properties |
| `extend.colors` object | `--color-*` variables |

## ⚠️ Critical Information

**The `tailwind.config.mjs` file is IGNORED in Tailwind v4!**

All theme customization must be done in CSS files using the `@theme` directive.

## How to Add Custom Colors

### ✅ Correct Way (Tailwind v4)

Edit `client/src/styles/global.css`:

```css
@theme {
  --color-rust-orange: #d4512a;
  --color-rust-light: #e86942;
  --color-black-deep: #000000;
  --color-black-soft: #0a0a0a;
}
```

Then use in HTML:
```html
<button class="bg-rust-orange hover:bg-rust-light">
```

### ❌ Wrong Way (This doesn't work!)

```js
// tailwind.config.mjs - THIS IS IGNORED IN V4!
export default {
  theme: {
    extend: {
      colors: {
        'rust-orange': '#d4512a', // ❌ Won't work!
      }
    }
  }
}
```

## Current Color System

All colors are defined in `client/src/styles/global.css`:

### Brand Colors
```css
--color-rust-orange: #d4512a;  /* Primary CTA, highlights */
--color-rust-light: #e86942;   /* Hover states */
```

Usage:
```html
<button class="bg-rust-orange hover:bg-rust-light">
<span class="text-rust-orange">
<div class="border-rust-orange">
```

### Backgrounds
```css
--color-black-deep: #000000;      /* True black */
--color-black-soft: #0a0a0a;      /* Main background */
--color-black-card: #0f0f0f;      /* Card backgrounds */
--color-black-elevated: #1a1a1a;  /* Elevated surfaces */
```

Usage:
```html
<body class="bg-black-soft">
<div class="bg-black-card">
```

### Text Colors
```css
--color-steel-light: #9ca3af;  /* Body text */
--color-steel-300: #d1d5db;    /* Lighter text */
--color-steel-400: #9ca3af;    /* Muted text */
```

Usage:
```html
<p class="text-steel-light">
<span class="text-steel-300">
```

### Neutral Colors
```css
--color-concrete: #525252;        /* Borders, dividers */
--color-concrete-light: #525252;  /* Light borders */
```

Usage:
```html
<div class="border-concrete">
<button class="bg-concrete hover:bg-concrete-light">
```

## Adding New Colors

1. **Open** `client/src/styles/global.css`

2. **Add to `@theme` block:**
```css
@theme {
  --color-your-color-name: #hexvalue;
}
```

3. **Also add to `:root` for CSS variable access:**
```css
:root {
  --color-your-color-name: #hexvalue;
}
```

4. **Use in HTML:**
```html
<div class="bg-your-color-name">
```

5. **Restart dev server** to see changes:
```bash
npm run dev
```

## Common Issues

### Colors not working?

1. ✅ Check `global.css`, NOT `tailwind.config.mjs`
2. ✅ Make sure color is in both `:root` AND `@theme`
3. ✅ Restart dev server after changes
4. ✅ Clear browser cache (Cmd+Shift+R / Ctrl+Shift+R)
5. ✅ Check for typos in color names (use kebab-case)

### Color format

```css
/* ✅ Correct */
--color-rust-orange: #d4512a;

/* ❌ Wrong */
--rust-orange: #d4512a;  /* Missing 'color-' prefix */
```

## Complete Example

### 1. Add color to `global.css`:

```css
:root {
  --color-neon-green: #00ff88;
}

@theme {
  --color-neon-green: #00ff88;
}
```

### 2. Use in your components:

```html
<button class="bg-neon-green hover:bg-neon-green/80 text-black">
  Neon Button
</button>
```

### 3. Restart server:

```bash
npm run dev
```

## Color Naming Convention

Use this format for consistency:

```
--color-{name}-{variant}
```

Examples:
- `--color-rust-orange`
- `--color-rust-light`
- `--color-blue-500`
- `--color-emerald-bright`

## Opacity Modifiers

All colors support opacity modifiers automatically:

```html
<!-- 10% opacity -->
<div class="bg-rust-orange/10">

<!-- 50% opacity -->
<div class="bg-rust-orange/50">

<!-- 90% opacity -->
<div class="text-steel-light/90">
```

## Resources

- [Tailwind v4 Documentation](https://tailwindcss.com/docs/v4-beta)
- [Theme Configuration](https://tailwindcss.com/docs/v4-beta#theme-configuration)
- [CSS Theme Variables](https://tailwindcss.com/docs/v4-beta#css-theme-variables)

## Migration Notes

If you see old v3 config patterns in the codebase, they need to be migrated to CSS:

```js
// OLD (v3) - Delete this
colors: {
  'custom': '#ff0000'
}
```

```css
/* NEW (v4) - Use this */
@theme {
  --color-custom: #ff0000;
}
```

---

**Remember:** In Tailwind v4, the CSS file is the source of truth for theme configuration!

**Last Updated:** January 2025