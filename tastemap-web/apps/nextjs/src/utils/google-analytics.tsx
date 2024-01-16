import Script from "next/script";

const GoogleAnalytics = ({ ga_id }: { ga_id: string }) => {
  // const pathname = usePathname()
  // const searchParams = useSearchParams()

  // useEffect(() => {
  //   const url = pathname + searchParams.toString();

  // })

  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js? 
      id=${ga_id}`}
      ></Script>
      <Script
        id="google-analytics"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${ga_id}', {
                    page_path: window.location.pathname,
                    });
        `,
        }}
      ></Script>
    </>
  );
};

export default GoogleAnalytics;
