import { supabaseAdapter } from './supabase-adapter';
import type { DatabaseAdapter } from './types';

export const db: DatabaseAdapter = supabaseAdapter;

export * from './types';
