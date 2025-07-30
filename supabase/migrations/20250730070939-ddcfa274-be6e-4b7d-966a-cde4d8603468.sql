-- Update blog_comments policies to allow anyone to comment
-- First drop existing restrictive policies
DROP POLICY IF EXISTS "Authenticated users can create comments" ON public.blog_comments;

-- Create new policy allowing anyone to comment (guest comments)
CREATE POLICY "Anyone can create comments" 
ON public.blog_comments 
FOR INSERT 
WITH CHECK (true);

-- Add a field to track guest comments with name and email
ALTER TABLE public.blog_comments 
ADD COLUMN guest_name TEXT,
ADD COLUMN guest_email TEXT;

-- Update existing policies to work with guest comments
-- Users can still update their own comments, admins can update any
-- Keep existing view policy (anyone can view)
-- Keep existing delete policies (users their own, admins any)