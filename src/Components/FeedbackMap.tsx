import React from 'react';
import FEEDBACK_DATA from './Data/FeedbackData';
import { Form } from 'react-bootstrap';
import { IForm } from './Interface/Interface';

export const FeedbackMap = ({ handleChange }: any) => {
    return (
        <>
            {FEEDBACK_DATA.map(({ type, name, placeholder, className, pattern, as, cols, rows }: IForm) => (
                <Form.Control
                    key={name} 
                    type={type}
                    name={name}
                    onChange={handleChange}
                    className={className? className : 'form__input'} 
                    placeholder={placeholder}
                    pattern={pattern}
                    as={as}
                    cols={cols}
                    rows={rows}
                />
            ))}
        </>
    )
} 