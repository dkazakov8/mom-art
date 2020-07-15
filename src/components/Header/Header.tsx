import React from 'react';

import { ConnectedComponent } from 'components/ConnectedComponent';

import { Menu } from './Menu';
import { Logo } from './Logo';
import { Logout } from './Logout';
import { LangChanger } from './LangChanger';
import { ThemeChanger } from './ThemeChanger';
import styles from './Header.scss';

@ConnectedComponent.observer
export class Header extends ConnectedComponent {
  declare context: typeof ConnectedComponent['context'];

  render() {
    return (
      <div className={styles.header}>
        <Logo />
        <Menu />
        <LangChanger />
        <ThemeChanger />
        <Logout />
      </div>
    );
  }
}
