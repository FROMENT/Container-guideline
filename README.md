# OpenShift Secure SDLC Hub

**Interface de génération de documentation technique pour l'ingénierie de sécurité OpenShift.**

Ce projet est une Single Page Application (SPA) React qui utilise l'IA générative pour produire, à la demande, des guides de sécurité contextuels. Contrairement à une documentation statique, le contenu est généré dynamiquement via Google Gemini 3 en suivant un curriculum strict défini dans le code.

## 🎯 Objectif Technique

Fournir aux ingénieurs DevSecOps une interface centralisée qui transforme des requêtes techniques (prompts) en documentation structurée (Markdown), spécifiquement pour l'écosystème Red Hat (OpenShift, Quay, ACS).

## ⚡ Fonctionnalités Implémentées

*   **Génération Dynamique** : Production de contenu technique sur 10 modules (de l'image de base UBI à la sécurité Runtime).
*   **Assistant Conversationnel** : Chatbot contextuel (`ChatAssistant.tsx`) capable de répondre aux questions spécifiques en gardant le contexte "SecOps".
*   **Navigation SDLC** : Visualisation interactive du pipeline (Design / Build / Deploy / Runtime).
*   **Métriques de Vue** : Système de comptage hybride (Supabase avec repli automatique sur LocalStorage si hors ligne).
*   **Hub d'Écosystème** : Point d'entrée vers les autres outils de la suite WetAndSea (définis dans `NetworkDiscovery`).

## 🔍 Architecture & Limites

### Stack
*   **Frontend** : React 18, Tailwind CSS, Lucide Icons.
*   **AI** : Google GenAI SDK (Modèles `gemini-3-flash` et `gemini-3-pro`).
*   **Data** : Supabase (PostgreSQL) + LocalStorage.

### Notes d'Audit
*   **Contenu IA** : Le contenu affiché est non-déterministe. Bien que guidé par des "System Instructions" strictes (fichiers `constants.ts`), il peut varier d'une requête à l'autre.
*   **Feedback** : Une couche de service (`supabaseService.ts`) existe pour collecter les retours utilisateurs, mais **l'interface utilisateur ne l'expose pas encore**.
*   **Dépendances** : L'application nécessite des clés API valides pour fonctionner (Gemini & Supabase).

## 🚀 Installation / Configuration

L'application attend les variables d'environnement suivantes (injectées au build ou runtime) :

```bash
API_KEY=votre_cle_google_gemini       # Obligatoire pour le contenu
SUPABASE_URL=votre_url_supabase       # Optionnel (repli local)
SUPABASE_ANON_KEY=votre_cle_supabase  # Optionnel (repli local)
```

> **Avertissement** : Cet outil génère des configurations de sécurité via IA. Tout code (YAML, CLI) produit doit être audité manuellement avant déploiement en production.

---
*Projet audité - WetAndSeaAI Engineering.*