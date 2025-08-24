import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCog,
  faUser,
  faBirthdayCake,
  faStar,
  faDna,
  faMountain,
  faUsers,
  faChevronRight,
  faTools,
  faStickyNote,
  faArrowUp
} from '@fortawesome/free-solid-svg-icons';

// 只导入项目中实际使用的图标
library.add(
  faCog,
  faUser,
  faBirthdayCake,
  faStar,
  faDna,
  faMountain,
  faUsers,
  faChevronRight,
  faTools,
  faStickyNote,
  faArrowUp
);

console.log('Font Awesome icons loaded successfully');