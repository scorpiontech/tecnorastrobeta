-- Create storage bucket for pre-cadastro attachments
INSERT INTO storage.buckets (id, name, public)
VALUES ('pre-cadastro-docs', 'pre-cadastro-docs', false);

-- Allow authenticated users to upload files
CREATE POLICY "Allow uploads to pre-cadastro-docs"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'pre-cadastro-docs');

-- Allow public read for edge function access
CREATE POLICY "Allow public read from pre-cadastro-docs"
ON storage.objects FOR SELECT
USING (bucket_id = 'pre-cadastro-docs');