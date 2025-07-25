import type { SlugValidationContext } from 'sanity';

export async function isUniqueAcrossAllDocuments(slug: string, context: SlugValidationContext) {
  const { document, getClient } = context;
  const client = getClient({ apiVersion: '2025-06-10' });
  const id = document?._id.replace(/^drafts\./, '');
  const params = {
    draft: `drafts.${id}`,
    published: id,
    slug,
  };
  const query = '!defined(*[!(_id in [$draft, $published]) && url.current == $slug][0]._id)';
  return await client.fetch(query, params);
}
