import { useEffect, useRef, useState } from 'react'
import classes from './ProductCars.module.scss'
import axios from 'axios';

interface IProduct {
	_id?: string;
	title: string;
	desc: string;
	message?: string;
}

const ProductCard = () => {
	const [subdomain, setSubdomain] = useState("")
	const [products, setProducts] = useState<IProduct[]>([])

	useEffect(
		() => {
			let sub = window.location.hostname.split('.')[0]
			setSubdomain(window.location.hostname.split('.')[0])


			axios.get("http://localhost:3000/products", {
				params: { sub }
			}).then(res => res.data)
				.then((data: { data: IProduct[], message: string }) => {
					setProducts(data.data)
				},)
		}, []
	)

	return (
		<div className={classes.wrapper}>
			{
				products.map(
					(product) => {
						return <div className={classes.card}>
							<h3 className={classes.subdomain}>Client - Subdomain : {subdomain}</h3>
							<p className={classes.id}>id: {product._id}</p>
							<h1 className={classes.title}> {product.title}  </h1>
							<h2 className={classes.desc}> {product.desc} </h2>
							<h3 className={classes.message}>
								<span
									className={classes.server}
								>Server - </span>
								{product.message}
							</h3>
						</div>
					}
				)
			}
		</div>

	)
}

export default ProductCard