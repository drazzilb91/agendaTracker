import { describe, it, expect } from 'vitest';
import { parseAgenda } from '../helpers/parseAgenda';

describe('parseAgenda', () => {
  it('parses a single valid agenda item', () => {
    const result = parseAgenda('Welcome : Introduction : 15');
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({ name: 'Welcome ', description: ' Introduction ', duration: 15 });
  });

  it('parses multiple valid agenda items', () => {
    const text = 'Item 1 : Desc 1 : 10\nItem 2 : Desc 2 : 20';
    const result = parseAgenda(text);
    expect(result).toHaveLength(2);
    expect(result[0].duration).toBe(10);
    expect(result[1].duration).toBe(20);
  });

  it('ignores lines without a valid duration', () => {
    const text = 'Valid Item : Description : 30\nInvalid Line\nAnother Invalid : no duration here';
    const result = parseAgenda(text);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Valid Item ');
  });

  it('returns an empty array for empty input', () => {
    expect(parseAgenda('')).toEqual([]);
  });

  it('ignores lines with non-numeric duration', () => {
    const text = 'Item : Desc : abc\nGood Item : Desc : 5';
    const result = parseAgenda(text);
    expect(result).toHaveLength(1);
    expect(result[0].duration).toBe(5);
  });
});
