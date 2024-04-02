import Guitarra from './components/Guitarra';
import Header from './components/Header';

import useCart from './hooks/useCart';

function App() {
	const {
		carrito,
		addToCart,
		removeFromCart,
		increaseQuantity,
		decreaseQuantity,
		clearCart,
		data,
		isEmpty,
		carritoTotal,
	} = useCart();

	return (
		<>
			<Header
				carrito={carrito}
				removeFromCart={removeFromCart}
				increaseQuantity={increaseQuantity}
				decreaseQuantity={decreaseQuantity}
				clearCart={clearCart}
				isEmpty={isEmpty}
				carritoTotal={carritoTotal}
			/>

			<main className='container-xl mt-5'>
				<h2 className='text-center'>Nuestra Colección</h2>

				<div className='row mt-5'>
					{/* mapeamos todas las guitarras dentro de map */}
					{data.map((el) => (
						<Guitarra key={el.id} guitarra={el} addToCart={addToCart} />
					))}
				</div>
			</main>

			<footer className='bg-dark mt-5 py-5'>
				<div className='container-xl'>
					<p className='text-white text-center fs-4 mt-4 m-md-0'>GuitarLA - Todos los derechos Reservados</p>
				</div>
			</footer>
		</>
	);
}

export default App;
