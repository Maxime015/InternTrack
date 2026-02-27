/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      // Limite raisonnable pour éviter les erreurs de sérialisation massives
      bodySizeLimit: '90gb', 
    },
  },
  // On s'assure que le parsing du body accepte également cette taille
  api: {
    bodyParser: {
      sizeLimit: '90gb',
    },
  },
};

export default nextConfig;