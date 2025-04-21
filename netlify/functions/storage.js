// This is a simplified version of our storage for Netlify Functions
// It contains only the functionality needed for the API

class MemStorage {
  constructor() {
    this.users = new Map();
    this.categories = new Map();
    this.articles = new Map();
    this.newsletters = new Map();
    this.userId = 1;
    this.categoryId = 1;
    this.articleId = 1;
    this.newsletterId = 1;
    
    this.seedData();
  }
  
  seedData() {
    // Seed Users
    const adminUser = {
      id: this.userId++,
      username: "admin",
      password: "password123",  // In a real app, this would be hashed
      email: "admin@venturewire.com",
      firstName: "Admin",
      lastName: "User",
      avatarUrl: null
    };
    this.users.set(adminUser.id, adminUser);
    
    // Seed Categories
    const categories = [
      { name: "Funding", slug: "funding" },
      { name: "Tech", slug: "tech" },
      { name: "Markets", slug: "markets" },
      { name: "Biotech", slug: "biotech" }
    ];
    
    categories.forEach(cat => {
      const category = {
        id: this.categoryId++,
        ...cat
      };
      this.categories.set(category.id, category);
    });
    
    // Seed Articles
    const articles = [
      {
        title: "GeneSync: The Startup Decoding the Future of Genetics",
        slug: "genesync-startup-decoding-future-genetics",
        excerpt: "This pioneering biotech company is revolutionizing how we understand and interact with genetic data, making personalized medicine more accessible than ever.",
        content: `<h1>GeneSync: The Startup Decoding the Future of Genetics</h1>
<div class="article-metadata">
  <span class="date">April 18, 2025</span>
  <span class="author">By VentureWireDaily Staff</span>
</div>

<p>In a world where data is king, genetic data might just be the emperor. GeneSync, a rising star in the biotech industry, has just secured $42 million in Series B funding to expand its revolutionary genetic data platform.</p>

<p>Founded in 2023 by Dr. Elena Rodriguez, a computational biologist with a background in machine learning, and Marcus Chen, previously a senior engineer at a major tech company, GeneSync aims to democratize access to genetic information while maintaining stringent privacy protections.</p>

<h2>The Technology Behind the Vision</h2>

<p>GeneSync's proprietary platform uses advanced algorithms to analyze genetic data and translate complex genomic information into actionable insights. What sets it apart from competitors is its unique approach to data ownership and privacy.</p>

<p>"We built this company on the fundamental belief that your genetic data belongs to you and only you," Rodriguez explained in an exclusive interview. "Our platform gives individuals complete control over who can access their information and for what purpose."</p>

<p>The company's core product, GenePortal, allows users to securely store their genetic information, selectively share it with healthcare providers, and participate in research studies of their choosing. Researchers can access anonymized data pools while individuals maintain ownership of their personal information.</p>

<h2>From Vision to Reality</h2>

<p>The journey hasn't been without challenges. The regulatory landscape for genetic data is complex and evolving, requiring constant adaptation.</p>

<p>"Navigating regulations across different countries has been one of our biggest challenges," Chen noted. "But we've built our platform to be adaptable to different regulatory frameworks while maintaining our core principles."</p>

<p>The recent funding round was led by Genome Ventures, with participation from existing investors Tech Frontier Capital and several prominent angel investors. The capital will be used to expand the platform's capabilities, increase the user base, and forge partnerships with healthcare providers and research institutions.</p>

<h2>The Market Potential</h2>

<p>The global genomics market is projected to reach $62.9 billion by 2028, growing at a compound annual growth rate of 15.7%. GeneSync is positioning itself at the intersection of healthcare, consumer genetics, and data privacy – three rapidly expanding sectors.</p>

<p>"What GeneSync has built addresses a critical need in the market," said Dr. Sarah Johnson, partner at Genome Ventures. "They're not just building another genetic testing company; they're creating an ecosystem that could transform how we interact with genetic information."</p>

<h2>Looking Ahead</h2>

<p>With the fresh capital, GeneSync plans to expand its team, enhance its technology infrastructure, and accelerate market penetration.</p>

<p>"We're just scratching the surface of what's possible," Rodriguez said. "Our vision is to make personalized medicine a reality for everyone, not just those who can afford it."</p>

<p>The company also announced a new initiative to partner with nonprofit organizations to provide genetic testing and data management services to underserved communities.</p>

<p>As the lines between technology and healthcare continue to blur, companies like GeneSync represent a new breed of startups that are leveraging data science to solve complex biological problems. The success of their approach could have far-reaching implications for the future of personalized medicine and how we manage our most personal data.</p>`,
        imageUrl: "https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        authorId: 1,
        categoryId: 4, // Biotech
        publishedAt: new Date("2025-04-18T09:00:00"),
        isFeatured: true,
        isTrending: false,
        readTime: 8
      },
      {
        title: "AI Startup Secures $50M for Retail Automation",
        slug: "ai-startup-secures-50m-retail-automation",
        excerpt: "RetailMind's AI-driven platform promises to revolutionize inventory management and customer experience for brick-and-mortar stores.",
        content: `<h1>AI Startup Secures $50M for Retail Automation</h1>
<p>RetailMind, an emerging leader in retail automation technology, has secured $50 million in Series C funding to expand its AI-driven platform that helps traditional retailers compete in the digital age.</p>
<p>The funding round was led by Insight Partners, with participation from existing investors including Sequoia Capital and Andreessen Horowitz. This brings the company's total funding to $78 million since its founding in 2022.</p>
<p>"Physical retail isn't dying—it's transforming," said RetailMind CEO Sarah Johnson. "Our technology helps retailers optimize inventory, personalize customer experiences, and operate more efficiently in an increasingly competitive landscape."</p>
<p>RetailMind's platform uses computer vision and predictive analytics to help retailers manage inventory in real-time, understand customer behavior, and create personalized shopping experiences. The system can be integrated with existing store infrastructure, making it accessible for mid-size retailers without requiring massive upfront investments.</p>
<p>The company plans to use the new funding to expand its team, enhance its AI capabilities, and accelerate international expansion, with a particular focus on European and Asian markets.</p>
<p>"RetailMind represents the future of retail tech," said Rebecca Liu, partner at Insight Partners. "They're bringing sophisticated AI capabilities to an industry that has been historically underserved by technology."</p>
<p>The global retail automation market is expected to reach $30 billion by 2026, according to recent industry reports, as retailers seek technology solutions to improve efficiency and enhance customer experiences.</p>`,
        imageUrl: "https://images.unsplash.com/photo-1660457607228-e587da3f14ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        authorId: 1,
        categoryId: 1, // Funding
        publishedAt: new Date("2025-04-17T14:30:00"),
        isFeatured: false,
        isTrending: false,
        readTime: 5
      },
      {
        title: "Quantum Computing Startup Breaks Encryption Records",
        slug: "quantum-computing-startup-breaks-encryption-records",
        excerpt: "QuantumLeap's new 128-qubit processor demonstrates unprecedented capabilities in breaking complex encryption algorithms.",
        content: `<h1>Quantum Computing Startup Breaks Encryption Records</h1>
<p>QuantumLeap Technologies has announced a major breakthrough in quantum computing capability, demonstrating a 128-qubit processor that successfully broke encryption standards previously thought to be secure for decades to come.</p>
<p>The demonstration, verified by independent researchers, marks a significant milestone in quantum computing and raises important questions about the future of cybersecurity.</p>
<p>"This isn't just an incremental improvement—it's a quantum leap, if you'll forgive the pun," said Dr. James Chen, founder and CTO of QuantumLeap Technologies. "We've achieved in months what many predicted would take years."</p>
<p>The startup's quantum processor, dubbed "Meridian," uses a novel approach to qubit stability that allows for longer coherence times and higher fidelity operations. This enables the system to tackle complex problems that remain out of reach for conventional computing systems.</p>
<p>The encryption-breaking demonstration has caught the attention of government agencies, financial institutions, and cybersecurity experts worldwide. It suggests that widely-used encryption methods may become vulnerable sooner than anticipated, accelerating the need for quantum-resistant cryptography.</p>
<p>"This is both exciting and concerning," said Emma Richards, a cryptography expert not affiliated with the company. "It underscores the urgency of implementing post-quantum cryptography before these capabilities become more widespread."</p>
<p>QuantumLeap, which has raised over $120 million from venture capital firms and strategic investors, plans to offer its quantum computing capabilities through a cloud-based service later this year, allowing researchers and enterprises to explore applications ranging from drug discovery to materials science.</p>
<p>The company emphasizes that its goal is to advance beneficial applications of quantum computing while promoting responsible development of the technology.</p>`,
        imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        authorId: 1,
        categoryId: 2, // Tech
        publishedAt: new Date("2025-04-16T10:15:00"),
        isFeatured: false,
        isTrending: true,
        readTime: 6
      },
      {
        title: "Fintech Startup Revolutionizes Small Business Lending",
        slug: "fintech-startup-revolutionizes-small-business-lending",
        excerpt: "CapitalFlow's innovative credit assessment model is providing access to capital for small businesses traditionally overlooked by banks.",
        content: `<h1>Fintech Startup Revolutionizes Small Business Lending</h1>
<p>CapitalFlow, a fintech startup founded by former banking executives, is disrupting the small business lending market with an innovative approach to credit assessment that focuses on real-time business performance rather than traditional credit scores.</p>
<p>The company announced today that it has issued over $100 million in loans to small businesses across the country, with default rates significantly lower than industry averages despite serving businesses typically considered high-risk by conventional lenders.</p>
<p>"The traditional lending model is broken for small businesses," said Maria Rodriguez, co-founder and CEO of CapitalFlow. "Banks rely too heavily on personal credit scores and historical financials, which don't capture the full picture of a business's health or potential."</p>
<p>CapitalFlow's platform integrates with accounting software, payment processors, and e-commerce platforms to analyze cash flow, customer retention, growth metrics, and other indicators of business performance. This allows the company to offer loans to businesses that might be rejected by traditional banks despite having healthy operations.</p>
<p>The company's loan terms are also innovative, with flexible repayment options tied to revenue rather than fixed monthly payments. This approach has proven particularly valuable for seasonal businesses and those with irregular cash flow.</p>
<p>"We've been rejected by multiple banks despite being profitable for years," said Thomas Jenkins, owner of a specialty retail store that secured financing through CapitalFlow. "The application process was streamlined, and having payments that scale with our revenue has made a huge difference during slower months."</p>
<p>CapitalFlow raised $30 million in Series B funding earlier this year and plans to expand its offerings to include invoice financing and equipment loans. The company is also partnering with community development financial institutions to reach underserved markets.</p>
<p>As traditional banks continue to reduce small business lending, alternative lenders like CapitalFlow are filling a critical gap in the market. The company's success suggests that innovative approaches to risk assessment and loan structuring can make capital more accessible while maintaining sound lending practices.</p>`,
        imageUrl: "https://images.unsplash.com/photo-1589666564542-1256093a8137?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        authorId: 1,
        categoryId: 3, // Markets
        publishedAt: new Date("2025-04-15T16:45:00"),
        isFeatured: false,
        isTrending: false,
        readTime: 5
      },
      {
        title: "Green Energy Startup Raises $70M for Innovative Battery Technology",
        slug: "green-energy-startup-raises-70m-innovative-battery-technology",
        excerpt: "PowerHarvest's sodium-ion batteries promise to provide energy storage solutions without relying on rare earth minerals.",
        content: `<h1>Green Energy Startup Raises $70M for Innovative Battery Technology</h1>
<p>PowerHarvest, a clean energy startup focused on sustainable battery technology, has raised $70 million in Series B funding to commercialize its innovative sodium-ion battery technology that could reduce dependency on lithium and other rare earth minerals.</p>
<p>The funding round was led by GreenTech Ventures, with participation from Energy Innovation Fund and several strategic investors, including a major automotive manufacturer. This brings the company's total funding to $95 million.</p>
<p>"The world needs better battery technology to enable the clean energy transition," said Michael Chen, founder and CEO of PowerHarvest. "Our approach eliminates the need for scarce materials while delivering performance comparable to current solutions at a potentially lower cost."</p>
<p>PowerHarvest's battery technology uses sodium—an abundant element found in seawater—instead of lithium as the main component in its batteries. The company claims its latest prototypes deliver 90% of the energy density of lithium-ion batteries while being more environmentally friendly to produce and easier to recycle.</p>
<p>The technology has attracted attention as countries and companies seek to secure battery supply chains amid geopolitical tensions and growing demand for energy storage solutions. Sodium-ion batteries could reduce dependence on lithium, cobalt, and nickel, which face supply constraints and often have complicated mining operations.</p>
<p>"What PowerHarvest has achieved could be a game-changer for the energy storage market," said Jennifer Liu, partner at GreenTech Ventures. "Their technology addresses the sustainability, supply chain, and cost challenges that have limited the adoption of energy storage solutions."</p>
<p>The new funding will allow PowerHarvest to build a pilot manufacturing facility and accelerate discussions with potential partners in the automotive, renewable energy, and consumer electronics sectors. The company expects to have commercial products available by late 2026.</p>
<p>The global battery market is projected to reach $310 billion by 2030, driven by electric vehicle adoption and renewable energy integration. Alternative battery technologies like those developed by PowerHarvest could play a crucial role in meeting this growing demand while reducing environmental impact.</p>`,
        imageUrl: "https://images.unsplash.com/photo-1569098644584-210bcd375b59?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        authorId: 1,
        categoryId: 1, // Funding
        publishedAt: new Date("2025-04-14T11:20:00"),
        isFeatured: false,
        isTrending: true,
        readTime: 5
      },
      {
        title: "Agricultural Tech Startup Uses AI to Boost Crop Yields",
        slug: "agricultural-tech-startup-uses-ai-boost-crop-yields",
        excerpt: "FarmIntelligence's sensors and predictive algorithms are helping farmers increase yields while reducing water and fertilizer usage.",
        content: `<h1>Agricultural Tech Startup Uses AI to Boost Crop Yields</h1>
<p>FarmIntelligence, an agricultural technology startup, is reporting impressive results from early deployments of its AI-driven farming system, with participating farms seeing crop yield increases of 15-30% while reducing water and fertilizer usage by up to 25%.</p>
<p>The company's integrated system combines soil sensors, weather monitoring, satellite imaging, and machine learning to provide highly localized recommendations for planting, irrigation, and fertilization.</p>
<p>"Agriculture faces the enormous challenge of producing more food with fewer resources and a changing climate," said Dr. Emily Patel, co-founder and CEO of FarmIntelligence. "Our approach leverages data and AI to help farmers make more informed decisions specific to their unique conditions."</p>
<p>The startup's technology is particularly innovative in its hyperlocal approach. Rather than treating entire fields uniformly, the system divides farms into microclimate zones and provides customized recommendations for each zone, accounting for variations in soil composition, elevation, sun exposure, and other factors.</p>
<p>FarmIntelligence initially focused on high-value crops like wine grapes and specialty produce but is now expanding to staple crops including corn, wheat, and soybeans. The company offers both the hardware components and a subscription-based software platform that provides ongoing analysis and recommendations.</p>
<p>"What impressed us most was the system's ability to adapt to changing conditions," said James Rodriguez, a third-generation farmer who participated in the company's pilot program. "When we had an unexpected heat wave, the system adjusted irrigation schedules in real-time, which helped prevent significant crop stress."</p>
<p>The startup secured $25 million in Series A funding last year and has established partnerships with several agricultural cooperatives and equipment manufacturers. It plans to expand internationally next year, with a focus on regions facing water scarcity and climate volatility.</p>
<p>As climate change intensifies the challenges facing global agriculture, technologies like FarmIntelligence's system may play an increasingly important role in ensuring food security while reducing the environmental impact of farming practices.</p>`,
        imageUrl: "https://images.unsplash.com/photo-1664307612281-ae106caeb626?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        authorId: 1,
        categoryId: 2, // Tech
        publishedAt: new Date("2025-04-13T09:10:00"),
        isFeatured: false,
        isTrending: true,
        readTime: 5
      },
      {
        title: "Health Tech Startup Launches Remote Monitoring Platform for Chronic Conditions",
        slug: "health-tech-startup-launches-remote-monitoring-platform",
        excerpt: "VitalTrack's FDA-approved platform enables continuous monitoring of patients with chronic diseases, potentially reducing hospitalizations.",
        content: `<h1>Health Tech Startup Launches Remote Monitoring Platform for Chronic Conditions</h1>
<p>VitalTrack, a health technology startup focused on chronic disease management, has officially launched its FDA-approved remote monitoring platform after a successful pilot program that demonstrated significant improvements in patient outcomes.</p>
<p>The company's integrated system combines wearable sensors, a patient-facing mobile app, and a clinical dashboard to enable continuous monitoring of patients with conditions such as congestive heart failure, diabetes, and chronic obstructive pulmonary disease.</p>
<p>"The healthcare system has traditionally been designed to react to acute problems rather than proactively manage chronic conditions," said Dr. Robert Kim, cardiologist and co-founder of VitalTrack. "Our platform shifts that paradigm by enabling continuous visibility into patient health, allowing for interventions before situations become critical."</p>
<p>The pilot program, conducted in partnership with three major healthcare systems, monitored over 1,000 patients for six months. Results showed a 32% reduction in hospital readmissions for heart failure patients and a 28% decrease in emergency department visits across all monitored conditions.</p>
<p>VitalTrack's platform is particularly notable for its integration with existing clinical workflows. Rather than overwhelming providers with continuous data streams, the system uses AI algorithms to identify meaningful changes and potential concerns, alerting clinical teams only when intervention may be necessary.</p>
<p>"As a clinician, the signal-to-noise ratio is critical," said Dr. Sarah Martinez, who participated in the pilot program. "VitalTrack doesn't just collect data—it provides actionable insights that help us allocate our attention to the patients who need it most at any given time."</p>
<p>The company has secured reimbursement agreements with several major insurers who recognize the potential cost savings from reduced hospitalizations and emergency care. The platform will initially be available through participating healthcare providers, with plans to expand direct-to-consumer options for certain monitoring capabilities later this year.</p>
<p>Remote patient monitoring represents one of the fastest-growing segments in digital health, with the market expected to reach $117.1 billion by 2028 as healthcare systems increasingly look to technology solutions to manage the growing burden of chronic disease.</p>`,
        imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        authorId: 1,
        categoryId: 2, // Tech
        publishedAt: new Date("2025-04-12T15:30:00"),
        isFeatured: false,
        isTrending: false,
        readTime: 6
      },
      {
        title: "Venture Capital Firm Raises $500M Fund Focused on Climate Tech",
        slug: "venture-capital-firm-raises-500m-fund-climate-tech",
        excerpt: "Climate Catalyst Ventures announces new fund to accelerate development and deployment of technologies addressing climate change.",
        content: `<h1>Venture Capital Firm Raises $500M Fund Focused on Climate Tech</h1>
<p>Climate Catalyst Ventures has announced the closing of a $500 million fund dedicated to investing in technologies and businesses addressing climate change, marking one of the largest climate-focused funds raised this year.</p>
<p>The fund, the firm's third and largest to date, will target investments across energy, transportation, agriculture, manufacturing, and carbon removal technologies. Limited partners include institutional investors, foundations, family offices, and corporate strategic investors committed to accelerating climate solutions.</p>
<p>"The climate tech market has evolved dramatically since our first fund in 2018," said David Chen, founding partner at Climate Catalyst Ventures. "We're now seeing mature, scalable solutions that are ready for significant deployment and can deliver both environmental impact and strong financial returns."</p>
<p>The firm plans to make approximately 25-30 investments from the new fund, with initial investments ranging from $10-30 million and capacity for follow-on funding in subsequent rounds. The fund will focus primarily on companies with proven technology ready for commercial scale-up rather than early-stage research and development.</p>
<p>Climate Catalyst's previous funds have backed companies including energy storage innovators, sustainable material manufacturers, and carbon marketplace platforms. Portfolio companies from earlier funds have collectively raised over $2 billion in follow-on funding and have reported measurable climate impacts, including over 5 million tons of carbon emissions avoided.</p>
<p>"We've moved beyond the question of whether climate solutions can be good investments," said Jennifer Lee, partner at Climate Catalyst. "The data from our earlier funds clearly demonstrates that companies addressing climate challenges can generate venture-scale returns while creating meaningful environmental benefits."</p>
<p>The fund launch comes amid growing recognition of both the risks posed by climate change and the economic opportunities in the transition to a low-carbon economy. Recent policy developments, including the Inflation Reduction Act in the United States and similar initiatives globally, have accelerated investment in the sector.</p>
<p>Climate tech venture funding has shown resilience compared to overall venture capital markets, with continued growth despite the broader downturn in startup investment over the past 18 months.</p>`,
        imageUrl: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        authorId: 1,
        categoryId: 3, // Markets
        publishedAt: new Date("2025-04-11T10:40:00"),
        isFeatured: false,
        isTrending: false,
        readTime: 5
      },
      {
        title: "Space Tech Startup Secures $150M for Satellite Internet Constellation",
        slug: "space-tech-startup-secures-150m-satellite-internet",
        excerpt: "OrbitConnect's innovative small satellites aim to provide affordable internet access to underserved regions globally.",
        content: `<h1>Space Tech Startup Secures $150M for Satellite Internet Constellation</h1>
<p>OrbitConnect, a space technology startup developing a constellation of small satellites for global internet coverage, has secured $150 million in Series B funding to accelerate its launch schedule and manufacturing capabilities.</p>
<p>The funding round was led by Horizon Ventures, with participation from existing investors including Space Capital, Founders Fund, and several strategic partners in the telecommunications industry. This brings the company's total funding to $220 million since its founding in 2022.</p>
<p>"This funding allows us to move from concept to execution at scale," said Dr. Maya Patel, founder and CEO of OrbitConnect. "We're now on track to deploy our initial constellation by mid-2026, which will provide coverage to some of the most underserved regions globally."</p>
<p>OrbitConnect's approach differs from other satellite internet providers in its focus on affordability and targeted coverage. Rather than aiming for global blanket coverage from the outset, the company is prioritizing regions with limited terrestrial infrastructure, particularly in parts of Africa, Asia, and Latin America.</p>
<p>The company's satellites are smaller and less expensive to manufacture and launch than traditional communications satellites, allowing for a more capital-efficient deployment. The innovative design includes advanced phased array antennas and inter-satellite laser communications that enable high bandwidth despite the smaller size.</p>
<p>"What impressed us about OrbitConnect is their pragmatic approach to solving the digital divide," said Michael Zhang, partner at Horizon Ventures. "Instead of trying to compete head-on with established players in developed markets, they're focusing on bringing affordable connectivity to the billions of people who remain underserved."</p>
<p>The funding will be used to establish a satellite manufacturing facility capable of producing up to 10 satellites per month, secure additional launch contracts, and expand the company's ground station network. OrbitConnect has already secured regulatory approvals in several key markets and has established partnerships with local telecommunications providers.</p>
<p>The company expects to begin service in its initial markets by late 2026, with subscription prices targeted at approximately 30% below current alternatives in those regions.</p>`,
        imageUrl: "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        authorId: 1,
        categoryId: 1, // Funding
        publishedAt: new Date("2025-04-10T17:15:00"),
        isFeatured: false,
        isTrending: false,
        readTime: 5
      },
      {
        title: "Biotech Startup Develops Novel Approach to Neurodegenerative Diseases",
        slug: "biotech-startup-develops-novel-approach-neurodegenerative-diseases",
        excerpt: "NeuroCure's therapeutic platform targets cellular repair mechanisms rather than just symptoms, showing promising results in early trials.",
        content: `<h1>Biotech Startup Develops Novel Approach to Neurodegenerative Diseases</h1>
<p>NeuroCure, a biotechnology startup founded by leading researchers in cellular biology, has announced promising results from preclinical studies of its novel therapeutic approach to neurodegenerative diseases, including Alzheimer's and Parkinson's.</p>
<p>The company's proprietary platform targets cellular repair mechanisms rather than focusing solely on the symptoms or protein aggregates typically associated with these conditions. Early data suggests the approach could potentially slow or even reverse disease progression in certain cases.</p>
<p>"Most approaches to neurodegenerative diseases have focused on clearing protein aggregates like amyloid plaques or addressing specific symptoms," explained Dr. Jennifer Chen, founder and chief scientific officer of NeuroCure. "Our research suggests that by enhancing the brain's natural cellular repair systems, we can address a more fundamental aspect of these diseases."</p>
<p>The company's lead compound, NC-01, has demonstrated the ability to enhance mitochondrial function and cellular cleanup mechanisms in animal models of neurodegenerative disease. In these studies, treated animals showed significant improvement in cognitive and motor function compared to untreated controls.</p>
<p>What makes NeuroCure's approach particularly notable is its potential broad applicability across multiple neurodegenerative conditions that share underlying cellular dysfunction mechanisms, despite having different clinical presentations.</p>
<p>"We're essentially boosting the brain's resilience and repair capabilities rather than targeting a single disease pathway," said Michael Rodriguez, CEO of NeuroCure. "This could represent a paradigm shift in how we approach these devastating conditions."</p>
<p>The company recently secured $45 million in Series A funding from healthcare-focused venture capital firms and has established a scientific advisory board comprising leading experts in neurology and drug development. It plans to file an Investigational New Drug application with the FDA later this year and begin Phase 1 clinical trials in early 2026.</p>
<p>With an aging global population, neurodegenerative diseases represent one of the most significant healthcare challenges of the coming decades. Current treatments for conditions like Alzheimer's and Parkinson's primarily address symptoms rather than altering disease progression, creating substantial unmet medical need and market opportunity for disease-modifying therapies.</p>`,
        imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        authorId: 1,
        categoryId: 4, // Biotech
        publishedAt: new Date("2025-04-09T13:20:00"),
        isFeatured: false,
        isTrending: false,
        readTime: 6
      }
    ];
    
    const currentDate = new Date();
    
    articles.forEach(article => {
      const fullArticle = {
        id: this.articleId++,
        ...article,
        publishedAt: article.publishedAt || currentDate
      };
      this.articles.set(fullArticle.id, fullArticle);
    });
  }
  
