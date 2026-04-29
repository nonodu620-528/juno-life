export const JOBS_DB = {
  fast_food: {
    id: 'fast_food',
    title: 'Équipier Fast-Food',
    baseSalary: 1200,
    happinessHit: -5,
    requiredAge: 18,
    requiredEducation: 'none',
    description: 'Parfait pour commencer. Vous rentrez chez vous en sentant la friture.'
  },
  carpenter: {
    id: 'carpenter',
    title: 'Charpentier',
    baseSalary: 1800,
    requiredAge: 18,
    requiredEducation: 'none',
    riskOfInjury: 0.1, // 10% chance per year
    description: 'Un travail manuel gratifiant mais éreintant.'
  },
  waiter: {
    id: 'waiter',
    title: 'Serveur en Restauration',
    baseSalary: 1400,
    requiredAge: 18,
    requiredEducation: 'none',
    description: 'Vous marchez 15km par jour et les clients sont parfois exécrables.'
  },
  salesperson: {
    id: 'salesperson',
    title: 'Vendeur en Prêt-à-porter',
    baseSalary: 1500,
    requiredAge: 18,
    requiredEducation: 'none',
    description: 'Vous devez supporter la musique en boucle et plier des t-shirts à l\'infini.'
  },
  plumber: {
    id: 'plumber',
    title: 'Plombier',
    baseSalary: 2800,
    happinessHit: -5,
    requiredAge: 20,
    requiredEducation: 'none',
    description: 'Un métier manuel qui paye très bien si vous êtes à votre compte.'
  },
  mechanic: {
    id: 'mechanic',
    title: 'Mécanicien',
    baseSalary: 2200,
    requiredAge: 20,
    requiredEducation: 'none',
    description: 'Vous avez toujours les mains dans le cambouis.'
  },
  nurse: {
    id: 'nurse',
    title: 'Infirmier(e)',
    baseSalary: 2300,
    requiredAge: 22,
    requiredEducation: 'degree',
    riskOfBurnout: 0.25,
    description: 'Essentiel pour la société, mais vos horaires sont chaotiques et le stress est énorme.'
  },
  developer: {
    id: 'developer',
    title: 'Développeur Web',
    baseSalary: 3200,
    requiredAge: 21,
    requiredEducation: 'degree',
    riskOfBurnout: 0.15,
    description: 'Très bon salaire, mais vous passez 10h par jour assis devant un écran.'
  },
  accountant: {
    id: 'accountant',
    title: 'Comptable',
    baseSalary: 2800,
    requiredAge: 22,
    requiredEducation: 'degree',
    description: 'Un travail stable. Les chiffres ne mentent jamais.'
  },
  teacher: {
    id: 'teacher',
    title: 'Professeur',
    baseSalary: 2200,
    happinessHit: -20,
    requiredAge: 23,
    requiredEducation: 'degree',
    riskOfBurnout: 0.2,
    description: 'Le plus beau métier du monde, paraît-il. Sauf le lundi à 8h.'
  },
  pilot: {
    id: 'pilot',
    title: 'Pilote de Ligne',
    baseSalary: 5500,
    requiredAge: 25,
    requiredEducation: 'degree',
    description: 'Vous parcourez le monde, mais vous avez beaucoup de responsabilités.'
  },
  lawyer: {
    id: 'lawyer',
    title: 'Avocat d\'Affaires',
    baseSalary: 6000,
    happinessHit: -35,
    requiredAge: 28,
    requiredEducation: 'degree',
    riskOfBurnout: 0.2,
    description: 'Vous défendez la veuve, l\'orphelin, ou la grosse multinationale selon les jours.'
  },
  doctor: {
    id: 'doctor',
    title: 'Médecin Généraliste',
    baseSalary: 6000,
    requiredAge: 28,
    requiredEducation: 'degree',
    riskOfBurnout: 0.1,
    description: 'Un parcours long et difficile, mais un revenu et un prestige élevés.'
  },
  trader: {
    id: 'trader',
    title: 'Trader',
    baseSalary: 8000,
    requiredAge: 25,
    requiredEducation: 'degree',
    riskOfBurnout: 0.3,
    riskOfScandal: 0.15,
    description: 'Vous brassez des millions. Le stress est permanent et l\'éthique est souvent mise de côté.'
  },
  influencer: {
    id: 'influencer',
    title: 'Influenceur / Créateur',
    baseSalary: 4000,
    requiredAge: 18,
    requiredEducation: 'none',
    riskOfBurnout: 0.2,
    riskOfScandal: 0.25,
    description: 'L\'argent rentre, mais la moindre erreur peut vous "cancel".'
  },
  freelance_artist: {
    id: 'freelance_artist',
    title: 'Artiste Freelance',
    baseSalary: 1500, // Very variable in real life, but game logic needs a base
    requiredAge: 18,
    requiredEducation: 'none',
    description: 'Vous êtes libre ! ...Mais les fins de mois sont difficiles.'
  },
  corporate_spy: {
    id: 'corporate_spy',
    title: 'Espion Industriel',
    baseSalary: 12000,
    requiredAge: 30,
    requiredEducation: 'degree',
    riskOfScandal: 0.4,
    description: 'Extrêmement lucratif, extrêmement risqué. Ne le dites à personne.'
  },
  president: {
    id: 'president',
    title: 'Président',
    baseSalary: 15000,
    requiredAge: 35,
    requiredEducation: 'degree',
    riskOfScandal: 0.2,
    description: 'Le poste ultime. Vous dirigez le pays. Attention aux scandales !'
  },
  dog_walker: {
    id: 'dog_walker',
    title: 'Promeneur de chiens',
    baseSalary: 800,
    happinessHit: 10,
    requiredAge: 18,
    requiredEducation: 'none',
    description: 'Idéal pour s\'aérer l\'esprit.'
  },
  influencer_flop: {
    id: 'influencer_flop',
    title: 'Influenceur (Raté)',
    baseSalary: 300,
    happinessHit: -15,
    requiredAge: 18,
    requiredEducation: 'none',
    description: 'Vous essayez de percer, sans grand succès.'
  },
  office_drone: {
    id: 'office_drone',
    title: 'Employé de bureau',
    baseSalary: 2000,
    happinessHit: -10,
    requiredAge: 21,
    requiredEducation: 'none',
    description: 'La routine classique devant un écran.'
  },
  dev_fullstack: {
    id: 'dev_fullstack',
    title: 'Développeur Full-Stack',
    baseSalary: 3500,
    happinessHit: -15,
    requiredAge: 22,
    requiredEducation: 'degree',
    description: 'Vous codez jour et nuit.'
  },
  scrum_master: {
    id: 'scrum_master',
    title: 'Scrum Master',
    baseSalary: 4000,
    happinessHit: 0,
    requiredAge: 25,
    requiredEducation: 'degree',
    description: 'Des posts-it, des réunions et un bon salaire.'
  },
  crypto_trader: {
    id: 'crypto_trader',
    title: 'Trader Crypto Indépendant',
    baseSalary: 5000,
    happinessHit: -30,
    requiredAge: 18,
    requiredEducation: 'none',
    description: 'Un marché ultra volatil, stress garanti.'
  },
  politician: {
    id: 'politician',
    title: 'Maire d\'une petite commune',
    baseSalary: 4500,
    happinessHit: -20,
    requiredAge: 30,
    requiredEducation: 'degree',
    riskOfScandal: 0.2,
    description: 'Des serrages de mains et des inaugurations.'
  },
  guru: {
    id: 'guru',
    title: 'Gourou du Développement Personnel',
    baseSalary: 8000,
    happinessHit: 5,
    requiredAge: 25,
    requiredEducation: 'none',
    riskOfScandal: 0.3,
    description: 'Vous vendez du rêve à prix d\'or.'
  }
};
