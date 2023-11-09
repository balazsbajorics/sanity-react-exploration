import { createClient } from '@sanity/client';

export default createClient({
  projectId: 'ybq0h7ve', // find this at manage.sanity.io or in your sanity.json
  dataset: 'production', // this is from those question during 'sanity init'
  useCdn: true,
  apiVersion: '2023-10-09',
});
