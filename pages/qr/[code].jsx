const QRCodeRedirect = () => {
  return <p>Redirecting...</p>;
};

export async function getServerSideProps(req, res) {
  const code = req.params.code;

  const redirects = [
    {
      code: "expertsoncall",
      redirect:
        "https://lepine-storage.nyc3.cdn.digitaloceanspaces.com/assets/audio/Lepine_Apartments_with_Chris_vanPopta-CFRA_Experts_on_Call_Feb_24th.m4a",
    },
    {
      code: "general",
      redirect:
        "https://lepineapartments.com/?utm_source=Print&utm_medium=Print&utm_campaign=Lepine+Apartments",
    },
    {
      code: "herosridge",
      redirect:
        "https://lepineapartments.com/herosridge?utm_source=Print&utm_medium=Print&utm_campaign=HerosRidge",
    },
    {
      code: "howardgrant",
      redirect:
        "https://lepineapartments.com/property/howardgrant?utm_source=Print&utm_medium=Print&utm_campaign=Howard+Grant",
    },
    {
      code: "johannescourt",
      redirect:
        "https://lepineapartments.com/property/johannescourt?utm_source=Print&utm_medium=Print&utm_campaign=Johannes+Court",
    },
    {
      code: "leasevsown",
      redirect: "https://youtu.be/WFal8okOnN8",
    },
    {
      code: "lepinelodge",
      redirect:
        "https://lepineapartments.com/property/lepinelodge?utm_source=Print&utm_medium=Print&utm_campaign=Lepine+Lodge+Renfrew",
    },
    {
      code: "pga",
      redirect:
        "https://www.lepineapartments.com?utm_source=pga&utm_medium=pga&utm_campaign=pga",
    },
    {
      code: "saintemilion",
      redirect:
        "https://lepineapartments.com/property/saintemilion?utm_source=Print&utm_medium=Print&utm_campaign=Saint+Emilion",
    },
    {
      code: "thecristina",
      redirect:
        "https://lepineapartments.com/property/thecristina?utm_source=Print&utm_medium=Print&utm_campaign=the+Cristina",
    },
    {
      code: "thenormand",
      redirect:
        "https://lepineapartments.com/property/theNormand?utm_source=Print&utm_medium=Print&utm_campaign=the+Normand",
    },
    {
      code: "videotestimonials",
      redirect:
        "https://www.youtube.com/playlist?list=PL8J-jMLAGtJUzuuN2p4Gf6ze-PS8a507k&utm_source=newsletter&utm_medium=print&utm_campaign=winter",
    },
    {
      code: "whyrent",
      redirect:
        "https://lepine-storage.nyc3.cdn.digitaloceanspaces.com/assets/pdf/The-futures-much-brighter-when-you-rent.pdf",
    },
    {
      code: "whyrentnewsletter",
      redirect:
        "https://lepine-storage.nyc3.cdn.digitaloceanspaces.com/assets/pdf/The-futures-much-brighter-when-you-rent.pdf",
    },
    {
      code: "whyrentnewsletter",
      redirect:
        "https://lepine-storage.nyc3.cdn.digitaloceanspaces.com/assets/pdf/The-futures-much-brighter-when-you-rent.pdf",
    },
  ];

  const currentRedirect = redirects.filter((e) => e.code === code);

  if (currentRedirect.length === 0) {
    return {
      redirect: {
        destination: "https://www.lepineapartments.com/",
        permanent: false,
      },
    };
  } else {
    return {
      redirect: {
        destination: currentRedirect[0].redirect,
        permanent: false,
      },
    };
  }
}

export default QRCodeRedirect;
