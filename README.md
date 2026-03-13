# Playwright Test Portfolio

End-to-end and API test suite built with Playwright and JavaScript.

## Tech Stack
- **Framework:** Playwright
- **Language:** JavaScript (ESM)
- **Pattern:** Page Object Model (POM)
- **Test targets:**
  - UI: [SauceDemo](https://www.saucedemo.com)
  - API: [Reqres.in](https://reqres.in)

## Test Coverage

### UI / E2E
| Suite    | Scenarios |
|----------|-----------|
| Login    | Valid login, locked user, empty fields |
| Cart     | Add item, multiple items, sorting |
| Checkout | Full happy path, missing info validation |

### API
| Endpoint       | Methods tested |
|----------------|---------------|
| /api/users     | GET (list), GET (single), GET (404) |
| /api/users     | POST (create) |
| /api/users/:id | PUT (update), DELETE |

## Running Tests

\`\`\`bash
npm install
npx playwright install

npm test              # all tests
npm run test:e2e      # UI only
npm run test:api      # API only
npm run test:ui       # interactive UI mode
npm run report        # HTML report
\`\`\`

## Project Structure
\`\`\`
pages/      - Page Object classes
tests/e2e/  - UI end-to-end tests
tests/api/  - REST API tests
utils/      - shared test data
\`\`\`