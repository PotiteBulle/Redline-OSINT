import { BskyAgent } from '@atproto/api';
import { config } from 'dotenv';
config();

// Création d'une instance de l'agent Bluesky qui servira à effectuer les appels API
export const agent = new BskyAgent({ service: 'https://bsky.social' });

/**
 * Initialise l'agent Bluesky avec les identifiants définis dans le fichier .env
 * @throws Lance une erreur si la connexion échoue
 */
export async function initAgent(): Promise<void> {
  try {
    await agent.login({
      identifier: process.env.BLUESKY_IDENTIFIER!,
      password: process.env.BLUESKY_PASSWORD!,
    });
    console.log('Authentification Bluesky réussie');
  } catch (err) {
    console.error('Échec de l\'authentification Bluesky :', err);
    throw err;
  }
}