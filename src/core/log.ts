import fs from 'fs';
import path from 'path';

// Définition du chemin vers le fichier de log
const logFilePath = path.join('results', 'log.txt');

/**
 * Écrit un message simple dans le fichier de log avec un horodatage ISO.
 * @param message Le message à écrire dans le log
 */
export function log(message: string): void {
  const timestamp = new Date().toISOString();
  const entry = `[${timestamp}] ${message}\n`;

  try {
    // Crée le dossier results/ si nécessaire, puis ajoute l'entrée dans log.txt
    fs.mkdirSync(path.dirname(logFilePath), { recursive: true });
    fs.appendFileSync(logFilePath, entry, 'utf-8');
  } catch (err) {
    console.error('Erreur lors de l\'écriture du log :', err);
  }
}

/**
 * Journalise une erreur avec un message d'accompagnement.
 * @param message Message décrivant le contexte de l'erreur
 * @param error L'objet erreur à consigner (Error ou autre)
 */
export function logError(message: string, error: unknown): void {
  const errMsg = error instanceof Error ? error.message : String(error);
  log(`${message} — ${errMsg}`);
}