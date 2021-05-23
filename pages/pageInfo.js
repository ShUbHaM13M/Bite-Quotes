import Quotes from './Quotes';
import RandomQuotes from './RandomQuotes';
import About from './About';
import Author from './Author';
import AuthorStack from '../navigators/AuthorStack'
import SavedQuotes from './SavedQuotes';
import SavedQuoteStack from '../navigators/SavedQuoteStack';

// no need to define textLight and textDark in event page object

const pages = [
  {
    name: 'Random Quotes',
    component: RandomQuotes,
    description: 'Get a random quote.',
    showHeader: false,
    color: '#E2DDD1',
    color2: '#F3F1ED',
    dark: '#0E0D0B',
    dark1: '#1C1C1C',
    netRequired: true
  },
  {
    name: 'Quotes',
    component: Quotes,
    description: 'Get inspired by Quotes.',
    showHeader: false,
    color: '#F9AC8A',
    color2: '#FBC6AE',
    dark: '#9C431C',
    dark1: '#692505',
    netRequired: true
  },
  {
    name: 'Saved Quotes',
    component: SavedQuoteStack,
    description: 'Browse Your saved quotes.',
    showHeader: false,
    color: '#F9D28A',
    color2: '#FBE0AE',
    dark: '#9C6F1C',
    dark1: '#694605',
    netRequired: false
  },
  {
    name: 'Authors',
    component: AuthorStack,
    description: 'Browse Authors.',
    showHeader: false,
    color: '#B1F98A',
    color2: '#D6FBAE',
    dark: '#478306',
    dark1: '#396905',
    netRequired: true
  },
  {
    name: 'About',
    component: About,
    description: 'About this app.',
    showHeader: false,
    color: '#6CC084',
    color2: '#90D0A2',
    dark: '#223F2A',
    dark1: '#639771',
    netRequired: false
  },
];

export default pages;
