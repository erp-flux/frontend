export interface EngagementMethod {
  id: string;
  label: string;
}

export const MOCK_ENGAGEMENT_METHODS: EngagementMethod[] = [
  { id: '1', label: 'Date ordre' },
  { id: '2', label: 'Date planifiée' },
  { id: '3', label: 'Date promesse' },
];
