import { useState, type ChangeEvent, type FormEvent } from "react"
import ProductCard from "./components/ProductCard"
import Model from "./components/UI/Model"
import { categories, colors, formInputsList, productList } from "./data"
import Button from "./components/UI/Button"
import Input from "./components/UI/Input"
import type { IProduct } from "./interfaces"
import { productValidation } from "./Validation"
import ErrorMessage from "./components/ErrorMessage"
import CircleColors from "./components/CircleColors"
import { v4 as uuid } from 'uuid';
import Select from "./components/UI/Select"
import type { TProductNames } from "./types"
import toast, { Toaster } from "react-hot-toast"


const App = () => {
  const defaultProductObject = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      name: "",
      imageURL: ""
    }
  }

  const [products, setProducts] = useState<IProduct[]>(productList)
  const [product, setProduct] = useState<IProduct>(defaultProductObject)
  const [productToEdit, setProductToEdit] = useState<IProduct>(defaultProductObject)
  const [productToEditIdx, setProductToEditIdx] = useState<number>(0)
  const [errors, setErrors] = useState({
    title: "", description: "", imageURL: "", price: "",
  })
  const [tempColors, setTempColors] = useState<string[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenEditModel, setIsOpenEditModel] = useState(false)
  const [isOpenConfirmModel, setIsOpenConfirmModel] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(categories[0])

  const closeModel = () => setIsOpen(false)
  const openModel = () => setIsOpen(true)
  const closeEditModel = () => setIsOpenEditModel(false)
  const openEditModel = () => setIsOpenEditModel(true)
  const closeConfirmModel = () => setIsOpenConfirmModel(false)
  const openConfirmModel = () => setIsOpenConfirmModel(true)
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target
    setProduct({
      ...product,
      [name]: value
    })
    setErrors({
      ...errors,
      [name]: ""
    })
  }
  const onChangeEditHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target
    setProductToEdit({
      ...productToEdit,
      [name]: value
    })
    setErrors({
      ...errors,
      [name]: ""
    })
  }
  const OnCancel = () => {
    setProduct(defaultProductObject)
    closeModel()
  }
  const removeProductHandeler = () => {
    const filtered = products.filter(product => product.id !== productToEdit.id)
    setProducts(filtered)
    closeConfirmModel()
    toast("Product has been deleted successfully!")
  }
  const submitHandler = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const { title, description, imageURL, price } = product

    const errors = productValidation({ title, description, imageURL, price })
    const hasErrorMsg = Object.values(errors).some(value => value === "") && Object.values(errors).every(value => value === "")
    if (!hasErrorMsg) {
      setErrors(errors)
      return
    }

    setProducts(prev => [{ ...product, id: uuid(), colors: tempColors, category: selectedCategory }, ...prev])
    setProduct(defaultProductObject)
    setTempColors([])
    closeModel()
    toast("Product has been added successfully!")

  }

  const submitEditHandler = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const { title, description, imageURL, price } = productToEdit

    const errors = productValidation({ title, description, imageURL, price })
    const hasErrorMsg = Object.values(errors).some(value => value === "") && Object.values(errors).every(value => value === "")
    if (!hasErrorMsg) {
      setErrors(errors)
      return
    }
    const updatedProducts = [...products]
    updatedProducts[productToEditIdx] = { ...productToEdit, colors: tempColors.concat(productToEdit.colors) }
    setProducts(updatedProducts)
    setProductToEdit(defaultProductObject)
    setTempColors([])
    closeEditModel()
    toast("Product has been updated successfully!")

  }

  const renderProductList = products.map((product, idx) =>
    <ProductCard
      key={product.id}
      product={product}
      setProductToEdit={setProductToEdit}
      openEditModel={openEditModel}
      idx={idx}
      setProductToEditIdx={setProductToEditIdx}
      openConfirmModel={openConfirmModel} />
  )
  const renderFormInputList = formInputsList.map(input =>
    <div className="flex flex-col" key={input.id}>
      <label htmlFor={input.id} className="mb-2 text-sm font-medium text-gray-700">{input.label}</label>
      <Input type="text" id={input.id} name={input.name} value={product[input.name]} onChange={onChangeHandler} />
      <ErrorMessage msg={errors[input.name]} />
    </div>)

  const renderProductColors = colors.map(colors =>
    <CircleColors
      key={colors}
      colors={colors}
      onClick={() => {
        if (tempColors.includes(colors)) {
          setTempColors(prev => prev.filter(item => item !== colors))
          return
        }
        if (productToEdit.colors.includes(colors)) {
          setTempColors(prev => prev.filter(item => item !== colors))
          return
        }
        setTempColors((prev) => [...prev, colors])
      }}
    />)
  const renderProductEditWithErrorMsg = (id: string, label: string, name: TProductNames) => {
    return (<div className="flex flex-col" >
      <label
        htmlFor={id}
        className="mb-2 text-sm font-medium text-gray-700">{label}</label>
      <Input
        type="text"
        id={id}
        name={name}
        value={productToEdit[name]}
        onChange={onChangeEditHandler} />
      <ErrorMessage msg={errors[name]} />
    </div>)
  }

  return (
    <main className="container">
      <Button className="block bg-indigo-700 hover:bg-indigo-800 mx-auto my-10 px-10 font-medium" onClick={openModel} width="w-fit">Build a Product</Button>
      <div className="m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 p-2 rounded-md">
        {renderProductList}
      </div>
      <Model isOpen={isOpen} close={closeModel} title="ADD A NEW PRODUCT">
        <form className="space-y-3" onSubmit={submitHandler}>
          {renderFormInputList}
          <Select selected={selectedCategory} setSelected={setSelectedCategory} />
          <div className="flex items-center my-4 flex-wrap space-x-1">{tempColors.map(colors => <span key={colors} className="p-1 mr-1 mb-1 text-xs rounded-md text-white" style={{ backgroundColor: colors }}>{colors}</span>)}</div>
          <div className="flex items-center my-4 flex-wrap space-x-1">{renderProductColors}</div>
          <div className="flex items-center space-x-3">
            <Button className="bg-indigo-700 hover:bg-indigo-800">Submit</Button>
            <Button className="bg-gray-400 hover:bg-gray-500" onClick={OnCancel}>Cancel</Button>
          </div>
        </form>
      </Model >
      {/* <Model isOpen={isOpenConfirmModel} close={closeConfirmModel} title="ADD A NEW PRODUCT"> */}
      <Model
        isOpen={isOpenConfirmModel}
        close={closeConfirmModel}
        title="Are you sure you want to remove this Product from your Store?"
        description="Deleting this product will remove it permanently from your inventory. Any associated data, sales history, and other related information will also be deleted. Please make sure this is the intended action.">
        <div className="flex items-center space-x-3">
          <Button className="bg-[#c2344d] hover:bg-red-800" onClick={removeProductHandeler}>
            Yes, remove
          </Button>
          <Button type="button" className="bg-[#f5f5fa] hover:bg-gray-300 !text-black" onClick={closeConfirmModel}>
            Cancel
          </Button>
        </div>
      </Model >
      <Model isOpen={isOpenEditModel} close={closeEditModel} title="EDIT PRODUCT">
        <form className="space-y-3" onSubmit={submitEditHandler}>
          {renderProductEditWithErrorMsg('title', 'Product Title', 'title')}
          {renderProductEditWithErrorMsg('description', 'Product Description', 'description')}
          {renderProductEditWithErrorMsg('imageURL', 'Product Image URL', 'imageURL')}
          {renderProductEditWithErrorMsg('price', 'Product Price', 'price')}
          <Select selected={productToEdit.category} setSelected={(value) => setProductToEdit({ ...productToEdit, category: value })} />
          <div
            className="flex items-center my-4 flex-wrap space-x-1">{renderProductColors}
          </div>
          <div
            className="flex items-center my-4 flex-wrap space-x-1">{tempColors.concat(productToEdit.colors).map(colors => <span
              key={colors}
              className="p-1 mr-1 mb-1 text-xs rounded-md text-white"
              style={{ backgroundColor: colors }}>
              {colors}
            </span>)}
          </div>
          <div
            className="flex items-center space-x-3">
            <Button
              className="bg-indigo-700 hover:bg-indigo-800">
              Submit
            </Button>
            <Button
              className="!text-black bg-gray-200 hover:bg-gray-300"
              onClick={OnCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </Model >
      <Toaster />
    </main>

  )
}

export default App