import fs from 'fs';
import path from 'path';
import { agent } from '../bskyClient';
import { logError } from './log';

// Interface représentant une entrée dans modlists.json
interface ModListEntry {
  label: string;
  uri: string;
}

// Interface pour représenter un compte et l'infraction associée
interface DIDInfraction {
  did: string;
  label: string;
  source: string;
}

/**
 * Lit le fichier lists/modlists.json,
 * récupère tous les DIDs présents dans chaque liste,
 * et associe chaque DID à l'infraction correspondante (label).
 * @returns Un tableau des correspondances DID ↔ label ↔ source URI
 */
export async function getDIDInfractionsFromLists(): Promise<DIDInfraction[]> {
  const filePath = path.join('lists', 'modlists.json');

  // Vérifie l'existence du fichier de configuration des listes
  if (!fs.existsSync(filePath)) {
    console.error(`Fichier introuvable : ${filePath}`);
    return [];
  }

  const raw = fs.readFileSync(filePath, 'utf-8');
  const lists: ModListEntry[] = JSON.parse(raw);
  const result: DIDInfraction[] = [];

  // Parcourt chaque liste pour en extraire les DIDs
  for (const list of lists) {
    try {
      const res = await agent.app.bsky.graph.getList({ list: list.uri });
      for (const item of res.data.items || []) {
        result.push({
          did: item.subject.did,
          label: list.label,
          source: list.uri.split('/').pop() || 'unknown'
        });
      }
    } catch (err: any) {
      logError(`Erreur lors de la récupération de ${list.uri}`, err);
    }
  }

  return result;
}