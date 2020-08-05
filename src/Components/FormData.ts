import FormType from './FormType';

const FORM_DATA: Array<FormType>= [
    {
        type: 'email',
        id: "email",
        name: "email",
        placeholder: "example@mail.ru"
    },
    {
        type: "text",
        id: "name",
        name: "name",
        placeholder: "Как вас зовут?"
    },
    {
        type: "tel",
        id: "phone",
        name: "phone",
        placeholder: "Ваш номер телефона",
        pattern: '^((8|\\+7)[\\- ]?)?(\\(?\\d{3}\\)?[\\- ]?)?[\\d\\- ]{7,10}$'
    },
    {
        as: "textarea",
        id: "message",
        name: "message",
        cols: 30,
        rows: 4,
        className: "form__message"
    },
    {
        type: "button",
        name: "button",
        className: "form__button btn shadow-none",
        value: "Отправить"
    }
]

export default FORM_DATA;