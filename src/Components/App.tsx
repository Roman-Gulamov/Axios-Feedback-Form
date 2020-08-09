/* eslint-disable no-useless-escape */
import React, { useState, createRef, ChangeEvent, FormEvent, useEffect } from 'react';
import Axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance } from "axios";
import { Context } from './context/context';
import { INotice, Iinput } from './interface/Interface';
import { Feedback } from './Feedback';


const App = (): JSX.Element => {
    const axios: AxiosInstance = Axios.create();
    const formRef = createRef<HTMLFormElement>();
    const regExp: RegExp = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;

    const [isDisabled, setDisabled] = useState(false);
    const [loadingVisible, setVisible] = useState('d-none');
    const [success, setSuccess] = useState(false);

    const [notice, setNotice] = useState<INotice>({ 
        text: "",
        className: "bg-danger"
    });

    const [inputValue, setValue] = useState<Iinput>({ 
        email: "",
        name: "",
        phone: "",
        message: ""
    });

const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const target = event.target;
    const name = target.name;
    setValue({
        ...inputValue,
        [name]: target.value
    });
};

useEffect(() => {
    if (success) {
        const form = formRef.current;
        (form as HTMLFormElement).reset();
    }
});

const handleSubmit = (event: FormEvent<HTMLFormElement>): boolean | undefined => {
    event.preventDefault();
    
    if (inputValue.email === "") {
        setNotice({
            ...notice,
            text: 'Пожалуйста, укажите вашу почту!'
        });
        return false;
    } else if (inputValue.name === "") {
        setNotice({
            ...notice,
            text: 'Пожалуйста, введите своё имя!'
        });
        return false;
    } else if (inputValue.phone === "" || !regExp.test(inputValue.phone as string)) {
        setNotice({
            ...notice,
            text: 'Пожалуйста, введите номер телефона!'
        });
        return false;
    } else if ((inputValue.message as string).length <= 3) {
        setNotice({
            ...notice,
            text: 'Пожалуйста, введите сообщение более 3 символов!'
        });
        return false;
    }

    setNotice({
        ...notice,
        text: ''
    });

//! ------------------------------------------  Before send   --------------------------------------------------------------------//
    axios.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
        setVisible('');
        setDisabled(true);
        return config; 
    });
//! ------------------------------------------  Before send   --------------------------------------------------------------------//

const clearAfter = (): void => {
    setVisible('d-none');
    setDisabled(false);
    setSuccess(false);
}; 
    
//! ------------------------------------------  Submission result   -------------------------------------------------------------//
    axios.interceptors.response.use((response: AxiosResponse<object>): any | never => {
        if (response.data) {
            setNotice({
                text: 'Сообщение отправлено!',
                className: 'bg-success'
            });
            setDisabled(true);
            setSuccess(true);
            setValue({
                email: "",
                name: "",
                phone: "",
                message: ""
            });
            setTimeout(() => {
                setNotice({
                    text: '',
                    className: "bg-danger"
                });
            }, 1300);
        } 
        clearAfter();
    }, 
    (error: string) => {
        clearAfter();
        setNotice({
            ...notice,
            text: 'Сообщение не отправлено. Проверьте соединение с сервером.'
        });
        setTimeout(() => {
            setNotice({
                text: '',
                className: "bg-danger"
            });
        }, 1200);
        return Promise.reject(error);
    });
//! ------------------------------------------  Submission result   -------------------------------------------------------------//


//! ----------------------------------------------  Send  -----------------------------------------------------------------------//
    axios.post("../mail.php", { 
        'email': inputValue.email,
        'name': inputValue.name,                                               
        'phone': inputValue.phone,
        'message': inputValue.message
    });
}
//! ----------------------------------------------  Send  -----------------------------------------------------------------------//

    return (
        <Context.Provider value={{ handleChange }}>
            <>
                <Feedback
                    formRef={formRef}
                    loadingVisible={loadingVisible} 
                    className={notice.className} 
                    text={notice.text} 
                    handleSubmit={handleSubmit}
                    isDisabled={isDisabled}
                />
            </>
        </Context.Provider>
    );
}

export default App;
