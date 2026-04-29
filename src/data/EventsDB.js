export const RANDOM_EVENTS = [
  // --- CARRIÈRE & FINANCES ---
  {
    id: 'promotion',
    title: 'Promotion Inattendue',
    condition: (p) => p.job && p.job.monthsWorked >= 12,
    description: 'Votre supérieur vous propose un poste avec plus de responsabilités.',
    choices: [
      { text: 'Accepter (+20% salaire, stress)', action: (p) => { p.job.salary = Math.floor(p.job.salary * 1.2); p.happiness -= 5; return "Vous avez accepté. Le salaire est bon, mais la charge mentale aussi."; } },
      { text: 'Refuser', action: (p) => { p.happiness += 5; return "Vous privilégiez votre temps libre."; } }
    ]
  },
  {
    id: 'burnout',
    title: 'Burnout imminent',
    condition: (p) => p.job && p.happiness < 30,
    description: 'Vous n\'en pouvez plus. Le réveil le matin est une torture.',
    choices: [
      { text: 'Démissionner immédiatement', action: (p) => { p.job = null; p.happiness += 20; return "Vous avez tout plaqué pour votre santé mentale."; } },
      { text: 'Serrer les dents', action: (p) => { p.happiness -= 15; p.status.hasAddiction = true; return "Vous tenez bon, mais vous commencez à boire pour compenser."; } }
    ]
  },
  {
    id: 'startup_invest',
    title: 'Opportunité Startup',
    condition: (p) => p.money > 10000,
    description: 'Un ami vous propose d\'investir 10 000€ dans son idée révolutionnaire.',
    choices: [
      { text: 'Investir (Risqué)', action: (p) => { 
          p.money -= 10000;
          if (Math.random() > 0.3) { p.money += 50000; return "INCROYABLE ! La startup a été rachetée, vous empochez 50 000€ !"; }
          else { return "La startup a fait faillite. Vous avez perdu vos 10 000€."; }
      }},
      { text: 'Passer son tour', action: (p) => { return "C\'était sûrement une arnaque de toute façon."; } }
    ]
  },
  {
    id: 'bad_buzz_influencer',
    title: 'Bad Buzz',
    condition: (p) => p.job && p.job.id === 'influencer',
    description: 'Une ancienne vidéo polémique de vous vient de refaire surface.',
    choices: [
      { text: 'Faire des excuses publiques', action: (p) => { 
          if(Math.random() > 0.5) { p.happiness -= 10; return "Vos excuses sont acceptées, mais vous perdez des abonnés."; }
          else { p.job = null; p.happiness -= 30; return "Les excuses ont empiré les choses. Vous êtes \'cancel\' et perdez votre job."; }
      }},
      { text: 'Ignorer', action: (p) => { p.job.salary = Math.floor(p.job.salary * 0.7); return "Vos sponsors vous lâchent, votre salaire chute de 30%."; } }
    ]
  },
  {
    id: 'strike',
    title: 'Mouvement Social',
    condition: (p) => p.job && ['carpenter', 'mechanic', 'plumber', 'nurse', 'teacher'].includes(p.job.id),
    description: 'Votre syndicat appelle à une grève générale pour les salaires.',
    choices: [
      { text: 'Faire grève', action: (p) => { 
        p.money -= Math.floor(p.job.salary * 0.3); // perte d'un tiers de salaire ce mois-ci
        if (Math.random() > 0.5) { p.job.salary = Math.floor(p.job.salary * 1.1); return "Victoire ! Le salaire augmente de 10%, mais vous avez perdu la paie des jours de grève."; }
        return "La grève n'a rien donné. Vous avez perdu du salaire pour rien."; 
      }},
      { text: 'Aller travailler', action: (p) => { p.happiness -= 5; return "Vos collègues vous regardent de travers. Ambiance glaciale."; } }
    ]
  },
  {
    id: 'workplace_accident',
    title: 'Accident du travail',
    condition: (p) => p.job && p.job.id !== 'president',
    description: 'Un accident de travail vous blesse sérieusement.',
    choices: [
      { text: 'Prendre l\'arrêt maladie', action: (p) => { 
        p.happiness -= 10; 
        return "Vous êtes immobilisé pendant un mois. Votre paie est maintenue, mais la douleur est là."; 
      }},
      { text: 'Attaquer l\'employeur en justice', action: (p) => { 
        if(Math.random() > 0.5) { p.money += 15000; p.job = null; return "Vous gagnez le procès (+15000€) mais vous êtes renvoyé."; }
        else { p.money -= 3000; p.happiness -= 15; return "Vous avez perdu le procès et vous devez payer les frais d'avocat (-3000€)."; }
      }}
    ]
  },
  {
    id: 'side_hustle',
    title: 'Le Side Hustle',
    condition: (p) => p.happiness > 50,
    description: 'Vous avez une idée géniale de petite entreprise à lancer le soir en rentrant.',
    choices: [
      { text: 'Travailler la nuit', action: (p) => { 
        p.happiness -= 15; 
        if(Math.random() > 0.6) { p.money += 8000; return "Épuisant, mais ça a rapporté 8000€ ce mois-ci !"; }
        return "Vous avez travaillé pour rien, l'idée a fait un flop (-15 Bonheur)."; 
      }},
      { text: 'Dormir', action: (p) => { p.happiness += 5; return "Rien ne vaut une bonne nuit de sommeil."; } }
    ]
  },

  // --- VIE PRIVÉE & QUOTIDIEN ---
  {
    id: 'marriage',
    title: 'Le Grand Amour',
    condition: (p) => !p.status.isMarried && p.age >= 20,
    description: 'Vous avez rencontré une personne exceptionnelle. Voulez-vous vous marier ? (Coûte 5000€ pour la fête)',
    choices: [
      { text: 'Se marier (-5000€)', action: (p) => { 
          if(p.money >= 5000) { p.money -= 5000; p.status.isMarried = true; p.happiness += 30; return "Un mariage magnifique ! (+30 Bonheur)"; }
          else { return "Vous n'avez pas l'argent pour le mariage de ses rêves..."; }
      }},
      { text: 'Rester célibataire', action: (p) => { return "L'indépendance avant tout."; } }
    ]
  },
  {
    id: 'child',
    title: 'Heureux événement',
    condition: (p) => p.status.isMarried && p.age >= 25 && Math.random() > 0.5,
    description: 'Votre conjoint(e) attend un enfant !',
    choices: [
      { text: 'Super ! (+20 Bonheur)', action: (p) => { p.happiness += 20; return "C'est un changement de vie majeur ! Vos dépenses augmenteront secrètement."; } }
    ]
  },
  {
    id: 'midlife_crisis',
    title: 'Crise de la Quarantaine',
    condition: (p) => p.age === 40 && p.money > 15000,
    description: 'Vous avez 40 ans. Un vide existentiel vous envahit.',
    choices: [
      { text: 'Acheter une voiture de sport (-15000€)', action: (p) => { p.money -= 15000; p.happiness += 20; return "Vroum vroum ! Ça va beaucoup mieux."; } },
      { text: 'Retraite spirituelle (-2000€)', action: (p) => { p.money -= 2000; p.happiness += 10; return "Vous avez trouvé la paix intérieure au Tibet."; } },
      { text: 'Rien faire', action: (p) => { p.happiness -= 15; return "Vous déprimez sur votre canapé."; } }
    ]
  },
  {
    id: 'std',
    title: 'Une nuit agitée',
    condition: (p) => !p.status.isMarried && Math.random() > 0.7,
    description: 'Suite à une rencontre d\'un soir sans protection, vous vous sentez mal...',
    choices: [
      { text: 'Aller faire un test', action: (p) => { 
        if(Math.random() > 0.4) { p.happiness -= 20; p.money -= 1000; return "Le test est positif à une vilaine IST. Frais médicaux et grosse déprime."; }
        return "Fausse alerte, tout va bien ! Ouf."; 
      }}
    ]
  },
  {
    id: 'inheritance',
    title: 'Héritage Mystérieux',
    condition: (p) => Math.random() > 0.8,
    description: 'Un vieil oncle d\'Amérique vient de décéder.',
    choices: [
      { text: 'Réclamer l\'héritage', action: (p) => { 
          const amount = Math.floor(Math.random() * 50000) + 5000; 
          p.money += amount; 
          return `Vous avez hérité de ${amount}€ !`; 
      }}
    ]
  },
  {
    id: 'pet',
    title: 'Un compagnon à 4 pattes',
    condition: (p) => p.money > 1000 && Math.random() > 0.7,
    description: 'Vous croisez un refuge animalier. Un petit chien vous regarde avec de grands yeux.',
    choices: [
      { text: 'L\'adopter (-500€)', action: (p) => { p.money -= 500; p.happiness += 15; return "Ce petit être a changé votre vie."; } },
      { text: 'Continuer son chemin', action: (p) => { p.happiness -= 5; return "Vous avez un pincement au cœur."; } }
    ]
  },
  {
    id: 'friend_loan',
    title: 'L\'Ami dans le besoin',
    condition: (p) => p.money > 3000,
    description: 'Votre meilleur ami vous demande 3000€ pour régler des dettes de jeu urgentes.',
    choices: [
      { text: 'Prêter l\'argent', action: (p) => { 
          p.money -= 3000;
          if (Math.random() > 0.6) { p.happiness += 10; return "C'est une belle action. Mais il ne vous remboursera jamais."; }
          else { p.happiness -= 10; return "Il a pris l'argent et ne vous donne plus de nouvelles..."; }
      }},
      { text: 'Refuser', action: (p) => { p.happiness -= 5; return "Vous perdez un ami, mais vous gardez votre argent."; } }
    ]
  },
  {
    id: 'broken_tooth',
    title: 'Aïe !',
    condition: (p) => true,
    description: 'En mangeant une baguette trop dure, vous vous cassez une dent.',
    choices: [
      { text: 'Aller chez le dentiste (-800€)', action: (p) => { p.money -= 800; return "Le dentiste a réparé la dent, mais ça pique le portefeuille."; } },
      { text: 'Laisser comme ça', action: (p) => { p.happiness -= 10; return "Vous avez mal, et vous n'osez plus sourire."; } }
    ]
  },
  {
    id: 'lottery_ticket',
    title: 'Le Ticket Gagnant ?',
    condition: (p) => p.money > 50,
    description: 'Le jackpot du Loto est de 10 millions d\'euros ce mois-ci.',
    choices: [
      { text: 'Jouer 50€', action: (p) => { 
        p.money -= 50;
        if(Math.random() > 0.99) { p.money += 10000000; return "VOUS AVEZ GAGNÉ LE JACKPOT ! VOUS ÊTES MULTIMILLIONNAIRE !"; }
        return "Perdu. Comme d'habitude."; 
      }},
      { text: 'Garder ses 50€', action: (p) => { return "La loterie est un impôt sur la stupidité, dites-vous."; } }
    ]
  },
  {
    id: 'trip',
    title: 'Envie d\'évasion',
    condition: (p) => p.money > 3000,
    description: 'Une promotion pour un voyage de deux semaines au Japon apparaît sur votre fil d\'actualité.',
    choices: [
      { text: 'Acheter les billets (-3000€)', action: (p) => { p.money -= 3000; p.happiness += 25; return "Un voyage inoubliable ! Le dépaysement total."; } },
      { text: 'Rester chez soi', action: (p) => { p.happiness -= 5; return "La routine continue..."; } }
    ]
  },

  // --- ILLÉGAL & EXTRÊME ---
  {
    id: 'drug_stash',
    title: 'Argent Facile',
    condition: (p) => p.money < 50000,
    description: 'Une de vos connaissances vous propose 20 000€ juste pour cacher un sac de sport fermé dans votre placard pendant un mois.',
    choices: [
      { text: 'Accepter l\'offre', action: (p) => { 
          if(Math.random() > 0.4) { p.money += 20000; return "Personne n'a toqué. Vous avez 20 000€ en petites coupures."; }
          else { 
            return { prison: true, baseFine: 20000, reason: "Trafic de stupéfiants", msg: "PERQUISITION ! La police a trouvé le sac." };
          }
      }},
      { text: 'Refuser', action: (p) => { return "Trop risqué. Vous voulez rester un citoyen honnête."; } }
    ]
  },
  {
    id: 'president_bribe',
    title: 'Corruption au Sommet',
    condition: (p) => p.job && p.job.id === 'president',
    description: 'Le PDG d\'un grand groupe pétrolier vous offre une mallette de 200 000€ pour "faciliter" une loi.',
    choices: [
      { text: 'Accepter', action: (p) => { 
          if(Math.random() > 0.3) { p.money += 200000; return "La loi est passée, l'argent est sur un compte offshore."; }
          else { 
            p.money = 0; // Ruined immediately
            return { prison: true, baseFine: 100000, reason: "Corruption d'État", msg: "SCANDALE D'ÉTAT ! Vous êtes destitué et ruiné." };
          }
      }},
      { text: 'Refuser et le dénoncer', action: (p) => { p.happiness += 10; return "Votre cote de popularité grimpe, vous êtes un symbole d'intégrité."; } }
    ]
  },
  {
    id: 'robbery',
    title: 'Cambriolage',
    condition: (p) => p.money > 10000 && Math.random() > 0.8,
    description: 'En rentrant chez vous, la porte est fracturée...',
    choices: [
      { text: 'Constater les dégâts', action: (p) => { 
          const lost = Math.floor(p.money * 0.2);
          p.money -= lost;
          p.happiness -= 20;
          return `Ils ont tout pris, vous perdez ${lost}€ d'objets de valeur.`; 
      }}
    ]
  },
  {
    id: 'crypto_scam',
    title: 'L\'Opportunité Crypto',
    condition: (p) => p.money > 5000,
    description: 'Un influenceur promet que le "JunoCoin" va faire x10 le mois prochain.',
    choices: [
      { text: 'Investir 5000€ (FOMO)', action: (p) => { 
          p.money -= 5000;
          if(Math.random() > 0.8) { p.money += 50000; return "INCROYABLE, vous avez vendu au pic et fait x10 ! (+50 000€)"; }
          else { return "Rug Pull... Le créateur a disparu avec l'argent. Vous avez tout perdu."; }
      }},
      { text: 'Ignorer la hype', action: (p) => { return "C'était clairement une arnaque de Ponzi."; } }
    ]
  },
  {
    id: 'found_wallet',
    title: 'Portefeuille Perdu',
    condition: (p) => Math.random() > 0.8,
    description: 'Vous trouvez un portefeuille épais dans le bus. Il contient 1000€ en liquide et une carte d\'identité.',
    choices: [
      { text: 'Garder l\'argent (+1000€)', action: (p) => { p.money += 1000; p.happiness -= 5; return "Vous empochez les billets mais la culpabilité vous ronge un peu."; } },
      { text: 'Rapporter à la police', action: (p) => { 
          if(Math.random() > 0.5) { p.money += 100; p.happiness += 10; return "Le propriétaire vous laisse 100€ de récompense pour votre honnêteté !"; }
          return "Vous faites une bonne action. (+10 Bonheur)"; 
      }}
    ]
  },
  {
    id: 'blackmail',
    title: 'Chantage',
    condition: (p) => p.money > 5000 && p.status.isMarried,
    description: 'Un inconnu vous envoie des photos floues mais compromettantes. Il demande 5000€ pour ne rien envoyer à votre conjoint.',
    choices: [
      { text: 'Payer (-5000€)', action: (p) => { p.money -= 5000; p.happiness -= 10; return "Vous avez payé. Le corbeau a disparu, mais vous vivez dans la peur."; } },
      { text: 'Ignorer et avouer', action: (p) => { 
        if(Math.random() > 0.5) { p.happiness += 5; return "Votre conjoint a compris que c'était un montage. Tout va bien."; }
        else { p.happiness -= 30; p.status.isMarried = false; p.money = Math.floor(p.money / 2); return "Divorce ! Vous perdez la moitié de votre argent."; }
      }}
    ]
  },
  {
    id: 'hacker_attack',
    title: 'Attaque Informatique',
    condition: (p) => p.money > 20000,
    description: 'Votre banque a été piratée et vos comptes sont temporairement gelés.',
    choices: [
      { text: 'Attendre', action: (p) => { p.happiness -= 15; return "L'attente est insupportable. Finalement, votre argent est restitué."; } },
      { text: 'Payer un hacker du dark web (-5000€)', action: (p) => { 
        p.money -= 5000;
        if(Math.random() > 0.3) { p.money += 10000; return "Le hacker a récupéré votre argent ET détourné un peu plus ! (+10000€)"; }
        else { return { prison: true, baseFine: 15000, reason: "Complicité de piratage", msg: "La police remonte à vous !" }; }
      }}
    ]
  }
,
  // NOUVEAUX EVENEMENTS (Batch 1-5)
  // 1. La tentation au supermarché
  {
    id: 'self_checkout_bug',
    title: 'La Caisse Autonome',
    condition: (p) => p.age >= 18,
    description: 'À la caisse automatique du supermarché, la machine plante et ne scanne pas la TV 4K que vous avez mise dans votre caddie. Le vigile regarde son téléphone.',
    choices: [
      { text: 'Signaler le bug et payer (500€)', action: (p) => { 
          p.money -= 500; 
          p.happiness = Math.min(100, p.happiness + 5); 
          return "Votre conscience est pure, mais votre portefeuille pleure. Le vigile ne vous a même pas dit merci."; 
      }},
      { text: 'Sortir l\'air de rien (Risqué)', action: (p) => { 
          if (Math.random() > 0.6) {
              p.happiness = Math.min(100, p.happiness + 20);
              return "Vous avez transpiré à grosses gouttes, mais la TV trône dans votre salon. Gratuitement !";
          } else {
              return { prison: true, baseFine: 1500, reason: "Vol à l'étalage", msg: "Le vigile a levé les yeux au mauvais moment. La honte internationale devant tout le magasin." };
          }
      }}
    ]
  },

  // 2. Le cadeau empoisonné
  {
    id: 'exotic_pet_disaster',
    title: 'Surprise Animale',
    condition: (p) => p.status.isMarried && p.money > 1000,
    description: 'Votre conjoint(e) rentre à la maison avec un alpaga acheté sur un coup de tête sur Internet. "Il s\'appelle Kevin et il va vivre dans le salon !"',
    choices: [
      { text: 'Garder Kevin et acheter du foin (300€)', action: (p) => {
          p.money -= 300;
          p.happiness = Math.max(0, p.happiness - 15);
          return "Kevin a mangé votre canapé et crache sur vos invités. Votre couple tient bon, mais votre santé mentale vacille.";
      }},
      { text: 'Le revendre au marché noir (Risqué)', action: (p) => {
          if (Math.random() > 0.5) {
              p.money += 800;
              p.happiness = Math.max(0, p.happiness - 10);
              return "Vous l'avez vendu à un cirque clandestin. Votre conjoint(e) vous fait la tête, mais vous avez fait un bénéfice.";
          } else {
              return { prison: true, baseFine: 2000, reason: "Trafic d'espèces non domestiques", msg: "La SPA et les douanes ont débarqué chez vous. Kevin a été saisi et vous êtes en garde à vue." };
          }
      }}
    ]
  },

  // 3. Le piratage honteux
  {
    id: 'cloud_hacked',
    title: 'Piratage du Cloud',
    condition: (p) => p.age >= 20,
    description: 'Des hackers ont piraté votre Cloud. Ils menacent de publier vos photos de soirée les plus embarrassantes (et illégales) à tous vos contacts.',
    choices: [
      { text: 'Payer la rançon en Bitcoin (800€)', action: (p) => {
          p.money -= 800;
          p.happiness = Math.max(0, p.happiness - 20);
          return "Vous payez. Les hackers disparaissent. Vous passez la soirée à changer vos mots de passe en pleurant.";
      }},
      { text: 'Refuser et assumer', action: (p) => {
          if (p.job) p.job = null; // Perte de l'emploi !
          p.happiness = Math.max(0, p.happiness - 40);
          return "Les photos sont sorties. Votre patron a vu le cliché avec le plot de chantier. Vous êtes viré(e) et humilié(e).";
      }},
      { text: 'Contre-attaquer (Risqué)', action: (p) => {
          if (Math.random() > 0.8) {
              p.happiness = Math.min(100, p.happiness + 30);
              return "Incroyable ! Vous trouvez l'IP du hacker et effacez son disque dur. Vous êtes un héros de l'ombre.";
          } else {
              return { prison: true, baseFine: 5000, reason: "Piratage informatique en représailles", msg: "Vous avez accidentellement piraté les serveurs de la gendarmerie en cherchant le hacker. Oups." };
          }
      }}
    ]
  },

  // 4. L'urgence dentaire
  {
    id: 'tooth_pain',
    title: 'Rage de Dents',
    condition: (p) => p.age > 25,
    description: 'Une douleur atroce vous réveille au milieu de la nuit. Votre dent de sagesse exige un sacrifice sanguin et financier.',
    choices: [
      { text: 'Aller chez le dentiste privé (600€)', action: (p) => {
          p.money -= 600;
          p.happiness = Math.min(100, p.happiness + 10);
          return "La douleur a disparu, mais votre compte en banque saigne autant que vos gencives.";
      }},
      { text: 'Attendre que ça passe', action: (p) => {
          p.happiness = Math.max(0, p.happiness - 30);
          return "Vous souffrez le martyre pendant des semaines. Vous ne pouvez manger que de la purée froide. Dépression.";
      }},
      { text: 'La technique de la ficelle et de la porte (Gratuit)', action: (p) => {
          if (Math.random() > 0.7) {
              p.happiness = Math.min(100, p.happiness + 5);
              return "Contre toute attente, la dent vole à travers la pièce. La douleur s'arrête. Vous êtes un vrai guerrier.";
          } else {
              p.money -= 1200; // Frais d'urgence
              p.happiness = Math.max(0, p.happiness - 40);
              return "Vous avez arraché la mauvaise dent et fracturé votre mâchoire. Les urgences vous facturent le double.";
          }
      }}
    ]
  },

  // 5. La mode incomprise
  {
    id: 'luxury_fashion_mistake',
    title: 'Victime de la Mode',
    condition: (p) => p.money > 2000,
    description: 'En plein défilement sur Instagram, vous achetez impulsivement une veste de créateur à 1500€. Elle ressemble à un sac poubelle avec des clous.',
    choices: [
      { text: 'La porter fièrement', action: (p) => {
          p.happiness = Math.max(0, p.happiness - 15);
          return "Les gens vous jettent des pièces dans la rue, pensant que vous êtes sans-abri. Votre ego en prend un coup.";
      }},
      { text: 'La revendre d\'occasion (Récupère 500€)', action: (p) => {
          p.money -= 1000; // Perte nette
          p.happiness = Math.max(0, p.happiness - 5);
          return "Vous perdez de l'argent, mais la leçon est apprise : la haute couture n'est pas pour vous.";
      }}
    ]
  },

  // 6. L'ami d'enfance encombrant
  {
    id: 'childhood_friend_pyramid',
    title: 'Le Vieux Pote',
    condition: (p) => p.age > 22 && p.money > 200,
    description: 'Un vieil ami d\'école vous invite à boire un café. Au bout de 5 minutes, il sort un tableau blanc et vous parle d\'une "opportunité d\'affaire unique".',
    choices: [
      { text: 'Acheter son silence (Donner 200€)', action: (p) => {
          p.money -= 200;
          p.happiness = Math.max(0, p.happiness - 5);
          return "Vous achetez un kit de vitamines périmées pour le faire taire et vous fuyez. Fin de l'amitié.";
      }},
      { text: 'Le convaincre que c\'est une secte', action: (p) => {
          if (Math.random() > 0.5) {
              p.happiness = Math.min(100, p.happiness + 15);
              return "Il a une illumination, fond en larmes, et vous remercie de l'avoir sauvé. Vous vous sentez comme un psy !";
          } else {
              p.happiness = Math.max(0, p.happiness - 10);
              return "Il s'énerve, vous traite de 'mouton de la matrice' et vous jette son café au visage.";
          }
      }}
    ]
  },

  // 7. L'arnaque du garagiste
  {
    id: 'shady_mechanic',
    title: 'Le Voyant Moteur',
    condition: (p) => p.money > 1000,
    description: 'Le voyant moteur de votre voiture s\'allume. Le garagiste aspire fortement entre ses dents et déclare : "Ouh là... Le joint de culbuteur du condensateur à plasma est mort."',
    choices: [
      { text: 'Payer la facture astronomique (1000€)', action: (p) => {
          p.money -= 1000;
          p.happiness = Math.max(0, p.happiness - 15);
          return "Vous payez en sachant pertinemment que vous vous faites avoir. Mais au moins, la voiture roule.";
      }},
      { text: 'Taper sur le tableau de bord', action: (p) => {
          if (Math.random() > 0.6) {
              p.happiness = Math.min(100, p.happiness + 20);
              return "Paf ! Le voyant s'éteint. Vous venez d'économiser 1000€ grâce à la violence mécanique.";
          } else {
              p.money -= 2000;
              p.happiness = Math.max(0, p.happiness - 30);
              return "Le moteur explose sur le chemin du retour. La dépanneuse et le nouveau moteur vous ruinent la santé.";
          }
      }},
      { text: 'Voler des pièces dans son atelier (Risqué)', action: (p) => {
          if (Math.random() > 0.7) {
              p.happiness = Math.min(100, p.happiness + 10);
              return "Vous trouvez la vraie pièce cassée, vous l'embarquez en douce et vous réparez ça vous-même. Ni vu ni connu.";
          } else {
              return { prison: true, baseFine: 1500, reason: "Vol dans un établissement commercial", msg: "Le chien de garde du garagiste vous a coincé dans un coin jusqu'à l'arrivée de la police." };
          }
      }}
    ]
  },

  // 8. Le beau geste qui tourne mal
  {
    id: 'found_wallet_politic',
    title: 'Le Portefeuille Perdu',
    condition: (p) => true,
    description: 'Vous trouvez un portefeuille bien garni dans le métro. La carte d\'identité indique qu\'il appartient à un élu politique connu pour être corrompu.',
    choices: [
      { text: 'Le rendre au commissariat', action: (p) => {
          p.happiness = Math.max(0, p.happiness - 5);
          return "Vous faites votre devoir civique. Aucune récompense, même pas un merci.";
      }},
      { text: 'Garder l\'argent liquide (Gagne 500€)', action: (p) => {
          p.money += 500;
          p.happiness = Math.min(100, p.happiness + 10);
          return "Robin des Bois des temps modernes ! Vous gardez le liquide et jetez le reste dans une poubelle.";
      }},
      { text: 'Le faire chanter avec les reçus douteux (Risqué)', action: (p) => {
          if (Math.random() > 0.8) {
              p.money += 5000;
              p.happiness = Math.min(100, p.happiness + 20);
              return "Le politicien cède et vous donne une mallette de billets en échange du silence. C'est mafieux, mais lucratif.";
          } else {
              return { prison: true, baseFine: 10000, reason: "Extorsion de fonds et chantage", msg: "Vous vouliez faire chanter un requin de la politique ? Ses avocats et la police vous ont anéanti." };
          }
      }}
    ]
  },

  // 9. Le cauchemar administratif
  {
    id: 'tax_audit_nightmare',
    title: 'Lettre Recommandée',
    condition: (p) => p.age > 25,
    description: 'Vous recevez un courrier des impôts : "Suite à une anomalie sur votre déclaration de 2018, veuillez nous fournir le formulaire A-38 bleu dans les 48h."',
    choices: [
      { text: 'Engager un comptable (400€)', action: (p) => {
          p.money -= 400;
          p.happiness = Math.max(0, p.happiness - 10);
          return "Le comptable règle le problème en deux coups de fil. L'argent est parti, mais vous évitez l'ulcère.";
      }},
      { text: 'Essayer de comprendre l\'administration', action: (p) => {
          p.happiness = Math.max(0, p.happiness - 35);
          return "Vous passez 3 jours au téléphone à écouter 'Les Quatre Saisons' de Vivaldi. Vous perdez la tête, mais le dossier est validé.";
      }},
      { text: 'Créer de faux justificatifs (Risqué)', action: (p) => {
          if (Math.random() > 0.6) {
              p.money += 1000; // Récupère un crédit d'impôt indu
              p.happiness = Math.min(100, p.happiness + 15);
              return "Votre talent sur Photoshop trompe l'inspecteur, qui vous accorde même un remboursement. Diabolique.";
          } else {
              return { prison: true, baseFine: 8000, reason: "Faux et usage de faux dans un document administratif", msg: "L'inspecteur n'a pas cru à votre signature faite à la souris. Direction la cellule." };
          }
      }}
    ]
  },

  // 10. La crise de la trentaine/quarantaine
  {
    id: 'midlife_crisis_tattoo',
    title: 'Crise Existentielle',
    condition: (p) => p.age >= 30,
    description: 'En regardant dans le miroir, vous trouvez votre vie ennuyeuse. Vous passez devant un salon de tatouage douteux ouvert à 2h du matin.',
    choices: [
      { text: 'Se faire tatouer un tigre sur le dos (400€)', action: (p) => {
          p.money -= 400;
          p.happiness = Math.min(100, p.happiness + 15);
          return "Ça fait horriblement mal, le tigre ressemble à un chaton en colère, mais vous vous sentez VIVANT(E) !";
      }},
      { text: 'Rentrer dormir et boire une tisane', action: (p) => {
          p.happiness = Math.max(0, p.happiness - 10);
          return "Vous êtes raisonnable. Vous êtes ennuyeux(se). Votre moral baisse un peu face à cette triste vérité.";
      }}
    ]
  },

  // 11. Le drame du frigo d'entreprise
  {
    id: 'stolen_tupperware',
    title: 'Le Voleur de Tupperware',
    condition: (p) => p.job !== null,
    description: 'Pour la troisième fois cette semaine, quelqu\'un a mangé votre gratin dauphinois dans le frigo de l\'entreprise.',
    choices: [
      { text: 'Acheter un sandwich en pleurant (15€)', action: (p) => {
          p.money -= 15;
          p.happiness = Math.max(0, p.happiness - 15);
          return "Vous mangez un triangle au thon industriel. Votre âme est aussi vide que votre estomac.";
      }},
      { text: 'Laisser un mot passif-agressif', action: (p) => {
          p.happiness = Math.max(0, p.happiness - 5);
          return "Le lendemain, votre mot est corrigé au stylo rouge pour les fautes d'orthographe. Humiliation totale.";
      }},
      { text: 'Piéger le prochain plat aux laxatifs (Risqué)', action: (p) => {
          if (Math.random() > 0.6) {
              p.happiness = Math.min(100, p.happiness + 25);
              return "Le chef comptable a passé l'après-midi aux toilettes. La vengeance est un plat qui se mange épicé.";
          } else {
              if (p.job) p.job = null;
              return { prison: true, baseFine: 2000, reason: "Empoisonnement volontaire", msg: "La victime a fait une réaction allergique grave. Vous êtes viré(e) et embarqué(e) par la police." };
          }
      }}
    ]
  },

  // 12. La fuite d'eau chez le voisin
  {
    id: 'upstairs_water_leak',
    title: 'Goutte à Goutte',
    condition: (p) => p.money > 200,
    description: 'Une tache d\'humidité grandit sur votre plafond. Votre voisin du dessus est un DJ nocturne qui ne répond jamais à la porte.',
    choices: [
      { text: 'Appeler un plombier en urgence (400€)', action: (p) => {
          p.money -= 400;
          p.happiness = Math.max(0, p.happiness - 10);
          return "Vous payez l'intervention pour couper l'eau. Votre plafond est ruiné, mais vous ne prenez plus de douche dans le salon.";
      }},
      { text: 'Mettre un seau et ignorer', action: (p) => {
          p.happiness = Math.max(0, p.happiness - 25);
          return "Le seau déborde, votre parquet ondule et l'odeur de moisissure devient votre nouveau parfum. Dépression.";
      }},
      { text: 'Défoncer sa porte (Risqué)', action: (p) => {
          if (Math.random() > 0.7) {
              p.happiness = Math.min(100, p.happiness + 15);
              return "Vous fermez le robinet laissé ouvert par le DJ ivre mort. Il s'excuse et vous donne un vinyle dédicacé.";
          } else {
              return { prison: true, baseFine: 1500, reason: "Violation de domicile et dégradation", msg: "Vous avez défoncé la porte, mais il n'y avait personne. Par contre, les flics alertés par le bruit, si." };
          }
      }}
    ]
  },

  // 13. L'oubli fatal
  {
    id: 'forgotten_anniversary',
    title: 'Amnésie Conjugale',
    condition: (p) => p.status.isMarried,
    description: 'Votre conjoint(e) rentre du travail avec un regard glacial. "Tu sais quel jour on est aujourd\'hui ?"... Vous avez complètement oublié votre anniversaire de mariage.',
    choices: [
      { text: 'Acheter un bijou hors de prix en urgence (800€)', action: (p) => {
          p.money -= 800;
          p.happiness = Math.max(0, p.happiness - 5);
          return "Vous avez couru à la bijouterie. Le couple est sauvé, mais votre banquier vous déteste.";
      }},
      { text: 'Tenter le gaslighting ("Mais on a fêté ça hier !")', action: (p) => {
          p.happiness = Math.max(0, p.happiness - 35);
          return "Pire idée. Vous prenez une assiette en pleine figure et dormez sur le paillasson.";
      }},
      { text: 'Simuler un malaise vagal (Gratuit)', action: (p) => {
          if (Math.random() > 0.5) {
              p.happiness = Math.min(100, p.happiness + 5);
              return "Vous tombez dans les pommes. Panique générale. L'anniversaire est oublié, la pitié l'emporte !";
          } else {
              p.money -= 500;
              p.happiness = Math.max(0, p.happiness - 20);
              return "Les pompiers arrivent, vous facturent l'intervention abusive, et votre conjoint(e) demande le divorce.";
          }
      }}
    ]
  },

  // 14. La trahison domotique
  {
    id: 'smart_speaker_gossip',
    title: 'Haut-Parleur Indiscret',
    condition: (p) => p.age >= 18,
    description: 'Votre enceinte connectée a enregistré votre imitation désastreuse de Céline Dion sous la douche et l\'a envoyée à tout votre répertoire pro.',
    choices: [
      { text: 'Assumer et demander des retours', action: (p) => {
          p.happiness = Math.max(0, p.happiness - 15);
          return "Vos collègues font des mèmes sur vous. Votre ego est brisé, mais vous lancez la mode du karaoké au bureau.";
      }},
      { text: 'S\'exiler dans la forêt', action: (p) => {
          if (p.job) p.job = null;
          p.happiness = Math.max(0, p.happiness - 30);
          return "La honte est trop forte. Vous posez votre démission, jetez votre téléphone et pleurez en mangeant des baies.";
      }},
      { text: 'Faire un procès au fabricant (Risqué)', action: (p) => {
          if (Math.random() > 0.8) {
              p.money += 15000;
              p.happiness = Math.min(100, p.happiness + 20);
              return "Vos avocats prouvent l'atteinte à la vie privée. Vous empochez un énorme dédommagement !";
          } else {
              p.money -= 3000;
              p.happiness = Math.max(0, p.happiness - 20);
              return "La multinationale vous écrase au tribunal. Vous devez payer leurs frais d'avocats. Vous haïssez la technologie.";
          }
      }}
    ]
  },

  // 15. L'arnaque à la livraison
  {
    id: 'fake_package_sms',
    title: 'Colis Bloqué',
    condition: (p) => p.money >= 50,
    description: 'Vous recevez un SMS : "Info Chrono: Votre colis est bloqué en douane. Veuillez régler 2,99€ pour le débloquer." Vous attendez justement une commande.',
    choices: [
      { text: 'Payer les 2,99€', action: (p) => {
          p.money -= 850; // Fraude à la carte bancaire
          p.happiness = Math.max(0, p.happiness - 25);
          return "Félicitations, vous venez de donner vos coordonnées bancaires à un hacker russe. Votre compte est vidé dans la nuit.";
      }},
      { text: 'Ignorer le message', action: (p) => {
          p.happiness = Math.min(100, p.happiness + 5);
          return "C'était bien une arnaque ! Vous vous félicitez pour votre clairvoyance numérique.";
      }},
      { text: 'Tracer et menacer le numéro (Risqué)', action: (p) => {
          if (Math.random() > 0.6) {
              p.happiness = Math.min(100, p.happiness + 15);
              return "Vous lui envoyez ses propres coordonnées géographiques. Le brouteur panique et supprime son compte.";
          } else {
              return { prison: true, baseFine: 800, reason: "Menaces de mort sur internet", msg: "L'arnaqueur a porté plainte contre vous. La police ne rigole pas avec ça, même si c'était un escroc." };
          }
      }}
    ]
  },

  // 16. La bonne résolution du 1er janvier
  {
    id: 'gym_guilt',
    title: 'L\'Illusion Sportive',
    condition: (p) => p.money > 350,
    description: 'C\'est décidé, vous vous reprenez en main ! La salle de sport en bas de chez vous propose un abonnement annuel non résiliable.',
    choices: [
      { text: 'S\'inscrire et y aller vraiment (350€)', action: (p) => {
          p.money -= 350;
          p.happiness = Math.min(100, p.happiness + 15);
          return "Vos courbatures vous font hurler, mais au bout d'un mois, vous vous sentez incroyablement bien !";
      }},
      { text: 'S\'inscrire pour la conscience (350€)', action: (p) => {
          p.money -= 350;
          p.happiness = Math.max(0, p.happiness - 10);
          return "Vous y allez une fois le 3 janvier. Le reste de l'année, le prélèvement automatique vous rappelle votre lâcheté.";
      }},
      { text: 'Faire des pompes dans le salon (Gratuit)', action: (p) => {
          p.happiness = Math.max(0, p.happiness - 5);
          return "Vous cassez un vase en faisant des burpees. Vous abandonnez au bout de 4 minutes pour regarder Netflix.";
      }}
    ]
  },

  // 17. Le blâme au travail
  {
    id: 'boss_bad_joke',
    title: 'Humour Patronal',
    condition: (p) => p.job !== null,
    description: 'À la machine à café, le patron fait une blague lourde, vraiment malaisante et à la limite du légal. Tout le monde attend votre réaction.',
    choices: [
      { text: 'Rire bruyamment', action: (p) => {
          p.happiness = Math.max(0, p.happiness - 15);
          return "Vous vous vendez pour un sourire du chef. Vos collègues vous méprisent, votre dignité est en miettes.";
      }},
      { text: 'Lui dire que ce n\'est pas drôle', action: (p) => {
          if (Math.random() > 0.5) {
              p.happiness = Math.min(100, p.happiness + 20);
              return "Un silence de mort s'installe. Le boss s'excuse. Vous êtes le héros respecté de l'open space !";
          } else {
              if (p.job) p.job = null;
              p.happiness = Math.max(0, p.happiness - 30);
              return "Il prend très mal la remarque et vous trouve une faute grave dans l'heure. Vous êtes viré(e).";
          }
      }},
      { text: 'Faire chanter le patron avec l\'enregistrement (Risqué)', action: (p) => {
          if (Math.random() > 0.7) {
              p.money += 3000;
              p.happiness = Math.min(100, p.happiness + 10);
              return "Vous obtenez une belle 'prime de silence' et une augmentation. Vous avez vendu votre âme, mais au prix fort.";
          } else {
              return { prison: true, baseFine: 4000, reason: "Chantage à l'employeur", msg: "Il avait son propre enregistrement de la conversation. Les RH et la police vous attendent dans son bureau." };
          }
      }}
    ]
  },

  // 18. L'injustice du quotidien
  {
    id: 'unfair_parking_ticket',
    title: 'Le PV Express',
    condition: (p) => p.money >= 135,
    description: 'Vous êtes arrêté deux minutes en double file pour déposer une lettre, moteur allumé. Un agent vous colle un PV électronique sans un mot.',
    choices: [
      { text: 'Payer l\'amende (135€)', action: (p) => {
          p.money -= 135;
          p.happiness = Math.max(0, p.happiness - 15);
          return "La rage intérieure vous consume pendant une semaine, mais la loi c'est la loi.";
      }},
      { text: 'L\'insulter copieusement', action: (p) => {
          p.money -= 500;
          p.happiness = Math.max(0, p.happiness - 30);
          return "L'agent sourit, ajoute 'Outrage à agent' et appelle la fourrière. Votre compte bancaire est en soins intensifs.";
      }},
      { text: 'Démarrer en trombe pour fuir (Risqué)', action: (p) => {
          if (Math.random() > 0.5) {
              p.happiness = Math.min(100, p.happiness + 20);
              return "Vous vous échappez tel un pilote de rallye. L'agent n'a pas eu le temps de noter la plaque. Adrénaline pure !";
          } else {
              return { prison: true, baseFine: 2500, reason: "Délit de fuite et refus d'obtempérer", msg: "Dans votre panique, vous avez reculé dans la moto de police. C'est dommage." };
          }
      }}
    ]
  },

  // 19. Le fardeau social
  {
    id: 'distant_cousin_wedding',
    title: 'Le Mariage Éloigné',
    condition: (p) => p.money > 600,
    description: 'Un cousin au second degré que vous n\'avez pas vu depuis 15 ans vous invite à son mariage en plein milieu de nulle part.',
    choices: [
      { text: 'Y aller par obligation familiale (600€)', action: (p) => {
          p.money -= 600;
          p.happiness = Math.max(0, p.happiness - 10);
          return "L'hôtel est minable, le vin est bouchonné et vous êtes assis à la table des enfants.";
      }},
      { text: 'Prétexter le Covid (Gratuit)', action: (p) => {
          p.happiness = Math.min(100, p.happiness + 5);
          return "Le mensonge parfait. Vous passez le week-end en pyjama à manger de la pizza sur le canapé.";
      }},
      { text: 'Y aller juste pour voler l\'urne (Risqué)', action: (p) => {
          if (Math.random() > 0.7) {
              p.money += 2500;
              p.happiness = Math.min(100, p.happiness + 15);
              return "Vous disparaissez pendant la chenille avec l'urne pleine de chèques et d'enveloppes. Honteux, mais rentable.";
          } else {
              return { prison: true, baseFine: 1500, reason: "Vol aggravé dans un événement privé", msg: "La tante Gisèle vous a plaqué au sol pendant que vous preniez l'urne. Elle est ancienne judokate." };
          }
      }}
    ]
  },

  // 20. La fatalité absolue
  {
    id: 'pigeon_target',
    title: 'Tir de Précision',
    condition: (p) => true,
    description: 'Vous vous rendez à un entretien ou rendez-vous crucial. Soudain, un pigeon vous cible avec une précision chirurgicale sur votre veste propre.',
    choices: [
      { text: 'Acheter une nouvelle veste en urgence (150€)', action: (p) => {
          p.money -= 150;
          p.happiness = Math.min(100, p.happiness + 5);
          return "Vous arrivez impeccable, mais avec 150€ de moins. Maudits volatiles.";
      }},
      { text: 'Essuyer avec un mouchoir et y aller', action: (p) => {
          p.happiness = Math.max(0, p.happiness - 20);
          return "Une énorme tache suspecte trône sur votre épaule. Les gens vous évitent. Vous dégagez une aura de défaite.";
      }},
      { text: 'Attaquer le pigeon avec des cailloux (Risqué)', action: (p) => {
          if (Math.random() > 0.6) {
              p.happiness = Math.min(100, p.happiness + 15);
              return "Vous effrayez tout le troupeau. Ça ne nettoie pas votre veste, mais la vengeance libère l'esprit.";
          } else {
              return { prison: true, baseFine: 300, reason: "Cruauté envers les animaux de l'espace public", msg: "Une association de défense des oiseaux urbains passait par là. Vous êtes embarqué pour agressivité manifeste." };
          }
      }}
    ]
  },
  
  // 21. La santé qui lâche
  {
    id: 'mysterious_back_pain',
    title: 'Le Poids des Années',
    condition: (p) => p.age >= 30,
    description: 'Vous vous réveillez avec le dos totalement bloqué. Votre crime ? Avoir dormi dans une position "légèrement trop à gauche" cette nuit.',
    choices: [
      { text: 'Payer un ostéopathe hors de prix (80€)', action: (p) => {
          p.money -= 80;
          p.happiness = Math.min(100, p.happiness + 5);
          return "Il vous a fait craquer des os dont vous ignoriez l'existence. Ça va mieux, mais votre compte est allégé.";
      }},
      { text: 'Se gaver d\'anti-inflammatoires et boiter', action: (p) => {
          p.happiness = Math.max(0, p.happiness - 15);
          return "Vous marchez comme un zombie pendant deux semaines. Les gens vous cèdent leur place dans le bus par pitié.";
      }},
      { text: 'Acheter un lit médicalisé volé (Risqué)', action: (p) => {
          if (Math.random() > 0.6) {
              p.money -= 200;
              p.happiness = Math.min(100, p.happiness + 20);
              return "Confort incroyable ! Vous dormez comme un bébé et votre dos est guéri pour une bouchée de pain.";
          } else {
              return { prison: true, baseFine: 1000, reason: "Recel de matériel hospitalier", msg: "Le lit appartenait à l'EHPAD municipal. La police vous a réveillé en pleine sieste pour vous embarquer." };
          }
      }}
    ]
  },

  // 22. Le drame parental / familial
  {
    id: 'toddler_tantrum_public',
    title: 'Le Caprice Nucléaire',
    condition: (p) => p.age > 25,
    description: 'En plein centre commercial bondé, votre enfant (ou votre neveu/nièce si vous n\'en avez pas) se jette par terre en hurlant parce que "l\'eau est trop mouillée".',
    choices: [
      { text: 'Acheter la paix avec un jouet (40€)', action: (p) => {
          p.money -= 40;
          p.happiness = Math.max(0, p.happiness - 10);
          return "Le silence est revenu, mais vous savez que vous avez perdu la guerre éducative. Honte totale.";
      }},
      { text: 'Le laisser hurler et ignorer les regards', action: (p) => {
          p.happiness = Math.max(0, p.happiness - 25);
          return "Dix minutes d'apocalypse. Une dame âgée vous a même fait la morale. Votre santé mentale est anéantie.";
      }},
      { text: 'Faire une crise par terre avec lui (Gratuit)', action: (p) => {
          p.happiness = Math.min(100, p.happiness + 15);
          return "Vous vous jetez au sol en criant plus fort que lui. L'enfant s'arrête, choqué. Le centre commercial applaudit. Victoire !";
      }}
    ]
  },

  // 23. La vie d'entreprise insupportable
  {
    id: 'team_building_hell',
    title: 'Séminaire de l\'Enfer',
    condition: (p) => p.job !== null,
    description: 'La direction organise un "Team Building" obligatoire ce week-end. Au programme : construire un radeau en carton avec le service comptabilité.',
    choices: [
      { text: 'Participer avec un sourire forcé', action: (p) => {
          p.happiness = Math.max(0, p.happiness - 20);
          return "Votre radeau a coulé en 5 secondes, l'eau du lac était glaciale et Gérard de la compta a monopolisé le buffet.";
      }},
      { text: 'Feindre une gastro-entérite foudroyante', action: (p) => {
          p.happiness = Math.min(100, p.happiness + 10);
          return "Vous restez sous un plaid avec une tisane pendant que vos collègues attrapent une pneumonie. Le bonheur pur.";
      }},
      { text: 'Saboter le radeau du patron (Risqué)', action: (p) => {
          if (Math.random() > 0.6) {
              p.happiness = Math.min(100, p.happiness + 30);
              return "Vous avez percé le carton du directeur en douce. Le voir couler avec son costard a été le plus beau jour de votre vie.";
          } else {
              if (p.job) p.job = null; // Viré
              return { prison: true, baseFine: 800, reason: "Mise en danger d'autrui", msg: "Il y avait une caméra GoPro sur le bateau... Vous êtes licencié(e) pour faute lourde et poursuivi(e) en justice." };
          }
      }}
    ]
  },

  // 24. L'urgence vétérinaire
  {
    id: 'vet_extortion',
    title: 'Diagnostic Canin',
    condition: (p) => p.money > 600,
    description: 'Votre chien (ou le chat du voisin que vous gardez) a mangé une chaussette. Le vétérinaire propose une "chirurgie préventive endoscopique au laser".',
    choices: [
      { text: 'Payer l\'opération hors de prix (600€)', action: (p) => {
          p.money -= 600;
          p.happiness = Math.max(0, p.happiness - 10);
          return "L'animal est sauvé, mais vous vous rendez compte que le vétérinaire conduit une Porsche cayenne grâce à vous.";
      }},
      { text: 'Attendre que ça ressorte naturellement', action: (p) => {
          if (Math.random() > 0.5) {
              p.happiness = Math.min(100, p.happiness + 10);
              return "La nature est bien faite. Quelques jours de stress plus tard, la chaussette refait surface. L'économie est totale !";
          } else {
              p.money -= 1200; // Doublement du prix de l'urgence
              p.happiness = Math.max(0, p.happiness - 30);
              return "Complication grave au milieu de la nuit. L'intervention coûte le double et vous culpabilisez à mort.";
          }
      }}
    ]
  },

  // 25. La technologie capricieuse
  {
    id: 'toilet_phone',
    title: 'Plongeon Technologique',
    condition: (p) => p.money > 300,
    description: 'En scrollant sur les réseaux sociaux aux toilettes, votre téléphone glisse de vos mains et fait un magnifique "plouf" dans la cuvette.',
    choices: [
      { text: 'Acheter un nouveau smartphone (800€)', action: (p) => {
          p.money -= 800;
          p.happiness = Math.max(0, p.happiness - 20);
          return "Vous repartez à neuf, mais votre banquier vous appelle pour vous demander si tout va bien psychologiquement.";
      }},
      { text: 'Acheter un vieux téléphone à touches (50€)', action: (p) => {
          p.money -= 50;
          p.happiness = Math.max(0, p.happiness - 5);
          return "Vous passez pour un hipster, vous ne pouvez plus lire vos mails, mais votre temps d'écran a miraculeusement baissé.";
      }},
      { text: 'Faire une fausse déclaration d\'assurance (Risqué)', action: (p) => {
          if (Math.random() > 0.7) {
              p.money += 800; // Remboursement
              p.happiness = Math.min(100, p.happiness + 15);
              return "L'assurance a cru à votre histoire d'agression par un goéland. Vous empochez le remboursement !";
          } else {
              return { prison: true, baseFine: 1500, reason: "Fraude à l'assurance", msg: "L'expert a trouvé de l'eau bleue de canard WC dans les composants. Vous êtes poursuivi(e) pour escroquerie." };
          }
      }}
    ]
  },

  // 26. Les joies du voisinage
  {
    id: 'sunday_diy',
    title: 'La Perceuse du Dimanche',
    condition: (p) => p.age >= 21,
    description: 'Il est 7h du matin, un dimanche. Votre voisin du dessous a décidé de percer un trou dans un mur porteur. La vibration secoue vos dents.',
    choices: [
      { text: 'Mettre des bouchons d\'oreilles et pleurer', action: (p) => {
          p.happiness = Math.max(0, p.happiness - 15);
          return "Vous dormez mal, vous vous réveillez fatigué(e) et aigri(e). Une belle journée qui commence.";
      }},
      { text: 'Aller râler en pyjama', action: (p) => {
          if (Math.random() > 0.5) {
              p.happiness = Math.min(100, p.happiness + 10);
              return "Étonnamment, le voisin s'excuse platement et vous offre des croissants. Une belle victoire sociale !";
          } else {
              p.happiness = Math.max(0, p.happiness - 25);
              return "Il vous insulte, vous claque la porte au nez et recommence à percer encore plus fort. Défaite cuisante.";
          }
      }},
      { text: 'Couper l\'électricité de l\'immeuble (Risqué)', action: (p) => {
          if (Math.random() > 0.8) {
              p.happiness = Math.min(100, p.happiness + 20);
              return "Silence absolu. Personne ne sait que c'est vous. Vous retournez vous coucher avec le sourire d'un génie du mal.";
          } else {
              return { prison: true, baseFine: 500, reason: "Dégradation des parties communes", msg: "Le gardien de l'immeuble vous a surpris(e) avec la pince coupante dans le local électrique. Direct au poste." };
          }
      }}
    ]
  },

  // 27. L'achats compulsif
  {
    id: 'accidental_bid',
    title: 'L\'Enchère Somnambule',
    condition: (p) => p.money > 1000,
    description: 'À moitié endormi(e) devant la télé, vous avez accidentellement remporté une enchère eBay pour une armure de chevalier du 14e siècle.',
    choices: [
      { text: 'Assumer et payer (1000€)', action: (p) => {
          p.money -= 1000;
          p.happiness = Math.min(100, p.happiness + 10);
          return "C'est ruineux, mais l'armure claque dans votre salon. Vous la portez pour passer l'aspirateur le dimanche.";
      }},
      { text: 'Ignorer le vendeur et supprimer son compte', action: (p) => {
          p.happiness = Math.max(0, p.happiness - 10);
          return "Le vendeur vous harcèle de messages. Vous vivez dans la peur qu'un collectionneur furieux débarque chez vous.";
      }}
    ]
  },

  // 28. Le conflit de couple
  {
    id: 'inlaw_vacation',
    title: 'Proposition Indécente',
    condition: (p) => p.status.isMarried && p.money > 1500,
    description: 'Votre conjoint(e) annonce fièrement : "J\'ai loué une maison dans le Sud pour les vacances ! Ah, au fait, mes parents viennent avec nous."',
    choices: [
      { text: 'Payer votre part et subir (1500€)', action: (p) => {
          p.money -= 1500;
          p.happiness = Math.max(0, p.happiness - 35);
          return "Quinze jours à vous faire critiquer sur votre façon de couper le pain. Le pire investissement de votre vie.";
      }},
      { text: 'Mettre un veto absolu', action: (p) => {
          p.happiness = Math.max(0, p.happiness - 20);
          return "La dispute a duré 4 jours. Vous restez chez vous pour les vacances, dans une ambiance de guerre froide.";
      }},
      { text: 'Payer un acteur pour jouer un cambrioleur (Risqué)', action: (p) => {
          if (Math.random() > 0.6) {
              p.money -= 300; // Paye l'acteur
              p.happiness = Math.min(100, p.happiness + 25);
              return "L'acteur effraie la belle-famille qui repart illico le premier soir. Vous profitez de la piscine en solo. Génial !";
          } else {
              return { prison: true, baseFine: 3000, reason: "Simulation de délit et trouble à l'ordre public", msg: "L'acteur a paniqué quand votre beau-père a sorti un fusil de chasse. La gendarmerie a découvert toute la supercherie." };
          }
      }}
    ]
  },

  // 29. L'erreur bancaire en votre faveur
  {
    id: 'atm_glitch',
    title: 'Le Distributeur Fou',
    condition: (p) => true,
    description: 'Vous retirez 20€ au distributeur, mais la machine dysfonctionne et crache une liasse de billets de 50€, sans les débiter de votre compte.',
    choices: [
      { text: 'Rendre l\'argent à la banque', action: (p) => {
          p.happiness = Math.max(0, p.happiness - 10);
          return "Le conseiller bancaire vous prend les billets sans même dire merci. Vous vous sentez honnête, mais surtout idiot(e).";
      }},
      { text: 'Prendre l\'argent discrètement (Gagne 1000€) (Risqué)', action: (p) => {
          if (Math.random() > 0.4) { // Hautement risqué
              p.money += 1000;
              p.happiness = Math.min(100, p.happiness + 30);
              return "L'erreur n'a jamais été tracée ! Vous dépensez cet argent tombé du ciel dans des futilités absolues.";
          } else {
              return { prison: true, baseFine: 3000, reason: "Vol par captation illicite", msg: "La caméra du distributeur vous a filmé en train de danser de joie avec les billets. La banque a porté plainte." };
          }
      }}
    ]
  },

  // 30. Le drame esthétique
  {
    id: 'haircut_disaster',
    title: 'Le Massacre Capillaire',
    condition: (p) => p.money > 30,
    description: 'Vous essayez un nouveau coiffeur. Il discute avec sa collègue en coupant et vous fait un "dégradé audacieux" qui vous donne l\'air d\'un ananas malade.',
    choices: [
      { text: 'Payer et dire "c\'est parfait merci" (30€)', action: (p) => {
          p.money -= 30;
          p.happiness = Math.max(0, p.happiness - 20);
          return "Vous pleurez dans votre voiture en rentrant. Vous portez un bonnet pendant un mois, même au bureau.";
      }},
      { text: 'Raser la tête complètement', action: (p) => {
          p.happiness = Math.min(100, p.happiness + 5);
          return "Vous assumez le look crâne rasé. Les gens pensent que vous êtes devenu un moine shaolin très philosophe.";
      }},
      { text: 'Fuir sans payer en courant (Risqué)', action: (p) => {
          if (Math.random() > 0.7) {
              p.happiness = Math.min(100, p.happiness + 10);
              return "Vous avez sprinté avec la blouse pleine de cheveux. L'adrénaline compense la laideur de votre coiffure.";
          } else {
              return { prison: true, baseFine: 150, reason: "Filouterie d'aliment ou de service", msg: "Le coiffeur vous a rattrapé dans la rue avec ses ciseaux. La police vous a arrêté pour grivèlerie." };
          }
      }}
    ]
  },
  
  // 31. Le cauchemar suédois
  {
    id: 'ikea_nightmare',
    title: 'L\'Épreuve Suédoise',
    condition: (p) => p.money > 200,
    description: 'Vous décidez de monter le meuble TV "KÅRBÖK" sans la notice. Au bout de 4 heures, il vous reste 12 vis, et la planche principale est à l\'envers.',
    choices: [
      { text: 'Pleurer et racheter le même meuble (200€)', action: (p) => {
          p.money -= 200;
          p.happiness = Math.max(0, p.happiness - 15);
          return "Vous avez baissé les bras. Le deuxième essai est bon, mais votre fierté d'adulte indépendant est anéantie.";
      }},
      { text: 'Le laisser comme ça et parler d\'Art', action: (p) => {
          p.happiness = Math.max(0, p.happiness - 5);
          return "La télé est de travers, le meuble tangue, mais vous persuadez vos amis que c'est un concept de design déconstructiviste.";
      }},
      { text: 'Brûler le meuble pour toucher l\'assurance (Risqué)', action: (p) => {
          if (Math.random() > 0.7) {
              p.money += 400; // Remboursement gonflé
              p.happiness = Math.min(100, p.happiness + 10);
              return "L'expert de l'assurance n'a vu que des cendres. Vous empochez le double du prix d'achat !";
          } else {
              return { prison: true, baseFine: 2500, reason: "Incendie volontaire et fraude", msg: "L'incendie a détruit le paillasson du voisin. Les pompiers et la police ont vite compris votre petit jeu." };
          }
      }}
    ]
  },

  // 32. L'erreur de messagerie fatale
  {
    id: 'reply_all_disaster',
    title: 'Le "Répondre à tous"',
    condition: (p) => p.job !== null,
    description: 'Vous répondez à un email de votre boss en le traitant de "tyran incompétent". Vous réalisez avec effroi que vous avez cliqué sur "Répondre à tous".',
    choices: [
      { text: 'Assumer et poser sa démission', action: (p) => {
          if (p.job) p.job = null;
          p.happiness = Math.min(100, p.happiness + 20);
          return "Vous quittez le bureau sous les applaudissements silencieux de vos collègues. Vous êtes au chômage, mais libre !";
      }},
      { text: 'Plaider le piratage informatique', action: (p) => {
          if (Math.random() > 0.5) {
              p.happiness = Math.max(0, p.happiness - 10);
              return "Personne n'y croit vraiment, mais par flemme administrative, les RH laissent couler. Ambiance glaciale au bureau.";
          } else {
              if (p.job) p.job = null;
              p.happiness = Math.max(0, p.happiness - 30);
              return "Le service IT a prouvé que c'était bien vous. Licenciement pour faute grave avec humiliation publique.";
          }
      }},
      { text: 'Saboter le serveur mail de l\'entreprise (Risqué)', action: (p) => {
          if (Math.random() > 0.8) {
              p.happiness = Math.min(100, p.happiness + 30);
              return "Vous arrachez les câbles du serveur. Les mails du jour sont perdus. Vous avez sauvé votre peau in extremis !";
          } else {
              if (p.job) p.job = null;
              return { prison: true, baseFine: 6000, reason: "Destruction de matériel informatique d'entreprise", msg: "Le vigile vous a trouvé dans la salle serveurs avec une pince coupante. Mauvaise idée." };
          }
      }}
    ]
  },

  // 33. Le déclassement social des VTC
  {
    id: 'uber_rating_drop',
    title: 'Paria de la Mobilité',
    condition: (p) => p.money > 50,
    description: 'Votre note sur l\'application de VTC vient de chuter à 3.2. Plus aucun chauffeur ne veut vous prendre. Il pleut à verse et vous avez un rendez-vous.',
    choices: [
      { text: 'Proposer un pourboire cash indécent (100€)', action: (p) => {
          p.money -= 100;
          p.happiness = Math.max(0, p.happiness - 5);
          return "Un chauffeur accepte. Le trajet s'effectue dans un silence pesant, mais vous arrivez au sec.";
      }},
      { text: 'Marcher sous la pluie battante', action: (p) => {
          p.happiness = Math.max(0, p.happiness - 25);
          return "Vous arrivez au rendez-vous trempé(e), sentant le chien mouillé. Votre dignité s'est évaporée.";
      }},
      { text: 'Voler une trottinette électrique (Risqué)', action: (p) => {
          if (Math.random() > 0.6) {
              p.happiness = Math.min(100, p.happiness + 15);
              return "Vous forcez le cadenas d'une trottinette libre-service et roulez à toute vitesse. Vous vous sentez comme un rebelle urbain !";
          } else {
              return { prison: true, baseFine: 800, reason: "Vol et dégradation de bien public", msg: "La trottinette était géolocalisée et avait une alarme assourdissante. La police vous attendait au carrefour." };
          }
      }}
    ]
  },

  // 34. Le Prince Nigérian
  {
    id: 'nigerian_prince',
    title: 'L\'Héritage Royal',
    condition: (p) => p.money > 1000,
    description: 'Un prince étranger vous contacte par mail. Il a besoin de 1000€ pour débloquer sa fortune de 50 millions et promet de la partager avec vous.',
    choices: [
      { text: 'Envoyer les 1000€', action: (p) => {
          p.money -= 1000;
          p.happiness = Math.max(0, p.happiness - 35);
          return "Incroyable, c'était une arnaque ! Vous attendez toujours le virement de 25 millions. Le désespoir vous guette.";
      }},
      { text: 'Mettre dans les spams et rire', action: (p) => {
          p.happiness = Math.min(100, p.happiness + 5);
          return "Vous vous sentez supérieur(e) à ces escrocs d'internet. Une bonne dose d'ego pour la journée.";
      }},
      { text: 'Arnaquer l\'arnaqueur (Risqué)', action: (p) => {
          if (Math.random() > 0.7) {
              p.money += 200;
              p.happiness = Math.min(100, p.happiness + 25);
              return "Vous lui facturez des 'frais de dossier' de 200€ qu'il paie vraiment ! Vous êtes le maître absolu de l'escroquerie.";
          } else {
              return { prison: true, baseFine: 2000, reason: "Participation à un réseau de blanchiment", msg: "En jouant avec lui, vous avez fourni vos coordonnées bancaires. Vous avez été impliqué(e) dans son réseau criminel par la brigade financière." };
          }
      }}
    ]
  },

  // 35. Le piège gastronomique
  {
    id: 'minimalist_restaurant',
    title: 'Gastronomie Minimaliste',
    condition: (p) => p.money > 300,
    description: 'Vous dinez dans un restaurant très branché. On vous sert un "nuage de céleri sur son lit de cailloux". L\'addition est de 300€ et vous avez extrêmement faim.',
    choices: [
      { text: 'Payer et aller au kebab en sortant (320€)', action: (p) => {
          p.money -= 320;
          p.happiness = Math.max(0, p.happiness - 10);
          return "Vous avez sauvé les apparences devant les snobs, mais votre vrai bonheur fut le kebab supplément frites à la sortie.";
      }},
      { text: 'Lécher l\'assiette et les cailloux', action: (p) => {
          p.money -= 300;
          p.happiness = Math.max(0, p.happiness - 25);
          return "Les autres clients vous filment avec dégoût. Vous payez quand même la somme astronomique. Dépression totale.";
      }},
      { text: 'Partir en courant sans payer (Risqué)', action: (p) => {
          if (Math.random() > 0.6) {
              p.happiness = Math.min(100, p.happiness + 20);
              return "Le sprint de votre vie ! Vous disparaissez dans la nuit avec l'adrénaline et 300€ d'économisés.";
          } else {
              return { prison: true, baseFine: 1500, reason: "Grivèlerie dans un établissement étoilé", msg: "Le vigile du restaurant s'avère être un ancien champion olympique de sprint. Il vous a plaqué sur le trottoir." };
          }
      }}
    ]
  },

  // 36. L'appel fessier
  {
    id: 'pocket_dial_inlaw',
    title: 'L\'Appel Fessier',
    condition: (p) => p.status.isMarried && p.money >= 150,
    description: 'Votre téléphone dans votre poche a appelé la belle-famille pendant que vous les imitiez bruyamment en critiquant leurs repas insipides.',
    choices: [
      { text: 'Offrir un cadeau hors de prix (150€)', action: (p) => {
          p.money -= 150;
          p.happiness = Math.max(0, p.happiness - 15);
          return "Vous achetez la paix avec du parfum de luxe. Ils vous détestent toujours, mais ils ont accepté le cadeau.";
      }},
      { text: 'Accuser la 5G d\'avoir piraté votre voix', action: (p) => {
          p.happiness = Math.max(0, p.happiness - 30);
          return "Personne n'a cru à votre théorie du complot. Les repas de famille seront désormais un enfer silencieux et pesant.";
      }},
      { text: 'Fouiller leur maison pour trouver de quoi les faire chanter (Risqué)', action: (p) => {
          if (Math.random() > 0.8) {
              p.happiness = Math.min(100, p.happiness + 15);
              return "Vous trouvez une dette de jeu de votre beau-père. Destruction mutuelle assurée. Le secret de votre appel restera enfoui !";
          } else {
              return { prison: true, baseFine: 2000, reason: "Violation de domicile", msg: "Ils vous ont surpris(e) en train de fouiller dans leur table de chevet. La police a été appelée illico." };
          }
      }}
    ]
  },

  // 37. L'endoctrinement amical
  {
    id: 'weird_cult_retreat',
    title: 'Retraite Spirituelle',
    condition: (p) => p.age > 22 && p.money >= 500,
    description: 'Un ami vous traîne à un "stage de reconnexion". Vous réalisez vite que c\'est une secte étrange qui vénère une courgette géante cosmique.',
    choices: [
      { text: 'Payer pour partir discrètement (500€)', action: (p) => {
          p.money -= 500;
          p.happiness = Math.max(0, p.happiness - 10);
          return "Vous signez un chèque 'pour les bonnes ondes' et fuyez au milieu de la nuit à travers les bois.";
      }},
      { text: 'Faire semblant d\'être possédé par la courgette', action: (p) => {
          p.happiness = Math.min(100, p.happiness + 20);
          return "Vous bavez, tremblez et criez des recettes de gratin. Terrifiés, ils vous jettent dehors gratuitement. Oscar du meilleur acteur !";
      }},
      { text: 'Vider la boîte des offrandes (Risqué)', action: (p) => {
          if (Math.random() > 0.5) {
              p.money += 1200;
              p.happiness = Math.min(100, p.happiness + 15);
              return "La courgette cosmique a été généreuse aujourd'hui ! Vous rentrez chez vous avec l'argent des adeptes.";
          } else {
              return { prison: true, baseFine: 4000, reason: "Vol en bande (vous et la courgette) et escroquerie", msg: "Les gourous vous ont coincé(e) avant de vous livrer aux autorités. Votre illumination a tourné court." };
          }
      }}
    ]
  },

  // 38. La désillusion totale
  {
    id: 'lottery_illusion',
    title: 'Le Ticket (Presque) Gagnant',
    condition: (p) => p.money >= 50,
    description: 'Vous grattez un ticket et voyez les trois symboles Jackpot ! Avant de réaliser que vous avez besoin de lunettes... c\'était un 7, pas un 1.',
    choices: [
      { text: 'Déchirer le ticket et pleurer', action: (p) => {
          p.happiness = Math.max(0, p.happiness - 25);
          return "Pendant 5 secondes, vous vous êtes vu(e) aux Bahamas. La chute émotionnelle vous donne des vertiges.";
      }},
      { text: 'Racheter 10 tickets par frustration (50€)', action: (p) => {
          p.money -= 50;
          p.happiness = Math.max(0, p.happiness - 15);
          return "Vous avez perdu encore plus d'argent. Le buraliste vous regarde avec pitié.";
      }},
      { text: 'Falsifier le ticket au stylo rouge (Risqué)', action: (p) => {
          if (Math.random() > 0.8) {
              p.money += 500;
              p.happiness = Math.min(100, p.happiness + 10);
              return "La machine du buraliste est en panne, il vous paie en liquide sans trop regarder. C'est le braquage le plus triste de l'histoire.";
          } else {
              return { prison: true, baseFine: 1000, reason: "Falsification de titre de jeu", msg: "La Française des Jeux n'a pas beaucoup rigolé en scannant votre coup de marqueur." };
          }
      }}
    ]
  },

  // 39. L'origine du mal
  {
    id: 'mystery_odor',
    title: 'L\'Odeur Suspecte',
    condition: (p) => p.money >= 300,
    description: 'Une odeur immonde flotte dans votre appartement depuis 3 jours. Impossible de trouver la source. Ça sent la mort et le camembert oublié.',
    choices: [
      { text: 'Payer une société de nettoyage (300€)', action: (p) => {
          p.money -= 300;
          p.happiness = Math.min(100, p.happiness + 10);
          return "Ils ont trouvé une pomme de terre en putréfaction totale derrière le frigo. Votre appartement sent à nouveau la lavande.";
      }},
      { text: 'Vivre avec des pinces à linge sur le nez', action: (p) => {
          p.happiness = Math.max(0, p.happiness - 35);
          return "Vos amis ne viennent plus vous voir. Votre logement devient une zone de quarantaine. Votre moral s'effondre.";
      }},
      { text: 'Accuser le voisin et forcer sa porte (Risqué)', action: (p) => {
          if (Math.random() > 0.7) {
              p.happiness = Math.min(100, p.happiness + 15);
              return "Vous aviez raison ! Son poulet avait pourri sur le palier. Vous jetez l'offense et passez pour un justicier.";
          } else {
              return { prison: true, baseFine: 1200, reason: "Effraction et dégradation", msg: "L'odeur venait de chez vous finalement. Et la police vous a arrêté dans le salon du voisin." };
          }
      }}
    ]
  },

  // 40. L'expérience médicale
  {
    id: 'dark_web_pill',
    title: 'La Pilule Miracle',
    condition: (p) => p.age > 40 && p.money >= 200,
    description: 'Crise de la quarantaine : vous achetez une pilule sur internet censée vous rajeunir de 10 ans. La boîte n\'a pas d\'étiquette, juste une tête de mort dessinée au marqueur.',
    choices: [
      { text: 'La jeter aux toilettes', action: (p) => {
          p.happiness = Math.min(100, p.happiness + 5);
          return "Vous perdez votre argent, mais vous vous sentez mature et sage. La vieillesse a du bon.";
      }},
      { text: 'L\'avaler courageusement', action: (p) => {
          if (Math.random() > 0.8) {
              p.happiness = Math.min(100, p.happiness + 40);
              return "Miracle ! C'était des vitamines expérimentales. Votre peau est lisse, vos douleurs disparaissent, vous pétez le feu !";
          } else {
              p.money -= 1500; // Frais d'hôpital
              p.happiness = Math.max(0, p.happiness - 40);
              return "Lavage d'estomac d'urgence aux soins intensifs. C'était des laxatifs pour chevaux. Vous avez failli mourir de déshydratation.";
          }
      }},
      { text: 'La revendre à un collègue naïf (Risqué)', action: (p) => {
          if (Math.random() > 0.6) {
              p.money += 300;
              p.happiness = Math.min(100, p.happiness + 10);
              return "Le collègue a un effet placebo et se sent génial. Vous avez fait un bénéfice immoral mais jouissif.";
          } else {
              if (p.job) p.job = null;
              return { prison: true, baseFine: 5000, reason: "Empoisonnement et trafic de stupéfiants", msg: "Le collègue a fini dans le coma (il va s'en remettre, mais pas vous). La police a remonté votre IP." };
          }
      }}
    ]
  },

  // 41. Le Cadeau de Départ
  {
    id: 'retirement_insult',
    title: 'Le Pot de Départ',
    condition: (p) => p.job !== null && p.age >= 60,
    description: 'Après 40 ans de bons et loyaux services, vos collègues se sont cotisés pour votre pot de départ. Ils vous offrent... un bon d\'achat de 25€ chez un vendeur de chaussettes.',
    choices: [
      { text: 'Sourire et remercier la direction', action: (p) => {
          if (p.job) p.job = null; // Départ en retraite
          p.happiness = Math.max(0, p.happiness - 20);
          return "Vous avalez votre dignité avec un verre de jus d'orange tiède. C'est la fin d'une époque, et elle est pathétique.";
      }},
      { text: 'Jeter le bon d\'achat au visage du patron', action: (p) => {
          if (p.job) p.job = null;
          p.happiness = Math.min(100, p.happiness + 30);
          return "Vous partez sous le choc général, mais avec le sentiment du devoir accompli. Une sortie de légende !";
      }},
      { text: 'Partir avec l\'ordinateur et l\'imprimante (Risqué)', action: (p) => {
          if (Math.random() > 0.6) {
              if (p.job) p.job = null;
              p.money += 800;
              p.happiness = Math.min(100, p.happiness + 20);
              return "Vous avez 'oublié' de rendre votre matériel. Ça compense largement les chaussettes. À vous la belle vie !";
          } else {
              if (p.job) p.job = null;
              return { prison: true, baseFine: 1500, reason: "Vol de matériel d'entreprise", msg: "Les RH ont remarqué qu'il manquait la photocopieuse laser de 50 kilos. La police est venue la récupérer chez vous." };
          }
      }}
    ]
  },

  // 42. Le secret génétique
  {
    id: 'dna_test_shock',
    title: 'Les Origines du Mal',
    condition: (p) => p.age > 30 && p.money >= 100,
    description: 'Pour rigoler, vous avez fait un test ADN en ligne. Les résultats tombent : vous avez 14 demi-frères et sœurs non déclarés. Votre père avait une double (voire triple) vie.',
    choices: [
      { text: 'Ignorer et brûler les résultats', action: (p) => {
          p.happiness = Math.max(0, p.happiness - 15);
          return "Vous essayez d'oublier, mais vous regardez désormais chaque inconnu dans la rue avec suspicion.";
      }},
      { text: 'Organiser une réunion de famille XXL (500€)', action: (p) => {
          p.money -= 500;
          p.happiness = Math.min(100, p.happiness + 15);
          return "C'est le chaos total, ça coûte une fortune en traiteur, mais l'histoire est belle. Vous n'êtes plus jamais seul(e).";
      }},
      { text: 'Faire chanter le patriarche (Risqué)', action: (p) => {
          if (Math.random() > 0.7) {
              p.money += 5000;
              p.happiness = Math.min(100, p.happiness + 10);
              return "Votre vieux père cède à la panique et achète votre silence. Vous venez de ruiner la famille, mais vous êtes riche.";
          } else {
              return { prison: true, baseFine: 3000, reason: "Extorsion et chantage", msg: "Le patriarche a eu une crise cardiaque à cause de votre coup de pression. La police enquête et trouve vos preuves de chantage." };
          }
      }}
    ]
  },

  // 43. Le Bingo de la mort
  {
    id: 'bingo_brawl',
    title: 'Baston au Loto Quine',
    condition: (p) => p.age >= 65,
    description: 'Lors du loto de la salle des fêtes, une dame triche ouvertement pour gagner le panier garni. La tension monte, des chaises volent. C\'est la guerre civile.',
    choices: [
      { text: 'Se cacher sous la table', action: (p) => {
          p.happiness = Math.max(0, p.happiness - 10);
          return "Vous tremblez pendant que les dentiers volent au-dessus de vous. Vous avez survécu, mais à quel prix ?";
      }},
      { text: 'Sauter dans la mêlée', action: (p) => {
          p.happiness = Math.min(100, p.happiness + 20);
          return "Vous avez distribué des coups de canne à tour de bras ! L'adrénaline vous donne l'impression d'avoir 20 ans de moins !";
      }},
      { text: 'Profiter du chaos pour voler la TV 4K du gros lot (Risqué)', action: (p) => {
          if (Math.random() > 0.5) {
              p.money += 600;
              p.happiness = Math.min(100, p.happiness + 25);
              return "Pendant que tout le monde se battait pour le saucisson, vous vous êtes éclipsé(e) avec l'écran plat. Maître stratège !";
          } else {
              return { prison: true, baseFine: 800, reason: "Vol en réunion", msg: "L'organisateur vous a plaqué au sol près de la sortie de secours. Finir au poste à votre âge, quelle honte." };
          }
      }}
    ]
  },

  // 44. L'escroquerie au viager
  {
    id: 'viager_trap',
    title: 'Le Piège du Viager',
    condition: (p) => p.money > 20000 && p.age > 40 && p.age < 60,
    description: 'Vous décidez d\'investir dans un appartement en viager. La vendeuse est une charmante dame de 92 ans qui prétend "être sur la fin".',
    choices: [
      { text: 'Payer la rente sagement (-1000€)', action: (p) => {
          p.money -= 1000;
          p.happiness = Math.max(0, p.happiness - 10);
          return "La dame fête ses 105 ans. Elle fait du saut à l'élastique. Vous pleurez en regardant votre compte se vider.";
      }},
      { text: 'Revendre le contrat à perte (-5000€)', action: (p) => {
          p.money -= 5000;
          p.happiness = Math.min(100, p.happiness + 5);
          return "Vous perdez une fortune, mais au moins, vous n'avez plus à espérer secrètement le décès d'une centenaire.";
      }},
      { text: 'Tenter de l\'empoisonner avec des pâtisseries périmées (Risqué)', action: (p) => {
          if (Math.random() > 0.9) { // Extrêmement risqué de s'en sortir
              p.happiness = Math.min(100, p.happiness + 10);
              return "Elle les a mangées avec appétit et vous a demandé la recette. Elle a un estomac en béton armé. Vous abandonnez.";
          } else {
              return { prison: true, baseFine: 15000, reason: "Tentative d'homicide", msg: "L'infirmière à domicile a fait analyser vos éclairs au chocolat suspect. Vous finirez vos jours en prison." };
          }
      }}
    ]
  },

  // 45. La crise boursière du pauvre
  {
    id: 'nft_crash',
    title: 'Le Singe Numérique',
    condition: (p) => p.money > 5000 && p.age < 50,
    description: 'Il y a deux ans, vous avez investi toutes vos économies dans une image de singe numérique (NFT). Aujourd\'hui, le marché s\'effondre. Votre singe ne vaut plus que 12 euros.',
    choices: [
      { text: 'Garder l\'image et pleurer', action: (p) => {
          p.happiness = Math.max(0, p.happiness - 40);
          return "Vous mettez le singe en fond d'écran pour vous rappeler votre stupidité chaque matin. Dépression financière.";
      }},
      { text: 'Vendre à 12€ et tourner la page', action: (p) => {
          p.money += 12;
          p.happiness = Math.max(0, p.happiness - 20);
          return "C'est dur, mais l'acceptation est la première étape vers la guérison. Vous supprimez Twitter de votre téléphone.";
      }},
      { text: 'Monter une fausse arnaque pour attirer des pigeons (Risqué)', action: (p) => {
          if (Math.random() > 0.6) {
              p.money += 10000;
              p.happiness = Math.min(100, p.happiness + 20);
              return "Vous créez le 'MegaApeCoin', faites gonfler le prix artificiellement et partez avec la caisse. Vous êtes le loup de Wall Street.";
          } else {
              return { prison: true, baseFine: 20000, reason: "Fraude financière pyramidale", msg: "La SEC et les autorités financières ont gelé vos comptes et enfoncé votre porte à l'aube." };
          }
      }}
    ]
  },

  // 46. Le complot de l'EHPAD
  {
    id: 'ehpad_escape',
    title: 'La Grande Évasion',
    condition: (p) => p.age >= 80,
    description: 'L\'infirmière de la maison de retraite a confisqué la télécommande et ordonne l\'extinction des feux à 19h30. La rébellion gronde dans la salle commune.',
    choices: [
      { text: 'Avaler sa soupe et dormir', action: (p) => {
          p.happiness = Math.max(0, p.happiness - 20);
          return "La résignation est totale. Vous rêvez d'une époque lointaine où vous mangiez des tacos à 2h du matin.";
      }},
      { text: 'Payer un infirmier pour avoir du rab de TV (100€)', action: (p) => {
          p.money -= 100;
          p.happiness = Math.min(100, p.happiness + 15);
          return "La corruption fonctionne à tout âge. Vous regardez 'Questions pour un champion' en secret, tel un VIP.";
      }},
      { text: 'Organiser une mutinerie et fuir (Risqué)', action: (p) => {
          if (Math.random() > 0.5) {
              p.happiness = Math.min(100, p.happiness + 40);
              return "Vous avez neutralisé le vigile à coups de déambulateur et volé le minibus ! Destination : le casino de la côte !";
          } else {
              return { prison: true, baseFine: 500, reason: "Trouble à l'ordre public et vol de véhicule", msg: "Votre fuite à 15 km/h a vite été interceptée par la gendarmerie. Retour à la case départ, avec cellule d'isolement." };
          }
      }}
    ]
  },

  // 47. Le testament maudit
  {
    id: 'cursed_inheritance',
    title: 'Héritage Encombrant',
    condition: (p) => p.age > 35,
    description: 'Une lointaine grande-tante décède. Elle vous lègue sa maison, mais le notaire précise qu\'elle est remplie de 4000 poupées de porcelaine au regard vide.',
    choices: [
      { text: 'Accepter l\'héritage et nettoyer', action: (p) => {
          p.money += 20000; // Valeur de la maison
          p.happiness = Math.max(0, p.happiness - 30);
          return "Vous gagnez de l'argent, mais vous êtes désormais persuadé(e) que les poupées bougent la nuit. Vos nuits sont terrifiantes.";
      }},
      { text: 'Refuser net l\'héritage', action: (p) => {
          p.happiness = Math.min(100, p.happiness + 10);
          return "Vous passez à côté du jackpot, mais vous sauvez votre âme. Le sommeil n'a pas de prix.";
      }},
      { text: 'Incendier la maison "accidentellement" (Risqué)', action: (p) => {
          if (Math.random() > 0.7) {
              p.money += 40000; // Prime d'assurance
              p.happiness = Math.min(100, p.happiness + 10);
              return "Le feu a purifié les poupées démoniaques. L'assurance vous paie rubis sur l'ongle. Coup de maître.";
          } else {
              return { prison: true, baseFine: 15000, reason: "Destruction de biens par incendie", msg: "L'expert a trouvé des traces d'essence sur une poupée intacte. L'escroquerie est démasquée." };
          }
      }}
    ]
  },

  // 48. La réduction senior honteuse
  {
    id: 'senior_discount_shame',
    title: 'Coup de Vieux',
    condition: (p) => p.age >= 55 && p.age < 65,
    description: 'Au cinéma, le caissier vous tend votre ticket en disant "J\'ai appliqué la réduction Senior automatique, pas besoin de justificatif".',
    choices: [
      { text: 'Prendre le ticket sans rien dire', action: (p) => {
          p.money += 5; // Économie
          p.happiness = Math.max(0, p.happiness - 25);
          return "Vous avez économisé 5 euros, mais vous vous effondrez en larmes devant les bandes-annonces. La vieillesse est là.";
      }},
      { text: 'Piquer une crise de nerfs ("J\'ai 55 ans !!")', action: (p) => {
          p.happiness = Math.max(0, p.happiness - 10);
          return "Vous faites un scandale, vous payez le plein tarif par fierté, et toute la file d'attente vous juge.";
      }},
      { text: 'Faire de faux papiers pour avoir toutes les réductions (Risqué)', action: (p) => {
          if (Math.random() > 0.6) {
              p.money += 300;
              p.happiness = Math.min(100, p.happiness + 20);
              return "Vous assumez ! Fausse carte vermeil, faux pass navigo... Vous vivez la belle vie à moitié prix !";
          } else {
              return { prison: true, baseFine: 1500, reason: "Faux et usage de faux documents d'identité", msg: "Le contrôleur du train a vite remarqué que votre carte d'identité était plastifiée au scotch." };
          }
      }}
    ]
  },

  // 49. La nostalgie toxique
  {
    id: 'toxic_ex_return',
    title: 'Le Fantôme du Passé',
    condition: (p) => p.age > 25,
    description: 'Votre ex toxique réapparaît après 5 ans de silence radio. "Tu me manques, je crois que j\'ai changé. On va boire un verre ?"',
    choices: [
      { text: 'Bloquer le numéro immédiatement', action: (p) => {
          p.happiness = Math.min(100, p.happiness + 15);
          return "La meilleure décision de votre vie. Vous respirez un grand coup et continuez votre chemin sereinement.";
      }},
      { text: 'Y aller par "curiosité"', action: (p) => {
          p.money -= 500; // Dépenses imprévues / dettes de l'ex
          p.status.isMarried = false; // Rupture garantie si marié
          p.happiness = Math.max(0, p.happiness - 40);
          return "C'était un piège. Votre ex a volé votre carte bleue, détruit votre couple actuel et disparu à nouveau. Classique.";
      }},
      { text: 'Organiser un faux rendez-vous pour se venger (Risqué)', action: (p) => {
          if (Math.random() > 0.8) {
              p.happiness = Math.min(100, p.happiness + 30);
              return "Vous l'avez envoyé(e) attendre 3 heures sous la pluie dans une banlieue glauque. Vengeance servie glacée !";
          } else {
              return { prison: true, baseFine: 1000, reason: "Harcèlement et diffamation publique", msg: "Votre ex a porté plainte pour le canular après que vous ayez posté les photos sur les réseaux. La roue tourne." };
          }
      }}
    ]
  },

  // 50. La promesse de l'au-delà
  {
    id: 'digital_immortality',
    title: 'L\'Immortalité Digitale',
    condition: (p) => p.age >= 85,
    description: 'Une start-up étrange de la Silicon Valley vous propose de transférer votre conscience dans une clé USB pour vivre éternellement dans le Cloud.',
    choices: [
      { text: 'Accepter l\'offre (Dépense toute votre fortune)', action: (p) => {
          p.money = 0;
          p.happiness = 100; // Bonheur absolu, corps perdu
          return "Vous êtes mort(e) physiquement, mais votre esprit survit. Par contre, vous êtes coincé(e) dans un serveur avec des pubs toutes les 5 minutes.";
      }},
      { text: 'Refuser et accepter son destin', action: (p) => {
          p.happiness = Math.min(100, p.happiness + 20);
          return "La mort fait partie de la vie. Vous regardez un dernier coucher de soleil en paix, prêt(e) pour le grand voyage.";
      }},
      { text: 'Pirater le système pour uploader l\'esprit de votre chien à la place (Risqué)', action: (p) => {
          if (Math.random() > 0.5) {
              p.happiness = Math.min(100, p.happiness + 50);
              return "Le piratage est un succès ! Votre chien 'Médor' règne désormais en dieu suprême sur le Cloud mondial. Vous mourez en paix.";
          } else {
              return { prison: true, baseFine: 100000, reason: "Bioterrorisme numérique", msg: "Le transfert a échoué. Les agents du FBI ont envahi la chambre d'hôpital pour déjouer votre cyber-attaque." };
          }
      }}
    ]
  }
];

