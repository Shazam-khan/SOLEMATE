import { useState } from "react"

interface Product {
  id: number
  name: string
  price: number
  quantity: number
  size: string
}

export default function ProductCart() {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "Product 1", price: 10.99, quantity: 1, size: "M" },
    { id: 2, name: "Product 2", price: 15.99, quantity: 1, size: "L" },
    { id: 3, name: "Product 3", price: 7.99, quantity: 1, size: "S" },
  ])

  const updateQuantity = (id: number, change: number) => {
    setProducts(
      products.map((product) =>
        product.id === id
          ? { ...product, quantity: Math.max(0, product.quantity + change) }
          : product
      )
    )
  }

  const removeProduct = (id: number) => {
    setProducts(products.filter((product) => product.id !== id))
  }

  const calculateTotal = () => {
    return products.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2)
  }

  const handlePlaceOrder = () => {
    console.log("Order placed!")
    // Here you would typically handle the order submission
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Product Cart</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Product</th>
                  <th className="text-left py-2">Size</th>
                  <th className="text-left py-2">Price</th>
                  <th className="text-left py-2">Quantity</th>
                  <th className="text-left py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b last:border-b-0">
                    <td className="py-2">
                      <h3 className="font-semibold">{product.name}</h3>
                    </td>
                    <td className="py-2">{product.size}</td>
                    <td className="py-2">${product.price.toFixed(2)}</td>
                    <td className="py-2">
                      <div className="flex items-center space-x-2">
                        <button
                          className="px-2 py-1 border rounded-md hover:bg-gray-100"
                          onClick={() => updateQuantity(product.id, -1)}
                          disabled={product.quantity === 0}
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{product.quantity}</span>
                        <button
                          className="px-2 py-1 border rounded-md hover:bg-gray-100"
                          onClick={() => updateQuantity(product.id, 1)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="py-2">
                      <button
                        className="px-2 py-1 border rounded-md text-red-600 hover:bg-red-100"
                        onClick={() => removeProduct(product.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-end space-y-4">
          <div className="flex justify-between w-full">
            <h3 className="text-lg font-semibold">Total:</h3>
            <p className="text-lg font-semibold">${calculateTotal()}</p>
          </div>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>
        </CardFooter>
      </Card>
    </div>
  )
}

