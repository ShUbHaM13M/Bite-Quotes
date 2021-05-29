import Quotes from './Quote/Quotes';
import RandomQuotes from './RandomQuote/RandomQuotes';
import About from './About/About';
import AuthorStack from '../navigators/AuthorStack'
import SavedQuoteStack from '../navigators/SavedQuoteStack';

const pages = [
  {
    name: 'Random Quotes',
    component: RandomQuotes,
    description: 'Get a random quote.',
    netRequired: true,
  },
  {
    name: 'Quotes',
    component: Quotes,
    description: 'Get inspired by Quotes.',
    netRequired: true,
  },
  {
    name: 'Saved Quotes',
    component: SavedQuoteStack,
    description: 'Browse Your saved quotes.',
    netRequired: false
  },
  {
    name: 'Authors',
    component: AuthorStack,
    description: 'Browse Authors.',
    netRequired: true
  },
  {
    name: 'About',
    component: About,
    description: 'About this app.',
    netRequired: false
  },
];

export default pages;
