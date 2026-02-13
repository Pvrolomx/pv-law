import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PV Law | Bilingual Legal Services in Puerto Vallarta",
  description:
    "Protecting your interests in Mexico. Bilingual litigation firm serving the international community in Puerto Vallarta. Real estate, immigration, business law.",
  keywords:
    "lawyer puerto vallarta, abogado bilingue PV, mexico real estate attorney, fideicomiso lawyer, immigration lawyer mexico, puerto vallarta legal services",
  openGraph: {
    title: "PV Law | Your Legal Partner in Paradise",
    description:
      "Bilingual litigation firm serving the international community in Puerto Vallarta",
    locale: "en_US",
    type: "website",
    url: "https://pv-law.expatadvisormx.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0C1F3F" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LegalService",
              name: "PV Law",
              description:
                "Bilingual litigation firm serving the international community in Puerto Vallarta",
              url: "https://pv-law.expatadvisormx.com",
              areaServed: { "@type": "City", name: "Puerto Vallarta" },
              availableLanguage: ["English", "Spanish"],
              priceRange: "$$",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Puerto Vallarta",
                addressRegion: "Jalisco",
                addressCountry: "MX",
              },
            }),
          }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
