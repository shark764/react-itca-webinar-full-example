export const SPACE_ID = 'srlpekq85luo';

export const ACCESS_TOKEN = 'evMFF1eK--2PX6Qqrlq8glrKOurVH1pdvaI-FRgmufU';

export const ACCESS_TOKEN_MANAGEMENT = 'CFPAT-WAjUteVc06b2IhNAw7_DXGQUXCmv0ZMc6_m9obcABag';

export const skillLevels = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
];

export const convertToKebabCase = str =>
  str
    .replace(/([a-z])([A-Z])/g, '$1-$2') // get all lowercase letters that are near to uppercase ones
    .replace(/[\s_]+/g, '-') // replace all spaces and low dash
    .toLowerCase(); // convert to lower case

export const humanize = str =>
  str
    .replace(/^[\s_]+|[\s_]+$/g, '')
    .replace(/[_\s]+/g, ' ')
    .replace(/[-\s]+/g, ' ')
    .replace(/^[a-z]/, match => match.toUpperCase());

export const dataTransformer = courses =>
  courses.map(item => ({
    ...item.fields,
    image: {
      id: item.fields.image.sys.id,
      title: item.fields.image.fields.title,
      url: item.fields.image.fields.file.url,
    },
    id: item.sys.id,
    createdAt: item.sys.createdAt,
  }));
