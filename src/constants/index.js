import {
  mobile,
  mysql,
  nextjs,
  expressjs,
  python,
  gsap,
  uniflix,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  portfolio,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  meta,
  freelance,
  shopify,
  sheryians,
  // macbookpro,
  // falverra,
  // tripguide,
  threejs,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Experience",
  },

  {
    id: "skills",
    title: "Skills",
  },

  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Web System Design and Development",
    icon: web,
  },
  {
    title: "Mobile Application Development",
    icon: mobile,
  },
  {
    title: "Backend Engineer",
    icon: backend,
  },
  {
    title:  "UI/UX Design",
    icon: creator,
  },
];

const technologies = [
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Next JS",
    icon: nextjs,
  },

  {
    name: "JavaScript",
    icon: javascript,
  },

  {
    name: "Node JS",
    icon: nodejs,
  },

  {
    name: "Express ",
    icon: expressjs,
  },
  {
    name: "MySQL",
    icon: mysql,
  },

  {
    name: "Gsap",
    icon: gsap,
  },

  {
    name: "Python",
    icon: python,
  },

  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
];

const experiences = [
  {
    title: "Freelance Frontend Developer",
    company_name: "Self-employed",
    icon: freelance, // Replace with any icon you like
    iconBg: "#0188E3",
    date: "Jan 2024 - Present",
    points: [
      "Built responsive and interactive web apps using React.js and Tailwind CSS.",
      "Developed and deployed modern landing pages and portfolio websites for clients.",
      "Integrated APIs and handled form validation, animations, and smooth scroll effects.",
      "Delivered pixel-perfect UI designs based on Figma and Adobe XD mockups.",
    ],
  },
  {
    title: "Full Stack Development Intern",
    company_name: "Nugsoft Technologies",
    icon: sheryians, // Or institute logo
    iconBg: "#ffff",
    date: "June 2025 - July 2025",
    points: [
      "Completed an intensive training program focused on full stack development and AI.",
      "Built multiple full-stack projects, including CRUD apps and authentication systems.",
      "Worked with tools like Node.js, Express.js, MySQL, React.js, and Git.",
      "Gained hands-on experience in deploying apps and following clean code practices.",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Rick does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects = [
  {
    name: "3D portfolio Website",
    description:
      "A visually stunning 3D portfolio website built using React Three Fiber and Three.js The website features smooth animations, responsive design, and an engaging user experience.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "three.js",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
    ],
    image: portfolio,
    source_code_link: "https://github.com/Mervynlinc/portfolio.git",
    live_website_link: "#",
  },
  {
    name: "uniflix",
    description:
      "Uniflix is a modern, user-friendly entertainment website that helps users discover and explore movies across various genres. The platform provides organized movie information, trailers, and curated collections, all presented through a clean and modern interface designed for an enjoyable user experience.",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
      {
        name: "superbase",
        color: "green-text-gradient",
      },
    ],
    image: uniflix,
    source_code_link: "https://github.com/Mervynlinc/uniflix",
    live_website_link: "https://uniflix-20.vercel.app/",
  },
  // {
  //   name: "Trip Guide",
  //   description:
  //     "A comprehensive travel booking platform that allows users to book flights, hotels, and rental cars, and offers curated recommendations for popular destinations.",
  //   tags: [
  //     {
  //       name: "nextjs",
  //       color: "blue-text-gradient",
  //     },
  //     {
  //       name: "supabase",
  //       color: "green-text-gradient",
  //     },
  //     {
  //       name: "css",
  //       color: "pink-text-gradient",
  //     },
  //   ],
  //   image: tripguide,
  //   // github link ⬇️
  //   source_code_link: "https://github.com/",
  //   // project link ⬇️
  //   live_website_link: "https://app.netlify.com/teams/gitswastik08/projects",
  // },
];

export { services, technologies, experiences, testimonials, projects };
