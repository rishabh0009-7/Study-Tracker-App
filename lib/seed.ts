import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const subjectsData = [
  {
    name: "Corporate Accounting & Financial Management",
    description:
      "Comprehensive study of corporate accounting principles and financial management techniques",
    chapters: [
      "Introduction to Accounting",
      "Introduction to Corporate Accounting",
      "Accounting Standards",
      "Accounting for Share Capital & Debentures",
      "Redemption of Debentures & Preference Shares",
      "Consolidation of Accounts",
      "Financial Statement Analysis",
      "Cash Flow Statement",
      "Financial Management Basics",
      "Capital Budgeting",
      "Working Capital Management",
      "Cost of Capital",
      "Dividend Decisions",
      "Risk Management",
    ],
    mockTests: [
      "Mock Test 1 - Corporate Accounting",
      "Mock Test 2 - Financial Management",
    ],
  },
  {
    name: "Company Law & Practice",
    description:
      "Legal framework and practical aspects of company formation and management",
    chapters: [
      "Introduction to Company Law",
      "Types of Companies",
      "Formation of Companies",
      "Memorandum & Articles of Association",
      "Share Capital & Debentures",
      "Membership in a Company",
      "Management & Administration",
      "Accounts & Auditors",
      "Dividend",
      "Charges & Registration",
      "Compromises, Arrangements & Amalgamations",
      "Oppression & Mismanagement",
      "Producer Companies",
      "Dormant Companies",
      "Global Practices",
    ],
    mockTests: [
      "Mock Test 1 - Company Formation",
      "Mock Test 2 - Corporate Governance",
    ],
  },
  {
    name: "Economic, Commercial & Intellectual Property Laws",
    description:
      "Economic policies, commercial regulations, and intellectual property rights",
    chapters: [
      "Law relating to FEMA & Foreign Trade Policy",
      "Overseas Direct Investment",
      "Foreign Trade Policy & Procedures",
      "SEZ Act",
      "Competition Law",
      "Consumer Protection Act",
      "Essential Commodities Act",
      "Legal Metrology",
      "Arbitration & Conciliation",
      "IPR Basics (Patents, Copyrights, Trademarks, Designs)",
    ],
    mockTests: [
      "Mock Test 1 - Economic Laws",
      "Mock Test 2 - IPR & Commercial Laws",
    ],
  },
  {
    name: "Setting up of Business, Industrial & Labour Laws",
    description:
      "Business entity selection, industrial regulations, and labor law compliance",
    chapters: [
      "Selection of Business Organization",
      "Corporate Entities – Companies, LLP",
      "Promotion & Incorporation",
      "MSMEs",
      "Start-ups & Business Collaborations",
      "Conversion of Business Entities",
      "Joint Ventures",
      "Labour Laws Basics (Factories Act, Shops & Establishment, Industrial Disputes)",
      "Social Security Laws",
      "Code on Wages",
      "Code on Social Security",
    ],
    mockTests: ["Mock Test 1 - Business Setup", "Mock Test 2 - Labour Laws"],
  },
  {
    name: "Capital Market & Securities Laws",
    description:
      "Capital market operations, securities regulations, and market intermediaries",
    chapters: [
      "Basics of Capital Market",
      "Secondary Market in India",
      "SEBI Act, 1992",
      "Securities Contracts (Regulation) Act, 1956",
      "Laws Governing Depositories",
      "Securities Market Intermediaries",
      "IFSC Authority",
      "Issue of Capital & Disclosure Requirements",
      "Share Based Employee Benefits",
      "Insider Trading Prohibition",
      "Fraudulent & Unfair Trade Practices",
      "Delisting of Shares",
      "Buy-back of Securities",
      "Mutual Funds",
      "Collective Investment Schemes",
    ],
    mockTests: [
      "Mock Test 1 - Capital Market Basics",
      "Mock Test 2 - Securities Regulations",
    ],
  },
  {
    name: "Jurisprudence, Interpretation & General Laws",
    description:
      "Fundamental legal principles, statutory interpretation, and general laws governing legal practice",
    chapters: [
      "Sources of Law",
      "Schools of Jurisprudence",
      "Law & Justice",
      "Legal Systems",
      "Constitution of India (Preamble, Citizenship, Fundamental Rights & Duties, Directive Principles)",
      "Union & State Executive, Legislature, Judiciary",
      "Writ Jurisdiction of Courts",
      "Administrative Law",
      "Law of Torts",
      "Limitation Act",
      "Indian Penal Code – General Principles & Offenses",
      "Indian Evidence Act – Facts, Relevancy, Proof",
      "Civil Procedure Code (CPC)",
      "Criminal Procedure Code (CrPC)",
      "Interpretation of Statutes – Principles, Aids, Rules",
      "General Clauses Act",
      "Right to Information Act (RTI)",
      "Information Technology & Cybercrimes Law",
      "Arbitration & Conciliation Law",
      "Stamp & Registration Law",
    ],
    mockTests: [
      "Mock Test 1 - Jurisprudence & Constitutional Law",
      "Mock Test 2 - General Laws & Procedures",
    ],
  },
  {
    name: "Tax Laws (Direct & Indirect Taxation)",
    description:
      "Comprehensive study of direct and indirect taxation including Income Tax, GST, and other tax laws",
    chapters: [
      "Basic Concepts of Income Tax",
      "Residential Status & Scope of Total Income",
      "Incomes Exempt from Tax",
      "Heads of Income: Salaries",
      "Heads of Income: Income from House Property",
      "Profits & Gains of Business or Profession",
      "Capital Gains",
      "Income from Other Sources",
      "Deductions from Gross Total Income (Chapter VI-A)",
      "Clubbing of Income, Set-off and Carry Forward of Losses",
      "Assessment Procedure, Returns & Types of Assessment",
      "Income Tax Authorities, Appeals, Penalties & Prosecutions",
      "Tax Planning, Tax Avoidance & Tax Evasion",
      "DTAA & Transfer Pricing (Basics)",
      "Introduction to GST — Concept & Structure",
      "Scope, Time & Place of Supply, Value (GST)",
      "Registration, Tax Invoice & Returns (GST)",
      "Input Tax Credit, Assessment & Audit (GST)",
      "Refunds, Demand & Recovery, Offences & Penalties (GST)",
      "Customs Law & Other Indirect Taxes (Overview)",
      "Practical Taxation: Assessments & Case Studies",
    ],
    mockTests: [
      "Mock Test 1 - Direct Taxation",
      "Mock Test 2 - Indirect Taxation & GST",
    ],
  },
];

