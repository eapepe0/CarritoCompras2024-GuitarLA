import { useEffect, useState, useMemo } from "react";
import { db } from '../data/db';


const useCart = () => {
    const carritoInicial = () => {
        const localStorageCarrito = localStorage.getItem('carrito'); //* tomamos el valor de carrito
        return localStorageCarrito ? JSON.parse(localStorageCarrito) : []; //* devolvemos el JSON de localStorageCarrito o un array vacio
    };
    const [data, setData] = useState(db);
    const [carrito, setCarrito] = useState(carritoInicial);
    const MAX_ITEMS = 5;
    const MIN_ITEMS = 1;

    //* sincronizamos el carrito con el localStorage
    useEffect(() => {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }, [carrito]);

    const addToCart = (item) => {
        /* busca el indice de la guitarra comparandolo con el carrito devuelve el indice donde es encontrado de lo contrario -1 */
        const itemExist = carrito.findIndex((guitarra) => guitarra.id === item.id);
        if (itemExist >= 0) {
            if (carrito[itemExist].quantity >= MAX_ITEMS) return;
            //* si el item existe en el carrito
            const updatedCarrito = [...carrito]; //* copiamos el carrito
            updatedCarrito[itemExist].quantity++; //* buscamos el el carrito copiado el indice donde fue encontrado y le agregamos un +1 a quantity
            setCarrito(updatedCarrito); //* ponemos el carrito actualizado en carrito
        } else {
            //* si el item no existe en el carrito
            item.quantity = 1; //* le ponemos cantidad en 1
            setCarrito((prevCarrito) => [...prevCarrito, item]); //* copiamos el estado previo y le agremos el item que fue enviado en la funcion
        }
    };

    const removeFromCart = (id) => {
        //* tomammos una copia previa del carrito y filtramos todo menos lo que vamos a borrar
        setCarrito((prevCarrito) => prevCarrito.filter((guitarra) => guitarra.id !== id));
    };

    const increaseQuantity = (id) => {
        //* mapeamos el carrito , si el item del carrito es igual al pasado a la funcion y la cantidad del item es menor a la cantidad maxima
        //* devolvemos los items y modificamos la cantidad y le sumamos 1
        const updatedCarrito = carrito.map((item) => {
            if (item.id === id && item.quantity < MAX_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity + 1,
                };
            }
            return item;
        });
        setCarrito(updatedCarrito);
    };

    const decreaseQuantity = (id) => {
        const updatedCarrito = carrito.map((item) => {
            if (item.id === id && item.quantity > MIN_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity - 1,
                };
            }
            return item;
        });
        setCarrito(updatedCarrito);
    };

    const clearCart = () => {
        setCarrito([]);
    };

    //* estado derivado
    const isEmpty = useMemo(() => carrito.length === 0, [carrito]);

    const carritoTotal = useMemo(() => carrito.reduce((total, item) => total + item.quantity * item.price, 0), [carrito]);
    return {
        addToCart,
        carrito,
        clearCart,
        data,
        decreaseQuantity,
        increaseQuantity,
        removeFromCart,
        isEmpty,
        carritoTotal
    }
}

export default useCart