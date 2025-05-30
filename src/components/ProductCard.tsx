import type { IProduct } from "../interfaces"
import { numberWithCommas, textSlicer } from "../utils/functions"
import CircleColors from "./CircleColors"
import Image from "./Image"
import Button from "./UI/Button"
interface IProps {
    product: IProduct,
    setProductToEdit: (product: IProduct) => void,
    openEditModel: () => void,
    openConfirmModel: () => void,
    setProductToEditIdx: (value: number) => void,
    idx: number,
}

const ProductCard = ({ product, setProductToEdit, openEditModel, openConfirmModel, idx, setProductToEditIdx }: IProps) => {
    const { description, imageURL, price, title, colors, category } = product
    const renderProductColors = colors.map(colors =>
        <CircleColors
            key={colors}
            colors={colors}
        />)

    const onEdit = () => {
        setProductToEdit(product)
        openEditModel()
        setProductToEditIdx(idx)
    }
    const onRemove = () => {
        setProductToEdit(product)
        openConfirmModel()
    }

    return (
        <div className="max-w-sm md:max-w-lg mx-auto md:mx-0 border rounded-md p-2 flex flex-col space-y-3">
            <Image
                imageURL={imageURL}
                alt={title}
                className="rounded-md h-52 w-full lg:object-cover" />
            <h3 className="text-lg font-semibold">{textSlicer(title, 25)}</h3>
            <p className="text-sm text-gray-500 break-words">{textSlicer(description)}</p>
            <div className="flex items-center flex-wrap space-x-1">
                {!colors.length ? <p className="min-h-[20px]">Not available in colors !</p> : renderProductColors}
            </div>
            <div className="flex items-center justify-between">
                <span className="text-lg text-indigo-600 font-semibold">${numberWithCommas(price)}</span>
                <div className="flex items-center space-x-2">
                    <span className="text-xs font-semibold">{category.name}</span>
                    <Image
                        imageURL={category.imageURL}
                        alt={category.name}
                        className="w-10 h-10 rounded-full object-bottom" />
                </div>
            </div>
            <div className="flex items-center justify-between space-x-2">
                <Button className="bg-indigo-700 hover:bg-indigo-800" onClick={onEdit}>EDIT</Button>
                <Button className="bg-[#c2344d] hover:bg-red-800" onClick={onRemove}>Remove</Button>
            </div>
        </div>
    )
}

export default ProductCard