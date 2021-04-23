import React from 'react'

import {Field, ErrorMessage} from 'formik'

import './InputField.css'

const InputField = ({value, label, type}) => {

    return (
        <div className="Field-Group">
            <label className="Field-Label">{label}</label>
            <Field
                name={value}
                type={type}
                className="Field-Field"
            />
            <ErrorMessage
                component="span"
                name={value}
                className="Field-Error"
            />
            </div>
    )
}

export default InputField