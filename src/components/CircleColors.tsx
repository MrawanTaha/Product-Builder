import type { HTMLAttributes } from "react"

interface IProps extends HTMLAttributes<HTMLSpanElement> {
    colors: string,
}

const CircleColors = ({ colors, ...rest }: IProps) => {
    return (<span
        className={`block w-5 h-5 rounded-full cursor-pointer`}
        style={{ backgroundColor: colors }}
        {...rest}
    />
    )
}

export default CircleColors