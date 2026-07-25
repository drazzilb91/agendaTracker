import { AgendaItem } from '../components/AgendaItem';

/**
 * Parse agenda text into an array of AgendaItem objects.
 * Each line should be in the format: "name : description : duration"
 * Lines without a valid numeric duration are ignored.
 *
 * @param text - Multiline string of agenda items
 * @returns Array of AgendaItem objects
 */
export function parseAgenda(text: string): AgendaItem[] {
  return text.split('\n').map(line => {
    const [name, description, duration] = line.split(':');
    if (!duration || isNaN(Number(duration))) {
      return null;
    }
    return { name, description, duration: Number(duration) };
  }).filter((item): item is AgendaItem => item !== null);
}
