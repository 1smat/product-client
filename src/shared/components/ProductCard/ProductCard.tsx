import { useEffect, useState } from 'react'
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

			// https://minimal-product-server.onrender.com
			axios.get("https://minimal-product-server.onrender.com/products", {
				params: { sub }
			}).then(res => res.data)
				.then(async (data: IProduct[]) => {
					setProducts(data)
				},)
		}, []
	)

	return (
		<div className={classes.wrapper}>
			{
				products?.length > 0 ?
					products?.map(
						(product: IProduct) => {
							return <div className={classes.card} key={product.title}>
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
					) : <></>
			}
		</div>

	)
}

export default ProductCard