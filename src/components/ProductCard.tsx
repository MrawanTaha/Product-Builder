import type { IProduct } from "../interfaces"
import { textSlicer } from "../utils/functions"
import CircleColors from "./CircleColors"
import Image from "./Image"
import Button from "./UI/Button"
interface IProps {
    product: IProduct
}

const ProductCard = ({ product }: IProps) => {
    const { description, imageURL, price, title, colors, category } = product
    const renderProductColors = colors.map(colors =>
        <CircleColors
            key={colors}
            colors={colors}
        />)

    return (
        <div className="max-w-sm md:max-w-lg mx-auto md:mx-0 border rounded-md flex flex-col p-1 md:p-2.5">
            <Image
                imageURL={imageURL}
                alt={title}
                className="rounded-xl h-52 w-100 md:w-full lg:object-cover" />
            <h3 className="text-lg font-semibold">{textSlicer(title, 25)}</h3>
            <p className="text-sm text-gray-500 break-words">{textSlicer(description)}</p>
            <div className="flex items-center my-4 flex-wrap space-x-1">{renderProductColors}</div>
            <div className="flex items-center justify-between">
                <span>${price}</span>
                <Image
                    imageURL={category.imageURL}
                    alt={category.name}
                    className="w-10 h-10 rounded-full object-bottom" />
            </div>
            <div className="flex items-center justify-between space-x-2 my-5">
                <Button className="bg-indigo-700 hover:bg-indigo-800">EDIT</Button>
                <Button className="bg-red-700 hover:bg-red-800">Delete</Button>
            </div>
        </div>
    )
}

export default ProductCard