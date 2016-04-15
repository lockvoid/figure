import * as React from 'react';

interface MetrikaProps {
  app: number;
}

export const Metrika = ({ app }: MetrikaProps) => (
   <script dangerouslySetInnerHTML={{ __html: `
      (function (d, w, c) {
          (w[c] = w[c] || []).push(function() {
              try {
                  w.yaCounter${app} = new Ya.Metrika({
                      id:${app},
                      clickmap:true,
                      trackLinks:true,
                      accurateTrackBounce:true,
                      trackHash:true
                  });
              } catch(e) { }
          });

          var n = d.getElementsByTagName("script")[0],
              s = d.createElement("script"),
              f = function () { n.parentNode.insertBefore(s, n); };
          s.type = "text/javascript";
          s.async = true;
          s.src = "https://mc.yandex.ru/metrika/watch.js";

          if (w.opera == "[object Opera]") {
              d.addEventListener("DOMContentLoaded", f, false);
          } else { f(); }
      })(document, window, "yandex_metrika_callbacks");
  `}} />
);

