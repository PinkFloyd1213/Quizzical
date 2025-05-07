# Formulaire de Questions - Quizicall

Un système léger et simple de création de formulaires et de collecte de réponses, fonctionnant entièrement en local, sans base de données et sans système de login.

## Fonctionnalités

- Création et gestion de questions variées via une interface administrateur
- Stockage local des questions et des réponses (localStorage)
- Affichage aléatoire des questions à chaque session
- Visualisation et export des réponses dans un fichier texte
- Personnalisation du formulaire (ex : demander le nom du répondant)
- Authentification protégée par mot de passe pour l'administration
- Changement de mot de passe sécurisé via une boîte de dialogue
- Interface utilisateur moderne avec composants interactifs (ShadCN/UI, Radix, Lucide)
- Ajout automatique des images sur Imgur pour les questions avec images
- Support du glisser-déposer et boutons pour classement des éléments
- Entièrement côté client (aucun backend requis)
- Notifications utilisateur via système de "toasts" (Sonner, Toaster)

## Types de questions supportés

- Question ouverte (champ de texte)
- Question fermée (Oui / Non)
- Question à choix multiple (cases à cocher ou boutons radio)
- Question avec choix d'images
- Question avec choix de couleurs
- Question de classement (ordre de préférence)

## Comment utiliser cette application

1. Accédez à la page d'administration via `/admin`
2. Créez les questions selon les besoins (avec support image et couleurs)
3. Activez les options dans l'onglet Paramètres (ex. collecte du nom)
4. Partagez l’URL principale `/` pour que les utilisateurs remplissent le formulaire
5. Visualisez et exportez les réponses via l’interface d’administration

## Installation et démarrage

```bash
# Installer les dépendances
npm install

# Démarrer l'application
npm run dev

# Build l'application
npm run build