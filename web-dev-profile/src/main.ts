import './styles/global.css';
import './styles/animations.css';
import './styles/responsive.css';

import { Navbar } from './components/navbar';
import { Skills } from './sections/skills';
import { Projects } from './sections/projects';
import { About } from './sections/about';
import { initScrollAnimations } from './animations/scrollAnimations';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  ${Navbar()}
  ${Skills()}
  ${Projects()}
  ${About()}
`;

initScrollAnimations();