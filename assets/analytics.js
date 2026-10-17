/* Birdzzle公式サイトのアクセス解析(Googleアナリティクス4、同意モード)。同意するまでは解析用Cookieを使わない。 */
(function () {
  var script = document.currentScript;
  var GA = script && script.getAttribute('data-ga');
  if (!GA) return;
  var KEY = 'bz_consent', saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) {}
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('consent', 'default', {
    analytics_storage: saved === 'granted' ? 'granted' : 'denied',
    ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied'
  });
  gtag('js', new Date());
  gtag('config', GA, { allow_google_signals: false, allow_ad_personalization_signals: false });
  var loader = document.createElement('script');
  loader.async = true;
  loader.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA);
  document.head.appendChild(loader);

  function ready(fn) { if (document.readyState !== 'loading') fn(); else document.addEventListener('DOMContentLoaded', fn); }
  ready(function () {
    var banner = document.getElementById('consent');
    if (banner && saved === null) banner.hidden = false;
    if (banner) banner.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('button[data-consent]');
      if (!b) return;
      var v = b.getAttribute('data-consent');
      try { localStorage.setItem(KEY, v); } catch (err) {}
      gtag('consent', 'update', { analytics_storage: v });
      banner.hidden = true;
    });
  });

  // App Storeボタン(どのページ・どの導線か)と「アプリで開く」の計測。
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a');
    if (!a) return;
    if (a.classList.contains('dl')) {
      var m = a.href.match(/[?&]ct=([^&]+)/);
      gtag('event', 'app_store_click', { campaign: m ? m[1] : '', page_path: location.pathname });
    } else if (a.classList.contains('open-app')) {
      gtag('event', 'app_open_click', { campaign: a.getAttribute('data-src') || '', page_path: location.pathname });
    }
  });
})();
