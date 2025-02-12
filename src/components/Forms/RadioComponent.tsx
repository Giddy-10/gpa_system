import React from "react"

interface ExpProps {
    name: string
    values: string[]
    defaultValue?: string
}

const RadioComponent = (props: ExpProps) => {
    return (
        <div className="radio-component">
            {props.values.map((value) => {
                return (
                    <label key={value} className="cursor-pointer">
                        {value}
                        <input
                            type="radio"
                            name={props.name}
                            value={value}
                            defaultChecked={
                                props.defaultValue &&
                                props.defaultValue == value
                                    ? true
                                    : false
                            }
                        />
                    </label>
                )
            })}
        </div>
    )
}

export default RadioComponent
