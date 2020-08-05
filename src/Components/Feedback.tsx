import React from 'react';
import { Form } from 'react-bootstrap';
import '../assets/scss/form.scss';
import Loading from '../assets/images/loading.gif';
import FORM_DATA from './FormData';
import FormType from './FormType';


export default function Feedback () {
    return (
        <>
            <div className="wrapper">
                <h1 className="text-center">Напишите мне!</h1>
                <img 
                    className="loading d-none" 
                    src={Loading} 
                    alt="loading..." 
                />
                <div id="notice" className="bg-danger text-center text-light"></div>
                <Form className="form d-flex flex-column" action="">
                    {FORM_DATA.map(({ type, id, name, placeholder, className, pattern, as, cols, rows, value }: FormType) => (
                        <Form.Control
                            key={name} 
                            type={type} 
                            as={as}
                            cols={cols}
                            rows={rows}
                            defaultValue={value}
                            placeholder={placeholder}
                            pattern={pattern}
                            id={id}
                            name={name}
                            className={className? className : 'form__input'}
                        />
                    ))} 
                </Form>
            </div>
        </>
    )
}
