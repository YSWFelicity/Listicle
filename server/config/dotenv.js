import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';

// Resolve from this file, so npm scripts work regardless of the shell's directory.
dotenv.config({ path: fileURLToPath(new URL('../../.env', import.meta.url)), quiet: true });
