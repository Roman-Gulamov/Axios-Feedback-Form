/* eslint-disable no-useless-escape */
import React, { useState } from 'react';
import Axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance } from "axios";
import { Form } from 'react-bootstrap';
import NoticeType from '../Interfaces/NoticeType';
import InputType from '../Interfaces/InputType';
import FormType from '../Interfaces/FormType';
import FORM_DATA from '../Data/FormData';
import Loading from '../../assets/Loading.gif';


export default function FeedbackMap () {
    const axios: AxiosInstance = Axios.create();
    const regExp: RegExp = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;

    const [isDisabled, setDisabled] = useState(false);
    const [loadingVisible, setVisible] = useState('d-none');

    const [notice, setNotice] = useState<NoticeType>({ 
        text: "",
        className: ""
    });

    const [inputValue, setValue] = useState<InputType>({ 
        email: "",
        name: "",
        phone: "",
        message: ""
    });


const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const name = target.name;
    setValue({
        ...inputValue,
        [name]: target.value
    });
};

const clearAfter = (): void => {
    setVisible('d-none');
    setDisabled(false);
};  

const handleSubmit = (event: React.FormEvent<HTMLFormElement>): boolean | undefined => {
    event.preventDefault();
    
    if (inputValue.email === "") {
        setNotice({
            text: 'Пожалуйста, укажите email!'
        });
        return false;
    } else if (inputValue.name === "") {
        setNotice({
            text: 'Пожалуйста, введите своё имя!'
        });
        return false;
    } else if (inputValue.phone === "" || !regExp.test(inputValue.phone as string)) {
        setNotice({
            text: 'Пожалуйста, введите номер телефона!'
        });
        return false;
    } else if ((inputValue.message as string).length <= 3) {
        setNotice({
            text: 'Пожалуйста, введите сообщение более 3 символов!'
        });
        return false;
    }

    setNotice({
        text: ''
    });


//! ------------------------------------------  Before send   --------------------------------------------------------------------//
    axios.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
        setVisible('');
        setDisabled(true);
        return config; 
    });
//! ------------------------------------------  Before send   --------------------------------------------------------------------//
    
    
//! ------------------------------------------  Submission result   -------------------------------------------------------------//
    axios.interceptors.response.use((response: AxiosResponse<object>): any | never => {
        if (response.data) {
            setNotice({
                text: 'Сообщение отправлено!',
                className: 'bg-success'
            });
            setDisabled(true);
            setTimeout(() => {
                setNotice({
                    text: '',
                    className: 'bg-danger'
                });
            }, 1100)
            setValue({
                email: "",
                name: "",
                phone: "",
                message: ""
            });
            (event.target as HTMLFormElement).reset();
        } 
        clearAfter();
    }, 
    (error: string) => {
        setNotice({
            text: 'Сообщение не отправлено. Проверьте соединение с сервером.'
        });
        clearAfter();
        return Promise.reject(error);
    });
//! ------------------------------------------  Submission result   -------------------------------------------------------------//


//! ----------------------------------------------  Send  -----------------------------------------------------------------------//
    axios.post("/mail.php", { 
        'email': inputValue.email,
        'name': inputValue.name,                                               
        'phone': inputValue.phone,
        'message': inputValue.message
    })
}
//! ----------------------------------------------  Send  -----------------------------------------------------------------------//

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
                className={`bg-danger text-center text-light ${notice.className}`}>
                {notice.text}
            </div>
            <Form 
                className="form d-flex flex-column" 
                action="" 
                onSubmit={handleSubmit}
            >
                {FORM_DATA.map(({ type, name, placeholder, className, pattern, as, cols, rows }: FormType) => (
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
