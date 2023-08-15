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
    Login:undefined;
    Register:undefined;
}




export type Product = {
    idproducto:number,
    nombre:string;
    descripcion:string;
    precio_cincokg:number;
    precio_diezkg:number;
    img:string;
    idCategory:number;
}
