/**
 * Exécute une fonction asynchrone et mesure son temps d'exécution.
 * @param label Étiquette utilisée dans les logs de durée
 * @param fn Fonction asynchrone à exécuter
 * @returns Le résultat retourné par la fonction passée
 */
export async function runWithLog<T>(label: string, fn: () => Promise<T>): Promise<T> {
    console.time(label); // Démarre le chronomètre avec l'étiquette donnée

    const result = await fn();

    console.timeEnd(label); // Affiche le temps écoulé
    return result;
}