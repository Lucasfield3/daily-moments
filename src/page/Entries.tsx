import {  IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from "@ionic/react"
import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import { useAuth } from "../auth"
import { firestore } from '../firebase'
import { Entry, toEntry } from '../models'
import { trash as trashIcon } from 'ionicons/icons'
import { convertDate } from "../date"

interface RouterParams{
    id:string
}

const EntriesPage:React.FC = ()=>{
    const { userId } = useAuth()
    const { id } = useParams<RouterParams>()
    const [ entry, setEntry ] = useState<Entry>()
    const history = useHistory()
    useEffect(()=>{
        const entryRef = firestore.collection('users').doc(userId)
        .collection('entries').doc(id)
        entryRef.get().then((doc)=> setEntry(toEntry(doc)))

    },[userId, id])

    const handleDelete = async() =>{
        const entryRef = firestore.collection('users').doc(userId)
        .collection('entries').doc(id)
        await entryRef.delete()
        history.goBack()
    }

    return(
        <IonPage> 
            <IonHeader>
                <IonToolbar>
                   <IonButtons slot='start'>
                       <IonBackButton />
                   </IonButtons>
                <IonTitle>{convertDate(entry?.date)}</IonTitle>
                <IonButtons slot='end'>
                    <IonButton onClick={handleDelete}>
                        <IonIcon color='danger' slot='icon-only' icon={trashIcon} />
                    </IonButton>
                </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <h1>{entry?.title}</h1>
                <img src={entry?.pictureUrl} alt={entry?.title} />
                <p>{entry?.description}</p>
            </IonContent>
        </IonPage>
    )

}


export default EntriesPage