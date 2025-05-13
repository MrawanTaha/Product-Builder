import { useState, type ChangeEvent, type FormEvent } from "react"
import ProductCard from "./components/ProductCard"
import Model from "./components/UI/Model"
import { colors, formInputsList, productList } from "./data"
import Button from "./components/UI/Button"
import Input from "./components/UI/Input"
import type { IProduct } from "./interfaces"
import { productValidation } from "./Validation"
import ErrorMessage from "./components/ErrorMessage"
import CircleColors from "./components/CircleColors"

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

  const [product, setProduct] = useState<IProduct>(defaultProductObject)
  const [errors, setErrors] = useState({
    title: "", description: "", imageURL: "", price: "",
  })
  const [tempColors, setTempColors] = useState<string[]>([])
  console.log(tempColors)
  const [isOpen, setIsOpen] = useState(false)

  const closeModel = () => setIsOpen(false)
  const openModel = () => setIsOpen(true)
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
  const OnCancel = () => {
    setProduct(defaultProductObject)
    closeModel()
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

  }

  const renderProductList = productList.map(product => <ProductCard key={product.id} product={product} />)
  const renderFormInputList = formInputsList.map(input =>
    <div className="flex flex-col" key={input.id}>
      <label htmlFor={input.id} className="mb-2 text-sm font-medium text-gray-700">{input.label}</label>
      <Input type="text" id={input.id} name={input.name} value={product[input.name]} onChange={onChangeHandler} />
      <ErrorMessage msg={errors[input.name]} />
    </div>)

  const renderProductColors = colors.map(colors => <CircleColors key={colors} colors={colors} onClick={() => {
    if (tempColors.includes(colors)) {
      setTempColors(prev => prev.filter(item => item !== colors))
      return
    }
    setTempColors((prev) => [...prev, colors])
  }} />)

  return (
    <main className="container">
      <Button className="block bg-indigo-700 hover:bg-indigo-800 mx-auto my-10 px-10 font-medium" onClick={openModel} width="w-fit">ADD</Button>
      <div className="m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 p-2 rounded-md">
        {renderProductList}
      </div>
      <Model isOpen={isOpen} close={closeModel} title="ADD A NEW PRODUCT">
        <form className="space-y-3" onSubmit={submitHandler}>
          {renderFormInputList}
          <div className="flex items-center my-4 flex-wrap space-x-1">{tempColors.map(colors => <span key={colors} className="p-1 mr-1 mb-1 text-xs rounded-md text-white" style={{ backgroundColor: colors }}>{colors}</span>)}</div>
          <div className="flex items-center my-4 flex-wrap space-x-1">{renderProductColors}</div>
          <div className="flex items-center space-x-3">
            <Button className="bg-indigo-700 hover:bg-indigo-800">Submit</Button>
            <Button className="bg-gray-400 hover:bg-gray-500" onClick={OnCancel}>Cancel</Button>
          </div>
        </form>
      </Model >
    </main>

  )
}

export default App