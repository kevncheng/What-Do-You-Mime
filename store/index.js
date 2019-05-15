import {createStore, applyMiddleware, compose} from 'redux';
import { persistStore, persistReducer, createTransform } from 'redux-persist'
import { createWhitelistFilter } from 'redux-persist-transform-filter';
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk';
import rootReducer from '../reducers';


const persistConfig = {
    key: 'v1.00',
    storage,
    transforms: [createWhitelistFilter('setting', ['CharadeWords'])],
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
