import fs from 'fs';
import path from 'path';
import { logError } from '../core/log';

// Interface représentant une entrée d'utilisateur associée à une infraction
interface DIDInfraction {
  did: string;
  label: string;
  source: string;
}

/**
 * Sauvegarde la liste des infractions détectées dans un fichier JSON local.
 * @param data Tableau des objets DIDInfraction à enregistrer
 */
export async function saveResults(data: DIDInfraction[]): Promise<void> {
  const outputPath = path.join('results', 'did-infractions.json');

  try {
    // Crée le dossier results/ s'il n'existe pas encore
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });

    // Écrit les données formatées dans un fichier JSON avec indentation
    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
    console.log(`💾 Résultats sauvegardés dans ${outputPath}`);
  } catch (err) {
    // Enregistre l'erreur dans le fichier de log si la sauvegarde échoue
    logError('Erreur lors de la sauvegarde des résultats', err);
  }
}