export async function seedDatabase(userId: string) {
  // Check if user already has subjects
  const existingSubjects = await prisma.subject.findMany({
    where: { userId },
  });

  // If user has subjects, check if we need to add missing subjects
  if (existingSubjects.length > 0) {
    const hasJurisprudence = existingSubjects.some(
      (subject) =>
        subject.name === "Jurisprudence, Interpretation & General Laws"
    );
    const hasTaxLaws = existingSubjects.some(
      (subject) => subject.name === "Tax Laws (Direct & Indirect Taxation)"
    );

    if (hasJurisprudence && hasTaxLaws) {
      console.log("User already has all subjects, skipping seed");
      return;
    }

    // Add missing subjects
    const missingSubjects = [];

    if (!hasJurisprudence) {
      const jurisprudenceData = subjectsData.find(
        (subject) =>
          subject.name === "Jurisprudence, Interpretation & General Laws"
      );
      if (jurisprudenceData) missingSubjects.push(jurisprudenceData);
    }

    if (!hasTaxLaws) {
      const taxLawsData = subjectsData.find(
        (subject) => subject.name === "Tax Laws (Direct & Indirect Taxation)"
      );
      if (taxLawsData) missingSubjects.push(taxLawsData);
    }

    for (const subjectData of missingSubjects) {
      console.log(`Adding missing subject: ${subjectData.name}`);

      const subject = await prisma.subject.create({
        data: {
          name: subjectData.name,
          description: subjectData.description,
          userId,
        },
      });

      // Create chapters
      for (let i = 0; i < subjectData.chapters.length; i++) {
        await prisma.chapter.create({
          data: {
            name: subjectData.chapters[i],
            order: i + 1,
            subjectId: subject.id,
          },
        });
      }

      // Create mock tests
      for (let i = 0; i < subjectData.mockTests.length; i++) {
        await prisma.mockTest.create({
          data: {
            name: subjectData.mockTests[i],
            order: i + 1,
            subjectId: subject.id,
          },
        });
      }

      console.log(`${subjectData.name} subject added successfully`);
    }

    return;
  }

  for (const subjectData of subjectsData) {
    const subject = await prisma.subject.create({
      data: {
        name: subjectData.name,
        description: subjectData.description,
        userId,
      },
    });

    // Create chapters
    for (let i = 0; i < subjectData.chapters.length; i++) {
      await prisma.chapter.create({
        data: {
          name: subjectData.chapters[i],
          order: i + 1,
          subjectId: subject.id,
        },
      });
    }

    // Create mock tests
    for (let i = 0; i < subjectData.mockTests.length; i++) {
      await prisma.mockTest.create({
        data: {
          name: subjectData.mockTests[i],
          order: i + 1,
          subjectId: subject.id,
        },
      });
    }
  }

  console.log("Database seeded successfully");
}

// Run seed if called directly
if (require.main === module) {
  console.log("Seeding database with CS Executive subjects...");
  // This would need a user ID - for now, we'll just log that manual seeding is needed
  console.log(
    "Please run the seed function with a valid user ID after creating a user account."
  );
  process.exit(0);
}
