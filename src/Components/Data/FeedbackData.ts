import { IMap } from '../Interface/Interface';

const FEEDBACK_DATA: Array<IMap> = [
    {
        type: 'email',
        name: "email",
        placeholder: "example@mail.ru"
    },
    {
        type: "text",
        name: "name",
        placeholder: "Как вас зовут?"
    },
    {
        type: "tel",
        name: "phone",
        placeholder: "Ваш номер телефона",
        pattern: '^((8|\\+7)[\\- ]?)?(\\(?\\d{3}\\)?[\\- ]?)?[\\d\\- ]{7,10}$'
    },
    {
        as: "textarea",
        name: "message",
        cols: 30,
        rows: 4,
        placeholder: "Введите сообщение...",
        className: "form__message"
    }
]

export default FEEDBACK_DATA;