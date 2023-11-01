import { useContext } from 'react';

import { MobXProviderContext } from 'mobx-react';

import type RootStore from './RootStore';

const useStores = () =>
  useContext(MobXProviderContext) as ReturnType<RootStore['getStores']>;

export default useStores;
