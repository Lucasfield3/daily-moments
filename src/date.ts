export function convertDate(isoString){
    return new Date(isoString).toLocaleDateString('en-US', {
        month:'short', year:'numeric', day:'numeric'
    }
    )
}
