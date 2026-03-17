# AGENTS.md - Agentic Coding Guidelines

Multi-step setup form wizard with cart functionality using vanilla JavaScript, jQuery, and ES6 modules.

## Technology Stack

- Vanilla JavaScript (ES6 modules)
- jQuery (DOM manipulation)
- jQuery Steps (form wizard plugin)
- SCSS for styling
- sessionStorage for data persistence

## Build / Development Commands

```bash
# Start development server (auto-refresh on file changes)
npx live-server

# Or using Python (alternative)
python -m http.server 8000
```

**Note:** This project has no package.json - no npm build scripts, linting, or test frameworks are configured.

## Testing

**No test framework is currently configured.** If adding tests later:

```bash
# Example with Jest
npm test                    # Run all tests
npm test -- --testNamePattern="validate"  # Run single test

# Example with Vitest
npx vitest run
npx vitest run validate
```

## Code Style Guidelines

### General Principles

- Use ES6+ features (const/let, arrow functions, template literals, destructuring)
- Keep functions small and focused (single responsibility)
- Use meaningful, descriptive names
- Add comments for complex logic (avoid obvious comments)

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Functions/variables | camelCase | `getCart()`, `cartItems` |
| Constants | UPPER_SNAKE_CASE | `CART_KEY`, `SERVICE_FEE` |
| Private functions | camelCase | `_buildCart()`, `getFieldValue()` |
| DOM elements | camelCase with $ prefix | `$el`, `$tbody` |
| File names | kebab-case | `cart-storage.js` |
| CSS classes | kebab-case | `.cart-error` |

### Import/Export

- Use ES6 module syntax exclusively
- Group imports: external libraries → internal modules → local utilities
- Export public APIs; keep implementation details private

### Formatting

- Use 2 spaces for indentation
- Use semicolons (despite ASI)
- Use single quotes for strings
- Maximum line length: ~100 characters
- Use ASCII dividers: `// ── Title ─────────────────`

### Functions

- Use arrow functions for callbacks; function declarations for top-level
- Use default parameters; destructure objects when appropriate

### Error Handling

- Use try/catch for JSON.parse and external data
- Use console.warn for recoverable errors
- Validate inputs at function boundaries

```javascript
try {
  return JSON.parse(stored);
} catch (e) {
  console.warn("Invalid cart data, resetting:", e);
  return buildInitialCart();
}

if (!rules || !msgs) {
  console.warn(`validate() — no rules for field: "${fieldId}"`);
  return true;
}
```

### jQuery Conventions

- Wrap DOM-ready code in `$(function () { ... })`
- Prefix jQuery objects with `$`
- Use event delegation for dynamic elements

### State Management

- Use sessionStorage for persistent state across steps
- Avoid global variables; use modules as namespaced containers

### Data Structures

- Use Object.freeze for constants/enums
- Use template literals for HTML generation

```javascript
const FieldState = Object.freeze({
  VALID: "valid",
  INVALID: "invalid",
  IDLE: "idle",
});
```

### Performance

- Use debounce for input handlers
- Cache jQuery selections
- Use event delegation for repeated elements

## File Organization

```
js/
├── index.js              # Main entry - imports all modules
├── components/           # UI component modules
├── modules/              # Utility modules
├── cart/                 # Cart-specific code
└── data/                 # Static product data
```

## Common Patterns

### Validating Form Fields
```javascript
const RULES = {
  fieldName: { required: true, minLength: 2, maxLength: 40, pattern: /^[a-zA-Z]+$/ },
};
```

### Cart State
```javascript
const cartItem = { id: product.id, qty: 0, unitPrice: product.price, totalPrice: 0 };
```

## Git Workflow

- Use conventional commits: `feat:`, `fix:`, `refactor:`, `chore:`
- Create feature branches: `feature/`, `fix/`, `refactor/`

## Pre-commit Checklist

- [ ] No console.log (use console.warn for warnings)
- [ ] No hardcoded credentials
- [ ] Code follows naming conventions
- [ ] Functions have single responsibility
- [ ] Error handling for sessionStorage, JSON.parse
