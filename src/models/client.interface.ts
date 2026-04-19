export type LegalForm = 'SA' | 'SARL' | 'SAS' | 'SNC' | 'GIE' | 'EI' | 'Joint Venture' | 'Autre';

export type ActivityChannel = 'FUL' | 'AVI' | 'MAR' | 'BIT' | 'LPG' | 'LUB' | 'COR' | 'DST' | 'SUP' | 'REN' | 'GSV';

export type MovementType = 'REC-NAV' | 'REC-CAM' | 'REC-PIPE' | 'REC-TRANS' | 'EXP-CAM' | 'EXP-PIPE' | 'EXP-BAT' | 'EXP-TRANS';

export type WestAfricanCountry = 
  | 'Bénin' | 'Burkina Faso' | 'Cap-Vert' | 'Côte d\'Ivoire' | 'Gambie' | 'Ghana' 
  | 'Guinée' | 'Guinée-Bissau' | 'Liberia' | 'Mali' | 'Mauritanie' | 'Niger' 
  | 'Nigeria' | 'Sénégal' | 'Sierra Leone' | 'Togo';

export interface ContactPerson {
  fonction: string;
  nomPrenom: string;
  telephone: string;
  email: string;
  mobile: string;
  remarque?: string;
}

export interface BankDetail {
  banque: string;
  iban: string;
  swift: string;
  typeCompte: string;
  pays: string;
  principal: boolean;
}

export interface Client {
  id: string;
  referenceFluxa: string;
  
  // 1. Identité
  raisonSociale: string;
  alphaName: string;
  nomCommercial?: string;
  formeJuridique: LegalForm;
  rccm: string;
  nif: string;
  paysEnregistrement: string;
  parentCompany?: string;

  // 2. Rôles & Types
  roles: string[];
  canalActivite: ActivityChannel;
  segmentClient: string;
  responsableCompte: string;
  produitsPetroliers: string[];

  // 3. Adresse & Contacts
  adresse: string;
  codePostal: string;
  ville: string;
  pays: WestAfricanCountry;
  etat?: string;
  website?: string;
  contactPersons: ContactPerson[];

  // 4. Finance & Comptable
  cleGL: string;
  monnaie: string;
  conditionsPaiement: string;
  modePaiement: string;
  limiteCredit: number;
  niveauControleCredit?: string;
  garantieFournie?: string;
  classificationABC: 'A' | 'B' | 'C';

  // 5. Opérations Dépôt
  typeMouvementPrincipal: MovementType;
  bacsStockage?: string;
  volumeHabituel: number;
  tonnageAnnuelEstime: number;
  traderRef?: string;
  regionCommerciale?: string;

  // 6. Conformité & KYC
  statutPreQual: string;
  classificationLocale: string;
  scoreRisqueKYC: number;
  dateDernierKYC?: string;
  documentsFournis: string[];

  // 7. Bancaire
  bankDetails: BankDetail[];

  // 8. Traçabilité
  dateDemande: string;
  demandePar: string;
  departement: string;
  validePar?: string;
  dateAutorisation?: string;
}
