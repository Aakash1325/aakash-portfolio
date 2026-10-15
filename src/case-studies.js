export const caseStudies = [
  {
    name: 'Parking Spot', slug: 'parking-spot', type: 'MOBILITY · APP CONCEPT', kind: 'Independent project',
    image: 'parking-spot-full.webp', width: 1920, height: 991,
    title: 'A better arrival starts before the drive.',
    desc: 'An independent parking app concept, introduced through a responsive website while the app is still planned.',
    role: 'Independent concept · product direction and website design', status: 'Website designed · app concept',
    problem: 'At unfamiliar destinations, drivers often start looking for parking only when they arrive. They have little time to understand which spaces are available or compare their options.',
    approach: 'I proposed one place to discover public, operated and homeowner spaces, with useful information for comparing options before a journey. I designed the website first to explain this direction ahead of the app build.',
    delivery: 'The intended value is a clearer arrival plan for drivers and a way for homeowners to make unused spaces discoverable. This is a product hypothesis, not a measured outcome.',
    decisions: [
      ['Start before arrival', 'The concept focuses on choosing a suitable space while planning the journey, when a driver has time to compare options.'],
      ['Bring different spaces together', 'Public, operated and homeowner spaces are considered in one discovery experience, so availability and suitability can be compared in context.'],
      ['Explain the direction first', 'The responsive website communicates the proposed service before the app exists; it is not presented as proof of a working booking flow.']
    ],
    next: 'The next design step is to map and test the search, comparison and booking journey, including how space availability and trust would work in practice.',
    tags: ['Product concept', 'UX direction', 'Responsive web']
  },
  {
    name: 'Vidmagin', slug: 'vidmagin', type: 'HR TECH · WEBSITE REDESIGN', kind: 'Professional work',
    image: 'vidmagin.webp', width: 2400, height: 812,
    title: 'Making a complex product easier to understand.',
    desc: 'A responsive website redesign focused on making Vidmagin’s product value and next steps clearer.',
    role: 'UI/UX Designer · website redesign', status: 'Professional project',
    problem: 'The website needed to explain a broad hiring product without asking visitors to work through an overloaded page.',
    approach: 'I reorganised the content into a clearer sequence, designed responsive layouts and established reusable visual patterns for implementation.',
    delivery: 'The redesign gives prospective teams a more direct path through product information and gives developers a more consistent design direction. No conversion or usability lift is claimed here.',
    decisions: [
      ['Lead with comprehension', 'The content sequence introduces the product value before asking a prospective team to explore deeper details.'],
      ['Make next steps visible', 'The page hierarchy is intended to help visitors understand what to do after reading about the product.'],
      ['Design across screen sizes', 'Responsive layouts and repeatable visual patterns make the proposed experience easier to maintain during handoff.']
    ],
    next: 'To document the work more completely, I would show the original site, content hierarchy decisions, responsive screens and feedback from review or implementation.',
    tags: ['Responsive UI', 'Content hierarchy', 'Visual patterns']
  },
  {
    name: 'AakashAgro', slug: 'aakash-agro', type: 'B2B EXPORT · WEB CONCEPT', kind: 'Concept study',
    image: 'aakash-agro.webp', width: 1707, height: 960,
    title: 'Building trust before the first enquiry.',
    desc: 'A B2B export website concept centred on product information, sourcing context and enquiries.',
    role: 'Independent concept · website design', status: 'Concept study',
    problem: 'Trade buyers need enough context about products, sourcing and supplier credibility before starting a conversation.',
    approach: 'I organised the concept around product categories, sourcing context and a direct enquiry path, with a visual direction that supports the information.',
    delivery: 'The intended experience helps buyers find relevant details and make a more informed enquiry. This concept has no measured business outcome.',
    decisions: [
      ['Make products scannable', 'Categories provide a clearer way into the catalogue than a single undifferentiated list.'],
      ['Add sourcing context', 'The concept gives product origin and supplier information a place in the browsing experience.'],
      ['Support an enquiry', 'The page points visitors towards contact, which is the useful next action for a B2B export concept.']
    ],
    next: 'Validate which details buyers actually need before enquiring, then test the navigation and enquiry path with representative users.',
    tags: ['Web concept', 'B2B experience', 'Visual direction']
  }
];
