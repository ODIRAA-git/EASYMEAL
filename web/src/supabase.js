import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://icpjbtlxxhrawiavvxbk.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImljcGpidGx4eGhyYXdpYXZ2eGJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4MTI3NDIsImV4cCI6MjA3OTM4ODc0Mn0.v7sb4JpCAUXRbKxyiy5yrFQK8FOoYNf0WgIjbIIUB0Y";

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    redirectTo: import.meta.env.VITE_SITE_URL || window.location.origin
  }
});
