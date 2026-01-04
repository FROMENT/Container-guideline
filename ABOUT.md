# À Propos de WetAndSeaAI

## L'Intention
Ce projet, **OpenShift Secure SDLC**, n'est pas une simple documentation. C'est une **interface d'ingénierie augmentée**. Son but est de réduire la charge cognitive des ingénieurs de sécurité en générant instantanément les meilleures pratiques Red Hat, sans avoir à parcourir manuellement des centaines de pages de documentation statique.

## L'Écosystème (Déduit du Code)

L'application est conçue comme le pilier "Ingénierie" d'un écosystème plus large, identifié dans la couche de découverte du réseau :

1.  **OpenShift Secure (Ce projet)**
    *   *Rôle* : Ingénierie & Prévention (Build it right).
    *   *Focus* : Images UBI, SCCs, Supply Chain, Network Policies.

2.  **Wicked** (Référencé dans l'app)
    *   *Rôle* : Offensive Security (Red Team).
    *   *Focus* : Emulation d'adversaires et tests de pénétration assistés par IA.

3.  **Sentinel** (Référencé dans l'app)
    *   *Rôle* : Défense & Threat Hunting (Blue Team).
    *   *Focus* : Détection d'anomalies en temps réel.

4.  **Navig-AI-tor** (Référencé dans l'app)
    *   *Rôle* : Gouvernance & Conformité (GRC).
    *   *Focus* : Alignement réglementaire automatisé.

## Philosophie Technique

*   **Pragmatisme** : Si le backend (Supabase) est inaccessible, l'application continue de fonctionner en mode dégradé (LocalStorage). L'utilisateur ne doit jamais être bloqué.
*   **Spécialisation** : Les modèles d'IA sont strictement instruits pour ignorer les sources généralistes et se concentrer uniquement sur la documentation officielle Red Hat et Kubernetes.

---
*Document généré automatiquement basé sur l'analyse du code source.*
