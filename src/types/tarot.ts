export interface TarotCard {
  id: number;
  name: string;
  imageUrl: string;
  backImageUrl: string;
}

export type ReadingStep = 'initial' | 'first' | 'second' | 'third' | 'result';

export interface SelectedCard {
  card: TarotCard;
  type: 'situation' | 'challenge' | 'advice';
  title: string;
}