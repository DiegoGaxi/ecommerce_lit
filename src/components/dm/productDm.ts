export interface Category {
	id: number;
	name: string;
	slug: string;
	image: string;
	creationAt: string;
	updatedAt: string;
}

export interface Product {
	id: number;
	title: string;
	slug: string;
	price: number;
	description: string;
	category: Category;
	images: string[];
	creationAt: string;
	updatedAt: string;
}

export async function fetchCatalogProducts(): Promise<Product[]> {
	try {
		const response = await fetch("https://api.escuelajs.co/api/v1/products");
		if (!response.ok) throw new Error("Network response was not ok");
		const data = await response.json();
		// Normaliza los datos para que tengan la misma estructura que el mock
			return data.map((item: any) => ({
				id: item.id,
				title: item.title,
				slug: item.slug,
				price: item.price,
				description: item.description,
				category: item.category,
				images: Array.isArray(item.images) ? item.images : [item.images],
				creationAt: item.creationAt,
				updatedAt: item.updatedAt
			}));
	} catch (e) {
		// Si falla, regresa el mock
			const now = new Date().toISOString();
			const mockCategory = {
				id: 1,
				name: 'Mock Category',
				slug: 'mock-category',
				image: 'https://i.imgur.com/Qphac99.jpeg',
				creationAt: now,
				updatedAt: now
			};
			return Promise.resolve([
				{
					id: 1,
					title: 'Wireless Headphones',
					slug: 'wireless-headphones',
					price: 129.99,
					description: 'High quality wireless headphones with noise cancellation and 30h battery life.',
					category: mockCategory,
					images: [
						'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=400&q=80',
						'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
						'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80'
					],
					creationAt: now,
					updatedAt: now
				},
				{
					id: 2,
					title: 'Smart Watch',
					slug: 'smart-watch',
					price: 89.99,
					description: 'Track your fitness and notifications with this stylish smart watch.',
					category: mockCategory,
					images: [
						'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=400&q=80',
						'https://images.unsplash.com/photo-1465101178521-c1a9136a3fd9?auto=format&fit=crop&w=400&q=80',
						'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80'
					],
					creationAt: now,
					updatedAt: now
				},
				{
					id: 3,
					title: 'Bluetooth Speaker',
					slug: 'bluetooth-speaker',
					price: 49.99,
					description: 'Portable speaker with deep bass and 12h battery life.',
					category: mockCategory,
					images: [
						'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
						'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80',
						'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80'
					],
					creationAt: now,
					updatedAt: now
				}
			]);
	}
}
