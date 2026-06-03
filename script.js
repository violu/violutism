(() => {
  "use strict";
  console.log("script.js loaded");

  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  const CONFIG = (window.SITE_CONFIG || {});
  console.log("CONFIG:", CONFIG);

  (function applyStoredThemeEarly() {
    try {
      const v = localStorage.getItem("vio:theme");
      document.documentElement.dataset.theme = (v === "night" || v === "day") ? v : "day";
    } catch (_) {
      document.documentElement.dataset.theme = "day";
    }
  })();


  const ICONS = {
    telegram:
      `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"/></svg>`,
    github:
      `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 .5C5.37.5 0 5.78 0 12.29c0 5.21 3.44 9.62 8.21 11.18.6.11.82-.26.82-.57 0-.28-.01-1.02-.02-2-3.34.71-4.04-1.59-4.04-1.59-.55-1.38-1.34-1.74-1.34-1.74-1.09-.74.08-.73.08-.73 1.21.08 1.84 1.23 1.84 1.23 1.07 1.81 2.81 1.29 3.5.99.11-.77.42-1.29.76-1.59-2.66-.3-5.47-1.31-5.47-5.83 0-1.29.47-2.34 1.23-3.17-.12-.3-.53-1.51.12-3.15 0 0 1-.32 3.3 1.21a11.6 11.6 0 0 1 6 0c2.29-1.53 3.3-1.21 3.3-1.21.65 1.64.24 2.85.12 3.15.77.83 1.23 1.88 1.23 3.17 0 4.53-2.81 5.53-5.49 5.82.43.36.81 1.09.81 2.2 0 1.59-.01 2.86-.01 3.25 0 .31.22.69.83.57C20.57 21.9 24 17.49 24 12.29 24 5.78 18.63.5 12 .5z"/></svg>`,
    lastfm:
      `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M10.6 17.27l-.86-2.32s-1.4 1.55-3.5 1.55c-1.86 0-3.18-1.62-3.18-4.21 0-3.32 1.68-4.51 3.32-4.51 2.36 0 3.12 1.53 3.77 3.5l.85 2.66c.86 2.61 2.48 4.71 7.13 4.71 3.34 0 5.59-1.02 5.59-3.7 0-2.16-1.24-3.29-3.54-3.83l-1.71-.39c-1.18-.27-1.53-.76-1.53-1.57 0-.92.73-1.46 1.91-1.46 1.29 0 1.99.49 2.1 1.65l2.68-.31c-.22-2.42-1.88-3.41-4.65-3.41-2.45 0-4.84.92-4.84 3.87 0 1.84.89 3 3.13 3.54l1.81.43c1.36.32 1.81.89 1.81 1.66 0 1-.97 1.4-2.79 1.4-2.71 0-3.83-1.42-4.47-3.36l-.88-2.66c-1.13-3.49-2.93-4.78-6.49-4.78C2.78 5.74 0 8.18 0 12.41c0 4.06 2.08 6.25 5.81 6.25 3.01 0 4.46-1.41 4.79-1.39z"/></svg>`,
    spotify:
      `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12C24 5.4 18.66 0 12 0zm5.52 17.34c-.24.36-.66.48-1.02.24-2.82-1.74-6.36-2.1-10.56-1.14-.42.12-.78-.18-.9-.54-.12-.42.18-.78.54-.9 4.56-1.02 8.52-.6 11.64 1.32.42.18.48.66.3 1.02zm1.44-3.3c-.3.42-.84.6-1.26.3-3.24-1.98-8.16-2.58-11.94-1.38-.48.12-1.02-.12-1.14-.6-.12-.48.12-1.02.6-1.14 4.38-1.32 9.78-.66 13.5 1.62.36.18.54.78.24 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.3c-.6.18-1.2-.18-1.38-.72-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.72 1.62.54.3.72 1.02.42 1.56-.3.42-1.02.6-1.56.3z"/></svg>`,
    discord:
      `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>`,
    arena:
      `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 0C5.36 0 0 5.36 0 12s5.36 12 12 12 12-5.36 12-12S18.64 0 12 0zm0 4.27c2.57 0 4.66 2.09 4.66 4.66S14.57 13.59 12 13.59 7.34 11.5 7.34 8.93 9.43 4.27 12 4.27zm-5.86 13.6c0-1.73 1.4-3.13 3.13-3.13h5.46c1.73 0 3.13 1.4 3.13 3.13v.27c-1.62 1.18-3.61 1.86-5.86 1.86s-4.24-.68-5.86-1.86v-.27z"/></svg>`,
    mail:
      `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M2 4h20a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 2v.5l10 6.25 10-6.25V6H2zm0 2.85V18h20V8.85L12 15.1 2 8.85z"/></svg>`,
    twitter:
      `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
     x:
       `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
      steam:
        `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.454 1.012H7.54zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273-.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.253 0-2.265-1.014-2.265-2.265z"/></svg>`,
      osu:
        `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M7.698 10.362c-.1855-.2184-.4189-.3905-.7002-.5162-.2813-.1257-.6104-.1885-.9874-.1885s-.7046.0628-.9829.1885-.5088.2978-.6912.5162c-.1827.2185-.3203.4773-.413.7765-.0928.2993-.1391.6194-.1391.9605 0 .3412.0463.6584.1391.9516.0927.2933.2303.5491.413.7675.1824.2185.4129.3891.6912.5116.2783.1226.6059.1841.9829.1841s.7061-.0615.9875-.1841c.2813-.1226.5146-.2931.7002-.5116.1855-.2184.3231-.4742.413-.7675.0897-.2931.1346-.6104.1346-.9516 0-.3411-.0449-.6612-.1346-.9605-.0899-.2992-.2276-.558-.4131-.7765zm-.965 2.8096c-.1467.2484-.3875.3725-.7227.3725-.3291 0-.567-.1241-.7136-.3725-.1467-.2483-.2199-.6059-.2199-1.0727s.0732-.8243.2199-1.0727c.1466-.2482.3844-.3725.7136-.3725.3352 0 .5759.1243.7227.3725.1466.2484.2199.6059.2199 1.0727.0001.4668-.0733.8245-.2199 1.0727zm11.8894-.8303-.0898-4.3896a4.5409 4.5409 0 0 1 .6912-.0539c.2334 0 .4668.0179.7002.0539l-.0898 4.3896c-.2096.0359-.41.0538-.6015.0538a3.4957 3.4957 0 0 1-.6103-.0538zm1.3196 1.4003c0 .2215-.0179.443-.0538.6643a4.2055 4.2055 0 0 1-.6553.0538 4.1414 4.1414 0 0 1-.6642-.0538 4.0882 4.0882 0 0 1-.0539-.6553c0-.2154.018-.4367.0539-.6643a4.0876 4.0876 0 0 1 .6552-.0538c.2155 0 .4368.018.6643.0538.0359.2276.0538.446.0538.6553zm-3.2226-4.0305c.2095 0 .422.018.6373.0539v4.4614c-.1916.0659-.4443.1302-.7585.193-.3141.0629-.6418.0943-.9829.0943-.3052 0-.5985-.024-.8798-.0718-.2813-.0479-.5282-.1495-.7405-.3052-.2125-.1555-.3815-.3829-.5072-.6823-.1257-.2991-.1885-.697-.1885-1.1938V9.765a3.8725 3.8725 0 0 1 .6373-.0539c.2094 0 .4219.018.6373.0539v2.4596c0 .2455.0194.4474.0584.6059.0388.1586.0988.2843.1795.377a.6606.6606 0 0 0 .3007.1974c.1197.0391.2603.0584.4219.0584.2214 0 .407-.0209.5566-.0628V9.765a3.8218 3.8218 0 0 1 .6284-.0539zm-4.3625 2.6841c.0538.1497.0808.3321.0808.5476 0 .2215-.0464.428-.1392.6194-.0928.1916-.2274.3577-.4039.4982-.1766.1407-.3905.2514-.6418.3322-.2514.0808-.5356.1212-.8528.1212a5.2984 5.2984 0 0 1-.395-.0135 3.1226 3.1226 0 0 1-.3456-.0448 4.0482 4.0482 0 0 1-.3277-.0763 3.9336 3.9336 0 0 1-.35-.1166 2.5768 2.5768 0 0 1 .0852-.4893 3.0737 3.0737 0 0 1 .1751-.4802c.1975.0779.3844.1362.561.1751.1765.039.3605.0584.5521.0584.0838 0 .175-.0075.2738-.0225a.9945.9945 0 0 0 .2737-.0808.6467.6467 0 0 0 .2109-.1526c.0569-.0628.0853-.145.0853-.2469 0-.1436-.0434-.2469-.1302-.3097-.0868-.0628-.208-.1181-.3636-.1661l-.5565-.1616c-.3352-.0956-.5969-.2379-.7855-.4263-.1885-.1886-.2827-.4713-.2827-.8484 0-.4547.163-.8108.4892-1.0682.3261-.2573.7705-.386 1.333-.386.2334 0 .4638.0211.6913.0629.2273.0419.4578.1048.6912.1885-.012.1557-.0419.3173-.0897.4847-.048.1676-.1048.3142-.1706.4398a3.58 3.58 0 0 0-.4757-.1571 2.18 2.18 0 0 0-.5477-.0673c-.2034 0-.3621.0314-.4758.0943-.1137.0629-.1705.1631-.1705.3007 0 .1317.0403.2244.1211.2783.0809.0538.1959.1048.3456.1526l.5117.1526c.1675.048.3187.1063.4533.1751.1347.0688.2498.1541.3456.2558.0958.1016.1707.2272.2246.3768zM12 0C5.3726 0 0 5.3726 0 12.0001 0 18.6273 5.3726 24 12 24c6.6275 0 12-5.3727 12-11.9999C24 5.3726 18.6275 0 12 0zm0 22.8c-5.9647 0-10.8-4.8354-10.8-10.7999C1.2 6.0353 6.0353 1.2 12 1.2s10.8 4.8353 10.8 10.8001C22.8 17.9646 17.9647 22.8 12 22.8z"/></svg>`,
     instagram:
      `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.71 3.71 0 0 1-1.38-.9 3.71 3.71 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.88 5.88 0 0 0-2.13 1.38A5.88 5.88 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91a5.88 5.88 0 0 0 1.38 2.13 5.88 5.88 0 0 0 2.13 1.38c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.88 5.88 0 0 0 2.13-1.38 5.88 5.88 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.88 5.88 0 0 0-1.38-2.13A5.88 5.88 0 0 0 19.86.63C19.1.33 18.22.13 16.95.07 15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84zm0 10.16A4 4 0 1 1 16 12a4 4 0 0 1-4 4zm6.4-11.85a1.44 1.44 0 1 0 1.44 1.44 1.44 1.44 0 0 0-1.44-1.44z"/></svg>`,
    youtube:
      `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
    soundcloud:
      `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M1.175 12.225c-.051 0-.094.046-.101.1l-.233 2.154.233 2.105c.007.058.05.098.101.098.05 0 .09-.04.099-.098l.255-2.105-.27-2.154c0-.057-.045-.1-.099-.1m18.785-2.34c-.42-2.395-2.514-4.221-5.039-4.221-.658 0-1.288.124-1.866.349l-.001.001c-.226.085-.286.171-.288.346v6.611c.002.184.155.353.34.353H21.4c.083-.005.156-.058.184-.143.045-.122.06-.198.062-.225.001-.064.018-.142.018-.193 0-1.39-1.179-2.531-2.515-2.531"/></svg>`,
    twitch:
      `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/></svg>`,
    bandcamp:
      `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M0 18.75l7.437-13.5H24l-7.438 13.5z"/></svg>`,
    letterboxd:
      `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M.488 12c0-2.5 2.024-4.524 4.523-4.524S9.535 9.5 9.535 12s-2.024 4.524-4.524 4.524S.488 14.5.488 12zm9.047 0c0-2.5 2.024-4.524 4.524-4.524S18.583 9.5 18.583 12s-2.024 4.524-4.524 4.524S9.535 14.5 9.535 12zm9.048 0c0-2.5 2.024-4.524 4.524-4.524S23.512 9.5 23.512 12s-2.024 4.524-4.523 4.524S18.583 14.5 18.583 12z"/></svg>`,
    rss:
      `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M19.199 24C19.199 13.467 10.533 4.8 0 4.8V0c13.165 0 24 10.835 24 24h-4.801zM3.291 17.415a3.3 3.3 0 0 1 3.293 3.295A3.303 3.303 0 0 1 3.291 24C1.47 24 0 22.526 0 20.71s1.47-3.295 3.291-3.295zM15.909 24h-4.665c0-6.169-5.075-11.245-11.244-11.245V8.09c8.727 0 15.909 7.184 15.909 15.91z"/></svg>`,
    globe:
      `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-1 21.95V19a2 2 0 0 0-2-2v-1l-5-5 1-1h2v-2h2v-3a2 2 0 0 0-2-2H4.6A9.99 9.99 0 0 1 11 2.05v1.95a2 2 0 0 0 2 2h1l1 1v2l-2 2v3l3 3 1.5-1.5A10.02 10.02 0 0 1 13 21.95v-3h-2v3z"/></svg>`,
    music:
      `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M9 18V6l12-3v13a4 4 0 1 1-2-3.46V8.31L11 10.2V18a4 4 0 1 1-2-3.46z"/></svg>`,
    pen:
      `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M14.06 4.94l3-3 3 3-3 3-3-3zm-1.41 1.41-9.7 9.7L1 22l5.95-1.95 9.7-9.7-3-3z"/></svg>`,
    flower:
      `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2c1.1 0 2 .9 2 2 0 .57-.24 1.08-.62 1.45.4.04.8.13 1.18.27.42-1.07 1.46-1.83 2.69-1.83 1.6 0 2.9 1.3 2.9 2.9 0 1.23-.76 2.27-1.83 2.69.14.38.23.78.27 1.18C18.92 10.24 19.43 10 20 10c1.1 0 2 .9 2 2s-.9 2-2 2c-.57 0-1.08-.24-1.45-.62-.04.4-.13.8-.27 1.18 1.07.42 1.83 1.46 1.83 2.69 0 1.6-1.3 2.9-2.9 2.9-1.23 0-2.27-.76-2.69-1.83-.38.14-.78.23-1.18.27.38.37.62.88.62 1.45 0 1.1-.9 2-2 2s-2-.9-2-2c0-.57.24-1.08.62-1.45-.4-.04-.8-.13-1.18-.27-.42 1.07-1.46 1.83-2.69 1.83-1.6 0-2.9-1.3-2.9-2.9 0-1.23.76-2.27 1.83-2.69-.14-.38-.23-.78-.27-1.18C5.08 13.76 4.57 14 4 14c-1.1 0-2-.9-2-2s.9-2 2-2c.57 0 1.08.24 1.45.62.04-.4.13-.8.27-1.18C4.65 9.02 3.89 7.98 3.89 6.75c0-1.6 1.3-2.9 2.9-2.9 1.23 0 2.27.76 2.69 1.83.38-.14.78-.23 1.18-.27C10.24 5.08 10 4.57 10 4c0-1.1.9-2 2-2zm0 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/></svg>`,
  };
  const iconSvg = (name) => ICONS[name] || ICONS.flower;

  function pickText(value) {
    if (value == null) return "";
    if (typeof value === "string") return value;
    if (typeof value === "object") return value.en || value.ru || "";
    return String(value);
  }

  function isPlaceholder(v) {
    if (v == null) return true;
    if (typeof v !== "string") return false;
    return !v || /^TODO/i.test(v) || /^YOUR_/i.test(v) || v === "YYYY-MM-DD";
  }

  // ---------- HTML escape ----------
  function esc(str) {
    if (str == null) return "";
    return String(str)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // ---------- state ----------
  let soundEnabled = true;
  let bgmStarted   = false;
  let activeIndex  = 0;
  let nowTimer     = null;

  let lastTracks    = null;
  let lastUpdatedAt = "";
  let lastPresence  = null;

  const items       = $$(".menu__item");
  const sfxHover    = $("#sfx-hover");
  const sfxClick    = $("#sfx-click");
  const bgm         = $("#bgm");
  const bootScreen  = $("#boot-screen");
  const soundToggle = $("#sound-toggle");
  const soundLabel  = $(".hud__sound-text");
  const hudTime     = $("#hud-time");
  const bgVideo     = $("#bg-video");
  const particlesEl = $("#particles");
  const dashboardEl = $("#dashboard");
  const dashTrack   = $("#dashboard-track");
  const layoutEl    = $("#layout");
  const themeToggle = $("#theme-toggle");
  const themeLabel  = $("#theme-toggle-text");


  const DASH_TARGETS = {
    about:    "#dash-about",
    now:      "#dash-now",
    links:    "#dash-links",
    projects: "#dash-projects",
    skills:   "#dash-skills",
  };

  // ---------- petals ----------
  const PETALS = ["❀", "✿", "✾", "❁", "·", "*", "❀", "✿"];
  function spawnParticles(n = 28) {
    if (!particlesEl) return;
    const frag = document.createDocumentFragment();
    for (let i = 0; i < n; i++) {
      const s = document.createElement("span");
      s.textContent = PETALS[Math.floor(Math.random() * PETALS.length)];
      s.style.left              = (Math.random() * 100) + "%";
      const duration            = 18 + Math.random() * 22;
      s.style.animationDuration = duration + "s";
      s.style.animationDelay    = (-Math.random() * duration) + "s";
      s.style.fontSize          = (10 + Math.random() * 12) + "px";
      frag.appendChild(s);
    }
    particlesEl.appendChild(frag);
  }

  // --- audio ---
  let audioCtx = null;
  let masterGain = null;
  function ensureAudioCtx() {
    if (!audioCtx) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (Ctx) {
        audioCtx = new Ctx();
        masterGain = audioCtx.createGain();
        masterGain.gain.value = 1;
        masterGain.connect(audioCtx.destination);
      }
    }
    if (audioCtx && audioCtx.state === "suspended") audioCtx.resume();
    return audioCtx;
  }

  function softPluck({ freq = 220, duration = 0.55, volume = 0.07 } = {}) {
    const ctx = ensureAudioCtx();
    if (!ctx) return;
    const now = ctx.currentTime;
    const env = ctx.createGain();
    env.gain.setValueAtTime(0, now);
    env.gain.linearRampToValueAtTime(volume, now + 0.03);
    env.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass"; filter.frequency.value = 1400; filter.Q.value = 0.4;
    const delay = ctx.createDelay(0.5);
    delay.delayTime.value = 0.18;
    const delayGain = ctx.createGain();
    delayGain.gain.value = 0.2;
    delay.connect(delayGain).connect(masterGain);
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.985, now + duration);
    const osc2 = ctx.createOscillator();
    osc2.type = "triangle";
    osc2.frequency.value = freq * 2;
    const g2 = ctx.createGain();
    g2.gain.value = 0.12;
    osc.connect(env);
    osc2.connect(g2).connect(env);
    env.connect(filter).connect(masterGain);
    env.connect(delay);
    osc.start(now); osc2.start(now);
    osc.stop(now + duration + 0.05);
    osc2.stop(now + duration + 0.05);
  }

  let ambientNodes = null;
  function startSynthAmbient() {
    if (ambientNodes) return;
    const ctx = ensureAudioCtx();
    if (!ctx) return;
    const out = ctx.createGain();
    out.gain.value = 0;
    out.connect(masterGain);
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass"; filter.frequency.value = 600; filter.Q.value = 0.3;
    filter.connect(out);
    const tones = [87.31, 110.00, 130.81, 174.61];
    const oscs = tones.map((f, i) => {
      const o = ctx.createOscillator();
      o.type = "sine"; o.frequency.value = f;
      const detLfo = ctx.createOscillator();
      detLfo.type = "sine"; detLfo.frequency.value = 0.05 + i * 0.02;
      const detLfoGain = ctx.createGain();
      detLfoGain.gain.value = 3;
      detLfo.connect(detLfoGain).connect(o.detune);
      const g = ctx.createGain();
      g.gain.value = 0.07 - i * 0.012;
      o.connect(g).connect(filter);
      o.start(); detLfo.start();
      return { o, detLfo };
    });
    const lfo = ctx.createOscillator();
    lfo.type = "sine"; lfo.frequency.value = 0.04;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 120;
    lfo.connect(lfoGain).connect(filter.frequency);
    lfo.start();
    out.gain.setValueAtTime(0, ctx.currentTime);
    out.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 6);
    ambientNodes = { out, oscs, lfo };
  }
  function stopSynthAmbient() {
    if (!ambientNodes) return;
    const ctx = audioCtx;
    const { out, oscs, lfo } = ambientNodes;
    out.gain.cancelScheduledValues(ctx.currentTime);
    out.gain.setValueAtTime(out.gain.value, ctx.currentTime);
    out.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.4);
    setTimeout(() => {
      try {
        oscs.forEach(({ o, detLfo }) => { o.stop(); detLfo.stop(); });
        lfo.stop();
      } catch (_) {}
    }, 1500);
    ambientNodes = null;
  }

  let lastHoverAt = 0;
  function playSfx(kind) {
    if (!soundEnabled) return;
    if (kind === "hover") {
      const now = performance.now();
      if (now - lastHoverAt < 70) return;
      lastHoverAt = now;
    }
    const el = kind === "click" ? sfxClick : sfxHover;
    if (el && el.src && el.readyState >= 2) {
      try {
        el.currentTime = 0;
        const p = el.play();
        if (p && typeof p.catch === "function") p.catch(() => synthFallback(kind));
        return;
      } catch (_) {}
    }
    synthFallback(kind);
  }
  function synthFallback(kind) {
    if (kind === "click") softPluck({ freq: 196.00, duration: 0.7, volume: 0.09 });
    else                  softPluck({ freq: 261.63, duration: 0.35, volume: 0.035 });
  }

  function startBgm() {
    if (bgmStarted || !soundEnabled) return;
    bgmStarted = true;
    if (bgm && bgm.src) {
      bgm.volume = 0.05;
      const p = bgm.play();
      if (p && typeof p.catch === "function") p.catch(() => startSynthAmbient());
    } else {
      startSynthAmbient();
    }
  }
  function stopBgm() {
    if (bgm) { try { bgm.pause(); } catch (_) {} }
    stopSynthAmbient();
    bgmStarted = false;
  }
  function setSound(on) {
    soundEnabled = on;
    soundToggle.classList.toggle("is-off", !on);
    if (soundLabel) soundLabel.textContent = on ? "melody · on" : "melody · off";
    if (!on) stopBgm(); else startBgm();
  }

  // --- menu nav ---
  function setActive(i) {
    activeIndex = (i + items.length) % items.length;
    items.forEach((el, idx) => el.classList.toggle("is-active", idx === activeIndex));
    items[activeIndex].focus({ preventScroll: true });
  }

  function activate(item) {
    if (!item) return;
    playSfx("click");
    if (item.id === "quit-btn") { runQuit(); return; }
    const target = item.dataset.target;
    if (!target) return;
    const dashSel = DASH_TARGETS[target];
    if (dashSel) jumpToDashCard(dashSel);
  }

  function highlightDashCard(card) {
    $$(".dash-card").forEach((c) => c.classList.remove("is-highlight"));
    card.classList.add("is-highlight");
    clearTimeout(highlightDashCard._t);
    highlightDashCard._t = setTimeout(() => {
      card.classList.remove("is-highlight");
    }, 1800);
  }

   function runQuit() {
     playSfx("click");
     document.body.style.transition = "opacity 1.2s ease, filter 1.2s ease";
     document.body.style.filter = "blur(6px) brightness(0.4) saturate(0.6)";
     document.body.style.opacity = "0";
     setTimeout(() => {
       window.close();
     }, 1200);
   }

  // --- smooth transform scroll ---
  const Scroll = (() => {
    let target  = 0;
    let pos     = 0;
    let max     = 0;
    let raf     = null;
    let thumb   = null;
    let thumbHideT = null;

    const STIFFNESS = 0.12;
    const EPS       = 0.05;

    function ensureThumb() {
      if (!dashboardEl) return null;
      if (thumb) return thumb;
      thumb = document.createElement("div");
      thumb.className = "dashboard__thumb";
      dashboardEl.appendChild(thumb);
      return thumb;
    }

    function updateMax() {
      if (!dashboardEl || !dashTrack) { max = 0; return; }
      if (window.matchMedia("(max-width: 1100px)").matches) {
        max = 0;
        dashboardEl.classList.remove("has-overflow");
        return;
      }
      max = Math.max(0, dashTrack.scrollHeight - dashboardEl.clientHeight);
      dashboardEl.classList.toggle("has-overflow", max > 1);
    }

    function applyThumb() {
      if (!thumb || !dashboardEl) return;
      if (max <= 1) { thumb.style.opacity = "0"; return; }
      const visible = dashboardEl.clientHeight;
      const total   = visible + max;
      const trackH  = visible - 48;
      const h       = Math.max(28, Math.round(trackH * (visible / total)));
      const y       = 24 + Math.round((trackH - h) * (pos / max));
      thumb.style.height = h + "px";
      thumb.style.top    = y + "px";
      thumb.style.opacity = "0.7";
      clearTimeout(thumbHideT);
      thumbHideT = setTimeout(() => { thumb.style.opacity = "0.25"; }, 700);
    }

    function apply() {
      if (!dashTrack) return;
      dashTrack.style.setProperty("--scroll-y", (-pos).toFixed(2) + "px");
      applyThumb();
    }

    function tick() {
      const diff = target - pos;
      if (Math.abs(diff) < EPS) {
        pos = target;
        apply();
        raf = null;
        return;
      }
      pos += diff * STIFFNESS;
      apply();
      raf = requestAnimationFrame(tick);
    }
    function ensureRaf() { if (raf == null) raf = requestAnimationFrame(tick); }

    function clamp(v) { return Math.max(0, Math.min(max, v)); }

    function nudge(dy) {
      updateMax();
      if (max <= 0) return;
      target = clamp(target + dy);
      ensureRaf();
    }

    function scrollTo(y, smooth = true) {
      updateMax();
      target = clamp(y);
      if (!smooth) { pos = target; apply(); return; }
      ensureRaf();
    }

    function position() { return pos; }

    function init() {
      ensureThumb();
      updateMax();
      apply();

      window.addEventListener("wheel", (e) => {
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
        if (Math.abs(e.deltaY) < 1) return;
        if (window.matchMedia("(max-width: 1100px)").matches) return;
        if (max <= 0) { updateMax(); if (max <= 0) return; }
        e.preventDefault();
        let delta = e.deltaY;
        if (e.deltaMode === 1) delta *= 16;
        else if (e.deltaMode === 2) delta *= dashboardEl.clientHeight;
        nudge(delta);
      }, { passive: false });

      // touch scroll
      let touchY = null;
      let touchActive = false;
      dashboardEl.addEventListener("touchstart", (e) => {
        if (window.matchMedia("(max-width: 1100px)").matches) return;
        touchY = e.touches[0].clientY;
        touchActive = true;
      }, { passive: true });
      dashboardEl.addEventListener("touchmove", (e) => {
        if (!touchActive || touchY == null) return;
        const y = e.touches[0].clientY;
        const dy = touchY - y;
        touchY = y;
        nudge(dy);
      }, { passive: true });
      dashboardEl.addEventListener("touchend", () => {
        touchActive = false; touchY = null;
      });

      // PageUp/PageDown/Home/End
      window.addEventListener("keydown", (e) => {
        if (window.matchMedia("(max-width: 1100px)").matches) return;
        if (max <= 0) return;
        const h = dashboardEl.clientHeight;
        if (e.key === "PageDown") { e.preventDefault(); nudge(h * 0.85); }
        else if (e.key === "PageUp") { e.preventDefault(); nudge(-h * 0.85); }
        else if (e.key === "Home") { e.preventDefault(); scrollTo(0); }
        else if (e.key === "End")  { e.preventDefault(); scrollTo(max); }
      });

      // resize / content changes
      window.addEventListener("resize", () => { updateMax(); target = clamp(target); ensureRaf(); });
      if ("ResizeObserver" in window) {
        const ro = new ResizeObserver(() => {
          updateMax();
          target = clamp(target);
          apply();
        });
        ro.observe(dashTrack);
      }
    }

    return { init, nudge, scrollTo, position, updateMax };
  })();

  function jumpToDashCard(selector) {
  const card = $(selector);
  if (!card || !dashTrack || !dashboardEl) return;

  if (window.matchMedia("(max-width: 1100px)").matches) {
    card.scrollIntoView({ behavior: "smooth", block: "start" });
    highlightDashCard(card);
    return;
  }

  const absoluteOffset = card.offsetTop - 12;
  Scroll.scrollTo(absoluteOffset);
  highlightDashCard(card);
}

  // --- boot screen & clock ---
  function dismissBoot() {
    if (!bootScreen || bootScreen.classList.contains("is-hidden")) return;
    bootScreen.classList.add("is-hidden");
    setTimeout(() => { bootScreen.style.display = "none"; }, 900);
    startBgm();
    playSfx("click");
    setActive(0);
  }

  function tickClock() {
    if (!hudTime) return;
    const d = new Date();
    const pad = (n) => String(n).padStart(2, "0");
    hudTime.textContent = `${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }

  function setupVideoFallback() {
    if (!bgVideo) return;
    bgVideo.addEventListener("error", () => { bgVideo.style.display = "none"; });
    setTimeout(() => {
      if (bgVideo.readyState < 2) bgVideo.style.display = "none";
    }, 4000);
  }

  // --- render ---
  function renderProfileMeta() {
    const a = CONFIG.about || {};
    const nameEl = $("#profile-name");
    const subEl  = $("#profile-sub");

    if (nameEl && (!lastPresence || !lastPresence.discord_user)) {
      nameEl.textContent = a.name || "—";
    }
    if (subEl) {
      const loc = pickText(a.location);
      const age = pickText(a.age);
      const parts = [];
      if (lastPresence && lastPresence.discord_user && lastPresence.discord_user.username) {
        parts.push("@" + lastPresence.discord_user.username);
      }
      if (loc && !isPlaceholder(loc)) parts.push(loc);
      if (age && !isPlaceholder(age)) parts.push(age);
      subEl.textContent = parts.join(" · ");
    }
  }

  function renderGreetings() {
    const wrap = $("#greetings");
    const text = $("#greetings-text");
    if (!wrap || !text) return;
    const value = pickText(CONFIG.greetings);
    if (!value || isPlaceholder(value)) {
      wrap.hidden = true;
      text.textContent = "";
      return;
    }
    wrap.hidden = false;
    text.textContent = value;
  }

  function renderLinks() {
    const list = $("#links-list");
    if (!list) return;
    const links = CONFIG.links || [];
    list.innerHTML = "";
    links.forEach((l) => {
      const label = pickText(l.label);
      const note  = pickText(l.note);
      const li = document.createElement("li");
      li.innerHTML = `
        <a href="${esc(l.url)}" target="_blank" rel="noopener">
          <span class="quick-links__icon">${iconSvg(l.icon)}</span>
          <span class="quick-links__label">
            <span class="quick-links__label-text">${esc(label || "")}</span>
            ${note ? `<span class="quick-links__note">${esc(note)}</span>` : ""}
          </span>
        </a>
      `;
      list.appendChild(li);
    });
  }

  function renderProjects() {
    const wrap = $("#projects-list");
    if (!wrap) return;
    const projects = Array.isArray(CONFIG.projects) ? CONFIG.projects : [];
    wrap.innerHTML = "";
    if (!projects.length) {
      wrap.hidden = true;
      return;
    }
    wrap.hidden = false;
    projects.forEach((p) => {
      const title = pickText(p.title);
      const text  = pickText(p.text);
      const tag   = pickText(p.tag);
      const card = document.createElement(p.url ? "a" : "article");
      card.className = "card";
      if (p.url) {
        card.href = p.url;
        card.target = "_blank";
        card.rel = "noopener";
      }
      card.innerHTML = `
        <h3>${esc(title)}</h3>
        ${text ? `<p>${esc(text)}</p>` : ""}
        ${tag  ? `<span class="card__tag">${esc(tag)}</span>` : ""}
      `;
      wrap.appendChild(card);
    });
  }

  function renderSkills() {
    const list = $("#skills-list");
    if (!list) return;
    const skills = Array.isArray(CONFIG.skills) ? CONFIG.skills : [];
    list.innerHTML = "";
    if (!skills.length) {
      list.hidden = true;
      return;
    }
    list.hidden = false;
    skills.forEach((s) => {
      const title = pickText(s.title);
      const v = Math.max(0, Math.min(100, Number(s.value) || 0));
      const li = document.createElement("li");
      li.innerHTML = `<span>${esc(title)}</span><i style="--v:${v}%"></i>`;
      list.appendChild(li);
    });
  }

  // --- last.fm ---
  function isLastfmConfigured() {
    const lf = CONFIG.lastfm || {};
    const isConfigured = lf.username && !/^YOUR_/i.test(lf.username);
    console.log("Last.fm config check:", { username: lf.username, isConfigured });
    return isConfigured;
  }

  function renderLastfmPlaceholder() {
    const c = $("#now-content");
    if (!c) return;
    c.innerHTML = `<div class="now__placeholder">
      add your last.fm username and api key to <code>config.js</code>.<br>
      get a key here: <a href="https://www.last.fm/api/account/create" target="_blank" rel="noopener">last.fm/api/account/create</a>
    </div>`;
    const u = $("#now-username");
    if (u) u.removeAttribute("href");
  }

  function timeAgo(ts) {
    if (!ts) return "";
    const diff = Math.floor((Date.now() / 1000) - ts);
    if (diff < 60)        return "just now";
    if (diff < 3600)      return Math.floor(diff / 60) + " min ago";
    if (diff < 86400)     return Math.floor(diff / 3600) + " h ago";
    if (diff < 86400 * 7) return Math.floor(diff / 86400) + " d ago";
    const d = new Date(ts * 1000);
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${day}.${m}`;
  }

  function pickCover(track) {
    const arr = track.image || [];
    const big = [...arr].reverse().find((i) => i["#text"]);
    return big ? big["#text"] : "";
  }

  function buildLastfmUrl(extra = "") {
    const lf = CONFIG.lastfm;
    const base = "/api/lastfm"
         + "?username=" + encodeURIComponent(lf.username)
         + "&limit=" + (lf.limit || 8)
         + extra;
    if (lf.proxy && typeof lf.proxy === "string" && lf.proxy.trim()) {
      const p = lf.proxy.trim();
      return /url=$/.test(p) ? (p + encodeURIComponent(base)) : (p + base);
    }
    return base;
  }

  function lastfmJsonp() {
    return new Promise((resolve, reject) => {
      const cbName = "__lfm_cb_" + Math.random().toString(36).slice(2);
      const script = document.createElement("script");
      const cleanup = () => {
        try { delete window[cbName]; } catch (_) { window[cbName] = undefined; }
        if (script.parentNode) script.parentNode.removeChild(script);
        clearTimeout(timer);
      };
      const timer = setTimeout(() => { cleanup(); reject(new Error("last.fm timeout (jsonp)")); }, 8000);
      window[cbName] = (data) => {
        cleanup();
        if (!data) return reject(new Error("last.fm: empty response"));
        if (data.error) return reject(new Error(data.message || "last.fm error " + data.error));
        resolve((data.recenttracks && data.recenttracks.track) || []);
      };
      script.onerror = () => { cleanup(); reject(new Error("last.fm: script load error")); };
      script.src = buildLastfmUrl("&callback=" + cbName);
      document.head.appendChild(script);
    });
  }

  async function fetchRecentTracks() {
    console.log("fetchRecentTracks called");
    const url = buildLastfmUrl();
    console.log("Fetching from:", url);
    try {
      const res = await fetch(url, { mode: "cors" });
      console.log("Response:", res);
      if (!res.ok) throw new Error("last.fm http " + res.status);
      const text = await res.text();
      console.log("Response text:", text);
      const data = JSON.parse(text);
      console.log("Parsed data:", data);
      if (data.error) throw new Error(data.message || "last.fm error " + data.error);
      return (data.recenttracks && data.recenttracks.track) || [];
    } catch (e) {
      console.error("fetchRecentTracks error:", e);
      const msg = String(e && e.message || e);
      if (/NetworkError|Failed to fetch|network|CORS/i.test(msg) || location.protocol === "file:") {
        return await lastfmJsonp();
      }
      throw e;
    }
  }

  function renderTracks(tracks) {
    lastTracks = tracks;
    const c = $("#now-content");
    if (!c) return;
    if (!tracks.length) {
      c.innerHTML = `<div class="now__placeholder">silence for now</div>`;
      return;
    }
    c.innerHTML = "";
    tracks.forEach((tr) => {
      const live = tr["@attr"] && tr["@attr"].nowplaying === "true";
      const ts   = tr.date && tr.date.uts ? Number(tr.date.uts) : null;
      const cover = pickCover(tr);
      const a = document.createElement("a");
      a.className = "now__track" + (live ? " now__track--live" : "");
      a.href = (tr.url || "#");
      a.target = "_blank"; a.rel = "noopener";
      a.innerHTML = `
        <span class="now__cover" ${cover ? `style="background-image:url('${esc(cover)}')" data-loaded="true"` : ""}></span>
        <span class="now__meta">
          <span class="now__title">${esc(tr.name || "—")}</span>
          <span class="now__artist">${esc((tr.artist && tr.artist["#text"]) || "")}</span>
        </span>
        <span class="now__time">${live ? "now" : esc(timeAgo(ts))}</span>
      `;
      c.appendChild(a);
    });
    Scroll.updateMax();
  }

  async function loadNowPlaying() {
    const u = $("#now-username");
    const updated = $("#now-updated");

    if (!isLastfmConfigured()) {
      renderLastfmPlaceholder();
      if (updated) updated.textContent = "";
      return;
    }
    const lf = CONFIG.lastfm;
    if (u) {
      u.href = "https://www.last.fm/user/" + encodeURIComponent(lf.username);
      u.textContent = lf.username + " ↗";
    }
    try {
      const tracks = await fetchRecentTracks();
      renderTracks(tracks);
      if (updated) {
        const d = new Date();
        const pad = (n) => String(n).padStart(2, "0");
        const tt = `${pad(d.getHours())}:${pad(d.getMinutes())}`;
        lastUpdatedAt = tt;
        updated.textContent = "updated at " + tt;
      }
    } catch (e) {
      const c = $("#now-content");
      const isFile = location.protocol === "file:";
      const msg = String(e && e.message || e);
      const isNet = /NetworkError|Failed to fetch|network/i.test(msg);
      const isGeo = /403|access denied|error 11|access this service/i.test(msg);
      if (c) {
        let hint = "check the api key and username in <code>config.js</code>.";
        if (isGeo) {
          hint = `last.fm returned <strong>403 Access Denied</strong> — that's their geo-block (RU IPs since 2022).<br><br>on a host with a different IP everything works on its own. locally, uncomment <code>proxy</code> in <code>config.js</code>:<br><br><code>proxy: "https://corsproxy.io/?"</code>`;
        } else if (isFile && isNet) {
          hint = `the page is opened via <code>file://</code>, so the browser blocks the request.<br>start a local server and open <code>http://localhost:5500</code>:<br><br><code>python -m http.server 5500</code><br><small>or</small> <code>npx serve .</code>`;
        }
        c.innerHTML = `
          <div class="now__placeholder">
            couldn't fetch tracks.<br>
            ${hint}<br>
            <small>(${esc(msg)})</small>
          </div>`;
      }
    }
    if (nowTimer) clearTimeout(nowTimer);
    const refresh = Math.max(20, lf.refreshSeconds || 60) * 1000;
    nowTimer = setTimeout(loadNowPlaying, refresh);
  }

  // --- events ---
  function bindEvents() {
    items.forEach((item, idx) => {
      item.addEventListener("mouseenter", () => {
        setActive(idx);
        playSfx("hover");
      });
      item.addEventListener("focus", () => setActive(idx));
      item.addEventListener("click", () => activate(item));
    });

    document.addEventListener("keydown", (e) => {
      if (bootScreen && !bootScreen.classList.contains("is-hidden")) {
        dismissBoot();
        return;
      }
      switch (e.key) {
        case "ArrowDown":
        case "s":
        case "S":
          e.preventDefault(); playSfx("hover"); setActive(activeIndex + 1); break;
        case "ArrowUp":
        case "w":
        case "W":
          e.preventDefault(); playSfx("hover"); setActive(activeIndex - 1); break;
        case "Enter":
        case " ":
          e.preventDefault(); activate(items[activeIndex]); break;
      }
    });

    if (bootScreen) {
      bootScreen.addEventListener("click", dismissBoot, { once: false });
      bootScreen.addEventListener("touchstart", dismissBoot, { passive: true });
    }

    if (soundToggle) {
      soundToggle.addEventListener("click", (e) => {
        e.stopPropagation();
        ensureAudioCtx();
        setSound(!soundEnabled);
        if (soundEnabled) playSfx("click");
      });
    }

    if (themeToggle) {
      themeToggle.addEventListener("click", (e) => {
        e.stopPropagation();
        playSfx("click");
        Theme.toggle();
      });
    }

    const kickOff = () => { ensureAudioCtx(); startBgm(); };
    window.addEventListener("pointerdown", kickOff, { once: true });
    window.addEventListener("keydown", kickOff, { once: true });
  }

  // --- themes ---
  const Theme = (() => {
    const KEY = "vio:theme";
    const VALID = ["day", "night"];

    function read() {
      try { const v = localStorage.getItem(KEY); if (VALID.includes(v)) return v; } catch (_) {}
      return "day";
    }

    function syncLabel(theme) {
      if (!themeLabel) return;
      themeLabel.textContent = theme === "day" ? "night" : "day";
      if (themeToggle) {
        themeToggle.setAttribute(
          "aria-label",
          theme === "day" ? "Switch to night theme" : "Switch to day theme"
        );
      }
    }

    function set(theme, { animate = true } = {}) {
      if (!VALID.includes(theme)) theme = "day";
      const root = document.documentElement;

      if (animate && root.dataset.theme && root.dataset.theme !== theme) {
        root.classList.add("theme-transitioning");
        clearTimeout(set._t);
        set._t = setTimeout(() => {
          root.classList.remove("theme-transitioning");
        }, 800);
      }

      root.dataset.theme = theme;
      try { localStorage.setItem(KEY, theme); } catch (_) {}
      syncLabel(theme);
    }

    function toggle() {
      const cur = document.documentElement.dataset.theme || "day";
      set(cur === "day" ? "night" : "day");
    }

    function init() {
      set(read(), { animate: false });
    }

    return { init, set, toggle };
  })();


  // --- parallax ---
  function setupParallax() {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const AMP = {
      bg:     { x: -14, y: -10 },
      layout: { x:   6, y:   4 },
      hero:   { x:  10, y:   7 },
    };

    let targetX = 0, targetY = 0;
    let curX = 0,    curY = 0;
    let prev = { bgx: 0, bgy: 0, lx: 0, ly: 0, hx: 0, hy: 0 };
    let raf = null;

    const setPx = (name, value) => {
      root.style.setProperty(name, value + "px");
    };

    const apply = () => {
      const bgx = Math.round(curX * AMP.bg.x);
      const bgy = Math.round(curY * AMP.bg.y);
      const lx  = Math.round(curX * AMP.layout.x);
      const ly  = Math.round(curY * AMP.layout.y);
      const hx  = Math.round(curX * AMP.hero.x);
      const hy  = Math.round(curY * AMP.hero.y);
      if (bgx !== prev.bgx) { setPx("--bg-x", bgx);     prev.bgx = bgx; }
      if (bgy !== prev.bgy) { setPx("--bg-y", bgy);     prev.bgy = bgy; }
      if (lx  !== prev.lx)  { setPx("--layout-x", lx);  prev.lx  = lx;  }
      if (ly  !== prev.ly)  { setPx("--layout-y", ly);  prev.ly  = ly;  }
      if (hx  !== prev.hx)  { setPx("--hero-x", hx);    prev.hx  = hx;  }
      if (hy  !== prev.hy)  { setPx("--hero-y", hy);    prev.hy  = hy;  }
    };

    const tick = () => {
      curX += (targetX - curX) * 0.08;
      curY += (targetY - curY) * 0.08;
      apply();
      if (Math.abs(targetX - curX) < 0.002 && Math.abs(targetY - curY) < 0.002) {
        curX = targetX; curY = targetY;
        apply();
        raf = null;
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    const ensureRaf = () => { if (raf == null) raf = requestAnimationFrame(tick); };

    window.addEventListener("pointermove", (e) => {
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      targetX = (e.clientX / w) * 2 - 1;
      targetY = (e.clientY / h) * 2 - 1;
      ensureRaf();
    }, { passive: true });

    window.addEventListener("pointerleave", () => { targetX = 0; targetY = 0; ensureRaf(); });
    window.addEventListener("blur",         () => { targetX = 0; targetY = 0; ensureRaf(); });

    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", (e) => {
        if (e.beta == null || e.gamma == null) return;
        targetX = Math.max(-1, Math.min(1, (e.gamma || 0) / 30));
        targetY = Math.max(-1, Math.min(1, ((e.beta || 0) - 30) / 40));
        ensureRaf();
      }, { passive: true });
    }
  }

  // --- discord (lanyard) ---
  function isDiscordConfigured() {
    const id = (CONFIG.about || {}).discordId;
    return id && /^\d{15,21}$/.test(id);
  }

  function resolveAssetUrl(applicationId, assetKey) {
    if (!assetKey) return "";
    if (assetKey.startsWith("mp:")) return "https://media.discordapp.net/" + assetKey.slice(3);
    if (!applicationId) return "";
    return `https://cdn.discordapp.com/app-assets/${applicationId}/${assetKey}.png`;
  }

  function pickActivity(activities) {
    if (!Array.isArray(activities) || !activities.length) return null;
    const noCustom = activities.filter((a) => a.type !== 4);
    if (!noCustom.length) return null;
    const spotify = noCustom.find((a) => a.id === "spotify:1" || a.name === "Spotify");
    if (spotify) return spotify;
    const playing = noCustom.find((a) => a.type === 0);
    if (playing) return playing;
    return noCustom[0];
  }
  function pickCustomStatus(activities) {
    if (!Array.isArray(activities)) return null;
    return activities.find((a) => a.type === 4) || null;
  }

  function fmtElapsed(ms) {
    if (!ms || ms < 0) return "";
    const s = Math.floor(ms / 1000);
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
    return `${m}:${String(sec).padStart(2, "0")}`;
  }

  let activityTickTimer = null;
  function startActivityTicker(activity) {
    if (activityTickTimer) { clearInterval(activityTickTimer); activityTickTimer = null; }
    if (!activity || !activity.timestamps) return;
    const timeEl = $("#activity-time");
    if (!timeEl) return;
    const tick = () => {
      const ts = activity.timestamps;
      if (ts.start && ts.end) {
        const elapsed = Date.now() - Number(ts.start);
        const total = Number(ts.end) - Number(ts.start);
        timeEl.textContent = `${fmtElapsed(elapsed)} / ${fmtElapsed(total)}`;
      } else if (ts.start) {
        timeEl.textContent = fmtElapsed(Date.now() - Number(ts.start)) + " in game";
      } else {
        timeEl.textContent = "";
      }
    };
    tick();
    activityTickTimer = setInterval(tick, 1000);
  }

  function statusLabel(status) {
    switch (status) {
      case "online":  return "online";
      case "idle":    return "idle";
      case "dnd":     return "do not disturb";
      default:        return "offline";
    }
  }

  function applyDiscordPresence(d) {
    if (!d) return;
    lastPresence = d;
    const a = CONFIG.about || {};
    const user = d.discord_user || {};
    const status = d.discord_status || "offline";
    const activities = d.activities || [];

    const avatar = $("#profile-avatar");
    if (avatar) {
      avatar.dataset.status = status;
      if (user.id && user.avatar) {
        const ext = user.avatar.startsWith("a_") ? "gif" : "png";
        const url = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${ext}?size=128`;
        avatar.style.backgroundImage = `url('${url}')`;
        avatar.dataset.loaded = "true";
      }
    }
    const nameEl = $("#profile-name");
    if (nameEl) nameEl.textContent = a.name || user.global_name || user.username || "—";
    const subEl = $("#profile-sub");
    if (subEl) {
      const parts = [];
      if (user.username) parts.push("@" + user.username);
      const loc = pickText(a.location);
      const age = pickText(a.age);
      if (age && !isPlaceholder(age)) parts.push(age);
      if (loc && !isPlaceholder(loc)) parts.push(loc);

      subEl.textContent = parts.join(" · ");
    }
    const stateTag = $("#discord-state-tag");
    if (stateTag) {
      stateTag.dataset.status = status;
      stateTag.textContent = statusLabel(status);
      stateTag.hidden = false;
    }

    const card = $("#activity");
    const tag  = $("#activity-tag");
    const nameA = $("#activity-name");
    const det  = $("#activity-detail");
    const stt  = $("#activity-state");
    const big  = $("#activity-large");
    const sml  = $("#activity-small");
    if (!card) return;

    const custom = pickCustomStatus(activities);
    const act = pickActivity(activities);

    if (d.listening_to_spotify && d.spotify) {
      const sp = d.spotify;
      card.hidden = false;
      card.classList.add("activity--spotify");
      if (tag)   tag.textContent = "listening to spotify";
      if (nameA) nameA.textContent = sp.song || "—";
      if (det)   det.textContent   = sp.artist ? `— ${sp.artist}` : "";
      if (stt)   stt.textContent   = sp.album || "";
      if (big) { big.src = sp.album_art_url || ""; big.alt = sp.album || ""; }
      if (sml) { sml.removeAttribute("src"); sml.alt = ""; }
      startActivityTicker({ timestamps: sp.timestamps });
      Scroll.updateMax();
      return;
    }
    if (act) {
      card.hidden = false;
      card.classList.remove("activity--spotify");
      if (tag) {
        tag.textContent = act.type === 1 ? "streaming" :
                          act.type === 2 ? "listening" :
                          act.type === 3 ? "watching"  :
                                           "playing";
      }
      if (nameA) nameA.textContent = act.name || "—";
      if (det)   det.textContent   = act.details || "";
      if (stt)   stt.textContent   = act.state || "";
      if (big) {
        const bigUrl = resolveAssetUrl(act.application_id, act.assets && act.assets.large_image);
        if (bigUrl) { big.src = bigUrl; big.alt = (act.assets && act.assets.large_text) || act.name || ""; }
        else        { big.removeAttribute("src"); big.alt = ""; }
      }
      if (sml) {
        const smlUrl = resolveAssetUrl(act.application_id, act.assets && act.assets.small_image);
        if (smlUrl) { sml.src = smlUrl; sml.alt = (act.assets && act.assets.small_text) || ""; }
        else        { sml.removeAttribute("src"); sml.alt = ""; }
      }
      startActivityTicker(act);
      Scroll.updateMax();
      return;
    }
    if (custom && (custom.state || (custom.emoji && custom.emoji.name))) {
      card.hidden = false;
      card.classList.remove("activity--spotify");
      if (tag)   tag.textContent = "status";
      const emoji = custom.emoji && custom.emoji.name ? custom.emoji.name + " " : "";
      if (nameA) nameA.textContent = emoji + (custom.state || "");
      if (det)   det.textContent = "";
      if (stt)   stt.textContent = "";
      if (big) { big.removeAttribute("src"); big.alt = ""; }
      if (sml) { sml.removeAttribute("src"); sml.alt = ""; }
      startActivityTicker(null);
      Scroll.updateMax();
      return;
    }
    card.hidden = true;
    card.classList.remove("activity--spotify");
    startActivityTicker(null);
    Scroll.updateMax();
  }

  let lanyardWs = null;
  let lanyardHeartbeat = null;
  let lanyardReconnectAt = 1500;

  function connectLanyardWS(userId) {
    try { if (lanyardWs) lanyardWs.close(); } catch (_) {}
    if (lanyardHeartbeat) { clearInterval(lanyardHeartbeat); lanyardHeartbeat = null; }
    let ws;
    try { ws = new WebSocket("wss://api.lanyard.rest/socket"); }
    catch (e) { pollLanyard(userId); return; }
    lanyardWs = ws;
    ws.addEventListener("open", () => {
      ws.send(JSON.stringify({ op: 2, d: { subscribe_to_id: userId } }));
      lanyardReconnectAt = 1500;
    });
    ws.addEventListener("message", (ev) => {
      let msg;
      try { msg = JSON.parse(ev.data); } catch (_) { return; }
      if (msg.op === 1 && msg.d && msg.d.heartbeat_interval) {
        if (lanyardHeartbeat) clearInterval(lanyardHeartbeat);
        lanyardHeartbeat = setInterval(() => {
          try { ws.send(JSON.stringify({ op: 3 })); } catch (_) {}
        }, msg.d.heartbeat_interval);
        return;
      }
      if (msg.op === 0 && msg.d) applyDiscordPresence(msg.d);
    });
    ws.addEventListener("close", () => {
      if (lanyardHeartbeat) { clearInterval(lanyardHeartbeat); lanyardHeartbeat = null; }
      const delay = lanyardReconnectAt;
      lanyardReconnectAt = Math.min(30000, lanyardReconnectAt * 2);
      setTimeout(() => connectLanyardWS(userId), delay);
    });
    ws.addEventListener("error", () => { try { ws.close(); } catch (_) {} });
  }

  let lanyardPollTimer = null;
  async function pollLanyard(userId) {
    try {
      const res = await fetch("https://api.lanyard.rest/v1/users/" + encodeURIComponent(userId));
      const data = await res.json();
      if (data && data.success && data.data) applyDiscordPresence(data.data);
    } catch (_) {}
    if (lanyardPollTimer) clearTimeout(lanyardPollTimer);
    lanyardPollTimer = setTimeout(() => pollLanyard(userId), 30000);
  }

  async function initDiscord() {
    if (!isDiscordConfigured()) return;
    const id = CONFIG.about.discordId;
    try {
      const res = await fetch("https://api.lanyard.rest/v1/users/" + encodeURIComponent(id));
      const data = await res.json();
      if (data && data.success && data.data) {
        applyDiscordPresence(data.data);
      } else if (data && !data.success) {
        const sub = $("#profile-sub");
        if (sub) sub.textContent = "discord: join discord.gg/lanyard";
        return;
      }
    } catch (_) {}
    if ("WebSocket" in window) connectLanyardWS(id);
    else                       pollLanyard(id);
  }

  // --- init ---
  function init() {
    console.log("init() called");
    setupVideoFallback();
    spawnParticles(30);
    document.documentElement.lang = "en";

    Theme.init();
    renderProfileMeta();
    renderGreetings();
    renderLinks();
    renderProjects();
    renderSkills();
    bindEvents();
    setupParallax();
    Scroll.init();


    tickClock(); setInterval(tickClock, 1000 * 30);

    if (layoutEl) setTimeout(() => layoutEl.classList.add("is-mounted"), 2200);

    console.log("About to call loadNowPlaying");
    loadNowPlaying();
    initDiscord();
  }

  if (document.readyState === "loading") {
    console.log("Document still loading, waiting for DOMContentLoaded");
    document.addEventListener("DOMContentLoaded", init);
  } else {
    console.log("Document already loaded, calling init directly");
    init();
  }
  } else {
    init();
  }
})();
