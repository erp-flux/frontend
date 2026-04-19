import type { Client, WestAfricanCountry, MovementType, ActivityChannel, LegalForm } from '../models/client.interface';

export const WEST_AFRICAN_COUNTRIES: WestAfricanCountry[] = [
  'Bénin', 'Burkina Faso', 'Cap-Vert', 'Côte d\'Ivoire', 'Gambie', 'Ghana', 
  'Guinée', 'Guinée-Bissau', 'Liberia', 'Mali', 'Mauritanie', 'Niger', 
  'Nigeria', 'Sénégal', 'Sierra Leone', 'Togo'
];

export const MOVEMENT_TYPES: { code: MovementType; label: string }[] = [
  { code: 'REC-NAV', label: 'Réception navire' },
  { code: 'REC-CAM', label: 'Dépotage camion' },
  { code: 'REC-PIPE', label: 'Réception pipeline' },
  { code: 'REC-TRANS', label: 'Transfert entrant' },
  { code: 'EXP-CAM', label: 'Chargement camion' },
  { code: 'EXP-PIPE', label: 'Expédition pipeline' },
  { code: 'EXP-BAT', label: 'Chargement bateau' },
  { code: 'EXP-TRANS', label: 'Transfert sortant' },
];

export const ACTIVITY_CHANNELS: { code: ActivityChannel; label: string }[] = [
  { code: 'FUL', label: 'Fuels (carburants)' },
  { code: 'AVI', label: 'Aviation (Jet A-1)' },
  { code: 'MAR', label: 'Marine (soutes)' },
  { code: 'BIT', label: 'Bitume' },
  { code: 'LPG', label: 'GPL' },
  { code: 'LUB', label: 'Lubrifiants' },
  { code: 'COR', label: 'Corporate' },
  { code: 'DST', label: 'Distribution' },
  { code: 'SUP', label: 'Supply' },
  { code: 'REN', label: 'Renouvelables' },
  { code: 'GSV', label: 'Services' },
];

export const LEGAL_FORMS: LegalForm[] = ['SA', 'SARL', 'SAS', 'SNC', 'GIE', 'EI', 'Joint Venture', 'Autre'];

export const MOCK_CLIENTS: Client[] = [
  {
    id: '1',
    referenceFluxa: 'FLX-CLI-001',
    raisonSociale: 'Total Energy Togo',
    alphaName: 'TOTAL-TG',
    formeJuridique: 'SA',
    rccm: 'TG-LOM-2023-B-1234',
    nif: '1000123456',
    paysEnregistrement: 'Togo',
    roles: ['Client dépôt', 'Trader / Marketeur'],
    canalActivite: 'FUL',
    segmentClient: 'Major',
    responsableCompte: 'Jean Dupont',
    produitsPetroliers: ['Gasoil (GO)', 'Super/Essence'],
    adresse: 'Bvd du Mono, Lomé',
    codePostal: '01 BP 1234',
    ville: 'Lomé',
    pays: 'Togo',
    contactPersons: [
      { fonction: 'Directeur Logistique', nomPrenom: 'Marc Koffi', telephone: '+228 22 21 00 00', email: 'm.koffi@total.tg', mobile: '+228 90 01 02 03' }
    ],
    cleGL: 'A10',
    monnaie: 'XOF',
    conditionsPaiement: 'D30',
    modePaiement: 'Virement',
    limiteCredit: 50000000,
    classificationABC: 'A',
    typeMouvementPrincipal: 'REC-NAV',
    volumeHabituel: 5000,
    tonnageAnnuelEstime: 60000,
    statutPreQual: 'Validé',
    classificationLocale: 'Locale',
    scoreRisqueKYC: 15,
    documentsFournis: ['RCCM', 'NIF', 'Attestation Fiscale'],
    bankDetails: [
      { banque: 'ORABANK', iban: 'TG012 01234 012345678901 12', swift: 'ORABTGXXX', typeCompte: 'Courant', pays: 'Togo', principal: true }
    ],
    dateDemande: '2023-10-15',
    demandePar: 'Admin Fluxaa',
    departement: 'Commercial'
  },
  {
    id: '2',
    referenceFluxa: 'FLX-CLI-002',
    raisonSociale: 'Shell BF',
    alphaName: 'SHELL-BF',
    formeJuridique: 'SARL',
    rccm: 'BF-OUA-2023-B-5678',
    nif: '2000567890',
    paysEnregistrement: 'Burkina Faso',
    roles: ['Client dépôt'],
    canalActivite: 'FUL',
    segmentClient: 'International',
    responsableCompte: 'Sarah Traoré',
    produitsPetroliers: ['Gasoil 50ppm', 'Jet A-1'],
    adresse: 'Avenue de la Liberté, Ouagadougou',
    codePostal: '01 BP 5678',
    ville: 'Ouagadougou',
    pays: 'Burkina Faso',
    contactPersons: [
      { fonction: 'Responsable Opérations', nomPrenom: 'Idrissa Ouédraogo', telephone: '+226 25 30 00 00', email: 'i.ouedraogo@shell.bf', mobile: '+226 70 01 02 03' }
    ],
    cleGL: 'A25',
    monnaie: 'XOF',
    conditionsPaiement: 'D15',
    modePaiement: 'Virement',
    limiteCredit: 30000000,
    classificationABC: 'B',
    typeMouvementPrincipal: 'REC-CAM',
    volumeHabituel: 2000,
    tonnageAnnuelEstime: 24000,
    statutPreQual: 'En cours',
    classificationLocale: 'Etrangère',
    scoreRisqueKYC: 25,
    documentsFournis: ['NIF'],
    bankDetails: [
      { banque: 'BOA', iban: 'BF089 01234 012345678901 34', swift: 'BOABFXXX', typeCompte: 'Courant', pays: 'Burkina Faso', principal: true }
    ],
    dateDemande: '2023-11-20',
    demandePar: 'Admin Fluxaa',
    departement: 'Commercial'
  }
];
