
# Formulaire de Questions - Quizzical

Un système léger et simple de création de formulaires et de collecte de réponses, fonctionnant entièrement en local, sans base de données et sans système de login.

## Fonctionnalités

- Création et gestion de questions variées
- Stockage local des questions et des réponses
- Affichage aléatoire des questions
- Interface administrateur pour gérer les questions
- Visualisation et export des réponses
- Fonctionne entièrement côté client, sans serveur

## Types de questions supportés

- Question ouverte (champ de texte)
- Question fermée (Oui/Non)
- Question à choix multiple (cases à cocher ou boutons radio)
- Question avec choix d'images
- Question avec choix de couleurs
- Question de classement (par ordre de préférence)

## Comment utiliser cette application

1. Accédez à la page d'administration `/admin` pour créer vos questions
2. Choisissez le type de question et complétez les informations requises
3. Les utilisateurs peuvent remplir le formulaire à l'adresse principale `/`
4. Les réponses sont stockées dans localStorage et peuvent être exportées depuis la page d'administration

## Installation et démarrage

```bash
# Installer les dépendances
npm install

# Démarrer l'application
npm run dev
```

## Stockage des données

Pour faciliter le développement et le déploiement, cette application utilise le localStorage du navigateur pour la persistance des données. En production, vous pouvez adapter le code pour utiliser des fichiers JSON/TXT réels si nécessaire.

## Limitations

- Les données sont stockées dans le navigateur (localStorage) de l'utilisateur
- Les images doivent être hébergées en ligne (via URL)
- Pas de système d'authentification
