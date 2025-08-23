-- Tighten RLS on businesses and add public-safe RPC functions

-- 1) Restrict public SELECT on businesses
DROP POLICY IF EXISTS "Businesses are viewable by everyone" ON public.businesses;

-- Allow only authenticated users to select full business rows
CREATE POLICY "Authenticated users can view businesses"
ON public.businesses
FOR SELECT
TO authenticated
USING (true);

-- Keep existing INSERT/UPDATE/DELETE policies as they are

-- 2) Public-safe functions for listing/searching businesses without sensitive fields
CREATE OR REPLACE FUNCTION public.get_public_businesses(
  search_term text DEFAULT NULL,
  category_filter text DEFAULT NULL,
  location_filter text DEFAULT NULL
)
RETURNS TABLE (
  id uuid,
  name text,
  description text,
  category text,
  city text,
  state text,
  rating numeric,
  image_url text,
  website text
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT b.id,
         b.name,
         b.description,
         b.category,
         b.city,
         b.state,
         b.rating,
         b.image_url,
         b.website
  FROM public.businesses b
  WHERE (
    search_term IS NULL OR 
    b.name ILIKE '%' || search_term || '%' OR 
    b.description ILIKE '%' || search_term || '%'
  )
  AND (
    category_filter IS NULL OR b.category = category_filter
  )
  AND (
    location_filter IS NULL OR 
    b.city ILIKE '%' || location_filter || '%' OR 
    b.state ILIKE '%' || location_filter || '%'
  )
  ORDER BY b.rating DESC, b.name ASC;
$$;

-- 3) Public-safe function for fetching a single business without sensitive fields
CREATE OR REPLACE FUNCTION public.get_public_business_by_id(
  business_id uuid
)
RETURNS TABLE (
  id uuid,
  name text,
  description text,
  category text,
  city text,
  state text,
  rating numeric,
  image_url text,
  website text
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT b.id,
         b.name,
         b.description,
         b.category,
         b.city,
         b.state,
         b.rating,
         b.image_url,
         b.website
  FROM public.businesses b
  WHERE b.id = business_id
  LIMIT 1;
$$;

-- 4) Explicit grants for anon/authenticated to execute the functions
GRANT EXECUTE ON FUNCTION public.get_public_businesses(text, text, text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_public_business_by_id(uuid) TO anon, authenticated;