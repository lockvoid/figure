import * as React from 'react';

import * as styles from './header.css.json';

export const Header = ({ theme = '', isAuth = false }) => {
  const themeClassName = [styles.header, styles[`header--${theme}`]].join(' ');

  return (
    <header className={themeClassName} id="header">
      <div className={`${styles.container} header__container`}>
        <a className={`${styles.logo} header__logo`} href="/">/* @include /public/images/figure.svg */</a>

        <nav>
          <ul className={styles.ul}>
            <li className={styles.li}>
              <a className={`${styles.item} header__item`} href="https://github.com/therondb/figure">View on GitHub</a>
            </li>

            <li className={styles.li}>
              <a className={`${styles.item} header__item`} href="mailto:support@figure-app.com">Contact</a>
            </li>

            <li className={styles.li}>
              {isAuth ? <a className={`${styles.item} header__item`} href="/">Go to App</a> : <a className={`${styles.item} header__item`} href="/signin">Sign In</a>}
            </li>
          </ul>
        </nav>
      </div>

      <script dangerouslySetInnerHTML={{ __html: `
        var __header = document.getElementById('header');

        window.addEventListener('scroll', function() {
          var toggle = window.pageYOffset > 40;

          __header.classList.toggle('${styles[`header--narrow`]}', toggle);
          __header.classList.toggle('${styles[`header--${theme}-narrow`]}', toggle);
        });
      ` }} />
    </header>
  );
};
