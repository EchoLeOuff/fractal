/** @type {import('next').NextConfig} */
const nextConfig = {
  // Export 100% statique : génère du HTML/CSS/JS servable par nginx sur le Pi.
  output: 'export',
  images: { unoptimized: true },   // pas d'optimiseur serveur en mode statique
  trailingSlash: true,             // URLs propres servies par nginx (dossiers)
  optimizeFonts: false,            // la police est chargée côté navigateur (pas au build)
};
export default nextConfig;
