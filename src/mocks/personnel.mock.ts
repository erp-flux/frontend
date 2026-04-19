import type { PersonnelMember, HRRequest } from '../models/personnel.interface';

export const GRADES = [
  'N1 — Opérateur / Manœuvre',
  'N2 — Opérateur qualifié',
  'N3 — Technicien',
  'N4 — Technicien senior',
  'N5 — Agent de maîtrise',
  'N6 — Chef d\'équipe',
  'N7 — Cadre junior',
  'N8 — Cadre',
  'N9 — Cadre senior',
  'N10 — Directeur adjoint',
  'N11 — Directeur',
  'N12 — Directeur Général'
];

export const POSTES = [
  'Directeur Général', 'Directeur des Opérations', 'Chef de Terminal', 'Loading Master',
  'Shore Officer', 'Opérateur Dépôt', 'Tank Farm Attendant', 'Jetty Man',
  'Responsable QSE', 'Agent HSE', 'Technicien Maintenance', 'Electricien',
  'Mécanicien', 'Instrumentiste', 'Responsable Stock', 'Comptable',
  'Acheteur', 'Chauffeur citerne', 'Agent de sécurité', 'Capitaine de Port',
  'Agent Maritime', 'Chef d\'équipe'
];

export const PROFILS_FLUXAA = [
  'Opérateur Dépôt', 'Chef Exploitation', 'Loading Master', 'Shore Officer',
  'Responsable Stock', 'Responsable QSE', 'Responsable Maintenance', 'Comptable',
  'Acheteur', 'Chef de Projet', 'Capitaine de Port', 'Directeur des Opérations',
  'Directeur Général', 'Administrateur Système', 'Lecture seule'
];

export const HABILITATIONS = [
  'ISGOTT — Ship/Shore Safety', 'OPITO BOSIET / HUET', 'Travail en hauteur',
  'Espace confiné', 'Permis de feu', 'Habilitation électrique HT/BT',
  'Conduite chariots élévateurs', 'Premier secours (SST / PCTM)',
  'HAZMAT / Produits dangereux', 'API 653 — Inspection bacs',
  'Métrologie / Jaugeage', 'Loading Master certifié', 'ISPS — Sécurité maritime'
];

export const DEPARTEMENTS = [
  'Direction Générale', 'Exploitation — Jetée', 'Exploitation — Dépôt',
  'Maintenace & Technique', 'QSE', 'Finance & Comptabilité',
  'Logistique & Stock', 'Ressources Humaines', 'Commercial', 'Informatique'
];

export const SITES = [
  'Lomé — Terminal côtier', 'Dakar — Dépôt', 'Abidjan — Port', 'Conakry — Terminal'
];

