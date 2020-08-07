export interface IForm {
    type?: string,
    id?: string,
    name: string,
    placeholder?: string,
    pattern?: string,
    as?: any,
    cols?: number,
    rows?: number,
    className?: string
}

export interface IProps extends INotice{
    loadingVisible: string
    handleSubmit: any
    handleChange: any
    isDisabled: boolean
}

export interface INotice {
    text: string,
    className?: string
}

export interface Iinput {
    name?: string,
    email?: string,
    phone?: string,
    message?: string
}



