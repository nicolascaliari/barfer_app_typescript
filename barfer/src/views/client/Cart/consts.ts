export const COUNTRY = ["argentina"];

export const PROVINCE = ["GBA", "CABA"];

export const LOCATION = ["Retiro", "Palermo 1 (desde Coronel Diaz hasta Juan B. Justo)", "Palermo 2", "Recoleta", "Colegiales", "Chacarita", "Barrio Norte",
    "Nuñez", "Agronomia", "Villa Pueyrredon", "Villa Ortuzar", "Paternal", "Saavedra", "Parque Chas", "Coghlan",
    "Avellaneda", "Gerli", "Valentin Alsina", "Lanus", "Escalada", "Banfield", "Temperley",
    "Lomas de Zamora", "Adrogue", "Burzaco", "Longchamps", "Glew", "Claypole", "Jose Marmol", "Ituzaingo"
];




export const TIMETABLE_CABA = [
    {
        provincia: "CABA",
        horarios: [
            { rango: "14hs - 17hs Lunes", barrios: ["Retiro", "Barrio Norte", "Recoleta"] },
            {
                rango: "15hs - 19hs Lunes",
                barrios: ["Palermo 1 (desde Coronel Diaz hasta Juan B. Justo)"],
            },
            {
                rango: "17hs - 21hs Lunes",
                barrios: ["Palermo 2 (desde Juan B. Justo hasta Virrey del Pino)", "Colegiales", "Chacarita"],
            },
            {
                rango: "14hs - 18hs Miercoles",
                barrios: ["Devoto", "Villa del Parque", "Belgrano 1 (desde las vias al río)"],
            },
            {
                rango: "15hs - 19hs Miercoles",
                barrios: ["Nuñez", "Agronomia", "Villa Pueyrredon", "Villa Ortuzar", "Paternal"],
            },
            { rango: "16hs - 20hs Miercoles", barrios: ["Saavedra", "Parque Chas"] },
            {
                rango: "17hs - 20hs Miercoles",
                barrios: ["Coghlan", "Villa Urquiza", "Belgrano 2 (Belgrano R, desde las vias a Donado)"],
            },
            {
                rango: "14hs - 17hs Jueves",
                barrios: ["Villa Lugano", "Mataderos", "Liniers", "Parque Avellaneda"],
            },
            {
                rango: "15hs - 19hs Jueves",
                barrios: ["Flores", "Floresta", "Velez Sarsfield", "Monte Castro", "Versalles"],
            },
            { rango: "17hs - 20hs Jueves", barrios: ["Devoto", "Villa del Parque"] },
            {
                rango: "10hs - 13hs Sabados",
                barrios: ["Barracas", "La Boca", "Parque Patricios", "Nueva Pompeya", "Parque Chacabuco", "San Cristobal", "Constitucion"],
            },
            {
                rango: "10hs - 14hs Sabados",
                barrios: ["Boedo", "San Cristobal", "San Telmo", "Monserrat", "Puerto Madero", "Microcentro (hasta Av. Cordoba)", "San Nicolas (Tribunales)", "Almagro", "Caballito"],
            },
            { rango: "12hs - 16hs Sabados", barrios: ["Villa Crespo"] },
            { rango: "13hs - 17hs Sabados", barrios: ["Belgrano", "Palermo"] },
        ],
    },
];




export const TIMETABLE_GBA = [
    {
        provincia: "GBA",
        horarios: [
            { rango: "13hs - 16hs Miercoles", barrios: ["Avellaneda", "Gerli", "Valentin Alsina"] },
            {
                rango: "14hs - 17hs Lunes", barrios: ["Lanus", "Escalada", "Banfield"]
            },
            {
                rango: "16hs - 20hs Miercoles",
                barrios: ["Lomas de Zamora", "Temperley", "Adrogue", "Burzaco", "Jose Marmol", "Rafael Calzada", "Turdera"],
            },
            {
                rango: "13hs - 17hs Lunes",
                barrios: ["Sarandi", "Villa Dominico", "Wilde"],
            },
            {
                rango: "14hs - 18hs Lunes",
                barrios: ["Bernal", "Quilmes", "Ezpeleta"],
            },
            { rango: "15hs - 19hs Lunes", barrios: ["Berazategui", "Villa España", "Ranelagh", "Sourigues", "Hudson"] },
            {
                rango: "14hs - 17hs Lunes Zona Noroeste",
                barrios: ["El palomar", "Caseros", "Villa Raffo", "Carlos Gardel"]
            },
            {
                rango: "14hs - 18hs Lunes Zona Noroeste",
                barrios: ["Saenz Peña", "Villa Libertad", "Martin Coronado", "Villa Bosch", "Villa Lynch"]
            },
            {
                rango: "15hs - 19hs Lunes Zona Noroeste",
                barrios: ["San Martin", "Billinghurst", "Villa Maipu"]
            },
            {
                rango: "16hs - 20hs Lunes Zona Noroeste",
                barrios: ["Villa Martelli", "Villa Ballester"]
            },
            {
                rango: "17hs - 21hs Lunes Zona Noroeste",
                barrios: ["Villa Adelina", "Munro", "Florida Oeste", "Carapachay", "Boulogne"]
            },
            {
                rango: "14hs - 17hs Martes Zona Norte",
                barrios: ["Florida", "Vicente Lopez"]
            },
            {
                rango: "15hs - 19hs Martes Zona Norte",
                barrios: ["Olivos", "La Lucila"]
            },
            {
                rango: "16hs - 20hs Martes Zona Norte",
                barrios: ["Martinez", "Acassuso", "San Isidro"]
            },
            {
                rango: "17hs - 21hs Martes Zona Norte",
                barrios: ["Beccar", "Victoria", "San Fernando", "Virreyes", "Bancalari"]
            },
            {
                rango: "10hs - 14hs Sabados Zona Oeste",
                barrios: ["Lomas del Mirador", "La Tablada"]
            },
            {
                rango: "12hs - 16hs Sabados Zona Oeste",
                barrios: ["Ramos Mejia", "Haedo", "Villa Luzuriaga", "Ciudadela", "Villa Sarmiento"]
            },
            {
                rango: "13hs - 17hs Sabados Zona Oeste",
                barrios: ["Castelar", "Ituzaingo", "Moron", "Merlo", "Padua"]
            }
        ],
    },
];