export const GLOBAL_EVENTS = [
  {
    id: 'market_crash',
    title: 'Krach Boursier Mondial',
    effect: (gameState) => {
      gameState.players.forEach(p => p.money = Math.floor(p.money * 0.7));
      return "Une panique sur les marchés. Tout le monde perd 30% de ses économies en banque.";
    }
  },
  {
    id: 'pandemic',
    title: 'Pandémie Mondiale',
    effect: (gameState) => {
      gameState.players.forEach(p => p.happiness -= 20);
      return "Un virus oblige la planète entière à se confiner. Grosse chute de bonheur (-20).";
    }
  },
  {
    id: 'stimulus',
    title: 'Chèque de Relance',
    effect: (gameState) => {
      gameState.players.forEach(p => { p.money += 2000; p.happiness += 10; });
      return "Le gouvernement distribue 2000€ à chaque citoyen pour relancer l'économie !";
    }
  },
  {
    id: 'natural_disaster',
    title: 'Catastrophe Naturelle',
    effect: (gameState) => {
      gameState.players.forEach(p => {
        const cost = 1000 + Math.floor(Math.random() * 5000);
        p.money -= cost;
        if(p.money < 0) p.happiness -= 15;
      });
      return "Une violente tempête s'est abattue. Frais de réparations énormes pour tout le monde.";
    }
  },
  {
    id: 'inflation_crisis',
    title: 'Hyper-Inflation',
    effect: (gameState) => {
      gameState.players.forEach(p => {
        if(p.job) p.job.salary = Math.floor(p.job.salary * 1.15); // Salaires augmentent de 15%
        p.happiness -= 10; // Mais le coût de la vie déprime tout le monde
      });
      return "Le coût de la vie explose. Tous les salaires augmentent de 15%, mais le bonheur chute.";
    }
  },
  {
    id: 'golden_age',
    title: 'Âge d\'Or Économique',
    effect: (gameState) => {
      gameState.players.forEach(p => {
        p.money += 5000;
        p.happiness += 15;
      });
      return "Période de prospérité exceptionnelle ! Tout le monde s'enrichit et rayonne de joie.";
    }
  },
  {
    id: 'tech_breakthrough',
    title: 'Révolution Technologique',
    effect: (gameState) => {
      gameState.players.forEach(p => {
        if (p.job && p.job.id === 'developer') { p.job.salary = Math.floor(p.job.salary * 1.5); p.happiness += 20; }
        else { p.happiness += 5; }
      });
      return "Une nouvelle IA bouleverse le monde. Les développeurs voient leur salaire exploser (+50%), les autres sont juste contents.";
    }
  },
  {
    id: 'alien_contact',
    title: 'Contact Extraterrestre',
    effect: (gameState) => {
      gameState.players.forEach(p => { p.happiness -= 30; p.money = Math.floor(p.money * 0.5); });
      return "Les OVNIs ont débarqué. L'économie mondiale est en pause, la monnaie perd 50% de sa valeur et l'angoisse est totale.";
    }
  },
  {
    id: 'tax_reform',
    title: 'Réforme Fiscale',
    effect: (gameState) => {
      gameState.players.forEach(p => { p.money -= Math.floor(p.money * 0.1); });
      return "Le gouvernement prend une taxe exceptionnelle de solidarité (10% de vos économies).";
    }
  }
];

export const getRandomEvent = (player) => {
  // Chance is 5% per month instead of 20% per quarter to keep it balanced
  if (Math.random() > 0.05) return null;
  const possible = RANDOM_EVENTS.filter(e => e.condition(player));
  if (possible.length === 0) return null;
  return possible[Math.floor(Math.random() * possible.length)];
};

export const getRandomGlobalEvent = () => {
  // Chance is 15% at the end of each YEAR
  if (Math.random() > 0.15) return null;
  return GLOBAL_EVENTS[Math.floor(Math.random() * GLOBAL_EVENTS.length)];
};
