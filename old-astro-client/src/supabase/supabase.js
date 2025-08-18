import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://iiyjiikbtsckevydbcsj.supabase.co';
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

export const getTestimonials = async () => {
	const { data, error } = await supabase.from('testimonials').select('*');
	return data;
};
