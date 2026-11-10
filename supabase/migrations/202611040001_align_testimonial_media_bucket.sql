do $$
begin
  update storage.buckets
  set
    public = false,
    file_size_limit = 20971520,
    allowed_mime_types = array[
      'application/pdf',
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/avif',
      'video/mp4',
      'video/webm',
      'video/quicktime'
    ]
  where id = 'cms-private-assets';

  if not found then
    raise exception 'Required private bucket cms-private-assets does not exist; apply the testimonial media setup migration first.';
  end if;
end
$$;
