import React from 'react';

import { MobXProviderContext } from 'mobx-react';

import type OpenAIStore from './OpenAIStore';

interface Stores {
  openAI: OpenAIStore;
}

const useStores = () => React.useContext(MobXProviderContext) as Stores;

export default useStores;
