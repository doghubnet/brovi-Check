const publicSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const publicSupabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

export const env = {
  public: {
    supabaseUrl: publicSupabaseUrl,
    supabaseAnonKey: publicSupabaseAnonKey,
    supabasePublishableKey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? '',
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? '',
  },
  server: {
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY ?? '',
    geminiApiKey: process.env.GEMINI_API_KEY ?? '',
    openRouterApiKey: process.env.OPENROUTER_API_KEY ?? '',
  },
  flags: {
    hasSupabaseClient: Boolean(publicSupabaseUrl && publicSupabaseAnonKey),
  },
};
