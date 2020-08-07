/* eslint-disable no-useless-escape */
import React, { useState } from 'react';
import Axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance } from "axios";
import { INotice, Iinput } from './Interface/Interface';
import { Feedback } from './Feedback';


const App = ():JSX.Element => {
    const axios: AxiosInstance = Axios.create();
    const regExp: RegExp = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;

    const [isDisabled, setDisabled] = useState(false);
    const [loadingVisible, setVisible] = useState('d-none');

    const [notice, setNotice] = useState<INotice>({ 
        text: "",
        className: ""
    });

    const [inputValue, setValue] = useState<Iinput>({ 
        email: "",
        name: "",
        phone: "",
        message: ""
    });


const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
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
        <div>
            <Feedback
                loadingVisible={loadingVisible} 
                className={notice.className} 
                text={notice.text} 
                handleSubmit={handleSubmit} 
                handleChange={handleChange} 
                isDisabled={isDisabled}
            />
        </div>
    );
}

export default App;
