// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://btezdioxghxxbgkftsqc.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0ZXpkaW94Z2h4eGJna2Z0c3FjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2MDEzMDAsImV4cCI6MjA1OTE3NzMwMH0.uj1NGtD6RwC5ZGpM1si6n75vVOWPxiVBfkh1Z1e5AQU";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);