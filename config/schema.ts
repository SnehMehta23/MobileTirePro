export const schemaConfig = {
    script: [
        {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Mobile Tire Pro",
            "url": "https://www.mobiletirepro.net",
            "logo": "https://www.mobiletirepro.net/images/logos/MTP_PNG.png",
            "sameAs": [ "https://www.facebook.com/profile.php?id=61560018959670" ]
        })
        }
    ]
}
