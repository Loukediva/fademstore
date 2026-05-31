import { supabase } from '@/utils/supabase';

export default async function sitemap() {
  // Récupérer toutes les applications pour le sitemap
  const { data: apps } = await supabase
    .from('applications')
    .select('id');

  const baseUrl = "https://votre-domaine-vercel.app"; // Remplacez par votre vrai lien Vercel

  const appEntries = (apps || []).map((app) => ({
    url: `${baseUrl}/app/${app.id}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    ...appEntries,
  ];
}