-- Equipment categories from the old /equipment_resale.html page (typos corrected).
-- TODO(owner): review descriptions / Arabic names before the Arabic phase.
insert into public.categories (slug, name_en, sort) values
  ('asphalt-concrete-plants', 'Asphalt Concrete Plant', 10),
  ('compressors',             'Compressors',            20),
  ('concrete-pumps',          'Concrete Pumps',         30),
  ('crane-barges',            'Crane Barges',           40),
  ('cranes',                  'Cranes',                 50),
  ('dozers',                  'Dozers',                 60),
  ('generators',              'Generators',             70),
  ('hydraulic-excavators',    'Hydraulic Excavators',   80),
  ('piling-rigs',             'Piling Rigs',            90),
  ('road-pavers',             'Road Pavers',           100),
  ('road-rollers',            'Road Rollers',          110),
  ('tower-cranes',            'Tower Cranes',          120),
  ('vibratory-compactors',    'Vibratory Compactors',  130),
  ('welding-machines',        'Welding Machines',      140),
  ('wheel-loaders',           'Wheel Loaders',         150)
on conflict (slug) do nothing;