  async getUser(id) {
    return this.users.get(id);
  }
  
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  
  async createUser(user) {
    const id = this.userId++;
    const newUser = { ...user, id };
    this.users.set(id, newUser);
    return newUser;
  }
  
  async getCategories() {
    return Array.from(this.categories.values());
  }
  
  async getCategory(id) {
    return this.categories.get(id);
  }
  
  async getCategoryBySlug(slug) {
    return Array.from(this.categories.values()).find(
      (category) => category.slug === slug
    );
  }
  
  async createCategory(category) {
    const id = this.categoryId++;
    const newCategory = { ...category, id };
    this.categories.set(id, newCategory);
    return newCategory;
  }
  
  async getArticles(limit = 10, offset = 0) {
    const articles = Array.from(this.articles.values())
      .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
      .slice(offset, offset + limit);
    return articles;
  }
  
  async getArticlesByCategory(categoryId, limit = 10, offset = 0) {
    const articles = Array.from(this.articles.values())
      .filter((article) => article.categoryId === categoryId)
      .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
      .slice(offset, offset + limit);
    return articles;
  }
  
  async getArticlesByCategorySlug(slug, limit = 10, offset = 0) {
    const category = await this.getCategoryBySlug(slug);
    if (!category) return [];
    return this.getArticlesByCategory(category.id, limit, offset);
  }
  
