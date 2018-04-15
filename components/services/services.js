
export const serverURL = "https://www.myservice-collaboratif.com/app/";

///// loading demandes lists 
export async function loadListeDemandes(e, idUser) {
    const response = await fetch( 'https://www.myservice-collaboratif.com/app/getDemandesPrestas.php' , {
            method : 'POST', 
            headers: { Accept: "application/json"  , "Content-type" : "application/x-www-form-urlencoded; charset=UTF-8" },
            body: "user="+idUser+""
            }
        )
    return await response.json();
}
export function initListeDemandesInStore(e , idUser){
   // alert( typeof loadListeDemandes );
   
    loadListeDemandes(e , idUser).then(function(value){
        e.props.initListeDemandes(value);
    })
}
