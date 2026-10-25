# Project Agent Rules & Safety Guidelines

These specific rules govern autonomous agents working within this workspace:

## 1. Safe Code Modification Rules
- **Non-destructive Changes**: Always preserve existing business logic, validation rules, state management, and event handlers.
- **Trace Consumers**: Before modifying or removing an exported function or component, search all references with `grep_search` to verify impact across routes.
- **Maintain TypeScript Strictness**: Do not cast to `any` or suppress TypeScript errors with `@ts-ignore` unless interfacing with an untyped third-party library.

## 2. Component Reuse & Dependency Management
- **Use Existing Primitives**: Check `components/ui/` (Radix UI wrappers) and `components/core/` (Motion Primitives) before introducing new components.
- **Zero Heavy Dependencies**: Do not introduce new UI libraries (e.g. Ant Design, MUI, Chakra) or additional animation engines. Motion 14 and Tailwind CSS 4 cover all interface needs.
- **Preserve Package Manager**: Preserve `package.json` dependencies and lockfile consistency.

## 3. Functionality-Preserving UI Changes
- **Contact & Lead Forms**: Retain `saveInquiry` and WhatsApp submission logic.
- **Form States**: Always handle idle, loading (`isSubmitting`), success (`isSubmitted`), and error states gracefully.
- **Accessibility**: Ensure form fields have associated labels (`htmlFor` / `id`), touch targets are at least 44px on mobile, and interactive buttons have descriptive accessible names.

## 4. Animation & Performance Rules
- **Prefer Motion Primitives**: Utilize `<InView>`, `<AnimatedGroup>`, and CSS keyframes for animations.
- **Hardware Acceleration**: Animate `transform` (translate, scale) and `opacity` only. Avoid animating layout properties like `height`, `width`, or `margin` to prevent reflows.
- **Next.js Image Optimization**: Always provide explicit `width` and `height` (or `fill` with a relative parent) and descriptive `alt` text on `<Image />`. Use `priority` only for above-the-fold hero elements.

## 5. Validation & Regression Testing Protocol
- **Build Verification**: Run `npm run build` after any non-trivial change. The build must exit with code 0.
- **Route Integrity**: Verify static generation of all 33 routes.
- **Visual Check**: For layout or visual edits, inspect with the browser subagent across both desktop and mobile viewports.