  async getArticle(id) {
    return this.articles.get(id);
  }
  
  async getArticleBySlug(slug) {
    return Array.from(this.articles.values()).find(
      (article) => article.slug === slug
    );
  }
  
  async getFeaturedArticles(limit = 1) {
    const articles = Array.from(this.articles.values())
      .filter((article) => article.isFeatured)
      .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
      .slice(0, limit);
    return articles;
  }
  
  async getTrendingArticles(limit = 3) {
    const articles = Array.from(this.articles.values())
      .filter((article) => article.isTrending)
      .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
      .slice(0, limit);
    return articles;
  }
  
  async getRelatedArticles(articleId, limit = 2) {
    const article = await this.getArticle(articleId);
    if (!article) return [];
    
    const articles = Array.from(this.articles.values())
      .filter(
        (a) => a.id !== articleId && a.categoryId === article.categoryId
      )
      .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
      .slice(0, limit);
    return articles;
  }
  
  async searchArticles(query, limit = 10, offset = 0) {
    const lowerQuery = query.toLowerCase();
    const articles = Array.from(this.articles.values())
      .filter(
        (article) =>
          article.title.toLowerCase().includes(lowerQuery) ||
          article.excerpt.toLowerCase().includes(lowerQuery) ||
          article.content.toLowerCase().includes(lowerQuery)
      )
      .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
      .slice(offset, offset + limit);
    return articles;
  }
  
  async createArticle(article) {
    const id = this.articleId++;
    const newArticle = { ...article, id };
    this.articles.set(id, newArticle);
    return newArticle;
  }
  
  async subscribeToNewsletter(email) {
    // Check if email already exists
    const existing = Array.from(this.newsletters.values()).find(
      (newsletter) => newsletter.email === email
    );
    
    if (existing) {
      throw new Error("Email already subscribed");
    }
    
    const id = this.newsletterId++;
    const newNewsletter = {
      id,
      email,
      subscribedAt: new Date()
    };
    
    this.newsletters.set(id, newNewsletter);
    return newNewsletter;
  }
  
  async getNewsletterSubscribers() {
    return Array.from(this.newsletters.values());
  }
}

// Create and export a singleton instance
const storage = new MemStorage();

module.exports = { storage };