

export const generatePaginationNumbers = (currentPage:number,totalPages:number) => {
    // Si el total de paginas es menos o igual a 7 ,mostraremos todas las paginas sin puntos suspensivos
    if(totalPages<=7){
        return Array.from({length:totalPages},(_,indice)=> indice + 1)   // Regresamos [1,2,3,4,5,6,7]
    }
    // Si la pagina actual (currentPage) esta en entre los primeros 3 ,mostramos 1,2,3, ... , penultima pagina y ultima pagina
    if(currentPage <= 4){
        return [1,2,3,4,'...',totalPages-1,totalPages]
    }

    // Si la pagina actual esta en entre las ultimas 3 paginas 
    // mostramos las primeras dos paginas ,puntos suspensivos y las ultimas 3 paginas
    if(currentPage>= totalPages -3){
        return [1,2,'...',totalPages-3,totalPages-2,totalPages-1,totalPages]
    }

    // Si la pagina actual esta en un lugar medio mostrar la primera pagina pagina actual y vecinos y la ultima pagina
    return [1,'...',currentPage-1,currentPage,currentPage+1,'...',totalPages]
};
