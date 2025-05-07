# Formulaire de Questions - Quizzical

Un système léger et simple de création de formulaires et de collecte de réponses, fonctionnant entièrement en local, sans base de données et sans système de login.

## Fonctionnalités

- Création et gestion de questions variées via une interface administrateur
- Stockage local des questions et des réponses (localStorage)
- Affichage aléatoire des questions
- Visualisation et export des réponses
- Personnalisation du formulaire via les paramètres administrateur
- Option pour collecter le nom et prénom du répondant au début du questionnaire
- Système de mot de passe pour accéder à l’administration
- Changement de mot de passe administrateur via une boîte de dialogue sécurisée
- Interface utilisateur moderne avec composants interactifs
- Mise en ligne automatique des images sur Imgur lors de l'ajout de questions avec choix d'images
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
3. Pour les choix d'image, les fichiers sont automatiquement téléversés sur Imgur
4. Les utilisateurs peuvent remplir le formulaire à l'adresse principale `/`
5. Les réponses sont stockées dans localStorage et peuvent être exportées depuis l’administration

## Installation et démarrage

```bash
# Installer les dépendances
npm install

# Démarrer l'application
npm run dev
