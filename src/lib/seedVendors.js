/**
 * seedVendors — one-time dev utility to seed real vendor records into Supabase.
 * Skips any vendor whose name already exists for this user.
 * Usage: see bottom of file or call from browser console.
 *
 * seedVendors(supabase, userId)
 */

const VENDORS = [
  /* ── Photography ──────────────────────────────────────────────────────── */
  {
    name:          'Kelly Giarrocco',
    category:      'Photography',
    status:        'Contacted',
    contact_name:  'Kelly Giarrocco',
    contact_email: 'hello@kellygiarrocco.com',
    contact_phone: '610-864-2873',
    instagram:     '@kellygiarrocco',
    website:       'https://www.kellygiarrocco.com',
    pricing:       'Elopement $4,000 / Wedding (<75) $8,000 / Wedding Day $11,000 / Weekend $15,000',
    packages:      'Add-ons: extra hr $1,200, portraits $1,200, albums $1,500–$2,000',
    source:        'gmail',
  },
  {
    name:          'Brianna Lynn Photos',
    category:      'Photography',
    status:        'Contacted',
    contact_name:  'Brianna Boyack',
    contact_email: 'briannalynnbphotos@gmail.com',
    contact_phone: '916-301-3075',
    website:       'https://briannalynnphotos.pic-time.com',
    pricing:       'Collection 1 $6,850 / Collection 2 $8,250 / Collection 3 $10,050 / Intimate from $5,850. 10% referral discount from Jax!',
    packages:      'C1: 8hrs, 800+ digital+film. C2: full day+welcome, 2nd shooter. C3: full day+welcome+day-after, album, drone',
    source:        'gmail',
  },
  {
    name:          'Abby Hart Photography',
    category:      'Photography',
    status:        'Contacted',
    contact_name:  'Abigail Lockhart',
    contact_email: 'abbyhartphotography@gmail.com',
    website:       'https://abbyhartphotography.com',
    pricing:       'Basics $8,000 / Upgraded $9,500 / Premium $11,250 / All Inclusive $13,000',
    packages:      'Basics: 8hrs, 1 photog. Premium: 10hrs+2nd shooter+rehearsal. Add-ons: film $75/roll, engagement $600/hr, 2nd shooter $1K',
    source:        'gmail',
  },
  {
    name:          'Rachel Rosenstein',
    category:      'Photography',
    status:        'Contacted',
    contact_name:  'Rachel Rosenstein',
    contact_email: 'rachelrosenstein1@gmail.com',
    pricing:       '8hrs from $8,000+tax / 9hrs from $8,750+tax / 10hrs from $9,500+tax',
    packages:      'All include 2 photographers, engagement session, printing rights, sneak peeks in 48hrs. Add-ons: mini film $300+tax, full film $500+tax',
    source:        'gmail',
  },
  {
    name:          'The Lumière Collective',
    category:      'Photography',
    status:        'Contacted',
    contact_name:  'Grey & Lainey Alquist',
    contact_email: 'lumierecoweddings@gmail.com',
    contact_phone: '475-227-5163',
    website:       'https://www.thelumierecollective.com',
    pricing:       'Photo $10,475 / Video $10,475 / Photo+Video $17,475',
    packages:      '10hrs, 2 shooters, film+digital. Add-ons: engagement $1,200, Super 8 $2,500, extra hrs $750/hr. 40% deposit',
    notes:         'Does both photo AND video',
    source:        'gmail',
  },
  {
    name:          'Taryn Ruiz Photography',
    category:      'Photography',
    status:        'Contacted',
    contact_name:  'Taryn Ruiz (via HoneyBook)',
    website:       'https://tarynruizphotography.com',
    pricing:       '$10,000–$15,000 typical',
    packages:      '1–3 photographers, film+digital, drone, previews 1wk, gallery 10–12wks, glass USB',
    source:        'gmail',
  },
  {
    name:          'Lauren Fair Photography',
    category:      'Photography',
    status:        'Contacted',
    contact_name:  'Lauren Fair (via HoneyBook)',
    website:       'https://www.laurenfairphotography.com',
    pricing:       'Collection 1 $22,500 / Collection 2 $32,000 / Collection 3 $42,000',
    packages:      'C1: 8hrs, 2 photogs. C2: 10hrs+welcome event. C3: 12hrs+welcome+rehearsal. Add-ons: extra hr $1,950, couples session $3,500, albums $2,800–$3,250',
    notes:         'Featured in VOGUE, People, ELLE, BRIDES. Premium tier.',
    source:        'gmail',
  },
  {
    name:          'Katie Gracen',
    category:      'Photography',
    status:        'Contacted',
    contact_name:  'Katie Hall (via HoneyBook)',
    website:       'https://katiegracen.com',
    pricing:       'See PDF — image-based collections guide',
    source:        'gmail',
  },
  {
    name:          'HELAINE',
    category:      'Photography',
    status:        'Contacted',
    contact_name:  'Chaise Tinsley',
    contact_email: 'info@hellohelaine.com',
    website:       'https://www.hellohelaine.com',
    pricing:       'Custom quote in image-based PDF (budget $8–10K noted)',
    source:        'gmail',
  },
  {
    name:          'Du Soleil Photographie',
    category:      'Photography',
    status:        'Contacted',
    contact_name:  'Minh Cao',
    contact_email: 'hello@dusoleilphoto.com',
    contact_phone: '267-644-6483',
    website:       'https://dusoleilphoto.com',
    pricing:       'See Dubsado portal',
    notes:         'Best of Philly 2023, Top Photographer by BRIDES',
    source:        'gmail',
  },
  {
    name:          'Elizabeth Blanco',
    category:      'Photography',
    status:        'Researching',
    contact_name:  'Elizabeth Blanco',
    contact_email: 'e@eblancophoto.com',
    contact_phone: '708-567-7048',
    website:       'https://eblancophoto.com',
    pricing:       '$1,200 engagement only',
    notes:         'ENGAGEMENT/PORTRAIT ONLY — not wedding packages',
    source:        'gmail',
  },

  /* ── Videography ──────────────────────────────────────────────────────── */
  {
    name:          'By The Gatewoods',
    category:      'Videography',
    status:        'Contacted',
    contact_name:  'Brooks & Angie Gatewood',
    contact_email: 'brooks@bythegatewoods.com',
    website:       'https://www.bythegatewoods.com',
    pricing:       'Documentary $5,800 / Highlight $7,500 / Combo $9,800 / All-Inclusive $13,000',
    packages:      '2 videographers, aerial, pro audio. Add-ons: extra hrs $600/hr, rehearsal $1,900, story session $1,500, video booth $1,500',
    source:        'gmail',
  },
  {
    name:          'The Hansons',
    category:      'Videography',
    status:        'Contacted',
    contact_name:  'Caroline & Noah (via Mali)',
    contact_email: 'hello@bythehansons.com',
    website:       'https://www.bythehansons.com',
    pricing:       'Starting at $7,000',
    packages:      '4K digital + Super8 film + 90s Dad Cam footage',
    source:        'gmail',
  },
  {
    name:          'Young Plant Weddings',
    category:      'Videography',
    status:        'Contacted',
    contact_name:  'Jason & Sharlene (via HoneyBook)',
    website:       'https://www.youngplantweddings.com',
    pricing:       'Custom packages (Canva link)',
    notes:         'Photo+video team. Also offer free planning tool (The Planning Room)',
    source:        'gmail',
  },

  /* ── Cake ─────────────────────────────────────────────────────────────── */
  {
    name:          'New June Bakery',
    category:      'Cake',
    status:        'Contacted',
    contact_name:  'Libby Collins',
    contact_email: 'libby@new-june.com',
    contact_phone: '215-346-6186',
    website:       'https://new-june.com',
    pricing:       '10" cake from $365+tax / 2-tier from $508+tax / $1,200 delivery min / $350 delivery fee',
    notes:         'Books 90 days out. No fresh flowers. Cupcake sampler tasting available',
    source:        'gmail',
  },

  /* ── Existing / manually tracked ─────────────────────────────────────── */
  {
    name:          'Salt Florist',
    category:      'Florist',
    status:        'Booked',
    contact_name:  'Megan Kyle',
    contact_email: 'meg.saltfloral@gmail.com',
    contact_phone: '(215) 490-2276',
    instagram:     '@saltfloral',
    source:        'manual',
  },
  {
    name:          'Air Hair & Makeup',
    category:      'Hair & Makeup',
    status:        'Booked',
    contact_name:  'Sofiia Kozhushko',
    contact_email: 'airhairandmakeup@gmail.com',
    instagram:     '@airhairandmakeup',
    source:        'manual',
  },
  {
    name:          'Classic Photobooth',
    category:      'Photobooth',
    status:        'Contacted',
    contact_name:  'Max',
    website:       'classicphotobooth.net',
    source:        'manual',
  },
  {
    name:          'Parque at Ridley Creek',
    category:      'Venue',
    status:        'Booked',
    notes:         '1023 Sycamore Mills Rd, Media PA 19073',
    source:        'manual',
  },
]

/**
 * Inserts all vendors for the given user, skipping any whose name already exists.
 * Returns { inserted, skipped } counts.
 */
export async function seedVendors(supabase, userId) {
  /* Fetch existing vendor names for this user to avoid duplicates */
  const { data: existing, error: fetchError } = await supabase
    .from('vendors')
    .select('name')
    .eq('user_id', userId)

  if (fetchError) throw fetchError

  const existingNames = new Set((existing ?? []).map(v => v.name))

  const toInsert = VENDORS
    .filter(v => !existingNames.has(v.name))
    .map(v => ({ ...v, user_id: userId }))

  if (toInsert.length === 0) {
    console.log('seedVendors: all vendors already exist, nothing to insert.')
    return { inserted: 0, skipped: VENDORS.length }
  }

  const { data, error } = await supabase
    .from('vendors')
    .insert(toInsert)
    .select('name')

  if (error) throw error

  console.log(`seedVendors: inserted ${data.length}, skipped ${VENDORS.length - data.length}`)
  return { inserted: data.length, skipped: VENDORS.length - data.length }
}
