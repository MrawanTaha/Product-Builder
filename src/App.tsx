import { useState, type ChangeEvent, type FormEvent } from "react"
import ProductCard from "./components/ProductCard"
import Model from "./components/UI/Model"
import { formInputsList, productList } from "./data"
import Button from "./components/UI/Button"
import Input from "./components/UI/Input"
import type { IProduct } from "./interfaces"
import { productValidation } from "./Validation"
import ErrorMessage from "./components/ErrorMessage"

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
    title: "",
    description: "",
    imageURL: "",
    price: "",
  })
  // console.log("errors", errors);

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
    // console.log("Cancel");
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
    // console.log("send product");

  }

  const renderProductList = productList.map(product => <ProductCard key={product.id} product={product} />)
  const renderFormInputList = formInputsList.map(input =>
    <div className="flex flex-col" key={input.id}>
      <label htmlFor={input.id} className="mb-2 text-sm font-medium text-gray-700">{input.label}</label>
      <Input type="text" id={input.id} name={input.name} value={product[input.name]} onChange={onChangeHandler} />
      <ErrorMessage msg={errors[input.name]} />
    </div>)

  return (
    <main className="container">
      <Button className="block bg-indigo-700 hover:bg-indigo-800 mx-auto my-10 px-10 font-medium" onClick={openModel} width="w-fit">ADD</Button>
      <div className="m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 p-2 rounded-md">
        {renderProductList}
      </div>
      <Model isOpen={isOpen} close={closeModel} title="ADD A NEW PRODUCT">
        <form className="space-y-3" onSubmit={submitHandler}>
          {renderFormInputList}
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