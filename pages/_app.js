import Head from "next/head";
import Script from "next/script";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
// Import the fonts
import { Jost, Open_Sans, Poppins } from "next/font/google";

import AppContext from "../components/AppContext.component";
import "../styles/fonts.css";
import * as gtag from "../utils/gtag";

// Configure Jost
const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jost",
});

// Configure Open Sans
const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
});

// Configure Poppins
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
});

function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState(null);
  const [testimonials, setTestimonials] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [router.pathname]);

  useEffect(() => {
    const kanataPages = ['/property/carresaintlouis'];
    const carletonPages = ['/property/johannesgardens', '/comingsoon/johannesgarden'];

    let ospid = null;
    if (kanataPages.includes(router.pathname)) {
      ospid = '21ef6e8ee3c341909565edfdc599f6e4';
    } else if (carletonPages.includes(router.pathname)) {
      ospid = '2747e70fe6314882bc1d48e71127dd89';
    }

    if (ospid) {
      var pixel = document.createElement('img');
      pixel.src = 'https://px.xfer123.com/1x1.png?ospid=' + ospid + '&osrnd=' + Math.round(new Date().getTime());
      pixel.setAttribute('height', '1');
      pixel.setAttribute('width', '1');
      pixel.setAttribute('style', 'display:none');
      pixel.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
      document.body.appendChild(pixel);
    }
  }, [router.pathname]);

  const canonical = `https://www.lepineapartments.com${
    router.asPath.split("?")[0]
  }`;

  return (
    <div
      className={`${jost.variable} ${openSans.variable} ${poppins.variable} font-sans`}
    >
      <Head>
        <link rel="canonical" href={canonical} />

        <link
          rel="stylesheet"
          href="https://use.typekit.net/urj5anv.css"
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700&family=Open+Sans&family=Poppins:wght@600&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"
          rel="stylesheet"
        ></link>

        <script
          async
          type="text/javascript"
          id="hs-script-loader"
          src="https://js-na1.hs-scripts.com/22452018.js"
        ></script>

        <script
          dangerouslySetInnerHTML={{
            __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${gtag.GA_TRACKING_ID}', {
                      page_path: window.location.pathname,
                    });
                  `,
          }}
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-NMD6NT3K');
                `,
          }}
        />
      </Head>

      <Script
        id="google-analytics"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />

      <Script
        id="google-remarketing1"
        async
        src="https://www.googletagmanager.com/gtag/js?id=AW-11280069512"
      />

      <Script id="google-remarketing2">
        {`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments)}
              gtag('js', new Date());

              gtag('config', 'AW-11280069512');
              `}
      </Script>

      <Script id="fbPixel">
        {`!function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1046754340018202');
          fbq('track', 'PageView');`}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=1046754340018202&ev=PageView&noscript=1"
        />
      </noscript>

      <Script
        id="stackadapt-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `!function(s,a,e,v,n,t,z){if(s.saq)return;n=s.saq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!s._saq)s._saq=n;n.push=n;n.loaded=!0;n.version='1.0';n.queue=[];t=a.createElement(e);t.async=!0;t.src=v;z=a.getElementsByTagName(e)[0];z.parentNode.insertBefore(t,z)}(window,document,'script','https://tags.srv.stackadapt.com/events.js');saq('ts','EFvi46X5uHLaQKX7qNrypQ');`,
        }}
      />

      <AppContext.Provider
        value={{
          theme,
          testimonials,
          setTheme,
          setTestimonials,
        }}
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NMD6NT3K"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <Component {...pageProps} />
      </AppContext.Provider>
    </div>
  );
}

export default MyApp;
