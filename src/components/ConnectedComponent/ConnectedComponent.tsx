import React from 'react';
import { observer } from 'mobx-react';

import { StoreContext } from 'stores/StoreRoot';

export class ConnectedComponent<Props = any> extends React.Component<Props> {
  static observer = observer;
  static context: React.ContextType<typeof StoreContext>;
  static contextType = StoreContext;
}
