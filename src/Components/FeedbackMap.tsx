import React from 'react';
import FEEDBACK_DATA from './Data/FeedbackData';
import { Context } from './context/context';
import { Form } from 'react-bootstrap';
import { IMap } from './Interface/Interface';

export const FeedbackMap = () => {
    return (
        <Context.Consumer> 
            {({ handleChange }) => ( 
                <>
                {FEEDBACK_DATA.map(({ type, name, placeholder, className, pattern, as, cols, rows }: IMap) => (
                    <Form.Control
                        key={name} 
                        type={type}
                        name={name}
                        onInput={handleChange}
                        className={className? className : 'form__input'} 
                        placeholder={placeholder}
                        pattern={pattern}
                        as={as}
                        cols={cols}
                        rows={rows}
                    />
                ))}
                </>
            )}
        </Context.Consumer>
    )
} 