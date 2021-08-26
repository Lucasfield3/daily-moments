import { IonCol, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonList, IonPage, IonThumbnail, IonTitle, IonToolbar } from "@ionic/react"
import React, { CSSProperties, useEffect, useState } from "react"
import { useAuth } from "../auth"
import { firestore } from "../firebase"
import { Entry, toEntry } from '../models'
import { add as addIcon } from 'ionicons/icons'
import { convertDate } from "../date"


const HomePage:React.FC = ()=>{
    const { userId } = useAuth()
    const [ entries, setEntries ] = useState<Entry[]>([])

    useEffect(()=>{
        const entriesRef = firestore.collection('users').doc(userId)
        .collection('entries')
        return entriesRef.orderBy('date', 'desc').limit(7)
        .onSnapshot(({docs})=> setEntries(docs.map(toEntry)))
    },[userId])

    console.log(entries)

    const myStyle = {
        display: 'flex',
        justifyContent: 'center',
        height: '74vh',
        alignItems:'center',
    } as CSSProperties

    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                <IonTitle>Home</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
               <IonList>
                   {entries.map((entry)=>
                    <IonItem 
                    button 
                    key={entry.id}
                    routerLink={`/my/entries/view/${entry.id}`}
                    >
                        <IonThumbnail slot='end'>
                            <IonImg src={entry.pictureUrl}/>;
                        </IonThumbnail>
                    <IonLabel>
                        <h2>{convertDate(entry.date)}</h2>
                        <h3>{entry.title}</h3>
                    </IonLabel>
                    </IonItem>
                   )
                   }
               </IonList>
               { entries.length === 0 && <IonCol style={myStyle}><IonLabel color='medium'>Empty</IonLabel></IonCol> }
               <IonFab vertical='bottom' horizontal='end'>
                   <IonFabButton routerLink='/my/add-entries' color='primary'>
                       <IonIcon icon={addIcon}/>
                   </IonFabButton>
               </IonFab>
            </IonContent>
        </IonPage>
    )

}


export default HomePage