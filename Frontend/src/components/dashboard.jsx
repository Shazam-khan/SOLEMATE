'use client'
import { useState } from 'react'
import { Plus, Edit, Trash2 } from 'lucide-react'

// Placeholder data
const initialShoes = [
  { id: 1, name: 'Classic Loafer', price: 89.99, quantity: 50, sizes: '7,8,9,10,11' },
  { id: 2, name: 'Running Pro', price: 129.99, quantity: 30, sizes: '8,9,10,11,12' },
  { id: 3, name: 'Elegant Heel', price: 99.99, quantity: 25, sizes: '6,7,8,9' },
]

function Dashboard() 
{
  const [shoes, setShoes] = useState(initialShoes)
  const [editingShoe, setEditingShoe] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleAddShoe = (newShoe) => {
    setShoes([...shoes, { ...newShoe, id: shoes.length + 1 }])
    setIsDialogOpen(false)
  }

  const handleEditShoe = (updatedShoe) => {
    setShoes(shoes.map(shoe => shoe.id === updatedShoe.id ? updatedShoe : shoe))
    setEditingShoe(null)
    setIsDialogOpen(false)
  }

  const handleDeleteShoe = (id) => {
    setShoes(shoes.filter(shoe => shoe.id !== id))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brown-100 to-brown-300 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-xl p-8">
        <h1 className="text-3xl font-bold mb-8 text-brown-800">Footwear Admin Dashboard</h1>
       
        <div className="mb-6">
          <button
            onClick={() => {
              setEditingShoe(null)
              setIsDialogOpen(true)
            }}
            className="bg-amber-700 hover:bg-amber-800 text-white px-4 py-2 rounded-md flex items-center"
          >
            <Plus className="mr-2 h-4 w-4" /> Add New Shoe
          </button>
        </div>

        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Price</th>
              <th className="py-3 px-6 text-left">Quantity</th>
              <th className="py-3 px-6 text-left">Sizes</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {shoes.map((shoe) => (
              <tr key={shoe.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">{shoe.name}</td>
                <td className="py-3 px-6 text-left">${shoe.price.toFixed(2)}</td>
                <td className="py-3 px-6 text-left">{shoe.quantity}</td>
                <td className="py-3 px-6 text-left">{shoe.sizes}</td>
                <td className="py-3 px-6 text-left">
                  <button
                    onClick={() => {
                      setEditingShoe(shoe)
                      setIsDialogOpen(true)
                    }}
                    className="text-blue-600 hover:text-blue-900 mr-2"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteShoe(shoe.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">{editingShoe ? 'Edit Shoe' : 'Add New Shoe'}</h2>
            <ShoeForm
              onSubmit={editingShoe ? handleEditShoe : handleAddShoe}
              initialData={editingShoe}
              onClose={() => setIsDialogOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  )
}

function ShoeForm({ onSubmit, initialData, onClose }) {
  const [formData, setFormData] = useState(initialData || {
    name: '',
    price: '',
    quantity: '',
    sizes: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Shoe Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
        />
      </div>
      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
        <input
          id="price"
          name="price"
          type="number"
          step="0.01"
          value={formData.price}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
        />
      </div>
      <div>
        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
        <input
          id="quantity"
          name="quantity"
          type="number"
          value={formData.quantity}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
        />
      </div>
      <div>
        <label htmlFor="sizes" className="block text-sm font-medium text-gray-700">Sizes (comma-separated)</label>
        <input
          id="sizes"
          name="sizes"
          type="text"
          value={formData.sizes}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
        />
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-700 hover:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
        >
          {initialData ? 'Update Shoe' : 'Add Shoe'}
        </button>
      </div>
    </form>
  )
}

export default Dashboard;