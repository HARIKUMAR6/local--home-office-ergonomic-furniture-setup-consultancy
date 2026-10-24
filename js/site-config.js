/* Single source of truth for brand, navigation and footer content.
   Replace the temporary brand text / mark here once the final identity is supplied. */
window.SITE = {
  brand: {
    name: 'Home Office Ergonomics',      // TEMPORARY brand text
    tagline: 'Furniture & Setup Consultancy',
    href: 'home-1.html',
  },
  description:
    'Ergonomic furniture and one-to-one setup consultancy for people who work from home.',
  nav: [
    {
      label: 'Home',
      id: 'home',
      children: [
        { label: 'Home 1', href: 'home-1.html', id: 'home-1' },
        { label: 'Home 2', href: 'home-2.html', id: 'home-2' },
      ],
    },
    { label: 'Products', href: 'products.html', id: 'products' },
    { label: 'Consultation Services', href: 'consultation-services.html', id: 'consultation-services' },
    { label: 'About', href: 'about.html', id: 'about' },
    { label: 'Contact', href: 'contact.html', id: 'contact' },
  ],
  // Primary header CTA (also used in the mobile menu).
  cta: { label: 'Book a Consultation', href: 'consultation-services.html#enquiry' },
  // Enquiry pathways shown in the footer.
  enquiries: [
    { label: 'Product enquiry', href: 'contact.html?enquiry=product#enquiry-form' },
    { label: 'Book a consultation', href: 'contact.html?enquiry=consultation#enquiry-form' },
  ],
  // Leave values empty until real details are supplied; empty items are not rendered.
  contact: { email: '', phone: '', address: '' },
  // Contact page only. Fill in once confirmed; empty values render nothing.
  //   hours:       confirmed operating hours, e.g. 'Mon–Fri, 9:00–17:00'
  //   mapEmbedUrl: the OpenStreetMap "Share > HTML" embed URL for the verified business location
  contactExtra: { hours: '', mapEmbedUrl: '' },
  // Footer only. SAMPLE DETAILS: replace these (or fill in `contact` above, which takes priority) once verified.
  footerPlaceholder: { phone: '+1 (555) 010-2020', email: 'hello@example.com', address: 'Sample Office, Your City' },
  // Exactly four icons. PLACEHOLDERS: leave href empty until real profile URLs exist; empty entries render as inert buttons.
  social: [
    { id: 'instagram', label: 'Instagram', href: '' },
    { id: 'facebook', label: 'Facebook', href: '' },
    { id: 'linkedin', label: 'LinkedIn', href: '' },
    { id: 'youtube', label: 'YouTube', href: '' },
  ],
};
