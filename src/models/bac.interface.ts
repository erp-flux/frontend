export interface Bac {
  id: string;
  tankId: string;
  description: string;
  localisation: string;
  statut: string;
  usage: string;
  typeBac: string;
  toit: string;
  produitCourant: string;
  // Etape 2: Dimensions & Capacités
  capaciteNominale: number;
  capaciteOperationnelle: number;
  volumeMinGaranti: number;
  volumeSecurite: number;
  diametre: number;
  hauteurTotale: number;
  hauteurReference: number;
  poidsToit: number;
  hauteurFlottante: number;
  uniteJaugeage: string;
  temperatureReference: number;
  pressionBac: string;
  // Etape 3: Systèmes de mesure & jaugeage
  systemeMesure: string;
  typeJaugeage: string;
  methodeJaugeage: string;
  idControlProcess: string;
  reconciliationAuto: string;
  stockComingle: string;
  slipTubeBas: number;
  slipTubeHaut: number;
  // Etape 4: Volumes opérationnels & débits
  volumeNonPompable: number;
  volumeDecharge: number;
  volumePipeline: number;
  dechargeMaximale: number;
  alerteStockBas: number;
  tauxRemplissageMax: number;
  dureeAlerteNiveauHaut: number;
  alertesActives: string;
  // Etape 5: Historique & Maintenance
  dateInstallation: string;
  dateDernierNettoyage: string;
  dateProchaineInspection: string;
  produitPrecedent: string;
  remarques: string;
  // Les autres champs seront ajoutés ultérieurement
}
