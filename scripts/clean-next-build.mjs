import { rmSync } from 'node:fs';

// Cloudflare restores .next from its build cache. Generate HTML and font CSS together.
rmSync(new URL('../.next', import.meta.url), { recursive: true, force: true });
