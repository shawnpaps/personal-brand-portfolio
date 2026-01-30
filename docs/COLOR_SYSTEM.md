# Color System Reference

## Overview

This document outlines the complete color system for the Shawn Paps Media portfolio. All colors are defined in `client/tailwind.config.mjs`.

## Brand Colors

### Rust Orange (Primary Accent)

The signature rust-orange color that defines the brand's bold, gritty aesthetic.

| Usage | Class | Hex | Notes |
|-------|-------|-----|-------|
| **Primary Brand** | `rust-orange` | `#d4512a` | Main call-to-action, highlights, active states |
| **Hover/Light** | `rust-light` | `#e86942` | Hover states, lighter accents |

**Rust Scale (Extended):**
- `rust-50` to `rust-900` - Full color scale available
- `rust-500` = `#ff6b35` (Alternative primary from scale)

**Examples:**
```html
<!-- Buttons -->
<button class="bg-rust-orange hover:bg-rust-light">Click Me</button>

<!-- Text -->
<h1 class="text-rust-orange">Headline</h1>

<!-- Borders -->
<div class="border-rust-orange border-2">Content</div>

<!-- Backgrounds with opacity -->
<div class="bg-rust-orange/10">Subtle background</div>
```

---

## Dark Backgrounds

Deep blacks that create the moody, premium feel.

| Name | Class | Hex | Usage |
|------|-------|-----|-------|
| **Deep Black** | `black-deep` | `#000000` | True black, overlays, deep backgrounds |
| **Soft Black** | `black-soft` | `#0a0a0a` | Primary background color |
| **Card Black** | `black-card` | `#0f0f0f` | Card backgrounds, elevated surfaces |
| **Elevated** | `black-elevated` | `#1a1a1a` | Hover states, raised elements |

**Examples:**
```html
<!-- Main page background -->
<body class="bg-black-soft">

<!-- Card component -->
<div class="bg-black-card hover:bg-black-elevated">

<!-- Overlay -->
<div class="absolute inset-0 bg-black-deep/60">
```

---

## Neutral Grays (Concrete)

Used for borders, subtle backgrounds, and secondary elements.

| Shade | Class | Hex | Usage |
|-------|-------|-----|-------|
| 50 | `concrete-50` | `#fafafa` | Lightest |
| 400 | `concrete-400` | `#a3a3a3` | Medium gray |
| 600 | `concrete-600` / `concrete-light` | `#525252` | Borders, dividers |
| 850 | `concrete-850` | `#1f1f1f` | Dark backgrounds |
| 950 | `concrete-950` | `#0a0a0a` | Darkest |

**Quick Alias:**
- `concrete-light` = `concrete-600` = `#525252`

**Examples:**
```html
<!-- Borders -->
<div class="border border-concrete-light">

<!-- Subtle background -->
<div class="bg-concrete-850">

<!-- Button (unselected state) -->
<button class="bg-concrete hover:bg-concrete-light">
```

---

## Text Colors (Steel)

Neutral grays specifically for text and readable content.

| Shade | Class | Hex | Usage |
|-------|-------|-----|-------|
| 100 | `steel-100` | `#f3f4f6` | Near white text |
| 200 | `steel-200` | `#e5e7eb` | Light text |
| 300 | `steel-300` | `#d1d5db` | Subtitle text |
| 400 | `steel-400` / `steel-light` | `#9ca3af` | Body text, descriptions |
| 500 | `steel-500` | `#6b7280` | Muted text |
| 800 | `steel-800` | `#1f2937` | Dark text on light backgrounds |

**Quick Alias:**
- `steel-light` = `steel-400` = `#9ca3af`

**Examples:**
```html
<!-- Body text -->
<p class="text-steel-light">Description text</p>

<!-- Muted text -->
<span class="text-steel-500">Less important info</span>

<!-- Light headings -->
<h2 class="text-steel-300">Subheading</h2>
```

---

## Common Patterns

### Hero Sections
```html
<section class="bg-black-deep">
  <h1 class="text-white">
  <p class="text-steel-light">
  <button class="bg-rust-orange hover:bg-rust-light text-white">
</section>
```

### Cards
```html
<div class="bg-black-card border border-concrete/20 hover:border-rust-orange/50">
  <h3 class="text-white">
  <p class="text-steel-light">
</div>
```

### Forms
```html
<input class="bg-black-soft border border-concrete focus:border-rust-orange text-white placeholder-steel-light">
```

### Buttons

**Primary:**
```html
<button class="bg-rust-orange hover:bg-rust-light text-white">
```

**Secondary:**
```html
<button class="bg-concrete hover:bg-concrete-light text-white">
```

**Ghost:**
```html
<button class="border border-rust-orange text-rust-orange hover:bg-rust-orange/10">
```

### Filters & Badges
```html
<!-- Active state -->
<button class="bg-gradient-to-r from-rust-orange to-rust-light text-white">

<!-- Inactive state -->
<button class="bg-concrete hover:bg-concrete-light text-white/90">

<!-- Badge -->
<span class="bg-rust-orange/20 text-rust-orange border border-rust-orange/30">
```

---

## Opacity Modifiers

All colors support Tailwind's opacity modifiers:

```html
<!-- 10% opacity -->
<div class="bg-rust-orange/10">

<!-- 50% opacity -->
<div class="bg-black-deep/50">

<!-- 80% opacity -->
<div class="text-steel-light/80">
```

---

## Gradients

### Rust Gradients
```html
<!-- Horizontal -->
<div class="bg-gradient-to-r from-rust-orange to-rust-light">

<!-- Vertical -->
<div class="bg-gradient-to-b from-rust-orange to-transparent">

<!-- Diagonal -->
<div class="bg-gradient-to-br from-rust-orange to-rust-light">
```

### Dark Gradients
```html
<!-- Overlay -->
<div class="bg-gradient-to-t from-black-deep/90 via-black-deep/20 to-transparent">
```

---

## Accessibility Notes

- Always ensure sufficient contrast between text and backgrounds
- White text on `rust-orange` = WCAG AA compliant
- `steel-light` on `black-soft` = WCAG AA compliant
- Test hover states for visibility

---

## Quick Reference Cheat Sheet

```
BRAND:         rust-orange, rust-light
BACKGROUNDS:   black-deep, black-soft, black-card
BORDERS:       concrete, concrete-light, concrete/20
TEXT:          text-white, text-steel-light
ACCENTS:       rust-orange/10, rust-orange/20
HOVER:         hover:bg-rust-light, hover:scale-105
```

---

**Last Updated:** January 2025