export const MOCK_PERSONNEL: PersonnelMember[] = [
  {
    id: '1',
    matricule: 'EMP-00001',
    nom: 'AGBE',
    prenom: 'Koffi Amédé',
    genre: 'Masculin',
    dateNaissance: '1985-03-15',
    lieuNaissance: 'Lomé',
    nationalite: 'Togolaise',
    situationMatrimoniale: 'Marié(e)',
    enfantsACharge: 3,
    groupeSanguin: 'O+',
    typePieceIdentite: 'Carte d\'Identité',
    numeroPieceIdentite: 'TG-123456789',
    dateExpirationPiece: '2028-10-10',
    numeroCNSS: 'CNSS-001234',
    adresseComplete: 'Quartier Agoè, Lomé, Togo',
    telephoneMobile: '+228 90 11 22 33',
    emailPersonnel: 'koffi.agbe@gmail.com',
    emailProfessionnel: 'koffi.agbe@fluxaa.io',
    contactUrgence: {
      nomPrenom: 'Afiwa Agbe',
      lienParente: 'Epouse',
      telephone: '+228 91 22 33 44'
    },
    intitulePoste: 'Loading Master',
    departement: 'Exploitation — Jetée',
    uniteOperationnelle: 'Operations Maritimes',
    siteTravail: 'Lomé — Terminal côtier',
    grade: 'N6 — Chef d\'équipe',
    typeContrat: 'CDI',
    regimeTravail: '3x8 — Rotation 3 quarts',
    responsableN1: 'Directeur des Opérations',
    dateEmbauche: '2020-06-01',
    salaireBrutMensuel: 850000,
    monnaie: 'XOF',
    modePaiementSalaire: 'Virement',
    frequencePaiement: 'Mensuelle',
    profilFluxaa: 'Loading Master — dossiers navires',
    habilitationsSpecifiques: ['ISGOTT — Ship/Shore Safety', 'Métrologie / Jaugeage'],
    modulesActifs: ['Operations', 'Stock'],
    banque: 'Ecobank',
    numeroCompte: 'TG53-EBC-0000-1234',
    statutAgent: 'Actif',
    statutAccesSys: 'Actif — accès complets'
  },
  {
    id: '2',
    matricule: 'EMP-00002',
    nom: 'DIALLO',
    prenom: 'Fatoumata',
    genre: 'Féminin',
    dateNaissance: '1990-07-22',
    lieuNaissance: 'Conakry',
    nationalite: 'Guinéenne',
    situationMatrimoniale: 'Célibataire',
    enfantsACharge: 0,
    groupeSanguin: 'A-',
    typePieceIdentite: 'Passeport',
    numeroPieceIdentite: 'GN-987654321',
    dateExpirationPiece: '2030-05-15',
    numeroCNSS: 'CNSS-GN-005678',
    adresseComplete: 'Ratoma, Conakry, Guinée',
    telephoneMobile: '+224 62 33 44 55',
    emailPersonnel: 'f.diallo@yahoo.fr',
    emailProfessionnel: 'fatoumata.diallo@fluxaa.io',
    contactUrgence: {
      nomPrenom: 'Alpha Diallo',
      lienParente: 'Frère',
      telephone: '+224 65 00 11 22'
    },
    intitulePoste: 'Responsable QSE',
    departement: 'QSE',
    uniteOperationnelle: 'SMI & PTW',
    siteTravail: 'Conakry — Terminal',
    grade: 'N8 — Cadre',
    typeContrat: 'CDI',
    regimeTravail: '5j/7 — Standard',
    responsableN1: 'Directeur Général',
    dateEmbauche: '2022-03-15',
    salaireBrutMensuel: 1200000,
    monnaie: 'GNF',
    modePaiementSalaire: 'Virement',
    frequencePaiement: 'Mensuelle',
    profilFluxaa: 'Responsable QSE — SMI & PTW',
    habilitationsSpecifiques: ['HAZMAT / Produits dangereux'],
    modulesActifs: ['QSE', 'Audit'],
    banque: 'SGBG',
    numeroCompte: 'GN-XX-0000-9876',
    statutAgent: 'Actif',
    statutAccesSys: 'Actif — accès complets',
    notes: 'Certif. ISGOTT renouvelée 03/2025'
  },
  {
    id: '3',
    matricule: 'EMP-00003',
    nom: 'SAGNA',
    prenom: 'Mamadou',
    genre: 'Masculin',
    dateNaissance: '1995-11-08',
    lieuNaissance: 'Dakar',
    nationalite: 'Sénégalaise',
    situationMatrimoniale: 'Marié(e)',
    enfantsACharge: 1,
    groupeSanguin: 'B+',
    typePieceIdentite: 'Carte d\'Identité',
    numeroPieceIdentite: 'SN-555666777',
    dateExpirationPiece: '2027-12-20',
    numeroCNSS: 'CNSS-SN-009876',
    adresseComplete: 'Pikine, Dakar, Sénégal',
    telephoneMobile: '+221 77 88 99 00',
    emailPersonnel: 'm.sagna@outlook.com',
    emailProfessionnel: 'mamadou.sagna@fluxaa.io',
    contactUrgence: {
      nomPrenom: 'Aminata Sagna',
      lienParente: 'Epouse',
      telephone: '+221 70 12 34 56'
    },
    intitulePoste: 'Opérateur Dépôt',
    departement: 'Exploitation — Dépôt',
    uniteOperationnelle: 'Maintenance',
    siteTravail: 'Dakar — Dépôt',
    grade: 'N2 — Opérateur qualifié',
    typeContrat: 'CDD',
    regimeTravail: '3x8 — Rotation 3 quarts',
    responsableN1: 'Chef Exploitation',
    dateEmbauche: '2025-01-01',
    dateFinContrat: '2025-12-31',
    salaireBrutMensuel: 450000,
    monnaie: 'XOF',
    modePaiementSalaire: 'Virement',
    frequencePaiement: 'Mensuelle',
    profilFluxaa: 'Opérateur Dépôt — saisie jaugeages',
    habilitationsSpecifiques: ['Métrologie / Jaugeage'],
    modulesActifs: ['Stock'],
    banque: 'BOA',
    numeroCompte: 'SN-BOA-0000-4444',
    statutAgent: 'Actif',
    statutAccesSys: 'Actif — accès M1 M2',
    notes: 'CDD — éval. renouvellement 11/2025'
  }
];

