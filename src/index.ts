
import { config } from 'dotenv';
config();

// Importe les modules nécessaires
import { initAgent } from './bskyClient';
import { getDIDInfractionsFromLists } from './core/modlist';
import { saveResults } from './utils/save';
import { runWithLog } from './utils/system';
import { log, logError } from './core/log';

/**
 * Fonction principale qui orchestre l'exécution du programme.
 * Elle initialise l'agent, récupère les DIDs, les enregistre et journalise chaque étape.
 */
async function main() {
  log('Redline OSINT - Attribution d\'infractions basée sur des listes');

  try {
    // Connexion à Bluesky
    await initAgent();
    log('Connexion réussie à Bluesky');
  } catch (err) {
    logError('Échec de l\'authentification', err);
    return;
  }

  try {
    // Récupération des DIDs depuis les listes de modération
    const results = await runWithLog('Récupération des DIDs par infraction', async () => {
      return await getDIDInfractionsFromLists();
    });

    // Sauvegarde des résultats dans un fichier JSON
    await saveResults(results);
    log(`Attribution terminée : ${results.length} compte(s) détecté(s)`);
  } catch (err) {
    logError('Erreur durant le traitement principal', err);
  }
}

// Gestion des erreurs globales non attrapées
main().catch((err: unknown) => {
  const message = err instanceof Error ? err.message : String(err);
  logError('Erreur fatale non interceptée', message);
});