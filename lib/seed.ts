import { prisma } from "./prisma";

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
];

export async function seedDatabase(userId: string) {
  // Check if user already has subjects
  const existingSubjects = await prisma.subject.findMany({
    where: { userId },
  });

  if (existingSubjects.length > 0) {
    console.log("User already has subjects, skipping seed");
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
