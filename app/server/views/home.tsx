import * as React from 'react';

import { Page } from './layouts/page';

//  Even for mobile apps -  we provide an endpoint to you, no matter how data is
//  sent to us.
export default ({ isAuth }) => (
  <Page className="pages">
    <main className="home">
      <header className="main">
        <wrapper>
          <nav className="menu">
            <a href="/" className="logo">/* @include /public/images/figure.svg */</a>

            <ul>
              <li>
                <a href="https://github.com/rosendi/figure">View on GitHub</a>
              </li>

              <li>
                <a href="mailto:support@figure-app.com">Contact</a>
              </li>

              <li>
                {isAuth ? <a href="/">Go to App</a> : <a href="/signin">Sign In</a>}
              </li>
            </ul>
          </nav>

          <div className="intro">
            <h1>Painless forms for designers and developers.</h1>
            <h2>Collect, reduce and stream form data while avoiding crutches.</h2>

            <a href="/login" className="signup">
              <div>Sign Up for Free</div>
            </a>
          </div>
        </wrapper>
      </header>

      <section className="features">
        <div className="feature">
          <h4>Markup</h4>
          <p>No more evil iFrame and CSS overrides. Write plain HTML and JavaScript for additional features.</p>
        </div>

        <div className="feature">
          <h4>Webhooks</h4>
          <p>Figure likes to talk with other apps. Use webhooks to keep other services in sync with incoming data.</p>
        </div>

        <div className="feature">
          <h4>Reducers</h4>
          <p>Data isn't static. Define a reducer that transforms incoming data. Fetch the result back later using our API.</p>
        </div>
      </section>

      <section className="video">
        <h3>Put simply, Figure gives an endpoint to tech-savvy individuals like you, no matter how data is sent.</h3>
     </section>

      <section className="source">
         <wrapper>
           <h3>Open source</h3>
           <p>Figure is a complete, production-ready, and open-sourced application powered by <a href="https://therondb.com">Theron</a> - a reactive storage for realtime apps. Check out its <a href="https://therondb.com/docs">documentation</a> and create amazing apps with Theron.</p>
         </wrapper>
      </section>

      <footer className="main">
        <wrapper>
          <p>© <a href="https://therondb.com">Theron</a> 2016 under the terms of the <a href="https://github.com/rosendi/figure/blob/master/LICENSE">MIT License</a>.</p>
        </wrapper>
      </footer>
    </main>
  </Page>
);
