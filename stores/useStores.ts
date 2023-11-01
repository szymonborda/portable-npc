import React from 'react';

import { MobXProviderContext } from 'mobx-react';

import type RootStore from './RootStore';

const useStores = () =>
  React.useContext(MobXProviderContext) as ReturnType<RootStore['getStores']>;

export default useStores;
