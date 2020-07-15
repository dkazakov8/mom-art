import cn from 'classnames';
import React from 'react';

import { routes } from 'routes';
import { Link } from 'components/Link';
import { ConnectedComponent } from 'components/ConnectedComponent';

import styles from './Header.scss';
import { messages } from './messages';

const menuArray = [
  {
    title: messages.menuGallery,
    route: routes.gallery,
  },
  {
    title: messages.menuAbout,
    route: routes.about,
  },
  {
    title: messages.menuReviews,
    route: routes.reviews,
  },
  {
    title: messages.menuLocalization,
    route: routes.editLocalization,
  },
];

@ConnectedComponent.observer
export class Menu extends ConnectedComponent {
  declare context: typeof ConnectedComponent['context'];

  render() {
    const {
      store,
      store: {
        router: { currentRoute },
        user,
      },
    } = this.context;

    return (
      <div className={styles.menu}>
        {menuArray
          .filter(({ route }) => !route.rights || (route.rights === 'admin' && user.isLoggedIn))
          .map(({ title, route }) => {
            const isActive = currentRoute.name === route.name;

            return (
              <Link
                key={route.name}
                className={cn(styles.menuItem, isActive && styles.active)}
                route={route}
              >
                {store.getLn(title)}
              </Link>
            );
          })}
      </div>
    );
  }
}
