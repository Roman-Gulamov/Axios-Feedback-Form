import React from 'react';
import { Form } from 'react-bootstrap';
import { FeedbackMap } from './FeedbackMap';
import { IFeedback } from './Interface/Interface';
import Loading from '../assets/Loading.gif';


export const Feedback = ({ loadingVisible, className, text, formRef, handleSubmit, isDisabled }: IFeedback): JSX.Element => {
    return (
        <>
        <div className="wrapper">
            <h1 className="text-center">Напишите мне!</h1>
            <img 
                className={`loading ${loadingVisible}`}
                src={Loading} 
                alt="loading..." 
            />
            <div className={`${className} text-center text-light`}>{text}</div>
            <Form
                ref={formRef}
                className="form d-flex flex-column" 
                onSubmit={handleSubmit}
            >
                <FeedbackMap />
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
