import { createClient } from "@supabase/supabase-js";
import { Platform } from "react-native";
import "react-native-url-polyfill/auto";

const supabaseUrl = "https://gywonijwmdwdephtczhe.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5d29uaWp3bWR3ZGVwaHRjemhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2MDU5NTgsImV4cCI6MjA5MTE4MTk1OH0.PvAClNj954xzS6VV1iqqE1X6ZjNIUUGcqkIj3SWrTiI";

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
