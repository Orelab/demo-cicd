import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const features = [
  {
    category: "Performance",
    templates: [
      { name: "Lazy Loading", desc: "Chargement différé des images et composants" },
      { name: "Code Splitting", desc: "Découpage automatique du code pour optimiser le chargement" },
      { name: "Mise en cache", desc: "Système de mise en cache avancé des requêtes" }
    ]
  },
  {
    category: "Sécurité",
    templates: [
      { name: "Authentification 2FA", desc: "Double authentification pour sécuriser les comptes" },
      { name: "Protection CSRF", desc: "Protection contre les attaques CSRF" },
      { name: "Encryption des données", desc: "Chiffrement bout-en-bout des données sensibles" }
    ]
  },
  {
    category: "UI/UX",
    templates: [
      { name: "Mode sombre", desc: "Interface adaptative jour/nuit" },
      { name: "Animations fluides", desc: "Transitions et animations optimisées" },
      { name: "Design responsive", desc: "Adaptation automatique à tous les écrans" }
    ]
  },
  {
    category: "API",
    templates: [
      { name: "Rate Limiting", desc: "Limitation du nombre de requêtes API" },
      { name: "Cache API", desc: "Mise en cache des réponses API" },
      { name: "Versioning API", desc: "Gestion des versions d'API" }
    ]
  }
];

const resources = [
  "https://nextjs.org/docs",
  "https://react.dev/reference/react",
  "https://prisma.io/docs",
  "https://developer.mozilla.org/fr/docs/Web",
  "https://web.dev/articles"
];

async function main() {
  const startDate = new Date(2023, 0, 1); // 1er janvier 2023
  const endDate = new Date(); // Aujourd'hui

  for (let i = 0; i < 100; i++) {
    const randomCategory = features[Math.floor(Math.random() * features.length)];
    const randomTemplate = randomCategory.templates[Math.floor(Math.random() * randomCategory.templates.length)];
    const randomResource = resources[Math.floor(Math.random() * resources.length)];
    
    // Génère une date aléatoire entre startDate et endDate
    const randomDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));

    await prisma.feature.create({
      data: {
        name: `${randomCategory.category} - ${randomTemplate.name} ${i + 1}`,
        description: randomTemplate.desc,
        resourceUrl: randomResource,
        addedAt: randomDate
      }
    });
  }

  console.log('Base de données peuplée avec succès !');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
