const QRCodeRedirect = () => {
  return <p>Redirecting...</p>;
};

export async function getServerSideProps(req, res) {
  const code = req.params.code;

  const redirects = [
    {
      code: "1050exterior",
      redirect:
        "https://www.lepineapartments.com/property/carresaintlouis?utm_source=exterior&utm_medium=sign&utm_campaign=1050",
    },
    {
      code: "555legget",
      redirect:
        "https://www.lepineapartments.com?utm_source=Source+Test&utm_medium=Medium+Test&utm_campaign=Name+Test&utm_id=555L",
    },
    {
      code: "featuredfloorplan",
      redirect:
        "https://lepine-storage.nyc3.cdn.digitaloceanspaces.com/assets/thenormand/floorplans/1088_D11a_UNIT_115-_515-family.pdf",
    },
    {
      code: "youtube",
      redirect:
        "https://www.lepineapartments.com?utm_source=YouTube&utm_medium=YouTube&utm_campaign=YouTube&utm_id=YouTube",
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
