import {
   IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs,
} from '@ionic/react';
import { home as homeIcon, settings as settingsIcon } from 'ionicons/icons';
import React from 'react';
import { Redirect, Route} from 'react-router';
import HomePage from './page/Home';
import SettingsPage from './page/Settings';
import EntriesPage from './page/Entries';
import { useAuth } from './auth';
import AddEntryPage from './page/AddEntryPage';




const AppTabs: React.FC = () => {
  const { loggedIn } = useAuth()
  if(!loggedIn){
    return <Redirect to='/login'/>
  }
  return (
        <IonTabs>
          <IonRouterOutlet>
            <Route exact={true} component={HomePage} path='/my/entries'/>
            <Route exact={true}  component={AddEntryPage} path='/my/add-entries' />
            <Route exact={true} component={EntriesPage} path='/my/entries/view/:id' />
            <Route exact={true} component={SettingsPage} path='/my/settings' />
            <Route exact path="/" render={() => <Redirect to="/my/entries" />} />
          </IonRouterOutlet>
          <IonTabBar slot='bottom'>
            <IonTabButton tab='home' href='/my/entries'>
              <IonIcon icon={homeIcon}/>
              <IonLabel>Home</IonLabel>
            </IonTabButton>
            <IonTabButton  tab='settings' href='/my/settings'>
              <IonIcon icon={settingsIcon}/>
              <IonLabel>Settings</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
  );
};

export default AppTabs;
