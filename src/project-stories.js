// Case-study detail is editorial interpretation of supplied project facts.
// "Challenge" and "intended benefit" are design reasoning, not measured research results.
export const stories = {
  fittex: {
    accent:'#157d62', industry:'Apparel manufacturing software', type:'Company product and public website',
    challenge:'An established apparel ERP spans many operational areas. The design challenge was to introduce its breadth on a public site while making selected working interfaces easier to scan and use. This is a product-design framing, not a claim from a formal study.',
    objectives:[['Explain the platform','Lead a visitor from the core proposition to capabilities and a practical next step.'],['Organize dense work','Give selected dashboards, reports, forms and billing screens a readable hierarchy.'],['Support continuity','Carry useful patterns across responsive marketing and product surfaces.']],
    audiences:[['Prospective apparel businesses','Understand the scope of the platform and decide whether to enquire.'],['ERP users','Find information and next actions within the operational areas I contributed to.']],
    strategy:'The public site follows an overview-to-detail sequence. Within the existing ERP, I worked on selected interfaces where grouping, labels and reusable components support repeated business tasks.',
    flow:['Understand the product','Explore capabilities','Decide to make contact'],
    visual:'A clear, structured public presentation with FITTEX green as a recognizable accent. The editorial photograph here represents the apparel context; the adjacent website capture is the genuine live design.',
    decisions:[
      ['Broad product scope','Sequence the public story from promise to capabilities','A visitor needs context before feature depth','An easier route toward a relevant enquiry'],
      ['Dense operational information','Use hierarchy in selected ERP dashboards, reports and forms','Repeated work needs predictable emphasis','Faster scanning as an intended benefit'],
      ['Different screen sizes','Adapt the website and contributed interfaces responsively','Business tasks and product evaluation happen across devices','Readable content and actions at each width']
    ],
    delivery:'I designed the current live public website independently and contributed selected new and redesigned screens to the pre-existing ERP. The private screens are not displayed here.',
    nextStep:'With approval, I would add specific ERP before-and-after examples and evaluate the hierarchy with real users.'
  },
  flyingroots: {
    accent:'#3a715e', industry:'Agricultural ingredient trade', type:'Independent website concept',
    challenge:'A broad ingredient offering can feel like an undifferentiated list. The concept explores how buyers and suppliers might find relevant information and enter distinct enquiry journeys. The business and its contacts are fictional.',
    objectives:[['Make discovery useful','Let visitors explore seven ingredient categories with search, filters and detail views.'],['Separate intentions','Give prospective buyers and suppliers different forms and relevant fields.'],['Keep the story legible','Balance a cinematic introduction with fast access to the catalogue and process.']],
    audiences:[['Prospective buyers (concept audience)','Browse products, formats and details before preparing an enquiry preview.'],['Prospective suppliers (concept audience)','Understand the sourcing story and prepare their own enquiry preview.']],
    strategy:'The site introduces the brand, then moves into category discovery, product details, process context and two audience-specific entry points. Interactions run locally in the browser.',
    flow:['Explore seven categories','Search or filter','Open product details','Preview an enquiry'],
    visual:'The live site uses a full-screen film, generous editorial type and agricultural imagery. The editorial cover is conceptual; the paired screenshot shows the actual hosted page.',
    decisions:[
      ['A large product collection','Combine categories, search and a detail drawer','Different visitors need different levels of specificity','More direct exploration'],
      ['Two distinct audiences','Provide separate buyer and supplier enquiry paths','One generic form would ask irrelevant questions','A more relevant local preview'],
      ['Long-form storytelling','Use restrained motion and clear content sections','Movement should support orientation','A readable experience across screen sizes']
    ],
    delivery:'I developed the responsive visual direction and frontend experience in HTML, CSS and JavaScript. The form previews validate and display input locally; they do not send or save enquiries.',
    nextStep:'A real business version would require verified company details, a secure enquiry service and testing with actual buyers and suppliers.'
  },
  kamblis: {
    accent:'#a47a49', industry:'Uniforms and linens', type:'Collaborative company marketplace',
    challenge:'A B2B network contains both product and member information. The design task was to organize discovery so visitors could understand what is offered and who provides it. This is an inferred interface challenge, not a published research finding.',
    objectives:[['Clarify discovery','Make product and business routes understandable.'],['Prioritize evidence','Place useful product and member details where visitors expect them.'],['Align the experience','Maintain consistent layouts and patterns across collaborative work.']],
    audiences:[['Business buyers','Assess relevant categories, products and potential connections.'],['Marketplace members','Present business and product information clearly.']],
    strategy:'Use category-led navigation and structured information to connect a listing to a more detailed decision. Responsive patterns keep the relationship between members and products coherent.',
    flow:['Browse a category','Review a listing','Examine product or member context','Continue to the relevant contact path'],
    visual:'An understated marketplace presentation keeps products and business details in focus. The textile still life is an editorial cover; the genuine public screenshot documents the live site.',
    decisions:[
      ['Two discovery routes','Treat products and members as related paths','Both the offer and provider matter in B2B evaluation','Clearer context for a potential connection'],
      ['Information-heavy listings','Establish a scannable hierarchy','Visitors compare multiple options','More informed exploration'],
      ['Shared design ownership','Align repeated interface patterns','Individual and joint work must read as one product','A more consistent experience']
    ],
    delivery:'I worked with a fellow designer, contributing both individual and shared design work. The public image represents the product; it does not imply I alone designed every visible screen.',
    nextStep:'Approved screen-level examples would let me identify individual contributions and show more of the design process.'
  },
  nutalink: {
    accent:'#2e6b53', industry:'Agricultural B2B connections', type:'Company project in testing',
    challenge:'A business network needs a clear introduction and consistent responsive behavior. I treated the relationship between interface design and browser implementation as a central design challenge; no user-study result is implied.',
    objectives:[['Introduce the proposition','Make the landing-page message easy to grasp.'],['Connect design and behavior','Check responsive layouts and interactions during frontend implementation.'],['Keep patterns coherent','Use reusable interface structures across the designed experience.']],
    audiences:[['Agricultural businesses','Understand the proposed platform and its potential relevance.'],['Business partners','Find a clear starting point for exploring the connection model.']],
    strategy:'I moved from interface structure to interactive prototypes and responsive frontend work in one loop. Only the approved homepage preview is shown here while the project is being tested.',
    flow:['Understand the platform','Explore the approved landing-page story','Continue through the proposed business journey'],
    visual:'A light agricultural landscape and green accents introduce the business context. The editorial harvest photograph is conceptual; the accompanying homepage image is the approved design preview.',
    decisions:[
      ['New B2B proposition','Lead with a direct landing-page message','Visitors need orientation before deeper detail','A clearer first impression'],
      ['Design-to-code handoff','Prototype and implement the frontend together','Behavior can be refined in a real browser','More consistent interaction details'],
      ['Testing-stage confidentiality','Show only the approved homepage visual','Other screens are not cleared for publication','A truthful, controlled portfolio presentation']
    ],
    delivery:'I handled UI/UX design, interaction design, prototypes, responsive layouts and frontend implementation for this company-owned project. This does not include backend ownership.',
    nextStep:'After testing and approval, I can document more specific flows and implementation choices.'
  },
  toodhu: {
    accent:'#7664b1', industry:'Business management software', type:'Collaborative company product',
    challenge:'Business workflows carry actions, information and status together. The design task was to give those elements an understandable structure across related screens. The challenge is a design interpretation, not a measured usability finding.',
    objectives:[['Make states legible','Separate information, current status and next action.'],['Build consistency','Use repeatable patterns across related areas.'],['Work as one team','Keep individual and jointly designed screens aligned.']],
    audiences:[['Business teams','Navigate connected work and understand what needs attention.'],['Product users','Recognize recurring controls and information patterns.']],
    strategy:'I worked with a fellow designer on interface hierarchy and reusable patterns, pairing individual contributions with shared review to keep the experience coherent.',
    flow:['Enter a business area','Review information and status','Choose an action','Continue the workflow'],
    visual:'The public website uses a light enterprise presentation. The studio still life is conceptual editorial art; the adjacent capture is from the actual site.',
    decisions:[
      ['Competing information','Visually separate status and next action','People need to scan before acting','Clearer task orientation'],
      ['Connected screens','Repeat meaningful component patterns','Familiar controls reduce re-learning','A more coherent experience'],
      ['Collaborative output','Review alignment across individual work','Multiple contributors should not create visual drift','Consistent product behavior']
    ],
    delivery:'I contributed individual and shared interface design with another designer. Public website imagery establishes context without assigning all visible features to me.',
    nextStep:'With approved product visuals, I could show which interface details were designed individually and which were developed together.'
  },
  'parking-spot': {
    accent:'#48687d', industry:'Urban mobility', type:'Independent product concept',
    challenge:'Drivers at unfamiliar destinations may want to compare parking options before arrival. Parking Spot explores that opportunity as a concept; it has not been validated with users or launched as a booking service.',
    objectives:[['Support planning','Introduce the idea of discovering options ahead of a trip.'],['Explain the choices','Differentiate public, operated and homeowner spaces conceptually.'],['Communicate honestly','Use a website to explain the future service without implying that the app already works.']],
    audiences:[['Drivers (proposed audience)','Consider destination parking before setting out.'],['Space providers (proposed audience)','Understand the types of spaces the concept could include.']],
    strategy:'The website tells the story of the proposed service and the intended decision sequence. It is a communication piece for a planned application, not a functioning inventory or booking tool.',
    flow:['Set a destination (proposed)','Compare space types (proposed)','Choose a suitable option (proposed)'],
    visual:'Urban photography and restrained typography set a calm mobility tone. The parking-structure cover is conceptual artwork; the paired website capture shows the designed story page.',
    decisions:[
      ['Uncertain arrival','Frame the service around planning ahead','Comparison is more useful before the drive','A clearer product opportunity'],
      ['Multiple space types','Explain public, operated and homeowner options','A visitor needs to understand what could be available','More meaningful concept evaluation'],
      ['Unbuilt application','Present the website as a concept story','A mock booking flow could overstate readiness','Accurate expectation of current status']
    ],
    delivery:'I set the independent product direction and designed the responsive storytelling website. The application and its booking behavior remain planned.',
    nextStep:'Test whether drivers understand the proposed categories and what information they need to trust a space before building the app.'
  }
};
