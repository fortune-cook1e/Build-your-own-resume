import { ResumeData, defaultMetadata } from './index';
import { createId } from '@paralleldrive/cuid2';

export const sampleResume: ResumeData = {
  basics: {
    name: 'John Doe',
    email: 'john.doe@gmail.com',
    phone: '(555) 123-4567',
    location: 'Pleasantville, CA 94588',
    headline: 'Creative Front-End Developer',
    gender: 'female',
    url: {
      label: '',
      link: 'https://johndoe.me/',
    },
    picture: {
      url: 'https://i.imgur.com/HgwyOuJ.jpg',
      size: 120,
    },
  },
  sections: {
    profiles: {
      name: 'Profiles',
      visible: true,
      id: 'profiles',
      items: [
        {
          id: createId(),
          visible: true,
          network: 'LinkedIn',
          username: 'johndoe',
          icon: 'linkedin',
          url: {
            label: 'LinkedIn',
            link: 'https://linkedin.com/in/johndoe',
          },
        },
        {
          id: createId(),
          visible: true,
          network: 'GitHub',
          username: 'johndoe',
          icon: 'github',
          url: {
            label: 'Github',
            link: 'https://github.com/johndoe',
          },
        },
      ],
    },
    experience: {
      name: 'Experience',
      visible: true,
      id: 'experience',
      items: [
        {
          id: createId(),
          visible: true,
          company: 'Creative Solutions Inc.',
          position: 'Senior Web Developer',
          location: 'San Francisco, CA',
          date: 'July 2014 to July 2018',
          summary:
            '<ul><li><p>Spearheaded the redesign of the main product website, resulting in a 40% increase in user engagement.</p></li><li><p>Developed and implemented a new responsive framework, improving cross-device compatibility.</p></li><li><p>Mentored a team of four junior developers, fostering a culture of technical excellence.</p></li></ul>',
        },
        {
          id: createId(),
          visible: true,
          company: 'TechAdvancers',
          position: 'Web Developer',
          location: 'San Jose, CA',
          date: 'July 2014 to July 2018',
          summary:
            '<ul><li><p>Collaborated in a team of 10 to develop high-quality web applications using React.js and Node.js.</p></li><li><p>Managed the integration of third-party services such as Stripe for payments and Twilio for SMS services.</p></li><li><p>Optimized application performance, achieving a 30% reduction in load times.</p></li></ul>',
        },
      ],
    },

    education: {
      name: 'Education',
      id: 'education',
      visible: true,
      items: [
        {
          id: createId(),
          visible: true,
          college: 'Harvard University',
          major: 'B.S. in Computer Science',
          area: 'USA',
          date: 'July 2014 to July 2018',
          summary:
            '<ul><li><p>Collaborated in a team of 10 to develop high-quality web applications using React.js and Node.js.</p></li><li><p>Managed the integration of third-party services such as Stripe for payments and Twilio for SMS services.</p></li><li><p>Optimized application performance, achieving a 30% reduction in load times.</p></li></ul>',
        },
      ],
    },

    summary: {
      name: 'Summary',
      visible: true,
      id: 'summary',
      content:
        '<p>Innovative Web Developer with 5 years of experience in building impactful and user-friendly websites and applications. Specializes in <strong>front-end technologies</strong> and passionate about modern web standards and cutting-edge development techniques. Proven track record of leading successful projects from concept to deployment.</p>',
    },

    projects: {
      name: 'Projects',
      visible: true,
      id: 'projects',
      items: [
        {
          id: createId(),
          visible: true,
          name: 'E-Commerce Platform',
          description: 'Project Lead',
          date: 'Jul 2018 to Present',
          summary:
            '<p>Led the development of a full-stack e-commerce platform, improving sales conversion by 25%.</p>',
          website: {
            label: 'Baidu',
            link: 'https://www.baidu.com',
          },
        },
        {
          id: createId(),
          visible: true,
          name: 'Interactive Dashboard',
          description: 'Frontend Developer',
          date: 'Jul 2018 to Present',
          summary:
            '<p>Created an interactive analytics dashboard for a SaaS application, enhancing data visualization for clients.</p>',
          website: {
            label: 'Baidu',
            link: 'https://www.baidu.com',
          },
        },
      ],
    },
    interests: {
      name: 'Interests',
      visible: true,
      id: 'interests',
      items: [
        {
          id: createId(),
          name: 'Tennis',
          keywords: ['Tennis Player'],
          visible: true,
        },
      ],
    },
    skills: {
      name: 'Skills',
      visible: true,
      id: 'skills',
      items: [
        {
          id: createId(),
          visible: true,
          name: 'Web Technologies',
          level: 'Beginner',
          keywords: ['HTML5', 'JavaScript', 'PHP', 'Python'],
        },
        {
          id: createId(),
          visible: true,
          name: 'Web Frameworks',
          level: 'Expert',
          keywords: ['React.js', 'Angular', 'Vue.js', 'Laravel', 'Django'],
        },
        {
          id: createId(),
          visible: true,
          name: 'Tools',
          keywords: ['Webpack', 'Git', 'Jenkins', 'Docker', 'JIRA'],
          level: 'Intermediate',
        },
      ],
    },
    // awards: {
    //   name: 'Awards',
    //   columns: 1,
    //   visible: true,
    //   id: 'awards',
    //   items: [],
    // },
    // certifications: {
    //   name: 'Certifications',
    //   columns: 1,
    //   visible: true,
    //   id: 'certifications',
    //   items: [
    //     {
    //       id: 'spdhh9rrqi1gvj0yqnbqunlo',
    //       visible: true,
    //       name: 'Full-Stack Web Development',
    //       issuer: 'CodeAcademy',
    //       date: '2020',
    //       summary: '',
    //       url: {
    //         label: '',
    //         href: '',
    //       },
    //     },
    //     {
    //       id: 'n838rddyqv47zexn6cxauwqp',
    //       visible: true,
    //       name: 'AWS Certified Developer',
    //       issuer: 'Amazon Web Services',
    //       date: '2019',
    //       summary: '',
    //       url: {
    //         label: '',
    //         href: '',
    //       },
    //     },
    //   ],
    // },
    // volunteer: {
    //   name: 'Volunteering',
    //   columns: 1,
    //   visible: true,
    //   id: 'volunteer',
    //   items: [],
    // },

    // languages: {
    //   name: 'Languages',
    //   columns: 1,
    //   visible: true,
    //   id: 'languages',
    //   items: [],
    // },

    // publications: {
    //   name: 'Publications',
    //   columns: 1,
    //   visible: true,
    //   id: 'publications',
    //   items: [],
    // },
    // references: {
    //   name: 'References',
    //   columns: 1,
    //   visible: false,
    //   id: 'references',
    //   items: [
    //     {
    //       id: 'f2sv5z0cce6ztjl87yuk8fak',
    //       visible: true,
    //       name: 'Available upon request',
    //       description: '',
    //       summary: '',
    //       url: {
    //         label: '',
    //         href: '',
    //       },
    //     },
    //   ],
    // },
  },

  metadata: defaultMetadata,
  // metadata: {
  //   template: 'glalie',
  //   layout: [
  //     [
  //       ['summary', 'experience', 'education', 'projects', 'references'],
  //       [
  //         'profiles',
  //         'skills',
  //         'certifications',
  //         'interests',
  //         'languages',
  //         'awards',
  //         'volunteer',
  //         'publications',
  //       ],
  //     ],
  //   ],
  //   css: {
  //     value:
  //       '.section {\n\toutline: 1px solid #000;\n\toutline-offset: 4px;\n}',
  //     visible: false,
  //   },
  //   page: {
  //     margin: 14,
  //     format: 'a4',
  //     options: {
  //       breakLine: true,
  //       pageNumbers: true,
  //     },
  //   },
  //   theme: {
  //     background: '#ffffff',
  //     text: '#000000',
  //     primary: '#ca8a04',
  //   },
  //   typography: {
  //     font: {
  //       family: 'Merriweather',
  //       subset: 'latin',
  //       variants: ['regular'],
  //       size: 13,
  //     },
  //     lineHeight: 1.75,
  //     hideIcons: false,
  //     underlineLinks: true,
  //   },
  //   notes: '',
  // },
};
