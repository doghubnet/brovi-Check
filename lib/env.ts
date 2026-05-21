export const env = {
  public: {
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
    supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
    supabasePublishableKey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? '',
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? '',
  },
  server: {
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY ?? '',
    geminiApiKey: process.env.GEMINI_API_KEY ?? '',
    openRouterApiKey: process.env.OPENROUTER_API_KEY ?? '',
  },
};