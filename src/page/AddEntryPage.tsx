import React, { useEffect, useRef, useState } from "react"
import { IonButton, IonContent, IonDatetime, IonHeader, IonInput, IonItem, IonLabel, IonList, IonLoading, IonPage, IonTextarea, IonTitle, IonToolbar, isPlatform } from "@ionic/react"
import { firestore, storage } from "../firebase"
import { useAuth } from "../auth"
import { useHistory } from "react-router"
import { CameraResultType, CameraSource, Plugins } from '@capacitor/core'

const { Camera } = Plugins 
async function savePicture(blobUrl, userId){
    const pictureRef = storage.ref(`/users/${userId}/pictures/${Date.now()}`)
    const response = await fetch(blobUrl)
    const blob = await response.blob()
    const snapshot = await pictureRef.put(blob)
    const url = await snapshot.ref.getDownloadURL()
    console.log('saved picture', url)
    return url
}


const AddEntryPage:React.FC = ()=>{
    const { userId } = useAuth()
    const history = useHistory()
    const [ title, setTitle ] = useState('')
    const [ description, setDescription ] = useState('')
    const [ date, setDate ] = useState('')
    const [ pictureUrl, setPictureUrl ] = useState('assets/placeholder.png')
    const fileRef = useRef<HTMLInputElement>()
    useEffect(()=> ()=> {
        if(pictureUrl.startsWith('blob:')){
            URL.revokeObjectURL(pictureUrl)
            console.log('revoked: ', pictureUrl)
        }
    },[pictureUrl])

    const handleSave = async ()=> {
        const entriesRef = firestore.collection('users').doc(userId)
        .collection('entries')
        const entryData = {date, title, pictureUrl, description }
        if(!pictureUrl.startsWith('/assets')){
            entryData.pictureUrl = await savePicture(pictureUrl, userId)
        }
        const entryRef = await entriesRef.add(entryData)
        console.log('saved:', entryRef.id)
        
        if(entryRef){
            return history.goBack()
        }else{
            return <IonLoading isOpen/>
        }
        
    }

    const handleFileChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
        if(event.target.files.length > 0){
            const file = event.target.files.item(0)
            const pictureUrl = URL.createObjectURL(file)
            setPictureUrl(pictureUrl)
        }
    }

    const handlePictureClick = async ()=>{
        if(isPlatform('capacitor')){
            try{
                const photo = await Camera.getPhoto({
                      resultType: CameraResultType.Uri,
                      source: CameraSource.Prompt,
                      width: 600
                  })
                  //console.log('photo:', photo.webPath)
                  setPictureUrl(photo.webPath)
            }catch(error){
                console.log('Camera error:', error)
            }
        }else{
            fileRef.current.click()
        }
      
    }

    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                <IonTitle>Add antry</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonList>
                    <IonItem>
                        <IonLabel position='stacked'>Date</IonLabel>
                        <IonDatetime value={date} onIonChange={(e)=> setDate(e.detail.value)} />
                    </IonItem>
                    <IonItem>
                        <IonLabel position='stacked'>Title</IonLabel>
                        <IonInput value={title} onIonChange={(e)=> setTitle(e.detail.value)} />
                    </IonItem>
                    <IonItem>
                        <IonLabel position='stacked'>Picture</IonLabel><br/>
                        <input type='file' accept='image/*' 
                        onChange={handleFileChange}
                        ref={fileRef}
                        hidden
                        />
                        <img  style={{cursor:'pointer'}} alt='placeholder' onClick={handlePictureClick} src={pictureUrl}/>
                    </IonItem>
                    <IonItem>
                        <IonLabel position='stacked'>Description</IonLabel>
                        <IonTextarea value={description} onIonChange={(e)=> setDescription(e.detail.value)}/>
                    </IonItem>
                </IonList>
                <IonButton expand='block' color='primary' onClick={handleSave}>Save</IonButton>
            </IonContent>
        </IonPage>
    )

}

export default AddEntryPage
