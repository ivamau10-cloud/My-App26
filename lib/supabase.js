import { createClient } from "@supabase/supabase-js";
import { Platform } from "react-native";
import "react-native-url-polyfill/auto";

const supabaseUrl = "https://ynqgbgqmyvfxhokcgokj.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlucWdiZ3FteXZmeGhva2Nnb2tqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2MjA1OTcsImV4cCI6MjA5NDE5NjU5N30.LYbQ-pPVsCXDJXUBvvrF3oG3dAHxCGJEFqz5M2PrXwA";

const authOptions = {
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: false,
};

if (Platform.OS !== "web") {
  const AsyncStorage =
    require("@react-native-async-storage/async-storage").default;
  authOptions.storage = AsyncStorage;
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: authOptions,
});
