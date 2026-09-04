export interface CarModelItem {
  name: string;
  years: string;
  series?: string;
  slug?: string;
}

export interface BrandCatalogItem {
  brand: string;
  slug: string;
  country: string;
  group: string;
  models: CarModelItem[];
}

export const VEHICLE_CATALOG: BrandCatalogItem[] = [
  {
    brand: 'Opel',
    slug: 'Opel',
    country: 'Almanya',
    group: 'Stellantis / GM Mirası',
    models: [
      { name: 'Astra F', years: '1991 - 1998' },
      { name: 'Astra G', years: '1998 - 2009' },
      { name: 'Astra H', years: '2004 - 2014' },
      { name: 'Astra J', years: '2009 - 2018' },
      { name: 'Astra K', years: '2015 - 2021' },
      { name: 'Astra L', years: '2021+' },
      { name: 'Corsa B', years: '1993 - 2000' },
      { name: 'Corsa C', years: '2000 - 2006' },
      { name: 'Corsa D', years: '2006 - 2014' },
      { name: 'Corsa E', years: '2014 - 2019' },
      { name: 'Corsa F', years: '2019+' },
      { name: 'Insignia A', years: '2008 - 2017' },
      { name: 'Insignia B', years: '2017+' },
      { name: 'Vectra A', years: '1988 - 1995' },
      { name: 'Vectra B', years: '1995 - 2002' },
      { name: 'Vectra C', years: '2002 - 2008' },
      { name: 'Combo C', years: '2001 - 2011' },
      { name: 'Combo D', years: '2011 - 2018' },
      { name: 'Combo E', years: '2018+' },
      { name: 'Mokka / Mokka X', years: '2012 - 2019' },
      { name: 'Mokka B', years: '2020+' },
      { name: 'Crossland / X', years: '2017+' },
      { name: 'Grandland / X', years: '2017+' },
      { name: 'Zafira A', years: '1999 - 2005' },
      { name: 'Zafira B', years: '2005 - 2014' },
      { name: 'Zafira C Tourer', years: '2011 - 2019' },
      { name: 'Zafira Life', years: '2019+' },
      { name: 'Meriva A', years: '2003 - 2010' },
      { name: 'Meriva B', years: '2010 - 2017' },
      { name: 'Antara', years: '2006 - 2015' },
      { name: 'Tigra A', years: '1994 - 2001' },
      { name: 'Tigra Twintop', years: '2004 - 2009' },
      { name: 'Omega B', years: '1994 - 2003' },
      { name: 'Frontera B', years: '1998 - 2004' }
    ]
  },
  {
    brand: 'Peugeot',
    slug: 'Peugeot',
    country: 'Fransa',
    group: 'PSA Groupe',
    models: [
      { name: '206 / 206+', years: '1998 - 2013' },
      { name: '207 / 207+', years: '2006 - 2013' },
      { name: '208 I', years: '2012 - 2019' },
      { name: '208 II', years: '2019+' },
      { name: '301', years: '2012+' },
      { name: '307', years: '2001 - 2008' },
      { name: '308 I', years: '2007 - 2013' },
      { name: '308 II', years: '2013 - 2021' },
      { name: '308 III', years: '2021+' },
      { name: '406', years: '1995 - 2004' },
      { name: '407', years: '2004 - 2011' },
      { name: '508 I', years: '2010 - 2018' },
      { name: '508 II', years: '2018+' },
      { name: '2008 I', years: '2013 - 2019' },
      { name: '2008 II', years: '2019+' },
      { name: '3008 I', years: '2009 - 2016' },
      { name: '3008 II', years: '2016+' },
      { name: '5008 I', years: '2009 - 2017' },
      { name: '5008 II', years: '2017+' },
      { name: 'Partner I / II', years: '1996 - 2008' },
      { name: 'Partner Tepee', years: '2008 - 2018' },
      { name: 'Rifter', years: '2018+' },
      { name: 'Bipper / Tepee', years: '2007 - 2018' },
      { name: 'Boxer', years: '2006+' },
      { name: 'Expert / Tepee', years: '2007+' },
      { name: 'RCZ', years: '2010 - 2015' }
    ]
  },
  {
    brand: 'Citroën',
    slug: 'Citro%C3%ABn',
    country: 'Fransa',
    group: 'PSA Groupe',
    models: [
      { name: 'C3 I', years: '2002 - 2010' },
      { name: 'C3 II', years: '2009 - 2016' },
      { name: 'C3 III', years: '2016+' },
      { name: 'C3 Aircross', years: '2017+' },
      { name: 'C4 I', years: '2004 - 2010' },
      { name: 'C4 II', years: '2010 - 2018' },
      { name: 'C4 III', years: '2020+' },
      { name: 'C4 Cactus', years: '2014 - 2020' },
      { name: 'C4 Picasso / Grand', years: '2006 - 2018' },
      { name: 'C5 I / II', years: '2001 - 2008' },
      { name: 'C5 III', years: '2008 - 2017' },
      { name: 'C5 Aircross', years: '2018+' },
      { name: 'C-Elysée', years: '2012+' },
      { name: 'Berlingo I / II', years: '1996 - 2008' },
      { name: 'Berlingo Tepee', years: '2008 - 2018' },
      { name: 'Berlingo III', years: '2018+' },
      { name: 'Nemo / Kombi', years: '2007 - 2017' },
      { name: 'Jumper', years: '2006+' },
      { name: 'Jumpy', years: '2007+' },
      { name: 'Xsara / Picasso', years: '1997 - 2005' },
      { name: 'Saxo', years: '1996 - 2004' }
    ]
  },
  {
    brand: 'Chevrolet',
    slug: 'Chevrolet',
    country: 'ABD',
    group: 'General Motors (GM Platform)',
    models: [
      { name: 'Cruze 1.6 / 1.4T / 2.0D', years: '2009 - 2016' },
      { name: 'Aveo T250', years: '2006 - 2011' },
      { name: 'Aveo T300', years: '2011 - 2018' },
      { name: 'Captiva C100 (2.0 D)', years: '2006 - 2011' },
      { name: 'Captiva C140 (2.0 / 2.2 D)', years: '2011 - 2018' },
      { name: 'Trax 1.4T / 1.6', years: '2013 - 2019' },
      { name: 'Spark M200', years: '2005 - 2010' },
      { name: 'Spark M300', years: '2010 - 2015' },
      { name: 'Lacetti', years: '2004 - 2010' },
      { name: 'Kalos', years: '2002 - 2008' },
      { name: 'Epica 2.0 / 2.0 D', years: '2006 - 2011' },
      { name: 'Rezzo / Tacuma', years: '2005 - 2008' }
    ]
  },
  {
    brand: 'DS Automobiles',
    slug: 'DS%20Automobiles',
    country: 'Fransa',
    group: 'DS Luxury / Stellantis',
    models: [
      { name: 'DS 3', years: '2010 - 2019' },
      { name: 'DS 3 Crossback', years: '2019+' },
      { name: 'DS 4 I', years: '2011 - 2018' },
      { name: 'DS 4 II', years: '2021+' },
      { name: 'DS 5', years: '2011 - 2018' },
      { name: 'DS 7 Crossback', years: '2018+' },
      { name: 'DS 9', years: '2020+' }
    ]
  },
  {
    brand: 'Diğer Markalar',
    slug: 'Diger%20Markalar',
    country: 'Global',
    group: 'Diğer Araç Grupları & Ortak Platformlar',
    models: [
      { name: 'Fiat (Ducato / Doblo / Fiorino)', years: 'Tüm Yıllar' },
      { name: 'Renault (Trafic / Master / Megane)', years: 'Tüm Yıllar' },
      { name: 'Volkswagen (Golf / Polo / Passat / Caddy)', years: 'Tüm Yıllar' },
      { name: 'Audi / Seat / Skoda (TSI & TDI)', years: 'Tüm Yıllar' },
      { name: 'Ford (Transit / Focus / Courier)', years: 'Tüm Yıllar' },
      { name: 'Diğer Araçlar & Evrensel Parçalar', years: 'Tüm Yıllar' }
    ]
  }
];
