import {
  IonApp, IonLoading
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import EntriesPage from './page/Entries';
import LoginPage from './page/Login';
import AppTabs from './AppTabs';
import { AuthContext, useAuthInit } from './auth';
import NotFoundPage from './page/NotFound';
import RegisterPage from './page/Register';


const App: React.FC = () => {
const {loading, auth} = useAuthInit()
if(loading){
  return <IonLoading isOpen/>
}

  console.log(`rendering app with authState=${auth}`)
  return (
    <IonApp>
      <AuthContext.Provider value={auth}>
        <IonReactRouter>
          <Switch>
              <Route exact path='/login' >
                <LoginPage/>
              </Route>
              <Route exact path='/register' >
                <RegisterPage/>
              </Route>
              <Route exact path='/my/entries/:id' >
                <EntriesPage/>
              </Route>
              <Route path='/my' >
                <AppTabs/>
              </Route>
              <Redirect exact path='/' to='/my/entries'/>
              <Route>
                <NotFoundPage/>
              </Route>
          </Switch>
        </IonReactRouter>
      </AuthContext.Provider>
    </IonApp>
  );
};

export default App;