export const MOCK_HR_REQUESTS: HRRequest[] = [
  {
    id: 'req1',
    referenceDemande: 'RH-2025-001',
    typeAction: 'CRÉER',
    priorite: 'HAUTE',
    dateDemande: '2025-01-15',
    demandeur: 'Directeur des Opérations',
    statusGlobal: 'CLÔTURÉ',
    dateCloture: '2025-02-01',
    matriculeConcerne: 'EMP-00001',
    nomComplet: 'AGBE Koffi',
    departement: 'Exploitation — Jetée',
    poste: 'Loading Master',
    steps: {
      demandeur: { label: 'Initiation', status: 'APPROUVÉ', date: '2025-01-15', validatorName: 'Directeur des Opérations' },
      n1: { label: 'Avis N+1', status: 'APPROUVÉ', date: '2025-01-16', validatorName: 'Directeur des Opérations' },
      rh: { label: 'Validation RH', status: 'APPROUVÉ', date: '2025-01-18', validatorName: 'Responsable RH' },
      do: { label: 'Approbation DO', status: 'APPROUVÉ', date: '2025-01-20', validatorName: 'Directeur des Opérations' },
      dg: { label: 'Approbation DG', status: 'NON REQUIS', validatorName: 'Directeur Général' },
      system: { label: 'Création Système', status: 'APPROUVÉ', date: '2025-02-01', validatorName: 'Admin Système' }
    },
    notes: 'Dossier complet — Compte créé le 01/02/2025',
    data: MOCK_PERSONNEL[0]
  },
  {
    id: 'req2',
    referenceDemande: 'RH-2025-002',
    typeAction: 'MODIFIER',
    priorite: 'STANDARD',
    dateDemande: '2025-01-20',
    demandeur: 'RH',
    statusGlobal: 'EN COURS',
    matriculeConcerne: 'EMP-00002',
    nomComplet: 'DIALLO Fatoumata',
    departement: 'QSE',
    poste: 'Responsable QSE',
    steps: {
      demandeur: { label: 'Initiation', status: 'APPROUVÉ', date: '2025-01-20', validatorName: 'RH' },
      n1: { label: 'Avis N+1', status: 'APPROUVÉ', date: '2025-01-21', validatorName: 'Directeur Général' },
      rh: { label: 'Validation RH', status: 'APPROUVÉ', date: '2025-01-22', validatorName: 'Responsable RH' },
      do: { label: 'Approbation DO', status: 'NON REQUIS' },
      dg: { label: 'Approbation DG', status: 'NON REQUIS' },
      system: { label: 'Création Système', status: 'EN ATTENTE' }
    },
    notes: 'Mise à jour email professionnel + accès M3',
    data: { emailProfessionnel: 'fatoumata.diallo@new-fluxaa.io' }
  }
];
