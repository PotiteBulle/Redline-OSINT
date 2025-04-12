# 📦 Redline-OSINT - Attribution d'Infractions via Listes Bluesky

Ce projet analyse les listes de modération publiques Bluesky pour extraire les DIDs des utilisateurices signalé·es, et associe chaque DID à une infraction selon la liste d'origine.

---

## Fonctionnalités

- Authentification via l'API officielle Bluesky
- Lecture de `modlists.json` avec URI et étiquette d'infraction
- Récupération des DIDs de chaque liste
- Attribution de l'infraction selon la source de la liste
- Export structuré dans `results/did-infractions.json`
- Journalisation des actions dans `results/log.txt`

---

## Arborescence

```
.
├── src
│   ├── index.ts              # Contrôleur principal
│   ├── bskyClient.ts         # Connexion et login
│   ├── core
│   │   ├── modlist.ts        # Récupération des DIDs et attribution des infractions
│   │   └── log.ts            # Logger personnalisé
│   └── utils
│       ├── save.ts           # Sauvegarde JSON
│       └── system.ts         # Timer/log
├── lists
│   └── modlists.json         # Fichier de configuration des listes
├── results
│   ├── did-infractions.json  # Résultats exportés
│   └── log.txt               # Historique d'exécution
├── .env                      # Configuration sensible (non versionnée)
├── .env.example              # Exemple d'environnement
├── README.md                 # Documentation
└── tsconfig.json             # Configuration TypeScript
```

---

## Installation & Lancement

### 1. Installer les dépendances
```bash
bun install
```

### 2. Configurer l'environnement
```bash
cp .env.example .env
```
➡️ puis remplis les variables `BLUESKY_IDENTIFIER` et `BLUESKY_PASSWORD`

### 3. Lancer le programme
```bash
bun run src/index.ts
```

---

## Exemple de `lists/modlists.json`

```json
[
  {
    "label": "CSAM",
    "uri": "at://did:plc:example1/app.bsky.graph.list/csam-suspects"
  },
  {
    "label": "FakeAI",
    "uri": "at://did:plc:example2/app.bsky.graph.list/fakeai"
  }
]
```

---

## Pourquoi ce projet est important pour moi

> Il automatise une tâche cruciale de veille Cyber, permettant aux modérateurices, chercheureuses et outils de détection de cartographier des comptes problématiques à partir de données publiques structurées.

---

## Auteurice
**Potate_bulle** | [Licence MIT](https://github.com/PotiteBulle/Redline-OSINT/blob/main/LICENSE)