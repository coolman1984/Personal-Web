"use client";
/** عميل Supabase في المتصفّح. */
import { createBrowserClient } from "@supabase/ssr";
import { supabaseAnonKey, supabaseUrl } from "./config";

export function createClient() {
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
