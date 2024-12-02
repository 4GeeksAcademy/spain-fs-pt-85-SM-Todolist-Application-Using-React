import React from "react";
import PropTypes from "prop-types";
import LiGenerator from "./li";
import { useState, useEffect } from "react";

//create your first component
const Home = () => {
	//se genera hook para los items de la lista
	const [liItem, setLiItem] = useState(["Coffe"]);
	
	//rescate de los objetos de la lista guardados en el almacenamiento local cuando se carga la página
	useEffect(()=>{
		const savedLiItems = window.localStorage.getItem('SM_ToDo_List')
		if (savedLiItems !== null) setLiItem(JSON.parse(savedLiItems))
	},[])
	
	//actualización del almacenamiento local cada vez que se actualice liItem
	useEffect(()=>{
		window.localStorage.setItem('SM_ToDo_List', JSON.stringify(liItem))	
	},[liItem])

	//se genera escucha para que añada los valores introducidos en el input al array cuando se pulsa la tecla enter
	//se hace trim para evitar que se ingresen strings con espacios en blanco al principio o al final
	const liItemHandler = (e) => {
		if (e.key == "Enter" && e.target.value.trim()) {
		setLiItem(liItem.concat(e.target.value))
		e.target.value = "";
		}
	};

	//se genera la lista en html
	const liItemGenerator = liItem.map((x, index) =>{
		return <LiGenerator 
		key={index} 
		item={x} 
		buttonOnClick={() => itemUpdater(x)} />
	});

	//función para eliminar items de la lista
	const itemUpdater = (itemToRemove) => {
		const updatedItems = liItem.filter((x) => x != itemToRemove);
		setLiItem(updatedItems);
	};
	
	//variable para manejar el texto de los objetos faltantes
	const itemsLeftTextUpdater = liItem.length === 1 ? "1 item left" : liItem.length + " items left"

	return (
		<>
		<div className="d-flex justify-content-center fs-1"> 
			To Do List
		</div>
		<div className="border col-lg-6 col-11 mx-auto">
			<input className="ps-5 py-2 w-100 border border-top-0 border-start-0 border-end-0 fs-5 " type="text" 
			onKeyDown={liItemHandler} placeholder="What needs to be done?"/>
			<ul className="list-group list-group-flush">
				{liItemGenerator}
			</ul>
			<p className="mb-0 p-2 ps-3 fs-6 border-top fw-light text-secondary d-flex align-items-center">{itemsLeftTextUpdater}</p>
		</div>
		</>
	);
};

export default Home;
