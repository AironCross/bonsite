export function SEOSchema() {
  const locale = 'hu';

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://bonsite.hu/#organization',
        name: 'B Consulting Kft.',
        alternateName: 'B OnSite',
        url: 'https://bonsite.hu',
        logo: {
          '@type': 'ImageObject',
          url: 'https://bonsite.hu/logo.png',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+36-1-234-5678',
          contactType: 'customer service',
          email: 'info@bonsite.hu',
          availableLanguage: ['Hungarian', 'English'],
        },
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'HU',
          addressLocality: 'Budapest',
        },
        sameAs: [
          'https://bonsite.hu',
        ],
      },
      {
        '@type': 'SoftwareApplication',
        name: 'B OnSite',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        offers: {
          '@type': 'Offer',
          price: '35000',
          priceCurrency: 'HUF',
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: '35000',
            priceCurrency: 'HUF',
            unitText: 'MONTH',
          },
        },
        description:
          locale === 'hu'
            ? 'Digitális működésmenedzsment platform vállalkozások számára'
            : 'Digital operations management platform for businesses',
        featureList: [
          'HR & Document Management',
          'Access Control',
          'Visitor Management',
          'Reports & BI',
          'Occupational Safety',
          'Digital Training',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://bonsite.hu/#website',
        url: 'https://bonsite.hu',
        name: 'B OnSite',
        description:
          locale === 'hu'
            ? 'Automatizálj, spórolj időt, és lásd át a működést egyetlen rendszerben.'
            : 'Automate, save time, and oversee operations in a single system.',
        publisher: {
          '@id': 'https://bonsite.hu/#organization',
        },
        inLanguage: locale === 'hu' ? 'hu-HU' : 'en-US',
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
