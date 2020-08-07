import React from 'react';
import { Form } from 'react-bootstrap';
import { FeedbackMap } from './FeedbackMap';
import { IProps } from './Interface/Interface';
import Loading from '../assets/Loading.gif';


export const Feedback = ({ loadingVisible, className, text, handleSubmit, handleChange, isDisabled }: IProps): JSX.Element => {
    return (
        <>
        <div className="wrapper">
            <h1 className="text-center">Напишите мне!</h1>
            <img 
                className={`loading ${loadingVisible}`}
                src={Loading} 
                alt="loading..." 
            />
            <div 
                id="notice" 
                className={`bg-danger text-center text-light ${className}`}>
                {text}
            </div>
            <Form 
                className="form d-flex flex-column" 
                action="" 
                onSubmit={handleSubmit}
            >
                <FeedbackMap handleChange={handleChange} />
                <button 
                    name="button"
                    className="form__button btn shadow-none"
                    disabled={isDisabled}>
                    Отправить
                </button>
            </Form>
        </div>
        </>
    )
}
