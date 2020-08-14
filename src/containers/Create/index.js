import React, { useState, useEffect } from 'react';

import * as contentful from 'contentful';
import * as contentfulManagement from 'contentful-management';
import { convertToKebabCase, skillLevels } from '../../utils';
import { SPACE_ID, ACCESS_TOKEN, ACCESS_TOKEN_MANAGEMENT } from '../../utils/contentful';
import Layout from './layout';

/**
 * Needed to fetch data
 */
const client = contentful.createClient({
  space: SPACE_ID,
  accessToken: ACCESS_TOKEN,
});

/**
 * Needed to manage data
 */
const clientManagement = contentfulManagement.createClient({
  accessToken: ACCESS_TOKEN_MANAGEMENT,
});

const Create = () => {
  const [title, setTitle] = useState('Hello World');
  const [slug, setSlug] = useState('hello-world');
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(10);
  const [skillLevel, setSkillLevel] = useState('beginner');
  const [url, setUrl] = useState('https://the-example-app-nodejs.contentful.com/courses/hello-world');
  const [image, setImage] = useState({});
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    client
      .getAssets()
      .then(response => {
        const retrievedAssets = response.items.map(asset => ({
          id: asset.sys.id,
          title: asset.fields.title,
          url: `https:${asset.fields.file.url}`,
        }));

        setAssets(retrievedAssets);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const titleKebabFormatted = convertToKebabCase(title);
    setSlug(titleKebabFormatted);
    setUrl(`https://the-example-app-nodejs.contentful.com/courses/${titleKebabFormatted}`);
  }, [title]);

  const handleSubmit = e => {
    e.preventDefault();

    clientManagement.getSpace(SPACE_ID).then(space =>
      space
        .createEntry('course', {
          fields: {
            title: { 'en-US': title },
            slug: { 'en-US': slug },
            shortDescription: { 'en-US': shortDescription },
            description: { 'en-US': description },
            duration: { 'en-US': Number.parseInt(duration, 10) },
            skillLevel: { 'en-US': skillLevel },
            url: { 'en-US': url },
            image: {
              'en-US': {
                sys: {
                  id: image.id,
                  linkType: 'Asset',
                  type: 'Link',
                },
              },
            },
          },
        })
        .then(entry => {
          /**
           * Entry will be added as a draft,
           * until we publish it
           */
          entry.publish();

          console.log(`%cEntry ${entry.sys.id} created and published.`, 'background: #d7dae0; color: #282c34;', entry);
        })
        .catch(error => {
          console.log('Error occurred while creating Entry');
          console.error(error);
        }),
    );
  };

  const handleClear = () => {
    setTitle('');
    setSlug('');
    setShortDescription('');
    setDescription('');
    setImage({});
    setDuration(0);
    setSkillLevel('');
    setUrl('');
  };

  const layoutProps = {
    handleSubmit,
    handleClear,
    title,
    setTitle,
    slug,
    setSlug,
    shortDescription,
    setShortDescription,
    description,
    setDescription,
    duration,
    setDuration,
    skillLevel,
    setSkillLevel,
    skillLevels,
    url,
    setUrl,
    image,
    setImage,
    assets,
  };

  return <Layout {...layoutProps} />;
};

export default Create;
