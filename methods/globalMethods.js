

export const timestampToString  = (UNIX_timestamp , withHoure ) => {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();

    if(hour<10) hour = '0'+hour;
    if(min<10) min = '0'+min;
    if(sec<10) min = '0'+sec;
    if(withHoure==1) { var timeString = date + ' ' + month + ' ' + year + ' : '+hour+'h'+min  ; }
    else { var timeString = date + ' ' + month + ' ' + year + ' ' ; }
    return timeString;
}


