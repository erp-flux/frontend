export interface Product {
  id: string;
  // Etape 1: Identification de l'article
  codeArticle: string;
  description: string;
  referenceFabricant: string;
  typeStockage: string;
  codeGL: string;
  typeLigne: string;
  indicateur: string;
  groupePrix: number;

  typeArticle?: string;
  actionCode?: string;
  stockSecurite?: number;
  uniteMesureBase?: string;

  // Etape 2: Unités de mesure
  uomPrimaire: string;
  uomSecondaire: string;
  uomAchat: string;
  uomPrix: string;
  uomExpedition: string;
  uomPoids: string;
  uomVolume: string;
  conversionStandardUom: boolean;

  // Etape 3: Paramètres de gestion des stocks
  backorders: string;
  numeroSerieRequis: string;
  verificationDisponibilite: string;
  codeStatutLot: string;
  dureeVieJours: number;
  methodeLot: string;
  codeABC: string;
  methodeEngagement: string;
  numeroPlanificateur: string;
  numeroAcheteur: string;
  niveauCoutInventaire: string;
  messageFlash: string;

  // Etape 4: Tarification & Codes Catégories
  categorie: string;
  coutStandard: number;
  prixStandard: number;
  groupePrixClient: string;
  niveauPrixVente: string;
  methodePrixAchat: string;
  groupeReapprovisionnement: string;
  messageImpression: string;
  messageCommande: string;
  groupeDispatch: string;
  remarques: string;
}

