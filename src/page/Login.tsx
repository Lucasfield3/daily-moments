import { IonBackButton,  IonButton,  IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonLoading, IonPage, IonText, IonTitle, IonToolbar } from "@ionic/react"
import React, { useState } from "react"
import { Redirect } from "react-router"
import { useAuth } from "../auth"
import { auth } from '../firebase'

const LoginPage:React.FC = ()=>{
    const { loggedIn } = useAuth()

    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ status, setStatus ] = useState({loading: false, error:false})
    const [ errorMessage, setErrorMessage ] = useState<{}>()
    const handleLogin = async ()=>{
        try{
            setStatus({loading:true, error:false})
            const credential = await auth.signInWithEmailAndPassword(email, password)
            console.log('credential: ', credential)
        } catch(error){
            console.log('error message:', error.message)
            setStatus({loading:false, error:true})
            return setErrorMessage(<IonText color='danger'>{error.message}</IonText>)
        }
    }

    if(loggedIn){
        return <Redirect to='/my/entries' />
    }

    return(
        <IonPage> 
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot='start'>
                        <IonBackButton/>
                    </IonButtons>
                <IonTitle>Login</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonList>
                    <IonItem>
                        <IonLabel position='stacked'>Email:</IonLabel>
                        <IonInput value={email} onIonChange={(e)=> setEmail(e.detail.value)} type='email'/>
                    </IonItem>
                    <IonItem>
                        <IonLabel position='stacked'>Password:</IonLabel>
                        <IonInput value={password} onIonChange={(e)=> setPassword(e.detail.value)} type='password'/>
                    </IonItem>
                </IonList>
                {status.error && errorMessage}
                <IonButton onClick={handleLogin} expand='block'>Login</IonButton>
                <IonButton routerLink='/register' fill='clear'  expand='block'>Don't have an account?</IonButton>
                <IonLoading isOpen={status.loading}/>
            </IonContent>
        </IonPage>
    )

}


export default LoginPage