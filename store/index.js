import {createStore, applyMiddleware, compose} from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import { createWhitelistFilter } from 'redux-persist-transform-filter';
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk';
import rootReducer from '../reducers';


const persistConfig = {
    key: 'v1.3',
    storage,
    transforms: [createWhitelistFilter('setting', ['CharadeWords','MasterWordList','selected','wordList', 'firstOpen'])],
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  export default () => {
    const store = createStore(persistedReducer, {},
      compose(
        applyMiddleware(thunk)
      )
    );
  
    const persistor = persistStore(store);
  
    return { store, persistor };
  };
