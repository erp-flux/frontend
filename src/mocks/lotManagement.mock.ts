export interface LotManagement {
  id: string;
  label: string;
}

export const MOCK_LOT_MANAGEMENTS: LotManagement[] = [
  { id: '0', label: 'Sans gestion par lot' },
  { id: '1', label: 'Lot entrant' },
  { id: '2', label: 'Lot manuel' },
  { id: '3', label: 'Lot date fabrication' },
];
