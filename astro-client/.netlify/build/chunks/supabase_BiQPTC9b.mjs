import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://iiyjiikbtsckevydbcsj.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpeWppaWtidHNja2V2eWRiY3NqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc0MjcxNjksImV4cCI6MjAyMzAwMzE2OX0.vpDR5Cvbc1len0MIa9QdqoKlg_GFrVO1R1oUs-QyF9U";
const supabase = createClient(supabaseUrl, supabaseKey);
const getTestimonials = async () => {
  const { data, error } = await supabase.from("testimonials").select("*");
  return data;
};

export { getTestimonials as g };
