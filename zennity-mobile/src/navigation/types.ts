import { ContentType } from '@models/Content';

export type RootTabParamList = {
  Feed: undefined;
  Cards: undefined;
  Offers: undefined;
  Tracker: undefined;
  Profile: undefined;
  Admin: undefined;
};

export type RootStackParamList = {
  MainTabs: undefined;
  CardDetail: { cardId: string };
  StackingCalculator: undefined;
  AdminStack: undefined;
};

export type AdminStackParamList = {
  AdminDashboard: undefined;
  ContentList: { type?: ContentType };
  ContentEditor: {
    mode: 'create' | 'edit';
    contentId?: string;
    type?: ContentType;
  };
};
