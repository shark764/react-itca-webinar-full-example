import * as contentful from 'contentful';

export const SPACE_ID = 'srlpekq85luo';
export const ACCESS_TOKEN = 'evMFF1eK--2PX6Qqrlq8glrKOurVH1pdvaI-FRgmufU';
export const ACCESS_TOKEN_MANAGEMENT = 'CFPAT-WAjUteVc06b2IhNAw7_DXGQUXCmv0ZMc6_m9obcABag';

export const client = contentful.createClient({
  space: SPACE_ID,
  accessToken: ACCESS_TOKEN,
});

export async function getEntries(query) {
  const entries = await client.getEntries(query);

  return dataTransformer(entries.items);

  // ************************
  // Using promise
  // ************************
  // return client
  //   .getEntries(query)
  //   .then(result => {
  //     return result.items;
  //   })
  //   .then(items => {
  //     return dataTransformer(items);
  //   })
  //   .catch(err => {
  //     console.error(err);
  //   });
}

/**
 * ---------------------------
 * Contentful structure:
 * ---------------------------
 * course = {
 *    fields: {
 *      title: string,
 *      url: string,
 *      shortDescription: string,
 *      description: string,
 *      duration: number,
 *      skillLevel: string,
 *      image: {
 *        fields: {
 *          file: {
 *            url: string,
 *          },
 *        },
 *      },
 *    },
 *    sys: {
 *      createdAt: string,
 *    },
 *  };
 *
 * ---------------------------
 * Desired structure:
 * ---------------------------
 * course = {
 *    title: string,
 *    url: string,
 *    shortDescription: string,
 *    description: string,
 *    duration: number,
 *    skillLevel: string,
 *    image: {
 *      id: string,
 *      title: string,
 *      url: string,
 *    },
 *    id: string,
 *    createdAt: string,
 *  };
 */
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
