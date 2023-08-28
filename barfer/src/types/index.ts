//clients
export type RootStackParams = {
    Home:undefined;
    InfoProduct:Product;
    Cart:undefined;
    Productos:undefined;
    Contact:undefined;
    Setting:undefined;
    Login:undefined;
    Register:undefined;
    Routes:RootStackParams;
    ActualizarPerfil:undefined;
    HomeScreen:undefined;
}

export type RootBottomParams = {
    MyTabs:RootStackParams;
    MyTabsAdmin:RootStackAdminParams;
    Login:undefined;
    Register:undefined;
}



//admin
export type RootStackAdminParams = {
    HomeAdmin:undefined;
}

export type RootBottomAdminParams = {
    MyTabsAdmin:RootStackParams;
    Login:undefined;
    Register:undefined;
}




//products
export interface Product  {
    idproducto:number,
    nombre:string;
    descripcion:string;
    precio_cincokg:number;
    precio_diezkg:number;
    img:string;
    idCategory:number;
}
