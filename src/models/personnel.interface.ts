export type Gender = 'Masculin' | 'Féminin' | 'Autre';
export type MaritalStatus = 'Célibataire' | 'Marié(e)' | 'Divorcé(e)' | 'Veuf(ve)';
export type ContractType = 'CDI' | 'CDD' | 'Stage' | 'Prestataire' | 'Interim';
export type WorkRegime = '5j/7 — Standard' | '3x8 — Rotation 3 quarts' | '2x8' | 'Week-end' | 'Autre';
export type RequestPriority = 'STANDARD' | 'HAUTE' | 'URGENTE';
export type RequestStatus = 'EN COURS' | 'CLÔTURÉ' | 'ANNULÉ' | 'REJETÉ';
export type WorkflowStepStatus = 'EN ATTENTE' | 'APPROUVÉ' | 'REJETÉ' | 'RENVOYÉ' | 'NON REQUIS';

export interface WorkflowStep {
  label: string;
  validatorName?: string;
  validatorRole?: string;
  decision?: 'APPROUVÉ' | 'REJETÉ' | 'RENVOYÉ' | 'NON REQUIS';
  date?: string;
  comments?: string;
  status: WorkflowStepStatus;
  signature?: string;
}

export interface PersonnelMember {
  id: string;
  matricule: string;
  
  // A. Identité Civile
  nom: string;
  prenom: string;
  deuxiemePrenom?: string;
  nomUsage?: string;
  genre: Gender;
  dateNaissance: string;
  lieuNaissance: string;
  nationalite: string;
  situationMatrimoniale: MaritalStatus;
  enfantsACharge: number;
  groupeSanguin: string;
  typePieceIdentite: string;
  numeroPieceIdentite: string;
  dateExpirationPiece: string;
  numeroCNSS: string;
  nif?: string;
  adresseComplete: string;

  // B. Contacts
  telephoneMobile: string;
  telephoneSecondaire?: string;
  emailPersonnel: string;
  emailProfessionnel: string;
  contactUrgence: {
    nomPrenom: string;
    lienParente: string;
    telephone: string;
    telephoneSecondaire?: string;
  };

  // C. Poste & Contrat
  intitulePoste: string;
  departement: string;
  uniteOperationnelle: string;
  siteTravail: string;
  grade: string; // N1 to N12
  typeContrat: ContractType;
  regimeTravail: WorkRegime;
  responsableN1: string;
  dateEmbauche: string;
  dateFinContrat?: string;
  dureePeriodeEssai?: string;
  tempsTravail?: string;

  // D. Rémunération
  salaireBrutMensuel: number;
  monnaie: string;
  modePaiementSalaire: string;
  frequencePaiement: string;
  indemniteTransport?: number;
  primes?: {
    risque?: number;
    quart?: number;
    logement?: boolean;
    vehicule?: boolean;
    assuranceMaladie?: boolean;
  };

  // E. Accès & Habilitations
  profilFluxaa: string;
  niveauApprobation?: string;
  badgeAcces?: string;
  habilitationISPS?: boolean;
  habilitationsSpecifiques: string[]; // ISGOTT, PTW, etc.
  modulesActifs: string[];

  // F. Banque
  banque: string;
  numeroCompte: string;
  codeSwift?: string;

  // G. Statut & Notes
  statutAgent: 'Actif' | 'Suspendu' | 'Congé' | 'Départ';
  statutAccesSys: string;
  notes?: string;
}

export interface HRRequest {
  id: string;
  referenceDemande: string;
  typeAction: 'CRÉER' | 'MODIFIER' | 'SUSPENDRE' | 'RÉINTÉGRER' | 'DÉPART';
  priorite: RequestPriority;
  dateDemande: string;
  demandeur: string;
  statusGlobal: RequestStatus;
  dateCloture?: string;
  matriculeConcerne: string; // EMP-NEW or existing
  nomComplet: string;
  departement: string;
  poste: string;
  
  // Le workflow complet (Sections H)
  steps: {
    demandeur: WorkflowStep;
    n1: WorkflowStep;
    rh: WorkflowStep;
    do: WorkflowStep; // Direction des Opérations
    dg: WorkflowStep; // Direction Générale
    system: WorkflowStep; // Admin Système
  };
  
  notes?: string;
  data: Partial<PersonnelMember>; // Les données de la demande
}
