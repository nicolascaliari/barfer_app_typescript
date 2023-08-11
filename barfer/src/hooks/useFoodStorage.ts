import AsyncStorage from "@react-native-async-storage/async-storage";
import { Product } from "../types";


const MY_FOOD_KEY = '@MyFood:Key';
const MY_TODAY_FOOD_KEY = '@MyTodayFood:Key';

const usefoodStorage = () => {

    const saveInfoToStorage = async (keyStorage: string, meal: Product) => {
        try {
            const currentSavedFood = await AsyncStorage.getItem(keyStorage);

            if (currentSavedFood !== null) {
                const currentSaveFoodParsed = JSON.parse(currentSavedFood);
                currentSaveFoodParsed.push(meal);

                await AsyncStorage.setItem(keyStorage, JSON.stringify(currentSaveFoodParsed));

                return Promise.resolve()
            }


            await AsyncStorage.setItem(keyStorage, JSON.stringify([meal]))
            return Promise.resolve()

        } catch (error) {
            return Promise.reject(error)
        }
    }


    const handleSaveFood = async ({ idproducto, nombre, descripcion, precio_cincokg, precio_diezkg ,img, idCategory}: Product) => {
        try {
            const result = await saveInfoToStorage(MY_FOOD_KEY, {idproducto, nombre, descripcion, precio_cincokg, precio_diezkg ,img, idCategory})
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error);
        }
    }


    const handleGetFood = async () => {
        try {
            const foods = await AsyncStorage.getItem(MY_FOOD_KEY)

            if (foods !== null) {
                const parsedFoods = JSON.parse(foods);
                return Promise.resolve(parsedFoods);
            }

        } catch (error) {
            return Promise.reject(error)
        }
    }


    const handleSaveTodayFood = async ({idproducto, nombre, descripcion, precio_cincokg, precio_diezkg ,img, idCategory }: Product) => {
        try {

            const result = await saveInfoToStorage(MY_TODAY_FOOD_KEY, { idproducto, nombre, descripcion, precio_cincokg, precio_diezkg ,img, idCategory})
            return Promise.resolve(result)
        } catch (error) {
            return Promise.reject(error)
        }
    }



    // const handleGetTodayFood = async () => {
    //     try {
    //         const foods = await AsyncStorage.getItem(MY_TODAY_FOOD_KEY)

    //         if (foods !== null) {
    //             const parsedFoods = JSON.parse(foods) as Product[];
    //             return Promise.resolve(parsedFoods.filter(meal => meal.date && isToday(new Date(meal.date))));
    //         }

    //     } catch (error) {
    //         return Promise.reject(error)
    //     }
    // }


    // const handleRemoveTodayFood = async (index: number) => {
    //     try{
    //         const todayFood = await handleGetTodayFood();
    //         const filteredItem = todayFood?.filter((item : Product , itemIndex) => {
    //             return itemIndex !== index;
    //         });

    //         await AsyncStorage.setItem(MY_TODAY_FOOD_KEY,JSON.stringify(filteredItem));
    //         return Promise.resolve()
    //     }catch(error)
    //     {
    //         return Promise.reject(error)
    //     }
    // }
    return {
        onSaveFood: handleSaveFood,
        onGetFood: handleGetFood,
        onSaveTodayFood: handleSaveTodayFood,
    }
}

//guardar inforemacion de comida
//meotodo para obtener info de comida


export default usefoodStorage;